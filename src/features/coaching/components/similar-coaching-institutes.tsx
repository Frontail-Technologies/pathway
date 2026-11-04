import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DetailSectionHeader } from '@/components/shared/detail-section-header'
import { HorizontalContentRail } from '@/components/shared/horizontal-content-rail'
import type { CoachingDetail, CoachingListItem } from '../api/coaching-api'
import { getCoachingVisual } from '../data/visuals'

type SimilarCoachingInstitutesProps = {
  provider: CoachingDetail
   
  compact?: boolean
}






 
export function SimilarCoachingInstitutes({ provider, compact = false }: SimilarCoachingInstitutesProps) {
  const similar = provider.similar
  if (similar.length === 0) return null

  if (compact) {
    return (
      <div className="rounded-[10px] border bg-card p-4">
        <p className="text-sm font-semibold text-foreground">Similar Coaching Institutes</p>
        <div className="mt-3 flex flex-col gap-3">
          {similar.map((item) => (
            <CompactSimilarRow key={item.slug} item={item} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className="border-b py-8 lg:py-12">
      <DetailSectionHeader title="Similar Coaching Institutes" />

      <div className="mt-4 hidden grid-cols-1 gap-3 sm:grid sm:grid-cols-3">
        {similar.map((item) => (
          <SimilarCard key={item.slug} item={item} />
        ))}
      </div>

      <HorizontalContentRail ariaLabel="Similar coaching institutes" edgeBleed className="mt-4 sm:hidden">
        {similar.map((item) => (
          <div key={item.slug} className="w-[72vw] shrink-0 snap-start">
            <SimilarCard item={item} />
          </div>
        ))}
      </HorizontalContentRail>
    </section>
  )
}

function CompactSimilarRow({ item }: { item: CoachingListItem }) {
  const visual = getCoachingVisual(item)
  const href = item.hasDetailPage ? `/coaching/${item.slug}` : '/coaching'
  const tags = [...item.exams, ...item.subjects].slice(0, 2)

  return (
    <Link href={href} className="group flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
      <div className="relative size-11 shrink-0 overflow-hidden rounded-md bg-muted">
        <Image src={visual.src} alt="" fill sizes="44px" className="object-cover" style={{ objectPosition: visual.objectPosition }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold text-foreground group-hover:text-primary">{item.name}</p>
        <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{item.location}</p>
        <div className="mt-1 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span key={tag} className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
    </Link>
  )
}

function SimilarCard({ item }: { item: CoachingListItem }) {
  const visual = getCoachingVisual(item)
  const href = item.hasDetailPage ? `/coaching/${item.slug}` : '/coaching'
  const tags = [...item.exams, ...item.subjects].slice(0, 2)

  return (
    <div className="overflow-hidden rounded-[10px] border bg-card">
      <div className="relative h-24">
        <Image src={visual.src} alt="" fill sizes="(min-width: 640px) 220px, 72vw" className="object-cover" style={{ objectPosition: visual.objectPosition }} />
      </div>
      <div className="p-3">
        <p className="truncate text-sm font-semibold text-foreground">{item.name}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {item.providerType} · {item.location}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span key={tag} className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium text-foreground">
              {tag}
            </span>
          ))}
        </div>
        <Button variant="outline" className="mt-3 h-9 w-full text-sm" nativeButton={false} render={<Link href={href} />}>
          View Institute
        </Button>
      </div>
    </div>
  )
}
