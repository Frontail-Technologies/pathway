import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { examCatalog } from '@/features/college-predictor/data/exam-catalog'
import { HomeSectionHeading } from './home-section-heading'

const examCount = Object.values(examCatalog).flat().length

const tiles = [
  { badge: 'JEE Main', title: 'College predictor', text: 'NITs, IIITs and GFTIs for your rank', href: '/college-predictor?exam=jee-main' },
  { badge: 'JEE Adv', title: 'College predictor', text: 'IIT branches for your rank', href: '/college-predictor?exam=jee-advanced' },
  { badge: 'JEE Main', title: 'Rank predictor', text: 'Percentile to CRL rank', href: '/rank-predictor?exam=jee-main' },
  { badge: 'NEET', title: 'Rank predictor', text: 'Percentile to all India rank', href: '/rank-predictor?exam=neet-ug' },
  { badge: 'JoSAA', title: 'Cutoff explorer', text: 'Opening and closing ranks', href: '/cutoffs' },
  { badge: `${examCount} exams`, title: 'All exams', text: 'Engineering and medical exam predictors', href: '/college-predictor' },
]

export function HomePredictorsSection() {
  return (
    <section aria-labelledby="home-predictors-title" className="bg-muted/60 py-10 sm:py-12 lg:py-16">
      <div className="container-shell">
        <span id="home-predictors-title" className="sr-only">
          College and rank predictors
        </span>
        <HomeSectionHeading eyebrow="Predictors" title="College and rank predictors" subtitle="Pick your exam and see where your rank can take you" href="/predictors" linkLabel="All predictors" />
        <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {tiles.map((tile) => (
            <li key={tile.href}>
              <Link href={tile.href} className="group flex h-full flex-col items-center rounded-xl border bg-card p-4 text-center outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40">
                <span className="flex size-14 items-center justify-center rounded-xl border-2 border-primary/15 bg-secondary px-1 text-[13px] leading-tight font-extrabold text-primary">{tile.badge}</span>
                <span className="mt-3 text-sm font-semibold text-foreground group-hover:text-primary">
                  {tile.badge === 'JoSAA' || tile.href === '/college-predictor' ? tile.title : `${tile.badge} ${tile.title.toLowerCase()}`}
                </span>
                <span className="mt-1 text-xs leading-5 text-muted-foreground">{tile.text}</span>
                <span className="mt-auto pt-3">
                  <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
