import { Shield, Lock, Layers } from 'lucide-react'
import type { AdminCoachingSourceInfo } from '@/features/admin/data/admin-coaching'

export function CoachingSourcePanel({ sourceInfo }: { sourceInfo: AdminCoachingSourceInfo }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Source & Pipeline</h3>
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
          <Lock className="w-3 h-3" />
          Pipeline Protected
        </span>
      </div>

      <div className="space-y-2 text-xs pt-1 border-t border-border/50">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Source Type</span>
          <span className="font-semibold text-foreground">{sourceInfo.source}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Last Verified</span>
          <span className="font-mono text-foreground">{sourceInfo.lastUpdated}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Sync Mode</span>
          <span className="font-medium text-foreground">{sourceInfo.syncStatus}</span>
        </div>
      </div>

      <div className="pt-2 border-t border-border/50 bg-muted/20 p-2.5 rounded-lg text-[11px] text-muted-foreground leading-relaxed space-y-1.5">
        <div className="flex items-center gap-1.5 font-medium text-foreground">
          <Layers className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>Ingestion Governance</span>
        </div>
        <p>
          Pipeline architecture: Raw Import &rarr; Staging &rarr; Diff &rarr; Admin Approval. Direct scraper overwrite is disabled.
        </p>
      </div>
    </div>
  )
}
