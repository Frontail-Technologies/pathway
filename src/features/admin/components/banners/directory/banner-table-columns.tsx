'use client'

import { ColumnDef } from '@tanstack/react-table'
import { AdminBanner } from '@/features/admin/data/admin-banners'
import { Badge } from '@/components/ui/badge'
import { bannerStatusMap } from '@/features/banners/types/banner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, ExternalLink, Edit, Eye, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

export const bannerTableColumns: ColumnDef<AdminBanner>[] = [
  {
    accessorKey: 'name',
    header: 'Banner Creative',
    cell: ({ row }) => {
      const banner = row.original
      return (
        <div className="flex items-center gap-3 min-w-[240px]">
          <div className="w-10 h-10 rounded-lg border border-border/80 bg-muted/30 flex items-center justify-center shrink-0 overflow-hidden">
            {banner.image ? (
              <img
                src={banner.image}
                alt={banner.imageAlt || banner.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageIcon className="w-5 h-5 text-muted-foreground/60" />
            )}
          </div>
          <div className="space-y-0.5 min-w-0">
            <Link
              href={`/admin/banners/${banner.id}`}
              className="text-xs font-bold text-foreground hover:text-primary transition-colors truncate block"
            >
              {banner.name}
            </Link>
            <p className="text-[11px] text-muted-foreground truncate max-w-[220px]">
              {banner.title}
            </p>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'placement',
    header: 'Placement',
    cell: ({ row }) => {
      const banner = row.original
      return (
        <div className="space-y-1 min-w-[180px]">
          <Badge variant="outline" className="text-[10px] font-medium bg-muted/20">
            {banner.placementMeta.surface}
          </Badge>
          <p className="text-xs font-medium text-foreground">
            {banner.placementMeta.label.split(' — ')[1] || banner.placementMeta.label}
          </p>
        </div>
      )
    },
  },
  {
    accessorKey: 'ctaLabel',
    header: 'CTA & Target',
    cell: ({ row }) => {
      const banner = row.original
      if (!banner.ctaLabel && !banner.ctaHref) {
        return <span className="text-xs text-muted-foreground italic">None configured</span>
      }
      return (
        <div className="space-y-0.5 min-w-[160px]">
          <p className="text-xs font-semibold text-foreground">{banner.ctaLabel || 'CTA'}</p>
          <p className="text-[11px] text-muted-foreground font-mono truncate max-w-[180px]">
            {banner.ctaHref}
          </p>
        </div>
      )
    },
  },
  {
    id: 'schedule',
    header: 'Schedule',
    cell: ({ row }) => {
      const banner = row.original
      if (!banner.startsAt && !banner.endsAt) {
        return <span className="text-xs text-muted-foreground">Always active</span>
      }
      return (
        <div className="text-xs space-y-0.5 text-muted-foreground">
          {banner.startsAt && (
            <p className="truncate">
              From: {new Date(banner.startsAt).toLocaleDateString()}
            </p>
          )}
          {banner.endsAt && (
            <p className="truncate">
              Until: {new Date(banner.endsAt).toLocaleDateString()}
            </p>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const banner = row.original
      const statusMeta = bannerStatusMap[banner.effectiveStatus] || bannerStatusMap.draft
      return (
        <Badge variant={statusMeta.variant} className="text-[11px] font-semibold">
          {statusMeta.label}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const banner = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8" />}>
            <MoreHorizontal className="w-4 h-4" />
            <span className="sr-only">Open banner options</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel className="text-xs">Banner Actions</DropdownMenuLabel>
            <DropdownMenuItem render={<Link href={`/admin/banners/${banner.id}`} className="flex items-center gap-2 text-xs" />}>
              <Eye className="w-3.5 h-3.5" />
              <span>View Details</span>
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href={`/admin/banners/${banner.id}/edit`} className="flex items-center gap-2 text-xs" />}>
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Banner</span>
            </DropdownMenuItem>
            {banner.ctaHref && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link href={banner.ctaHref} target="_blank" className="flex items-center gap-2 text-xs" />}>
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Destination Link</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
