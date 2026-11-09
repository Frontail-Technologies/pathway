'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { BookOpen, Building2, Edit, Eye, MoreHorizontal, Plus } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { getAdminOfferings, type AdminProgramOffering } from '@/features/admin/data/admin-admissions-fees'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { AdminDataTable } from '../../admin-data-table'
import { AdminFilterSelect, AdminPageHeader, AdminToolbar, CompletenessMeter, SortHeader, StatusBadge, stopRowClick, Tag, toneFromVariant } from '../../kit'
import { admissionModes, directoryQualityBadgeStyles as qualityStyles } from '../shared/admissions-fees-constants'

const DEFAULT_FILTERS = { q: '', institution: 'all', program: 'all', level: 'all', mode: 'all', quality: 'all' }

const levelOptions = ['Undergraduate', 'Postgraduate', 'Diploma', 'Certificate'].map((l) => ({ value: l, label: l }))
const qualityOptions = (Object.keys(qualityStyles) as (keyof typeof qualityStyles)[]).map((key) => ({ value: key, label: qualityStyles[key].label }))

function uniqueBy(items: AdminProgramOffering[], key: 'institution' | 'program') {
  const map = new Map<string, { value: string; label: string; slug: string }>()
  for (const o of items) {
    const id = key === 'institution' ? o.institutionId : o.programId
    if (!map.has(id)) map.set(id, { value: id, label: key === 'institution' ? o.institutionName : o.programName, slug: key === 'institution' ? o.institutionSlug : o.programSlug })
  }
  return Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label))
}

function RowActions({ item }: { item: AdminProgramOffering }) {
  return (
    <div className="flex justify-end" onClick={stopRowClick} onKeyDown={stopRowClick}>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground" aria-label={`Actions for ${item.programName} at ${item.institutionName}`} />}>
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem render={<Link href={`/admin/admissions-fees/${item.id}`} />}>
            <Eye className="size-4" aria-hidden="true" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={`/admin/admissions-fees/${item.id}/edit`} />}>
            <Edit className="size-4" aria-hidden="true" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem render={<Link href={`/admin/institutions/${item.institutionId}`} />}>
            <Building2 className="size-4" aria-hidden="true" />
            Open institution
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={`/admin/programs/${item.programId}`} />}>
            <BookOpen className="size-4" aria-hidden="true" />
            Open course
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function AdminAdmissionsFeesView() {
  const router = useRouter()
  const data = React.useMemo(() => getAdminOfferings(), [])
  const institutions = React.useMemo(() => uniqueBy(data, 'institution'), [data])
  const programs = React.useMemo(() => uniqueBy(data, 'program'), [data])
  const { values: f, set, reset, active } = useUrlFilters(DEFAULT_FILTERS)

  const institutionValue = institutions.find((i) => i.value === f.institution || i.slug === f.institution)?.value ?? f.institution
  const programValue = programs.find((p) => p.value === f.program || p.slug === f.program)?.value ?? f.program

  const filtered = React.useMemo(() => {
    const query = f.q.trim().toLowerCase()
    return data.filter((off) => {
      if (query && ![off.programName, off.institutionName, off.counsellingBody, ...off.entranceExams].some((value) => value.toLowerCase().includes(query))) return false
      if (f.institution !== 'all' && off.institutionId !== f.institution && off.institutionSlug !== f.institution) return false
      if (f.program !== 'all' && off.programId !== f.program && off.programSlug !== f.program) return false
      if (f.level !== 'all' && off.level !== f.level) return false
      if (f.mode !== 'all' && off.admissionMode !== f.mode) return false
      if (f.quality !== 'all' && off.qualityStatus !== f.quality) return false
      return true
    })
  }, [data, f])

  const columns = React.useMemo<ColumnDef<AdminProgramOffering>[]>(
    () => [
      {
        id: 'offering',
        accessorFn: (row) => `${row.programName} ${row.institutionName}`,
        header: ({ column }) => <SortHeader label="Course and institution" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => (
          <div className="min-w-[220px] max-w-[320px]">
            <Link href={`/admin/admissions-fees/${row.original.id}`} onClick={stopRowClick} className="font-medium text-foreground hover:text-primary hover:underline">
              {row.original.programName}
            </Link>
            <p className="truncate text-[13px] text-muted-foreground">
              {row.original.institutionName}, {row.original.institutionCity}
            </p>
          </div>
        ),
      },
      { accessorKey: 'level', header: 'Level', cell: ({ row }) => <Tag>{row.original.level}</Tag> },
      {
        accessorKey: 'annualFeeValue',
        header: ({ column }) => <SortHeader label="Annual fee" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) =>
          row.original.annualFee ? (
            <div className="whitespace-nowrap">
              <p className="font-medium text-foreground tabular-nums">{row.original.annualFee}</p>
              {row.original.totalProgrammeFee ? <p className="text-[13px] text-muted-foreground">{row.original.totalProgrammeFee} total</p> : null}
            </div>
          ) : (
            <StatusBadge tone="warning">Not set</StatusBadge>
          ),
      },
      {
        accessorKey: 'admissionMode',
        header: 'Admission',
        cell: ({ row }) => (
          <div className="max-w-[200px]">
            <p className="text-foreground">{admissionModes.find((m) => m.value === row.original.admissionMode)?.label ?? row.original.admissionMode}</p>
            <p className="truncate text-[13px] text-muted-foreground">{row.original.entranceExams.length > 0 ? row.original.entranceExams.join(', ') : row.original.counsellingBody || 'No exam'}</p>
          </div>
        ),
      },
      {
        accessorKey: 'qualityStatus',
        header: 'Data quality',
        cell: ({ row }) => {
          const style = qualityStyles[row.original.qualityStatus]
          return <StatusBadge tone={toneFromVariant(style.variant)}>{style.label}</StatusBadge>
        },
      },
      {
        accessorKey: 'completeness',
        header: ({ column }) => <SortHeader label="Completeness" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => <CompletenessMeter value={row.original.completeness} />,
      },
      { id: 'actions', header: () => <span className="sr-only">Actions</span>, cell: ({ row }) => <RowActions item={row.original} /> },
    ],
    [],
  )

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Admissions & fees"
        count={`${data.length} total`}
        description="Fees and admission rules for each course at each institution."
        actions={
          <Link href="/admin/admissions-fees/new" className={buttonVariants({ size: 'sm', className: 'gap-1.5' })}>
            <Plus className="size-4" aria-hidden="true" />
            Add offering
          </Link>
        }
      />
<AdminDataTable
  tabs={{ value: f.quality, onChange: (value) => set({ quality: value }), options: qualityOptions }}
  toolbar={
    <AdminToolbar
          search={f.q}
          onSearchChange={(q) => set({ q })}
          searchPlaceholder="Search course, institution or exam"
          hasActiveFilters={active}
          onReset={reset}
          summary={active ? `${filtered.length} of ${data.length} match` : undefined}
        >
          <AdminFilterSelect label="Institution" value={institutionValue} onChange={(institution) => set({ institution })} options={institutions} />
          <AdminFilterSelect label="Course" value={programValue} onChange={(program) => set({ program })} options={programs} />
          <AdminFilterSelect label="Level" value={f.level} onChange={(level) => set({ level })} options={levelOptions} />
          <AdminFilterSelect label="Admission" value={f.mode} onChange={(mode) => set({ mode })} options={admissionModes} />
        </AdminToolbar>
  }
        columns={columns}
        data={filtered}
        onRowClick={(item) => router.push(`/admin/admissions-fees/${item.id}`)}
        getRowAriaLabel={(item) => `Open ${item.programName} at ${item.institutionName}`}
        hasActiveFilters={active}
        onResetFilters={reset}
        emptyTitle="No offerings match"
        emptyDescription="Try a different search or clear the filters."
        mobileCardRender={(row) => {
          const item = row.original
          const quality = qualityStyles[item.qualityStatus]
          return (
            <Link href={`/admin/admissions-fees/${item.id}`} className="block space-y-2.5 rounded-xl border border-border bg-card shadow-sm p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{item.programName}</p>
                  <p className="text-[13px] text-muted-foreground">
                    {item.institutionName} · {item.annualFee ? `${item.annualFee} a year` : 'Fee not set'}
                  </p>
                </div>
                <StatusBadge tone={toneFromVariant(quality.variant)}>{quality.label}</StatusBadge>
              </div>
              <CompletenessMeter value={item.completeness} />
            </Link>
          )
        }}
      />
    </div>
  )
}
