import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { HorizontalContentRail } from '@/components/shared/horizontal-content-rail'
import { getCollegeFacets, listColleges } from '@/features/colleges/api/colleges-api'
import { CollegeCard } from '@/features/colleges/components/college-card'
import { listCourses } from '@/features/courses/api/courses-api'
import { listStreamDtos } from '@/features/streams/api/streams-api'
import type { DetailedExam } from '../config/exam-tabs'

const LIMIT = 8

export async function examStream(exam: DetailedExam) {
  const streams = await listStreamDtos()
  return streams.find((stream) => stream.exams.some((item) => item.slug === exam.slug)) ?? streams.find((stream) => exam.studyArea.toLowerCase().startsWith(stream.name.toLowerCase()))
}

export async function examStreamData(exam: DetailedExam) {
  const stream = await examStream(exam)
  if (!stream) return null
  const facets = await getCollegeFacets()
  const degrees = facets.courses.filter((option) => stream.degreeLabels.includes(option.label)).map((option) => option.slug)
  const collegesQuery = degrees.length ? `courses=${degrees.join(',')}&sort=ranking` : ''
  const [colleges, courses] = await Promise.all([
    degrees.length ? listColleges({ courses: degrees.join(','), sort: 'ranking', limit: String(LIMIT) }).catch(() => null) : null,
    exam.courses.length ? null : listCourses({ stream: stream.slug, sort: 'popularity', limit: '6' }).catch(() => null),
  ])
  return {
    stream,
    colleges: colleges?.items ?? [],
    collegesTotal: colleges?.page.total ?? 0,
    collegesHref: `/colleges?${collegesQuery}`,
    courses: courses?.items ?? [],
  }
}

type StreamData = NonNullable<Awaited<ReturnType<typeof examStreamData>>>

export function ExamTopCollegesSection({ data }: { data: StreamData }) {
  if (!data.colleges.length) return null
  return (
    <section id="top-colleges" className="scroll-mt-section rounded-xl border bg-card p-4 sm:p-6">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">Top {data.stream.name.toLowerCase()} colleges</h2>
        <Link href={data.collegesHref} className="hidden shrink-0 items-center gap-0.5 text-sm font-semibold text-primary hover:underline sm:flex">
          View all {data.collegesTotal.toLocaleString('en-IN')}
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Ranked by NIRF. Check each college for the exams it accepts.</p>
      <HorizontalContentRail ariaLabel={`Top ${data.stream.name} colleges`} showControls className="mt-4">
        {data.colleges.map((college) => (
          <CollegeCard key={college.slug} college={college} variant="rail" className="lg:w-[calc((100%-1.5rem)/3)]" />
        ))}
      </HorizontalContentRail>
    </section>
  )
}

export function ExamStreamCoursesSection({ data }: { data: StreamData }) {
  if (!data.courses.length) return null
  return (
    <section id="stream-courses" className="scroll-mt-section rounded-xl border bg-card p-4 sm:p-6">
      <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">{data.stream.name} courses</h2>
      <ul className="mt-4 divide-y overflow-hidden rounded-lg border">
        {data.courses.map((course) => (
          <li key={course.slug}>
            <Link href={`/course/${course.slug}`} className="group flex items-center justify-between gap-3 px-4 py-3 outline-none hover:bg-muted/50 focus-visible:bg-muted">
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-foreground group-hover:text-primary">{course.name}</span>
                <span className="mt-0.5 block text-[13px] text-muted-foreground">{[course.level, course.duration, course.fees].filter(Boolean).join(' · ')}</span>
              </span>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
