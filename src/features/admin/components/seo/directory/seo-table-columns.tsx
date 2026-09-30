'use client'

import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { MoreHorizontal, ExternalLink, Edit2, Globe, FileCode2, Sparkles, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AdminSeoRecord } from '@/features/admin/data/admin-seo'
import { SeoIndexingBadge } from '../shared/seo-indexing-badge'

export const seoTableColumns: ColumnDef<AdminSeoRecord>[] = [
  {
    accessorKey: 'targetLabel',
    header: 'Target',
    cell: ({ row }) => {
      const record = row.original
      return (
        <div className="flex flex-col gap-0.5 min-w-[200px]">
          <Link
            href={`/admin/seo/${record.id}`}
            className="text-xs font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-1.5"
          >
            {record.targetType === 'static_page' ? (
              <Globe className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            ) : (
              <FileCode2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            )}
            <span className="truncate">{record.targetLabel}</span>
          </Link>
          <span className="text-[11px] font-mono text-muted-foreground truncate">
            {record.targetRoutePath}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'targetType',
    header: 'Target Type',
    cell: ({ row }) => {
      const meta = row.original.targetTypeMeta
      return (
        <Badge
          variant="secondary"
          className="text-[11px] font-medium bg-slate-100 text-slate-800 border-slate-200"
        >
          {meta.label}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'effectiveTitle',
    header: 'Meta Title',
    cell: ({ row }) => {
      const record = row.original
      const isCustom = record.resolvedMetadata.isOverrideTitle
      return (
        <div className="flex flex-col gap-0.5 max-w-[240px]">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-foreground truncate">
              {record.effectiveTitle}
            </span>
            {isCustom && (
              <Badge
                variant="outline"
                className="text-[10px] px-1 py-0 bg-blue-50 text-blue-700 border-blue-200 shrink-0 font-medium"
              >
                Override
              </Badge>
            )}
          </div>
          <span className="text-[10px] text-muted-foreground">
            {record.effectiveTitle.length} chars
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'effectiveDescription',
    header: 'Description',
    cell: ({ row }) => {
      const record = row.original
      return (
        <div className="max-w-[280px]">
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {record.effectiveDescription}
          </p>
        </div>
      )
    },
  },
  {
    accessorKey: 'robotsIndex',
    header: 'Indexing',
    cell: ({ row }) => {
      const record = row.original
      return (
        <SeoIndexingBadge
          robotsIndex={record.robotsIndex}
          robotsFollow={record.robotsFollow}
        />
      )
    },
  },
  {
    accessorKey: 'effectiveCanonical',
    header: 'Canonical',
    cell: ({ row }) => {
      const record = row.original
      const isCustom = record.resolvedMetadata.isOverrideCanonical
      return (
        <div className="flex items-center gap-1.5">
          <code className="text-[11px] bg-muted/60 px-1.5 py-0.5 rounded text-muted-foreground font-mono">
            {record.effectiveCanonical}
          </code>
          {isCustom && (
            <Sparkles className="w-3 h-3 text-blue-500 shrink-0" />
          )}
        </div>
      )
    },
  },
  {
    id: 'actions',
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const record = row.original
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" />}>
              <MoreHorizontal className="w-4 h-4" />
              <span className="sr-only">Open menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 text-xs">
              <DropdownMenuLabel className="text-xs font-semibold">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuItem render={<Link href={`/admin/seo/${record.id}`} className="flex items-center gap-2 cursor-pointer text-xs" />}>
                <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                <span>View Details</span>
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link href={`/admin/seo/${record.id}/edit`} className="flex items-center gap-2 cursor-pointer text-xs" />}>
                <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Edit Override</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href={record.targetRoutePath} target="_blank" className="flex items-center gap-2 cursor-pointer text-muted-foreground text-xs" />}>
                <Globe className="w-3.5 h-3.5" />
                <span>View Public Page</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
