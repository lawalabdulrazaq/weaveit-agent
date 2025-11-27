import { Clock, Puzzle, DollarSign } from "lucide-react"

const painPoints = [
  {
    icon: Clock,
    title: "Slow Development Cycles",
    description:
      "Traditional AI development takes months of iteration, slowing down your time to market significantly.",
  },
  {
    icon: Puzzle,
    title: "Complex Integrations",
    description: "Connecting multiple AI services, APIs, and data sources requires extensive engineering overhead.",
  },
  {
    icon: DollarSign,
    title: "High Infrastructure Costs",
    description: "Running and scaling AI workloads demands expensive infrastructure and specialized expertise.",
  },
]

export default function PainPoints() {
  return (
    <section className="py-20 bg-background">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Building AI shouldn't be this hard</h2>
          <p className="section-subtitle mx-auto">
            Teams face the same challenges when trying to ship AI-powered products
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((point, index) => (
            <div key={index} className="card-elevated flex flex-col items-start gap-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center">
                <point.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">{point.title}</h3>
              <p className="text-muted-foreground">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
