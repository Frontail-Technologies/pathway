import { Badge } from '@/components/ui/badge'
import type { AdminTutor } from '@/features/admin/data/admin-tutors'

export function TutorSubjectsExamsSection({ tutor }: { tutor: AdminTutor }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4">
      <h2 className="text-sm font-bold text-foreground">Subjects & Target Exams</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="space-y-2 bg-muted/30 p-3.5 rounded-lg border border-border/50">
          <span className="font-semibold text-muted-foreground block">Teaching Subjects</span>
          <div className="flex flex-wrap gap-1.5">
            {tutor.subjects?.map((subject) => (
              <Badge key={subject} variant="info" size="sm">
                {subject}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2 bg-muted/30 p-3.5 rounded-lg border border-border/50">
          <span className="font-semibold text-muted-foreground block">Entrance & Board Exams</span>
          <div className="flex flex-wrap gap-1.5">
            {tutor.exams?.map((exam) => (
              <Badge key={exam} variant="outline" size="sm">
                {exam}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2 bg-muted/30 p-3.5 rounded-lg border border-border/50">
          <span className="font-semibold text-muted-foreground block">Study Levels</span>
          <div className="flex flex-wrap gap-1.5">
            {tutor.studyLevels?.map((level) => (
              <Badge key={level} variant="muted" size="sm">
                {level}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
