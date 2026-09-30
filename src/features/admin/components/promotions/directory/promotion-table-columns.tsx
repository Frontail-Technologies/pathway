'use client'

import type { ColumnDef } from '@tanstack/react-table'
import type { AdminPromotion } from '@/features/admin/data/admin-promotions'
import { PromotionKindBadge } from '../shared/promotion-kind-badge'
import { PromotionStatusBadge } from '../shared/promotion-status-badge'
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
import { MoreHorizontal, Eye, Edit, Calendar } from 'lucide-react'
import Link from 'next/link'

export const promotionTableColumns: ColumnDef<AdminPromotion>[] = [
  {
    accessorKey: 'id',
    header: 'Promotion',
    cell: ({ row }) => {
      const promo = row.original
      return (
        <div className="space-y-0.5 max-w-[240px]">
          <div className="font-semibold text-xs text-foreground truncate">
            {promo.label || `${promo.kindLabel} #${promo.id}`}
          </div>
          <div className="text-[10px] text-muted-foreground font-mono">
            #{promo.id}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'kind',
    header: 'Type',
    cell: ({ row }) => {
      return <PromotionKindBadge kind={row.original.kind} />
    },
  },
  {
    accessorKey: 'targetName',
    header: 'Target Entity',
    cell: ({ row }) => {
      const promo = row.original
      return (
        <div className="space-y-0.5">
          {promo.targetAdminUrl ? (
            <Link
              href={promo.targetAdminUrl}
              className="font-medium text-xs text-primary hover:underline block truncate max-w-[200px]"
            >
              {promo.targetName || promo.targetId}
            </Link>
          ) : (
            <span className="text-xs font-medium text-foreground block truncate max-w-[200px]">
              {promo.targetName || promo.targetId}
            </span>
          )}
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-normal text-muted-foreground border-border/60">
            {promo.targetTypeLabel}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: 'placement',
    header: 'Placement',
    cell: ({ row }) => {
      const promo = row.original
      return (
        <div className="space-y-0.5 max-w-[180px]">
          <span className="text-xs font-medium text-foreground block truncate">
            {promo.placementLabel}
          </span>
          {promo.priority ? (
            <span className="text-[10px] text-muted-foreground">
              Priority: {promo.priority}
            </span>
          ) : null}
        </div>
      )
    },
  },
  {
    accessorKey: 'startsAt',
    header: 'Schedule',
    cell: ({ row }) => {
      const promo = row.original
      if (!promo.startsAt && !promo.endsAt) {
        return <span className="text-xs text-muted-foreground">Continuous</span>
      }

      return (
        <div className="space-y-0.5 text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1.5">
          <Calendar className="w-3 h-3 text-muted-foreground" />
          <span>
            {promo.startsAt
              ? new Date(promo.startsAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                })
              : 'Immediate'}{' '}
            –{' '}
            {promo.endsAt
              ? new Date(promo.endsAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : 'Ongoing'}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return <PromotionStatusBadge status={row.original.effectiveStatus} />
    },
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const promo = row.original
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="hover:bg-muted text-muted-foreground hover:text-foreground"
                  aria-label="Promotion actions menu"
                />
              }
            >
              <MoreHorizontal className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 p-1">
              <DropdownMenuLabel className="px-2 py-1.5 text-xs text-muted-foreground font-medium">
                Placement Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-0 focus:bg-transparent">
                <Link
                  href={`/admin/promotions/${promo.id}`}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>View Details</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0 focus:bg-transparent">
                <Link
                  href={`/admin/promotions/${promo.id}/edit`}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  <Edit className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Edit Placement</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
