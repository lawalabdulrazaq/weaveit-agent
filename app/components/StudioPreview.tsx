import { Check } from "lucide-react"

const capabilities = [
  "Visual workflow builder with 50+ nodes",
  "Connect to any AI model or API",
  "Built-in prompt engineering tools",
  "One-click deployment to production",
  "Real-time testing and debugging",
  "Team collaboration and sharing",
]

export default function StudioPreview() {
  return (
    <section id="demo" className="py-20 bg-background">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <div className="flex flex-col gap-6">
            <h2 className="section-title">A unified studio for creating AI workflows, content, and agents</h2>
            <p className="text-lg text-muted-foreground">
              WeaveIt Studio brings together everything you need to build, test, and deploy AI applications. No more
              switching between tools or managing complex infrastructure.
            </p>

            <ul className="flex flex-col gap-3 mt-4">
              {capabilities.map((capability, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">{capability}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side - Preview */}
          <div className="relative">
            <div className="card-elevated p-0 overflow-hidden shadow-2xl">
              <img src="/ai-studio-dashboard-with-workflow-nodes-dark-purpl.jpg" alt="WeaveIt Studio Interface" className="w-full h-auto" />
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl border border-border p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Deployment Status</div>
                  <div className="font-semibold text-foreground">Live in Production</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
