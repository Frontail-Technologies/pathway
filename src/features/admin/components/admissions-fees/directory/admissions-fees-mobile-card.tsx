import * as React from 'react'
import Link from 'next/link'
import {
  type AdminProgramOffering,
} from '@/features/admin/data/admin-admissions-fees'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Building2, Eye, Edit2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { OfferingQualityBadge } from '../shared/admissions-fees-status-badge'

export function AdmissionsFeesMobileCard({
  offering,
}: {
  offering: AdminProgramOffering
}) {
  return (
    <div className="bg-card rounded-xl p-4 shadow-xs border-0 space-y-3.5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <Link
            href={`/admin/admissions-fees/${offering.id}`}
            className="font-bold text-sm text-foreground hover:text-primary transition-colors block truncate"
          >
            {offering.programName}
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Building2 className="w-3.5 h-3.5 shrink-0 text-muted-foreground/70" />
            <span className="truncate">{offering.institutionName}</span>
            <span>•</span>
            <span className="shrink-0">{offering.institutionCity}</span>
          </div>
        </div>

        <OfferingQualityBadge status={offering.qualityStatus} compact />
      </div>

      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <Badge
          variant="secondary"
          className="text-[10px] font-semibold bg-blue-50 text-blue-700 border-0 px-2 py-0.5"
        >
          {offering.level}
        </Badge>
        <span className="text-[11px] text-muted-foreground">
          {offering.stream} • {offering.duration}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 p-2.5 rounded-lg bg-muted/30 text-xs">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">
            Annual Fee
          </span>
          <span className="font-bold text-foreground block truncate">
            {offering.annualFee || 'Pending'}
          </span>
          <span className="text-[10px] text-muted-foreground block truncate">
            Total: {offering.totalProgrammeFee || '—'}
          </span>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">
            Entrance Exams
          </span>
          <span className="font-semibold text-foreground block truncate">
            {offering.entranceExams.length > 0 ? offering.entranceExams.join(', ') : 'Board Merit / Direct'}
          </span>
          <span className="text-[10px] text-muted-foreground block truncate">
            {offering.counsellingBody || offering.admissionMode}
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-muted-foreground">Content Completeness</span>
          <span className="font-semibold text-foreground">{offering.completeness}%</span>
        </div>
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-300',
              offering.completeness >= 80
                ? 'bg-emerald-500'
                : offering.completeness >= 35
                ? 'bg-amber-500'
                : 'bg-muted-foreground/50'
            )}
            style={{ width: `${offering.completeness}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-1 border-t border-border/60">
        <Link
          href={`/admin/admissions-fees/${offering.id}/edit`}
          className={buttonVariants({
            variant: 'outline',
            size: 'sm',
            className: 'h-8 px-3 text-xs font-semibold',
          })}
        >
          <Edit2 className="w-3.5 h-3.5 mr-1" />
          Edit
        </Link>
        <Link
          href={`/admin/admissions-fees/${offering.id}`}
          className={buttonVariants({
            size: 'sm',
            className: 'h-8 px-3 text-xs font-semibold gap-1',
          })}
        >
          <Eye className="w-3.5 h-3.5 mr-1" />
          View Details
        </Link>
      </div>
    </div>
  )
}
