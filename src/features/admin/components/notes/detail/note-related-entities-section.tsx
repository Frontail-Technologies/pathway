import { AdminNote } from '@/features/admin/data/admin-notes'
import { Badge } from '@/components/ui/badge'
import { BookOpen, GraduationCap } from 'lucide-react'
import Link from 'next/link'

export function NoteRelatedEntitiesSection({ note }: { note: AdminNote }) {
  const hasCourses = note.resolvedCourses.length > 0
  const hasExams = note.resolvedExams.length > 0

  return (
    <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
      <h2 className="text-sm font-bold text-foreground">Related Academic Entities</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2 p-3.5 bg-muted/20 rounded-lg border border-border/60">
          <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <span>Connected Programs & Courses</span>
          </div>

          {hasCourses ? (
            <div className="space-y-1">
              {note.resolvedCourses.map((c) => (
                <div key={c.id} className="text-xs text-foreground font-medium">
                  {c.name}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground italic">No specific courses linked.</p>
          )}
        </div>

        <div className="space-y-2 p-3.5 bg-muted/20 rounded-lg border border-border/60">
          <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
            <GraduationCap className="w-3.5 h-3.5 text-primary" />
            <span>Target Entrance Exams</span>
          </div>

          {hasExams ? (
            <div className="flex flex-wrap gap-1.5">
              {note.resolvedExams.map((e) => (
                <Badge key={e.id} variant="outline" className="text-xs font-medium">
                  {e.name}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground italic">No specific entrance exams linked.</p>
          )}
        </div>
      </div>
    </div>
  )
}
