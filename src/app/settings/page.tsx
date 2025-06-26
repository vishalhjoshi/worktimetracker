"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
    <div className="flex flex-1 flex-col ml-2 md:ml-4">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 max-w-md">
          <h1 className="text-2xl font-bold">Settings</h1>
          <Separator className="mb-2" />
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
        </div>
      </div>
    </div>
  )
} 