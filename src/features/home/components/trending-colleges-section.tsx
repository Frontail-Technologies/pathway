import Link from 'next/link'
import { ArrowRight, Landmark } from 'lucide-react'
import { SectionHeader } from '@/components/shared/section-header'
import { trendingColleges } from '../data/trending-colleges'

export function TrendingCollegesSection() {
  return (
    <section className="border-b bg-card py-6 sm:py-9 lg:py-10">
      <div className="container-shell px-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <SectionHeader title="Trending Colleges & Universities" />
          <Link href="/colleges" className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline">
            View All Colleges <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-5 sm:gap-3 lg:grid-cols-4">
          {trendingColleges.map((college) => (
            <Link
              key={college.name}
              href={college.href}
              className="group flex h-full items-center gap-2.5 rounded-[10px] border bg-card p-3 outline-none transition-colors hover:border-primary hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary sm:size-10">
                <Landmark className="size-4.5 sm:size-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-foreground sm:text-sm">{college.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {college.city}
                  <span className="hidden sm:inline"> · {college.type}</span>
                </p>
              </div>
              <ArrowRight className="hidden size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary sm:block" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
