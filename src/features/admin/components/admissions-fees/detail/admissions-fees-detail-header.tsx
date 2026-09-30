import * as React from 'react'
import Link from 'next/link'
import {
  type AdminProgramOffering,
} from '@/features/admin/data/admin-admissions-fees'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Banknote,
  Edit2,
  Building2,
  BookOpen,
} from 'lucide-react'
import { OfferingQualityBadge } from '../shared/admissions-fees-status-badge'

export function AdmissionsFeesDetailHeader({
  offering,
}: {
  offering: AdminProgramOffering
}) {
  return (
    <div>
      <Link
        href="/admin/admissions-fees"
        className={buttonVariants({
          variant: 'ghost',
          size: 'sm',
          className: 'text-xs font-semibold text-muted-foreground hover:text-foreground -ml-2 mb-3 inline-flex',
        })}
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
        Back to Admissions & Fees
      </Link>

      <div className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
            <Banknote className="w-6 h-6" />
          </div>

          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground truncate">
                {offering.programName}
              </h1>
              <Badge
                variant="secondary"
                className="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 border-0"
              >
                {offering.academicSession}
              </Badge>
              <OfferingQualityBadge status={offering.qualityStatus} />
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-muted-foreground/70" />
                {offering.institutionName}
              </span>
              <span>•</span>
              <span>{offering.institutionCity}, {offering.institutionState}</span>
              <span>•</span>
              <span>{offering.stream}</span>
              <span>•</span>
              <span>{offering.level}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href={`/admin/institutions/${offering.institutionId}`}
            className={buttonVariants({
              variant: 'outline',
              size: 'sm',
              className: 'text-xs font-semibold',
            })}
          >
            <Building2 className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
            Institution
          </Link>
          <Link
            href={`/admin/programs/${offering.programId}`}
            className={buttonVariants({
              variant: 'outline',
              size: 'sm',
              className: 'text-xs font-semibold',
            })}
          >
            <BookOpen className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
            Program
          </Link>
          <Link
            href={`/admin/admissions-fees/${offering.id}/edit`}
            className={buttonVariants({
              size: 'sm',
              className: 'text-xs font-semibold gap-1.5 shadow-xs',
            })}
          >
            <Edit2 className="w-3.5 h-3.5" />
            Edit Offering
          </Link>
        </div>
      </div>
    </div>
  )
}
