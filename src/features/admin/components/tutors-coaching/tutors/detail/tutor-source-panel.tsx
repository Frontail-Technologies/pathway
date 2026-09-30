import { Shield, Lock } from 'lucide-react'
import type { AdminTutorSourceInfo } from '@/features/admin/data/admin-tutors'

export function TutorSourcePanel({ sourceInfo }: { sourceInfo: AdminTutorSourceInfo }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Source & Provenance</h3>
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
          <span className="text-muted-foreground">Last Updated</span>
          <span className="font-mono text-foreground">{sourceInfo.lastUpdated}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Sync State</span>
          <span className="font-medium text-foreground">{sourceInfo.syncStatus}</span>
        </div>
      </div>

      <div className="pt-2 border-t border-border/50 bg-muted/20 p-2.5 rounded-lg text-[11px] text-muted-foreground leading-relaxed flex items-start gap-2">
        <Shield className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
        <span>Personal profile data is protected. Automated public web scraping is disabled for individual educators.</span>
      </div>
    </div>
  )
}
