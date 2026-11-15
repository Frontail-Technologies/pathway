import Link from 'next/link'
import { GraduationCap, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ScholarshipListItem } from '../api/scholarships-api'

const month = new Intl.DateTimeFormat('en-IN', { month: 'short', timeZone: 'Asia/Kolkata' })
const day = new Intl.DateTimeFormat('en-IN', { day: 'numeric', timeZone: 'Asia/Kolkata' })

export function DeadlineBlock({ scholarship }: { scholarship: ScholarshipListItem }) {
  const date = scholarship.deadline ? new Date(scholarship.deadline) : null
  const valid = date && !Number.isNaN(date.getTime())
  const left = scholarship.daysRemaining
  const urgent = scholarship.status === 'closing-soon' && left != null && left <= 14
  if (!valid) {
    return (
      <div className="flex w-[4.5rem] shrink-0 flex-col items-center rounded-lg border border-dashed px-1.5 py-1.5 text-center">
        <span className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">Deadline</span>
        <span className="mt-0.5 text-xs leading-tight font-medium text-muted-foreground">Not announced</span>
      </div>
    )
  }
  return (
    <div className={cn('flex w-[4.5rem] shrink-0 flex-col items-center overflow-hidden rounded-lg border text-center', urgent ? 'border-destructive/30' : '')}>
      <span className={cn('w-full py-0.5 text-[10px] font-bold tracking-wide text-white uppercase', urgent ? 'bg-destructive' : 'bg-primary')}>{month.format(date)}</span>
      <span className="font-heading text-2xl leading-8 font-extrabold text-foreground tabular-nums">{day.format(date)}</span>
      <span className={cn('w-full pb-1 text-[10px] font-semibold', urgent ? 'text-destructive' : 'text-muted-foreground')}>
        {scholarship.status === 'closed' ? 'Closed' : left != null && left >= 0 ? (left === 0 ? 'Last day' : `${left} day${left === 1 ? '' : 's'} left`) : 'Deadline'}
      </span>
    </div>
  )
}

export function ProviderMark({ scholarship }: { scholarship: ScholarshipListItem }) {
  return (
    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-[11px] font-extrabold text-primary" aria-hidden="true">
      {scholarship.providerInitials.slice(0, 5)}
    </span>
  )
}

export function ScholarshipRailCard({ scholarship, className }: { scholarship: ScholarshipListItem; className?: string }) {
  const eligibility = scholarship.shortEligibility.join(' · ') || scholarship.educationLevels.join(' · ')
  return (
    <article className={cn('group relative flex w-[17.5rem] shrink-0 snap-start flex-col rounded-xl border bg-card p-4 transition-shadow hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)] lg:w-[calc((100%-2.25rem)/4)]', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <ProviderMark scholarship={scholarship} />
          <p className="mt-2 truncate text-xs font-medium text-muted-foreground">{scholarship.provider}</p>
        </div>
        <DeadlineBlock scholarship={scholarship} />
      </div>
      <h3 className="mt-2 text-[15px] leading-snug font-semibold text-foreground">
        <Link href={`/scholarship/${scholarship.slug}`} className="line-clamp-2 outline-none after:absolute after:inset-0 group-hover:text-primary focus-visible:underline">
          {scholarship.name}
        </Link>
      </h3>
      <div className="mt-3 flex flex-col gap-2 border-t pt-3 text-sm">
        <p className="flex items-start gap-2">
          <Trophy className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <span className="font-semibold text-success">{scholarship.benefitLabel}</span>
        </p>
        {eligibility ? (
          <p className="flex items-start gap-2 text-muted-foreground">
            <GraduationCap className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <span className="line-clamp-2">{eligibility}</span>
          </p>
        ) : null}
      </div>
    </article>
  )
}
