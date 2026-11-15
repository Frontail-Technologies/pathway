'use client'

import { toast } from 'sonner'
import { Bookmark, Briefcase, Building2, GraduationCap, IndianRupee, MapPin, Share2, Trophy, Users } from 'lucide-react'
import { CompareToggle } from '@/features/compare/components/compare-toggle'
import { VerifiedBadge } from '@/components/shared/verified-badge'
import { SponsoredBadge } from '@/components/shared/sponsored-badge'
import { RankChip } from '@/components/shared/rank-chip'
import { DetailIdentityHero } from '@/components/shared/detail-identity-hero'
import { DetailQuickFacts, type DetailQuickFact } from '@/components/shared/detail-quick-facts'
import { useSavedItem } from '@/features/saved/saved-items-provider'
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

  const highlights = college.highlights
  const rank = highlights?.rank
  const primary: DetailQuickFact[] = [
    { icon: Trophy, label: rank ? `${rank.source} ${rank.year}${rank.category === 'Overall' ? '' : ` · ${rank.category}`}` : 'NIRF rank', value: rank?.rank != null ? `#${rank.rank}` : '' },
    { icon: Briefcase, label: highlights?.packageLabel || 'Median package', value: highlights?.packageValue ?? '' },
    { icon: IndianRupee, label: 'Tuition per year', value: highlights?.tuition ?? '' },
    { icon: Users, label: 'Students', value: highlights?.students ? highlights.students.toLocaleString('en-IN') : '' },
  ].filter((fact) => fact.value)
  const fallback: DetailQuickFact[] = [
    { icon: MapPin, label: 'Location', value: [college.city, college.state].filter(Boolean).join(', ') },
    { icon: Building2, label: 'Ownership', value: college.type },
    { icon: GraduationCap, label: 'Programmes', value: college.courses.length ? `${college.courses.length}` : '' },
    { icon: Building2, label: 'Approved by', value: college.approval },
  ].filter((fact) => fact.value)
  const facts = [...primary, ...fallback].slice(0, 4)
  const meta = [[college.city, college.state].filter(Boolean).join(', '), college.instituteStatus, college.established ? `Estd ${college.established}` : ''].filter(Boolean).join(' · ')

  return (
    <DetailIdentityHero
      media={college.gallery.length >= 3 ? <CollegeGallery images={college.gallery} collegeName={college.name} className="" /> : undefined}
      title={college.name}
      subtitle={college.fullName !== college.name ? college.fullName : undefined}
      meta={
        <span className="flex items-center gap-1">
          <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
          {meta}
        </span>
      }
      tags={
        <>
          {rank?.rank != null ? <RankChip rank={rank.rank} source={rank.source} year={rank.year} category={rank.category === 'Overall' ? '' : rank.category} /> : null}
          {college.naacGrade ? <span className="inline-flex h-6 items-center rounded-md border px-2 text-xs font-semibold text-foreground">NAAC {college.naacGrade.replace(/^NAAC\s*/i, '')}</span> : null}
          <span className="inline-flex h-6 items-center rounded-md bg-secondary px-2 text-xs font-semibold text-secondary-foreground">{college.type}</span>
          {college.verified && <VerifiedBadge />}
          {college.sponsored && <SponsoredBadge />}
        </>
      }
      actions={
        <>
          <CompareToggle variant="button" college={{ slug: college.slug, name: college.name, shortName: college.name, location: [college.city, college.state].filter(Boolean).join(', ') }} />
          <div className="flex items-center gap-1">
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
