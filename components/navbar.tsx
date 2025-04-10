"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEject, faHouse, faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Menu,
  LayoutDashboard,
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
  BookOpen,
  Bell,
  BirdIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  // Add a state for the sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Add a state for user dropdown
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
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto max-w-[1780px] px-0">
        <div className="flex gap-5 items-center h-16">

          {/* Burger Menu */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-700 hover:text-blue-700 focus:outline-none "
          >
            <Menu className="w-[1.7rem] h-[1.7rem]" />
          </button>

          {/* Logo and Name */}
          <Link href="/" className="flex gap-2 items-center mr-10">
          <div className="relative md: w-8 aspect-square cursor-pointer">
              <Image
                  src="/homepage/logo.png"     
                  alt="Khwopa Journal Logo" 
                  fill 
                  className="object-contain"
                />
            </div>

            <span className="text-[1.8rem] font-bold text-khwopaRed">
              KHWOPA<span className="text-[1.3rem] text-gray-800">.Journal</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex grow items-center space-x-8">

              {/* Large nav menu */}
              <div className="flex gap-1 items-center text-[1rem]">
                <Link href="/" className="px-4 py-2 rounded-[8px] hover:text-white hover:bg-khwopaRed font-medium">
                  <FontAwesomeIcon icon={faHouse} className="mr-2 " />
                  Home
                </Link>
                <Link href="/about" className="px-4 py-2 rounded-[8px] hover:text-white hover:bg-khwopaRed font-medium">
                  <FontAwesomeIcon icon={faEject} className="mr-2" />
                  About Us
                </Link>
                <Link href="/contact" className="px-4 py-2 rounded-[8px] hover:text-white hover:bg-khwopaRed font-medium">
                  <FontAwesomeIcon icon={faSquarePollHorizontal} className="mr-2" />
                  Contact Us
                </Link>
              </div>

              {/* Large Search Bar */}
              <div className="grow border border-yellow-500 flex justify-center">
                <form onSubmit={handleSearch} className="relative w-[500px] border">
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    className=" pl-10 pr-4 py-2 w-[]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </form>
              </div>

          </div>

          {/* Desktop Search and Login/User */}
          <div className="hidden md:flex items-center space-x-4">


            {/* Conditional rendering based on login status */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center focus:outline-none"
                >
                  <Avatar className="h-10 w-10 border-2 border-blue-100 hover:border-blue-300 transition-colors">
                    <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                </button>

                {/* User Dropdown */}
                {isUserDropdownOpen && (
                  <div
                    ref={userDropdownRef}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200"
                  >
                    {/* Upper section with user info */}
                    <div className="p-4 border-b border-gray-200 bg-blue-50">
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 mr-3">
                          <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                          <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-800">{mockUser.name}</p>
                          <p className="text-xs text-gray-500">{mockUser.id}</p>
                        </div>
                      </div>
                    </div>

                    {/* Lower section with links */}
                    <div className="py-2">
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <User className="h-4 w-4 mr-3" />
                        My Profile
                      </Link>
                      <Link
                        href="/profile#submissions"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <BookOpen className="h-4 w-4 mr-3" />
                        My Submissions
                      </Link>
                      <Link
                        href="/notifications"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <Bell className="h-4 w-4 mr-3" />
                        Notifications
                      </Link>
                      <Link
                        href="/profile#settings"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Settings
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={toggleLogin}
                        className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button
                variant="outline"
                className="border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white"
                onClick={toggleLogin}
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-700 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Search className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </form>
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-700 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-700 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-700 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              {isLoggedIn ? (
                <div className="flex items-center py-2">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-800">{mockUser.name}</p>
                    <Link
                      href="/profile"
                      className="text-sm text-blue-700 hover:text-blue-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-700 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Sidebar with animation */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />

        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <span className="text-xl font-bold text-blue-700">
              Journal<span className="text-gray-800">Hub</span>
            </span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-700 hover:text-blue-700 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="py-4">
            <div className="px-4 py-2 text-sm font-medium text-gray-500 uppercase">Main</div>
            <Link
              href="/"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Home className="h-5 w-5 mr-3" />
              Home
            </Link>
            <Link
              href="/about"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Info className="h-5 w-5 mr-3" />
              About Us
            </Link>
            <Link
              href="/contact"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Mail className="h-5 w-5 mr-3" />
              Contact Us
            </Link>

            <div className="px-4 py-2 mt-4 text-sm font-medium text-gray-500 uppercase">Categories</div>
            <Link
              href="/search?category=Computer%20Science"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Database className="h-5 w-5 mr-3" />
              Computer Science
            </Link>
            <Link
              href="/search?category=Medicine"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Stethoscope className="h-5 w-5 mr-3" />
              Medicine
            </Link>
            <Link
              href="/search?category=Environmental%20Science"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Globe className="h-5 w-5 mr-3" />
              Environmental Science
            </Link>

            <div className="px-4 py-2 mt-4 text-sm font-medium text-gray-500 uppercase">Account</div>
            {isLoggedIn ? (
              <>
                <div className="px-4 py-3 flex items-center">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-800">{mockUser.name}</p>
                    <p className="text-xs text-gray-500">{mockUser.id}</p>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <User className="h-5 w-5 mr-3" />
                  My Profile
                </Link>
                <Link
                  href="/profile#settings"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Settings className="h-5 w-5 mr-3" />
                  Settings
                </Link>
                <button
                  onClick={() => {
                    toggleLogin()
                    setIsSidebarOpen(false)
                  }}
                  className="flex items-center w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5 mr-3" />
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
    </nav>
  )
}
