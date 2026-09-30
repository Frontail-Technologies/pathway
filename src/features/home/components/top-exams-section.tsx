import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HorizontalContentRail } from '@/components/shared/horizontal-content-rail'
import { exams } from '@/features/exams/data/exams'

const monogram = (shortName: string) => shortName.split(' ')[0].slice(0, 4).toUpperCase()
const featuredExams = exams.filter((exam) => exam.popular).slice(0, 6)

 
export function TopExamsSection() {
  return (
    <section className="bg-muted pt-6 pb-7 sm:pt-8 sm:pb-9 lg:pb-12">
      <div className="container-shell">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">Popular Exams</h2>
          <Link href="/exams" className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline">
            View All Exams <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <HorizontalContentRail ariaLabel="Popular exams" edgeBleed className="mt-4 sm:mx-0" trackClassName="sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:px-0 sm:scroll-px-0 lg:grid-cols-6">
          {featuredExams.map((exam) => (
            <Link
              key={exam.id}
              href={`/exams?exam=${exam.slug}`}
              className="group flex w-36 shrink-0 snap-start flex-col items-center rounded-[12px] border bg-card px-3 py-3.5 text-center shadow-[0_2px_10px_rgba(15,23,42,0.04)] outline-none transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 sm:w-auto"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-xs font-bold text-primary-foreground">{monogram(exam.shortName)}</span>
              <p className="mt-2 text-sm font-bold text-foreground">{exam.shortName}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{exam.studyArea}</p>
            </Link>
          ))}
        </HorizontalContentRail>
      </div>
    </section>
  )
}
