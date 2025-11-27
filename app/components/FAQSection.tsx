"use client"

import { useState } from "react"
import { ChevronDown, MessageCircle } from "lucide-react"

const faqs = [
  {
    question: "How does WeaveIt generate tutorials from code?",
    answer:
      "WeaveIt uses advanced AI models to analyze your code structure, comments, and documentation. It then generates a natural-sounding script that explains the code step-by-step. The AI understands programming concepts and can explain complex logic in simple terms.",
  },
  {
    question: "What programming languages are supported?",
    answer:
      "We support 50+ programming languages including JavaScript, TypeScript, Python, Java, C++, Go, Rust, Ruby, PHP, Swift, Kotlin, and many more. Our syntax highlighting and code analysis work seamlessly across all major languages.",
  },
  {
    question: "Can I customize the AI voice and branding?",
    answer:
      "Yes! Pro and Team plans include access to 50+ AI voices in 20+ languages. You can also add custom branding including your logo, intro/outro sequences, custom color schemes, and watermarks on all your videos.",
  },
  {
    question: "How long does it take to generate a tutorial?",
    answer:
      "Most tutorials are generated in under 60 seconds, regardless of length. A typical 10-minute tutorial with code animations, voiceover, and transitions takes about 45-60 seconds to render completely.",
  },
  {
    question: "What video formats and resolutions are available?",
    answer:
      "We support export in MP4, WebM, and MOV formats. Resolution options include 720p, 1080p, and 4K (2160p). You can also choose from multiple aspect ratios including 16:9 (YouTube), 9:16 (TikTok/Reels), 1:1 (Instagram), and 4:3.",
  },
  {
    question: "Is there an API for automated tutorial generation?",
    answer:
      "Yes! Pro and Team plans include API access. You can integrate WeaveIt into your CI/CD pipeline to automatically generate tutorials when code is pushed. Full documentation and SDKs for popular languages are available.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "We offer a 30-day money-back guarantee on all plans. If you are not satisfied with WeaveIt for any reason, contact our support team within 30 days of purchase for a full refund, no questions asked.",
  },
  {
    question: "Can I use the generated videos for commercial purposes?",
    answer:
      "You own full rights to all videos generated with WeaveIt. You can monetize them on YouTube, sell courses, use them for client work, or any other commercial purpose without additional licensing fees.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">Everything you need to know about WeaveIt</p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="card-elevated overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left p-6"
              >
                <span className="text-lg font-semibold text-foreground pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? "max-h-96" : "max-h-0"}`}
              >
                <div className="px-6 pb-6 text-muted-foreground leading-relaxed">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 card-elevated text-center">
          <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Still have questions?</h3>
          <p className="text-muted-foreground mb-4">Our support team is here to help you with anything you need.</p>
          <button className="btn-primary">Contact Support</button>
        </div>
      </div>
    </section>
  )
}
