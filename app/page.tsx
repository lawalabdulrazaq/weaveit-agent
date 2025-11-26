import HomePage from "./components/HomePage"

import { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [isHovering, setIsHovering] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="font-bold text-primary-foreground text-lg">W</span>
            </div>
            <span className="font-bold text-xl text-foreground">WeaveIt</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition">Pricing</a>
            <a href="#docs" className="text-muted-foreground hover:text-foreground transition">Docs</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-muted-foreground hover:text-foreground transition">Sign In</Link>
            <Link href="/auth/signup" className="btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-6 px-3 py-1 rounded-full border border-primary/30 bg-primary/5">
              <span className="text-sm text-primary font-medium">AI-Powered Tutorial Creation</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Create Video <span className="neon-glow">Tutorials</span> in Seconds
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-xl">
              WeaveIt transforms your code and documentation into engaging video tutorials. Perfect for developers, DevRels, and content creators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signup" className="btn-primary text-center">
                Start Creating →
              </Link>
              <button className="btn-outline">
                ▶ Watch Demo
              </button>
            </div>
          </div>
          
          {/* Hero Image Placeholder */}
          <div className="relative h-96 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-5"></div>
            <div className="relative z-10 text-center">
              <div className="text-6xl mb-4">▶</div>
              <p className="text-muted-foreground">Video Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Everything you need to create professional tutorials</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '✨',
                title: 'AI Generation',
                description: 'Let AI transform your code snippets and docs into engaging narratives'
              },
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Generate complete tutorials in minutes, not hours'
              },
              {
                icon: '▶',
                title: 'Professional Output',
                description: 'Studio-quality video with voiceover and animations'
              },
              {
                icon: '</>',
                title: 'Code Highlighting',
                description: 'Beautiful syntax highlighting for any programming language'
              },
              {
                icon: '📊',
                title: 'Analytics',
                description: 'Track engagement and viewer metrics for your tutorials'
              },
              {
                icon: '🔌',
                title: 'API Access',
                description: 'Integrate tutorial generation into your workflows'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="card hover:border-primary/50 transition-all cursor-pointer"
                onMouseEnter={() => setIsHovering(`feature-${idx}`)}
                onMouseLeave={() => setIsHovering(null)}
              >
                <div className={`text-3xl mb-4 transition-all ${isHovering === `feature-${idx}` ? 'text-primary' : 'text-muted-foreground'}`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center card border-primary/30">
          <h2 className="text-4xl font-bold mb-4">Ready to revolutionize tutorial creation?</h2>
          <p className="text-xl text-muted-foreground mb-8">Join thousands of creators using WeaveIt to share their knowledge</p>
          <Link href="/auth/signup" className="btn-primary inline-flex items-center gap-2">
            Get Started Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <span className="font-bold text-primary-foreground text-sm">W</span>
            </div>
            <span className="font-semibold">WeaveIt</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition">Privacy</a>
            <a href="#" className="hover:text-foreground transition">Terms</a>
            <a href="#" className="hover:text-foreground transition">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
