import Header from "./components/Header"
import Hero from "./components/Hero"
import PainPoints from "./components/PainPoints"
import Features from "./components/Features"
import StudioPreview from "./components/StudioPreview"
import Pricing from "./components/Pricing"
import Roadmap from "./components/Roadmap"
import Partnerships from "./components/Partnerships"
import FAQ from "./components/FAQ"
import Footer from "./components/Footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <PainPoints />
      <Features />
      <StudioPreview />
      <Pricing />
      <Roadmap />
      <Partnerships />
      <FAQ />
      <Footer />
    </main>
  )
}
