import * as React from 'react'
import { AdminSection } from '../../admin-section'
import { type AdminProgramOffering } from '@/features/admin/data/admin-admissions-fees'
import { Badge } from '@/components/ui/badge'
import { Banknote, ShieldCheck, AlertCircle } from 'lucide-react'

export function AdmissionsFeesStructureSection({
  offering,
}: {
  offering: AdminProgramOffering
}) {
  return (
    <AdminSection
      title="Fee Structure & Schedules"
      badge={
        offering.annualFee ? (
          <Badge
            variant="secondary"
            className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border-0 px-2 py-0.5"
          >
            {offering.annualFee} / Annum
          </Badge>
        ) : undefined
      }
    >
      <div className="space-y-4">
        {offering.feeComponents.length > 0 ? (
          <div className="divide-y divide-border/60 -my-2">
            {offering.feeComponents.map((comp) => (
              <div
                key={comp.id}
                className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{comp.label}</span>
                    <Badge
                      variant="secondary"
                      className="text-[10px] font-semibold bg-muted text-muted-foreground border-0 px-1.5 py-0 capitalize"
                    >
                      {comp.type}
                    </Badge>
                  </div>
                  <span className="text-[11px] text-muted-foreground block">
                    Billing Period: {comp.period}
                  </span>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-bold text-foreground text-sm block">
                    {comp.amount}
                  </span>
                  <span className="text-[10px] text-muted-foreground block">
                    {comp.period}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-muted/30 border border-dashed border-border/80 flex items-center gap-3 text-muted-foreground text-xs">
            <Banknote className="w-4 h-4 shrink-0 text-muted-foreground/70" />
            <p>
              Detailed itemized fee components (hostel, lab, caution deposits) have not been configured yet for this session.
            </p>
          </div>
        )}

        <div className="p-3.5 rounded-lg bg-muted/40 border border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Total Estimated Programme Fee:</span>
            <span className="font-bold text-foreground">{offering.totalProgrammeFee || 'N/A'}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            {offering.provenance.sourceName ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Source: {offering.provenance.sourceName}</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Source unverified — pending official circular verification</span>
              </>
            )}
          </div>
        </div>
      </div>
    </AdminSection>
  )
}
