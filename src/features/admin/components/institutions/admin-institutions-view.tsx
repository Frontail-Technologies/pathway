'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  type ColumnDef,
} from '@tanstack/react-table'
import {
  getAdminInstitutions,
  getAdminInstitutionFilterOptions,
} from '@/features/admin/data/admin-institutions'
import type { AdminInstitution } from '@/features/admin/types/institutions'
import {
  institutionContentStatusBadgeStyles as statusBadgeStyles,
  institutionDirectoryQualityBadgeStyles as qualityBadgeStyles,
} from '@/features/admin/constants/institutions'
import { AdminDataTable } from '../admin-data-table'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Plus,
  Search,
  MoreVertical,
  ExternalLink,
  Eye,
  Edit,
  RotateCcw,
  Building2,
  ArrowUpDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function AdminInstitutionsView() {
  const [data] = React.useState<AdminInstitution[]>(() => getAdminInstitutions())
  const filterOptions = React.useMemo(() => getAdminInstitutionFilterOptions(), [])

  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedType, setSelectedType] = React.useState<string>('all')
  const [selectedState, setSelectedState] = React.useState<string>('all')
  const [selectedQuality, setSelectedQuality] = React.useState<string>('all')
  const [selectedDetailPage, setSelectedDetailPage] = React.useState<string>('all')

  const router = useRouter()

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedType !== 'all' ||
    selectedState !== 'all' ||
    selectedQuality !== 'all' ||
    selectedDetailPage !== 'all'

  function resetFilters() {
    setSearchQuery('')
    setSelectedType('all')
    setSelectedState('all')
    setSelectedQuality('all')
    setSelectedDetailPage('all')
  }

  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesName = item.name.toLowerCase().includes(query)
        const matchesCity = item.city.toLowerCase().includes(query)
        const matchesState = item.state.toLowerCase().includes(query)
        const matchesCourse = item.popularCourse?.toLowerCase().includes(query)
        if (!matchesName && !matchesCity && !matchesState && !matchesCourse) {
          return false
        }
      }

      if (selectedType !== 'all' && item.type !== selectedType) {
        return false
      }

      if (selectedState !== 'all' && item.state !== selectedState) {
        return false
      }

      if (selectedQuality !== 'all' && item.qualityStatus !== selectedQuality) {
        return false
      }

      if (selectedDetailPage === 'live' && !item.hasDetailPage) {
        return false
      }
      if (selectedDetailPage === 'not_available' && item.hasDetailPage) {
        return false
      }

      return true
    })
  }, [data, searchQuery, selectedType, selectedState, selectedQuality, selectedDetailPage])

  const columns: ColumnDef<AdminInstitution>[] = React.useMemo(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-auto gap-1 p-0 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            <span>Institution</span>
            <ArrowUpDown className="w-3.5 h-3.5" />
          </Button>
        ),
        cell: ({ row }) => {
          const item = row.original
          const initials = item.name
            .split(' ')
            .map((w) => w[0])
            .join('')
            .slice(0, 3)

          return (
            <div className="flex items-center gap-3 min-w-[200px]">
              <Avatar size="sm" className="bg-primary/10 text-primary font-bold shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <Link
                  href={`/admin/institutions/${item.id}`}
                  className="font-semibold text-foreground hover:text-primary transition-colors truncate block"
                >
                  {item.name}
                </Link>
                <span className="text-[11px] text-muted-foreground truncate block">
                  {item.city}, {item.state}
                </span>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }) => {
          const type = row.original.type
          return (
            <Badge variant="secondary" size="sm">
              {type}
            </Badge>
          )
        },
      },
      {
        accessorKey: 'city',
        header: ({ column }) => (
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-auto gap-1 p-0 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            <span>Location</span>
            <ArrowUpDown className="w-3.5 h-3.5" />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground">
            {row.original.city}, {row.original.state}
          </span>
        ),
      },
      {
        accessorKey: 'programCount',
        header: 'Programs',
        cell: ({ row }) => (
          <span className="text-xs font-medium text-foreground tabular-nums">
            {row.original.programCount} {row.original.programCount === 1 ? 'program' : 'programs'}
          </span>
        ),
      },
      {
        accessorKey: 'qualityStatus',
        header: 'Data Quality',
        cell: ({ row }) => {
          const quality = row.original.qualityStatus
          const config = qualityBadgeStyles[quality]
          return (
            <Badge variant={config.variant} size="xs">
              {config.label}
            </Badge>
          )
        },
      },
      {
        accessorKey: 'completeness',
        header: ({ column }) => (
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-auto gap-1 p-0 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            <span>Completeness</span>
            <ArrowUpDown className="w-3.5 h-3.5" />
          </Button>
        ),
        cell: ({ row }) => {
          const item = row.original
          const status = statusBadgeStyles[item.contentStatus]
          return (
            <div className="w-[130px] space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <Badge variant={status.variant} size="xs">
                  {status.label}
                </Badge>
                <span className="font-bold text-foreground tabular-nums">
                  {item.completeness}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-300',
                    item.completeness >= 80
                      ? 'bg-success'
                      : item.completeness >= 35
                      ? 'bg-warning'
                      : 'bg-muted-foreground/50'
                  )}
                  style={{ width: `${item.completeness}%` }}
                />
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: 'hasDetailPage',
        header: 'Detail Page',
        cell: ({ row }) => {
          const hasDetail = row.original.hasDetailPage
          return hasDetail ? (
            <Badge variant="success" size="xs">
              Live
            </Badge>
          ) : (
            <Badge variant="muted" size="xs">
              Not Available
            </Badge>
          )
        },
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => {
          const item = row.original

          return (
            <div className="flex items-center justify-end" onClick={(event) => event.stopPropagation()}>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      aria-label="Actions"
                    />
                  }
                >
                  <MoreVertical className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-44 p-1"
                  onClick={(event) => event.stopPropagation()}
                >
                  <DropdownMenuItem className="p-0 focus:bg-transparent">
                    <Link
                      href={`/admin/institutions/${item.id}`}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                      View Details
                    </Link>
                  </DropdownMenuItem>

                  {item.hasDetailPage ? (
                    <DropdownMenuItem className="p-0 focus:bg-transparent">
                      <Link
                        href={`/college/${item.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                        View Public Page
                      </Link>
                    </DropdownMenuItem>
                  ) : null}

                  <DropdownMenuSeparator />

                  <DropdownMenuItem className="p-0 focus:bg-transparent">
                    <Link
                      href={`/admin/institutions/${item.id}/edit`}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5 text-muted-foreground" />
                      Edit Institution
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
        },
      },
    ],
    []
  )

  const mobileCardRender = React.useCallback(
    (row: { original: AdminInstitution }) => {
      const item = row.original
      const initials = item.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 3)
      const status = statusBadgeStyles[item.contentStatus]
      const quality = qualityBadgeStyles[item.qualityStatus]

      return (
        <div className="bg-card rounded-xl p-4 shadow-xs border-0 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <Avatar size="sm" className="bg-primary/10 text-primary font-bold shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <Link
                  href={`/admin/institutions/${item.id}`}
                  className="font-semibold text-sm text-foreground hover:text-primary transition-colors truncate block"
                >
                  {item.name}
                </Link>
                <span className="text-xs text-muted-foreground">
                  {item.city}, {item.state}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <Badge variant={quality.variant} size="xs">
                {quality.label}
              </Badge>
              <Badge variant="secondary" size="xs">
                {item.type}
              </Badge>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-border/60">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Completeness:</span>
                <Badge variant={status.variant} size="xs">
                  {status.label}
                </Badge>
              </div>
              <span className="font-bold text-foreground tabular-nums">
                {item.completeness}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full',
                  item.completeness >= 80
                    ? 'bg-success'
                    : item.completeness >= 35
                    ? 'bg-warning'
                    : 'bg-muted-foreground/50'
                )}
                style={{ width: `${item.completeness}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/60">
            <div className="flex items-center gap-2">
              {item.hasDetailPage ? (
                <Badge variant="success" size="xs">
                  Live
                </Badge>
              ) : (
                <Badge variant="muted" size="xs">
                  No Public Page
                </Badge>
              )}
              <span className="text-[11px] text-muted-foreground">
                {item.programCount} {item.programCount === 1 ? 'prog' : 'progs'}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Link
                href={`/admin/institutions/${item.id}/edit`}
                className={buttonVariants({
                  variant: 'outline',
                  size: 'sm',
                  className: 'h-7 px-2 text-xs font-medium',
                })}
              >
                Edit
              </Link>
              <Link
                href={`/admin/institutions/${item.id}`}
                className={buttonVariants({ size: 'sm', className: 'h-7 px-2.5 text-xs font-semibold' })}
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      )
    },
    []
  )

  const typeOptions = React.useMemo(
    () => [{ value: 'all', label: 'All Types' }, ...filterOptions.types.map((t) => ({ value: t, label: t }))],
    [filterOptions.types]
  )
  const stateOptions = React.useMemo(
    () => [{ value: 'all', label: 'All States' }, ...filterOptions.states.map((s) => ({ value: s, label: s }))],
    [filterOptions.states]
  )
  const qualityOptions = React.useMemo(
    () => filterOptions.qualityStatuses,
    [filterOptions.qualityStatuses]
  )
  const detailPageOptions = React.useMemo(
    () => [
      { value: 'all', label: 'All Pages' },
      { value: 'live', label: 'Live Only' },
      { value: 'not_available', label: 'Not Available' },
    ],
    []
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-bold font-heading text-foreground">
            Institutions Directory
          </h1>
          <Badge variant="info" size="sm">
            {filteredData.length} records
          </Badge>
        </div>

        <Link
          href="/admin/institutions/new"
          className={buttonVariants({
            size: 'sm',
            className: 'text-xs font-semibold gap-1.5 shadow-xs w-full sm:w-auto',
          })}
        >
          <Plus className="w-4 h-4" />
          Add Institution
        </Link>
      </div>

      <div className="bg-card rounded-xl p-4 shadow-xs border-0 space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, city, state, or course..."
              className="pl-9 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="h-9 w-full rounded-md border border-input bg-background px-2.5 text-xs text-foreground shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/40">
              {typeOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>

            <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="h-9 w-full rounded-md border border-input bg-background px-2.5 text-xs text-foreground shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/40">
              {stateOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>

            <select value={selectedQuality} onChange={(e) => setSelectedQuality(e.target.value)} className="h-9 w-full rounded-md border border-input bg-background px-2.5 text-xs text-foreground shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/40">
              {qualityOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>

            <select value={selectedDetailPage} onChange={(e) => setSelectedDetailPage(e.target.value)} className="h-9 w-full rounded-md border border-input bg-background px-2.5 text-xs text-foreground shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/40">
              {detailPageOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground shrink-0 gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear
            </Button>
          )}
        </div>
      </div>

      <AdminDataTable
        columns={columns}
        data={filteredData}
        mobileCardRender={mobileCardRender}
        pageSize={10}
        emptyTitle="No institutions match these filters"
        emptyDescription="Try clearing search filters or query parameters to view all institutions."
        onResetFilters={resetFilters}
        hasActiveFilters={hasActiveFilters}
        onRowClick={(item) => router.push(`/admin/institutions/${item.id}`)}
        getRowAriaLabel={(item) => `View details for ${item.name}`}
      />

    </div>
  )
}
