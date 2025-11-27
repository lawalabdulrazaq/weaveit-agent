"use client"

import { Users, Award, Globe, Zap } from "lucide-react"

const stats = [
  { icon: Users, value: "12,500+", label: "Active Users" },
  { icon: Award, value: "500K+", label: "Tutorials Created" },
  { icon: Globe, value: "150+", label: "Countries" },
  { icon: Zap, value: "99.9%", label: "Uptime" },
]

export function AboutBrand() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Brand Story */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-4">
              Our Story
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
              Built by Developers, for Developers
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                WeaveIt was born from a simple frustration: creating quality code tutorials took too long. As
                developers, we spent more time editing videos than writing code.
              </p>
              <p>
                In 2023, we set out to solve this problem using AI. Our team of engineers and machine learning experts
                built a platform that understands code like a developer and explains it like a great teacher.
              </p>
              <p>
                Today, WeaveIt powers tutorials for some of the world's leading tech companies, coding bootcamps, and
                individual creators. Our mission is to democratize knowledge sharing and help developers teach the world
                to code.
              </p>
            </div>
            <div className="flex items-center gap-4 mt-8">
              <img
                src="/founder-headshot-man.jpg"
                alt="CEO"
                className="w-14 h-14 rounded-full object-cover border-2 border-primary"
              />
              <div>
                <div className="font-semibold text-foreground">Alex Mitchell</div>
                <div className="text-sm text-muted-foreground">Founder & CEO</div>
              </div>
            </div>
          </div>

          {/* Stats & Image */}
          <div className="space-y-8">
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-border">
              <img src="/modern-tech-office-team-working-purple-theme.jpg" alt="WeaveIt Team" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="card-elevated text-center py-4">
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Logos */}
        <div className="mt-20 text-center">
          <p className="text-muted-foreground mb-8">Trusted by teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
            {["Google", "Meta", "Stripe", "Vercel", "GitHub", "Netflix"].map((company) => (
              <div key={company} className="text-xl font-bold text-foreground">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
