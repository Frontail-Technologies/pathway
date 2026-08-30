'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Bookmark, Landmark, MapPin } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Rating } from '@/components/shared/rating'
import { VerifiedBadge } from '@/components/shared/verified-badge'
import { SponsoredBadge } from '@/components/shared/sponsored-badge'
import type { CollegeListItem } from '../data/colleges'

type CollegeResultCardProps = {
  college: CollegeListItem
  compared: boolean
  onToggleCompare: (id: string) => void
}

export function CollegeResultCard({ college, compared, onToggleCompare }: CollegeResultCardProps) {
  const [saved, setSaved] = useState(false)

  const toggleSaved = () => {
    const next = !saved
    setSaved(next)
    toast.success(next ? 'College saved to your list.' : 'College removed from saved items.')
  }

  const nameLink = (
    <Link href={`/college/${college.slug}`} className="cursor-pointer text-base font-bold text-foreground outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40">
      {college.name}
    </Link>
  )

  const badges = (college.verified || college.sponsored) && (
    <div className="flex flex-wrap items-center gap-1.5">
      {college.verified && <VerifiedBadge />}
      {college.sponsored && <SponsoredBadge />}
    </div>
  )

  const location = (
    <p className="flex items-center gap-1 text-xs text-muted-foreground">
      <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
      {college.city}, {college.state}
    </p>
  )

  const typeLine = <p className="text-xs text-muted-foreground">{college.type} · {college.approval}</p>

  const saveButton = (
    <button
      type="button"
      aria-label={saved ? 'Remove from saved colleges' : 'Save college'}
      aria-pressed={saved}
      onClick={toggleSaved}
      className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <Bookmark className={saved ? 'size-4 fill-primary text-primary' : 'size-4 text-muted-foreground'} aria-hidden="true" />
    </button>
  )

  return (
    <article className="rounded-[10px] border bg-card p-4 transition-colors hover:border-primary/30 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary sm:size-12">
          <Landmark className="size-5 sm:size-6" aria-hidden="true" />
        </div>

        {/* Mobile identity layout: name+rating+save share a stable top row so the bookmark never shifts with badge/location line count. */}
        <div className="min-w-0 flex-1 sm:hidden">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">{nameLink}</div>
            <div className="flex shrink-0 items-center gap-1.5">
              <Rating value={college.rating} />
              {saveButton}
            </div>
          </div>
          {badges && <div className="mt-1">{badges}</div>}
          <div className="mt-1">{location}</div>
          <div className="mt-0.5">{typeLine}</div>
        </div>

        {/* Desktop identity layout: unchanged from the approved arrangement — name/badges left, rating+save stacked right. */}
        <div className="hidden min-w-0 flex-1 sm:block">
          <div className="flex flex-wrap items-center gap-2">
            {nameLink}
            {college.verified && <VerifiedBadge />}
            {college.sponsored && <SponsoredBadge />}
          </div>
          <div className="mt-1">{location}</div>
          <div className="mt-0.5">{typeLine}</div>
        </div>
        <div className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
          <Rating value={college.rating} count={college.reviewCount} />
          {saveButton}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t pt-4 sm:grid-cols-4">
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Popular Course</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground">{college.popularCourse}</p>
        </div>
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Total Fees</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground">{college.fees}</p>
        </div>
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Accepted Exam</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground">{college.exam}</p>
        </div>
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Placement</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground">{college.placement}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-muted-foreground">
          <Checkbox checked={compared} onCheckedChange={() => onToggleCompare(college.id)} aria-label={`Compare ${college.name}`} />
          Compare
        </label>
        <div className="grid grid-cols-2 gap-2 sm:flex">
          <Button variant="outline" className="h-11 px-4 text-sm sm:h-10 sm:flex-none">
            Download Brochure
          </Button>
          <Button variant="cta" className="h-11 px-4 text-sm sm:h-10 sm:flex-none">
            Enquire Now
          </Button>
        </div>
      </div>
    </article>
  )
}
