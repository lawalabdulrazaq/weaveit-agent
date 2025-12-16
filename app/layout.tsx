import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { SolanaWalletProvider } from "../components/wallet-provider"
import { polySans } from "./fonts";

export const metadata: Metadata = {
  title: 'WeaveIt - AI Video Tutorial Generator',
  description: 'Generate professional video tutorials instantly with AI. For developers, by developers.',
  generator: 'v0.app',
  icons: {
    icon: '/icon.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${polySans.variable}`}>
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={polySans.className}>
        <SolanaWalletProvider>{children}</SolanaWalletProvider>
      </body>
    </html>
  )
}
