'use client'

import * as React from 'react'
import {
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type RowSelectionState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, RotateCcw, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { AdminIllustration } from './admin-illustration'
import { CountBadge } from './kit'

export type StatusTabOption = { value: string; label: string; count?: number }

export type AdminDataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  mobileCardRender?: (row: Row<TData>) => React.ReactNode
  pageSize?: number
  pageSizes?: number[]
  emptyTitle?: string
  emptyDescription?: string
  onResetFilters?: () => void
  hasActiveFilters?: boolean
  className?: string
  onRowClick?: (row: TData) => void
  getRowAriaLabel?: (row: TData) => string
  tabs?: { value: string; onChange: (value: string) => void; options: StatusTabOption[]; allLabel?: string; total?: number }
  toolbar?: React.ReactNode
  chips?: { id: string; label: string; onRemove: () => void }[]
  selectable?: boolean
  getRowId?: (row: TData) => string
  bulkActions?: (rows: TData[], clear: () => void) => React.ReactNode
}

export function AdminStatusTabs({ value, onChange, options, allLabel = 'All', total }: NonNullable<AdminDataTableProps<unknown, unknown>['tabs']>) {
  const counted = total !== undefined || options.some((option) => option.count !== undefined)
  const tabs = [{ value: 'all', label: allLabel, count: counted ? (total ?? options.reduce((sum, option) => sum + (option.count ?? 0), 0)) : undefined }, ...options]
  return (
    <div role="tablist" aria-label="Filter by status" className="-mb-px flex gap-1 overflow-x-auto border-b border-border [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {tabs.map((tab) => {
        const selected = tab.value === value
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(tab.value)}
            className={cn(
              'flex h-11 shrink-0 items-center gap-2 border-b-2 px-3 text-sm outline-none transition-colors focus-visible:text-primary',
              selected ? 'border-primary font-semibold text-primary' : 'border-transparent font-medium text-muted-foreground hover:text-foreground',
            )}
          >
            {tab.label}
            {tab.count !== undefined ? <span className={cn('rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums', selected ? 'bg-primary/12 text-primary' : 'bg-muted text-muted-foreground')}>{tab.count}</span> : null}
          </button>
        )
      })}
    </div>
  )
}

export function FilterChips({ chips, onClearAll }: { chips: { id: string; label: string; onRemove: () => void }[]; onClearAll?: () => void }) {
  if (!chips.length) return null
  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <span key={chip.id} className="inline-flex h-7 items-center gap-1 rounded-full bg-primary/10 pr-1 pl-2.5 text-xs font-medium text-primary">
          {chip.label}
          <button type="button" onClick={chip.onRemove} aria-label={`Remove filter ${chip.label}`} className="flex size-5 items-center justify-center rounded-full outline-none hover:bg-primary/15 focus-visible:ring-2 focus-visible:ring-ring/40">
            <X className="size-3" aria-hidden="true" />
          </button>
        </span>
      ))}
      {onClearAll && chips.length > 1 ? (
        <button type="button" onClick={onClearAll} className="text-xs font-medium text-muted-foreground outline-none hover:text-foreground focus-visible:underline">
          Clear all
        </button>
      ) : null}
    </div>
  )
}

function pageList(current: number, count: number): (number | 'gap')[] {
  if (count <= 7) return Array.from({ length: count }, (_, index) => index)
  const pages = [...new Set([0, count - 1, current - 1, current, current + 1].filter((page) => page >= 0 && page < count))].sort((a, b) => a - b)
  return pages.flatMap((page, index) => (index > 0 && page - pages[index - 1]! > 1 ? (['gap', page] as const) : [page]))
}

function EmptyBlock({ title, description, onReset, hasActiveFilters }: { title: string; description: string; onReset?: () => void; hasActiveFilters: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
      <AdminIllustration name="noResults" width={160} className="mb-1" />
      <p className="text-[15px] font-semibold text-foreground">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {hasActiveFilters && onReset ? (
        <Button type="button" variant="outline" size="sm" className="mt-4" onClick={onReset}>
          <RotateCcw />
          Clear filters
        </Button>
      ) : null}
    </div>
  )
}

export function AdminDataTable<TData, TValue>({
  columns,
  data,
  mobileCardRender,
  pageSize = 10,
  pageSizes = [10, 25, 50],
  emptyTitle = 'No records found',
  emptyDescription = 'No matching items match the current search or filters.',
  onResetFilters,
  hasActiveFilters = false,
  className,
  onRowClick,
  getRowAriaLabel,
  tabs,
  toolbar,
  chips,
  selectable = false,
  getRowId,
  bulkActions,
}: AdminDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  const allColumns = React.useMemo<ColumnDef<TData, TValue>[]>(() => {
    if (!selectable) return columns
    const selectColumn: ColumnDef<TData, TValue> = {
      id: '__select',
      header: ({ table }) => (
        <Checkbox
          aria-label="Select all rows on this page"
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
          onCheckedChange={(checked) => table.toggleAllPageRowsSelected(checked)}
        />
      ),
      cell: ({ row }) => (
        <div onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
          <Checkbox aria-label="Select row" checked={row.getIsSelected()} onCheckedChange={(checked) => row.toggleSelected(checked)} />
        </div>
      ),
      enableSorting: false,
      size: 40,
    }
    return [selectColumn, ...columns]
  }, [columns, selectable])

  const table = useReactTable({
    data,
    columns: allColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: selectable,
    getRowId,
    state: { sorting, columnFilters, rowSelection },
    initialState: { pagination: { pageSize } },
  })

  const rows = table.getRowModel().rows
  const totalRows = data.length
  const { pageIndex, pageSize: currentPageSize } = table.getState().pagination
  const pageCount = table.getPageCount()
  const startRow = totalRows === 0 ? 0 : pageIndex * currentPageSize + 1
  const endRow = Math.min((pageIndex + 1) * currentPageSize, totalRows)
  const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original)
  const clearSelection = () => table.resetRowSelection()

  const header = (toolbar || chips?.length || tabs) && (
    <div className="flex flex-col gap-3 border-b border-border px-(--admin-pad) pt-(--admin-pad-y) pb-0 md:pb-(--admin-pad-y)">
      {tabs ? <AdminStatusTabs {...tabs} /> : null}
      {toolbar}
      {chips?.length ? <FilterChips chips={chips} onClearAll={onResetFilters} /> : null}
    </div>
  )

  return (
    <div className={cn('flex min-w-0 flex-col gap-4', className)}>
      <div className="hidden overflow-hidden rounded-xl border border-border bg-card shadow-sm md:block [&_[data-slot=table-container]]:rounded-none [&_[data-slot=table-container]]:shadow-none">
        {header}
        {selectable && selectedRows.length > 0 && bulkActions ? (
          <div className="flex flex-wrap items-center gap-3 border-b border-primary/20 bg-primary/8 px-(--admin-pad) py-2.5 text-sm">
            <span className="font-semibold text-primary tabular-nums">{selectedRows.length} selected</span>
            <div className="flex flex-wrap items-center gap-2">{bulkActions(selectedRows, clearSelection)}</div>
            <button type="button" onClick={clearSelection} className="ml-auto text-xs font-medium text-muted-foreground outline-none hover:text-foreground focus-visible:underline">
              Clear selection
            </button>
          </div>
        ) : null}
        <Table className="text-sm">
          <TableHeader className="sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-border bg-muted/40 hover:bg-muted/40">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="h-11 text-[13px] font-medium tracking-normal normal-case text-muted-foreground first:pl-(--admin-pad) last:pr-(--admin-pad)" style={header.column.columnDef.size && header.column.id === '__select' ? { width: header.column.columnDef.size } : undefined}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn('border-b border-border last:border-0 data-[state=selected]:bg-primary/5', onRowClick && 'cursor-pointer outline-none hover:bg-muted/40 focus-visible:bg-muted/60')}
                  onClick={() => onRowClick?.(row.original)}
                  onKeyDown={(event) => {
                    if (onRowClick && (event.key === 'Enter' || event.key === ' ')) {
                      event.preventDefault()
                      onRowClick(row.original)
                    }
                  }}
                  tabIndex={onRowClick ? 0 : undefined}
                  aria-label={getRowAriaLabel?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="h-14 py-3 align-middle whitespace-normal first:pl-(--admin-pad) last:pr-(--admin-pad) in-data-[density=compact]:h-11 in-data-[density=compact]:py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={allColumns.length} className="p-0">
                  <EmptyBlock title={emptyTitle} description={emptyDescription} onReset={onResetFilters} hasActiveFilters={hasActiveFilters} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {totalRows > 0 ? (
          <nav aria-label="Pagination" className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-(--admin-pad) py-3 text-[13px] text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="tabular-nums">
                Showing {startRow}–{endRow} of {totalRows}
              </span>
              {pageSizes.length > 1 ? (
                <Select value={String(currentPageSize)} onValueChange={(value) => table.setPageSize(Number(value))} items={pageSizes.map((size) => ({ value: String(size), label: `${size} / page` }))}>
                  <SelectTrigger size="sm" aria-label="Rows per page" className="h-8 gap-1 bg-card text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false} side="top" align="start" sideOffset={4}>
                    {pageSizes.map((size) => (
                      <SelectItem key={size} value={String(size)}>
                        {size} / page
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : null}
            </div>
            {pageCount > 1 ? (
              <div className="flex items-center gap-1">
                <Button type="button" variant="outline" size="icon-sm" aria-label="Previous page" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                  <ChevronLeft />
                </Button>
                {pageList(pageIndex, pageCount).map((page, index) =>
                  page === 'gap' ? (
                    <span key={`gap-${index}`} className="px-1">
                      …
                    </span>
                  ) : (
                    <Button
                      key={page}
                      type="button"
                      variant={page === pageIndex ? 'default' : 'outline'}
                      size="icon-sm"
                      aria-current={page === pageIndex ? 'page' : undefined}
                      aria-label={`Page ${page + 1}`}
                      onClick={() => table.setPageIndex(page)}
                      className="tabular-nums"
                    >
                      {page + 1}
                    </Button>
                  ),
                )}
                <Button type="button" variant="outline" size="icon-sm" aria-label="Next page" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                  <ChevronRight />
                </Button>
              </div>
            ) : null}
          </nav>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {tabs ? <AdminStatusTabs {...tabs} /> : null}
        {toolbar}
        {chips?.length ? <FilterChips chips={chips} onClearAll={onResetFilters} /> : null}
        {rows.length > 0 ? (
          rows.map((row) => (
            <React.Fragment key={row.id}>
              {mobileCardRender ? (
                mobileCardRender(row)
              ) : (
                <div className="space-y-2 rounded-xl border border-border bg-card p-4 shadow-sm">
                  {row.getVisibleCells().map((cell) => (
                    <div key={cell.id} className="text-xs">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))
        ) : (
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <EmptyBlock title={emptyTitle} description={emptyDescription} onReset={onResetFilters} hasActiveFilters={hasActiveFilters} />
          </div>
        )}
        {totalRows > 0 && pageCount > 1 ? (
          <div className="flex items-center justify-between text-[13px] text-muted-foreground">
            <Button type="button" variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              <ChevronLeft />
              Previous
            </Button>
            <span className="tabular-nums">
              {pageIndex + 1} / {pageCount}
            </span>
            <Button type="button" variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
              <ChevronRight />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export { CountBadge }
