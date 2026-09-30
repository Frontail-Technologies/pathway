import * as React from 'react'
import { type AdminProgramOffering } from '@/features/admin/data/admin-admissions-fees'
import { Badge } from '@/components/ui/badge'

export function AdmissionsFeesSourcePanel({
  offering,
}: {
  offering: AdminProgramOffering
}) {
  const prov = offering.provenance

  return (
    <div className="bg-card rounded-xl p-5 shadow-xs border-0 space-y-3.5">
      <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
        Data Source & Provenance
      </h3>

      <div className="space-y-3 text-xs">
        <div className="space-y-1">
          <span className="text-[11px] text-muted-foreground block">Source Citation</span>
          <span className="font-semibold text-foreground block">
            {prov.sourceName || 'Source not recorded'}
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] text-muted-foreground block">Ingestion Status</span>
          <Badge
            variant="secondary"
            className="text-[10px] font-semibold bg-blue-50 text-blue-700 border-0 px-2 py-0.5"
          >
            {prov.syncStatus === 'manual' ? 'Manual Authoring' : 'Staging Ingested'}
          </Badge>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] text-muted-foreground block">Academic Session</span>
          <span className="font-semibold text-foreground block">
            {offering.academicSession}
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] text-muted-foreground block">Last Editorial Review</span>
          <span className="text-muted-foreground block">
            {prov.lastReviewedAt || 'Not recorded'}
          </span>
        </div>
      </div>
    </div>
  )
}
