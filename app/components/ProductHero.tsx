"use client"

import { useState } from "react"
import { Star, Play, Check, ShoppingCart, Users, Clock, Award } from "lucide-react"

export function ProductHero() {
  const [selectedPlan, setSelectedPlan] = useState<"starter" | "pro" | "team">("pro")
  const [isAdded, setIsAdded] = useState(false)

  const plans = {
    starter: { name: "Starter", price: 29, originalPrice: 49 },
    pro: { name: "Pro", price: 79, originalPrice: 129, popular: true },
    team: { name: "Team", price: 199, originalPrice: 299 },
  }

  const handleAddToCart = () => {
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image/Video Section */}
          <div className="space-y-4">
            {/* Main Product Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-card group cursor-pointer">
              <img
                src="/ai-video-tutorial-platform-dashboard-dark-purple-t.jpg"
                alt="WeaveIt AI Tutorial Generator Dashboard"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" />
                </div>
              </div>
              <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-sm font-semibold rounded-full">
                Watch Demo
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {[
                "AI code generation interface dark theme",
                "Video editing timeline dark purple",
                "Tutorial preview dashboard",
                "Analytics dashboard purple theme",
              ].map((query, idx) => (
                <div
                  key={idx}
                  className={`aspect-video rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                    idx === 0 ? "border-primary" : "border-border hover:border-primary/50"
                  }`}
                >
                  <img
                    src={`/.jpg?height=100&width=160&query=${query}`}
                    alt={`Product view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Best Seller 2024</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight text-balance">
              WeaveIt AI Tutorial Generator
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-foreground font-semibold">4.9</span>
              <span className="text-muted-foreground">(2,847 reviews)</span>
              <span className="text-muted-foreground">|</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>12,500+ users</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              Transform your code and documentation into professional video tutorials in seconds. Perfect for
              developers, DevRels, educators, and content creators who want to share knowledge effectively without
              spending hours on video editing.
            </p>

            {/* Plan Selection */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Select Plan:</label>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(plans).map(([key, plan]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedPlan(key as "starter" | "pro" | "team")}
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      selectedPlan === key ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                        Popular
                      </span>
                    )}
                    <div className="text-sm font-medium text-foreground">{plan.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {key === "starter" && "5 videos/mo"}
                      {key === "pro" && "25 videos/mo"}
                      {key === "team" && "Unlimited"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-foreground">${plans[selectedPlan].price}</span>
              <span className="text-xl text-muted-foreground line-through">${plans[selectedPlan].originalPrice}</span>
              <span className="px-2 py-1 bg-accent/20 text-accent text-sm font-semibold rounded">
                Save {Math.round((1 - plans[selectedPlan].price / plans[selectedPlan].originalPrice) * 100)}%
              </span>
            </div>
            <p className="text-sm text-muted-foreground">per month, billed annually</p>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all ${
                isAdded
                  ? "bg-green-600 text-white"
                  : "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/30"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-6 h-6" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-6 h-6" />
                  Add to Cart - ${plans[selectedPlan].price}/mo
                </>
              )}
            </button>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                <div className="text-sm text-muted-foreground">30-day trial</div>
              </div>
              <div className="text-center">
                <Award className="w-5 h-5 text-primary mx-auto mb-1" />
                <div className="text-sm text-muted-foreground">Money-back guarantee</div>
              </div>
              <div className="text-center">
                <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                <div className="text-sm text-muted-foreground">24/7 Support</div>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              {[
                "AI-powered script generation from code",
                "Professional voiceover in 20+ languages",
                "Automatic syntax highlighting",
                "Export in 4K quality",
                "Custom branding options",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
