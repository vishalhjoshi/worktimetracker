import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { timezone: true }
  })
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }
  return NextResponse.json({ timezone: user.timezone || null })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const { timezone } = await req.json()
  if (!timezone) {
    return NextResponse.json({ error: "Timezone required" }, { status: 400 })
  }
  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: { timezone },
    select: { timezone: true }
  })
  return NextResponse.json({ timezone: user.timezone })
} 