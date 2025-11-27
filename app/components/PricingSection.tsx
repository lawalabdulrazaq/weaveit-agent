"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: { monthly: 39, annual: 29 },
    description: "Perfect for individual creators getting started",
    features: [
      { text: "5 videos per month", included: true },
      { text: "1080p export quality", included: true },
      { text: "5 AI voice options", included: true },
      { text: "Basic analytics", included: true },
      { text: "Email support", included: true },
      { text: "Custom branding", included: false },
      { text: "API access", included: false },
      { text: "Team collaboration", included: false },
    ],
  },
  {
    name: "Pro",
    price: { monthly: 99, annual: 79 },
    description: "Best for professional content creators",
    popular: true,
    features: [
      { text: "25 videos per month", included: true },
      { text: "4K export quality", included: true },
      { text: "50+ AI voice options", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority support", included: true },
      { text: "Custom branding", included: true },
      { text: "API access", included: true },
      { text: "Team collaboration", included: false },
    ],
  },
  {
    name: "Team",
    price: { monthly: 249, annual: 199 },
    description: "For teams and organizations",
    features: [
      { text: "Unlimited videos", included: true },
      { text: "4K export quality", included: true },
      { text: "100+ AI voice options", included: true },
      { text: "Enterprise analytics", included: true },
      { text: "24/7 dedicated support", included: true },
      { text: "Custom branding", included: true },
      { text: "Full API access", included: true },
      { text: "Team collaboration", included: true },
    ],
  },
]

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual")

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-4">
            Pricing Plans
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">Choose Your Perfect Plan</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Start free, upgrade when you're ready. All plans include a 30-day money-back guarantee.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={billingCycle === "monthly" ? "text-foreground font-medium" : "text-muted-foreground"}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
              className="relative w-14 h-7 bg-secondary rounded-full transition-colors"
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-primary rounded-full transition-transform ${
                  billingCycle === "annual" ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
            <span className={billingCycle === "annual" ? "text-foreground font-medium" : "text-muted-foreground"}>
              Annual
            </span>
            <span className="px-2 py-1 bg-accent/20 text-accent text-sm font-semibold rounded">Save 20%</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card-elevated relative ${plan.popular ? "border-primary ring-2 ring-primary/20" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-foreground">${plan.price[billingCycle]}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                {billingCycle === "annual" && (
                  <p className="text-sm text-muted-foreground mt-1">
                    billed annually (${plan.price[billingCycle] * 12}/year)
                  </p>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    {feature.included ? (
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <X className="w-3 h-3 text-muted-foreground" />
                      </div>
                    )}
                    <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/30"
                    : "btn-outline"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Need a custom solution for your enterprise?</p>
          <button className="btn-secondary">Contact Sales</button>
        </div>
      </div>
    </section>
  )
}
