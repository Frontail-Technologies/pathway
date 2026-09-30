import { BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { AdminCoachingProvider } from '@/features/admin/data/admin-coaching'

export function CoachingProgramsSection({ provider }: { provider: AdminCoachingProvider }) {
  const programs = provider.programs || []
  const courseTypes = provider.courseTypes || []

  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-foreground">Programs & Course Formats</h2>
        <Badge variant="muted" size="sm">
          {programs.length > 0 ? `${programs.length} Structured Track(s)` : `${courseTypes.length} Format(s)`}
        </Badge>
      </div>

      {programs.length > 0 ? (
        <div className="space-y-3">
          {programs.map((program, idx) => (
            <div key={idx} className="bg-muted/30 p-3.5 rounded-lg border border-border/50 space-y-2 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="font-bold text-foreground">{program.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {program.mode && (
                    <Badge variant="outline" size="xs">
                      {program.mode}
                    </Badge>
                  )}
                  {program.courseType && (
                    <Badge variant="info" size="xs">
                      {program.courseType}
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed pl-6">{program.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground block">Listing-level Course Formats:</span>
          <div className="flex flex-wrap gap-2">
            {courseTypes.map((type) => (
              <Badge key={type} variant="info" size="sm">
                {type}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
