import "./globals.css"
import Hero from "@/components/hero"
import JournalCategories from "@/components/journal-categories"
import LatestIssue from "@/components/latest-issue"
import Footer2 from "@/components/footer2"
import CategoriesSection from "@/components/categories-section"
import JournalCarousel from "@/components/journal-carousel"
import {Banner} from "@/components/banner"
import TopAuthors from "@/components/top-authors"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container p-[10px] py-5 md:p-0 mx-auto max-w-[1780px]">
      < Banner />
      </div>
      <div className="container mx-auto px-[20px] md:px-[3rem] py-0 max-w-[1780px]">
        <JournalCarousel />
        < TopAuthors />
        <CategoriesSection />
      </div>
      <Footer2 />
    </main>
  )
}
