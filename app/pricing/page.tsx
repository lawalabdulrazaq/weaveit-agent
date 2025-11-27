"use client"

import { useState } from "react"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { purchaseWithUsdc, USE_TOKEN_2022, awardCredits } from "../../lib/payments"
import { ArrowRight, Check } from "lucide-react"

export default function PricingPage() {
  const tiers = [
    {
      id: "free-trial",
      price: 0,
      title: "7-Day Free Trial",
      credits: 28,
      daily_credits: 4,
      description: "All new users",
      features: [
        "4 credits per day",
        "Documentation import",
        "Code → video generation",
        "Audio summaries",
        "Highlight → explain",
        "Basic voice library",
      ],
      highlight: true,
    },
    {
      id: "starter",
      price: 5,
      title: "Starter Plan",
      credits: 30,
      monthly: true,
      description: "Individuals exploring or generating occasional tutorials",
      features: [
        "Generate 15 videos (30 credits)",
        "Access to basic voices",
        "English-language generation",
        "Import small documents or GitHub repos",
        "Standard rendering speed",
        "Core WeaveIt tools (video generator + basic workspace)",
        "Community support",
      ],
      best_for: "Students, beginners, casual users",
    },
    {
      id: "growth",
      price: 10,
      title: "Growth Plan",
      credits: 80,
      monthly: true,
      description: "Active developers, learners, and content creators",
      features: [
        "Generate 40 videos (80 credits)",
        "Access to premium voices",
        "Multi-language support",
        "Medium-size documentation & repo import",
        "Faster rendering queue",
        "NotebookLM-style workspace with summaries, highlights, quizzes",
        "Basic team sharing",
      ],
      best_for: "Content creators, learning enthusiasts",
    },
    {
      id: "pro",
      price: 20,
      title: "Pro Plan",
      credits: 150,
      monthly: true,
      description: "Professional creators and DevRel educators",
      features: [
        "Generate 75 videos (150 credits)",
        "Full voice library: premium + expressive voices",
        "Multi-language + regional dialects",
        "Larger repo/document ingestion",
        "Faster rendering queue",
        "Full NotebookLM + DeepWiki engine (explanations, refinements, rewrites)",
        "Workspace collaboration tools",
        "API early access",
      ],
      best_for: "Professional creators, DevRel educators, teams",
    },
    {
      id: "enterprise",
      price: null,
      title: "Enterprise Plan",
      credits: null,
      monthly: false,
      description: "Custom pricing for organizations",
      features: [
        "Unlimited video, audio, and quiz generation",
        "Unlimited documentation & repo ingestion",
        "Unlimited workspace projects",
        "All premium + celebrity-style voices",
        "Unlimited custom voice cloning",
        "Full multilingual engine (60+ languages)",
        "Fastest GPU rendering priority",
        "Admin dashboard + team-level collaboration",
        "API access + SSO (Okta, Azure AD)",
        "GitHub/Notion/Confluence integrations",
        "SLA-level uptime guarantees",
        "Dedicated support & onboarding",
        "Workflow automation",
      ],
      best_for: "Enterprises, dev teams, education institutions",
    },
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
    if (!selected || selected.price === null || selected.credits === null) return
    setProcessing(true)
    setMessage(null)

    if (!wallet || !wallet.publicKey) {
      setMessage("Please connect your wallet to proceed")
      setProcessing(false)
      return
    }

    try {
      // For free trial, just award credits directly
      if (selected.price === 0) {
        await awardCredits(wallet.publicKey.toString(), selected.credits, selected.id)
        setMessage("Free trial activated! Credits have been awarded to your account.")
        closeModal()
        return
      }

      // For paid tiers, process blockchain payment first
      const sig = await purchaseWithUsdc(wallet, selected.price, connection, { useToken2022: USE_TOKEN_2022 })
      
      // After successful payment, award credits via backend
      await awardCredits(wallet.publicKey.toString(), selected.credits, selected.id, sig)
      setMessage(`Purchase successful! Credits have been awarded. Transaction: ${sig}`)
      closeModal()
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers
            .filter((t) => t.id !== "enterprise")
            .map((t) => (
              <div
                key={t.id}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all ${
                  t.highlight
                    ? "bg-gradient-to-br from-violet-900/40 to-purple-900/40 border border-violet-500/50"
                    : "bg-gray-900/60 border border-gray-800"
                }`}>
                <div>
                  <div className="text-sm text-weaveit-400 font-semibold mb-2">{t.title}</div>
                  {t.price === null ? (
                    <div className="text-3xl font-bold mb-1">Custom</div>
                  ) : (
                    <div className="text-4xl font-bold mb-1">${t.price}</div>
                  )}
                  <div className="text-sm text-gray-400 mb-4">{t.description}</div>

                  {t.credits !== null && (
                    <div className="mb-4 pb-4 border-b border-gray-700">
                      <div className="text-sm font-medium text-white">{t.credits} credits</div>
                      {t.monthly && <div className="text-xs text-gray-400">per month</div>}
                      {t.daily_credits && <div className="text-xs text-gray-400">{t.daily_credits} credits/day</div>}
                    </div>
                  )}

                  <ul className="text-sm text-gray-300 space-y-2 mb-4">
                    {t.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {t.best_for && (
                    <div className="text-xs text-gray-400 italic">Best for: {t.best_for}</div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => openModal(t)}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-weaveit-500 to-weaveit-600 hover:from-weaveit-600 hover:to-weaveit-700 text-white rounded-lg font-medium transition-all"
                  >
                    Select
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Enterprise: streamlined horizontal card below the main plans */}
        {tiers.find((t) => t.id === "enterprise") && (
          <div className="max-w-4xl mx-auto mt-8">
            {(() => {
              const t = tiers.find((x) => x.id === "enterprise")!
              return (
                <div className="rounded-2xl p-6 bg-gray-900/60 border border-gray-800">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="text-sm text-weaveit-400 font-semibold mb-2">{t.title}</div>
                      <div className="text-xl font-bold mb-1">Custom Pricing</div>
                      <div className="text-sm text-gray-400 mb-4">{t.description}</div>

                      <ul className="text-sm text-gray-300 space-y-2 mb-4">
                        {t.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex-shrink-0">
                      <div className="text-xs text-gray-400 mb-2">Best for: {t.best_for}</div>
                      <button className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg font-medium">
                        Contact Sales
                      </button>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        )}

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
            <p className="text-gray-300 mb-4">You're about to purchase <span className="font-medium">{selected.credits ?? 0} credit{(selected.credits ?? 0) > 1 ? "s" : ""}</span> for <span className="font-semibold">{selected.price === null ? 'Custom' : `$${selected.price}`}</span>.</p>

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
              <button onClick={handleConfirm} disabled={processing || selected.price === null} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 rounded-lg font-semibold">
                {processing ? "Processing…" : (selected.price === null ? 'Contact Sales' : `Pay $${selected.price}`)}
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
