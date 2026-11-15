import Link from 'next/link'
import { ArrowRight, Percent } from 'lucide-react'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { SourceNote } from '@/components/shared/source-note'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { jeeMainCandidates, rankFromPercentile, referencePercentiles } from '../data/rank'

const fmt = (value: number) => value.toLocaleString('en-IN')

export function RankPredictorPage({ percentile, invalid }: { percentile: number | null; invalid: boolean }) {
  const rank = percentile ? rankFromPercentile(percentile) : null

  return (
    <div className="bg-muted/50 pb-10">
      <div className="border-b bg-card">
        <div className="container-shell px-4 pt-5 pb-6 lg:pt-6">
          <Breadcrumbs items={['Home', { label: 'Exams', href: '/exams' }, 'Rank Predictor']} />
          <h1 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">JEE Main Rank Predictor</h1>
          <p className="mt-2 max-w-3xl text-[15px] leading-7 text-muted-foreground">
            Convert your JEE Main percentile into an estimated common rank (CRL), using NTA’s method and the {fmt(jeeMainCandidates.appeared)} candidates who appeared in {jeeMainCandidates.year}.
          </p>
        </div>
      </div>

      <div className="container-shell px-4 pt-5 lg:pt-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
          <aside className="flex flex-col gap-4 lg:sticky lg:top-header-gap lg:w-90 lg:shrink-0">
            <form action="/rank-predictor" method="get" className="flex flex-col gap-4 rounded-xl border bg-card p-4 sm:p-5">
              <input type="hidden" name="exam" value="jee-main" />
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="rank-percentile">JEE Main percentile</Label>
                <div className="relative">
                  <Percent className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="rank-percentile"
                    name="percentile"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="e.g. 98.25"
                    defaultValue={percentile ?? ''}
                    aria-invalid={invalid}
                    aria-describedby={invalid ? 'rank-percentile-error' : undefined}
                    className="pl-9"
                  />
                </div>
                {invalid ? (
                  <p id="rank-percentile-error" role="alert" className="text-xs text-destructive">
                    Enter a percentile between 0 and 100, for example 98.25.
                  </p>
                ) : null}
              </div>
              <Button type="submit" variant="cta" size="lg" className="w-full font-semibold">
                Estimate my rank
              </Button>
            </form>

            {rank ? (
              <section aria-live="polite" className="rounded-xl border bg-card p-4 sm:p-5">
                <p className="text-sm text-muted-foreground">Estimated rank for {percentile} percentile</p>
                <p className="mt-1 font-heading text-3xl font-bold text-foreground tabular-nums">{fmt(rank)}</p>
                <p className="mt-1 text-[13px] text-muted-foreground">Common rank list (CRL). Category ranks are lower and are published by NTA.</p>
                <Button variant="outline" className="mt-4 w-full gap-2 font-semibold" nativeButton={false} render={<Link href={`/college-predictor?exam=jee-main&rank=${rank}#results`} />}>
                  See colleges for this rank
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </section>
            ) : null}
          </aside>

          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <section className="rounded-xl border bg-card p-4 sm:p-6">
              <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">JEE Main percentile vs rank</h2>
              <p className="mt-1 text-sm text-muted-foreground">Estimated CRL for common percentiles, based on {fmt(jeeMainCandidates.appeared)} candidates.</p>
              <div className="mt-4 overflow-hidden rounded-lg border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-left text-xs text-muted-foreground">
                    <tr>
                      <th scope="col" className="px-4 py-2.5 font-medium">Percentile</th>
                      <th scope="col" className="px-4 py-2.5 text-right font-medium">Estimated rank</th>
                      <th scope="col" className="px-4 py-2.5 text-right font-medium">Colleges</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {referencePercentiles.map((value) => {
                      const estimate = rankFromPercentile(value)
                      const mine = percentile != null && value === referencePercentiles.find((step) => percentile >= step)
                      return (
                        <tr key={value} className={cn(mine && 'bg-secondary/60')}>
                          <td className="px-4 py-2.5 font-medium text-foreground tabular-nums">{value}</td>
                          <td className="px-4 py-2.5 text-right text-foreground tabular-nums">{fmt(estimate)}</td>
                          <td className="px-4 py-2.5 text-right">
                            <Link href={`/college-predictor?exam=jee-main&rank=${estimate}#results`} className="text-sm font-semibold text-primary hover:underline">
                              View
                            </Link>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-xl border bg-card p-4 sm:p-6">
              <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">How the estimate works</h2>
              <p className="mt-2.5 text-[15px] leading-7 text-muted-foreground">
                NTA ranks candidates by percentile. A percentile of P means (100 − P)% of candidates scored higher, so the estimated rank is (100 − P) × {fmt(jeeMainCandidates.appeared)} ÷ 100. Ties and the number of candidates in your year shift the final rank slightly, so treat it as an estimate.
              </p>
              <SourceNote className="mt-3" source={jeeMainCandidates.source} note="Unique candidates who appeared across both sessions" />
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
