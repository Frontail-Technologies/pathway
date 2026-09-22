'use client'

import { BookOpen, Cog, Stethoscope } from 'lucide-react'
import { ToolExamCard } from '@/components/shared/student-tool/student-tool-parts'
import { courseOptions, getCourse, type CollegePredictorDraft, type CourseId, type PredictorErrors, type PredictorExam } from '../data/predictor'
import { StepHeading } from '@/components/shared/student-tool/tool-fields'

const courseIcons: Record<CourseId, typeof Cog> = { engineering: Cog, medical: Stethoscope, undergraduate: BookOpen }

export function CourseExamsStep({ draft, errors, onSelectCourse, onToggleExam }: { draft: CollegePredictorDraft; errors: PredictorErrors; onSelectCourse: (course: CourseId) => void; onToggleExam: (exam: PredictorExam) => void }) {
  const course = getCourse(draft.course)

  return (
    <div className="flex flex-col gap-7">
      <StepHeading title="What are you planning to study?" helper="Choose a course, then the entrance exams you have taken." />

      <div>
        <div role="radiogroup" aria-label="Course" className="grid gap-3 sm:grid-cols-3">
          {courseOptions.map((option) => {
            const Icon = courseIcons[option.id]
            const active = option.id === draft.course
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onSelectCourse(option.id)}
                className={`flex min-h-16 cursor-pointer items-center gap-3 rounded-[12px] border p-4 text-left transition-colors ${active ? 'border-primary bg-primary/8 ring-1 ring-primary/30' : 'border-border bg-card hover:border-primary/40'}`}
              >
                <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${active ? 'bg-primary text-primary-foreground' : 'bg-secondary text-primary'}`}>
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground">{option.label}</span>
                  <span className="block text-xs text-muted-foreground">{option.description}</span>
                </span>
              </button>
            )
          })}
        </div>
        {errors.course && (
          <p role="alert" className="mt-2 text-xs text-destructive">
            {errors.course}
          </p>
        )}
      </div>

      {course && (
        <div className="border-t pt-6">
          <p className="text-base font-semibold text-foreground">Which exams have you taken?</p>
          <p className="mt-0.5 text-sm text-muted-foreground">Select all that apply.</p>
          <div role="group" aria-label="Entrance exams" className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {course.exams.map((exam) => {
              const active = draft.exams.includes(exam)
              return <ToolExamCard key={exam} exam={exam} active={active} onClick={() => onToggleExam(exam)} />
            })}
          </div>
          {errors.exams && (
            <p role="alert" className="mt-2 text-xs text-destructive">
              {errors.exams}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
