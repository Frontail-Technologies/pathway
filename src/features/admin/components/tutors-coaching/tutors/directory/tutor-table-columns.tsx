import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { MoreHorizontal, ExternalLink, Edit, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { TutorPortrait } from '@/features/tutors/components/tutor-avatar'
import type { AdminTutor } from '@/features/admin/data/admin-tutors'
import { TutorQualityBadge, TutorPortraitBadge, DetailPageBadge } from '../../shared/tutor-status-badge'

export const tutorColumns: ColumnDef<AdminTutor>[] = [
  {
    accessorKey: 'name',
    header: 'Tutor',
    cell: ({ row }) => {
      const tutor = row.original
      return (
        <div className="flex items-center gap-3 min-w-[190px]">
          <TutorPortrait tutor={tutor} className="size-9 rounded-lg shrink-0" />
          <div className="flex flex-col min-w-0">
            <Link
              href={`/admin/tutors-coaching/tutors/${tutor.id}`}
              className="font-semibold text-xs text-foreground hover:text-primary transition-colors truncate"
            >
              {tutor.name}
            </Link>
            <span className="text-[11px] text-muted-foreground truncate max-w-[180px]">
              {tutor.headline}
            </span>
          </div>
        </div>
      )
    },
  },
  {
    id: 'subjects_exams',
    header: 'Subjects & Exams',
    cell: ({ row }) => {
      const subjects = row.original.subjects || []
      const exams = row.original.exams || []
      return (
        <div className="flex flex-col gap-1 max-w-[190px]">
          <div className="flex flex-wrap gap-1">
            {subjects.slice(0, 2).map((s) => (
              <Badge key={s} variant="info" size="xs">
                {s}
              </Badge>
            ))}
            {subjects.length > 2 && (
              <span className="text-[10px] text-muted-foreground self-center">
                +{subjects.length - 2}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1">
            {exams.slice(0, 2).map((e) => (
              <Badge key={e} variant="outline" size="xs">
                {e}
              </Badge>
            ))}
            {exams.length > 2 && (
              <span className="text-[10px] text-muted-foreground self-center">
                +{exams.length - 2}
              </span>
            )}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'modes',
    header: 'Modes',
    cell: ({ row }) => {
      const modes = row.original.modes || []
      return (
        <div className="flex flex-wrap gap-1">
          {modes.map((m) => (
            <span key={m} className="text-xs text-muted-foreground">
              {m}
            </span>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: 'portraitStatus',
    header: 'Portrait',
    cell: ({ row }) => {
      return <TutorPortraitBadge status={row.original.portraitStatus} />
    },
  },
  {
    accessorKey: 'quality',
    header: 'Data Quality',
    cell: ({ row }) => {
      return <TutorQualityBadge status={row.original.quality.status} />
    },
  },
  {
    accessorKey: 'completeness',
    header: 'Completeness',
    cell: ({ row }) => {
      const { percentage } = row.original.completeness
      return (
        <div className="flex items-center gap-2 min-w-[85px]">
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
      return <DetailPageBadge hasDetailPage={row.original.hasDetailPage} />
    },
  },
  {
    id: 'actions',
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const tutor = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 p-0 cursor-pointer"
                aria-label={`Open actions menu for ${tutor.name}`}
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="p-0">
              <Link
                href={`/admin/tutors-coaching/tutors/${tutor.id}`}
                className="w-full flex items-center px-2 py-1.5 text-xs text-foreground cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
                View Details
              </Link>
            </DropdownMenuItem>

            {tutor.hasDetailPage && (
              <DropdownMenuItem className="p-0">
                <Link
                  href={`/tutors/${tutor.slug}`}
                  target="_blank"
                  className="w-full flex items-center px-2 py-1.5 text-xs text-foreground cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
                  View Public Profile
                </Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem className="p-0">
              <Link
                href={`/admin/tutors-coaching/tutors/${tutor.id}/edit`}
                className="w-full flex items-center px-2 py-1.5 text-xs text-foreground cursor-pointer"
              >
                <Edit className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
                Edit Tutor
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
