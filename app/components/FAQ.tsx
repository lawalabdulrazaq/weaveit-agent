"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is WeaveIt Studio?",
    answer:
      "WeaveIt Studio is a unified platform for creating AI workflows, content, and agents. It provides a visual interface for building complex AI pipelines without writing code, along with powerful tools for testing, deployment, and monitoring.",
  },
  {
    question: "Do I need coding experience to use WeaveIt?",
    answer:
      "No! WeaveIt is designed to be accessible to everyone. Our visual workflow builder lets you create powerful AI applications using drag-and-drop. However, developers can also write custom code when needed.",
  },
  {
    question: "What AI models does WeaveIt support?",
    answer:
      "WeaveIt integrates with all major AI providers including OpenAI, Anthropic, Google, and more. You can easily switch between models or use multiple models in the same workflow.",
  },
  {
    question: "How does pricing work?",
    answer:
      "We offer a generous free tier to get started. Paid plans are based on the number of AI generations and team members. You only pay for what you use, with no hidden fees.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We're SOC 2 compliant and use end-to-end encryption for all data. Your workflows and data are never used to train AI models. Enterprise customers can also use our on-premise option.",
  },
  {
    question: "Can I use WeaveIt for commercial projects?",
    answer:
      "Yes! All plans, including the free tier, allow commercial use. You own everything you create with WeaveIt.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "Free users get access to our community Discord and documentation. Pro users get priority email support, and Enterprise customers get dedicated support with SLAs.",
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Frequently Asked Questions</h2>
          <p className="section-subtitle mx-auto">Everything you need to know about WeaveIt</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
