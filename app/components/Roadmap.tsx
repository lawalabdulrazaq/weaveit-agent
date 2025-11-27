const roadmapItems = [
  {
    quarter: "Q1 2025",
    title: "Foundation",
    description: "Launch public beta, core workflow builder, and basic integrations.",
    status: "done",
  },
  {
    quarter: "Q2 2025",
    title: "Collaboration",
    description: "Real-time collaboration, team workspaces, and version history.",
    status: "in-progress",
  },
  {
    quarter: "Q3 2025",
    title: "AI Agents",
    description: "Autonomous AI agents, multi-step reasoning, and agent marketplace.",
    status: "planned",
  },
  {
    quarter: "Q4 2025",
    title: "Enterprise",
    description: "SSO, audit logs, on-premise deployment, and enterprise support.",
    status: "planned",
  },
]

const statusStyles = {
  done: {
    badge: "bg-green-500/10 text-green-600",
    dot: "bg-green-500",
    label: "Done",
  },
  "in-progress": {
    badge: "bg-primary/10 text-primary",
    dot: "bg-primary animate-pulse",
    label: "In Progress",
  },
  planned: {
    badge: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
    label: "Planned",
  },
}

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-20 bg-background">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Product Roadmap</h2>
          <p className="section-subtitle mx-auto">See what we're building and what's coming next</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-border" />

            <div className="flex flex-col gap-8">
              {roadmapItems.map((item, index) => {
                const status = statusStyles[item.status as keyof typeof statusStyles]
                return (
                  <div key={index} className="flex gap-6">
                    {/* Timeline Dot */}
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-10 h-10 rounded-full border-4 border-background flex items-center justify-center ${status.dot}`}
                      >
                        {item.status === "done" && (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="card-elevated flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-primary">{item.quarter}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${status.badge}`}>{status.label}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
