"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"


export default function ReportsPage() {




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
              <CardTitle>Reports</CardTitle>
              <CardDescription>View your work time reports</CardDescription>
            </CardHeader>
            <Separator className="mb-4" />
            <CardContent className="flex flex-col gap-6">
              <div>
                <p>Reports will be available here soon.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 