import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

// POST: Start a new work session (login to work)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  // Check if there's already an open session
  const openSession = await prisma.workSession.findFirst({
    where: { userId: user.id, logoutAt: null },
  });
  if (openSession) {
    return NextResponse.json({ error: "Already clocked in" }, { status: 400 });
  }
  const now = new Date();
  const workSession = await prisma.workSession.create({
    data: {
      userId: user.id,
      loginAt: now,
    },
  });
  return NextResponse.json({ id: workSession.id, loginAt: workSession.loginAt });
}

// PATCH: End the current work session (logout from work)
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  // Find the open session
  const openSession = await prisma.workSession.findFirst({
    where: { userId: user.id, logoutAt: null },
  });
  if (!openSession) {
    return NextResponse.json({ error: "No open session" }, { status: 400 });
  }
  const now = new Date();
  const durationMinutes = Math.round((now.getTime() - openSession.loginAt.getTime()) / 60000);
  const updated = await prisma.workSession.update({
    where: { id: openSession.id },
    data: { logoutAt: now, durationMinutes },
  });
  return NextResponse.json({ id: updated.id, loginAt: updated.loginAt, logoutAt: updated.logoutAt, durationMinutes: updated.durationMinutes });
}

// GET: Get current open session and all sessions for the user
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const openSession = await prisma.workSession.findFirst({
    where: { userId: user.id, logoutAt: null },
  });
  const sessions = await prisma.workSession.findMany({
    where: { userId: user.id },
    orderBy: { loginAt: "desc" },
  });
  return NextResponse.json({ openSession, sessions });
}  