import { Bookmark, Award } from "lucide-react"

interface JournalCardProps {
  category: string
  title: string
  description: string
  author: string
  date: string
  citations: string
}

export function JournalCard({ category, title, description, author, date, citations }: JournalCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden h-full shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <span className="inline-flex items-center text-green-600 text-sm">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.5 12H17.5M17.5 12L13 7.5M17.5 12L13 16.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {category}
            </span>
          </div>
          <button className="text-yellow-500 hover:text-yellow-600">
            <Bookmark size={18} />
          </button>
        </div>

        <h2 className="text-lg font-bold mb-2 text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mb-4 flex-grow">{description}</p>

        <div className="text-sm text-gray-700 mb-3">By {author}</div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <span className="bg-pink-600 text-white text-xs px-3 py-1 rounded-full">{date}</span>
            <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">{citations}</span>
          </div>
          <button className="text-yellow-500 hover:text-yellow-600">
            <Award size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
