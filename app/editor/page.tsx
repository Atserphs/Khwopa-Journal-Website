"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Clock, Edit, Filter, Inbox, Search } from "lucide-react"
import EditorSidebar from "@/components/editor-sidebar"
import { ReviewTimeChart, SubmissionStatusChart } from "@/components/dashboard-charts"

export default function EditorDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample data for submissions
  const pendingSubmissions = [
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
  ]

  const revisionsSubmissions = [
    {
      id: 4,
      title: "The Role of Microbiomes in Human Health",
      author: "Dr. Lisa Wong",
      institution: "MIT",
      submittedDate: "July 15, 2023",
      revisionDate: "August 15, 2023",
      category: "Biology",
      status: "revision submitted",
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
    },
  ]

  const readyForPublicationSubmissions = [
    {
      id: 6,
      title: "Neuroplasticity and Learning: New Insights from Longitudinal Studies",
      author: "Dr. Maria Gonzalez",
      institution: "Harvard University",
      submittedDate: "June 10, 2023",
      category: "Neuroscience",
      status: "approved",
    },
    {
      id: 7,
      title: "Economic Impacts of Global Supply Chain Disruptions",
      author: "Prof. John Smith",
      institution: "London School of Economics",
      submittedDate: "July 5, 2023",
      category: "Economics",
      status: "approved",
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <EditorSidebar />

      <div className="flex-1">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Editor Dashboard</h1>

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
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Inbox className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pending Review</p>
                      <h3 className="text-2xl font-bold">{pendingSubmissions.length}</h3>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Needs Action</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <Edit className="h-6 w-6 text-purple-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Revisions</p>
                      <h3 className="text-2xl font-bold">{revisionsSubmissions.length}</h3>
                    </div>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">To Review</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <CheckCircle2 className="h-6 w-6 text-green-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Ready to Publish</p>
                      <h3 className="text-2xl font-bold">{readyForPublicationSubmissions.length}</h3>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Approved</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Submission Status</CardTitle>
                <CardDescription>Current distribution of manuscript submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <SubmissionStatusChart />
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Average Review Time</CardTitle>
                <CardDescription>Average days to complete review by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ReviewTimeChart />
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList>
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
                Ready to Publish ({readyForPublicationSubmissions.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Submissions Pending Review</CardTitle>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Filter className="h-4 w-4" /> Filter
                    </Button>
                  </div>
                  <CardDescription>Manuscripts that need peer review assignments or decisions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {pendingSubmissions.map((submission) => (
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
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="revisions">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Revisions Submitted</CardTitle>
                  <CardDescription>Manuscripts that have been revised and need review</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {revisionsSubmissions.map((submission) => (
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
                              <span className="text-sm text-gray-500">
                                Original: {submission.submittedDate} | Revision: {submission.revisionDate}
                              </span>
                            </div>
                          </div>
                          <Badge className="bg-purple-100 text-purple-800">{submission.status}</Badge>
                        </div>

                        <div className="mt-4 flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            View Changes
                          </Button>
                          <Button variant="outline" size="sm">
                            Send to Reviewers
                          </Button>
                          <Button size="sm">Make Decision</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="approved">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Ready to Publish</CardTitle>
                  <CardDescription>Approved manuscripts ready for publication</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {readyForPublicationSubmissions.map((submission) => (
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
                          <Badge className="bg-green-100 text-green-800">{submission.status}</Badge>
                        </div>

                        <div className="mt-4 flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            Final Review
                          </Button>
                          <Button variant="outline" size="sm">
                            Schedule Publication
                          </Button>
                          <Button size="sm">Publish Now</Button>
                        </div>
                      </div>
                    ))}
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
