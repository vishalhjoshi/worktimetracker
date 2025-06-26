"use client"

import * as React from "react"
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface WorkSession {
  loginAt: string | Date;
  logoutAt?: string | Date | null;
  durationMinutes?: number;
}

const columns: ColumnDef<WorkSession>[] = [
  {
    accessorKey: "loginAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.loginAt);
      return date.toLocaleDateString();
    },
  },
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

export function DataTable({ sessions = [] }: { sessions: WorkSession[], timezone?: string }) {
  const table = useReactTable({
    data: sessions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
