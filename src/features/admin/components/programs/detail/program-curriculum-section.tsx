import * as React from 'react'
import { AdminSection } from '../../admin-section'
import { type CourseDetailData } from '@/features/courses/data/course-detail'

export function ProgramCurriculumSection({
  syllabus,
}: {
  syllabus?: CourseDetailData['syllabus']
}) {
  if (!syllabus || syllabus.length === 0) return null

  return (
    <AdminSection title="Curriculum & Syllabus">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {syllabus.map((year) => (
          <div key={year.year} className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-2">
            <span className="text-xs font-bold text-foreground block">{year.year}</span>
            <div className="flex flex-wrap gap-1.5">
              {year.subjects.map((sub) => (
                <span
                  key={sub}
                  className="text-[11px] font-medium bg-card px-2 py-0.5 rounded border border-border/70 text-foreground"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AdminSection>
  )
}
