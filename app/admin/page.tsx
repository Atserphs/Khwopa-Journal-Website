"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  AlertCircle,
  BarChart3,
  BookOpen,
  Calendar,
  ChevronDown,
  Download,
  FileText,
  LayoutDashboard,
  Shield,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminSidebar from "@/components/admin-sidebar"
import { ActivityLineChart, CategoryBarChart, RevenueAreaChart, UserRolePieChart } from "@/components/dashboard-charts"

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [period, setPeriod] = useState("30days")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>

            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="max-w-md w-full">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-4 pr-4 py-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">Admin User</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Users className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Users</p>
                    <h3 className="text-2xl font-bold">2,543</h3>
                    <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <BookOpen className="h-6 w-6 text-purple-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Publications</p>
                    <h3 className="text-2xl font-bold">1,248</h3>
                    <p className="text-xs text-green-600 mt-1">+8% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FileText className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Submissions</p>
                    <h3 className="text-2xl font-bold">87</h3>
                    <p className="text-xs text-green-600 mt-1">+15% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <BarChart3 className="h-6 w-6 text-yellow-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                    <h3 className="text-2xl font-bold">$42,580</h3>
                    <p className="text-xs text-green-600 mt-1">+18% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Journal Activity</CardTitle>
                  <Select defaultValue={period} onValueChange={setPeriod}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                      <SelectItem value="year">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ActivityLineChart />
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <UserRolePieChart />

                <div className="space-y-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm">Authors</span>
                    </div>
                    <span className="font-medium">91.5%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Reviewers</span>
                    </div>
                    <span className="font-medium">6.1%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-sm">Editors</span>
                    </div>
                    <span className="font-medium">1.9%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm">Admins</span>
                    </div>
                    <span className="font-medium">0.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <RevenueAreaChart />
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Articles by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <CategoryBarChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Users</CardTitle>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((user) => (
                    <div key={user} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-4">
                          <AvatarImage src={`/placeholder.svg?height=40&width=40&text=U${user}`} alt={`User ${user}`} />
                          <AvatarFallback>U{user}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">User Name {user}</h4>
                          <p className="text-sm text-gray-500">user{user}@example.com</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge className="mr-4 bg-blue-100 text-blue-800">Author</Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuItem>Change Role</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Suspend User</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <Button variant="outline" size="sm">
                  Load More
                </Button>
              </CardFooter>
            </Card>

            <div className="space-y-8">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>User Roles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-blue-700 mr-2" />
                        <span>Administrators</span>
                      </div>
                      <Badge>12</Badge>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-purple-700 mr-2" />
                        <span>Editors</span>
                      </div>
                      <Badge>48</Badge>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <BookOpen className="h-5 w-5 text-green-700 mr-2" />
                        <span>Reviewers</span>
                      </div>
                      <Badge>156</Badge>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-yellow-700 mr-2" />
                        <span>Authors</span>
                      </div>
                      <Badge>2,327</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Create New Role</Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div className="mt-8">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>System Status</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" /> Export Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <AlertCircle className="h-6 w-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">System Status</h3>
                      <p className="text-sm text-green-700">All systems operational</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Calendar className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">Last Backup</h3>
                      <p className="text-sm text-blue-700">Today, 03:45 AM</p>
                    </div>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-center">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <LayoutDashboard className="h-6 w-6 text-purple-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">Server Load</h3>
                      <p className="text-sm text-purple-700">23% - Normal</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
