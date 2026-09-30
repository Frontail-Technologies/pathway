import { Sparkles, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { teachingSteps } from '@/features/tutors/data/tutors'
import type { AdminTutor } from '@/features/admin/data/admin-tutors'

export function TutorTeachingProfileSection({ tutor }: { tutor: AdminTutor }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4">
      <h2 className="text-sm font-bold text-foreground">Teaching Profile & Pedagogy</h2>

      {tutor.detail?.traits && tutor.detail.traits.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-semibold text-muted-foreground block">Key Teaching Traits</span>
          <div className="flex flex-wrap gap-2">
            {tutor.detail.traits.map((trait, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/5 text-primary text-xs font-medium border border-primary/15"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>{trait}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2 pt-2">
        <span className="text-xs font-semibold text-muted-foreground block">Standard 4-Step Teaching Methodology</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {teachingSteps.map((step, idx) => (
            <div key={idx} className="bg-muted/30 p-3 rounded-lg border border-border/50 space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="info" size="xs">
                  Step {idx + 1}
                </Badge>
                <span className="text-xs font-bold text-foreground">{step.title}</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed pl-6">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
