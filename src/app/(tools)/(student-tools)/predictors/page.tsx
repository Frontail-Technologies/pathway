import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Band, MarketingHero } from '@/components/shared/landing'
import { HeroScene } from '@/components/shared/landing-art'
import { ToolArt, type ToolArtName } from '@/components/shared/tool-art'
import { getCutoffs, type CutoffFilters } from '@/features/cutoffs/api/cutoffs-api'

const base: CutoffFilters = { exam: 'jee-main', institute: '', q: '', category: 'OPEN', quota: '', gender: 'neutral', pwd: false, page: 1 }

export const metadata: Metadata = {
  title: 'College and Rank Predictors',
  description: 'Free college predictors for JEE Main and JEE Advanced, rank predictors for JEE Main and NEET UG, and JoSAA cutoffs, built on official data.',
  alternates: { canonical: '/predictors' },
}

type Tile = { exam: string; title: string; text: string; href: string; source: string }

const groups: { title: string; subtitle: string; art: ToolArtName; tiles: Tile[] }[] = [
  {
    title: 'College predictors',
    subtitle: 'Colleges and branches within reach of your rank',
    art: 'collegePredictor',
    tiles: [
      { exam: 'JEE Main', title: 'JEE Main college predictor', text: 'NITs, IIITs and GFTIs by branch, category and home-state quota', href: '/college-predictor?exam=jee-main', source: 'JoSAA 2025 closing ranks' },
      { exam: 'JEE Adv', title: 'JEE Advanced college predictor', text: 'IIT branches by category, gender and PwD', href: '/college-predictor?exam=jee-advanced', source: 'JoSAA 2025 closing ranks' },
      { exam: 'All', title: 'College predictor by exam', text: 'Engineering and medical entrance exams, national and state', href: '/college-predictor', source: 'Official counselling closing ranks' },
    ],
  },
  {
    title: 'Rank predictors',
    subtitle: 'Turn your percentile into an estimated rank',
    art: 'rankPredictor',
    tiles: [
      { exam: 'JEE Main', title: 'JEE Main rank predictor', text: 'Percentile to common rank list (CRL)', href: '/rank-predictor?exam=jee-main', source: '14,75,103 candidates, NTA 2025' },
      { exam: 'NEET', title: 'NEET UG rank predictor', text: 'Percentile to all India rank (AIR)', href: '/rank-predictor?exam=neet-ug', source: '22,09,318 candidates, NTA 2025' },
    ],
  },
  {
    title: 'Cutoffs and planning',
    subtitle: 'Check last year’s numbers and the dates ahead',
    art: 'cutoffs',
    tiles: [
      { exam: 'JoSAA', title: 'JoSAA cutoff explorer', text: 'Opening and closing ranks for every branch and quota', href: '/cutoffs', source: 'JoSAA 2025, round 6' },
      { exam: 'Dates', title: 'Exam calendar', text: 'Application, exam and result dates', href: '/exam-calendar', source: 'Official notices' },
    ],
  },
]

export default async function PredictorsPage() {
  const [main, advanced] = await Promise.all([getCutoffs({ ...base, exam: 'jee-main' }), getCutoffs({ ...base, exam: 'jee-advanced' })])
  const institutes = (main?.institutes.length ?? 0) + (advanced?.institutes.length ?? 0)
  return (
    <>
      <MarketingHero
        trail={['Home', { label: 'Exams', href: '/exams' }, 'Predictors']}
        title="College and rank predictors"
        description="Free tools built on official JoSAA closing ranks and NTA candidate counts. No sign-up needed."
        stats={[
          { label: 'Predictors', value: String(groups[0]!.tiles.length + groups[1]!.tiles.length) },
          ...(institutes ? [{ label: 'JoSAA institutes covered', value: String(institutes) }] : []),
        ]}
        aside={<HeroScene name="careers" className="hidden lg:block" />}
      />
      {groups.map((group, index) => (
        <Band key={group.title} title={group.title} subtitle={group.subtitle} tone={index % 2 ? 'muted' : 'white'}>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.tiles.map((tile) => (
              <li key={tile.href}>
                <Link href={tile.href} className="group flex h-full flex-col rounded-xl border bg-card p-5 outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40">
                  <div className="flex items-center gap-3">
                    <ToolArt name={group.art} className="size-14" />
                    <span className="flex h-8 items-center rounded-md bg-primary px-2.5 text-xs font-bold text-primary-foreground">{tile.exam}</span>
                  </div>
                  <span className="mt-4 text-base font-semibold text-foreground group-hover:text-primary">{tile.title}</span>
                  <span className="mt-1 text-sm leading-6 text-muted-foreground">{tile.text}</span>
                  <span className="mt-auto flex items-center justify-between gap-2 pt-4 text-[13px] text-muted-foreground">
                    {tile.source}
                    <ArrowRight className="size-4 shrink-0 group-hover:text-primary" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Band>
      ))}
    </>
  )
}
