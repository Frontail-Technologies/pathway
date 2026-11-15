import Link from 'next/link'
import { ChevronRight, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { GlobalSearch } from '@/components/shared/global-search'
import { collegeInitials } from '@/features/colleges/utils'
import { getCatalogTotals, getPopularSearches, getTopRanked } from '../api/home-data'
import { PopularSearchChips } from './popular-searches'

const stat = (value: number) => (value >= 1000 ? `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k+` : value.toLocaleString('en-IN'))

export async function HeroSection() {
  const [totals, topRanked, popular] = await Promise.all([getCatalogTotals(), getTopRanked(5), getPopularSearches(8)])
  const stats = [
    { label: 'Colleges', value: totals.colleges, href: '/colleges' },
    { label: 'Courses', value: totals.courses, href: '/courses' },
    { label: 'Entrance exams', value: totals.exams, href: '/exams' },
    { label: 'Scholarships', value: totals.scholarships, href: '/scholarships' },
  ].filter((item) => item.value > 0)
  const year = topRanked[0]?.ranking?.year

  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <Container className="relative grid gap-8 pt-9 pb-28 sm:pt-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start lg:gap-14 lg:pt-16 lg:pb-36">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[13px] font-medium text-white/90">
            <ShieldCheck className="size-4" aria-hidden="true" />
            Data from NIRF, JoSAA, NTA and NSP
          </p>
          <h1 className="mt-4 font-heading text-[32px] leading-[1.1] font-extrabold tracking-tight sm:text-[48px]">
            Find the right college,
            <br className="hidden sm:block" /> course and exam
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-7 text-white/80 sm:text-[17px]">Rankings, fees, cutoffs and placements from official sources, compared in one place. Free.</p>
          <div className="mt-6 max-w-160">
            <GlobalSearch quiet />
          </div>
          <div className="mt-4">
            <PopularSearchChips terms={popular} tone="dark" />
          </div>

          {stats.length ? (
            <dl className="mt-8 grid max-w-160 grid-cols-2 gap-y-5 sm:grid-cols-4">
              {stats.map((item, index) => (
                <div key={item.label} className={index ? 'sm:border-l sm:border-white/15 sm:pl-5' : ''}>
                  <dd className="font-heading text-[30px] leading-9 font-semibold tabular-nums">
                    <Link href={item.href} className="hover:underline underline-offset-4">
                      {stat(item.value)}
                    </Link>
                  </dd>
                  <dt className="text-[13px] text-white/70">{item.label}</dt>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        {topRanked.length >= 3 ? (
          <aside aria-labelledby="hero-top-ranked" className="hidden rounded-2xl bg-card p-5 text-foreground shadow-[0_8px_24px_rgba(15,23,42,0.18)] lg:block">
            <div className="flex items-baseline justify-between gap-3">
              <h2 id="hero-top-ranked" className="font-heading text-base font-bold">
                Top ranked in India
              </h2>
              <span className="text-xs font-medium text-muted-foreground">NIRF {year}</span>
            </div>
            <ol className="mt-3 divide-y">
              {topRanked.map((college) => (
                <li key={college.slug}>
                  <Link href={`/college/${college.slug}`} className="group flex items-center gap-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
                    <span className="w-8 shrink-0 font-heading text-xl font-bold text-primary tabular-nums">{college.ranking?.rank}</span>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-[11px] font-extrabold text-primary" aria-hidden="true">
                      {collegeInitials(college.name)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold group-hover:text-primary">{college.name}</span>
                      <span className="block truncate text-xs text-muted-foreground">{[college.city, college.packageValue ? `${college.packageValue} median` : ''].filter(Boolean).join(' · ')}</span>
                    </span>
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ol>
            <Link href="/colleges?sort=ranking" className="mt-3 flex h-10 items-center justify-center gap-1 rounded-lg bg-secondary text-sm font-semibold text-secondary-foreground hover:bg-secondary/70">
              See full NIRF ranking
              <ChevronRight className="size-4" aria-hidden="true" />
            </Link>
          </aside>
        ) : null}
      </Container>
    </section>
  )
}
