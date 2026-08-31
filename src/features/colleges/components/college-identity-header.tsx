'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Bookmark, Landmark, MapPin, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Rating } from '@/components/shared/rating'
import { VerifiedBadge } from '@/components/shared/verified-badge'
import { SponsoredBadge } from '@/components/shared/sponsored-badge'
import type { CollegeDetailData } from '../data/college-detail'
import { CollegeGallery } from './college-gallery'

export function CollegeIdentityHeader({ college }: { college: CollegeDetailData }) {
  const [saved, setSaved] = useState(false)

  const toggleSaved = () => {
    const next = !saved
    setSaved(next)
    toast.success(next ? 'College saved to your list.' : 'College removed from saved items.')
  }

  const share = async () => {
    const shareData = { title: college.name, text: college.fullName, url: typeof window !== 'undefined' ? window.location.href : '' }
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share(shareData)
        return
      }
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url)
        toast.success('Link copied to clipboard.')
      }
    } catch {
      // user cancelled share sheet — no feedback needed
    }
  }

  const badges = (
    <>
      {college.verified && <VerifiedBadge />}
      {college.sponsored && <SponsoredBadge />}
    </>
  )

  const saveShareButtons = (
    <div className="flex shrink-0 items-center gap-1">
      <button
        type="button"
        aria-label={saved ? 'Remove from saved colleges' : 'Save college'}
        aria-pressed={saved}
        onClick={toggleSaved}
        className="flex size-9 cursor-pointer items-center justify-center rounded-md outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <Bookmark className={saved ? 'size-4 fill-primary text-primary' : 'size-4 text-muted-foreground'} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Share college"
        onClick={share}
        className="flex size-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <Share2 className="size-4" aria-hidden="true" />
      </button>
    </div>
  )

  return (
    <div className="border-b pb-5 sm:pb-6">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-secondary text-primary sm:size-16">
          <Landmark className="size-6 sm:size-7" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="font-heading text-xl font-bold text-foreground sm:text-3xl">{college.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-[15px]">{college.fullName}</p>
          <p className="mt-2.5 flex items-center gap-1 text-[13px] text-muted-foreground sm:text-sm">
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            {college.city}, {college.state}
          </p>
          {/* Desktop-only: badges grouped with type, then institute status/approval as its own line. */}
          <div className="mt-1.5 hidden flex-wrap items-center gap-2 sm:flex">
            {badges}
            <span className="text-[13px] text-muted-foreground sm:text-sm">{college.type}</span>
          </div>
          <p className="mt-1 hidden text-[13px] text-muted-foreground sm:block sm:text-sm">
            {college.instituteStatus} · {college.approval}
          </p>
        </div>

        <div className="hidden shrink-0 flex-col items-end gap-2 sm:flex">
          <Rating value={college.rating} count={college.reviewCount} />
          {saveShareButtons}
        </div>
      </div>

      {/* Mobile-only: Rating + Verified share one compact row right after identity, ahead of the primary actions. */}
      <div className="mt-3 flex items-center justify-between sm:hidden">
        <div className="flex items-center gap-2">
          <Rating value={college.rating} count={college.reviewCount} />
          {badges}
        </div>
        {saveShareButtons}
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row sm:items-center">
        <Button variant="cta" className="h-11 px-6 text-sm font-semibold sm:h-10">
          Enquire Now
        </Button>
        <Button variant="outline" className="h-11 px-6 text-sm font-semibold sm:h-10">
          Download Brochure
        </Button>
      </div>

      <CollegeGallery images={college.gallery} collegeName={college.name} />
    </div>
  )
}
