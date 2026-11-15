'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { BadgeCheck, Bookmark, Briefcase, FileText, IndianRupee, Landmark, MapPin, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { SponsoredBadge } from '@/components/shared/sponsored-badge'
import { toneForOwnership } from '@/features/catalog/tones'
import { useSavedItem } from '@/features/saved/saved-items-provider'
import { cn } from '@/lib/utils'
import type { CollegeListItem } from '../api/colleges-api'
import { collegeInitials } from '../utils'

export { collegeInitials }

const examSummary = (exams: string[]) => (exams.length > 1 ? `${exams[0]} +${exams.length - 1}` : exams[0] ?? '')

function SaveButton({ college }: { college: CollegeListItem }) {
  const { saved, toggleSaved } = useSavedItem('college', college.slug, 'College')
  return (
    <button
      type="button"
      aria-label={saved ? `Remove ${college.name} from saved` : `Save ${college.name}`}
      aria-pressed={saved}
      onClick={toggleSaved}
      className="relative z-10 flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border bg-card outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      <Bookmark className={saved ? 'size-4 fill-primary text-primary' : 'size-4 text-muted-foreground'} aria-hidden="true" />
    </button>
  )
}

function Crest({ college, size }: { college: CollegeListItem; size: 'lg' | 'band' }) {
  const tone = toneForOwnership(college.type)
  const rank = college.ranking
  return (
    <div className={cn('relative flex shrink-0 overflow-hidden', tone.gradient, size === 'lg' ? 'size-20 items-center justify-center rounded-xl sm:row-span-2 sm:h-32 sm:w-40' : 'h-24 w-full items-end px-4 pb-3')}>
      <span className={cn('relative font-heading font-extrabold tracking-wide', size === 'lg' ? 'text-2xl sm:text-4xl' : 'text-2xl')}>{collegeInitials(college.name)}</span>
      {rank ? (
        <span className="absolute top-0 left-0 rounded-br-lg border-r border-b bg-card px-2 py-1 text-[11px] leading-none font-bold text-success">
          #{rank.rank} {rank.source}
        </span>
      ) : null}
    </div>
  )
}

function Fact({ icon, value, label, accent }: { icon: ReactNode; value: string; label: string; accent?: boolean }) {
  return (
    <div className="flex min-w-0 items-start gap-2">
      <span className="mt-0.5 shrink-0 text-muted-foreground">{icon}</span>
      <div className="min-w-0">
        <p className={cn('truncate text-[15px] font-semibold tabular-nums', accent ? 'text-success' : 'text-foreground')}>{value}</p>
        <p className="truncate text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}

function collegeFacts(college: CollegeListItem) {
  const rank = college.ranking
  return [
    college.fees ? { key: 'fees', icon: <IndianRupee className="size-4" aria-hidden="true" />, value: college.fees.replace(' Lakh', ' L'), label: 'Tuition per year' } : null,
    college.packageValue ? { key: 'package', icon: <Briefcase className="size-4" aria-hidden="true" />, value: college.packageValue, label: college.packageLabel || 'Median package' } : null,
    rank ? { key: 'rank', icon: <Trophy className="size-4" aria-hidden="true" />, value: `#${rank.rank} ${rank.source}`, label: `${rank.category || 'Overall'} ${rank.year}`, accent: true } : null,
    college.exams.length ? { key: 'exams', icon: <FileText className="size-4" aria-hidden="true" />, value: examSummary(college.exams), label: 'Exams accepted' } : null,
  ].filter((fact): fact is NonNullable<typeof fact> => Boolean(fact))
}

function quickLinks(college: CollegeListItem) {
  const base = `/college/${college.slug}`
  return [
    college.popularCourse ? { label: 'Courses & fees', href: `${base}/courses` } : null,
    college.packageValue ? { label: 'Placements', href: `${base}/placement` } : null,
    college.ranking ? { label: 'Rankings', href: `${base}/rankings` } : null,
    { label: 'Overview', href: base },
  ].filter((link): link is NonNullable<typeof link> => Boolean(link))
}

export function CollegeCard({
  college,
  variant = 'listing',
  compared,
  onToggleCompare,
  className,
}: {
  college: CollegeListItem
  variant?: 'listing' | 'rail'
  compared?: boolean
  onToggleCompare?: (id: string) => void
  className?: string
}) {
  const href = `/college/${college.slug}`
  const place = [college.city, college.state && college.state !== college.city ? college.state : ''].filter(Boolean).join(', ')
  const facts = collegeFacts(college)

  if (variant === 'rail') {
    return (
      <article className={cn('group relative flex w-[17.5rem] shrink-0 snap-start flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-[0_12px_28px_rgba(15,23,42,0.1)] lg:w-[calc((100%-2.25rem)/4)]', className)}>
        <Crest college={college} size="band" />
        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-[15px] leading-snug font-semibold text-foreground">
            <Link href={href} className="line-clamp-2 outline-none after:absolute after:inset-0 group-hover:text-primary focus-visible:underline">
              {college.name}
            </Link>
          </h3>
          <p className="mt-1 flex items-center gap-1 truncate text-[13px] text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            {[college.city, college.type].filter(Boolean).join(' · ')}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 border-t pt-3.5">
            {facts
              .filter((fact) => fact.key !== 'rank')
              .slice(0, 2)
              .map((fact) => (
                <Fact key={fact.key} icon={fact.icon} value={fact.value} label={fact.label} />
              ))}
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className={cn('relative overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)]', className)}>
      <div className="flex items-start justify-between gap-3 px-4 pt-4 sm:px-5">
        <h3 className="min-w-0 font-heading text-[17px] leading-snug font-bold text-foreground sm:text-lg">
          <Link href={href} className="outline-none hover:text-primary focus-visible:underline">
            {college.name}
          </Link>
        </h3>
        <SaveButton college={college} />
      </div>

      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-3.5 px-4 pt-3 pb-4 sm:px-5">
        <Crest college={college} size="lg" />
        <div className="min-w-0 self-center sm:self-start">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted-foreground">
            {place ? (
              <span className="flex items-center gap-1">
                <MapPin className="size-3.5" aria-hidden="true" />
                {place}
              </span>
            ) : null}
            {college.type ? (
              <span className="flex items-center gap-1">
                <Landmark className="size-3.5" aria-hidden="true" />
                {college.type}
              </span>
            ) : null}
            {college.approval ? (
              <span className="flex items-center gap-1">
                <BadgeCheck className="size-3.5" aria-hidden="true" />
                {college.approval.replace(' Approved', '')}
              </span>
            ) : null}
            {college.sponsored ? <SponsoredBadge /> : null}
          </p>
        </div>
        <div className="col-span-2 min-w-0 sm:col-span-1 sm:col-start-2">
          {facts.length ? (
            <div className="grid grid-cols-2 gap-x-5 gap-y-3 lg:grid-cols-4">
              {facts.map((fact) => (
                <Fact key={fact.key} icon={fact.icon} value={fact.value} label={fact.label} accent={fact.accent} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{college.instituteStatus || 'Profile from official records'}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t bg-muted/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <nav aria-label={`${college.name} sections`} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]">
          {quickLinks(college).map((link, index) => (
            <span key={link.href} className="flex items-center gap-3">
              {index ? <span className="size-1 rounded-full bg-muted-foreground/40" aria-hidden="true" /> : null}
              <Link href={link.href} className="font-medium text-primary hover:underline">
                {link.label}
              </Link>
            </span>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {onToggleCompare ? (
            <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
              <Checkbox checked={Boolean(compared)} onCheckedChange={() => onToggleCompare(college.id)} aria-label={`Compare ${college.name}`} />
              Compare
            </label>
          ) : null}
          <Button variant="cta" size="sm" className="ml-auto px-5 sm:ml-0" nativeButton={false} render={<Link href={href} />}>
            View college
          </Button>
        </div>
      </div>
    </article>
  )
}
