import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { BookOpen, Atom, Stethoscope, Globe, Brain, Database, Building, FlaskRoundIcon as Flask } from "lucide-react"

export default function JournalCategories() {
  const categories = [
    { name: "Life Sciences", icon: <Flask className="h-8 w-8 mb-4 text-green-600" /> },
    { name: "Physics", icon: <Atom className="h-8 w-8 mb-4 text-purple-600" /> },
    { name: "Medicine", icon: <Stethoscope className="h-8 w-8 mb-4 text-red-600" /> },
    { name: "Environmental Science", icon: <Globe className="h-8 w-8 mb-4 text-blue-600" /> },
    { name: "Psychology", icon: <Brain className="h-8 w-8 mb-4 text-yellow-600" /> },
    { name: "Computer Science", icon: <Database className="h-8 w-8 mb-4 text-indigo-600" /> },
    { name: "Business & Economics", icon: <Building className="h-8 w-8 mb-4 text-orange-600" /> },
    { name: "Humanities", icon: <BookOpen className="h-8 w-8 mb-4 text-teal-600" /> },
  ]

  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Browse by Category</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <Link key={index} href={`/search?category=${encodeURIComponent(category.name)}`}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center text-center p-6">
                {category.icon}
                <h3 className="font-medium text-gray-800">{category.name}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
