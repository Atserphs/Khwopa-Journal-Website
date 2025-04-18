"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowLeft, Bell, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

// All available notifications
const allNotifications = [
  // Today's notifications
  {
    id: 1,
    user: {
      name: "Polly",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "P",
    },
    action: "edited",
    target: "Contact page",
    time: "36 mins ago",
    organization: "Craftwork Design",
    unread: true,
    date: "today",
  },
  {
    id: 2,
    user: {
      name: "James",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "J",
    },
    action: "left a comment on",
    target: "ACME 2.1",
    time: "2 hours ago",
    organization: "ACME",
    unread: true,
    date: "today",
  },
  {
    id: 3,
    user: {
      name: "Mary",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "M",
    },
    action: "shared the file",
    target: "Isometric 2.0",
    targetSuffix: "with you",
    time: "3 hours ago",
    organization: "Craftwork Design",
    hasActions: true,
    unread: false,
    date: "today",
  },
  {
    id: 4,
    user: {
      name: "setproduct.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SP",
    },
    action: "mentioned you in",
    target: "ACME 2.1",
    time: "3 hours ago",
    organization: "ACME",
    unread: false,
    date: "today",
  },
  // Yesterday's notifications
  {
    id: 5,
    user: {
      name: "Alex",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "A",
    },
    action: "invited you to",
    target: "Project Kickoff",
    time: "Yesterday at 4:30 PM",
    organization: "ACME",
    unread: false,
    date: "yesterday",
  },
  {
    id: 6,
    user: {
      name: "Sarah",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "S",
    },
    action: "assigned you a task in",
    target: "Website Redesign",
    time: "Yesterday at 2:15 PM",
    organization: "Craftwork Design",
    unread: false,
    date: "yesterday",
  },
  {
    id: 7,
    user: {
      name: "Michael",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "M",
    },
    action: "approved your request for",
    target: "Design Resources",
    time: "Yesterday at 11:30 AM",
    organization: "ACME",
    unread: false,
    date: "yesterday",
  },
  {
    id: 8,
    user: {
      name: "Emma",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "E",
    },
    action: "commented on your design in",
    target: "Mobile App",
    time: "Yesterday at 9:45 AM",
    organization: "Craftwork Design",
    unread: false,
    date: "yesterday",
  },
]

export default function NotificationPanel() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("inbox")
  const [visibleNotifications, setVisibleNotifications] = useState(allNotifications.slice(0, 4))
  const [hasMore, setHasMore] = useState(true)
  const [animating, setAnimating] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 1024px)")
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 })

  // Handle click outside to close the panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
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
  }, [open])

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

  // Load more notifications
  const loadMore = () => {
    const currentLength = visibleNotifications.length
    const nextBatch = allNotifications.slice(currentLength, currentLength + 4)

    if (nextBatch.length > 0) {
      setVisibleNotifications([...visibleNotifications, ...nextBatch])
    }

    // Check if we've loaded all notifications
    if (currentLength + nextBatch.length >= allNotifications.length) {
      setHasMore(false)
    }
  }

  // Group notifications by date
  const groupedNotifications = visibleNotifications.reduce(
    (groups, notification) => {
      const date = notification.date
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(notification)
      return groups
    },
    {} as Record<string, typeof visibleNotifications>,
  )

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

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        className="relative h-8 w-8 rounded-full text-white-500 hover:bg-gray-200"
        onClick={handleOpen}
      >
        <Bell className="h-8 w-8 "  />
        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-khwopaRed text-[10px] text-white">
          2
        </span>
        <span className="sr-only">Notifications</span>
      </Button>

      {open && (
        <div
          ref={panelRef}
          className={cn(
            "fixed z-[100] bg-white shadow-lg transition-all duration-300",
            isMobile
              ? "inset-0 flex flex-col"
              : "absolute right-0 top-full mt-1 w-80 flex-col rounded-md border md:w-96",
            animating && isMobile ? "animate-in zoom-in-[0.98]" : "",
          )}
          style={
            animating && isMobile
              ? {
                  transformOrigin: `${buttonPosition.left}px ${buttonPosition.top}px`,
                }
              : {}
          }
        >
          <div className="flex items-center justify-between border-b p-3">
            {isMobile && (
              <Button variant="ghost" size="icon" className="mr-2 h-8 w-8" onClick={handleClose}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            )}
            <h3 className="font-medium">Notifications</h3>
            <button className="text-sm text-gray-500 hover:text-gray-900">Mark all as read</button>
          </div>

          <Tabs defaultValue="inbox" className="flex w-full flex-col flex-grow">
            <div className="border-b">
              <TabsList className="flex h-auto w-full justify-start rounded-none bg-transparent p-0">
                <TabsTrigger
                  value="inbox"
                  className="relative rounded-none border-b-2 border-transparent px-3 py-2 data-[state=active]:border-purple-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  onClick={() => setActiveTab("inbox")}
                >
                  Inbox <span className="ml-1 rounded-full bg-gray-200 px-1.5 py-0.5 text-xs">2</span>
                </TabsTrigger>
                <TabsTrigger
                  value="general"
                  className="relative rounded-none border-b-2 border-transparent px-3 py-2 data-[state=active]:border-purple-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  onClick={() => setActiveTab("general")}
                >
                  General <span className="ml-1 rounded-full bg-gray-200 px-1.5 py-0.5 text-xs">18</span>
                </TabsTrigger>
                <TabsTrigger
                  value="archived"
                  className="relative rounded-none border-b-2 border-transparent px-3 py-2 data-[state=active]:border-purple-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  onClick={() => setActiveTab("archived")}
                >
                  Archived
                </TabsTrigger>
                <div className="ml-auto flex items-center pr-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">Notification settings</span>
                  </Button>
                </div>
              </TabsList>
            </div>

            <TabsContent value="inbox" className="mt-0 flex flex-col flex-grow">
              <div
                ref={scrollContainerRef}
                className={cn("overflow-y-auto flex-grow", isMobile ? "h-full" : "max-h-[350px]")}
              >
                {Object.entries(groupedNotifications).map(([date, notifications]) => (
                  <div key={date}>
                    <div className="sticky top-0 bg-gray-50 px-3 py-1 text-xs font-medium uppercase text-gray-500">
                      {date === "today" ? "Today" : "Yesterday"}
                    </div>
                    {notifications.map((notification) => (
                      <div key={notification.id} className="relative border-b p-3 hover:bg-gray-50">
                        <div className="flex">
                          <div className="mr-3 flex-shrink-0">
                            <Avatar className="h-10 w-10 border">
                              <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                              <AvatarFallback>{notification.user.initials}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm">
                                <span className="font-medium">{notification.user.name}</span>{" "}
                                <span className="text-gray-600">{notification.action}</span>{" "}
                                <span className="font-medium">{notification.target}</span>{" "}
                                {notification.targetSuffix && (
                                  <span className="text-gray-600">{notification.targetSuffix}</span>
                                )}
                              </p>
                              {notification.unread && <span className="h-2 w-2 rounded-full bg-purple-500"></span>}
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <span>{notification.time}</span>
                              <span className="mx-1">•</span>
                              <span>{notification.organization}</span>
                            </div>
                            {notification.hasActions && (
                              <div className="mt-2 flex space-x-2">
                                <Button variant="outline" size="sm" className="h-8 rounded-md px-3 text-xs">
                                  Decline
                                </Button>
                                <Button
                                  size="sm"
                                  className="h-8 rounded-md bg-purple-500 px-3 text-xs hover:bg-purple-600"
                                >
                                  Accept
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* View more button outside the scrollable area */}
              {hasMore && (
                <div className="border-t p-3 mt-auto">
                  <Button
                    variant="ghost"
                    className="w-full justify-center text-sm text-gray-500 hover:text-gray-900"
                    onClick={loadMore}
                  >
                    View more
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="general" className="mt-0">
              <div className="flex h-32 items-center justify-center">
                <p className="text-sm text-gray-500">General notifications will appear here</p>
              </div>
            </TabsContent>

            <TabsContent value="archived" className="mt-0">
              <div className="flex h-32 items-center justify-center">
                <p className="text-sm text-gray-500">Archived notifications will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
