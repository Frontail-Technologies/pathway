import type { AdminStudent } from '@/features/admin/data/admin-students'
import { Briefcase } from 'lucide-react'

export function StudentCareerExperienceSection({ student }: { student: AdminStudent }) {
  return (
    <div className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4">
      <h2 className="text-base font-bold font-heading text-foreground">
        Career Goal & Experience
      </h2>

      <div className="space-y-4 text-xs">
        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
          <span className="text-muted-foreground font-medium block">Declared Career Direction</span>
          <span className="text-sm font-semibold text-foreground block">
            {student.careerGoal || <span className="text-muted-foreground font-normal">Still exploring / Not specified</span>}
          </span>
        </div>

        <div className="space-y-2.5">
          <span className="text-xs font-semibold text-foreground block">
            Work Experience & Practical Projects ({student.workExperience.length})
          </span>

          {student.workExperience.length > 0 ? (
            <div className="space-y-3">
              {student.workExperience.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="text-sm font-bold text-foreground block">{item.role}</span>
                      <span className="text-xs font-semibold text-primary block">{item.organisation}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
                      {item.type && (
                        <span className="px-2 py-0.5 rounded bg-background border border-border text-foreground font-medium">
                          {item.type}
                        </span>
                      )}
                      {(item.start || item.end) && (
                        <span>
                          {item.start || '—'} – {item.end || 'Present'}
                        </span>
                      )}
                    </div>
                  </div>

                  {item.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-muted/20 border border-dashed border-border flex items-center gap-3 text-muted-foreground text-xs">
              <Briefcase className="w-4 h-4 shrink-0 text-muted-foreground/70" />
              <span>No work experience, internships, or practical projects recorded on this profile.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
