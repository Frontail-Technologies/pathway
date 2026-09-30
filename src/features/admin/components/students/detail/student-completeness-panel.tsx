import type { AdminStudent } from '@/features/admin/data/admin-students'
import { profileFields } from '@/features/student/data/student'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, Circle } from 'lucide-react'

export function StudentCompletenessPanel({ student }: { student: AdminStudent }) {
  const { percent, filled, total } = student.profileCompletion

  return (
    <div className="bg-card rounded-xl p-5 shadow-xs border-0 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Profile Completeness
        </h3>
        <span className="text-xs font-bold text-foreground">{percent}%</span>
      </div>

      <div className="space-y-1.5">
        <Progress value={percent} className="h-2" />
        <span className="text-[11px] text-muted-foreground block text-right">
          {filled} of {total} profile fields filled
        </span>
      </div>

      <div className="space-y-2 pt-1 border-t border-border/60">
        {profileFields.map((field) => {
          const isFilled = !student.profileCompletion.missing.includes(field.key)
          return (
            <div
              key={field.key}
              className="flex items-center justify-between text-xs py-0.5"
            >
              <div className="flex items-center gap-2 min-w-0">
                {isFilled ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
                )}
                <span
                  className={
                    isFilled
                      ? 'text-foreground font-medium truncate'
                      : 'text-muted-foreground truncate'
                  }
                >
                  {field.label}
                </span>
              </div>
              <span
                className={`text-[10px] font-semibold shrink-0 ${
                  isFilled ? 'text-emerald-700' : 'text-muted-foreground'
                }`}
              >
                {isFilled ? 'Filled' : 'Missing'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
