"use client"

import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-secondary/50 to-background">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium w-fit">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Now in Public Beta
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Create. Edit. Deploy. <span className="text-primary">Faster With AI.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg text-pretty">
              A unified studio for creating AI workflows, content, and agents. Build production-ready AI applications in
              minutes, not months.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="rounded-xl" asChild>
                <Link href="/auth/signup">Try Studio Free</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl gap-2 bg-transparent" asChild>
                <Link href="#demo">
                  <Play className="w-4 h-4" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                14-day free trial
              </div>
            </div>
          </div>

          {/* Right Side - Video Preview */}
          <div className="relative">
            <div className="relative bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-background rounded-md px-3 py-1 text-xs text-muted-foreground text-center">
                    studio.weaveit.ai
                  </div>
                </div>
              </div>

              {/* Video/Preview Area */}
              <div className="aspect-video bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center relative group cursor-pointer">
                <img
                  src="/ai-workflow-studio-interface-dark-mode-with-nodes-.jpg"
                  alt="WeaveIt Studio Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                    <Play className="w-6 h-6 text-primary ml-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-8 -right-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-8 -left-8 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
