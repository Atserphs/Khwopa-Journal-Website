"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

//Import for routing
import Link from "next/link"
import { useRouter } from "next/navigation"

//Import for adding image 
import Image from "next/image"

//Import for search interface ui 
import { SearchInterface } from "./search-interface"

//Import for icons 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEject, faHouse, faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Menu,
  X,
  Home,
  Info,
  Mail,
  Database,
  Stethoscope,
  Globe,
  LogIn,
  User,
  Settings,
  LogOut,
  BookText,
  Phone,
  UserPen
} from "lucide-react"


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import UserAvatar  from "@/components/avatar"
import NotificationPanel from "@/components/ui/notification-panel"
import WebsiteLogo from "@/components/ui/logo"
import { SidebarLogo } from "@/components/ui/logo"






export default function Navbar() {

  // ref for button of profile
  const buttonRef = useRef<HTMLButtonElement>(null)


  // state initialzing 
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()




  // state added for search interface
  const [showSearch, setShowSearch] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  // state added for scroll checking
  const [isScrolled, setIsScrolled] = useState(false)




  // scroll checking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10) // You can change 10 to any scroll threshold
    }
  
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  




  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])


  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node) && !isMobile) {
        setShowSearch(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobile])

  const handleSearchClose = () => setShowSearch(false)
  const clearSearch = () => setSearchQuery("")




  // state added for the sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // state added for user dropdown
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)

  // Mock user state (in a real app, this would come from authentication)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const mockUser = {
    name: "Sarah Johnson",
    id: "ID: 12345678",
    email: "sarah.johnson@university.edu",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  // Toggle login status for demo purposes
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn)
    setIsUserDropdownOpen(false)
  }

  // Add refs for the sidebar and user dropdown to detect outside clicks
  const sidebarRef = useRef<HTMLDivElement>(null)
  const userDropdownRef = useRef<HTMLDivElement>(null)

  // Add an effect to handle clicks outside the sidebar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false)
      }

      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false)
      }
    }

    // Add event listener when sidebar or dropdown is open
    if (isSidebarOpen || isUserDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isSidebarOpen, isUserDropdownOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <nav className={` bg-white sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "rounded-tl-[0px] rounded-tr-[0px] rounded-bl-[20px] rounded-br-[20px] shadow-md" : "rounded-none"}`}>
      <div className="container mx-auto max-w-[1780px] px-2 ">
        <div className="flex gap-0 md:gap-5 items-center h-12 md:h-16 ">

          {/* Burger Menu */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-700 hover:text-blue-700 focus:outline-none "
          >
            <Menu className="md:w-[1.7rem] md:h-[1.7rem]" />
          </button>

          {/* Logo and Name */}
          < WebsiteLogo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex grow items-center space-x-8">

              {/* Desktop Search Bar */}
              <div className="hidden md:flex items-center space-x-6 flex-1 max-w-xl mx-auto">
                <div className="relative w-full" ref={searchContainerRef}>
                  <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                    
                    <Input
                      type="text"
                      placeholder="Search by title, authors ..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setShowSearch(true)}
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pl-4 pr-12 py-2 h-8 rounded-full"
                    />

                    <div className="absolute right-0 flex items-center">
                      {searchQuery && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={clearSearch}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                      <Button size="icon" className="h-8 w-8 rounded-r-full bg-transparent hover:bg-khwopaRed text-black hover:text-white">
                        <Search className=" h-5 w-5  " />
                      </Button>
                    </div>

                  </div>

                  {/* Desktop Search Dropdown */}
                  {showSearch && !isMobile && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg z-50 border rounded-[10px] pb-2">
                      <SearchInterface onClose={handleSearchClose} initialQuery={searchQuery} isDropdown={true} />
                    </div>
                  )}
                </div>
              </div>


              {/* Large nav menu */}
              <div className="hidden  md:flex gap-1 items-center text-xs_button_font">
                <Link href="/" className="flex items-center px-2 py-2 rounded-[5px] hover:bg-gray-200 font-medium">
                  < BookText className="h-4"/>
                  Journals
                </Link>
                <Link href="/" className="flex items-center px-2 py-2 rounded-[5px] hover:bg-gray-200 font-medium">
                  < UserPen className="h-4"/>
                  Authors
                </Link>
                <Link href="/about" className="flex items-center px-2 py-2 rounded-[5px] hover:bg-gray-200 font-medium">
                  < Info className="h-4"/>
                  About Us
                </Link>
                <Link href="/contact" className="flex items-center px-2 py-2 rounded-[5px] hover:bg-gray-200 font-medium">
                  < Phone className="h-4"/>
                  Contact Us
                </Link>
              </div>


          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden ">
            <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)}>
              <Search className="w-8 h-8" />
            </Button>
          </div>

          {/* Login button/User/User-dropdrown */}
          <div className="flex items-center ">

            {/* Conditional rendering based on login status */}
            {isLoggedIn ? (
              <div className="flex gap-4 ">
                  < NotificationPanel />
                  < UserAvatar />
              </div>
            ) : (
              <button
                className="text-xs_button_font_sd bg-khwopaRed px-2 py-1 md:py-2 md:px-4 md:text-xs_button_font rounded-[5px] md:rounded-[7px] text-white border hover:bg-red-600 hover:text-white"
                onClick={toggleLogin}
              >
                Login
              </button>
            )}
          </div>

        </div>

        



        {/* Sidebar with animation */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >

          {/* Header of side nav */}
          <div className="p-4 flex justify-between items-center">
            < SidebarLogo />
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center p-1 rounded-full bg-white text-gray-700 hover:bg-khwopaRed hover:text-white focus:outline-none"
            >
              <X className="h-4 w-5" />
            </button>
          </div>

          <div className="px-2">
            <div className=" py-2 text-[13px] font-medium text-gray-500 " >Main</div>
            <Link
              href="/"
              className="flex items-center px-4 py-2 text-[14px] hover:bg-gray-200 rounded-md mt-1 mb-1"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
            
            <Link
              href="/about"
              className="flex items-center px-4 py-2 text-[14px] hover:bg-gray-200 rounded-md mt-1 mb-1"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Info className="h-4 w-4 mr-3" />
              About Us
            </Link>

            <Link
              href="/contact"
              className="flex items-center px-4 py-2 text-[14px] hover:bg-gray-200 rounded-md mt-1 mb-1"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Mail className="h-4 w-4 mr-3" />
              Contact Us
            </Link>

            <div className=" py-2 mt-4 text-[13px] font-medium text-gray-500 ">Categories</div>
            <Link
              href="/search?category=Computer%20Science"
              className="flex items-center px-4 py-2 text-[14px] hover:bg-gray-200 rounded-md mt-1 mb-1"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Database className="h-4 w-5 mr-3" />
              Computer Science
            </Link>
            <Link
              href="/search?category=Medicine"
              className="flex items-center px-4 py-2 text-[14px] hover:bg-gray-200 rounded-md mt-1 mb-1"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Stethoscope className="h-4 w-5 mr-3" />
              Medicine
            </Link>
            <Link
              href="/search?category=Environmental%20Science"
              className="flex items-center px-4 py-2 text-[14px] hover:bg-gray-200 rounded-md mt-1 mb-1"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Globe className="h-4 w-5 mr-3" />
              Environmental Science
            </Link>

            <div className=" py-2 mt-4 text-[13px] font-medium text-gray-500 ">Account</div>
            {isLoggedIn ? (
              <>
                <div className="px-4 py-3 flex items-center text-[14px]">
                <button
                  ref={buttonRef}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <span className="text-sm font-medium">R</span>
                </button>
                  
                  <div className="px-2">
                    <p className="font-medium text-gray-800">{mockUser.name}</p>
                    <p className="text-xs text-gray-500">{mockUser.id}</p>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="flex items-center px-4 py-2 text-[14px] hover:bg-gray-200 rounded-md mt-1 mb-1"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <User className="h-4 w-4 mr-3" />
                  My Profile
                </Link>
                <Link
                  href="/profile#settings"
                  className="flex items-center px-4 py-2 text-[14px] hover:bg-gray-200 rounded-md mt-1 mb-1"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </Link>
                <button
                  onClick={() => {
                    toggleLogin()
                    setIsSidebarOpen(false)
                  }}
                  className="flex items-center w-full text-[14px] px-4 py-3 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                onClick={() => setIsSidebarOpen(false)}
              >
                <LogIn className="h-5 w-5 mr-3" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>


      {/* Mobile Search Overlay */}
      {showSearch && isMobile && (
        <div className="fixed inset-0 bg-white z-50 flex items-start justify-center">
          <div className="w-full h-full ">
            <SearchInterface onClose={handleSearchClose} initialQuery={searchQuery} />
          </div>
        </div>
      )}
    </nav>
  )
}
