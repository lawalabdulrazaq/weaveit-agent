import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "WeaveIt - AI Video Tutorial Generator",
  description:
    "Transform your code and documentation into professional video tutorials instantly with AI. Perfect for developers, DevRels, educators, and content creators.",
  keywords: ["AI", "video tutorials", "code tutorials", "developer tools", "education", "content creation"],
  authors: [{ name: "WeaveIt AI" }],
  openGraph: {
    title: "WeaveIt - AI Video Tutorial Generator",
    description: "Transform your code into professional video tutorials in seconds with AI",
    type: "website",
  },
    generator: 'v0.app'
}

export const viewport = {
  themeColor: "#8b5cf6",
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
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
