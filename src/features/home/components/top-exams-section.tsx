import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/shared/section-header'
import { topExams } from '../data/top-exams'
import { DiscoveryChip } from './discovery-chip'

export function TopExamsSection() {
  return (
    <section className="border-b bg-muted py-6 sm:py-9 lg:py-10">
      <div className="container-shell px-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <SectionHeader title="Top Exams" />
          <Link href="/exams" className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline">
            View All Exams <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
          {topExams.map((exam) => <DiscoveryChip key={exam.name} href={exam.href} label={exam.name} meta={exam.category} />)}
        </div>
      </div>
    </section>
  )
}
