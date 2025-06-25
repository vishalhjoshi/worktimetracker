import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

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
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <h1 className="text-base font-semibold ml-4">Dashboard</h1>
        <span className="ml-6 text-muted-foreground text-sm flex items-center gap-2">
          {now && (
            <>
              {today}
              <span className="bg-primary/10 text-primary font-mono px-3 py-1 rounded-md text-base font-semibold ml-2">
                {time}
              </span>
              <span className="ml-2 px-2 py-0.5 rounded bg-muted text-xs font-medium border border-primary/20 text-primary/80">
                {timezone}
              </span>
            </>
          )}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant={working ? "destructive" : "default"}
            size="sm"
            onClick={onToggleWork}
          >
            {working ? "Logout from Work" : "Login to Work"}
          </Button>
        </div>
      </div>
    </header>
  )
}
