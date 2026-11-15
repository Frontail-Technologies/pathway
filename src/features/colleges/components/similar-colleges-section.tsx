import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { HorizontalContentRail } from '@/components/shared/horizontal-content-rail'
import { getCollegeFacets, listColleges } from '../api/colleges-api'
import type { CollegeDetailData } from '../data/college-detail'
import { CollegeCard } from './college-card'

const LIMIT = 8

async function nearby(college: CollegeDetailData) {
  const facets = await getCollegeFacets()
  const city = facets.cities.find((option) => option.label === college.city)
  const state = facets.states.find((option) => option.label === college.state)
  const scopes = [
    city ? { query: { cities: city.slug }, label: college.city, href: `/colleges?cities=${city.slug}` } : null,
    state ? { query: { states: state.slug }, label: college.state, href: `/colleges?states=${state.slug}` } : null,
  ].filter((scope): scope is NonNullable<typeof scope> => Boolean(scope))
  for (const scope of scopes) {
    const list = await listColleges({ ...scope.query, sort: 'ranking', limit: String(LIMIT + 1) }).catch(() => null)
    const items = (list?.items ?? []).filter((item) => item.slug !== college.slug).slice(0, LIMIT)
    if (items.length >= 2) return { ...scope, items, total: Math.max((list?.page.total ?? items.length) - 1, items.length) }
  }
  return null
}

export async function SimilarCollegesSection({ college }: { college: CollegeDetailData }) {
  const result = await nearby(college)
  if (!result) return null
  return (
    <section id="similar" className="scroll-mt-section rounded-xl border bg-card p-4 sm:p-6">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">More colleges in {result.label}</h2>
        <Link href={result.href} className="hidden shrink-0 items-center gap-0.5 text-sm font-semibold text-primary hover:underline sm:flex">
          View all {result.total.toLocaleString('en-IN')}
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      <HorizontalContentRail ariaLabel={`More colleges in ${result.label}`} showControls className="mt-4">
        {result.items.map((item) => (
          <CollegeCard key={item.slug} college={item} variant="rail" className="lg:w-[calc((100%-1.5rem)/3)]" />
        ))}
      </HorizontalContentRail>
      <Link href={result.href} className="mt-3 flex h-11 items-center justify-center gap-1 rounded-lg border text-sm font-semibold text-primary sm:hidden">
        View all {result.total.toLocaleString('en-IN')} colleges
        <ChevronRight className="size-4" aria-hidden="true" />
      </Link>
    </section>
  )
}
