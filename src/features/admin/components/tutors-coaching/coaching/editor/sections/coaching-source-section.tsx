import { Shield, Lock, Layers } from 'lucide-react'

export function CoachingSourceSection() {
  return (
    <div id="section-source" className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4 scroll-mt-24">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-foreground">Source Provenance & Pipeline Policy</h2>
        <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium bg-muted/60 px-2 py-0.5 rounded">
          <Lock className="w-3 h-3" />
          Read Only
        </span>
      </div>

      <div className="space-y-3 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-muted/30 p-3 rounded-lg border border-border/50 space-y-1">
            <span className="text-muted-foreground block text-[11px]">Provenance Source</span>
            <span className="font-semibold text-foreground">Manual / Institutional Import</span>
          </div>

          <div className="bg-muted/30 p-3 rounded-lg border border-border/50 space-y-1">
            <span className="text-muted-foreground block text-[11px]">Pipeline Staging</span>
            <span className="font-semibold text-foreground">Diff & Approval Required</span>
          </div>

          <div className="bg-muted/30 p-3 rounded-lg border border-border/50 space-y-1">
            <span className="text-muted-foreground block text-[11px]">Sync Mode</span>
            <span className="font-semibold text-foreground">Manual Direct</span>
          </div>
        </div>

        <div className="p-3 bg-muted/20 border border-border/50 rounded-lg text-muted-foreground flex items-start gap-2">
          <Layers className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span>
            Institutional web scraper updates must pass through Raw Import &rarr; Staging &rarr; Diff &rarr; Admin Approval before updating canonical coaching records. Direct scraper overwrite is prohibited.
          </span>
        </div>
      </div>
    </div>
  )
}
