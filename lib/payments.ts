import { Connection, PublicKey, Transaction, Keypair } from "@solana/web3.js"
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token"
import { WalletContextState } from "@solana/wallet-adapter-react"

export const USDC_MINT = process.env.NEXT_PUBLIC_USDC_MINT || "2RgRJx3z426TMCL84ZMXTRVCS5ee7iGVE4ogqcUAd3tg"
export const FEE_WALLET = process.env.NEXT_PUBLIC_FEE_WALLET || "4YfSTqUkTgfBojJ14wZdaKBvVWfNfyNcDBHsdw8mbanD"
export const USE_TOKEN_2022 = (process.env.NEXT_PUBLIC_USE_TOKEN_2022 || "false") === "true"
export const IS_TEST = process.env.NEXT_PUBLIC_TEST === "true"
export const AIRDROPPER_SECRET = process.env.NEXT_PUBLIC_AIRDROPPER ? JSON.parse(process.env.NEXT_PUBLIC_AIRDROPPER) : null

export const TIERS = {
  tier5: 5,
  tier10: 10,
  tier20: 20,
} as const

export const CREDITS = {
  audio: 1,
  video: 2,
} as const

export async function transferTokenUnified(
  wallet: WalletContextState,
  mintAddress: string,
  recipientWallet: string,
  amount: number,
  isToken2022: boolean,
  connection: Connection
) {
  if (!wallet || !wallet.publicKey) throw new Error("Wallet not connected")

  const sender = wallet.publicKey
  const mint = new PublicKey(mintAddress)
  const recipient = new PublicKey(recipientWallet)

  const PROGRAM_ID = isToken2022 ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID

  const senderAta = await getAssociatedTokenAddress(mint, sender, false, PROGRAM_ID)
  const recipientAta = await getAssociatedTokenAddress(mint, recipient, false, PROGRAM_ID)

  const tx = new Transaction()

  const recipientAtaInfo = await connection.getAccountInfo(recipientAta)
  if (!recipientAtaInfo) {
    const createAtaIx = createAssociatedTokenAccountInstruction(
      sender,
      recipientAta,
      recipient,
      mint,
      PROGRAM_ID
    )
    tx.add(createAtaIx)
  }

  const transferIx = createTransferInstruction(
    senderAta,
    recipientAta,
    sender,
    BigInt(amount),
    [],
    PROGRAM_ID
  )

  tx.add(transferIx)

  const sig = await wallet.sendTransaction(tx, connection)
  await connection.confirmTransaction(sig, "confirmed")

  return sig
}

export async function purchaseWithUsdc(
  wallet: WalletContextState,
  amountUsd: number,
  connection: Connection,
  options?: { useToken2022?: boolean; mint?: string; receiver?: string }
) {
  const mint = options?.mint || USDC_MINT
  const receiver = options?.receiver || FEE_WALLET
  const use2022 = typeof options?.useToken2022 === "boolean" ? options.useToken2022 : USE_TOKEN_2022

  if (!wallet || !wallet.publicKey) {
    throw new Error("Wallet not connected")
  }

  // In test mode, airdrop USDC to user first
  if (IS_TEST && AIRDROPPER_SECRET) {
    const airdropAmount = amountUsd + 1 // amount + 1 USDC
    await airdropUsdc(wallet.publicKey, airdropAmount, connection, mint, use2022)
  }

  const amount = Math.floor(amountUsd * 1_000_000)
  const sig = await transferTokenUnified(wallet, mint, receiver, amount, use2022, connection)
  return sig
}

async function airdropUsdc(
  recipientPublicKey: PublicKey,
  amountUsd: number,
  connection: Connection,
  mint: string,
  isToken2022: boolean
): Promise<void> {
  if (!AIRDROPPER_SECRET) {
    throw new Error("Airdropper wallet not configured")
  }

  try {
    const airdropperKeypair = Keypair.fromSecretKey(new Uint8Array(AIRDROPPER_SECRET))
    const mintAddress = new PublicKey(mint)

    const PROGRAM_ID = isToken2022 ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID

    const airdropperAta = await getAssociatedTokenAddress(
      mintAddress,
      airdropperKeypair.publicKey,
      false,
      PROGRAM_ID
    )
    const recipientAta = await getAssociatedTokenAddress(
      mintAddress,
      recipientPublicKey,
      false,
      PROGRAM_ID
    )

    const tx = new Transaction()

    // Create recipient ATA if it doesn't exist
    const recipientAtaInfo = await connection.getAccountInfo(recipientAta)
    if (!recipientAtaInfo) {
      const createAtaIx = createAssociatedTokenAccountInstruction(
        airdropperKeypair.publicKey,
        recipientAta,
        recipientPublicKey,
        mintAddress,
        PROGRAM_ID
      )
      tx.add(createAtaIx)
    }

    // Transfer airdrop amount
    const airdropAmountLamports = Math.floor(amountUsd * 1_000_000)
    const transferIx = createTransferInstruction(
      airdropperAta,
      recipientAta,
      airdropperKeypair.publicKey,
      BigInt(airdropAmountLamports),
      [],
      PROGRAM_ID
    )
    tx.add(transferIx)

    // Sign and send transaction
    tx.feePayer = airdropperKeypair.publicKey
    const blockhash = await connection.getLatestBlockhash()
    tx.recentBlockhash = blockhash.blockhash

    tx.sign(airdropperKeypair)
    const sig = await connection.sendRawTransaction(tx.serialize())
    await connection.confirmTransaction(sig, "confirmed")
  } catch (error) {
    console.error("Airdrop failed:", error)
    throw new Error(`Airdrop failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export async function awardCredits(
  publicKey: string,
  credits: number,
  tierId?: string,
  transactionSignature?: string
): Promise<{ walletAddress: string; awardedPoints: number; newTotalPoints: number }> {
  // Backend (external) endpoint as defined in BACKEND_TIERS.md
  const url = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
  const endpoint = `${url.replace(/\/$/, "")}/api/payments/award`;

  const body: any = {
    walletAddress: publicKey,
  }

  if (typeof credits === "number") body.points = credits
  if (tierId) body.tier = tierId
  if (transactionSignature) body.transactionSignature = transactionSignature

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    let message = "Failed to award credits"
    try {
      const err = await response.json()
      message = err?.message || message
    } catch (e) {
      // ignore
    }
    throw new Error(message)
  }

  const data = await response.json()
  return data
}
