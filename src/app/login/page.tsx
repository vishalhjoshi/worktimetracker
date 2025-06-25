"use client"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/login-form"
import { SignupForm } from "@/components/signup-form"

export default function Page() {
  const [showSignup, setShowSignup] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard")
    }
  }, [status, router])

  if (status === "loading") return null

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2 mt-2 mb-4">
          <img src="/logo.svg" alt="Logo" className="h-12 w-12" />
          <span className="text-xl font-bold tracking-tight">Work Time Tracker</span>
        </div>
        {showSignup ? (
          <SignupForm onSwitchToLogin={() => setShowSignup(false)} />
        ) : (
          <LoginForm onSwitchToSignup={() => setShowSignup(true)} />
        )}
      </div>
    </div>
  )
}
