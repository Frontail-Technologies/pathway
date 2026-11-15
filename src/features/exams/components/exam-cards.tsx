import type { ReactNode } from 'react'
import Link from 'next/link'
import { Building2, CalendarDays, FileText, Globe2, GraduationCap, Landmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatusPill, deadlineStatus } from '@/components/shared/status-pill'
import { toneForArea } from '@/features/catalog/tones'
import { cn } from '@/lib/utils'
import type { Exam } from '../data/exams'

const MIN_COLLEGES = 10

const dateFormat = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' })

function monogram(exam: Exam) {
  return exam.shortName.split(' ')[0].slice(0, 4).toUpperCase()
}

function dateRange(start: string | null, end: string | null) {
  const from = start ? dateFormat.format(new Date(start)) : ''
  const to = end ? dateFormat.format(new Date(end)) : ''
  if (from && to && from !== to) return `${from} – ${to}`
  return from || to
}

function nextStatus(exam: Exam) {
  const next = exam.nextDate
  if (!next) return null
  const deadline = next.endsOn ?? next.startsOn
  return { next, deadline, status: deadlineStatus(deadline, next.startsOn) }
}

export function PopularExamTile({ exam, className }: { exam: Exam; className?: string }) {
  const info = nextStatus(exam)
  const tone = toneForArea(exam.studyArea, exam.name)
  return (
    <Link
      href={`/exam/${exam.slug}`}
      className={cn('group relative flex flex-col overflow-hidden rounded-xl border bg-card p-4 outline-none transition-shadow hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)] focus-visible:ring-2 focus-visible:ring-ring/50', className)}
    >
      <span className={cn('flex size-11 items-center justify-center rounded-xl text-xs font-extrabold', tone.soft, tone.text)}>{monogram(exam)}</span>
      <p className="mt-3 text-base font-semibold text-foreground group-hover:text-primary">{exam.shortName}</p>
      <p className="mt-0.5 truncate text-[13px] text-muted-foreground">{[exam.studyArea, exam.level].filter(Boolean).join(' · ')}</p>
      {info ? (
        <StatusPill className="mt-3 self-start" status={info.status} deadline={info.deadline} />
      ) : exam.noticeCount ? (
        <p className="mt-3 text-xs font-medium text-muted-foreground">{exam.noticeCount} official notices</p>
      ) : null}
    </Link>
  )
}

function Fact({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <p className="flex min-w-0 items-center gap-2 text-[13px] text-muted-foreground">
      <span className="shrink-0 text-muted-foreground/80">{icon}</span>
      <span className="truncate">{children}</span>
    </p>
  )
}

export function ExamCard({ exam }: { exam: Exam }) {
  const href = `/exam/${exam.slug}`
  const tone = toneForArea(exam.studyArea, exam.name)
  const info = nextStatus(exam)
  const fullName = exam.name && exam.name !== exam.shortName ? exam.name : ''
  const links = [
    { label: 'Overview', href },
    exam.noticeCount ? { label: `Notices (${exam.noticeCount})`, href: `${href}/notices` } : null,
    /engineer/i.test(exam.studyArea) ? { label: 'College predictor', href: `/college-predictor?exam=${exam.slug}` } : null,
    /engineer/i.test(exam.studyArea) ? { label: 'Rank predictor', href: `/rank-predictor?exam=${exam.slug}` } : null,
  ].filter((link): link is NonNullable<typeof link> => Boolean(link))

  return (
    <article className="overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
      <div className="flex gap-4 p-4 sm:p-5">
        <span className={cn('relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl text-sm font-extrabold text-white sm:size-16', tone.gradient)} aria-hidden="true">
          <span className="relative">{monogram(exam)}</span>
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <h3 className="min-w-0 font-heading text-[17px] leading-snug font-bold text-foreground">
              <Link href={href} className="outline-none hover:text-primary focus-visible:underline">
                {exam.shortName}
                {fullName ? <span className="font-sans text-[15px] font-medium text-muted-foreground"> – {fullName}</span> : null}
              </Link>
            </h3>
            <Button variant="cta" size="sm" className="hidden shrink-0 px-5 sm:inline-flex" nativeButton={false} render={<Link href={href} />}>
              View exam
            </Button>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            <Fact icon={<Globe2 className="size-4" aria-hidden="true" />}>{[exam.scope, exam.level].filter(Boolean).join(' · ')}</Fact>
            {exam.conductingBody ? <Fact icon={<Building2 className="size-4" aria-hidden="true" />}>{exam.conductingBody}</Fact> : null}
            <Fact icon={<GraduationCap className="size-4" aria-hidden="true" />}>{exam.studyArea}</Fact>
            {exam.noticeCount ? <Fact icon={<FileText className="size-4" aria-hidden="true" />}>{exam.noticeCount} official notices</Fact> : null}
            {exam.collegeCount && exam.collegeCount >= MIN_COLLEGES ? (
              <Fact icon={<Landmark className="size-4" aria-hidden="true" />}>{exam.collegeCount.toLocaleString('en-IN')} accepting colleges</Fact>
            ) : null}
          </div>
          {info ? (
            <p className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <CalendarDays className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="font-semibold text-foreground">{dateRange(info.next.startsOn, info.next.endsOn)}</span>
              <span className="text-muted-foreground">· {info.next.label}</span>
              <StatusPill status={info.status} deadline={info.deadline} />
            </p>
          ) : null}
          <Button variant="cta" size="sm" className="mt-4 w-full sm:hidden" nativeButton={false} render={<Link href={href} />}>
            View exam
          </Button>
        </div>
      </div>
      <nav aria-label={`${exam.shortName} sections`} className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t bg-muted/40 px-4 py-2.5 text-[13px] sm:px-5">
        {links.map((link, index) => (
          <span key={link.href} className="flex items-center gap-3">
            {index ? <span className="h-3 w-px bg-border" aria-hidden="true" /> : null}
            <Link href={link.href} className="font-medium text-primary hover:underline">
              {link.label}
            </Link>
          </span>
        ))}
      </nav>
    </article>
  )
}
