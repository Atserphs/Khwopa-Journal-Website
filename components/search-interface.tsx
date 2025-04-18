"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Search, Tag, User, X, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchInterfaceProps {
  onClose?: () => void
  initialQuery?: string
  isDropdown?: boolean
}

export function SearchInterface({ onClose, initialQuery = "", isDropdown = false }: SearchInterfaceProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [showResults, setShowResults] = useState(initialQuery.length >= 4)

  // Sample data
  const recentSearches = [
    "Earthquake study in Bhaktapur",
    "Earthquake study in Bhaktapur and Nepal Risk",
    "Earthquake study in Bhaktapur and Nep ....",
  ]

  const popularTags = [
    { icon: "🏠", name: "Earthquake" },
    { icon: "🌿", name: "Natural Science" },
    { icon: "🛡️", name: "Cyber Security" },
    { icon: "🌎", name: "Climate Science & tech" },
  ]

  const defaultAuthors = ["Abhi Rawal", "Rajan Sharma", "Rajendra Raj Bhand"]

  const earthquakeAuthors = [
    "Er Ramesh - Master Earthquake",
    "Ramesh Er (Earthquake)",
    "Raj Ram Poudel (Earthquake Specialist)",
  ]

  // Generate search results based on query
  const getSearchResults = (query: string) => {
    if (!query) return []

    return [
      `${query} study in Bhaktapur`,
      `${query} research papers 2023`,
      `${query} impact on Nepal`,
      `${query} prevention methods`,
    ]
  }

  // Update showResults when searchQuery changes
  useEffect(() => {
    setShowResults(searchQuery.length >= 4)
  }, [searchQuery])

  // Update local search query when initialQuery changes
  useEffect(() => {
    setSearchQuery(initialQuery)
  }, [initialQuery])

  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className={` ${!isDropdown ? " shadow-sm p-4 h-full w-full max-w-md mx-auto" : "p-3"}`}>
      {/* Search bar for mobile */}
      {!isDropdown && (
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="relative flex-1">
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
              <Input
                type="text"
                placeholder="Search by title, authors ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 text-[.8rem] focus-visible:ring-0 focus-visible:ring-offset-0 pl-4 pr-12 py-3 h-9 rounded-full"
              />
              <div className="absolute right-0 flex items-center">
                <Button size="icon" className="h-9 w-10 rounded-r-full bg-red-500 hover:bg-red-600">
                  <Search className="h-5 w-5 text-white" />
                </Button>
              </div>
            </div>
          </div>

          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={clearSearch}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}




      {/* Content based on search query length */}
      {!showResults ? (
        // Initial state - show recent searches and popular tags
        <div className="md:p-3">
          <div className="mb-6">
            <h2 className="font-bold text-md mb-2">Recent Search</h2>
            <div className="space-y-3">
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-2 py-1 bg-white rounded-md cursor-pointer hover:bg-gray-100"
                  onClick={() => setSearchQuery(search)}
                >
                  <Search className="h-5 w-5 text-gray-500" />
                  <span className="text-sm">{search}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="h-5 w-5" />
              <h2 className="font-bold text-md">Popular Tags</h2>
            </div>
            <div className="flex flex-wrap gap-2 ">
              {popularTags.map((tag, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="rounded-full text-sm py-1 h-auto bg-gray-100 border-none"
                  onClick={() => setSearchQuery(tag.name)}
                >
                  <span className="mr-1">{tag.icon}</span> {tag.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <User className="h-5 w-5" />
              <h2 className="font-bold text-md">Authors</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {defaultAuthors.map((author, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="rounded-full text-sm py-1 h-auto bg-gray-100 border-none"
                  onClick={() => setSearchQuery(author)}
                >
                  {author}
                </Button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Search results state - show matching results and authors
        <>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5" />
              <h2 className="font-bold text-md">Search Results</h2>
            </div>
            <div className="space-y-3">
              {getSearchResults(searchQuery).map((result, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-2 pl-5  rounded-md cursor-pointer hover:bg-gray-100"
                >
                  <span className="text-sm">{result}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-5 w-5" />
              <h2 className="font-bold text-md">Authors</h2>
            </div>
            <div className="space-y-2 pl-2 text-[.9rem]">
              {earthquakeAuthors.map((author, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span>{author}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <Button className="w-[50%] md:w-full  bg-red-500 hover:bg-red-600 text-white rounded-full py-3">View Results</Button>
          </div>
        </>
      )}
    </div>
  )
}
