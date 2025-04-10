"use client"

import { useEffect, useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// Sample data for charts
const activityData = [
  { name: "Jan", submissions: 65, publications: 28, reviews: 42 },
  { name: "Feb", submissions: 59, publications: 32, reviews: 48 },
  { name: "Mar", submissions: 80, publications: 37, reviews: 61 },
  { name: "Apr", submissions: 81, publications: 39, reviews: 65 },
  { name: "May", submissions: 56, publications: 28, reviews: 43 },
  { name: "Jun", submissions: 55, publications: 30, reviews: 47 },
  { name: "Jul", submissions: 72, publications: 35, reviews: 57 },
  { name: "Aug", submissions: 69, publications: 33, reviews: 54 },
  { name: "Sep", submissions: 88, publications: 42, reviews: 69 },
  { name: "Oct", submissions: 74, publications: 36, reviews: 58 },
  { name: "Nov", submissions: 67, publications: 32, reviews: 51 },
  { name: "Dec", submissions: 62, publications: 29, reviews: 46 },
]

const userRoleData = [
  { name: "Authors", value: 2327, color: "#3b82f6" },
  { name: "Reviewers", value: 156, color: "#10b981" },
  { name: "Editors", value: 48, color: "#8b5cf6" },
  { name: "Admins", value: 12, color: "#f59e0b" },
]

const categoryData = [
  { name: "Computer Science", articles: 245 },
  { name: "Medicine", articles: 188 },
  { name: "Physics", articles: 156 },
  { name: "Biology", articles: 142 },
  { name: "Psychology", articles: 98 },
  { name: "Economics", articles: 87 },
  { name: "Engineering", articles: 76 },
  { name: "Humanities", articles: 65 },
]

const revenueData = [
  { name: "Jan", value: 3200 },
  { name: "Feb", value: 3400 },
  { name: "Mar", value: 4100 },
  { name: "Apr", value: 4300 },
  { name: "May", value: 3800 },
  { name: "Jun", value: 3900 },
  { name: "Jul", value: 4200 },
  { name: "Aug", value: 4100 },
  { name: "Sep", value: 4600 },
  { name: "Oct", value: 4300 },
  { name: "Nov", value: 4000 },
  { name: "Dec", value: 3800 },
]

export function ActivityLineChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-80 bg-gray-50 rounded-md animate-pulse" />
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={activityData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "none",
          }}
        />
        <Legend verticalAlign="top" height={40} />
        <Line
          type="monotone"
          dataKey="submissions"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="publications"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="reviews"
          stroke="#8b5cf6"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function UserRolePieChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-60 bg-gray-50 rounded-md animate-pulse" />
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={userRoleData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {userRoleData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value} users`, "Count"]}
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "none",
          }}
        />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function CategoryBarChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-80 bg-gray-50 rounded-md animate-pulse" />
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "none",
          }}
        />
        <Bar dataKey="articles" fill="#3b82f6" radius={[4, 4, 0, 0]}>
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`hsl(${210 + index * 30}, 80%, 60%)`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function RevenueAreaChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-60 bg-gray-50 rounded-md animate-pulse" />
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          formatter={(value) => [`$${value}`, "Revenue"]}
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "none",
          }}
        />
        <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function SubmissionStatusChart() {
  const [isMounted, setIsMounted] = useState(false)

  const statusData = [
    { name: "Pending", value: 32, color: "#f59e0b" },
    { name: "In Review", value: 18, color: "#8b5cf6" },
    { name: "Revisions", value: 12, color: "#3b82f6" },
    { name: "Accepted", value: 8, color: "#10b981" },
    { name: "Rejected", value: 17, color: "#ef4444" },
  ]

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-60 bg-gray-50 rounded-md animate-pulse" />
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={statusData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {statusData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value} submissions`, "Count"]}
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "none",
          }}
        />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function ReviewTimeChart() {
  const [isMounted, setIsMounted] = useState(false)

  const reviewTimeData = [
    { name: "Computer Science", days: 18 },
    { name: "Medicine", days: 24 },
    { name: "Physics", days: 16 },
    { name: "Biology", days: 22 },
    { name: "Psychology", days: 20 },
    { name: "Economics", days: 15 },
    { name: "Engineering", days: 17 },
  ]

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-60 bg-gray-50 rounded-md animate-pulse" />
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={reviewTimeData} layout="vertical" margin={{ top: 20, right: 30, left: 80, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={true} vertical={false} />
        <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          dataKey="name"
          type="category"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          width={80}
        />
        <Tooltip
          formatter={(value) => [`${value} days`, "Average Review Time"]}
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "none",
          }}
        />
        <Bar dataKey="days" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
