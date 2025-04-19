"use client"

import { Atom, Brain, Briefcase, Globe, Library, Monitor, Microscope, Stethoscope } from "lucide-react"

export default function CategoriesSection() {
  const categories = [
    { name: "Life Science", icon: <Microscope className="h-6 w-6 text-khwopaRed-500" /> },
    { name: "Physics", icon: <Atom className="h-6 w-6 text-khwopaRed-500" /> },
    { name: "Computer", icon: <Monitor className="h-6 w-6 text-khwopaRed-500" /> },
    { name: "Psychology", icon: <Brain className="h-6 w-6 text-khwopaRed-500" /> },
    { name: "Medicine", icon: <Stethoscope className="h-6 w-6 text-khwopaRed-500" /> },
    { name: "Environmental", icon: <Globe className="h-6 w-6 text-khwopaRed-500" /> },
    { name: "Humanities", icon: <Library className="h-6 w-6 text-khwopaRed-500" /> },
    { name: "Business", icon: <Briefcase className="h-6 w-6 text-khwopaRed-500" /> },
  ]

  return (
    <div className="">
      <h2 className="text-section_heading_sd md:text-section_heading py-4 md:py-9 font-semibold ">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-8 gap-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex flex-row gap-5 md:gap-0 md:flex-col items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center text-khwopaRed-500 justify-center md:mb-3">{category.icon}</div>
            <div className="text-xs_button_font_sd md:text-sm font-medium">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
