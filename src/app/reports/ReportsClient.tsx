"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/data-table";
import { format, subDays, addDays, subMonths, addMonths, subYears, addYears, subWeeks, addWeeks, parseISO } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";

const PERIODS = ["daily", "weekly", "monthly", "yearly"] as const;
type Period = typeof PERIODS[number];

type WorkSession = {
  id: string;
  loginAt: string;
  logoutAt?: string | null;
  durationMinutes?: number;
};

type DaySummary = {
  date: string;
  totalMinutes: number;
};

type ReportData = {
  period: string;
  date: string;
  rangeStart: string;
  rangeEnd: string;
  totalMinutes: number;
  sessionCount: number;
  sessions: WorkSession[];
};

export default function ReportsClient() {
  const [period, setPeriod] = useState<Period>("daily");
  const [date, setDate] = useState(() => format(new Date(), "yyyy-MM-dd"));
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ReportData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`/api/reports?period=${period}&date=${date}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load report data");
        setLoading(false);
      });
  }, [period, date]);

  // Date navigation helpers
  function changeDate(direction: "prev" | "next") {
    const d = new Date(date);
    let newDate: Date;
    switch (period) {
      case "daily":
        newDate = direction === "prev" ? subDays(d, 1) : addDays(d, 1);
        break;
      case "weekly":
        newDate = direction === "prev" ? subWeeks(d, 1) : addWeeks(d, 1);
        break;
      case "monthly":
        newDate = direction === "prev" ? subMonths(d, 1) : addMonths(d, 1);
        break;
      case "yearly":
        newDate = direction === "prev" ? subYears(d, 1) : addYears(d, 1);
        break;
      default:
        newDate = d;
    }
    setDate(format(newDate, "yyyy-MM-dd"));
  }

  // Group sessions by day for non-daily reports
  const daySummaries: DaySummary[] = useMemo(() => {
    if (!data || !data.sessions || period === "daily") return [];
    const map: Record<string, number> = {};
    data.sessions.forEach((s: WorkSession) => {
      const day = format(parseISO(s.loginAt), "yyyy-MM-dd");
      map[day] = (map[day] || 0) + (s.durationMinutes || 0);
    });
    return Object.entries(map).map(([date, totalMinutes]) => ({ date, totalMinutes }));
  }, [data, period]);

  // Columns for session table (no Date column for daily)
  const sessionColumns: ColumnDef<WorkSession>[] = [
    {
      accessorKey: "loginAt",
      header: "Login Time",
      cell: ({ row }) => {
        const date = new Date(row.original.loginAt);
        return date.toLocaleTimeString();
      },
    },
    {
      accessorKey: "logoutAt",
      header: "Logout Time",
      cell: ({ row }) => {
        const logoutAt = row.original.logoutAt;
        if (!logoutAt) return "In Progress";
        const date = new Date(logoutAt);
        return date.toLocaleTimeString();
      },
    },
    {
      accessorKey: "durationMinutes",
      header: "Duration",
      cell: ({ row }) => {
        const duration = row.original.durationMinutes;
        if (duration === undefined || duration === null) return "";
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        return `${hours}h ${minutes}m`;
      },
    },
  ];

  // Columns for day summary table
  const daySummaryColumns: ColumnDef<DaySummary>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.original.date);
        return date.toLocaleDateString();
      },
    },
    {
      accessorKey: "totalMinutes",
      header: "Total Hours",
      cell: ({ row }) => (row.original.totalMinutes / 60).toFixed(2),
    },
  ];

  return (
    <div className="flex flex-1 flex-col ml-2 md:ml-4">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold">Reports</h1>
            <Tabs value={period} onValueChange={val => setPeriod(val as Period)} className="mb-0">
              <TabsList>
                {PERIODS.map(p => (
                  <TabsTrigger key={p} value={p} className="capitalize">{p}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Button variant="outline" onClick={() => changeDate("prev")}>{"<"}</Button>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <Button variant="outline" onClick={() => changeDate("next")}>{">"}</Button>
          </div>
          {loading && <div>Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {data && (
            <div className="space-y-4">
              <div className="flex gap-8">
                <div>
                  <div className="text-lg font-semibold">Total Hours</div>
                  <div className="text-2xl">{(data.totalMinutes / 60).toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">Sessions</div>
                  <div className="text-2xl">{data.sessionCount}</div>
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2">
                  {period === "daily" ? "Sessions" : "Work by Day"}
                </div>
                {period === "daily" ? (
                  <DataTable<WorkSession> sessions={data.sessions} columns={sessionColumns} />
                ) : (
                  <DataTable<DaySummary> sessions={daySummaries} columns={daySummaryColumns} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 