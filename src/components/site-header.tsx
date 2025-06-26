import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

export function SiteHeader({ working, onToggleWork, timezone = "UTC" }: { working: boolean, onToggleWork: () => void, timezone?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const today = now
    ? now.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: timezone })
    : "";
  const time = now
    ? now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: timezone })
    : "";

  return (
    <header className="flex h-auto md:h-[--header-height] shrink-0 items-center gap-2 border-b p-4 md:p-0">
      <div className="flex w-full items-center gap-1 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 hidden md:flex" />
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 md:hidden" />
            <h1 className="text-base font-semibold">Dashboard</h1>
          </div>
          <div className="mt-2 sm:mt-0 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-muted-foreground text-sm flex items-center gap-2">
              {now && (
                <>
                  <span className="hidden sm:inline">{today}</span>
                  <span className="bg-primary/10 text-primary font-mono px-3 py-1 rounded-md text-base font-semibold">
                    {time}
                  </span>
                  <Badge variant="outline">{timezone}</Badge>
                </>
              )}
            </span>
            <Button
              variant={working ? "destructive" : "default"}
              size="sm"
              onClick={onToggleWork}
              className="w-full sm:w-auto"
            >
              {working ? "Logout from Work" : "Login to Work"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
