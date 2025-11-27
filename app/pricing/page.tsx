"use client"

import { useState } from "react"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { purchaseWithUsdc, USE_TOKEN_2022, awardCredits } from "../../lib/payments"
import { ArrowRight, Check, X, Sparkles } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Button } from "@/components/ui/button"

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

  // Feature comparison table data
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
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/50 to-background">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Simple, transparent pricing</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free and scale as you grow. Purchase credits with USDC on Solana.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`card-elevated flex flex-col ${
                  tier.highlight ? "border-primary shadow-lg shadow-primary/10 relative" : ""
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-1">{tier.title}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-bold text-foreground">
                      {tier.price === 0 ? "Free" : `$${tier.price}`}
                    </span>
                    {tier.monthly && <span className="text-muted-foreground">/mo</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </div>

                {tier.credits && (
                  <div className="mb-4 pb-4 border-b border-border">
                    <div className="text-sm font-medium text-foreground">{tier.credits} credits</div>
                    {tier.daily_credits && (
                      <div className="text-xs text-muted-foreground">{tier.daily_credits} credits/day</div>
                    )}
                  </div>
                )}

                <ul className="flex flex-col gap-2 mb-6 flex-1">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {tier.best_for && <p className="text-xs text-muted-foreground mb-4">Best for: {tier.best_for}</p>}

                <Button
                  onClick={() => openModal(tier)}
                  variant={tier.highlight ? "default" : "outline"}
                  className="w-full rounded-xl"
                >
                  {tier.price === 0 ? "Start Free Trial" : "Select Plan"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ))}
          </div>

          {/* Enterprise Card */}
          <div className="mt-8 card-elevated">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">{enterpriseTier.title}</h3>
                <p className="text-muted-foreground mb-4">{enterpriseTier.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {enterpriseTier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0">
                <p className="text-xs text-muted-foreground mb-3">Best for: {enterpriseTier.best_for}</p>
                <Button variant="outline" className="rounded-xl bg-transparent">
                  Contact Sales
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 bg-secondary/30">
        <div className="section-container">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Compare Plans</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Feature</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-foreground">Free</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-foreground">Starter</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-primary">Growth</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-foreground">Pro</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-foreground">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, idx) => (
                  <tr key={idx} className="border-b border-border">
                    <td className="py-4 px-4 text-sm text-foreground">{feature.name}</td>
                    {["free", "starter", "growth", "pro", "enterprise"].map((plan) => {
                      const value = feature[plan as keyof typeof feature]
                      return (
                        <td key={plan} className="text-center py-4 px-4">
                          {typeof value === "boolean" ? (
                            value ? (
                              <Check className="w-5 h-5 text-primary mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-foreground">{value}</span>
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
        <div className="section-container">
          <div className="card-elevated max-w-2xl mx-auto text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Secure Payments on Solana</h3>
            <p className="text-muted-foreground">
              Payments are processed using USDC on Solana. Your purchases are applied as credits instantly with no
              sensitive financial data exposed.
            </p>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modal */}
      {modalOpen && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <button onClick={closeModal} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold text-foreground mb-2">Confirm Purchase</h2>
            <p className="text-muted-foreground mb-6">
              You're about to purchase{" "}
              <span className="font-medium text-foreground">{selected.credits ?? 0} credits</span> for{" "}
              <span className="font-semibold text-foreground">
                {selected.price === null ? "Custom" : selected.price === 0 ? "Free" : `$${selected.price}`}
              </span>
            </p>

            <div className="mb-6 p-4 bg-secondary rounded-xl">
              {!wallet.publicKey ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Connect your wallet to continue</p>
                  <WalletMultiButton className="!bg-primary !rounded-xl" />
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  Wallet:{" "}
                  <span className="font-medium text-foreground">
                    {wallet.publicKey.toString().slice(0, 6)}...{wallet.publicKey.toString().slice(-4)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handleConfirm}
                disabled={processing || selected.price === null}
                className="flex-1 rounded-xl"
              >
                {processing
                  ? "Processing..."
                  : selected.price === null
                    ? "Contact Sales"
                    : selected.price === 0
                      ? "Activate Trial"
                      : `Pay $${selected.price}`}
              </Button>
              <Button variant="outline" onClick={closeModal} className="rounded-xl bg-transparent">
                Cancel
              </Button>
            </div>

            {message && <p className="mt-4 text-sm text-center text-muted-foreground">{message}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
