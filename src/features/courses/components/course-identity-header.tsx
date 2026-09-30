'use client'

import Link from 'next/link'
import { Bookmark, BookOpen, CalendarClock, GraduationCap, School } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DetailQuickFacts, type DetailQuickFact } from '@/components/shared/detail-quick-facts'
import { useSavedItem } from '@/features/saved/saved-items-provider'
import type { CourseDetailData } from '../data/course-detail'






 
export function CourseIdentityHeader({ course }: { course: CourseDetailData }) {
  const { saved, toggleSaved } = useSavedItem('course', course.slug, 'Course')

  const facts: DetailQuickFact[] = [
    { icon: CalendarClock, label: 'Duration', value: course.duration },
    { icon: GraduationCap, label: 'Study Level', value: course.level },
    { icon: School, label: 'Course Type', value: course.mode },
    { icon: BookOpen, label: 'Relevant Exams', value: course.examsSummary },
  ]

  return (
    <div className="border-b pb-5 sm:pb-6">
      <div className="flex items-start gap-3 sm:gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary sm:size-16" aria-hidden="true">
          <GraduationCap className="size-6 sm:size-7" />
        </span>

        <div className="min-w-0 flex-1">
          <h1 className="font-heading text-xl font-bold text-foreground sm:text-3xl">{course.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-[15px]">{course.fullName}</p>
          <p className="mt-2.5 max-w-2xl text-sm leading-6 text-foreground">{course.overviewCopy.split('. ')[0]}.</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-primary">{course.stream}</span>
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground">{course.specialization}</span>
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground">{course.degree}</span>
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

      <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row sm:items-center">
        { }
        <Button className="h-11 px-6 text-sm font-semibold sm:h-10" nativeButton={false} render={<Link href="/colleges" />}>
          View Colleges
        </Button>
        { }
        <Button variant="outline" className="h-11 px-6 text-sm font-semibold sm:h-10" disabled title="Course comparison is coming soon">
          Compare Courses
        </Button>
      </div>

      <div className="mt-5">
        <DetailQuickFacts facts={facts} />
      </div>
    </div>
  )
}
