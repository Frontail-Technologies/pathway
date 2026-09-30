import { GraduationCap } from 'lucide-react'
import type { AdminCoachingProvider } from '@/features/admin/data/admin-coaching'

export function CoachingFacultySection({ provider }: { provider: AdminCoachingProvider }) {
  const notes = provider.facultyNotes || []

  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-foreground">Teaching Approach & Faculty Policy</h2>
        <span className="text-[11px] text-muted-foreground">Institutional Pedagogy</span>
      </div>

      {notes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {notes.map((note, idx) => (
            <div key={idx} className="bg-muted/30 p-3.5 rounded-lg border border-border/50 space-y-1.5">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="font-bold text-foreground">{note.title}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed pl-6">{note.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground bg-muted/20 p-3 rounded-lg border border-border/40">
          Faculty approach notes have not been configured for this listing-only provider.
        </p>
      )}
    </div>
  )
}
