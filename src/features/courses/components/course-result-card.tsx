'use client'

import Link from 'next/link'
import { useSavedItem } from '@/features/saved/saved-items-provider'
import { Bookmark, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getCourseDetail } from '../data/course-detail'
import type { CourseListItem } from '../data/courses'

const chip = 'rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-primary'
const chipMuted = 'rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground'

 
export function CourseResultCard({ course }: { course: CourseListItem }) {
  const { saved, toggleSaved } = useSavedItem('course', course.slug, 'Course')
  const hasDetail = !!getCourseDetail(course.slug)

  return (
    <article className="flex gap-3 rounded-[12px] border bg-card p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:gap-4 sm:p-5">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary sm:size-14" aria-hidden="true">
        <GraduationCap className="size-5.5 sm:size-6" />
      </span>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            {hasDetail ? (
              <Link href={`/course/${course.slug}`} className="cursor-pointer text-base font-bold text-foreground outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40">
                {course.name}
              </Link>
            ) : (
              <span className="text-base font-bold text-foreground">{course.name}</span>
            )}
            <p className="mt-0.5 text-xs text-muted-foreground">
              {course.level} · {course.studyMode} · {course.duration}
            </p>
          </div>
          <button
            type="button"
            aria-label={saved ? 'Remove from saved courses' : 'Save course'}
            aria-pressed={saved}
            onClick={toggleSaved}
            className="-mt-1 -mr-1 flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <Bookmark className={saved ? 'size-4 fill-primary text-primary' : 'size-4 text-muted-foreground'} aria-hidden="true" />
          </button>
        </div>

        <p className="mt-2.5 text-sm leading-6 text-foreground">
          {course.level} programme in {course.stream}, eligibility {course.eligibility}.
        </p>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <span className={chip}>{course.stream}</span>
          <span className={chipMuted}>{course.specialization}</span>
          <span className={chipMuted}>{course.duration}</span>
        </div>

        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 border-t pt-3">
          <p className="text-xs text-muted-foreground">{course.collegesOffering}+ colleges offer this course</p>
          {hasDetail ? (
            <Button variant="outline" className="h-9 px-4 text-sm" nativeButton={false} render={<Link href={`/course/${course.slug}`} />}>
              Explore Course
            </Button>
          ) : (
            <Button variant="outline" className="h-9 px-4 text-sm" disabled title="Course details coming soon">
              Details Soon
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
