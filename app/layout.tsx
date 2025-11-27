import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "WeaveIt Studio - Create AI Workflows, Content & Agents",
  description:
    "A unified studio for creating AI workflows, content, and agents. Build production-ready AI applications in minutes, not months.",
  keywords: ["AI", "workflows", "automation", "AI agents", "no-code", "developer tools"],
  authors: [{ name: "WeaveIt AI" }],
  openGraph: {
    title: "WeaveIt Studio - Create. Edit. Deploy. Faster With AI.",
    description: "Build production-ready AI applications in minutes, not months.",
    type: "website",
  },
    generator: 'v0.app'
}

export const viewport = {
  themeColor: "#6d28d9",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
