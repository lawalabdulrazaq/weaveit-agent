'use client'

import Link from 'next/link'

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for getting started',
      features: [
        'Up to 10 tutorials/month',
        'Basic AI generation',
        'Public library',
        '720p video quality',
        'Community support',
        'Basic analytics',
      ],
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      description: 'For active creators',
      features: [
        'Unlimited tutorials',
        'Advanced AI generation',
        'Private + public library',
        '4K video quality',
        'Priority support',
        'Advanced analytics',
        'Custom branding',
        'API access',
        'Team collaboration',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For organizations',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom AI models',
        'White-label solution',
        'SLA guarantee',
        '24/7 support',
        'Custom integrations',
        'Bulk discounts',
      ],
      highlighted: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="font-bold text-primary-foreground text-lg">W</span>
            </div>
            <span className="font-bold text-xl text-foreground">WeaveIt</span>
          </div>
          <Link href="/" className="text-muted-foreground hover:text-foreground transition">Back to Home</Link>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Choose the perfect plan for your tutorial creation needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`card transition-all ${
                plan.highlighted
                  ? 'border-primary/60 ring-2 ring-primary/20'
                  : 'border-border hover:border-primary/30'
              }`}
            >
              {plan.highlighted && (
                <div className="mb-4 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 inline-block">
                  <span className="text-sm text-primary font-medium">⭐ Most Popular</span>
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-2">{plan.period}</span>
              </div>

              <button
                className={`w-full mb-8 py-3 rounded-lg font-semibold transition ${
                  plan.highlighted
                    ? 'btn-primary'
                    : 'btn-outline'
                }`}
              >
                Get Started
              </button>

              <div className="space-y-3">
                {plan.features.map((feature, fidx) => (
                  <div key={fidx} className="flex items-start gap-3">
                    <span className="text-primary flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-secondary/20 rounded-lg border border-border p-8">
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Can I change plans anytime?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and wire transfers for enterprise customers.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes, all plans come with a 14-day free trial. No credit card required to get started.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'We offer a 30-day money-back guarantee if you\'re not satisfied with our service.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="border-b border-border pb-6 last:border-0">
                <h4 className="font-semibold mb-2">{faq.q}</h4>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
