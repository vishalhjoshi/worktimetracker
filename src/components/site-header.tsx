import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

export function SiteHeader({ working, onToggleWork }: { working: boolean, onToggleWork: () => void }) {
  const today = new Date().toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <h1 className="text-base font-semibold ml-4">Dashboard</h1>
        <span className="ml-6 text-muted-foreground text-sm">{today}</span>
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
