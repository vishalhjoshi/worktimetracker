import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface WorkSession {
  loginAt: string | Date;
  logoutAt?: string | Date | null;
  durationMinutes?: number;
}

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}h ${m}m`
}

export function SectionCards({ sessions = [], timezone = "UTC" }: { sessions: WorkSession[], timezone?: string }) {
  const now = new Date()
  const todayStr = now.toLocaleDateString("en-CA", { timeZone: timezone })
  const thisMonth = now.toLocaleString("en-US", { timeZone: timezone, month: "2-digit" })
  const thisYear = now.toLocaleString("en-US", { timeZone: timezone, year: "numeric" })

  let todayMinutes = 0
  let monthMinutes = 0
  let yearMinutes = 0
  let currentSession = null

  sessions.forEach(s => {
    const login = new Date(new Date(s.loginAt).toLocaleString("en-US", { timeZone: timezone }))
    const logout = s.logoutAt ? new Date(new Date(s.logoutAt).toLocaleString("en-US", { timeZone: timezone })) : null
    const duration = s.durationMinutes || (logout ? 0 : Math.round((now.getTime() - login.getTime()) / 60000))
    const loginDay = login.toLocaleDateString("en-CA", { timeZone: timezone })
    const loginMonth = login.toLocaleString("en-US", { timeZone: timezone, month: "2-digit" })
    const loginYear = login.toLocaleString("en-US", { timeZone: timezone, year: "numeric" })
    if (loginDay === todayStr) {
      todayMinutes += duration
    }
    if (loginMonth === thisMonth && loginYear === thisYear) {
      monthMinutes += duration
    }
    if (loginYear === thisYear) {
      yearMinutes += duration
    }
    if (!s.logoutAt) {
      currentSession = duration
    }
  })

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-6 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-md *:data-[slot=card]:border *:data-[slot=card]:hover:shadow-lg *:data-[slot=card]:transition-shadow lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card cursor-pointer">
        <CardHeader>
          <CardDescription className="text-base">Today&apos;s Work Time</CardDescription>
          <CardTitle className="text-3xl font-bold">{formatDuration(todayMinutes)}</CardTitle>
        </CardHeader>
        <CardFooter className="text-muted-foreground">Total hours worked today</CardFooter>
      </Card>
      <Card className="@container/card cursor-pointer">
        <CardHeader>
          <CardDescription className="text-base">Current Session</CardDescription>
          <CardTitle className="text-3xl font-bold">{currentSession !== null ? formatDuration(currentSession) : "-"}</CardTitle>
        </CardHeader>
        <CardFooter className="text-muted-foreground">Ongoing session duration</CardFooter>
      </Card>
      <Card className="@container/card cursor-pointer">
        <CardHeader>
          <CardDescription className="text-base">Monthly Total</CardDescription>
          <CardTitle className="text-3xl font-bold">{formatDuration(monthMinutes)}</CardTitle>
        </CardHeader>
        <CardFooter className="text-muted-foreground">Total hours this month</CardFooter>
      </Card>
      <Card className="@container/card cursor-pointer">
        <CardHeader>
          <CardDescription className="text-base">Yearly Total</CardDescription>
          <CardTitle className="text-3xl font-bold">{formatDuration(yearMinutes)}</CardTitle>
        </CardHeader>
        <CardFooter className="text-muted-foreground">Total hours this year</CardFooter>
      </Card>
    </div>
  )
}
