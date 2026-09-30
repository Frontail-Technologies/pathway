import type { AdminCoachingCompletenessAssessment } from '@/features/admin/data/admin-coaching'
import { Badge } from '@/components/ui/badge'

export function CoachingCompletenessPanel({
  completeness,
}: {
  completeness: AdminCoachingCompletenessAssessment
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Completeness</h3>
        <span className="text-xs font-bold font-mono text-primary">{completeness.percentage}%</span>
      </div>

      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full" style={{ width: `${completeness.percentage}%` }} />
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
        <span>Completed Fields</span>
        <span className="font-mono text-foreground">{completeness.completedCount}/{completeness.totalCount}</span>
      </div>

      {completeness.missingFields.length > 0 && (
        <div className="pt-2 border-t border-border/50 space-y-1.5">
          <span className="text-[11px] font-semibold text-muted-foreground block">Missing Information:</span>
          <div className="flex flex-wrap gap-1">
            {completeness.missingFields.map((field) => (
              <Badge key={field} variant="warning" size="xs">
                {field}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
