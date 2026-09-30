import * as React from 'react'
import { AdminSection } from '../../admin-section'
import { type AdminScholarship } from '@/features/admin/data/admin-scholarships'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, UserCheck, Wallet, MapPin, Layers } from 'lucide-react'

export function ScholarshipEligibilitySection({
  scholarship,
}: {
  scholarship: AdminScholarship
}) {
  return (
    <AdminSection title="Eligibility Criteria">
      <div className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg bg-muted/30 border border-border/60 space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-primary" />
              Gender Restriction
            </span>
            <span className="font-semibold text-foreground block">
              {scholarship.genderEligibility}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-muted/30 border border-border/60 space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
              <Wallet className="w-3.5 h-3.5 text-primary" />
              Family Income Ceiling
            </span>
            <span className="font-semibold text-foreground block">
              {scholarship.incomeLimitBucket || 'No Income Ceiling Specified'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-muted/30 border border-border/60 space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              State / Domicile Scope
            </span>
            <span className="font-semibold text-foreground block truncate">
              {scholarship.states.length > 0 ? scholarship.states.join(', ') : 'All-India Open'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-muted/30 border border-border/60 space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-primary" />
              Category Scope
            </span>
            <span className="font-semibold text-foreground block truncate">
              {scholarship.categories.length > 0 ? scholarship.categories.join(', ') : 'All Categories'}
            </span>
          </div>
        </div>

        {scholarship.shortEligibility.length > 0 && (
          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-foreground block">
              Key Qualification Requirements
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {scholarship.shortEligibility.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/20 border border-border/60"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-[11px] text-foreground leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {scholarship.eligibilityRows.length > 0 && (
          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-foreground block">
              Detailed Criterion Breakdown
            </span>
            <div className="divide-y divide-border/60 rounded-lg border border-border/60 overflow-hidden bg-card">
              {scholarship.eligibilityRows.map((row, idx) => (
                <div
                  key={idx}
                  className="p-2.5 sm:px-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
                >
                  <span className="font-semibold text-muted-foreground sm:w-1/3">
                    {row.label}
                  </span>
                  <span className="font-medium text-foreground sm:w-2/3">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminSection>
  )
}
