import { ProductHero } from "./components/ProductHero"
import { ProductFeatures } from "./components/ProductFeatures"
import { PricingSection } from "./components/PricingSection"
import { ReviewsSection } from "./components/ReviewsSection"
import { FAQSection } from "./components/FAQSection"
import { AboutBrand } from "./components/AboutBrand"
import { Navigation } from "./components/Navigation"
import { Footer } from "./components/Footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ProductHero />
      <ProductFeatures />
      <PricingSection />
      <ReviewsSection />
      <FAQSection />
      <AboutBrand />
      <Footer />
    </main>
  )
}
