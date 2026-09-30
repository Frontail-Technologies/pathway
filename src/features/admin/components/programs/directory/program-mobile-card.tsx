import * as React from 'react'
import Link from 'next/link'
import type { AdminProgram } from '@/features/admin/types/programs'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  levelBadgeVariant,
  directoryQualityBadgeStyles,
  statusBadgeStyles,
} from '@/features/admin/constants/programs'

export function ProgramMobileCard({ program }: { program: AdminProgram }) {
  const status = statusBadgeStyles[program.contentStatus]
  const quality = directoryQualityBadgeStyles[program.qualityStatus]

  return (
    <div className="bg-card rounded-xl p-4 shadow-xs border-0 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-warning-surface text-warning flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <Link
              href={`/admin/programs/${program.id}`}
              className="font-semibold text-sm text-foreground hover:text-primary transition-colors truncate block"
            >
              {program.name}
            </Link>
            <span className="text-xs text-muted-foreground">
              {program.degree} • {program.stream} • {program.duration}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <Badge variant={quality.variant} size="xs">
            {quality.label}
          </Badge>
          <Badge variant={levelBadgeVariant} size="xs">
            {program.level}
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
            {program.completeness}%
          </span>
        </div>
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full',
              program.completeness >= 80
                ? 'bg-success'
                : program.completeness >= 35
                ? 'bg-warning'
                : 'bg-muted-foreground/50'
            )}
            style={{ width: `${program.completeness}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/60">
        <div className="flex items-center gap-2">
          {program.hasDetailPage ? (
            <Badge variant="success" size="xs">
              Live
            </Badge>
          ) : (
            <Badge variant="muted" size="xs">
              No Public Page
            </Badge>
          )}
          <span className="text-[11px] text-muted-foreground">
            {program.collegesOfferingCount > 0 ? `${program.collegesOfferingCount} offerings` : '—'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            href={`/admin/programs/${program.id}/edit`}
            className={buttonVariants({
              variant: 'outline',
              size: 'sm',
              className: 'h-7 px-2 text-xs font-medium inline-flex',
            })}
          >
            Edit
          </Link>
          <Link
            href={`/admin/programs/${program.id}`}
            className={buttonVariants({ size: 'sm', className: 'h-7 px-2.5 text-xs font-semibold' })}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  )
}
