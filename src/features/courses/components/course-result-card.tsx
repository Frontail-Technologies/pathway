'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Bookmark, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { CourseListItem } from '../data/courses'

export function CourseResultCard({ course }: { course: CourseListItem }) {
  const [saved, setSaved] = useState(false)

  const toggleSaved = () => {
    const next = !saved
    setSaved(next)
    toast.success(next ? 'Course saved to your list.' : 'Course removed from saved items.')
  }

  return (
    <article className="rounded-[10px] border bg-card p-4 transition-colors hover:border-primary/30 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-bold text-foreground">{course.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            {course.level} · {course.studyMode} · {course.duration}
          </p>
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

      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-primary">{course.stream}</span>
        <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-primary">{course.specialization}</span>
      </div>

      {/* Mobile: stacked compact blocks — not the desktop grid squeezed into narrow columns. */}
      <div className="mt-4 flex flex-col gap-3 border-t pt-4 sm:hidden">
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Eligibility</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground">{course.eligibility}</p>
        </div>
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Entrance Exams</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground">{course.entranceExams.join(' / ')}</p>
        </div>
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Typical Fees</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground">{course.fees}</p>
        </div>
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Career Areas</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground">{course.careerAreas.join(' · ')}</p>
        </div>
      </div>

      {/* Desktop: compact structured data grid. */}
      <div className="mt-4 hidden grid-cols-4 gap-4 border-t pt-4 sm:grid">
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Eligibility</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground">{course.eligibility}</p>
        </div>
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Entrance Exams</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground">{course.entranceExams.join(' / ')}</p>
        </div>
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Typical Fees</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground">{course.fees}</p>
        </div>
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Career Areas</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground">{course.careerAreas.join(' · ')}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
          <Building2 className="size-3.5 shrink-0" aria-hidden="true" />
          {course.collegesOffering}+ Colleges offering this course
        </p>
        <div className="grid grid-cols-2 gap-2 sm:flex">
          <Button className="h-11 px-4 text-sm sm:h-10 sm:flex-none">View Colleges</Button>
          <Button
            variant="outline"
            className="h-11 px-4 text-sm sm:h-10 sm:flex-none"
            nativeButton={false}
            render={<Link href={`/course/${course.slug}`} />}
          >
            Explore Course
          </Button>
        </div>
      </div>
    </article>
  )
}
