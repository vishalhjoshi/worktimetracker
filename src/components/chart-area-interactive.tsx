"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface WorkSession {
  loginAt: string | Date;
  durationMinutes?: number;
}

function getWorkData(sessions: WorkSession[], timezone: string) {
  // Aggregate hours per day for the current month in user's timezone
  const now = new Date()
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const data: { date: string, hours: number }[] = []
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(Date.UTC(now.getFullYear(), now.getMonth(), i))
    const dateStr = date.toLocaleDateString("en-CA", { timeZone: timezone })
    data.push({ date: dateStr, hours: 0 })
  }
  sessions.forEach(s => {
    const login = new Date(new Date(s.loginAt).toLocaleString("en-US", { timeZone: timezone }))
    if (login.getMonth() === now.getMonth() && login.getFullYear() === now.getFullYear()) {
      const loginDay = login.toLocaleDateString("en-CA", { timeZone: timezone })
      const idx = data.findIndex(d => d.date === loginDay)
      const duration = s.durationMinutes || 0
      if (idx !== -1) data[idx].hours += Math.round((duration / 60) * 10) / 10
    }
  })
  return data
}

export function ChartAreaInteractive({ sessions = [], timezone = "UTC" }: { sessions: WorkSession[], timezone?: string }) {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const workData = getWorkData(sessions, timezone)
  const filteredData = workData.filter((item) => {
    const date = new Date(item.date + 'T00:00:00Z')
    const referenceDate = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Work Hours (This Month)</CardTitle>
      </CardHeader>
      <CardContent>
        <AreaChart width={600} height={250} data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tickFormatter={d => String(d).slice(-2)} />
          <YAxis domain={[0, 10]} tickCount={6} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="hours" stroke="#8884d8" fillOpacity={1} fill="url(#colorHours)" />
        </AreaChart>
      </CardContent>
    </Card>
  )
}
