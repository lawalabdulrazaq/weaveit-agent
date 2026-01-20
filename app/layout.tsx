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
    icon: '/icon.png',
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress non-critical proxy errors from wallet extensions
              if (typeof window !== 'undefined') {
                const originalError = console.error;
                console.error = function(...args) {
                  const errorStr = String(args[0]);
                  // Suppress harmless proxy traps from wallet adapters
                  if (errorStr && errorStr.includes("'set' on proxy") && errorStr.includes('tronlink')) {
                    return;
                  }
                  originalError.apply(console, args);
                };
              }
            `,
          }}
        />
      </head>
      <body className={polySans.className}>
        <SolanaWalletProvider>{children}</SolanaWalletProvider>
      </body>
    </html>
  )
}
