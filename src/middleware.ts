import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/signup',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  // Add other public routes here
]

// Define routes that should be accessible only to unauthenticated users
const authRoutes = [
  '/login',
  '/register',
  '/signup',
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip middleware for static files, Next.js internals, and ALL API routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|webp|css|js|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next()
  }
  
  console.log(`🔍 Middleware checking: ${pathname}`)
  
  try {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    })
    
    const isAuthenticated = !!token
    const isPublicRoute = publicRoutes.includes(pathname)
    const isAuthRoute = authRoutes.includes(pathname)
    
    console.log(`🔍 Auth status: ${isAuthenticated ? 'Authenticated' : 'Not authenticated'}`)
    console.log(`🔍 Route type: ${isPublicRoute ? 'Public' : 'Protected'}`)
    
    // Redirect authenticated users away from auth pages (login, register, etc.)
    if (isAuthenticated && isAuthRoute) {
      console.log(`✅ Authenticated user accessing auth route, redirecting to dashboard`)
      const callbackUrl = request.nextUrl.searchParams.get('callbackUrl')
      const redirectUrl = callbackUrl || '/dashboard'
      return NextResponse.redirect(new URL(redirectUrl, request.url))
    }
    
    // Allow access to public routes for everyone
    if (isPublicRoute) {
      console.log(`✅ Public route, allowing access`)
      return NextResponse.next()
    }
    
    // Protect all other routes - require authentication
    if (!isAuthenticated) {
      console.log(`🚫 Protected route accessed without auth, redirecting to login`)
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
    
    console.log(`✅ Authenticated user accessing protected route, allowing access`)
    return NextResponse.next()
    
  } catch (error) {
    console.error('❌ Error in middleware:', error)
    // On error, redirect to login for safety
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: [
    // Match all paths except static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|woff|woff2|ttf|eot)$).*)',
  ],
}