import "./globals.css"
import Hero from "@/components/hero"
import FeaturedArticles from "@/components/featured-articles"
import JournalCategories from "@/components/journal-categories"
import LatestIssue from "@/components/latest-issue"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <div className="container mx-auto px-4 py-12 space-y-16">
        <FeaturedArticles />
        <JournalCategories />
        <LatestIssue />
      </div>
      <Footer />
    </main>
  )
}
