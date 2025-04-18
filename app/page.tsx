import "./globals.css"
import Hero from "@/components/hero"
import FeaturedArticles from "@/components/featured-articles"
import JournalCategories from "@/components/journal-categories"
import LatestIssue from "@/components/latest-issue"
import Footer2 from "@/components/footer2"
import CategoriesSection from "@/components/categories-section"
import JournalCarousel from "@/components/journal-carousel"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <div className="container mx-auto px-4 py-12 space-y-16 max-w-[1780px]">
        <FeaturedArticles />
        <JournalCarousel />
        <JournalCategories />
        <LatestIssue />
        <CategoriesSection />
      </div>
      <Footer2 />
    </main>
  )
}
