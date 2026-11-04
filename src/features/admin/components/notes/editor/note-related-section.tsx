'use client'

import * as React from 'react'
import { courses } from '@/features/courses/data/courses'
import { exams } from '@/features/exams/data/exams'
import { Input } from '@/components/ui/input'
import { Search, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NoteFormData } from './use-note-editor'

export function NoteRelatedSection({
  formData,
  toggleCourseId,
  toggleExamId,
}: {
  formData: NoteFormData
  toggleCourseId: (id: string) => void
  toggleExamId: (id: string) => void
}) {
  const [courseQuery, setCourseQuery] = React.useState('')
  const [examQuery, setExamQuery] = React.useState('')

  const filteredCourses = courses.filter((c) =>
    c.name.toLowerCase().includes(courseQuery.toLowerCase())
  )

  const filteredExams = exams.filter((e) =>
    e.name.toLowerCase().includes(examQuery.toLowerCase())
  )

  return (
    <div id="related" className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5">
      <div>
        <h2 className="text-[15px] font-semibold text-foreground">Courses and exams</h2>
        <p className="mt-0.5 text-[13px] text-muted-foreground">
          Link the note to the courses and exams it helps with.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3 p-4 rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Courses</span>
            <span className="ml-auto text-[13px] text-muted-foreground tabular-nums">{formData.courseIds.length} linked</span>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              value={courseQuery}
              onChange={(e) => setCourseQuery(e.target.value)}
              placeholder="Search courses"
              className="pl-8 h-8 text-sm bg-background"
            />
          </div>

          <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
            {filteredCourses.map((course) => {
              const isSelected = formData.courseIds.includes(course.id)
              return (
                <button
                  type="button"
                  aria-pressed={isSelected}
                  key={course.id}
                  onClick={() => toggleCourseId(course.id)}
                  className={cn(
                    'w-full text-left p-2 rounded-md text-sm flex items-center justify-between cursor-pointer transition-colors',
                    isSelected
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'hover:bg-muted text-foreground'
                  )}
                >
                  <span className="truncate pr-2">{course.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0 text-primary" />}
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-3 p-4 rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Exams</span>
            <span className="ml-auto text-[13px] text-muted-foreground tabular-nums">{formData.examIds.length} linked</span>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              value={examQuery}
              onChange={(e) => setExamQuery(e.target.value)}
              placeholder="Search exams"
              className="pl-8 h-8 text-sm bg-background"
            />
          </div>

          <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
            {filteredExams.map((exam) => {
              const isSelected = formData.examIds.includes(exam.id)
              return (
                <button
                  type="button"
                  aria-pressed={isSelected}
                  key={exam.id}
                  onClick={() => toggleExamId(exam.id)}
                  className={cn(
                    'w-full text-left p-2 rounded-md text-sm flex items-center justify-between cursor-pointer transition-colors',
                    isSelected
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'hover:bg-muted text-foreground'
                  )}
                >
                  <span className="truncate pr-2">{exam.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0 text-primary" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
