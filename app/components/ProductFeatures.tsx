"use client"

import { useState } from "react"
import { Sparkles, Zap, Video, Code2, BarChart3, Plug, Globe, Palette, FileText, Headphones } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI Script Generation",
    description:
      "Automatically converts your code comments and documentation into engaging tutorial scripts with natural language processing.",
  },
  {
    icon: Zap,
    title: "Lightning Fast Rendering",
    description:
      "Generate complete 10-minute tutorials in under 60 seconds with our optimized cloud rendering pipeline.",
  },
  {
    icon: Video,
    title: "Studio-Quality Output",
    description: "Professional 4K video with smooth animations, transitions, and cinematic effects built-in.",
  },
  {
    icon: Code2,
    title: "Smart Code Highlighting",
    description:
      "Beautiful syntax highlighting for 50+ programming languages with intelligent line-by-line animations.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track viewer engagement, watch time, and completion rates with detailed analytics and insights.",
  },
  {
    icon: Plug,
    title: "API Integration",
    description: "Seamlessly integrate with your CI/CD pipeline to auto-generate tutorials from code changes.",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Generate voiceovers in 20+ languages with native-quality AI voices and automatic translations.",
  },
  {
    icon: Palette,
    title: "Custom Branding",
    description: "Add your logo, colors, and custom themes to maintain consistent brand identity across all tutorials.",
  },
  {
    icon: FileText,
    title: "Auto Transcriptions",
    description: "Automatic closed captions and searchable transcripts for better accessibility and SEO.",
  },
  {
    icon: Headphones,
    title: "Premium AI Voices",
    description: "Choose from 100+ natural-sounding AI voices with adjustable tone, pace, and emotion.",
  },
]

export function ProductFeatures() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30 border-y border-border">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-4">
            Detailed Features
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            Everything You Need to Create Amazing Tutorials
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive tools designed for developers who want to share knowledge effectively
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`card-elevated transition-all duration-300 cursor-pointer ${
                hoveredIndex === idx ? "border-primary scale-[1.02]" : ""
              }`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  hoveredIndex === idx ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                }`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Specifications Table */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Technical Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-elevated">
              <h4 className="text-lg font-semibold text-foreground mb-4">Video Output</h4>
              <ul className="space-y-3">
                {[
                  ["Resolution", "Up to 4K (3840x2160)"],
                  ["Frame Rate", "30fps / 60fps"],
                  ["Formats", "MP4, WebM, MOV"],
                  ["Aspect Ratios", "16:9, 9:16, 1:1, 4:3"],
                ].map(([label, value]) => (
                  <li key={label} className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="text-foreground font-medium">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-elevated">
              <h4 className="text-lg font-semibold text-foreground mb-4">AI Capabilities</h4>
              <ul className="space-y-3">
                {[
                  ["Languages", "50+ programming languages"],
                  ["Voice Languages", "20+ natural languages"],
                  ["Processing Speed", "60 seconds for 10-min video"],
                  ["AI Model", "GPT-4 + Custom Fine-tuning"],
                ].map(([label, value]) => (
                  <li key={label} className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="text-foreground font-medium">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
