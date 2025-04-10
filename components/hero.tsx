"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Discover Academic Excellence</h1>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Access thousands of peer-reviewed articles across multiple disciplines
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
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
              <Button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white py-6 px-8">
                Search
              </Button>
            </div>
          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <span className="text-blue-200">Popular searches:</span>
            <button
              onClick={() => {
                setSearchQuery("machine learning")
                router.push("/search?q=machine%20learning")
              }}
              className="text-white hover:text-blue-300 transition-colors"
            >
              Machine Learning
            </button>
            <button
              onClick={() => {
                setSearchQuery("climate change")
                router.push("/search?q=climate%20change")
              }}
              className="text-white hover:text-blue-300 transition-colors"
            >
              Climate Change
            </button>
            <button
              onClick={() => {
                setSearchQuery("quantum computing")
                router.push("/search?q=quantum%20computing")
              }}
              className="text-white hover:text-blue-300 transition-colors"
            >
              Quantum Computing
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
