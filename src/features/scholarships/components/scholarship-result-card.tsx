'use client'

import Link from 'next/link'
import { Bookmark, GraduationCap, MapPin, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SponsoredBadge } from '@/components/shared'
import { useSavedItem } from '@/features/saved/saved-items-provider'
import type { ScholarshipListItem } from '../api/scholarships-api'
import { DeadlineBlock, ProviderMark } from './scholarship-rail-card'

export function ScholarshipResultCard({ scholarship }: { scholarship: ScholarshipListItem }) {
  const { saved, toggleSaved } = useSavedItem('scholarship', scholarship.slug, 'Scholarship')
  const eligibility = [...scholarship.shortEligibility, scholarship.scholarshipType].filter(Boolean).join(' · ')
  const where = scholarship.states[0] ?? 'All India'

  return (
    <article className="relative flex h-full flex-col rounded-xl border bg-card p-4 transition-shadow hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)] sm:p-5">
      {scholarship.featured ? (
        <span className="absolute -top-2.5 left-4">
          <SponsoredBadge />
        </span>
      ) : null}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <ProviderMark scholarship={scholarship} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{scholarship.provider}</p>
            <p className="text-xs text-muted-foreground">{scholarship.providerType}</p>
          </div>
        </div>
        <DeadlineBlock scholarship={scholarship} />
      </div>

      <h3 className="mt-3 font-heading text-[17px] leading-snug font-bold text-foreground">
        <Link href={`/scholarship/${scholarship.slug}`} className="outline-none hover:text-primary focus-visible:underline">
          {scholarship.name}
        </Link>
      </h3>

      <div className="mt-3 flex flex-1 flex-col gap-3 rounded-lg bg-muted/50 p-3">
        <div className="flex items-start gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-card text-muted-foreground">
            <Trophy className="size-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Award</p>
            <p className="text-[15px] font-bold text-success">{scholarship.benefitLabel}</p>
          </div>
        </div>
        {eligibility ? (
          <div className="flex items-start gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-card text-muted-foreground">
              <GraduationCap className="size-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Eligibility</p>
              <p className="line-clamp-2 text-sm text-foreground">{eligibility}</p>
            </div>
          </div>
        ) : null}
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5" aria-hidden="true" />
          {where}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          aria-label={saved ? 'Remove from saved scholarships' : 'Save scholarship'}
          aria-pressed={saved}
          onClick={toggleSaved}
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <Bookmark className={saved ? 'size-4 fill-primary text-primary' : 'size-4 text-muted-foreground'} aria-hidden="true" />
        </button>
        <Button variant="outline" className="flex-1" nativeButton={false} render={<Link href={`/scholarship/${scholarship.slug}`} />}>
          View details
        </Button>
        {scholarship.officialApplyUrl && scholarship.status !== 'closed' ? (
          <Button variant="cta" className="flex-1" nativeButton={false} render={<a href={scholarship.officialApplyUrl} target="_blank" rel="noopener noreferrer" />}>
            Apply
          </Button>
        ) : null}
      </div>
    </article>
  )
}
