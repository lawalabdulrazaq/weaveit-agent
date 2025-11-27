"use client"

import Link from "next/link"
import { Github, Twitter, Linkedin, Youtube, FileText, Users, MessageCircle, BookOpen, Code2 } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-bold text-primary-foreground text-xl">W</span>
              </div>
              <div>
                <span className="font-bold text-xl text-foreground">WeaveIt</span>
                <p className="text-xs text-muted-foreground">AI Video Generator</p>
              </div>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Transform your code explanations into professional tutorial videos with AI-powered narration and visual
              generation.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://x.com/weaveItAgent"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/lawalabdulrazaq/weaveit-agent"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@weaveit"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/weaveit"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-primary tracking-wider uppercase mb-6">Product</h3>
            <ul className="space-y-4">
              {[
                { label: "Features", href: "#features" },
                { label: "Pricing", href: "#pricing" },
                { label: "Reviews", href: "#reviews" },
                { label: "FAQ", href: "#faq" },
                { label: "Launch Studio", href: "/studio" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-primary tracking-wider uppercase mb-6">Resources</h3>
            <ul className="space-y-4">
              {[
                { label: "Documentation", href: "https://docs.weaveit.ai", icon: FileText },
                { label: "API Reference", href: "/api-docs", icon: Code2 },
                { label: "Tutorials", href: "/tutorials", icon: BookOpen },
                { label: "Examples", href: "https://github.com/weaveit-ai/examples", icon: null },
                { label: "Blog", href: "/blog", icon: null },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-primary tracking-wider uppercase mb-6">Company</h3>
            <ul className="space-y-4">
              {[
                { label: "About Us", href: "/about", icon: Users },
                { label: "Contact", href: "mailto:weaveitagent@gmail.com", icon: MessageCircle },
                { label: "Privacy Policy", href: "/privacy", icon: null },
                { label: "Terms of Service", href: "/terms", icon: null },
                { label: "Cookie Policy", href: "/cookies", icon: null },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Stay updated</h3>
              <p className="text-muted-foreground">Get the latest news, tutorials, and product updates.</p>
            </div>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">&copy; {currentYear} WeaveIt AI, Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookies
              </a>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Built with care for developers and content creators worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
