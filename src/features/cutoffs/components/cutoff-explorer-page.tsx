import Link from 'next/link'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { Illustration } from '@/components/shared/illustration'
import { SourceNote } from '@/components/shared/source-note'
import { Button } from '@/components/ui/button'
import { cutoffSearch, getCutoffs, PAGE_SIZE, type CutoffFilters as Filters } from '../api/cutoffs-api'
import { CutoffFilters } from './cutoff-filters'

const quotaLabel: Record<string, string> = { AI: 'All India', HS: 'Home state', OS: 'Other state', JK: 'J&K', LA: 'Ladakh', GO: 'Goa' }
const fmt = (value: number) => value.toLocaleString('en-IN')
const branch = (program: string) => program.replace(/\s*\(.*\)\s*$/, '')
const programNote = (program: string) => program.match(/\(([^)]*)\)\s*$/)?.[1] ?? ''

export async function CutoffExplorerPage({ filters }: { filters: Filters }) {
  const result = await getCutoffs(filters)
  const pages = result ? Math.max(1, Math.ceil(result.total / PAGE_SIZE)) : 1
  const first = (filters.page - 1) * PAGE_SIZE + 1

  return (
    <div className="bg-muted/50 pb-10">
      <div className="border-b bg-card">
        <div className="container-shell px-4 pt-5 pb-6 lg:pt-6">
          <Breadcrumbs items={['Home', { label: 'Exams', href: '/exams' }, 'JoSAA cutoffs']} />
          <h1 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">JoSAA cutoff explorer</h1>
          <p className="mt-2 max-w-3xl text-[15px] leading-7 text-muted-foreground">
            Opening and closing ranks for every branch, category and quota at IITs, NITs, IIITs and GFTIs{result ? `, from JoSAA ${result.year} round ${result.round}` : ''}.
          </p>
        </div>
      </div>

      <div className="container-shell flex flex-col gap-4 px-4 pt-5 lg:pt-6">
        <CutoffFilters key={cutoffSearch(filters)} initial={filters} institutes={result?.institutes ?? []} />

        {!result ? (
          <section className="flex flex-col items-center rounded-xl border bg-card px-6 py-10 text-center">
            <Illustration name="loadError" width={180} />
            <p className="mt-2 font-semibold text-foreground">Cutoffs could not be loaded right now.</p>
          </section>
        ) : result.rows.length === 0 ? (
          <section className="flex flex-col items-center rounded-xl border bg-card px-6 py-10 text-center">
            <Illustration name="noResults" width={180} />
            <p className="mt-2 font-semibold text-foreground">No seats match these filters.</p>
            <p className="mt-1 text-sm text-muted-foreground">Try another branch, category or quota.</p>
          </section>
        ) : (
          <section className="overflow-hidden rounded-xl border bg-card">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b px-4 py-3 sm:px-5">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{fmt(first)}–{fmt(first + result.rows.length - 1)}</span> of <span className="font-semibold text-foreground">{fmt(result.total)}</span> seats, lowest closing rank first
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[46rem] text-sm">
                <thead className="bg-muted/50 text-left text-xs text-muted-foreground">
                  <tr>
                    <th scope="col" className="px-4 py-2.5 font-medium sm:px-5">Institute</th>
                    <th scope="col" className="px-3 py-2.5 font-medium">Branch</th>
                    <th scope="col" className="px-3 py-2.5 font-medium">Quota</th>
                    <th scope="col" className="px-3 py-2.5 text-right font-medium">Opening</th>
                    <th scope="col" className="px-4 py-2.5 text-right font-medium sm:px-5">Closing</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {result.rows.map((row) => (
                    <tr key={`${row.institute.slug}-${row.program}-${row.quota}-${row.gender}`} className="align-top">
                      <td className="px-4 py-3 sm:px-5">
                        <Link href={`/college/${row.institute.slug}/cutoffs`} className="font-medium text-foreground hover:text-primary hover:underline">
                          {row.institute.name}
                        </Link>
                        {row.institute.state ? <span className="block text-xs text-muted-foreground">{row.institute.state}</span> : null}
                      </td>
                      <td className="px-3 py-3">
                        <span className="text-foreground">{branch(row.program)}</span>
                        {programNote(row.program) ? <span className="block text-xs text-muted-foreground">{programNote(row.program)}</span> : null}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">{quotaLabel[row.quota] ?? row.quota}</td>
                      <td className="px-3 py-3 text-right text-muted-foreground tabular-nums">{fmt(row.openingRank)}</td>
                      <td className="px-4 py-3 text-right font-semibold text-foreground tabular-nums sm:px-5">{fmt(row.closingRank)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {pages > 1 ? (
              <nav aria-label="Pages" className="flex items-center justify-between gap-3 border-t px-4 py-3 sm:px-5">
                {filters.page > 1 ? (
                  <Button variant="outline" nativeButton={false} render={<Link href={`/cutoffs?${cutoffSearch({ ...filters, page: filters.page - 1 })}`} />}>
                    Previous
                  </Button>
                ) : (
                  <span />
                )}
                <span className="text-sm text-muted-foreground">
                  Page {filters.page} of {pages}
                </span>
                {filters.page < pages ? (
                  <Button variant="outline" nativeButton={false} render={<Link href={`/cutoffs?${cutoffSearch({ ...filters, page: filters.page + 1 })}`} />}>
                    Next
                  </Button>
                ) : (
                  <span />
                )}
              </nav>
            ) : null}
          </section>
        )}

        {result ? <SourceNote source="JoSAA" year={result.year} href="https://josaa.nic.in" note={`Round ${result.round} opening and closing ranks`} /> : null}

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { href: `/college-predictor?exam=${filters.exam}`, title: 'Have your rank?', text: 'See every college and branch within reach in one list.' },
            { href: '/rank-predictor', title: 'Only have your percentile?', text: 'Estimate your rank first, then check cutoffs.' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="group rounded-xl border bg-card p-4 outline-none hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40">
              <span className="block text-sm font-semibold text-foreground group-hover:text-primary">{item.title}</span>
              <span className="mt-0.5 block text-[13px] text-muted-foreground">{item.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
