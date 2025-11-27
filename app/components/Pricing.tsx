import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const tiers = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out WeaveIt",
    features: ["3 active workflows", "1,000 AI generations/month", "Community support", "Basic analytics"],
    cta: "Get Started",
    href: "/auth/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "per month",
    description: "For professionals and small teams",
    features: [
      "Unlimited workflows",
      "50,000 AI generations/month",
      "Priority support",
      "Advanced analytics",
      "Team collaboration",
      "Custom integrations",
    ],
    cta: "Start Free Trial",
    href: "/auth/signup?plan=pro",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For large organizations",
    features: [
      "Unlimited everything",
      "Dedicated support",
      "SLA guarantee",
      "SSO & SAML",
      "Custom contracts",
      "On-premise option",
    ],
    cta: "Contact Sales",
    href: "/contact",
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-secondary/30">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Simple, transparent pricing</h2>
          <p className="section-subtitle mx-auto">Start free and scale as you grow. No hidden fees, no surprises.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`card-elevated flex flex-col ${
                tier.highlighted ? "border-primary shadow-lg shadow-primary/10 relative" : ""
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                  <span className="text-muted-foreground">/{tier.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{tier.description}</p>
              </div>

              <ul className="flex flex-col gap-3 mb-6 flex-1">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full rounded-xl" variant={tier.highlighted ? "default" : "outline"} asChild>
                <Link href={tier.href}>{tier.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/pricing" className="text-sm text-primary hover:underline">
            View full pricing comparison
          </Link>
        </div>
      </div>
    </section>
  )
}
