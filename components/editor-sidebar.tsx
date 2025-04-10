"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  BookOpen,
  ChevronLeft,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Users,
  X,
} from "lucide-react"

export default function EditorSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Mobile Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-full bg-white border-r border-gray-200 transition-all duration-300 md:static
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? "w-20" : "w-64"}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/editor" className="flex items-center">
              <BookOpen className="h-6 w-6 text-blue-700" />
              {!isCollapsed && <span className="ml-2 font-bold text-xl">Editor Panel</span>}
            </Link>
            <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setIsCollapsed(!isCollapsed)}>
              <ChevronLeft className={`h-5 w-5 transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
            </Button>
          </div>

          <div className="flex-1 py-6 overflow-y-auto">
            <nav className="px-2 space-y-1">
              <NavItem
                href="/editor"
                icon={<LayoutDashboard className="h-5 w-5" />}
                text="Dashboard"
                isCollapsed={isCollapsed}
              />
              <NavItem
                href="/editor/submissions"
                icon={<Inbox className="h-5 w-5" />}
                text="Submissions"
                isCollapsed={isCollapsed}
              />
              <NavItem
                href="/editor/reviews"
                icon={<FileText className="h-5 w-5" />}
                text="Reviews"
                isCollapsed={isCollapsed}
              />
              <NavItem
                href="/editor/publications"
                icon={<BookOpen className="h-5 w-5" />}
                text="Publications"
                isCollapsed={isCollapsed}
              />
              <NavItem
                href="/editor/messages"
                icon={<MessageSquare className="h-5 w-5" />}
                text="Messages"
                isCollapsed={isCollapsed}
              />
              <NavItem
                href="/editor/authors"
                icon={<Users className="h-5 w-5" />}
                text="Authors"
                isCollapsed={isCollapsed}
              />
              <NavItem
                href="/editor/analytics"
                icon={<BarChart3 className="h-5 w-5" />}
                text="Analytics"
                isCollapsed={isCollapsed}
              />
              <NavItem
                href="/editor/settings"
                icon={<Settings className="h-5 w-5" />}
                text="Settings"
                isCollapsed={isCollapsed}
              />
            </nav>
          </div>

          <div className="p-4 border-t">
            <div className={`flex ${isCollapsed ? "justify-center" : "items-center"}`}>
              {!isCollapsed && (
                <div className="mr-3">
                  <p className="font-medium text-sm">John Editor</p>
                  <p className="text-xs text-gray-500">editor@journal.com</p>
                </div>
              )}
              <Button variant="ghost" size="icon" className="text-red-500">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  text: string
  isCollapsed: boolean
}

function NavItem({ href, icon, text, isCollapsed }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 hover:text-blue-700 transition-colors
        ${href === "/editor" ? "bg-blue-50 text-blue-700" : ""}
        ${isCollapsed ? "justify-center" : ""}
      `}
    >
      <span className="flex-shrink-0">{icon}</span>
      {!isCollapsed && <span className="ml-3">{text}</span>}
    </Link>
  )
}
