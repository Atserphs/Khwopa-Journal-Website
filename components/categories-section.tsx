import { Atom, Brain, Briefcase, Globe, Library, Monitor, Microscope, Stethoscope } from "lucide-react"

export default function CategoriesSection() {
  const categories = [
    { name: "Life Science", icon: <Microscope className="h-6 w-6 text-blue-500" /> },
    { name: "Physics", icon: <Atom className="h-6 w-6 text-blue-500" /> },
    { name: "Computer", icon: <Monitor className="h-6 w-6 text-blue-500" /> },
    { name: "Psychology", icon: <Brain className="h-6 w-6 text-blue-500" /> },
    { name: "Medicine", icon: <Stethoscope className="h-6 w-6 text-blue-500" /> },
    { name: "Environmental", icon: <Globe className="h-6 w-6 text-blue-500" /> },
    { name: "Humanities", icon: <Library className="h-6 w-6 text-blue-500" /> },
    { name: "Business", icon: <Briefcase className="h-6 w-6 text-blue-500" /> },
  ]

  return (
    <div className="py-8 px-4 md:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-8 gap-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-center mb-3">{category.icon}</div>
            <span className="text-sm font-medium">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
