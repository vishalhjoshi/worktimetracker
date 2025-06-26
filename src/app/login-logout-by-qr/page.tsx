"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function LoginLogoutByQrPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [alertInfo, setAlertInfo] = useState<{ title: string; message: string } | null>(null)
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      return; // Wait for session status to be determined
    }

    if (status === "unauthenticated") {
      router.replace("/login?callbackUrl=/login-logout-by-qr")
      return;
    }

    if (status === "authenticated" && session?.user?.email && isProcessing) {
      setIsProcessing(false); // Prevent re-running on re-renders
      
      const toggleWorkSession = async () => {
        try {
          const res = await fetch("/api/work-session")
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || `Status check failed: ${res.status}`);
          }
          const data = await res.json()

          const isWorking = !!data.openSession
          const method = isWorking ? "PATCH" : "POST"
          const actionText = isWorking ? "logged out from work" : "logged in to work"

          const toggleRes = await fetch("/api/work-session", { method })

          if (toggleRes.ok) {
            setAlertInfo({
              title: "Success",
              message: `You have successfully ${actionText}.`,
            })
          } else {
            const errorData = await toggleRes.json();
            throw new Error(errorData.error || "An unexpected error occurred.");
          }
        } catch (error) {
          console.error("QR Toggle Error:", error);
          setAlertInfo({
            title: "Error",
            message: error instanceof Error ? error.message : "An unknown error occurred.",
          })
        }
      }

      toggleWorkSession()
    }
  }, [status, session, router, isProcessing])

  const handleAlertOk = () => {
    router.push("/dashboard")
  }

  if (isProcessing && !alertInfo) {
    return (
        <div className="flex min-h-svh w-full items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-muted-foreground">Processing your request...</p>
            </div>
        </div>
    );
  }

  return (
    <>
      <AlertDialog open={!!alertInfo} onOpenChange={() => !isProcessing && router.push('/dashboard')}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertInfo?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {alertInfo?.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleAlertOk}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
} 