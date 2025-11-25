import { Connection } from "@solana/web3.js"
import { WalletContextState } from "@solana/wallet-adapter-react"

export const USDC_MINT: string
export const FEE_WALLET: string
export const USE_TOKEN_2022: boolean
export const IS_TEST: boolean
export const AIRDROPPER_SECRET: number[] | null

export const TIERS: {
  tier5: number
  tier10: number
  tier20: number
}

export const CREDITS: {
  audio: number
  video: number
}

export function transferTokenUnified(
  wallet: WalletContextState,
  mintAddress: string,
  recipientWallet: string,
  amount: number,
  isToken2022: boolean,
  connection: Connection
): Promise<string>

export function purchaseWithUsdc(
  wallet: WalletContextState,
  amountUsd: number,
  connection: Connection,
  options?: { useToken2022?: boolean; mint?: string; receiver?: string }
): Promise<string>

export function awardCredits(
  publicKey: string,
  credits: number,
  tierId?: string,
  transactionSignature?: string
): Promise<{ walletAddress: string; awardedPoints: number; newTotalPoints: number }>
