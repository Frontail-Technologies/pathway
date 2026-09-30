import * as React from 'react'
import Link from 'next/link'
import { type AdminScholarship } from '@/features/admin/data/admin-scholarships'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Award,
  Edit2,
  Building,
  ExternalLink,
} from 'lucide-react'
import {
  ScholarshipQualityBadge,
  ScholarshipApplicationStatusBadge,
} from '../shared/scholarship-status-badge'

export function ScholarshipDetailHeader({
  scholarship,
}: {
  scholarship: AdminScholarship
}) {
  return (
    <div>
      <Link
        href="/admin/scholarships"
        className={buttonVariants({
          variant: 'ghost',
          size: 'sm',
          className: 'text-xs font-semibold text-muted-foreground hover:text-foreground -ml-2 mb-3 inline-flex',
        })}
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
        Back to Scholarships
      </Link>

      <div className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>

          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground truncate">
                {scholarship.name}
              </h1>
              <ScholarshipApplicationStatusBadge status={scholarship.applicationStatus} />
              <ScholarshipQualityBadge status={scholarship.qualityStatus} />
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-muted-foreground/70" />
                {scholarship.provider}
              </span>
              <span>•</span>
              <span>{scholarship.providerType}</span>
              <span>•</span>
              <span>{scholarship.scholarshipType}</span>
              {scholarship.academicSession && (
                <>
                  <span>•</span>
                  <span>Session: {scholarship.academicSession}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {scholarship.hasDetailPage ? (
            <Link
              href={`/scholarship/${scholarship.slug}`}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({
                variant: 'outline',
                size: 'sm',
                className: 'text-xs font-semibold',
              })}
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
              Public Page
            </Link>
          ) : (
            <Button
              variant="outline"
              size="sm"
              disabled
              className="text-xs font-semibold text-muted-foreground/60 cursor-not-allowed"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5 text-muted-foreground/40" />
              Public Unavailable
            </Button>
          )}

          <Link
            href={`/admin/scholarships/${scholarship.id}/edit`}
            className={buttonVariants({
              size: 'sm',
              className: 'text-xs font-semibold gap-1.5 shadow-xs',
            })}
          >
            <Edit2 className="w-3.5 h-3.5" />
            Edit Scholarship
          </Link>
        </div>
      </div>
    </div>
  )
}
