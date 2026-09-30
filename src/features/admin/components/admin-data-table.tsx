"use client";

import * as React from "react";
import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Row,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Inbox, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export type AdminDataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  mobileCardRender?: (row: Row<TData>) => React.ReactNode;
  pageSize?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  onResetFilters?: () => void;
  hasActiveFilters?: boolean;
  className?: string;
  onRowClick?: (row: TData) => void;
  getRowAriaLabel?: (row: TData) => string;
};

export function AdminDataTable<TData, TValue>({
  columns,
  data,
  mobileCardRender,
  pageSize = 10,
  emptyTitle = "No records found",
  emptyDescription = "No matching items match the current search or filters.",
  onResetFilters,
  hasActiveFilters = false,
  className,
  onRowClick,
  getRowAriaLabel,
}: AdminDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  const rows = table.getRowModel().rows;
  const totalRows = data.length;
  const pageIndex = table.getState().pagination.pageIndex;
  const currentPageSize = table.getState().pagination.pageSize;
  const startRow = totalRows === 0 ? 0 : pageIndex * currentPageSize + 1;
  const endRow = Math.min((pageIndex + 1) * currentPageSize, totalRows);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={onRowClick ? "cursor-pointer" : undefined}
                  onClick={() => onRowClick?.(row.original)}
                  onKeyDown={(event) => {
                    if (
                      onRowClick &&
                      (event.key === "Enter" || event.key === " ")
                    ) {
                      event.preventDefault();
                      onRowClick(row.original);
                    }
                  }}
                  tabIndex={onRowClick ? 0 : undefined}
                  aria-label={getRowAriaLabel?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-2.5">
                      <Inbox className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      {emptyTitle}
                    </p>
                    <p className="text-xs text-muted-foreground max-w-sm mt-1">
                      {emptyDescription}
                    </p>
                    {hasActiveFilters && onResetFilters && (
                      <div className="mt-3.5">
                        <Button type="button" variant="outline" size="sm" onClick={onResetFilters}>
                          <RotateCcw />
                          Clear filters
                        </Button>
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden space-y-3">
        {rows.length > 0 ? (
          rows.map((row) => (
            <React.Fragment key={row.id}>
              {mobileCardRender ? (
                mobileCardRender(row)
              ) : (
                <div className="bg-card rounded-xl p-4 shadow-xs border-0 space-y-2">
                  {row.getVisibleCells().map((cell) => (
                    <div key={cell.id} className="text-xs">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </div>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))
        ) : (
          <div className="bg-card rounded-xl p-8 shadow-xs border-0 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-2.5">
              <Inbox className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              {emptyTitle}
            </p>
            <p className="text-xs text-muted-foreground max-w-xs mt-1">
              {emptyDescription}
            </p>
            {hasActiveFilters && onResetFilters && (
              <div className="mt-3.5">
                <Button type="button" variant="outline" size="sm" onClick={onResetFilters}>
                  <RotateCcw />
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {totalRows > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 px-1 py-1 text-xs text-muted-foreground">
          <div className="font-medium">
            Showing{" "}
            <span className="font-bold text-foreground">{startRow}</span> to{" "}
            <span className="font-bold text-foreground">{endRow}</span> of{" "}
            <span className="font-bold text-foreground">{totalRows}</span>{" "}
            records
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft />
              Previous
            </Button>
            <span className="text-xs font-semibold px-2 tabular-nums">
              Page {table.getPageCount() > 0 ? pageIndex + 1 : 1} of{" "}
              {Math.max(table.getPageCount(), 1)}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
              <ChevronRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
