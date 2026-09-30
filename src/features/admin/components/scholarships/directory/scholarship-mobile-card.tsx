import * as React from 'react'
import Link from 'next/link'
import { type AdminScholarship } from '@/features/admin/data/admin-scholarships'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import {
  Award,
  Building,
  Calendar,
  Banknote,
  Eye,
  Edit2,
  ExternalLink,
} from 'lucide-react'
import { directoryQualityBadgeStyles, statusBadgeStyles } from '../shared/scholarship-constants'
import { ScholarshipApplicationStatusBadge } from '../shared/scholarship-status-badge'

export function ScholarshipMobileCard({ scholarship }: { scholarship: AdminScholarship }) {
  const qualityConfig = directoryQualityBadgeStyles[scholarship.qualityStatus]
  const statusConfig = statusBadgeStyles[scholarship.contentStatus]

  return (
    <div className="bg-card rounded-xl p-4 shadow-xs border-0 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-success-surface text-success font-bold flex items-center justify-center shrink-0 text-xs">
            {scholarship.providerInitials || <Award className="w-4 h-4" />}
          </div>
          <div className="space-y-1 min-w-0">
            <Link
              href={`/admin/scholarships/${scholarship.id}`}
              className="font-bold text-foreground text-sm hover:text-primary transition-colors block truncate"
            >
              {scholarship.name}
            </Link>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Building className="w-3 h-3 text-muted-foreground/70" />
                {scholarship.provider}
              </span>
              <Badge
                variant="secondary"
                className="text-[10px] font-semibold bg-muted text-muted-foreground border-0 px-1.5 py-0"
              >
                {scholarship.scholarshipType}
              </Badge>
            </div>
          </div>
        </div>

        <Badge
          variant="secondary"
          className={`text-[10px] font-semibold px-2 py-0.5 shrink-0 ${qualityConfig.className}`}
        >
          {qualityConfig.label}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1 text-xs border-t border-border/40">
        <div className="space-y-0.5">
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Banknote className="w-3 h-3" />
            Financial Benefit
          </span>
          <span className="font-bold text-foreground block truncate">
            {scholarship.benefitLabel || '—'}
          </span>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Deadline & Window
          </span>
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-foreground block truncate">
              {scholarship.deadlineDisplay || 'Date Not Recorded'}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-border/40 space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-muted-foreground">Completeness:</span>
            <span className={`text-[10px] font-bold ${statusConfig.className} px-1.5 rounded`}>
              {statusConfig.label}
            </span>
          </div>
          <span className="font-mono text-xs font-semibold text-muted-foreground">
            {scholarship.completeness}%
          </span>
        </div>

        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              scholarship.completeness >= 80
                ? 'bg-success'
                : scholarship.completeness >= 45
                ? 'bg-warning'
                : 'bg-muted-foreground'
            }`}
            style={{ width: `${scholarship.completeness}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 pt-1">
        <ScholarshipApplicationStatusBadge status={scholarship.applicationStatus} />

        <div className="flex items-center gap-2">
          {scholarship.hasDetailPage && (
            <Link
              href={`/scholarship/${scholarship.slug}`}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({
                variant: 'outline',
                size: 'sm',
                className: 'h-7 px-2 text-xs font-semibold',
              })}
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
          <Link
            href={`/admin/scholarships/${scholarship.id}/edit`}
            className={buttonVariants({
              variant: 'outline',
              size: 'sm',
              className: 'h-7 px-2.5 text-xs font-semibold',
            })}
          >
            <Edit2 className="w-3.5 h-3.5 mr-1" />
            Edit
          </Link>
          <Link
            href={`/admin/scholarships/${scholarship.id}`}
            className={buttonVariants({
              size: 'sm',
              className: 'h-7 px-2.5 text-xs font-semibold',
            })}
          >
            <Eye className="w-3.5 h-3.5 mr-1" />
            View
          </Link>
        </div>
      </div>
    </div>
  )
}
