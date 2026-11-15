import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SourceNote } from '@/components/shared/source-note'
import { formatLpa } from '@/features/catalog/format'
import { getCutoffs, type CutoffRow } from '@/features/cutoffs/api/cutoffs-api'
import { catalogGet } from '@/services/api/catalog'
import { shortInstituteName } from '@/features/colleges/utils'
import { DataTabs } from './data-tabs'
import { HomeSectionHeading } from './home-section-heading'

type RankingRow = { rank: number; score: number | null; institute: { slug: string; name: string; city: string | null; state: string | null; ownership: string | null }; medianPackagePaise: number | null }
type Ranking = { year: number | null; category: string; rows: RankingRow[] }

const categories = [
  { id: 'overall', label: 'Overall' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'management', label: 'Management' },
  { id: 'medical', label: 'Medical' },
  { id: 'law', label: 'Law' },
  { id: 'pharmacy', label: 'Pharmacy' },
]

const fmt = (value: number) => value.toLocaleString('en-IN')

const shortName = shortInstituteName

function RankingTable({ ranking }: { ranking: Ranking }) {
  return (
    <div>
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left text-xs text-muted-foreground">
          <tr>
            <th scope="col" className="w-16 px-4 py-2.5 font-medium sm:px-5">Rank</th>
            <th scope="col" className="px-3 py-2.5 font-medium">College</th>
            <th scope="col" className="hidden px-3 py-2.5 text-right font-medium sm:table-cell">Score</th>
            <th scope="col" className="px-4 py-2.5 text-right font-medium sm:px-5">Median package</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {ranking.rows.map((row) => (
            <tr key={`${row.rank}-${row.institute.slug}`}>
              <td className="px-4 py-3 sm:px-5">
                <span className="flex size-8 items-center justify-center rounded-lg bg-secondary text-sm font-bold text-primary tabular-nums">{row.rank}</span>
              </td>
              <td className="px-3 py-3">
                <Link href={`/college/${row.institute.slug}`} className="font-medium text-foreground hover:text-primary hover:underline">
                  {shortName(row.institute.name)}
                </Link>
                <span className="block text-xs text-muted-foreground">{[row.institute.city, row.institute.ownership].filter(Boolean).join(' · ')}</span>
              </td>
              <td className="hidden px-3 py-3 text-right text-muted-foreground tabular-nums sm:table-cell">{row.score != null ? row.score.toFixed(2) : '—'}</td>
              <td className="px-4 py-3 text-right font-semibold text-foreground tabular-nums sm:px-5">{row.medianPackagePaise ? formatLpa(row.medianPackagePaise) : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function bestPerInstitute(rows: CutoffRow[], limit: number) {
  const seen = new Set<string>()
  return rows.filter((row) => (seen.has(row.institute.slug) ? false : (seen.add(row.institute.slug), true))).slice(0, limit)
}

function CutoffTable({ rows }: { rows: CutoffRow[] }) {
  return (
    <table className="w-full text-sm">
      <thead className="bg-muted/50 text-left text-xs text-muted-foreground">
        <tr>
          <th scope="col" className="px-4 py-2.5 font-medium sm:px-5">Institute</th>
          <th scope="col" className="px-4 py-2.5 text-right font-medium sm:px-5">Closing rank</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {rows.map((row) => (
          <tr key={row.institute.slug}>
            <td className="px-4 py-3 sm:px-5">
              <Link href={`/college/${row.institute.slug}/cutoffs`} className="font-medium text-foreground hover:text-primary hover:underline">
                {shortName(row.institute.name)}
              </Link>
            </td>
            <td className="px-4 py-3 text-right font-semibold text-foreground tabular-nums sm:px-5">{fmt(row.closingRank)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const cse = 'Computer Science and Engineering'

export async function RankingsTablesSection() {
  const [rankings, iits, nits] = await Promise.all([
    Promise.all(categories.map((category) => catalogGet<Ranking>('/rankings/nirf', { category: category.id, limit: '10' }).catch(() => null))),
    getCutoffs({ exam: 'jee-advanced', institute: '', q: cse, category: 'OPEN', quota: 'AI', gender: 'neutral', pwd: false, page: 1 }),
    getCutoffs({ exam: 'jee-main', institute: '', q: cse, category: 'OPEN', quota: 'OS', gender: 'neutral', pwd: false, page: 1 }),
  ])
  const rankingTabs = categories.flatMap((category, index) => {
    const ranking = rankings[index]
    return ranking?.rows.length ? [{ id: category.id, label: category.label, content: <RankingTable ranking={ranking} /> }] : []
  })
  const cutoffTabs = [
    iits?.rows.length ? { id: 'iits', label: 'IITs', content: <CutoffTable rows={bestPerInstitute(iits.rows, 8)} /> } : null,
    nits?.rows.length ? { id: 'nits', label: 'NITs and IIITs', content: <CutoffTable rows={bestPerInstitute(nits.rows, 8)} /> } : null,
  ].filter((tab): tab is NonNullable<typeof tab> => Boolean(tab))
  if (!rankingTabs.length && !cutoffTabs.length) return null
  const year = rankings.find((ranking) => ranking?.year)?.year
  const cutoffYear = iits?.year ?? nits?.year

  return (
    <section aria-labelledby="rankings-tables-title" className="border-b bg-background py-10 sm:py-12 lg:py-16">
      <div className="container-shell">
        <span id="rankings-tables-title" className="sr-only">
          Rankings and cutoffs
        </span>
        <HomeSectionHeading eyebrow="Rankings" title="Rankings and cutoffs" subtitle="Official NIRF ranks and JoSAA closing ranks, side by side" href="/colleges?sort=ranking" linkLabel="All ranked colleges" />
        <div className="mt-6 grid gap-4 lg:grid-cols-5">
          {rankingTabs.length ? (
            <article className="overflow-hidden rounded-xl border bg-card lg:col-span-3">
              <header className="flex items-baseline justify-between gap-3 px-4 pt-4 sm:px-5">
                <h3 className="font-heading text-lg font-bold text-foreground">NIRF {year ?? ''} rankings</h3>
              </header>
              <DataTabs label="nirf" tabs={rankingTabs} />
              <div className="border-t px-4 py-3 sm:px-5">
                <SourceNote source="NIRF" year={year ?? undefined} href="https://www.nirfindia.org" />
              </div>
            </article>
          ) : null}
          {cutoffTabs.length ? (
            <article className="overflow-hidden rounded-xl border bg-card lg:col-span-2">
              <header className="px-4 pt-4 sm:px-5">
                <h3 className="font-heading text-lg font-bold text-foreground">Computer Science closing ranks</h3>
                <p className="mt-0.5 text-[13px] text-muted-foreground">JoSAA {cutoffYear}, general category, gender-neutral</p>
              </header>
              <DataTabs label="cse" tabs={cutoffTabs} />
              <Link href="/cutoffs?exam=jee-main&q=Computer%20Science" className="flex items-center justify-center gap-1 border-t px-4 py-3 text-sm font-semibold text-primary hover:bg-muted/40">
                Explore all cutoffs
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  )
}
