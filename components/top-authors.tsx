"use client"

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TopAuthors() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [dragThreshold, setDragThreshold] = useState(50); // Minimum drag distance to trigger slide
  
  const categories = [
    { id: 1, name: "Computer Science", color: "text-pink-600" },
    { id: 2, name: "Environment", color: "text-pink-600" },
    { id: 3, name: "Biology", color: "text-pink-600" },
    { id: 4, name: "Mathematics", color: "text-pink-600" },
    { id: 5, name: "Physics", color: "text-pink-600" }
  ];
  
  const cardItems = [
    { title: "Dil Meri Na Sune (Jhankar)", artist: "Atif Aslam", plays: "1.3B plays" },
    { title: "Jaan Nisaar (Arijit)", artist: "Arijit Singh", plays: "421M plays" },
    { title: "Raanjhan", artist: "Parampara Tandon", plays: "304M plays" },
    { title: "死ぬのがいいわ - Shinunoga E-Wa", artist: "Fujii Kaze", plays: "478M plays" }
  ];
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
      
      // Update card width when window resizes
      if (carouselRef.current) {
        updateCardWidth();
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Update card width after render
  useEffect(() => {
    if (carouselRef.current) {
      updateCardWidth();
    }
  }, [isMobile, isTablet]);
  
  const updateCardWidth = () => {
    if (!carouselRef.current) return;
    
    const containerWidth = carouselRef.current.clientWidth;
    const newCardWidth = isMobile 
      ? containerWidth * 0.85 
      : isTablet 
        ? containerWidth * 0.45 
        : containerWidth / 3;
        
    setCardWidth(newCardWidth);
  };
  
  const maxIndex = categories.length - 1;
  
  const slideToIndex = (indexs) => {
    if (indexs < 0) {
      indexs = 0;
    } else if (indexs > maxIndex) {
      indexs = maxIndex;
    }
    
    setCurrentIndex(indexs);
    
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: indexs * cardWidth,
        behavior: 'smooth'
      });
    }
  };
  
  const handleNext = () => {
    if (currentIndex < maxIndex && !isAnimating) {
      setIsAnimating(true);
      slideToIndex(currentIndex + 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };
  
  const handlePrev = () => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      slideToIndex(currentIndex - 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };
  
  // Touch handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    // Prevent default to avoid scroll interference
    if (isMobile || isTablet) {
      e.preventDefault();
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    // Optional: Prevent default if needed to stop page scrolling
    // e.preventDefault(); // Be careful as this can prevent all scrolling
  };

  const handleTouchEnd = (e) => {
    if (!isDragging) return;
    
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;
    
    // If dragged far enough, change card
    if (Math.abs(diffX) > dragThreshold) {
      if (diffX > 0 && currentIndex > 0) {
        // Swiped right - go to previous card
        slideToIndex(currentIndex - 1);
      } else if (diffX < 0 && currentIndex < maxIndex) {
        // Swiped left - go to next card
        slideToIndex(currentIndex + 1);
      } else {
        // Edge case - snap back to current
        slideToIndex(currentIndex);
      }
    } else {
      // Didn't drag far enough, stay on current card
      slideToIndex(currentIndex);
    }
    
    setIsDragging(false);
  };

  // Get card width based on device for styling
  const getCardWidth = () => {
    if (isMobile) return '95%'; // Full card + partial of next
    if (isTablet) return '45%'; // 2 full cards + partial of 3rd
    return '33.33%'; // 3 full cards on desktop
  };
  
  // For keyboard accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  return (
    <div 
      className="w-full py-4 md:py-9 " 
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <h1 className="text-section_heading_sd md:text-section_heading font-semibold mb-4 md:mb-6">Top Authors</h1>
      
      <div className="group relative ">
        {/* Navigation buttons shown on all devices */}
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0 || isAnimating}
          className={`hidden group-hover:block absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-lg z-10 ${
            currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:bg-gray-100'
          }`}
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={handleNext}
          disabled={currentIndex >= maxIndex || isAnimating}
          className={`hidden md:group-hover:block absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-lg z-10 ${
            currentIndex >= maxIndex ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:bg-gray-100'
          }`}
        >
          <ChevronRight size={24} />
        </button>
        
        {/* Unified carousel implementation for all devices */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-hidden snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {categories.map((category, index) => (
            <div 
              key={category.id} 
              className="snap-start"
              style={{ 
                width: getCardWidth(), 
                flexShrink: 0,
                scrollSnapAlign: 'start'
              }}
            >
              <div className="px-1.5 md:px-3">
                <CardContent category={category} cardItems={cardItems} />
              </div>
            </div>
          ))}
        </div>
        
        {/* Dots indicator 
        <div className="flex justify-center mt-4 space-x-2">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => slideToIndex(index)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index ? 'w-4 bg-pink-600' : 'w-2 bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        */}
      </div>
    </div>
  );
}

// Separated card content component for reuse
function CardContent({ category, cardItems }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-3 md:p-4 h-full">

      {/* card title and more button section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-[1rem] md:text-[1.2rem] font-semibold flex items-center`}>
          <ChevronRight size={20} className="mr-1" />
          {category.name}
        </h2>
        <button className="bg-khwopaRed text-white text-xs_button_font_sd md:text-xs_button_font px-3 py-1 rounded-md ">
          More
        </button>
      </div>
      
      {/* card names and items section */}
      <div className="space-y-2 md:space-y-4">
        {cardItems.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-700 rounded"></div>
            <div className="text-[.8rem]">
              <p className="font-medium">{item.title}</p>
              <p className="text-[.7rem] md:text-sm text-gray-400">{item.artist} • {item.plays}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
