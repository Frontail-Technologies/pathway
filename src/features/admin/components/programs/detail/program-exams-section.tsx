import * as React from 'react'
import { AdminSection } from '../../admin-section'
import { Badge } from '@/components/ui/badge'
import { type CourseDetailData } from '@/features/courses/data/course-detail'

export function ProgramExamsSection({
  exams,
  fallbackExams,
}: {
  exams?: CourseDetailData['exams']
  fallbackExams: string[]
}) {
  const hasExams = (exams && exams.length > 0) || fallbackExams.length > 0
  if (!hasExams) return null

  return (
    <AdminSection title="Relevant Entrance Exams">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {exams && exams.length > 0
          ? exams.map((exam) => (
              <div key={exam.name} className="p-3 rounded-lg bg-muted/40 space-y-1 text-xs">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-bold text-foreground">{exam.name}</span>
                  <Badge variant="muted" size="xs">
                    {exam.level}
                  </Badge>
                </div>
                <span className="text-[11px] text-muted-foreground block">{exam.purpose}</span>
              </div>
            ))
          : fallbackExams.map((exam) => (
              <div key={exam} className="p-3 rounded-lg bg-muted/40 text-xs font-semibold text-foreground">
                {exam}
              </div>
            ))}
      </div>
    </AdminSection>
  )
}
