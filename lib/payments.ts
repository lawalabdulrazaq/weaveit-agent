import { Connection, PublicKey, Transaction } from "@solana/web3.js"
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

  const amount = Math.floor(amountUsd * 1_000_000)
  const sig = await transferTokenUnified(wallet, mint, receiver, amount, use2022, connection)
  return sig
}
