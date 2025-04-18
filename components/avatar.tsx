"use client"

import { useEffect, useRef, useState } from "react"
import {
  Bell,
  Calendar,
  Copy,
  Edit,
  HelpCircle,
  LogOut,
  Mail,
  Settings,
  Sparkles,
  User,
  UserPlus,
  Volume2,
  X,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function UserAvatar() {
  const [open, setOpen] = useState(false)
  const [animating, setAnimating] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 1024px)")
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 })

  // Handle click outside to close the menu (for mobile view)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        isMobile &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, isMobile])

  // Handle back button and swipe for mobile
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (open && isMobile) {
        event.preventDefault()
        setOpen(false)
        history.pushState(null, "", window.location.pathname)
      }
    }

    if (open && isMobile) {
      history.pushState(null, "", window.location.pathname)
      window.addEventListener("popstate", handlePopState)
    }

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [open, isMobile])

  // Store button position for animation
  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setButtonPosition({
        top: rect.top,
        left: rect.left,
      })
    }
  }, [])

  const handleOpen = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setButtonPosition({
        top: rect.top,
        left: rect.left,
      })
    }
    setAnimating(true)
    setOpen(true)
    setTimeout(() => setAnimating(false), 300)
  }

  const handleClose = () => {
    setAnimating(true)
    setTimeout(() => {
      setOpen(false)
      setAnimating(false)
    }, 300)
  }

  // Mobile full-screen profile view
  if (open && isMobile) {
    return (
      <div
        ref={menuRef}
        className={cn(
          "fixed inset-0 z-[100] flex flex-col bg-black text-white transition-all duration-300",
          animating ? "animate-in zoom-in-[0.98]" : "",
        )}
        style={
          animating
            ? {
                transformOrigin: `${buttonPosition.left}px ${buttonPosition.top}px`,
              }
            : {}
        }
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-semibold">Profile & Settings</h2>
          <Button variant="ghost" size="icon" className="h-10 w-10 text-white" onClick={handleClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex flex-col items-center px-4 py-6">
          <div className="relative mb-2">
            <Avatar className="h-24 w-24 border-2 border-white/20">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
              <AvatarFallback className="bg-black text-white text-xl">R</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 ring-2 ring-black"></div>
          </div>
          <h3 className="mt-2 text-2xl font-bold">Raflii Bamanu</h3>
          <p className="text-sm text-white/60">DAWN LEAVES</p>
        </div>

        <div className="px-4 py-2">
          <div className="flex items-center rounded-full bg-white/10 px-4 py-3">
            <span className="mr-2 text-white/60">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full">😊</span>
            </span>
            <Input
              className="h-auto border-0 bg-transparent p-0 text-white shadow-none focus-visible:ring-0"
              placeholder="Set status"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 px-4 py-3">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 rounded-full border-white/20 bg-white/5 py-6 text-white hover:bg-white/10"
          >
            <Edit className="h-5 w-5" />
            <span>Edit profile</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 rounded-full border-white/20 bg-white/5 py-6 text-white hover:bg-white/10"
          >
            <Sparkles className="h-5 w-5 text-purple-400" />
            <span>AI StandUp</span>
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-1 px-2 py-2">
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start gap-3 px-4 py-3 text-white hover:bg-white/10"
            >
              <Calendar className="h-5 w-5 text-white/70" />
              <span>My Calendar</span>
            </Button>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start gap-3 px-4 py-3 text-white hover:bg-white/10"
            >
              <Volume2 className="h-5 w-5 text-white/70" />
              <span>Mute notifications</span>
            </Button>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start gap-3 px-4 py-3 text-white hover:bg-white/10"
            >
              <Settings className="h-5 w-5 text-white/70" />
              <span>Settings</span>
            </Button>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start gap-3 px-4 py-3 text-white hover:bg-white/10"
            >
              <Bell className="h-5 w-5 text-white/70" />
              <span>Notification settings</span>
            </Button>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start gap-3 px-4 py-3 text-white hover:bg-white/10"
            >
              <UserPlus className="h-5 w-5 text-white/70" />
              <span>Invite users</span>
            </Button>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start gap-3 px-4 py-3 text-white hover:bg-white/10"
            >
              <HelpCircle className="h-5 w-5 text-white/70" />
              <span>Help & resources</span>
            </Button>
          </div>

          <div className="mt-6 px-4 py-2">
            <h4 className="mb-3 text-sm font-medium text-white/50">General info</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span>Online</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-white/70" />
                  <span className="text-sm">rafliibamanu21@gmail.com</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4 px-4 py-2">
            <h4 className="mb-3 text-sm font-medium text-white/50">Teams</h4>
            {/* Teams content would go here */}
          </div>
        </div>

        <div className="border-t border-white/10 px-2 py-2">
          <Button
            variant="ghost"
            className="flex w-full items-center justify-start gap-3 px-4 py-3 text-white hover:bg-white/10"
          >
            <LogOut className="h-5 w-5 text-white/70" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    )
  }

  // Desktop dropdown
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          ref={buttonRef}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <span className="text-sm font-medium">R</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 " align="end">
        <div className="p-3">
          <div className="flex items-center">
            <Avatar className="mr-2 h-10 w-10 border">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>R</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">Raflii Bamanu</p>
              <p className="text-xs leading-none text-green-500">Online</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 p-2">
          <div className="flex items-center rounded-md border px-3 py-1.5">
            <span className="mr-2 text-gray-500">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full">😊</span>
            </span>
            <Input className="h-auto border-0 p-0 text-sm shadow-none focus-visible:ring-0" placeholder="Set status" />
          </div>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4 text-gray-500" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4 text-gray-500" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell className="mr-2 h-4 w-4 text-gray-500" />
          <span>Notification settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500 focus:text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
