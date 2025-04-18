"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, SlidersHorizontal } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer1"

// Sample data for demonstration
const sampleArticles = [
  {
    id: 1,
    title: "Advances in Quantum Computing: A Comprehensive Review",
    abstract:
      "This paper reviews recent developments in quantum computing algorithms and their potential applications in solving complex computational problems.",
    author: "Dr. Sarah Johnson",
    date: "June 15, 2023",
    category: "Computer Science",
    journal: "Journal of Quantum Information",
    citations: 42,
    year: 2023,
  },
  {
    id: 2,
    title: "Climate Change Impact on Marine Ecosystems",
    abstract:
      "An analysis of how rising ocean temperatures are affecting marine biodiversity and ecosystem stability across different oceanic regions.",
    author: "Prof. Michael Chen",
    date: "May 22, 2023",
    category: "Environmental Science",
    journal: "Environmental Research Letters",
    citations: 28,
    year: 2023,
  },
  {
    id: 3,
    title: "Novel Approaches to Sustainable Urban Planning",
    abstract:
      "This study explores innovative urban design strategies that promote sustainability, resilience, and community well-being in metropolitan areas.",
    author: "Dr. Emily Rodriguez",
    date: "July 3, 2023",
    category: "Urban Studies",
    journal: "Journal of Urban Planning",
    citations: 15,
    year: 2023,
  },
  {
    id: 4,
    title: "Machine Learning Applications in Healthcare Diagnostics",
    abstract:
      "A survey of recent applications of machine learning algorithms in medical diagnostics, with a focus on early disease detection and treatment planning.",
    author: "Dr. James Wilson",
    date: "April 10, 2023",
    category: "Computer Science",
    journal: "Medical Informatics Journal",
    citations: 36,
    year: 2023,
  },
  {
    id: 5,
    title: "The Role of Microbiomes in Human Health",
    abstract:
      "This review examines the complex relationships between human microbiomes and various aspects of health, disease prevention, and treatment responses.",
    author: "Dr. Lisa Wong",
    date: "March 5, 2023",
    category: "Biology",
    journal: "Microbiome Research",
    citations: 53,
    year: 2022,
  },
  {
    id: 6,
    title: "Advancements in Renewable Energy Storage Technologies",
    abstract:
      "An overview of recent innovations in energy storage systems for renewable sources, addressing challenges of intermittency and grid integration.",
    author: "Prof. David Kim",
    date: "February 18, 2023",
    category: "Engineering",
    journal: "Renewable Energy",
    citations: 31,
    year: 2022,
  },
  {
    id: 7,
    title: "Neuroplasticity and Learning: New Insights from Longitudinal Studies",
    abstract:
      "This paper presents findings from long-term studies on brain plasticity and its implications for educational approaches and cognitive rehabilitation.",
    author: "Dr. Maria Gonzalez",
    date: "January 25, 2023",
    category: "Neuroscience",
    journal: "Cognitive Neuroscience",
    citations: 47,
    year: 2022,
  },
  {
    id: 8,
    title: "Economic Impacts of Global Supply Chain Disruptions",
    abstract:
      "An analysis of how recent global events have affected international supply chains and their consequences for regional and global economies.",
    author: "Prof. Robert Chen",
    date: "December 12, 2022",
    category: "Economics",
    journal: "International Economics Review",
    citations: 29,
    year: 2022,
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const initialCategory = searchParams.get("category") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [results, setResults] = useState<typeof sampleArticles>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : [])
  const [yearRange, setYearRange] = useState([2020, 2023])
  const [sortBy, setSortBy] = useState("relevance")

  const categories = Array.from(new Set(sampleArticles.map((article) => article.category)))

  useEffect(() => {
    performSearch()
  }, [initialQuery, initialCategory])

  const performSearch = () => {
    setIsLoading(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      let filteredResults = [...sampleArticles]

      // Apply search query filter
      if (searchQuery) {
        filteredResults = filteredResults.filter(
          (article) =>
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.author.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      }

      // Apply category filter
      if (selectedCategories.length > 0) {
        filteredResults = filteredResults.filter((article) => selectedCategories.includes(article.category))
      }

      // Apply year range filter
      filteredResults = filteredResults.filter(
        (article) => article.year >= yearRange[0] && article.year <= yearRange[1],
      )

      // Apply sorting
      if (sortBy === "newest") {
        filteredResults.sort((a, b) => b.year - a.year)
      } else if (sortBy === "citations") {
        filteredResults.sort((a, b) => b.citations - a.citations)
      }

      setResults(filteredResults)
      setIsLoading(false)
    }, 800)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch()
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-blue-700 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Search Articles</h1>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search for articles, authors, or keywords..."
                className="w-full pl-10 pr-4 py-6 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <Button type="submit" className="bg-white text-blue-700 hover:bg-blue-50 py-6 px-8">
              Search
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-white text-white hover:bg-blue-600 py-6 px-8 sm:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </Button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${index}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <label htmlFor={`category-${index}`} className="text-sm text-gray-700 cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Publication Year</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={yearRange}
                      min={2020}
                      max={2023}
                      step={1}
                      onValueChange={(value) => setYearRange(value as [number, number])}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>{yearRange[0]}</span>
                      <span>{yearRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Sort By</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="sort-relevance"
                        name="sort"
                        value="relevance"
                        checked={sortBy === "relevance"}
                        onChange={() => setSortBy("relevance")}
                        className="text-blue-700"
                      />
                      <label htmlFor="sort-relevance" className="text-sm text-gray-700">
                        Relevance
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="sort-newest"
                        name="sort"
                        value="newest"
                        checked={sortBy === "newest"}
                        onChange={() => setSortBy("newest")}
                        className="text-blue-700"
                      />
                      <label htmlFor="sort-newest" className="text-sm text-gray-700">
                        Newest First
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="sort-citations"
                        name="sort"
                        value="citations"
                        checked={sortBy === "citations"}
                        onChange={() => setSortBy("citations")}
                        className="text-blue-700"
                      />
                      <label htmlFor="sort-citations" className="text-sm text-gray-700">
                        Most Cited
                      </label>
                    </div>
                  </div>
                </div>

                <Button onClick={performSearch} className="w-full bg-blue-700 hover:bg-blue-800">
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Filters - Mobile */}
          {showFilters && (
            <div className="md:hidden mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <SlidersHorizontal className="h-5 w-5 mr-2" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-category-${index}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                          />
                          <label htmlFor={`mobile-category-${index}`} className="text-sm text-gray-700 cursor-pointer">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Publication Year</h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={yearRange}
                        min={2020}
                        max={2023}
                        step={1}
                        onValueChange={(value) => setYearRange(value as [number, number])}
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>{yearRange[0]}</span>
                        <span>{yearRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Sort By</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="mobile-sort-relevance"
                          name="mobile-sort"
                          value="relevance"
                          checked={sortBy === "relevance"}
                          value="relevance"
                          checked={sortBy === "relevance"}
                          onChange={() => setSortBy("relevance")}
                          className="text-blue-700"
                        />
                        <label htmlFor="mobile-sort-relevance" className="text-sm text-gray-700">
                          Relevance
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="mobile-sort-newest"
                          name="mobile-sort"
                          value="newest"
                          checked={sortBy === "newest"}
                          onChange={() => setSortBy("newest")}
                          className="text-blue-700"
                        />
                        <label htmlFor="mobile-sort-newest" className="text-sm text-gray-700">
                          Newest First
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="mobile-sort-citations"
                          name="mobile-sort"
                          value="citations"
                          checked={sortBy === "citations"}
                          onChange={() => setSortBy("citations")}
                          className="text-blue-700"
                        />
                        <label htmlFor="mobile-sort-citations" className="text-sm text-gray-700">
                          Most Cited
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button onClick={performSearch} className="flex-1 bg-blue-700 hover:bg-blue-800">
                      Apply Filters
                    </Button>
                    <Button onClick={() => setShowFilters(false)} variant="outline" className="flex-1">
                      Close
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Search Results */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                {isLoading ? "Searching..." : `${results.length} Results`}
                {searchQuery && !isLoading && ` for "${searchQuery}"`}
              </h2>
              <Button variant="outline" className="hidden md:flex items-center" onClick={performSearch}>
                <Filter className="h-4 w-4 mr-2" />
                Refresh Results
              </Button>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-4">
                {results.map((article) => (
                  <Card key={article.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{article.category}</Badge>
                        <div className="text-sm text-gray-500">
                          {article.year} • {article.citations} citations
                        </div>
                      </div>
                      <Link href={`/article/${article.id}`}>
                        <CardTitle className="text-xl mb-2 hover:text-blue-700 transition-colors">
                          {article.title}
                        </CardTitle>
                      </Link>
                      <CardDescription className="text-gray-700 mb-4">{article.abstract}</CardDescription>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          By {article.author} • {article.journal}
                        </div>
                        <Link
                          href={`/article/${article.id}`}
                          className="text-blue-700 hover:text-blue-800 font-medium text-sm"
                        >
                          Read full article →
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-medium text-gray-800 mb-2">No results found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategories([])
                      setYearRange([2020, 2023])
                      setSortBy("relevance")
                      performSearch()
                    }}
                    variant="outline"
                    className="mx-auto"
                  >
                    Clear all filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
