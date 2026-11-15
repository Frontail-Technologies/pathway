import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SpotArt, type SpotArtName } from '@/components/shared/spot-art'
import { catalogGet } from '@/services/api/catalog'
import { getComparableColleges } from '@/features/compare/api/compare-api'
import { PopularComparisonCard } from '@/features/compare/components/popular-comparison-card'
import { getCollegeFacets, listColleges } from '../api/colleges-api'
import type { CollegeDetailData } from '../data/college-detail'

type RankingRow = { rank: number; institute: { slug: string } }

const categorySlug: Record<string, string> = { Overall: 'overall', Engineering: 'engineering', Management: 'management', Medical: 'medical', Law: 'law', Pharmacy: 'pharmacy', University: 'university', College: 'college', Dental: 'dental', Architecture: 'architecture', Research: 'research', Agriculture: 'agriculture' }

async function rivals(college: CollegeDetailData, stateSlug?: string): Promise<string[]> {
  const rank = college.highlights?.rank
  const category = rank ? categorySlug[rank.category] ?? rank.category.toLowerCase() : null
  if (rank?.rank != null && category) {
    const ranking = await catalogGet<{ rows: RankingRow[] }>('/rankings/nirf', { category, limit: '100' }).catch(() => null)
    const nearest = (ranking?.rows ?? [])
      .filter((row) => row.institute.slug !== college.slug)
      .sort((a, b) => Math.abs(a.rank - rank.rank!) - Math.abs(b.rank - rank.rank!) || a.rank - b.rank)
      .slice(0, 3)
      .map((row) => row.institute.slug)
    if (nearest.length >= 2) return nearest
  }
  if (!stateSlug) return []
  const list = await listColleges({ states: stateSlug, sort: 'ranking', limit: '4' }).catch(() => null)
  return (list?.items ?? []).map((item) => item.slug).filter((slug) => slug !== college.slug).slice(0, 3)
}

export async function CollegeRecommendations({ college }: { college: CollegeDetailData }) {
  const facets = await getCollegeFacets()
  const state = facets.states.find((option) => option.label === college.state)
  const city = facets.cities.find((option) => option.label === college.city)
  const degrees = new Set(college.courses.map((course) => course.name.split(' ')[0]))
  const others = await rivals(college, state?.slug)
  const entries = others.length ? await getComparableColleges([college.slug, ...others]).catch(() => new Map()) : new Map()
  const self = entries.get(college.slug)
  const pairs = self ? others.filter((slug) => entries.has(slug)).map((slug) => entries.get(slug)!) : []

  const tiles = ([
    city ? { label: `Top colleges in ${college.city}`, href: `/colleges?cities=${city.slug}&sort=ranking`, art: 'city' } : null,
    state ? { label: `Top colleges in ${college.state}`, href: `/colleges?states=${state.slug}&sort=ranking`, art: 'state' } : null,
    state && degrees.has('B.Tech') ? { label: `Top engineering colleges in ${college.state}`, href: `/colleges?states=${state.slug}&courses=btech,be&sort=ranking`, art: 'college' } : null,
    degrees.has('MBA') ? { label: 'Top MBA colleges in India', href: '/colleges?courses=mba&sort=ranking', art: 'chart' } : null,
    { label: `Top ${college.type.toLowerCase()} colleges in India`, href: `/colleges?instituteTypes=${college.type.toLowerCase()}&sort=ranking`, art: 'college' },
    { label: 'Top colleges in India', href: '/colleges?sort=ranking', art: 'trophy' },
  ] as ({ label: string; href: string; art: SpotArtName } | null)[])
    .filter((tile): tile is { label: string; href: string; art: SpotArtName } => Boolean(tile))
    .slice(0, 6)

  return (
    <>
      {pairs.length ? (
        <section id="compare" className="scroll-mt-section rounded-xl border bg-card p-4 sm:p-6">
          <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">Compare {college.name} with</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {pairs.map((other) => (
              <PopularComparisonCard key={other.college.slug} collegeA={self} collegeB={other} />
            ))}
          </div>
        </section>
      ) : null}

      <section id="top-ranked" className="scroll-mt-section rounded-xl border bg-card p-4 sm:p-6">
        <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">Top ranked colleges</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {tiles.map((tile) => (
            <li key={tile.href}>
              <Link href={tile.href} className="group flex h-full items-center gap-3 rounded-xl border p-4 outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40">
                <SpotArt name={tile.art} className="size-12" />
                <span className="min-w-0 flex-1 text-sm font-semibold text-foreground group-hover:text-primary">{tile.label}</span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
