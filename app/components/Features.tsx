import { Sparkles, Zap, Layers, GitBranch, Shield, BarChart3, ArrowRight } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description: "Generate workflows, content, and code with natural language prompts. Let AI do the heavy lifting.",
    link: "#",
  },
  {
    icon: Zap,
    title: "Real-Time Collaboration",
    description: "Work together with your team in real-time. See changes instantly across all connected clients.",
    link: "#",
  },
  {
    icon: Layers,
    title: "Visual Workflow Builder",
    description: "Drag-and-drop interface for building complex AI pipelines without writing code.",
    link: "#",
  },
  {
    icon: GitBranch,
    title: "Version Control",
    description: "Built-in versioning for all your workflows. Roll back changes and compare versions easily.",
    link: "#",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with end-to-end encryption. Your data stays private and secure.",
    link: "#",
  },
  {
    icon: BarChart3,
    title: "Analytics & Monitoring",
    description: "Track performance, costs, and usage across all your AI workflows in one dashboard.",
    link: "#",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-secondary/30">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Everything you need to ship AI</h2>
          <p className="section-subtitle mx-auto">
            Powerful features designed to accelerate your AI development workflow
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card-elevated group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <Link
                href={feature.link}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
              >
                See demo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
