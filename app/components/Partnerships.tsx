const partners = [
  { name: "OpenAI", logo: "O" },
  { name: "Anthropic", logo: "A" },
  { name: "Google Cloud", logo: "G" },
  { name: "AWS", logo: "AWS" },
  { name: "Vercel", logo: "V" },
  { name: "Stripe", logo: "S" },
]

export default function Partnerships() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="section-container">
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Powered by leading AI & infrastructure partners
          </p>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Seamlessly integrate with the best AI models and cloud infrastructure providers
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center font-bold text-sm">
                {partner.logo}
              </div>
              <span className="font-medium">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
