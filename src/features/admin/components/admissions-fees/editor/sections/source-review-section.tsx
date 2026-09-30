import * as React from 'react'
import { Badge } from '@/components/ui/badge'

export function SourceReviewSection({
  isEdit,
}: {
  isEdit: boolean
}) {
  return (
    <section id="review" className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4 scroll-mt-20">
      <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
        Data Source & Review
      </h2>

      <div className="p-4 rounded-lg bg-muted/30 border border-border/60 space-y-3 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <span className="text-[11px] text-muted-foreground block">Provenance Source</span>
            <span className="font-semibold text-foreground block">
              Institutional Fee Schedule & Admission Policy
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] text-muted-foreground block">Ingestion State</span>
            <Badge
              variant="secondary"
              className="text-[10px] font-semibold bg-blue-50 text-blue-700 border-0 px-2 py-0.5"
            >
              Manual Authoring
            </Badge>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] text-muted-foreground block">Review Stage</span>
            <span className="text-muted-foreground font-medium block">
              {isEdit ? 'Editorial Verification' : 'Draft Creation'}
            </span>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground leading-relaxed pt-2 border-t border-border/60">
          Admissions and fees are protected against automatic scraper overwriting. Changes are evaluated through field-level diffs and require manual administrative review before publishing.
        </p>
      </div>
    </section>
  )
}
