"use client"

import { useState } from "react"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { purchaseWithUsdc, USE_TOKEN_2022, awardCredits } from "../../lib/payments"
import { ArrowRight, Check, X, Sparkles } from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Link from "next/link"

function Button({ children, variant = "outline", className = "", ...props }: any) {
  const base = "inline-flex items-center justify-center px-4 py-2 rounded-xl font-semibold transition-all"
  const variants: Record<string, string> = {
    default: "bg-weaveit-500 text-white hover:opacity-95",
    outline: "border border-gray-700 text-white bg-transparent hover:bg-gray-800",
  }
  return (
    <button className={`${base} ${variants[variant] ?? variants.outline} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default function PricingPage() {
  const tiers = [
    {
      id: "free-trial",
      price: 0,
      title: "Free Trial",
      credits: 28,
      daily_credits: 4,
      description: "7 days for all new users",
      features: [
        "4 credits per day",
        "Documentation import",
        "Code to video generation",
        "Audio summaries",
        "Highlight and explain",
        "Basic voice library",
      ],
      highlight: false,
    },
    {
      id: "starter",
      price: 5,
      title: "Starter",
      credits: 30,
      monthly: true,
      description: "For individuals exploring",
      features: [
        "30 credits per month",
        "Basic voice library",
        "English-language generation",
        "Small repo imports",
        "Standard rendering",
        "Community support",
      ],
      best_for: "Students, beginners",
    },
    {
      id: "growth",
      price: 10,
      title: "Growth",
      credits: 80,
      monthly: true,
      description: "For active creators",
      features: [
        "80 credits per month",
        "Premium voices",
        "Multi-language support",
        "Medium repo imports",
        "Faster rendering",
        "NotebookLM workspace",
        "Basic team sharing",
      ],
      highlight: true,
      best_for: "Content creators",
    },
    {
      id: "pro",
      price: 20,
      title: "Pro",
      credits: 150,
      monthly: true,
      description: "For professionals",
      features: [
        "150 credits per month",
        "Full voice library",
        "Regional dialects",
        "Large repo ingestion",
        "Priority rendering",
        "Full DeepWiki engine",
        "Collaboration tools",
        "API early access",
      ],
      best_for: "DevRel, educators",
    },
  ]

  const enterpriseTier = {
    id: "enterprise",
    price: null,
    title: "Enterprise",
    credits: null,
    monthly: false,
    description: "Custom pricing for organizations",
    features: [
      "Unlimited generation",
      "Unlimited ingestion",
      "Custom voice cloning",
      "60+ languages",
      "Fastest GPU priority",
      "Admin dashboard",
      "SSO integration",
      "API access",
      "SLA guarantees",
      "Dedicated support",
    ],
    best_for: "Enterprises, dev teams",
  }

  const comparisonFeatures = [
    { name: "Credits per month", free: "28 total", starter: "30", growth: "80", pro: "150", enterprise: "Unlimited" },
    {
      name: "Voice library",
      free: "Basic",
      starter: "Basic",
      growth: "Premium",
      pro: "Full",
      enterprise: "Full + Custom",
    },
    {
      name: "Languages",
      free: "English",
      starter: "English",
      growth: "Multi",
      pro: "Multi + Dialects",
      enterprise: "60+",
    },
    {
      name: "Repo import size",
      free: "Small",
      starter: "Small",
      growth: "Medium",
      pro: "Large",
      enterprise: "Unlimited",
    },
    {
      name: "Rendering speed",
      free: "Standard",
      starter: "Standard",
      growth: "Fast",
      pro: "Priority",
      enterprise: "Fastest",
    },
    { name: "Team collaboration", free: false, starter: false, growth: true, pro: true, enterprise: true },
    { name: "API access", free: false, starter: false, growth: false, pro: "Early access", enterprise: true },
    { name: "SSO / SAML", free: false, starter: false, growth: false, pro: false, enterprise: true },
    { name: "Dedicated support", free: false, starter: false, growth: false, pro: false, enterprise: true },
  ]

  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState<(typeof tiers)[number] | null>(null)
  const [processing, setProcessing] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const wallet = useWallet()
  const { connection } = useConnection()

  const openModal = (tier: (typeof tiers)[number]) => {
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
      if (selected.price === 0) {
        await awardCredits(wallet.publicKey.toString(), selected.credits, selected.id)
        setMessage("Free trial activated! Credits have been awarded to your account.")
        closeModal()
        return
      }

      const sig = await purchaseWithUsdc(wallet, selected.price, connection, { useToken2022: USE_TOKEN_2022 })
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
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-12 bg-gradient-to-b from-gray-900/20 to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">Start free and scale as you grow. Purchase credits with USDC on Solana.</p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <div key={tier.id} className={`rounded-2xl p-6 bg-gray-900/60 border border-gray-800 flex flex-col ${tier.highlight ? "ring-2 ring-weaveit-500/20" : ""}`}>
                {tier.highlight && (
                  <div className="inline-block px-3 py-1 bg-weaveit-500/20 rounded-full text-weaveit-400 text-xs font-medium mb-3">Most Popular</div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-1">{tier.title}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-bold">{tier.price === 0 ? "Free" : `$${tier.price}`}</span>
                    {tier.monthly && <span className="text-sm text-gray-400">/mo</span>}
                  </div>
                  <p className="text-sm text-gray-400">{tier.description}</p>
                </div>

                {tier.credits && (
                  <div className="mb-4 pb-4 border-b border-gray-700">
                    <div className="text-sm font-medium">{tier.credits} credits</div>
                    {tier.daily_credits && <div className="text-xs text-gray-400">{tier.daily_credits} credits/day</div>}
                  </div>
                )}

                <ul className="flex flex-col gap-2 mb-6 flex-1">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-weaveit-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {tier.best_for && <p className="text-xs text-gray-400 mb-4">Best for: {tier.best_for}</p>}

                <Button onClick={() => openModal(tier)} variant={tier.highlight ? "default" : "outline"} className="w-full">
                  {tier.price === 0 ? "Start Free Trial" : "Select Plan"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ))}
          </div>

          {/* Enterprise Card */}
          <div className="mt-8 rounded-2xl p-6 bg-gray-900/60 border border-gray-800">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{enterpriseTier.title}</h3>
                <p className="text-gray-400 mb-4">{enterpriseTier.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {enterpriseTier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-weaveit-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0">
                <p className="text-xs text-gray-400 mb-3">Best for: {enterpriseTier.best_for}</p>
                <Button variant="outline">Contact Sales <ArrowRight className="w-4 h-4 ml-2" /></Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Compare Plans</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-300">Feature</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-white">Free</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-white">Starter</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-weaveit-400">Growth</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-white">Pro</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-white">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, idx) => (
                  <tr key={idx} className="border-b border-gray-800">
                    <td className="py-4 px-4 text-sm text-gray-300">{feature.name}</td>
                    {["free", "starter", "growth", "pro", "enterprise"].map((plan) => {
                      const value = (feature as any)[plan]
                      return (
                        <td key={plan} className="text-center py-4 px-4">
                          {typeof value === "boolean" ? (
                            value ? (
                              <Check className="w-5 h-5 text-weaveit-400 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-gray-600 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-gray-300">{value}</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Billing Info */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-6 bg-gray-900/60 border border-gray-800 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Secure Payments on Solana</h3>
            <p className="text-gray-400">Payments are processed using USDC on Solana. Your purchases are applied as credits instantly with no sensitive financial data exposed.</p>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modal */}
      {modalOpen && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-gray-900/80 border border-gray-800 rounded-2xl p-6 max-w-md w-full">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold text-white mb-2">Confirm Purchase</h2>
            <p className="text-gray-300 mb-6">You're about to purchase <span className="font-medium text-white">{selected.credits ?? 0} credits</span> for <span className="font-semibold text-white">{selected.price === null ? "Custom" : selected.price === 0 ? "Free" : `\u0024${selected.price}`}</span></p>

            <div className="mb-6 p-4 bg-gray-900/60 rounded-xl">
              {!wallet.publicKey ? (
                <div className="space-y-3 text-center">
                  <p className="text-sm text-gray-300">Connect your wallet to continue</p>
                  <WalletMultiButton className="!bg-weaveit-500 !rounded-xl" />
                </div>
              ) : (
                <div className="text-sm text-gray-300">Wallet: <span className="font-medium text-white">{wallet.publicKey.toString().slice(0,6)}...{wallet.publicKey.toString().slice(-4)}</span></div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={handleConfirm} className="flex-1" disabled={processing || selected.price === null}>
                {processing ? "Processing..." : selected.price === null ? "Contact Sales" : selected.price === 0 ? "Activate Trial" : `Pay \u0024${selected.price}`}
              </Button>
              <Button variant="outline" onClick={closeModal}>Cancel</Button>
            </div>

            {message && <p className="mt-4 text-sm text-center text-gray-300">{message}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
