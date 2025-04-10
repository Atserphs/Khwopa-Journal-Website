"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Clock, Edit, Filter, Search } from "lucide-react"
import EditorSidebar from "@/components/editor-sidebar"

export default function SubmissionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")

  // Sample data for submissions
  const allSubmissions = [
    {
      id: 1,
      title: "Quantum Neural Networks for Image Recognition",
      author: "Dr. Sarah Johnson",
      institution: "Stanford University",
      submittedDate: "July 20, 2023",
      category: "Computer Science",
      status: "pending review",
      reviewsCompleted: 1,
      reviewsTotal: 3,
    },
    {
      id: 2,
      title: "Sustainable Computing: Energy Efficiency in Data Centers",
      author: "Prof. David Kim",
      institution: "UC Berkeley",
      submittedDate: "August 3, 2023",
      category: "Environmental Science",
      status: "pending review",
      reviewsCompleted: 2,
      reviewsTotal: 3,
    },
    {
      id: 3,
      title: "Machine Learning Applications in Healthcare Diagnostics",
      author: "Dr. James Wilson",
      institution: "Harvard Medical School",
      submittedDate: "August 10, 2023",
      category: "Medical Informatics",
      status: "pending review",
      reviewsCompleted: 0,
      reviewsTotal: 3,
    },
    {
      id: 4,
      title: "The Role of Microbiomes in Human Health",
      author: "Dr. Lisa Wong",
      institution: "MIT",
      submittedDate: "July 15, 2023",
      revisionDate: "August 15, 2023",
      category: "Biology",
      status: "revision submitted",
      reviewsCompleted: 3,
      reviewsTotal: 3,
    },
    {
      id: 5,
      title: "Advancements in Renewable Energy Storage Technologies",
      author: "Prof. Robert Chen",
      institution: "Caltech",
      submittedDate: "June 28, 2023",
      revisionDate: "August 12, 2023",
      category: "Engineering",
      status: "revision submitted",
      reviewsCompleted: 3,
      reviewsTotal: 3,
    },
    {
      id: 6,
      title: "Neuroplasticity and Learning: New Insights from Longitudinal Studies",
      author: "Dr. Maria Gonzalez",
      institution: "Harvard University",
      submittedDate: "June 10, 2023",
      category: "Neuroscience",
      status: "approved",
      reviewsCompleted: 3,
      reviewsTotal: 3,
    },
    {
      id: 7,
      title: "Economic Impacts of Global Supply Chain Disruptions",
      author: "Prof. John Smith",
      institution: "London School of Economics",
      submittedDate: "July 5, 2023",
      category: "Economics",
      status: "approved",
      reviewsCompleted: 3,
      reviewsTotal: 3,
    },
    {
      id: 8,
      title: "Climate Change Effects on Marine Biodiversity",
      author: "Dr. Emily Rodriguez",
      institution: "Scripps Institution of Oceanography",
      submittedDate: "May 12, 2023",
      category: "Environmental Science",
      status: "published",
      reviewsCompleted: 3,
      reviewsTotal: 3,
    },
    {
      id: 9,
      title: "Advances in Quantum Computing Algorithms",
      author: "Dr. Michael Chen",
      institution: "MIT",
      submittedDate: "April 28, 2023",
      category: "Computer Science",
      status: "published",
      reviewsCompleted: 3,
      reviewsTotal: 3,
    },
    {
      id: 10,
      title: "Ethical Considerations in AI Development",
      author: "Prof. Sarah Williams",
      institution: "Oxford University",
      submittedDate: "July 30, 2023",
      category: "Computer Science",
      status: "rejected",
      reviewsCompleted: 3,
      reviewsTotal: 3,
    },
  ]

  // Filter submissions based on search query and filters
  const filteredSubmissions = allSubmissions.filter((submission) => {
    // Filter by search query
    const matchesSearch =
      submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.institution.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by status
    const matchesStatus = statusFilter === "all" || submission.status === statusFilter

    // Filter by category
    const matchesCategory = categoryFilter === "all" || submission.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Sort submissions
  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime()
    } else if (sortOrder === "oldest") {
      return new Date(a.submittedDate).getTime() - new Date(b.submittedDate).getTime()
    } else if (sortOrder === "alphabetical") {
      return a.title.localeCompare(b.title)
    }
    return 0
  })

  // Group submissions by status for tabs
  const pendingSubmissions = sortedSubmissions.filter((s) => s.status === "pending review")
  const revisionsSubmissions = sortedSubmissions.filter((s) => s.status === "revision submitted")
  const approvedSubmissions = sortedSubmissions.filter((s) => s.status === "approved")
  const publishedSubmissions = sortedSubmissions.filter((s) => s.status === "published")
  const rejectedSubmissions = sortedSubmissions.filter((s) => s.status === "rejected")

  // Get unique categories for filter
  const categories = Array.from(new Set(allSubmissions.map((s) => s.category)))

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already handled by the filter
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <EditorSidebar />

      <div className="flex-1">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Submissions</h1>

            <form onSubmit={handleSearch} className="max-w-md w-full ml-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search submissions..."
                  className="w-full pl-10 pr-4 py-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <Card className="mb-8 hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Filter Submissions</CardTitle>
                  <CardDescription>Narrow down submissions by status, category, or date</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending review">Pending Review</SelectItem>
                      <SelectItem value="revision submitted">Revision Submitted</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="alphabetical">Alphabetical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="flex flex-wrap">
              <TabsTrigger value="all" className="flex items-center gap-2">
                All ({sortedSubmissions.length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pending Review ({pendingSubmissions.length})
              </TabsTrigger>
              <TabsTrigger value="revisions" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Revisions ({revisionsSubmissions.length})
              </TabsTrigger>
              <TabsTrigger value="approved" className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Approved ({approvedSubmissions.length})
              </TabsTrigger>
              <TabsTrigger value="published" className="flex items-center gap-2">
                Published ({publishedSubmissions.length})
              </TabsTrigger>
              <TabsTrigger value="rejected" className="flex items-center gap-2">
                Rejected ({rejectedSubmissions.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>All Submissions</CardTitle>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Filter className="h-4 w-4" /> Advanced Filter
                    </Button>
                  </div>
                  <CardDescription>Showing {sortedSubmissions.length} submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {sortedSubmissions.length > 0 ? (
                      sortedSubmissions.map((submission) => (
                        <div key={submission.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-lg text-blue-700 hover:text-blue-800">
                                <a href={`/editor/submissions/${submission.id}`}>{submission.title}</a>
                              </h3>
                              <div className="flex items-center mt-1 text-sm text-gray-600">
                                <span>{submission.author}</span>
                                <span className="mx-2">•</span>
                                <span>{submission.institution}</span>
                              </div>
                              <div className="flex items-center mt-2">
                                <Badge className="bg-blue-100 text-blue-800 mr-2">{submission.category}</Badge>
                                <span className="text-sm text-gray-500">Submitted: {submission.submittedDate}</span>
                                {submission.revisionDate && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <span className="text-sm text-gray-500">Revised: {submission.revisionDate}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <Badge
                              className={
                                submission.status === "pending review"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : submission.status === "revision submitted"
                                    ? "bg-purple-100 text-purple-800"
                                    : submission.status === "approved"
                                      ? "bg-green-100 text-green-800"
                                      : submission.status === "published"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-red-100 text-red-800"
                              }
                            >
                              {submission.status}
                            </Badge>
                          </div>

                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600">Review Progress</span>
                              <span className="text-sm font-medium">
                                {submission.reviewsCompleted}/{submission.reviewsTotal} completed
                              </span>
                            </div>
                            <Progress
                              value={(submission.reviewsCompleted / submission.reviewsTotal) * 100}
                              className="h-2"
                            />
                          </div>

                          <div className="mt-4 flex justify-end space-x-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            {submission.status === "pending review" && (
                              <Button variant="outline" size="sm">
                                Assign Reviewers
                              </Button>
                            )}
                            {(submission.status === "pending review" || submission.status === "revision submitted") && (
                              <Button size="sm">Make Decision</Button>
                            )}
                            {submission.status === "approved" && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                Publish
                              </Button>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No submissions match your filters.</p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => {
                            setSearchQuery("")
                            setStatusFilter("all")
                            setCategoryFilter("all")
                          }}
                        >
                          Clear Filters
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Similar content for other tabs (pending, revisions, approved, etc.) */}
            <TabsContent value="pending">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Submissions Pending Review</CardTitle>
                  <CardDescription>Manuscripts that need peer review assignments or decisions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {pendingSubmissions.length > 0 ? (
                      pendingSubmissions.map((submission) => (
                        <div key={submission.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-lg text-blue-700 hover:text-blue-800">
                                <a href={`/editor/submissions/${submission.id}`}>{submission.title}</a>
                              </h3>
                              <div className="flex items-center mt-1 text-sm text-gray-600">
                                <span>{submission.author}</span>
                                <span className="mx-2">•</span>
                                <span>{submission.institution}</span>
                              </div>
                              <div className="flex items-center mt-2">
                                <Badge className="bg-blue-100 text-blue-800 mr-2">{submission.category}</Badge>
                                <span className="text-sm text-gray-500">Submitted: {submission.submittedDate}</span>
                              </div>
                            </div>
                            <Badge className="bg-yellow-100 text-yellow-800">{submission.status}</Badge>
                          </div>

                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600">Review Progress</span>
                              <span className="text-sm font-medium">
                                {submission.reviewsCompleted}/{submission.reviewsTotal} completed
                              </span>
                            </div>
                            <Progress
                              value={(submission.reviewsCompleted / submission.reviewsTotal) * 100}
                              className="h-2"
                            />
                          </div>

                          <div className="mt-4 flex justify-end space-x-2">
                            <Button variant="outline" size="sm">
                              Assign Reviewers
                            </Button>
                            <Button variant="outline" size="sm">
                              View Manuscript
                            </Button>
                            <Button size="sm">Make Decision</Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No pending submissions match your filters.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
