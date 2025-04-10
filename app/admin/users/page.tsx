"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, Download, Filter, Plus, Search, Trash, UserPlus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AdminSidebar from "@/components/admin-sidebar"

export default function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [currentTab, setCurrentTab] = useState("all")

  const users = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@university.edu",
      role: "Author",
      institution: "Stanford University",
      status: "Active",
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      name: "Prof. Michael Chen",
      email: "michael.chen@university.edu",
      role: "Reviewer",
      institution: "MIT",
      status: "Active",
      lastActive: "1 day ago",
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@university.edu",
      role: "Editor",
      institution: "Harvard University",
      status: "Active",
      lastActive: "3 hours ago",
    },
    {
      id: "4",
      name: "Prof. David Kim",
      email: "david.kim@university.edu",
      role: "Author",
      institution: "UC Berkeley",
      status: "Inactive",
      lastActive: "2 weeks ago",
    },
    {
      id: "5",
      name: "Dr. Lisa Wong",
      email: "lisa.wong@university.edu",
      role: "Reviewer",
      institution: "Caltech",
      status: "Active",
      lastActive: "5 hours ago",
    },
    {
      id: "6",
      name: "Prof. James Wilson",
      email: "james.wilson@university.edu",
      role: "Author",
      institution: "Oxford University",
      status: "Active",
      lastActive: "1 hour ago",
    },
    {
      id: "7",
      name: "Dr. Maria Gonzalez",
      email: "maria.gonzalez@university.edu",
      role: "Editor",
      institution: "Cambridge University",
      status: "Active",
      lastActive: "4 hours ago",
    },
    {
      id: "8",
      name: "Admin User",
      email: "admin@journalhub.com",
      role: "Admin",
      institution: "JournalHub",
      status: "Active",
      lastActive: "Just now",
    },
  ]

  const filteredUsers = users.filter((user) => {
    // Filter by search query
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.institution.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by tab
    const matchesTab =
      currentTab === "all" ||
      (currentTab === "authors" && user.role === "Author") ||
      (currentTab === "reviewers" && user.role === "Reviewer") ||
      (currentTab === "editors" && user.role === "Editor") ||
      (currentTab === "admins" && user.role === "Admin") ||
      (currentTab === "inactive" && user.status === "Inactive")

    return matchesSearch && matchesTab
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already handled by the filter
  }

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const toggleAllUsers = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id))
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>

            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="max-w-md w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-10 pr-4 py-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>

              <Button className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                <span>Add User</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Users</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" /> Filter
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download className="h-4 w-4" /> Export
                  </Button>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Bulk Actions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="activate">Activate Selected</SelectItem>
                      <SelectItem value="deactivate">Deactivate Selected</SelectItem>
                      <SelectItem value="delete">Delete Selected</SelectItem>
                      <SelectItem value="role">Change Role</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab}>
              <div className="px-6">
                <TabsList className="grid grid-cols-3 md:grid-cols-6">
                  <TabsTrigger value="all">All Users</TabsTrigger>
                  <TabsTrigger value="authors">Authors</TabsTrigger>
                  <TabsTrigger value="reviewers">Reviewers</TabsTrigger>
                  <TabsTrigger value="editors">Editors</TabsTrigger>
                  <TabsTrigger value="admins">Admins</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value={currentTab}>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">
                            <Checkbox
                              checked={filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                              onCheckedChange={toggleAllUsers}
                            />
                          </th>
                          <th className="text-left py-3 px-4">User</th>
                          <th className="text-left py-3 px-4">Role</th>
                          <th className="text-left py-3 px-4">Institution</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Last Active</th>
                          <th className="text-right py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <Checkbox
                                checked={selectedUsers.includes(user.id)}
                                onCheckedChange={() => toggleUserSelection(user.id)}
                              />
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-3">
                                  <AvatarImage
                                    src={`/placeholder.svg?height=32&width=32&text=${user.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}`}
                                    alt={user.name}
                                  />
                                  <AvatarFallback>
                                    {user.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{user.name}</div>
                                  <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge
                                className={
                                  user.role === "Admin"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : user.role === "Editor"
                                      ? "bg-purple-100 text-purple-800"
                                      : user.role === "Reviewer"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-blue-100 text-blue-800"
                                }
                              >
                                {user.role}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">{user.institution}</td>
                            <td className="py-3 px-4">
                              <Badge
                                className={
                                  user.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                }
                              >
                                {user.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-500">{user.lastActive}</td>
                            <td className="py-3 px-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <ChevronDown className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                                  <DropdownMenuItem>Edit User</DropdownMenuItem>
                                  <DropdownMenuItem>Change Role</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {user.status === "Active" ? (
                                    <DropdownMenuItem className="text-amber-600">Deactivate</DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem className="text-green-600">Activate</DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash className="h-4 w-4 mr-2" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t px-6 py-4">
                  <div className="text-sm text-gray-500">
                    Showing <span className="font-medium">{filteredUsers.length}</span> of{" "}
                    <span className="font-medium">{users.length}</span> users
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </TabsContent>
            </Tabs>
          </Card>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Add New User</CardTitle>
                <CardDescription>Create a new user account</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">
                        First Name
                      </label>
                      <Input id="firstName" placeholder="Enter first name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </label>
                      <Input id="lastName" placeholder="Enter last name" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="Enter email address" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="institution" className="text-sm font-medium">
                      Institution
                    </label>
                    <Input id="institution" placeholder="Enter institution" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="role" className="text-sm font-medium">
                      Role
                    </label>
                    <Select>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="author">Author</SelectItem>
                        <SelectItem value="reviewer">Reviewer</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" /> Create User
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Bulk Import Users</CardTitle>
                <CardDescription>Import multiple users from a CSV file</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="mx-auto flex flex-col items-center">
                    <Download className="h-10 w-10 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Drop your CSV file here</h3>
                    <p className="text-sm text-gray-500 mt-1">or click to browse</p>
                    <Button variant="outline" className="mt-4">
                      Select File
                    </Button>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">CSV Format Requirements:</h4>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                    <li>First row must contain column headers</li>
                    <li>Required columns: First Name, Last Name, Email, Role</li>
                    <li>Optional columns: Institution, Department</li>
                    <li>Roles must be one of: Author, Reviewer, Editor, Admin</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled>
                  Import Users
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
