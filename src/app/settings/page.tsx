"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const timezones = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Kolkata",
  "Asia/Tokyo",
  "Australia/Sydney",
  // ...add more as needed
]

export default function SettingsPage() {
  const [timezone, setTimezone] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")

  useEffect(() => {
    // Fetch user's current timezone from backend
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => setTimezone(data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone))
  }, [])

  const handleSave = async () => {
    setLoading(true)
    setSuccess("")
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timezone }),
    })
    setLoading(false)
    if (res.ok) setSuccess("Timezone updated!")
    else setSuccess("Failed to update timezone.")
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="flex flex-1 flex-col items-center justify-center p-6 md:p-10">
          <Card className="w-full max-w-md shadow-lg border">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <Separator className="mb-4" />
            <CardContent className="flex flex-col gap-6">
              <div>
                <label htmlFor="timezone" className="block mb-2 font-medium">Timezone</label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger id="timezone" className="w-full">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map(tz => (
                      <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
              {success && <div className="text-green-600 text-sm">{success}</div>}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 