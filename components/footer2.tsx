"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Twitter, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export default function Footer2() {
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection(null)
    } else {
      setOpenSection(section)
    }
  }

  return (
    <footer className="w-full bg-white pt-12 pb-4  m-auto">
      <div className="container mx-auto px-4 max-w-[1780px] ">
        {/* Logo and tagline */}
        <div className="mb-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start">
            <div className="mr-2">
              <div className="w-10 h-12 bg-red-500 rounded-sm flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                  <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2h11A2.5 2.5 0 0 1 20 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 19.5v-15Zm4.085 4.412L14.5 7.729V4.5h-8v4.412ZM6.5 4a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-15a.5.5 0 0 0-.5-.5h-11Z" />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                <span className="text-red-500">KHWOPA</span>
                <span className="text-gray-700">.Journal</span>
              </h2>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            A leading platform for streaming and sharing research papers, journals, and academic insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Help Links - Dropdown on mobile */}
          <div className="border-b md:border-b-0 pb-2 md:pb-0">
            <div
              className="flex justify-between items-center cursor-pointer md:cursor-default"
              onClick={() => toggleSection("help")}
            >
              <h3 className="font-bold text-lg mb-2 md:mb-4">Help</h3>
              <div className="md:hidden">
                {openSection === "help" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>
            <ul className={`space-y-2 ${openSection === "help" ? "block" : "hidden"} md:block`}>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Publication Ethics
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Submission Guideline
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Open Access Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  For Authors
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  For Reviewers
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links - Dropdown on mobile */}
          <div className="border-b md:border-b-0 pb-2 md:pb-0">
            <div
              className="flex justify-between items-center cursor-pointer md:cursor-default"
              onClick={() => toggleSection("quickLinks")}
            >
              <h3 className="font-bold text-lg mb-2 md:mb-4">Quick Links</h3>
              <div className="md:hidden">
                {openSection === "quickLinks" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>
            <ul className={`space-y-2 ${openSection === "quickLinks" ? "block" : "hidden"} md:block`}>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Authors
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Imp Links - Dropdown on mobile */}
          <div className="border-b md:border-b-0 pb-2 md:pb-0">
            <div
              className="flex justify-between items-center cursor-pointer md:cursor-default"
              onClick={() => toggleSection("impLinks")}
            >
              <h3 className="font-bold text-lg mb-2 md:mb-4">Imp Links</h3>
              <div className="md:hidden">
                {openSection === "impLinks" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>
            <ul className={`space-y-2 ${openSection === "impLinks" ? "block" : "hidden"} md:block`}>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Plans & Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Licenses
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media and Dedication - Center aligned on mobile */}
          <div className="text-center md:text-left">
            <h3 className="font-bold mb-4">We are Available On:</h3>
            <div className="flex justify-center md:justify-start space-x-2 mb-6">
              <Link href="#" className="bg-blue-500 text-white p-2 rounded">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="bg-black text-white p-2 rounded">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="bg-red-500 text-white p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.086 14.746v-5.41h-1.39v5.41h1.39zm5.882-2.703v-2.707h-1.39v2.707c0 1.165-.933 2.108-2.086 2.108h-2.406v1.39h2.406c1.918 0 3.476-1.573 3.476-3.498z" />
                </svg>
                <span className="sr-only">Google Plus</span>
              </Link>
            </div>

            <div>
              <p className="font-bold mb-2">Dedicated to Kaua'i 'ō'ō Bird</p>
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-20 h-20 rounded overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="Kaua'i 'ō'ō Bird"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <p className="text-xs text-gray-600">
                  This project is dedicated to the memory of the Kaua'i 'ō'ō bird, whose beautiful, emotional, sad,
                  desperate call for someone and unforgettable song was silenced by tragic extinction. In 1987, after
                  originating 15-20 million years ago, the entire Kaua'i 'ō'ō family disappeared forever.
                </p>
              </div>

              <div className="flex justify-center md:justify-start space-x-2 mt-4">
                <Link
                  href="#"
                  className="flex items-center space-x-1 bg-gray-800 text-white px-3 py-1 rounded-full text-xs"
                >
                  <span>W</span>
                  <span>Wikipedia</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center space-x-1 bg-gray-800 text-white px-3 py-1 rounded-full text-xs"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="white">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                  <span>Last Voice</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Policy links above the line - Center aligned on mobile */}
        <div className="mt-12 flex justify-center md:justify-start flex-wrap space-x-4">
          <Link href="#" className="font-bold text-gray-600 hover:text-gray-900">
            Privacy Policy
          </Link>
          <Link href="#" className="font-bold text-gray-600 hover:text-gray-900">
            Terms of Service
          </Link>
          <Link href="#" className="font-bold text-gray-600 hover:text-gray-900">
            Cookies Policy
          </Link>
        </div>

        {/* Horizontal line */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div className="mb-2 md:mb-0 text-center md:text-left">
              <p className="text-sm text-gray-600">Copyright © 2025 Khwopa Journal. All Rights Reserved</p>
            </div>
            <div className="text-sm text-gray-600 text-center md:text-right">
              <p>Designed By Rabin Thimi</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
