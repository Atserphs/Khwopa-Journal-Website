"use client"
import Link from "next/link"
import { Database, Globe, Home, Info, LogOut, Mail, Settings, Stethoscope, User, X } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface AppSidebarProps {
  isLoggedIn?: boolean
  onClose?: () => void
}

interface SidebarUser {
  name: string
  id: string
  initials: string
}

export function AppSidebar({ isLoggedIn = true, onClose }: AppSidebarProps) {
  const mockUser: SidebarUser = {
    name: "Sarah Johnson",
    id: "12345678",
    initials: "R",
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-r bg-white" collapsible="none">
        <SidebarHeader className="flex items-center justify-between border-b p-4">
          <span className="text-xl font-bold text-blue-600">JournalHub</span>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-5 w-5" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          )}
        </SidebarHeader>

        <SidebarContent>
          {/* Main section */}
          <SidebarGroup>
            <SidebarGroupLabel className="px-4 py-2 text-sm font-medium text-gray-500">Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/" onClick={onClose}>
                      <Home className="h-5 w-5" />
                      <span>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/about" onClick={onClose}>
                      <Info className="h-5 w-5" />
                      <span>About Us</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/contact" onClick={onClose}>
                      <Mail className="h-5 w-5" />
                      <span>Contact Us</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          {/* Categories section */}
          <SidebarGroup>
            <SidebarGroupLabel className="px-4 py-2 text-sm font-medium text-gray-500">CATEGORIES</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/search?category=Computer%20Science" onClick={onClose}>
                      <Database className="h-5 w-5" />
                      <span>Computer Science</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/search?category=Medicine" onClick={onClose}>
                      <Stethoscope className="h-5 w-5" />
                      <span>Medicine</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/search?category=Environmental%20Science" onClick={onClose}>
                      <Globe className="h-5 w-5" />
                      <span>Environmental Science</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          {/* Account section */}
          <SidebarGroup>
            <SidebarGroupLabel className="px-4 py-2 text-sm font-medium text-gray-500">ACCOUNT</SidebarGroupLabel>
            <SidebarGroupContent>
              {isLoggedIn ? (
                <>
                  <div className="px-4 py-3 flex items-center">
                    <Avatar className="h-8 w-8 bg-gray-800 text-white">
                      <AvatarFallback>R</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <p className="font-medium text-gray-800">{mockUser.name}</p>
                      <p className="text-xs text-gray-500">ID: {mockUser.id}</p>
                    </div>
                  </div>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/profile" onClick={onClose}>
                          <User className="h-5 w-5" />
                          <span>My Profile</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/settings" onClick={onClose}>
                          <Settings className="h-5 w-5" />
                          <span>Settings</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="text-red-600 hover:bg-red-50 hover:text-red-700">
                        <button
                          onClick={() => {
                            // Handle logout
                            if (onClose) onClose()
                          }}
                        >
                          <LogOut className="h-5 w-5" />
                          <span>Logout</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </>
              ) : (
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/login" onClick={onClose}>
                        <LogOut className="h-5 w-5" />
                        <span>Login</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
