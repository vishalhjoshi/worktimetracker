import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  // Mock data
  const todayWork = "5h 30m"
  const currentSession = "1h 10m"
  const monthlyTotal = "120h 45m"
  const yearlyTotal = "900h 20m"

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Today's Work Time</CardDescription>
          <CardTitle className="text-2xl font-semibold">{todayWork}</CardTitle>
        </CardHeader>
        <CardFooter className="text-muted-foreground">Total hours worked today</CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Current Session</CardDescription>
          <CardTitle className="text-2xl font-semibold">{currentSession}</CardTitle>
        </CardHeader>
        <CardFooter className="text-muted-foreground">Ongoing session duration</CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Monthly Total</CardDescription>
          <CardTitle className="text-2xl font-semibold">{monthlyTotal}</CardTitle>
        </CardHeader>
        <CardFooter className="text-muted-foreground">Total hours this month</CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Yearly Total</CardDescription>
          <CardTitle className="text-2xl font-semibold">{yearlyTotal}</CardTitle>
        </CardHeader>
        <CardFooter className="text-muted-foreground">Total hours this year</CardFooter>
      </Card>
    </div>
  )
}
