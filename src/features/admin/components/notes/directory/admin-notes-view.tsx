'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { Edit, ExternalLink, Eye, MoreHorizontal, Plus } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { AdminNote } from '@/features/admin/data/admin-notes'
import { formatFileSize, formatStream, formatStudyLevel, noteStatusMap, noteTypeMap, type NoteStatus, type NoteType } from '@/features/notes/types/note'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { AdminDataTable } from '../../admin-data-table'
import { AdminFilterSelect, AdminPageHeader, AdminToolbar, SortHeader, stopRowClick, Tag } from '../../kit'
import { NoteStatusBadge, noteStudyLevelOptions, sentenceCase } from '../shared/note-meta'

const DEFAULT_FILTERS = { q: '', type: 'all', level: 'all', pricing: 'all', status: 'all' }

const typeOptions = (Object.keys(noteTypeMap) as NoteType[]).map((key) => ({ value: key, label: sentenceCase(noteTypeMap[key].label) }))
const statusOptions = (Object.keys(noteStatusMap) as NoteStatus[]).map((key) => ({ value: key, label: noteStatusMap[key].label }))

function AddNoteLink() {
  return (
    <Link href="/admin/notes/new" className={buttonVariants({ size: 'sm', className: 'gap-1.5' })}>
      <Plus className="size-4" aria-hidden="true" />
      Add note
    </Link>
  )
}

function RowActions({ note }: { note: AdminNote }) {
  return (
    <div className="flex justify-end" onClick={stopRowClick} onKeyDown={stopRowClick}>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground" aria-label={`Actions for ${note.title}`} />}>
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem render={<Link href={`/admin/notes/${note.id}`} />}>
            <Eye className="size-4" aria-hidden="true" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={`/admin/notes/${note.id}/edit`} />}>
            <Edit className="size-4" aria-hidden="true" />
            Edit
          </DropdownMenuItem>
          {note.status === 'published' ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href={`/notes/${note.slug}`} target="_blank" rel="noreferrer" />}>
                <ExternalLink className="size-4" aria-hidden="true" />
                Open public page
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function AdminNotesView({ initialNotes }: { initialNotes: AdminNote[] }) {
  const router = useRouter()
  const data = initialNotes
  const { values: f, set, reset, active } = useUrlFilters(DEFAULT_FILTERS)

  const filtered = React.useMemo(() => {
    const query = f.q.trim().toLowerCase()
    return data.filter((note) => {
      if (query && ![note.title, note.slug, note.subject ?? '', note.authorName ?? ''].some((value) => value.toLowerCase().includes(query))) return false
      if (f.type !== 'all' && note.noteType !== f.type) return false
      if (f.level !== 'all' && note.studyLevel?.toLowerCase() !== f.level) return false
      if (f.pricing !== 'all' && note.pricingType !== f.pricing) return false
      if (f.status !== 'all' && note.status !== f.status) return false
      return true
    })
  }, [data, f])

  const columns = React.useMemo<ColumnDef<AdminNote>[]>(
    () => [
      {
        accessorKey: 'title',
        header: ({ column }) => <SortHeader label="Note" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => (
          <div className="max-w-[320px] min-w-[220px]">
            <Link href={`/admin/notes/${row.original.id}`} onClick={stopRowClick} className="font-medium text-foreground hover:text-primary hover:underline">
              {row.original.title}
            </Link>
            <p className="truncate text-[13px] text-muted-foreground">{row.original.authorName ?? `/notes/${row.original.slug}`}</p>
          </div>
        ),
      },
      { accessorKey: 'noteType', header: 'Type', cell: ({ row }) => <Tag>{sentenceCase(row.original.typeMeta.label)}</Tag> },
      {
        accessorKey: 'subject',
        header: ({ column }) => <SortHeader label="Subject" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => {
          const note = row.original
          const secondary = note.stream ? formatStream(note.stream) : note.studyLevel ? formatStudyLevel(note.studyLevel) : null
          return (
            <div className="min-w-[140px]">
              <p className="text-foreground">{note.subject || 'General'}</p>
              {secondary ? <p className="text-[13px] text-muted-foreground">{secondary}</p> : null}
            </div>
          )
        },
      },
      {
        id: 'related',
        header: 'Courses and exams',
        cell: ({ row }) => {
          const names = [...row.original.resolvedCourses, ...row.original.resolvedExams].map((item) => item.name)
          return names.length > 0 ? <p className="max-w-[200px] truncate text-foreground">{names.join(', ')}</p> : <span className="text-muted-foreground">—</span>
        },
      },
      { accessorKey: 'pricingType', header: 'Price', cell: ({ row }) => <span className="tabular-nums">{row.original.formattedPrice}</span> },
      {
        id: 'file',
        header: 'File',
        cell: ({ row }) => {
          const asset = row.original.downloadableAsset
          if (!asset) return <span className="text-muted-foreground">No file</span>
          return (
            <span className="text-[13px] text-muted-foreground tabular-nums">
              {formatFileSize(asset.fileSizeBytes)}
              {asset.pageCount ? ` · ${asset.pageCount} pages` : ''}
            </span>
          )
        },
      },
      { accessorKey: 'status', header: 'Status', cell: ({ row }) => <NoteStatusBadge status={row.original.status} label={row.original.statusMeta.label} /> },
      { id: 'actions', header: () => <span className="sr-only">Actions</span>, cell: ({ row }) => <RowActions note={row.original} /> },
    ],
    [],
  )

  if (data.length === 0) {
    return (
      <div className="space-y-5">
        <AdminPageHeader title="Notes" description="Study notes, formula sheets and practice material students can download." />
        <div className="flex flex-col items-center rounded-xl border border-border bg-card shadow-sm px-6 py-14 text-center">
          <p className="text-[15px] font-semibold text-foreground">No notes yet</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">Add a note with its PDF, price and the courses or exams it covers.</p>
          <div className="mt-5">
            <AddNoteLink />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <AdminPageHeader title="Notes" count={`${data.length} total`} description="Study notes, formula sheets and practice material students can download." actions={<AddNoteLink />} />

      <AdminToolbar
        search={f.q}
        onSearchChange={(q) => set({ q })}
        searchPlaceholder="Search title, subject or author"
        hasActiveFilters={active}
        onReset={reset}
        summary={active ? `${filtered.length} of ${data.length} match` : undefined}
      >
        <AdminFilterSelect label="Type" value={f.type} onChange={(type) => set({ type })} options={typeOptions} />
        <AdminFilterSelect label="Level" value={f.level} onChange={(level) => set({ level })} options={noteStudyLevelOptions} />
        <AdminFilterSelect label="Price" value={f.pricing} onChange={(pricing) => set({ pricing })} options={[{ value: 'free', label: 'Free' }, { value: 'paid', label: 'Paid' }]} />
        <AdminFilterSelect label="Status" value={f.status} onChange={(status) => set({ status })} options={statusOptions} />
      </AdminToolbar>

      <AdminDataTable
        columns={columns}
        data={filtered}
        onRowClick={(note) => router.push(`/admin/notes/${note.id}`)}
        getRowAriaLabel={(note) => `Open ${note.title}`}
        hasActiveFilters={active}
        onResetFilters={reset}
        emptyTitle="No notes match"
        emptyDescription="Try a different search or clear the filters."
        mobileCardRender={(row) => {
          const note = row.original
          return (
            <Link href={`/admin/notes/${note.id}`} className="block space-y-1 rounded-xl border border-border bg-card shadow-sm p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="min-w-0 font-medium text-foreground">{note.title}</p>
                <NoteStatusBadge status={note.status} label={note.statusMeta.label} />
              </div>
              <p className="text-[13px] text-muted-foreground">
                {sentenceCase(note.typeMeta.label)} · {note.subject || 'General'} · {note.formattedPrice}
              </p>
            </Link>
          )
        }}
      />
    </div>
  )
}
