import * as React from 'react'
import { AdminSection } from '../../admin-section'
import { type AdminScholarship } from '@/features/admin/data/admin-scholarships'
import { Badge } from '@/components/ui/badge'
import { Banknote, ShieldCheck, AlertCircle, Clock, CreditCard } from 'lucide-react'

export function ScholarshipBenefitsSection({
  scholarship,
}: {
  scholarship: AdminScholarship
}) {
  const hasRichBenefits = Boolean(
    scholarship.benefitCoverage ||
    scholarship.benefitDuration ||
    scholarship.benefitDisbursement
  )

  return (
    <AdminSection
      title="Financial Support & Benefits"
      badge={
        scholarship.benefitLabel ? (
          <Badge
            variant="secondary"
            className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border-0 px-2 py-0.5"
          >
            {scholarship.benefitLabel}
          </Badge>
        ) : undefined
      }
    >
      <div className="space-y-4 text-xs">
        <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider block">
              Configured Financial Grant
            </span>
            <span className="text-base font-bold text-emerald-950 block">
              {scholarship.benefitLabel || 'No grant amount configured'}
            </span>
          </div>

          <Badge
            variant="secondary"
            className="text-xs font-semibold bg-emerald-100 text-emerald-800 border-0 self-start sm:self-auto px-2.5 py-1"
          >
            {scholarship.benefitType}
          </Badge>
        </div>

        {hasRichBenefits && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {scholarship.benefitCoverage && (
              <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                  <Banknote className="w-3.5 h-3.5 text-primary" />
                  Coverage Scope
                </span>
                <p className="font-medium text-foreground leading-relaxed">
                  {scholarship.benefitCoverage}
                </p>
              </div>
            )}

            {scholarship.benefitDuration && (
              <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  Benefit Duration
                </span>
                <p className="font-medium text-foreground leading-relaxed">
                  {scholarship.benefitDuration}
                </p>
              </div>
            )}

            {scholarship.benefitDisbursement && (
              <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-primary" />
                  Disbursement Method
                </span>
                <p className="font-medium text-foreground leading-relaxed">
                  {scholarship.benefitDisbursement}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="p-3 rounded-lg bg-muted/40 border border-border/60 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            {scholarship.provenance.sourceName ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Verified Source: {scholarship.provenance.sourceName}</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Financial schedule has no recorded official source — requires circular verification</span>
              </>
            )}
          </div>
        </div>
      </div>
    </AdminSection>
  )
}
