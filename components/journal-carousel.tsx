"use client"

import { useState, useRef, useEffect, type TouchEvent } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { JournalCard } from "./journal-card"

export default function JournalCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(4)
  const [isMobile, setIsMobile] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const journals = [
    {
      id: 1,
      category: "Environmental",
      title: "Advances in Quantum Computing: A Comprehensive Review",
      description:
        "This is a one- or two-line description of the paper, not an abstract. This website has three levels of description: Abstract, short abstract and information.",
      author: "Dr.Sarah Johnson",
      date: "June 15, 2023",
      citations: "23 Citations",
    },
    {
      id: 2,
      category: "Environmental",
      title: "Advances in Quantum Computing: A Comprehensive Review",
      description:
        "This is a one- or two-line description of the paper, not an abstract. This website has three levels of description: Abstract, short abstract and information.",
      author: "Dr.Sarah Johnson",
      date: "June 15, 2023",
      citations: "23 Citations",
    },
    {
      id: 3,
      category: "Environmental",
      title: "Advances in Quantum Computing: A Comprehensive Review",
      description:
        "This is a one- or two-line description of the paper, not an abstract. This website has three levels of description: Abstract, short abstract and information.",
      author: "Dr.Sarah Johnson",
      date: "June 15, 2023",
      citations: "23 Citations",
    },
    {
      id: 4,
      category: "Environmental",
      title: "Advances in Quantum Computing: A Comprehensive Review",
      description:
        "This is a one- or two-line description of the paper, not an abstract. This website has three levels of description: Abstract, short abstract and information.",
      author: "Dr.Sarah Johnson",
      date: "June 15, 2023",
      citations: "23 Citations",
    },
    {
      id: 5,
      category: "Environmental",
      title: "Machine Learning Applications in Climate Science",
      description:
        "This is a one- or two-line description of the paper, not an abstract. This website has three levels of description: Abstract, short abstract and information.",
      author: "Dr.Emily Chen",
      date: "July 22, 2023",
      citations: "18 Citations",
    },
    {
      id: 6,
      category: "Environmental",
      title: "Sustainable Energy Solutions for Urban Development",
      description:
        "This is a one- or two-line description of the paper, not an abstract. This website has three levels of description: Abstract, short abstract and information.",
      author: "Dr.Michael Rodriguez",
      date: "August 5, 2023",
      citations: "31 Citations",
    },
    {
      id: 7,
      category: "Environmental",
      title: "Biodiversity Conservation in Tropical Ecosystems",
      description:
        "This is a one- or two-line description of the paper, not an abstract. This website has three levels of description: Abstract, short abstract and information.",
      author: "Dr.Lisa Thompson",
      date: "May 10, 2023",
      citations: "27 Citations",
    },
    {
      id: 8,
      category: "Environmental",
      title: "Ocean Acidification: Impacts on Marine Ecosystems",
      description:
        "This is a one- or two-line description of the paper, not an abstract. This website has three levels of description: Abstract, short abstract and information.",
      author: "Dr.James Wilson",
      date: "April 18, 2023",
      citations: "42 Citations",
    },
  ]

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setVisibleCount(1)
        setIsMobile(true)
      } else if (width < 1024) {
        setVisibleCount(2)
        setIsMobile(false)
      } else {
        setVisibleCount(4)
        setIsMobile(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleNext = () => {
    if (currentIndex < journals.length - visibleCount) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      handleNext()
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right
      handlePrev()
    }
  }

  // Calculate card width for mobile view
  const getCardStyle = () => {
    if (isMobile) {
      return {
        width: "95%", // Show one full card and part of the next
        marginRight: "3%",
      }
    }
    return {}
  }

  return (
    <div className="w-full py-4 md:py-9 ">
      <h1 className="text-section_heading_sd md:text-section_heading font-semibold text-gray-800 mb-2 md:mb-5">Poppular Journals</h1>

      
      <div className="relative group">
        {/* Only show navigation buttons on non-mobile */}
        {!isMobile && (
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`hidden group-hover:block absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-3 text-gray-800 shadow-lg ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        <div
          className="overflow-hidden px-0 md:px-4"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: isMobile
                ? `translateX(-${currentIndex * 93}%)`
                : `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {journals.map((journal) => (
              <div
                key={journal.id}
                className="flex-shrink-0"
                style={{
                  ...getCardStyle(),
                  width: isMobile ? "90%" : `${100 / visibleCount}%`,
                }}
              >
                <div className={isMobile ? "pr-0" : "px-3"}>
                  <JournalCard {...journal} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Only show navigation buttons on non-mobile */}
        {!isMobile && (
          <button
            onClick={handleNext}
            disabled={currentIndex >= journals.length - visibleCount}
            className={`hidden group-hover:block absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-3 text-gray-800 shadow-lg ${
              currentIndex >= journals.length - visibleCount ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {/* Mobile indicator dots
      {isMobile && (
        <div className="flex justify-center mt-4 space-x-2">
          {journals.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-gray-800" : "bg-gray-300"}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )*/}
    </div>
  )
}
