"use client"

import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useCallback, useState } from "react"

const FEE_WALLET_ADDRESS = process.env.NEXT_PUBLIC_FEE_WALLET || "4YfSTqUkTgfBojJ14wZdaKBvVWfNfyNcDBHsdw8mbanD"
let PAYMENT_WALLET: PublicKey
try {
  PAYMENT_WALLET = new PublicKey(FEE_WALLET_ADDRESS)
} catch (err) {
  // Fallback to the hardcoded key if env var is invalid
  PAYMENT_WALLET = new PublicKey("4YfSTqUkTgfBojJ14wZdaKBvVWfNfyNcDBHsdw8mbanD")
}

export function useSolanaPayment() {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const [isProcessing, setIsProcessing] = useState(false)

  const sendPayment = useCallback(
    async (amountUSD = 0.5) => {
      try {
        // Log connection info and public key for debugging
        console.log("useSolanaPayment: connection endpoint:", (connection as any)?.rpcEndpoint || (connection as any)?._rpcEndpoint)
        console.log("useSolanaPayment: wallet publicKey:", publicKey?.toString())
        // quick check of connection
        try {
          connection.getVersion().then((v) => console.log("Solana RPC version:", v)).catch(() => {})
        } catch (e) {
          // ignore
        }
      } catch (e) {
        // ignore
      }
      if (!publicKey || !sendTransaction) {
        setIsProcessing(false);
        return { success: false, error: "Wallet not connected" };
      }

      setIsProcessing(true);

      try {
        // Get current SOL price in USD (you might want to use a real price API)
        // For now, using a placeholder conversion rate
        const solPriceUSD = 190; // Replace with actual SOL price fetching
        const solAmount = amountUSD / solPriceUSD;
        const lamports = Math.floor(solAmount * LAMPORTS_PER_SOL);

        // Create transaction
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: PAYMENT_WALLET,
            lamports,
          })
        );

        // Get recent blockhash
        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = publicKey;

        // Send transaction and capture errors from wallet adapter
        let signature: string
        try {
          signature = await sendTransaction(transaction, connection)
        } catch (sendErr: any) {
          console.error("Payment send failed:", sendErr)
          const sendErrMsg = sendErr?.message || (typeof sendErr === "string" ? sendErr : JSON.stringify(sendErr))
          setIsProcessing(false)
          return { success: false, error: `sendTransaction failed: ${sendErrMsg}` }
        }

        // Wait for confirmation (use "confirmed" commitment)
        try {
          await connection.confirmTransaction(signature, "confirmed")
        } catch (confirmErr: any) {
          console.error("Payment confirmation error:", confirmErr)
          const confirmErrMsg = confirmErr?.message || (typeof confirmErr === "string" ? confirmErr : JSON.stringify(confirmErr))
          setIsProcessing(false)
          return { success: false, error: `Payment not confirmed: ${confirmErrMsg}` }
        }

        console.log("Payment successful:", signature)
        setIsProcessing(false)
        return { success: true, signature, amount: solAmount }
      } catch (error) {
        console.error("Payment failed:", error);
        setIsProcessing(false);
        return { success: false, error: (error instanceof Error ? error.message : String(error)) };
      }
    },
    [connection, publicKey, sendTransaction],
  );

  const getSolPrice = useCallback(async () => {
    try {
      // Fetch current SOL price from CoinGecko API
      const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd")
      const data = await response.json()
      return data.solana.usd
    } catch (error) {
      console.error("Failed to fetch SOL price:", error)
      return 190 // Fallback price
    }
  }, [])

  return {
    sendPayment,
    getSolPrice,
    isProcessing,
    isConnected: !!publicKey,
    walletAddress: publicKey?.toString(),
  }
}
