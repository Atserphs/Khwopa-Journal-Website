"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { BookOpen, FileText, Save, Settings, User } from "lucide-react"
import Footer from "@/components/footer1"

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@university.edu",
    institution: "Stanford University",
    department: "Computer Science",
    bio: "Professor of Computer Science specializing in quantum computing and artificial intelligence. Published over 50 papers in leading journals.",
    orcid: "0000-0002-1825-0097",
    website: "https://sarahjohnson.edu",
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    // In a real app, you would save to backend here
    setIsEditing(false)
    alert("Profile updated successfully!")
  }

  const publishedArticles = [
    {
      id: 1,
      title: "Advances in Quantum Computing: A Comprehensive Review",
      journal: "Journal of Quantum Information",
      date: "June 15, 2023",
      citations: 42,
      status: "published",
    },
    {
      id: 2,
      title: "Machine Learning Approaches to Drug Discovery",
      journal: "Medical Informatics Journal",
      date: "March 10, 2023",
      citations: 28,
      status: "published",
    },
    {
      id: 3,
      title: "Ethical Considerations in AI Research",
      journal: "Journal of AI Ethics",
      date: "January 5, 2023",
      citations: 15,
      status: "published",
    },
  ]

  const submittedArticles = [
    {
      id: 4,
      title: "Quantum Neural Networks for Image Recognition",
      journal: "Journal of Quantum Information",
      date: "July 20, 2023",
      status: "under review",
    },
    {
      id: 5,
      title: "Sustainable Computing: Energy Efficiency in Data Centers",
      journal: "Environmental Computing",
      date: "August 3, 2023",
      status: "revision requested",
    },
  ]

  const savedArticles = [
    {
      id: 101,
      title: "Climate Change Impact on Marine Ecosystems",
      author: "Prof. Michael Chen",
      journal: "Environmental Research Letters",
      date: "May 22, 2023",
    },
    {
      id: 102,
      title: "Novel Approaches to Sustainable Urban Planning",
      author: "Dr. Emily Rodriguez",
      journal: "Journal of Urban Planning",
      date: "July 3, 2023",
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">My Profile</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 md:w-auto">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="publications" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Publications</span>
            </TabsTrigger>
            <TabsTrigger value="submissions" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Submissions</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col items-center">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <CardTitle>{profileData.name}</CardTitle>
                      <CardDescription>{profileData.institution}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium text-sm text-gray-500">Email</h3>
                      <p>{profileData.email}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500">Department</h3>
                      <p>{profileData.department}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500">ORCID ID</h3>
                      <p>{profileData.orcid}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500">Website</h3>
                      <a href={profileData.website} className="text-blue-700 hover:underline">
                        {profileData.website}
                      </a>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" value={profileData.name} onChange={handleProfileChange} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" value={profileData.email} onChange={handleProfileChange} />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="institution">Institution</Label>
                            <Input
                              id="institution"
                              name="institution"
                              value={profileData.institution}
                              onChange={handleProfileChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Input
                              id="department"
                              name="department"
                              value={profileData.department}
                              onChange={handleProfileChange}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="orcid">ORCID ID</Label>
                            <Input id="orcid" name="orcid" value={profileData.orcid} onChange={handleProfileChange} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input
                              id="website"
                              name="website"
                              value={profileData.website}
                              onChange={handleProfileChange}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">Biography</Label>
                          <Textarea
                            id="bio"
                            name="bio"
                            rows={5}
                            value={profileData.bio}
                            onChange={handleProfileChange}
                          />
                        </div>

                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleSaveProfile}>Save Changes</Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-700">{profileData.bio}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Research Interests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Quantum Computing</Badge>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Artificial Intelligence</Badge>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Machine Learning</Badge>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Computational Ethics</Badge>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Algorithm Design</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-3xl font-bold text-blue-700">52</p>
                        <p className="text-sm text-gray-600">Publications</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-3xl font-bold text-blue-700">1,248</p>
                        <p className="text-sm text-gray-600">Citations</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-3xl font-bold text-blue-700">18</p>
                        <p className="text-sm text-gray-600">h-index</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-3xl font-bold text-blue-700">12</p>
                        <p className="text-sm text-gray-600">Years Active</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Publications Tab */}
          <TabsContent value="publications">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Published Articles</CardTitle>
                  <CardDescription>Articles you have published in journals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {publishedArticles.map((article) => (
                      <div key={article.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-blue-700 hover:text-blue-800">
                              <a href={`/article/${article.id}`}>{article.title}</a>
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {article.journal} • {article.date}
                            </p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">{article.citations} citations</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Publications
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Saved Articles</CardTitle>
                  <CardDescription>Articles you have saved for later reading</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {savedArticles.map((article) => (
                      <div key={article.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-blue-700 hover:text-blue-800">
                              <a href={`/article/${article.id}`}>{article.title}</a>
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              By {article.author} • {article.journal} • {article.date}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Save className="h-4 w-4 mr-1" /> Unsave
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>My Submissions</CardTitle>
                      <CardDescription>Track the status of your article submissions</CardDescription>
                    </div>
                    <Button>Submit New Article</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {submittedArticles.map((article) => (
                      <div key={article.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-blue-700 hover:text-blue-800">
                              <a href={`/submissions/${article.id}`}>{article.title}</a>
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {article.journal} • Submitted on {article.date}
                            </p>
                          </div>
                          <Badge
                            className={
                              article.status === "under review"
                                ? "bg-yellow-100 text-yellow-800"
                                : article.status === "revision requested"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-green-100 text-green-800"
                            }
                          >
                            {article.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Peer Review Invitations</CardTitle>
                  <CardDescription>Articles you have been invited to review</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <p className="text-gray-500">You have no pending review invitations.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="change-password">Change Password</Label>
                      <Button variant="outline" className="w-full" id="change-password">
                        Update Password
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <Button variant="outline" className="w-full" id="two-factor">
                        Enable 2FA
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="delete-account">Delete Account</Label>
                      <Button variant="destructive" className="w-full" id="delete-account">
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Email Notifications</h3>
                          <p className="text-sm text-gray-500">Receive email updates about your account</p>
                        </div>
                        <Switch id="email-notifications" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">New Publication Alerts</h3>
                          <p className="text-sm text-gray-500">
                            Get notified when new articles are published in your field
                          </p>
                        </div>
                        <Switch id="publication-alerts" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Citation Alerts</h3>
                          <p className="text-sm text-gray-500">Get notified when your articles are cited</p>
                        </div>
                        <Switch id="citation-alerts" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Review Invitations</h3>
                          <p className="text-sm text-gray-500">Receive notifications about peer review requests</p>
                        </div>
                        <Switch id="review-invitations" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Marketing Communications</h3>
                          <p className="text-sm text-gray-500">Receive updates about new features and promotions</p>
                        </div>
                        <Switch id="marketing" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="ml-auto">Save Preferences</Button>
                  </CardFooter>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Profile Visibility</h3>
                          <p className="text-sm text-gray-500">Make your profile visible to other users</p>
                        </div>
                        <Switch id="profile-visibility" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Show Email Address</h3>
                          <p className="text-sm text-gray-500">Display your email address on your public profile</p>
                        </div>
                        <Switch id="show-email" />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Research Interests Visibility</h3>
                          <p className="text-sm text-gray-500">Show your research interests on your public profile</p>
                        </div>
                        <Switch id="interests-visibility" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="ml-auto">Save Privacy Settings</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  )
}
