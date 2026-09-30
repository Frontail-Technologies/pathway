import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { HorizontalContentRail } from '@/components/shared/horizontal-content-rail'
import { colleges } from '@/features/colleges/data/colleges'
import { getCollegeDetail } from '@/features/colleges/data/college-detail'


const featuredColleges = colleges.slice(0, 4)

const initials = (name: string) =>
  name
    .split(' ')
    .filter((part) => /^[A-Za-z]/.test(part))
    .map((part) => part[0])
    .slice(0, 3)
    .join('')
    .toUpperCase()

 
export function TrendingCollegesSection() {
  return (
    <section className="bg-background py-7 sm:py-9 lg:py-12">
      <div className="container-shell">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">Explore Colleges &amp; Universities</h2>
          <Link href="/colleges" className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline">
            View All Colleges <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <HorizontalContentRail ariaLabel="Colleges and universities" edgeBleed className="mt-4 sm:mx-0" trackClassName="sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible sm:px-0 sm:scroll-px-0 lg:grid-cols-4">
          {featuredColleges.map((college) => {
            const hasDetail = !!getCollegeDetail(college.slug)
            return (
              <Link
                key={college.slug}
                href={hasDetail ? `/college/${college.slug}` : '/colleges'}
                className="group flex w-60 shrink-0 snap-start items-center gap-3 rounded-[12px] border bg-card p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] outline-none transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 sm:w-auto"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary font-heading text-sm font-extrabold text-primary">{initials(college.name)}</span>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm leading-snug font-bold text-foreground">{college.name}</p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-1 text-xs text-muted-foreground">
                    <MapPin className="size-3 shrink-0" aria-hidden="true" />
                    <span>{college.city}</span>
                    <span aria-hidden="true">·</span>
                    <span className="shrink-0">{college.type}</span>
                  </p>
                </div>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
              </Link>
            )
          })}
        </HorizontalContentRail>
      </div>
    </section>
  )
}
