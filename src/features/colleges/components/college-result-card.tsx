'use client'

import Link from 'next/link'
import { useSavedItem } from '@/features/saved/saved-items-provider'
import { Bookmark, Landmark, MapPin } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { VerifiedBadge } from '@/components/shared/verified-badge'
import { SponsoredBadge } from '@/components/shared/sponsored-badge'
import type { CollegeListItem } from '../api/colleges-api'

type CollegeResultCardProps = {
  college: CollegeListItem
  compared: boolean
  onToggleCompare: (id: string) => void
}

const chip = 'rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-primary'
const chipMuted = 'rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground'






 
export function CollegeResultCard({ college, compared, onToggleCompare }: CollegeResultCardProps) {
  const { saved, toggleSaved } = useSavedItem('college', college.slug, 'College')
  const hasDetail = college.hasDetailPage

  return (
    <article className="flex gap-3 rounded-[12px] border bg-card p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:gap-4 sm:p-5">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary sm:size-14" aria-hidden="true">
        <Landmark className="size-5.5 sm:size-6" />
      </span>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              {hasDetail ? (
                <Link href={`/college/${college.slug}`} className="cursor-pointer text-base font-bold text-foreground outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40">
                  {college.name}
                </Link>
              ) : (
                <span className="text-base font-bold text-foreground">{college.name}</span>
              )}
              {college.verified && <VerifiedBadge />}
              {college.sponsored && <SponsoredBadge />}
            </div>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
              {college.city}, {college.state}
            </p>
          </div>
          <button
            type="button"
            aria-label={saved ? 'Remove from saved colleges' : 'Save college'}
            aria-pressed={saved}
            onClick={toggleSaved}
            className="-mt-1 -mr-1 flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <Bookmark className={saved ? 'size-4 fill-primary text-primary' : 'size-4 text-muted-foreground'} aria-hidden="true" />
          </button>
        </div>

        <p className="mt-2.5 text-sm leading-6 text-foreground">
          {college.type} institute in {college.city} offering {college.popularCourse}.
        </p>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <span className={chip}>{college.type}</span>
          <span className={chipMuted}>{college.degree}</span>
          <span className={chipMuted}>{college.exam}</span>
        </div>

        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 border-t pt-3">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
            <Checkbox checked={compared} onCheckedChange={() => onToggleCompare(college.id)} aria-label={`Compare ${college.name}`} />
            Compare
          </label>
          {hasDetail ? (
            <Button variant="outline" className="h-9 px-4 text-sm" nativeButton={false} render={<Link href={`/college/${college.slug}`} />}>
              View College
            </Button>
          ) : (
            <Button variant="outline" className="h-9 px-4 text-sm" disabled title="College profile coming soon">
              Details Soon
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
