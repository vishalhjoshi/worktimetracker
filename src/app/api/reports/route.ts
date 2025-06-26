import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { parseISO, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period") || "daily";
  const dateStr = searchParams.get("date");
  if (!dateStr) {
    return NextResponse.json({ error: "Missing date parameter" }, { status: 400 });
  }
  const date = parseISO(dateStr);

  let rangeStart: Date, rangeEnd: Date;
  switch (period) {
    case "daily":
      rangeStart = startOfDay(date);
      rangeEnd = endOfDay(date);
      break;
    case "weekly":
      rangeStart = startOfWeek(date, { weekStartsOn: 1 }); // Monday
      rangeEnd = endOfWeek(date, { weekStartsOn: 1 });
      break;
    case "monthly":
      rangeStart = startOfMonth(date);
      rangeEnd = endOfMonth(date);
      break;
    case "yearly":
      rangeStart = startOfYear(date);
      rangeEnd = endOfYear(date);
      break;
    default:
      return NextResponse.json({ error: "Invalid period" }, { status: 400 });
  }

  const sessions = await prisma.workSession.findMany({
    where: {
      userId: user.id,
      loginAt: {
        gte: rangeStart,
        lte: rangeEnd,
      },
    },
    orderBy: { loginAt: "asc" },
  });

  // Aggregate total duration and session count
  const totalMinutes = sessions.reduce((sum, s) => sum + (s.durationMinutes || 0), 0);
  const sessionCount = sessions.length;

  return NextResponse.json({
    period,
    date: dateStr,
    rangeStart,
    rangeEnd,
    totalMinutes,
    sessionCount,
    sessions,
  });
} 