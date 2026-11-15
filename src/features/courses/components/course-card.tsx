'use client'

import Link from 'next/link'
import { ArrowRight, Bookmark, FileText, Landmark } from 'lucide-react'
import { toneForArea } from '@/features/catalog/tones'
import { useSavedItem } from '@/features/saved/saved-items-provider'
import { cn } from '@/lib/utils'
import type { CourseListItem } from '../api/courses-api'

const levelShort: Record<string, string> = { Undergraduate: 'UG', Postgraduate: 'PG', Diploma: 'Diploma', Certificate: 'Certificate' }

function SaveButton({ course }: { course: CourseListItem }) {
  const { saved, toggleSaved } = useSavedItem('course', course.slug, 'Course')
  return (
    <button
      type="button"
      aria-label={saved ? `Remove ${course.name} from saved` : `Save ${course.name}`}
      aria-pressed={saved}
      onClick={toggleSaved}
      className="relative z-10 flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border bg-card outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      <Bookmark className={saved ? 'size-4 fill-primary text-primary' : 'size-4 text-muted-foreground'} aria-hidden="true" />
    </button>
  )
}

function splitName(course: CourseListItem) {
  const degree = course.degree || course.name.split(' ')[0]
  const rest = course.name.startsWith(degree) ? course.name.slice(degree.length).trim() : course.name === degree ? '' : course.name
  return { degree, rest: rest || course.specialization || course.stream }
}

export function CourseCard({ course, variant = 'listing', className }: { course: CourseListItem; variant?: 'listing' | 'rail'; className?: string }) {
  const href = `/course/${course.slug}`
  const tone = toneForArea(course.stream, course.degree, course.name)
  const { degree, rest } = splitName(course)
  const stats = [
    { label: 'Fees', value: course.fees.replace(' Lakh', ' L') },
    { label: 'Duration', value: course.duration },
    { label: 'Mode', value: course.studyMode },
  ].filter((item) => item.value)
  const exams = course.entranceExams.length > 1 ? `${course.entranceExams[0]} +${course.entranceExams.length - 1}` : course.entranceExams[0]

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)]',
        variant === 'rail' && 'w-[17.5rem] shrink-0 snap-start lg:w-[calc((100%-2.25rem)/4)]',
        className,
      )}
    >
      <div className="relative border-b px-4 pt-4 pb-3.5">
        <div className="flex items-start justify-between gap-2">
          <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-primary">{levelShort[course.level] ?? course.level}</span>
          {variant === 'listing' ? <SaveButton course={course} /> : null}
        </div>
        <p className="mt-2 font-heading text-[30px] leading-none font-extrabold tracking-tight text-foreground">{degree}</p>
        <h3 className="mt-1.5 text-[15px] leading-snug font-semibold text-foreground">
          <Link href={href} className="line-clamp-2 outline-none after:absolute after:inset-0 group-hover:text-primary focus-visible:underline">
            {rest || course.name}
          </Link>
        </h3>
      </div>

      <dl className="grid grid-cols-3 gap-2 px-4 pt-3.5">
        {stats.map((item) => (
          <div key={item.label} className="min-w-0">
            <dd className="truncate text-sm font-semibold text-foreground tabular-nums">{item.value}</dd>
            <dt className="text-xs text-muted-foreground">{item.label}</dt>
          </div>
        ))}
      </dl>

      <div className="mt-3.5 flex flex-1 flex-col justify-end gap-2 border-t px-4 pt-3 pb-4 text-[13px] text-muted-foreground">
        {course.collegesOffering > 0 ? (
          <p className="flex items-center gap-1.5">
            <Landmark className="size-3.5 shrink-0" aria-hidden="true" />
            <span>
              <span className="font-semibold text-foreground">{course.collegesOffering.toLocaleString('en-IN')}</span> colleges offer it
            </span>
          </p>
        ) : null}
        {exams ? (
          <p className="flex items-center gap-1.5">
            <FileText className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{exams}</span>
          </p>
        ) : null}
        <span className="mt-1 flex items-center gap-1 font-semibold text-primary">
          View course
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  )
}
