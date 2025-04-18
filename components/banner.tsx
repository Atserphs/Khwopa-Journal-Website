/**
 * AnimeBanner Component
 *
 * A responsive, auto-sliding carousel banner component built with Embla Carousel.
 * Features:
 * - Auto-sliding every 5 seconds
 * - Pauses for 7 seconds after user interaction
 * - Responsive design for mobile and desktop
 * - Navigation buttons that appear on hover
 * - Gradient overlay for better text readability
 * - Dot indicators for slide position
 * - Hardware-accelerated animations for smooth performance
 *
 * @requires embla-carousel-react - Main carousel library
 * @requires embla-carousel-wheel-gestures - For mouse wheel support
 * @requires lucide-react - For navigation icons
 */

"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Sample data for the carousel slides
 * Replace this with your actual data from an API or CMS
 */
const conferenceData = [
  {
    id: 1,
    title: "Annual Conference on Advanced Materials Science",
    eventType: "Event Announcement",
    date: "May 19-22, 2025",
    location: "Zurich, Switzerland",
    tags: ["Registration Open", "Hybrid Event"],
    description:
      "Join leading researchers and industry experts for the 15th International Conference on Advanced Materials Science. Featuring keynote speakers from MIT, Cambridge, and Tokyo Institute of Technology.",
    buttons: [
      { text: "Register Now", primary: true },
      { text: "View Program", primary: false },
    ],
    image: "/placeholder.svg?height=500&width=1200", // Replace with your actual image path
  },
  {
    id: 2,
    title: "Global Summit on Renewable Energy",
    eventType: "Event Announcement",
    date: "June 8-12, 2025",
    location: "Copenhagen, Denmark",
    tags: ["Early Bird Open", "In-Person"],
    description:
      "Connect with sustainability leaders and energy innovators at the premier renewable energy conference. Explore the latest advancements in solar, wind, and hydrogen technologies with experts from around the world.",
    buttons: [
      { text: "Register Now", primary: true },
      { text: "View Program", primary: false },
    ],
    image: "/placeholder.svg?height=500&width=1200", // Replace with your actual image path
  },
  {
    id: 3,
    title: "International Symposium on AI Ethics",
    eventType: "Event Announcement",
    date: "September 3-5, 2025",
    location: "Toronto, Canada",
    tags: ["Registration Open", "Virtual Option"],
    description:
      "Addressing the critical ethical challenges of artificial intelligence in society. Join policymakers, researchers, and industry leaders to shape the future of responsible AI development and governance.",
    buttons: [
      { text: "Register Now", primary: true },
      { text: "View Program", primary: false },
    ],
    image: "/placeholder.svg?height=500&width=1200", // Replace with your actual image path
  },
]

export function Banner() {
  /**
   * Initialize Embla Carousel with optimized options
   *
   * @param options - Configuration options for the carousel
   *   - loop: true - Enables infinite looping
   *   - align: "start" - Aligns slides to the start of the container
   *   - skipSnaps: false - Don't skip snaps for better UX
   *   - dragFree: false - Better snapping behavior
   *   - containScroll: "trimSnaps" - Prevents overscrolling
   *   - draggable: true - Enables drag interactions
   *
   * @param plugins - Array of plugins to enhance carousel functionality
   *   - WheelGesturesPlugin - Enables mouse wheel navigation
   */
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: false,
      containScroll: "trimSnaps",
      //draggable: true,
    },
    [WheelGesturesPlugin({ forceWheelAxis: "x" })], // Force horizontal wheel scrolling
  )

  // State for navigation button visibility
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  /**
   * Auto-sliding state and refs
   *
   * autoSlideEnabled: Controls whether auto-sliding is active
   * autoSlideIntervalRef: Stores the interval ID for auto-sliding
   * pauseTimeoutRef: Stores the timeout ID for pausing auto-sliding
   */
  const [autoSlideEnabled, setAutoSlideEnabled] = useState(true)
  const autoSlideIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  /**
   * Scroll to previous slide and pause auto-sliding
   */
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
    pauseAutoSlide()
  }, [emblaApi])

  /**
   * Scroll to next slide and pause auto-sliding
   */
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
    pauseAutoSlide()
  }, [emblaApi])

  /**
   * Update state when slide selection changes
   * Called by Embla Carousel on slide change
   */
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  /**
   * Pause auto-sliding for 7 seconds after user interaction
   * After 7 seconds, auto-sliding will resume from the current slide
   */
  const pauseAutoSlide = useCallback(() => {
    // Disable auto-sliding
    setAutoSlideEnabled(false)

    // Clear any existing pause timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current)
    }

    // Set a timeout to re-enable auto-sliding after 7 seconds
    pauseTimeoutRef.current = setTimeout(() => {
      setAutoSlideEnabled(true)
    }, 7000) // 7 seconds pause
  }, [])

  /**
   * Set up auto-sliding effect
   * This effect runs when autoSlideEnabled changes
   */
  useEffect(() => {
    if (!emblaApi) return

    // Function to handle auto-sliding
    const handleAutoSlide = () => {
      if (autoSlideEnabled && emblaApi) {
        emblaApi.scrollNext()
      }
    }

    // Set up the interval for auto-sliding
    if (autoSlideEnabled) {
      // Clear any existing interval
      if (autoSlideIntervalRef.current) {
        clearInterval(autoSlideIntervalRef.current)
      }

      // Set a new interval
      autoSlideIntervalRef.current = setInterval(handleAutoSlide, 5000) // 5 seconds
    } else if (autoSlideIntervalRef.current) {
      // If auto-sliding is disabled, clear the interval
      clearInterval(autoSlideIntervalRef.current)
      autoSlideIntervalRef.current = null
    }

    // Clean up on unmount or when dependencies change
    return () => {
      if (autoSlideIntervalRef.current) {
        clearInterval(autoSlideIntervalRef.current)
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current)
      }
    }
  }, [emblaApi, autoSlideEnabled])

  /**
   * Set up event listeners and initialize carousel
   * This effect runs once when the component mounts
   */
  useEffect(() => {
    if (!emblaApi) return

    // Optimize reflow and repaints
    emblaApi.reInit()
    onSelect()

    // Set up event listeners
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    // Set up user interaction listeners
    const handlePointerDown = () => pauseAutoSlide()
    emblaApi.on("pointerDown", handlePointerDown)

    return () => {
      // Clean up event listeners
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
      emblaApi.off("pointerDown", handlePointerDown)
    }
  }, [emblaApi, onSelect, pauseAutoSlide])

  return (
    <div
      className="relative overflow-hidden rounded-lg group"
      onMouseEnter={() => {
        setIsHovering(true)
        pauseAutoSlide()
      }}
      onMouseLeave={() => setIsHovering(false)}
      onClick={pauseAutoSlide}
      onKeyDown={pauseAutoSlide}
    >
      {/* Main carousel container */}
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex will-change-transform">
          {/* Map through slides data */}
          {conferenceData.map((item) => (
            <div
              key={item.id}
              className="embla__slide relative flex-[0_0_100%] min-w-0 will-change-transform"
              style={{
                // Performance optimizations for smooth animations
                WebkitBackfaceVisibility: "hidden",
                WebkitPerspective: 1000,
                WebkitTransform: "translate3d(0,0,0)",
              }}
            >
              <div className="relative h-[230px] md:h-[400px] rounded-[15px] md:rounded-none md:h-[500px] w-full overflow-hidden">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />

                {/* Gradient Overlay - Dark blue-gray gradient that's darker on the left */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/80 to-slate-700/60" />

                {/* Content */}
                <div className="relative z-20 flex flex-col justify-center h-full p-6 md:p-12 text-white max-w-4xl">
                  {/* Event type label */}
                  <div className="mb-3"><span className="text-white text-[.6rem] md:text-[1rem] bg-green-500 rounded-lg p-1 px-2 md:font-medium mb-5">{item.eventType}</span></div>

                  {/* Title */}
                  <h2 className="text-[1rem] md:text-5xl font-bold leading-tight mb-1 md:mb-4 text-white">{item.title}</h2>

                  {/* Event details */}
                  <div className=" flex flex-wrap items-center gap-3 mb-4 text-[.6rem] md:text-sm">
                    <span className="text-white/90">{item.date}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
                    <span className="text-white/90">{item.location}</span>

                    {/* Tags */}
                    <div className="flex gap-2 m-0 md:mt-2 md:mt-0 md:ml-2">
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={cn(
                            "px-3 py-1 text-[.6rem] md:text-xs font-medium rounded-md",
                            index === 0 ? "bg-khwopaRed text-white" : "bg-slate-600/90 text-white",
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p className=" hidden md:block md:text-white/80 mb-8 max-w-3xl">{item.description}</p>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-1 md:gap-4">
                    {item.buttons.map((button, index) => (
                      <button
                        key={index}
                        className={cn(
                          "px-3 py-1 md:px-6 md:py-2.5 text-[.8rem] md:text-[1rem] font-medium rounded-md transition-colors",
                          button.primary
                            ? "bg-khwopaRed hover:bg-teal-600 text-white"
                            : "bg-slate-700/80 hover:bg-slate-600/80 text-white border border-slate-600",
                        )}
                        onClick={(e) => {
                          e.stopPropagation() // Prevent double triggering
                          pauseAutoSlide()
                        }}
                      >
                        {button.text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Auto-slide indicator (small dot in corner) 
      <div
        className={cn(
          "absolute top-4 right-4 w-1 h-1 md:w-2 md:h-2 rounded-full transition-colors duration-300",
          autoSlideEnabled ? "bg-teal-400" : "bg-amber-400",
        )}
        title={autoSlideEnabled ? "Auto-sliding active" : "Auto-sliding paused"}
      />
      */}

      {/* Previous button - Only visible on hover */}
      <button
        className={cn(
          "absolute top-1/2 left-2 md:left-4 z-30 flex h-8 w-8 md:h-10 md:w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 transition-all hover:bg-black/50",
          !prevBtnEnabled && "opacity-50 cursor-not-allowed",
          isHovering ? "opacity-100" : "opacity-0",
          "transition-opacity duration-300",
        )}
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 text-white" />
      </button>

      {/* Next button - Only visible on hover */}
      <button
        className={cn(
          "absolute top-1/2 right-2 md:right-4 z-30 flex h-8 w-8 md:h-10 md:w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 transition-all hover:bg-black/50",
          !nextBtnEnabled && "opacity-50 cursor-not-allowed",
          isHovering ? "opacity-100" : "opacity-0",
          "transition-opacity duration-300",
        )}
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 text-white" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {conferenceData.map((_, index) => (
          <button
            key={index}
            className={`h-1 md:h-2 rounded-full transition-all ${
              index === selectedIndex ? "bg-white w-6" : "bg-white/50 w-2"
            }`}
            onClick={() => {
              emblaApi?.scrollTo(index)
              pauseAutoSlide()
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Banner
