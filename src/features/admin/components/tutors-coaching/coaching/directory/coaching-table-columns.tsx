import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { MoreHorizontal, ExternalLink, Edit, Eye, Building2, Globe2, Image } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import type { AdminCoachingProvider } from '@/features/admin/data/admin-coaching'
import { CoachingQualityBadge, DetailPageBadge } from '../../shared/tutor-status-badge'

export const coachingColumns: ColumnDef<AdminCoachingProvider>[] = [
  {
    accessorKey: 'name',
    header: 'Provider',
    cell: ({ row }) => {
      const provider = row.original
      const isOnline = provider.providerType === 'Online Platform'
      return (
        <div className="flex items-center gap-3 min-w-[200px]">
          <div className="size-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            {isOnline ? <Globe2 className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
          </div>
          <div className="flex flex-col min-w-0">
            <Link
              href={`/admin/tutors-coaching/coaching/${provider.id}`}
              className="font-medium text-sm text-foreground hover:text-primary transition-colors truncate"
            >
              {provider.name}
            </Link>
            <span className="text-xs text-muted-foreground truncate max-w-[190px]">
              {provider.programLabel || provider.providerType}
            </span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'providerType',
    header: 'Provider Type',
    cell: ({ row }) => {
      return (
        <Badge variant="muted" size="sm">
          {row.original.providerType}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => {
      const { location, state } = row.original
      return (
        <span className="text-xs text-foreground">
          {state ? `${location}, ${state}` : location}
        </span>
      )
    },
  },
  {
    accessorKey: 'modes',
    header: 'Delivery Mode',
    cell: ({ row }) => {
      const modes = row.original.modes || []
      return (
        <div className="flex flex-wrap gap-1">
          {modes.map((m) => (
            <Badge key={m} variant="outline" size="sm">
              {m}
            </Badge>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: 'programs',
    header: 'Programs',
    cell: ({ row }) => {
      const programs = row.original.programs
      const courseTypes = row.original.courseTypes || []
      return (
        <span className="text-xs text-muted-foreground">
          {programs && programs.length > 0
            ? `${programs.length} track(s)`
            : `${courseTypes.length} format(s)`}
        </span>
      )
    },
  },
  {
    accessorKey: 'gallery',
    header: 'Media',
    cell: ({ row }) => {
      const count = row.original.gallery?.length || 0
      return (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Image className="w-3.5 h-3.5 text-muted-foreground" />
          <span>{count > 0 ? `${count} photos` : 'Listing photo'}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'quality',
    header: 'Data Quality',
    cell: ({ row }) => {
      return <CoachingQualityBadge status={row.original.quality.status} />
    },
  },
  {
    accessorKey: 'completeness',
    header: 'Completeness',
    cell: ({ row }) => {
      const { percentage } = row.original.completeness
      return (
        <div className="flex items-center gap-2 min-w-[90px]">
          <div className="h-1.5 w-12 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${percentage}%` }} />
          </div>
          <span className="text-xs text-muted-foreground font-mono">{percentage}%</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'hasDetailPage',
    header: 'Detail Status',
    cell: ({ row }) => {
      return <DetailPageBadge hasDetailPage={!!row.original.hasDetailPage} />
    },
  },
  {
    id: 'actions',
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const provider = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 p-0 cursor-pointer"
                aria-label={`Open actions menu for ${provider.name}`}
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="p-0">
              <Link
                href={`/admin/tutors-coaching/coaching/${provider.id}`}
                className="w-full flex items-center px-2 py-1.5 text-xs text-foreground cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
                View Details
              </Link>
            </DropdownMenuItem>

            {provider.hasDetailPage && (
              <DropdownMenuItem className="p-0">
                <Link
                  href={`/coaching/${provider.slug}`}
                  target="_blank"
                  className="w-full flex items-center px-2 py-1.5 text-xs text-foreground cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
                  View Public Page
                </Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem className="p-0">
              <Link
                href={`/admin/tutors-coaching/coaching/${provider.id}/edit`}
                className="w-full flex items-center px-2 py-1.5 text-xs text-foreground cursor-pointer"
              >
                <Edit className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
                Edit Provider
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
