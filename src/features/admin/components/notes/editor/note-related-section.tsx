'use client'

import * as React from 'react'
import { courses } from '@/features/courses/data/courses'
import { exams } from '@/features/exams/data/exams'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { BookOpen, GraduationCap, Search, Check } from 'lucide-react'
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
    <div id="related" className="bg-card rounded-xl p-5 sm:p-6 border-0 shadow-xs space-y-5">
      <div>
        <h2 className="text-sm font-bold text-foreground">Related Academic Programs & Exams</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Link study material to canonical courses and competitive entrance exams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        { }
        <div className="space-y-3 p-4 bg-muted/20 rounded-xl border border-border/60">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-foreground">Connected Programs</span>
            <Badge variant="secondary" className="text-[10px] ml-auto">
              {formData.courseIds.length} Linked
            </Badge>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              value={courseQuery}
              onChange={(e) => setCourseQuery(e.target.value)}
              placeholder="Search programs..."
              className="pl-8 h-8 text-xs bg-background"
            />
          </div>

          <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
            {filteredCourses.map((course) => {
              const isSelected = formData.courseIds.includes(course.id)
              return (
                <div
                  key={course.id}
                  onClick={() => toggleCourseId(course.id)}
                  className={cn(
                    'p-2 rounded-lg text-xs flex items-center justify-between cursor-pointer transition-colors',
                    isSelected
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'hover:bg-muted/40 text-muted-foreground'
                  )}
                >
                  <span className="truncate pr-2">{course.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0 text-primary" />}
                </div>
              )
            })}
          </div>
        </div>

        { }
        <div className="space-y-3 p-4 bg-muted/20 rounded-xl border border-border/60">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-foreground">Target Entrance Exams</span>
            <Badge variant="secondary" className="text-[10px] ml-auto">
              {formData.examIds.length} Linked
            </Badge>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              value={examQuery}
              onChange={(e) => setExamQuery(e.target.value)}
              placeholder="Search exams..."
              className="pl-8 h-8 text-xs bg-background"
            />
          </div>

          <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
            {filteredExams.map((exam) => {
              const isSelected = formData.examIds.includes(exam.id)
              return (
                <div
                  key={exam.id}
                  onClick={() => toggleExamId(exam.id)}
                  className={cn(
                    'p-2 rounded-lg text-xs flex items-center justify-between cursor-pointer transition-colors',
                    isSelected
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'hover:bg-muted/40 text-muted-foreground'
                  )}
                >
                  <span className="truncate pr-2">{exam.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0 text-primary" />}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
