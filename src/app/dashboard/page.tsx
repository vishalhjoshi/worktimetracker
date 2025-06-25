"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"

export default function Page() {
  const { data: session } = useSession()
  const [working, setWorking] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sessions, setSessions] = useState([])
  const [timezone, setTimezone] = useState("")

  // Fetch current work session status
  useEffect(() => {
    if (!session) return
    fetch("/api/work-session", { method: "GET" })
      .then(res => res.json())
      .then(data => {
        setWorking(!!data.openSession)
        setSessions(data.sessions || [])
      })
    // Fetch timezone
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => setTimezone(data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone))
  }, [session])

  // Handle login/logout to work
  const handleToggleWork = async () => {
    setLoading(true)
    const method = working ? "PATCH" : "POST"
    const res = await fetch("/api/work-session", { method })
    setLoading(false)
    if (res.ok) {
      setWorking(!working)
      // Optionally refetch sessions
      fetch("/api/work-session", { method: "GET" })
        .then(res => res.json())
        .then(data => setSessions(data.sessions || []))
    }
  }

  const safeTimezone = timezone && typeof timezone === 'string' && timezone.length > 0 ? timezone : 'UTC';

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader working={working} onToggleWork={handleToggleWork} timezone={safeTimezone} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards sessions={sessions} timezone={safeTimezone} />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive sessions={sessions} timezone={safeTimezone} />
              </div>
              <DataTable sessions={sessions} timezone={safeTimezone} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
