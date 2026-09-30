import * as React from 'react'
import { Badge } from '@/components/ui/badge'

export type SourceReviewSectionProps = {
  isEdit: boolean
}

export function SourceReviewSection({ isEdit }: SourceReviewSectionProps) {
  return (
    <section id="review" className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4 scroll-mt-20">
      <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
        Data Source & Review
      </h2>

      <div className="p-4 rounded-lg bg-muted/30 border border-border/60 space-y-3 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <span className="text-[11px] text-muted-foreground block">Provenance Source</span>
            <span className="font-semibold text-foreground block">Manual Catalog Authoring</span>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] text-muted-foreground block">Ingestion State</span>
            <Badge variant="muted" size="xs">
              Manual Record
            </Badge>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] text-muted-foreground block">Review Stage</span>
            <span className="text-muted-foreground font-medium block">
              {isEdit ? 'Editorial Maintenance' : 'Draft / Creation'}
            </span>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground leading-relaxed pt-2 border-t border-border/60">
          Data quality review is automatically derived based on factual source verification and completeness breakdown upon saving.
        </p>
      </div>
    </section>
  )
}
