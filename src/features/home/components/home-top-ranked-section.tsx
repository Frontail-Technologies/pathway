import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SpotArt, type SpotArtName } from '@/components/shared/spot-art'
import { getCollegeFacets } from '@/features/colleges/api/colleges-api'
import { HomeSectionHeading } from './home-section-heading'

type Tile = { label: string; count: number; href: string; art: SpotArtName }

export async function HomeTopRankedSection() {
  const facets = await getCollegeFacets()
  const byCourse: Tile[] = facets.courses
    .filter((option) => option.count >= 10)
    .slice(0, 5)
    .map((option) => ({ label: `Top ${option.label} colleges in India`, count: option.count, href: `/colleges?courses=${option.slug}&sort=ranking`, art: 'trophy' }))
  const byState: Tile[] = facets.states.slice(0, 4).map((option) => ({ label: `Top colleges in ${option.label}`, count: option.count, href: `/colleges?states=${option.slug}&sort=ranking`, art: 'state' }))
  const byCity: Tile[] = facets.cities
    .filter((option) => !/suburban|rural/i.test(option.slug))
    .slice(0, 3)
    .map((option) => ({ label: `Top colleges in ${option.label}`, count: option.count, href: `/colleges?cities=${option.slug}&sort=ranking`, art: 'city' }))
  const tiles = [...byCourse, ...byState, ...byCity]
  if (!tiles.length) return null

  return (
    <section aria-labelledby="home-top-ranked-title" className="bg-muted/60 py-10 sm:py-12 lg:py-16">
      <div className="container-shell">
        <span id="home-top-ranked-title" className="sr-only">
          Top ranked colleges
        </span>
        <HomeSectionHeading eyebrow="Rankings" title="Top ranked colleges" subtitle="Ranked lists by course, state and city" href="/colleges?sort=ranking" linkLabel="All colleges" />
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tiles.map((tile) => (
            <li key={tile.href}>
              <Link href={tile.href} className="group flex h-full items-center gap-3 rounded-xl border bg-card p-4 outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40">
                <SpotArt name={tile.art} className="size-12" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-foreground group-hover:text-primary">{tile.label}</span>
                  <span className="block text-xs text-muted-foreground">{tile.count.toLocaleString('en-IN')} colleges</span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
