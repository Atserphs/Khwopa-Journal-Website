import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function FeaturedArticles() {
  const articles = [
    {
      id: 1,
      title: "Advances in Quantum Computing: A Comprehensive Review",
      description:
        "This paper reviews recent developments in quantum computing algorithms and their potential applications in solving complex computational problems.",
      author: "Dr. Sarah Johnson",
      date: "June 15, 2023",
      category: "Computer Science",
      readTime: "12 min read",
    },
    {
      id: 2,
      title: "Climate Change Impact on Marine Ecosystems",
      description:
        "An analysis of how rising ocean temperatures are affecting marine biodiversity and ecosystem stability across different oceanic regions.",
      author: "Prof. Michael Chen",
      date: "May 22, 2023",
      category: "Environmental Science",
      readTime: "15 min read",
    },
    {
      id: 3,
      title: "Novel Approaches to Sustainable Urban Planning",
      description:
        "This study explores innovative urban design strategies that promote sustainability, resilience, and community well-being in metropolitan areas.",
      author: "Dr. Emily Rodriguez",
      date: "July 3, 2023",
      category: "Urban Studies",
      readTime: "10 min read",
    },
  ]

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Featured Articles</h2>
        <Link href="/search" className="text-blue-700 hover:text-blue-800 font-medium">
          View all articles →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{article.category}</Badge>
                <span className="text-sm text-gray-500">{article.readTime}</span>
              </div>
              <CardTitle className="mt-3 text-xl">{article.title}</CardTitle>
              <CardDescription className="text-gray-600">{article.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                By {article.author} • {article.date}
              </p>
            </CardContent>
            <CardFooter>
              <Link href={`/article/${article.id}`} className="text-blue-700 hover:text-blue-800 font-medium">
                Read full article →
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
