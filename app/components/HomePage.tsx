"use client"

import { useState } from "react"
import Footer from "./Footer"
import Navbar from "./Navbar"
import Features from "./Features";
import Products from "./Product"
import Pricing from "./Pricing"
import Partnerships from "./Partnerships"
import Roadmap from "./Roadmap"
import Team from "./Team"
import Hero from "./Hero"
import Stats from "./Stats"
import CTASection from "./CTASection"
import PolicyModal from "./PolicyModal"

export default function HomePage() {
  const [modal, setModal] = useState<{ isOpen: boolean; title: string; content: string }>({
    isOpen: false,
    title: "",
    content: "",
  })

  const openModal = (title: string, content: string) => {
    setModal({ isOpen: true, title, content })
  }

  const closeModal = () => {
    setModal({ isOpen: false, title: "", content: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0a0e17] to-gray-900">
      {/* Navbar Section */}
      <Navbar />
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features/>

      {/* The Product Section */}
      <Products />

      {/* Pricing Section */}
      <Pricing />

      {/* Partnerships Section */}
      <Partnerships />

      {/* Roadmap Section */}
      <Roadmap />

      {/* Team Section */}
      <Team />

      {/* Stats Section */}
      <Stats />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer onOpenModal={openModal} />

      <PolicyModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        content={modal.content}
      />
    </div>
  )
}
