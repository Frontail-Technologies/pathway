'use client'

import { toast } from 'sonner'
import { Bookmark, Building2, GraduationCap, MapPin, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { VerifiedBadge } from '@/components/shared/verified-badge'
import { SponsoredBadge } from '@/components/shared/sponsored-badge'
import { DetailIdentityHero } from '@/components/shared/detail-identity-hero'
import { DetailQuickFacts, type DetailQuickFact } from '@/components/shared/detail-quick-facts'
import { useSavedItem } from '@/features/saved/saved-items-provider'
import { EnquiryDialog } from '@/features/enquiries/components/enquiry-dialog'
import type { CollegeDetailData } from '../data/college-detail'
import { CollegeGallery } from './college-gallery'

export function CollegeIdentityHeader({ college }: { college: CollegeDetailData }) {
  const { saved, toggleSaved } = useSavedItem('college', college.slug, 'College')

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
      
    }
  }

  const facts: DetailQuickFact[] = [
    { icon: MapPin, label: 'Location', value: `${college.city}, ${college.state}` },
    { icon: Building2, label: 'College Type', value: college.type },
    { icon: GraduationCap, label: 'Programmes', value: `${college.courses.length} programmes` },
    { icon: Building2, label: 'Approved By', value: college.approval },
  ]

  return (
    <DetailIdentityHero
      media={<CollegeGallery images={college.gallery} collegeName={college.name} className="" />}
      title={college.name}
      subtitle={college.fullName}
      meta={
        <span className="flex items-center gap-1">
          <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
          {college.city}, {college.state} · {college.instituteStatus}
        </span>
      }
      tags={
        <>
          {college.verified && <VerifiedBadge />}
          {college.sponsored && <SponsoredBadge />}
          <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-primary">{college.type}</span>
        </>
      }
      actions={
        <>
          <EnquiryDialog
            entityName={college.name}
            entity={{ kind: 'college', slug: college.slug }}
            interestOptions={college.courses.map((course) => course.name)}
            interestLabel="Course"
            trigger={<Button variant="cta" className="h-11 px-6 text-sm font-semibold sm:h-10">Enquire Now</Button>}
          />
          <EnquiryDialog
            intent="brochure"
            entityName={college.name}
            entity={{ kind: 'college', slug: college.slug }}
            interestOptions={college.courses.map((course) => course.name)}
            interestLabel="Course"
            trigger={<Button variant="outline" className="h-11 px-6 text-sm font-semibold sm:h-10">Download Brochure</Button>}
          />
          <div className="flex items-center gap-1 sm:ml-1">
            <button
              type="button"
              aria-label={saved ? 'Remove from saved colleges' : 'Save college'}
              aria-pressed={saved}
              onClick={toggleSaved}
              className="flex size-10 cursor-pointer items-center justify-center rounded-md outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <Bookmark className={saved ? 'size-4 fill-primary text-primary' : 'size-4 text-muted-foreground'} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Share college"
              onClick={share}
              className="flex size-10 cursor-pointer items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <Share2 className="size-4" aria-hidden="true" />
            </button>
          </div>
        </>
      }
      quickFacts={<DetailQuickFacts facts={facts} />}
    />
  )
}
