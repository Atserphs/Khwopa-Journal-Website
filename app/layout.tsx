import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Poppins } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"

{/* fonts for website */}
const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({ 
  weight: ["400", "600", "700"],
  subsets:["latin"]} )

export const metadata: Metadata = {
  title: "JournalHub - Academic Research Platform",
  description: "Access thousands of peer-reviewed articles across multiple disciplines",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>)
 {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
