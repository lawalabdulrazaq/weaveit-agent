"use client"

import { useState } from "react"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { purchaseWithUsdc, USE_TOKEN_2022 } from "../../lib/payments"
import { ArrowRight } from "lucide-react"

export default function PricingPage() {
  const tiers = [
    { id: "tier5", price: 5, title: "Starter", credits: 1, subtitle: "Audio narration" },
    { id: "tier10", price: 10, title: "Creator", credits: 2, subtitle: "Video or multi-audio" },
    { id: "tier20", price: 20, title: "Pro", credits: 4, subtitle: "Priority rendering" },
  ]

  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState<typeof tiers[number] | null>(null)
  const [processing, setProcessing] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const wallet = useWallet()
  const { connection } = useConnection()

  const openModal = (tier: typeof tiers[number]) => {
    setSelected(tier)
    setMessage(null)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelected(null)
    setProcessing(false)
  }

  const handleConfirm = async () => {
    if (!selected) return
    setProcessing(true)
    setMessage(null)

    if (!wallet || !wallet.publicKey) {
      setMessage("Please connect your wallet to proceed")
      setProcessing(false)
      return
    }

    try {
      const sig = await purchaseWithUsdc(wallet, selected.price, connection, { useToken2022: USE_TOKEN_2022 })
      setMessage(`Purchase successful — transaction: ${sig}`)
    } catch (err: any) {
      console.error("Purchase failed", err)
      setMessage(err?.message || "Purchase failed")
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Pricing</h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">Simple, predictable pricing plans — purchase credits and use them for audio or video generation.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div key={t.id} className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="text-sm text-weaveit-400 font-semibold mb-2">{t.title}</div>
                <div className="text-4xl font-bold mb-1">${t.price}</div>
                <div className="text-sm text-gray-400 mb-4">{t.subtitle}</div>

                <ul className="text-sm text-gray-300 space-y-2 mb-4">
                  <li>Credits: <span className="font-medium">{t.credits}</span></li>
                  <li>One-time purchase, no subscription</li>
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <button onClick={() => openModal(t)} className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-weaveit-500 to-weaveit-600 text-white rounded-lg font-medium">
                  Select
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                <div className="text-xs text-gray-400">USD • one-time</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-sm text-gray-400">
          <h3 className="font-semibold text-white mb-2">Billing</h3>
          <p>Payments are processed on Solana using USDC. Your purchases are applied as credits in your account — no sensitive network details are exposed here.</p>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60" onClick={closeModal} />
          <div className="relative bg-gray-900/80 border border-gray-800 rounded-2xl p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-2">Confirm Purchase</h2>
            <p className="text-gray-300 mb-4">You're about to purchase <span className="font-medium">{selected.credits} credit{selected.credits>1?"s":""}</span> for <span className="font-semibold">${selected.price}</span>.</p>

            <div className="mb-4">
              {!wallet.publicKey ? (
                <div className="space-y-3">
                  <div className="text-sm text-gray-300">Connect your wallet to continue</div>
                  <WalletMultiButton />
                </div>
              ) : (
                <div className="text-sm text-gray-300">Wallet: <span className="font-medium">{wallet.publicKey.toString().slice(0,6)}...{wallet.publicKey.toString().slice(-4)}</span></div>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <button onClick={handleConfirm} disabled={processing} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg font-semibold">
                {processing ? "Processing…" : `Pay $${selected.price}`}
              </button>
              <button onClick={closeModal} className="px-4 py-2 bg-gray-800 rounded-lg">Cancel</button>
            </div>

            {message && <div className="mt-4 text-sm text-gray-300">{message}</div>}
          </div>
        </div>
      )}
    </div>
  )
}
