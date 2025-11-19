"use client"

import { FC, ReactNode, useMemo } from "react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { PhantomWalletAdapter,   SolflareWalletAdapter,
 } from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css"

export const SolanaWalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Determine network from env: 'devnet' or 'mainnet'
  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK === "mainnet" ? WalletAdapterNetwork.Mainnet : WalletAdapterNetwork.Devnet

  // Use custom RPC if provided, otherwise default to clusterApiUrl
  const endpoint = useMemo(() => {
    if (process.env.NEXT_PUBLIC_SOLANA_RPC_URL && process.env.NEXT_PUBLIC_SOLANA_RPC_URL.length > 0) {
      return process.env.NEXT_PUBLIC_SOLANA_RPC_URL
    }
    return clusterApiUrl(network)
  }, [network])

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      // You can add more wallet adapters here
    ],
    [network]
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
