'use client'

import { ColumnDef } from '@tanstack/react-table'
import { AdminNote } from '@/features/admin/data/admin-notes'
import { Badge } from '@/components/ui/badge'
import { formatFileSize, formatStream, formatStudyLevel } from '@/features/notes/types/note'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Eye, Edit, FileText, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export const noteTableColumns: ColumnDef<AdminNote>[] = [
  {
    accessorKey: 'title',
    header: 'Study Material',
    cell: ({ row }) => {
      const note = row.original
      return (
        <div className="flex items-center gap-3 min-w-[240px]">
          <div className="w-9 h-9 rounded-lg border border-border/80 bg-muted/40 flex items-center justify-center shrink-0 overflow-hidden">
            {note.coverImage ? (
              <img
                src={note.coverImage}
                alt={note.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <FileText className="w-4 h-4 text-primary" />
            )}
          </div>
          <div className="space-y-0.5 min-w-0">
            <Link
              href={`/admin/notes/${note.id}`}
              className="text-xs font-bold text-foreground hover:text-primary transition-colors truncate block"
            >
              {note.title}
            </Link>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
              <span>{note.typeMeta.label}</span>
              <span>•</span>
              <span className="truncate max-w-[140px]">/{note.slug}</span>
            </div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'subject',
    header: 'Classification',
    cell: ({ row }) => {
      const note = row.original
      const levelLabel = note.studyLevel ? formatStudyLevel(note.studyLevel) : null
      const streamLabel = note.stream ? formatStream(note.stream) : null
      const classificationSecondary = streamLabel || levelLabel || 'Unspecified Level'

      return (
        <div className="space-y-1 min-w-[140px] text-xs">
          <p className="font-semibold text-foreground">{note.subject || 'General'}</p>
          <p className="text-[11px] text-muted-foreground">
            {classificationSecondary}
          </p>
        </div>
      )
    },
  },
  {
    id: 'relationships',
    header: 'Course / Exams',
    cell: ({ row }) => {
      const note = row.original
      const hasCourses = note.resolvedCourses.length > 0
      const hasExams = note.resolvedExams.length > 0

      if (!hasCourses && !hasExams) {
        return <span className="text-xs text-muted-foreground italic">General</span>
      }

      return (
        <div className="space-y-1 min-w-[160px] text-xs">
          {hasCourses && (
            <p className="text-foreground truncate max-w-[160px]">
              {note.resolvedCourses.map((c) => c.name).join(', ')}
            </p>
          )}
          {hasExams && (
            <div className="flex flex-wrap gap-1">
              {note.resolvedExams.map((e) => (
                <Badge key={e.id} variant="outline" className="text-[10px] px-1 py-0 font-normal">
                  {e.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'pricingType',
    header: 'Pricing',
    cell: ({ row }) => {
      const note = row.original
      const isFree = note.pricingType === 'free'
      return (
        <Badge
          variant={isFree ? 'secondary' : 'default'}
          className="text-[11px] font-semibold font-mono"
        >
          {note.formattedPrice}
        </Badge>
      )
    },
  },
  {
    id: 'asset',
    header: 'Download Asset',
    cell: ({ row }) => {
      const note = row.original
      const asset = note.downloadableAsset
      if (!asset) {
        return <span className="text-xs text-muted-foreground italic">No file attached</span>
      }
      return (
        <div className="text-xs space-y-0.5 text-muted-foreground">
          <p className="font-medium text-foreground truncate max-w-[130px]">
            {asset.fileName || 'PDF Document'}
          </p>
          <p className="text-[11px] font-mono">
            {formatFileSize(asset.fileSizeBytes)}
            {asset.pageCount ? ` • ${asset.pageCount}p` : ''}
          </p>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const note = row.original
      return (
        <Badge variant={note.statusMeta.variant} className="text-[11px] font-semibold">
          {note.statusMeta.label}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const note = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8" />}>
            <MoreHorizontal className="w-4 h-4" />
            <span className="sr-only">Open note options</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel className="text-xs">Note Actions</DropdownMenuLabel>
            <DropdownMenuItem render={<Link href={`/admin/notes/${note.id}`} className="flex items-center gap-2 text-xs" />}>
              <Eye className="w-3.5 h-3.5" />
              <span>View Details</span>
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href={`/admin/notes/${note.id}/edit`} className="flex items-center gap-2 text-xs" />}>
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Note</span>
            </DropdownMenuItem>
            {note.status === 'published' && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link href={`/notes/${note.slug}`} target="_blank" className="flex items-center gap-2 text-xs" />}>
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Public View</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
