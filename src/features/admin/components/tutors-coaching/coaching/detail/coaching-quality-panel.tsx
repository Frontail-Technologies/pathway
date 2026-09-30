import { CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react'
import type { AdminCoachingQualityAssessment } from '@/features/admin/data/admin-coaching'
import { CoachingQualityBadge } from '../../shared/tutor-status-badge'

export function CoachingQualityPanel({ quality }: { quality: AdminCoachingQualityAssessment }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Data Quality</h3>
        <CoachingQualityBadge status={quality.status} />
      </div>

      <div className="flex items-baseline justify-between pt-1 border-t border-border/50">
        <span className="text-xs text-muted-foreground">Quality Score</span>
        <span className="text-sm font-bold font-mono text-foreground">{quality.score}/100</span>
      </div>

      <div className="space-y-2 pt-1 border-t border-border/50">
        {quality.checks.map((check) => (
          <div key={check.id} className="space-y-0.5 text-xs">
            <div className="flex items-center gap-1.5 font-medium">
              {check.status === 'passed' && <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />}
              {check.status === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-warning shrink-0" />}
              {check.status === 'failed' && <AlertCircle className="w-3.5 h-3.5 text-destructive shrink-0" />}
              {check.status === 'info' && <Info className="w-3.5 h-3.5 text-primary shrink-0" />}
              <span className="text-foreground">{check.label}</span>
            </div>
            <p className="text-[11px] text-muted-foreground pl-5 leading-tight">{check.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
