// Example logout button component
"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function LogoutButton() {
  const handleLogout = async () => {
    await signOut({
      callbackUrl: '/login', // Redirect to login page after logout
      redirect: true
    })
  }

  return (
    <Button onClick={handleLogout} variant="outline">
      Logout
    </Button>
  )
}

// Alternative: Logout with custom handling
export function LogoutButtonCustom() {
  const handleLogout = async () => {
    // Sign out without automatic redirect
    await signOut({ redirect: false })
    
    // Custom redirect logic
    window.location.href = '/login'
  }

  return (
    <Button onClick={handleLogout} variant="outline">
      Logout
    </Button>
  )
}