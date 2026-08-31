'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Bookmark, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { CourseDetailData } from '../data/course-detail'

export function CourseIdentityHeader({ course }: { course: CourseDetailData }) {
  const [saved, setSaved] = useState(false)

  const toggleSaved = () => {
    const next = !saved
    setSaved(next)
    toast.success(next ? 'Course saved to your list.' : 'Course removed from saved items.')
  }

  return (
    <div className="border-b pb-5 sm:pb-6">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary sm:size-16">
          <GraduationCap className="size-6 sm:size-7" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="font-heading text-xl font-bold text-foreground sm:text-3xl">{course.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-[15px]">{course.fullName}</p>
          <p className="mt-2.5 text-[13px] text-muted-foreground sm:text-sm">
            {course.level} · {course.mode} · {course.duration}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-primary">{course.stream}</span>
            <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-primary">{course.specialization}</span>
          </div>
        </div>

        <button
          type="button"
          aria-label={saved ? 'Remove from saved courses' : 'Save course'}
          aria-pressed={saved}
          onClick={toggleSaved}
          className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <Bookmark className={saved ? 'size-4 fill-primary text-primary' : 'size-4 text-muted-foreground'} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Eligibility</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground sm:text-[15px]">{course.eligibilitySummary}</p>
        </div>
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Entrance Exams</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground sm:text-[15px]">{course.examsSummary}</p>
        </div>
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Typical Fees</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground sm:text-[15px]">{course.feesSummary}</p>
        </div>
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Colleges</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground sm:text-[15px]">{course.collegesCount}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row sm:items-center">
        <Button className="h-11 px-6 text-sm font-semibold sm:h-10">View Colleges</Button>
        <Button variant="outline" className="h-11 px-6 text-sm font-semibold sm:h-10">
          Compare Courses
        </Button>
      </div>
    </div>
  )
}
