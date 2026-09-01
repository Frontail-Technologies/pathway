import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { scholarshipStatusStyles } from '../data/scholarships'
import type { ScholarshipDetailData } from '../data/scholarship-detail'

export function ScholarshipRelatedSection({ scholarship }: { scholarship: ScholarshipDetailData }) {
  if (scholarship.relatedScholarships.length === 0) return null

  return (
    // Deliberately no `id`/scroll-spy entry — Related Scholarships sits in the
    // page flow between Selection Process and FAQs but is not one of the
    // sticky detail-nav tabs (see `ScholarshipDetailNav`'s section list).
    // Preview shape is opportunity-focused (status + benefit + deadline),
    // deliberately not the name+level/duration+Explore shape Course Detail's
    // Related Courses uses.
    <section className="border-b py-7 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">Related Scholarships</h2>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {scholarship.relatedScholarships.map((related) => {
          const status = scholarshipStatusStyles[related.status]
          return (
            <div key={related.slug} className="rounded-[10px] border bg-card p-4">
              <p className="text-sm font-semibold text-foreground">{related.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{related.provider}</p>
              <div className="mt-2.5 flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-foreground">{related.benefitLabel}</span>
                <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${status.className}`}>{status.label}</span>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">Deadline: {related.deadlineDisplay}</p>
              <Button variant="outline" className="mt-3 h-9 w-full text-sm" nativeButton={false} render={<Link href={related.href} />}>
                View Scholarship
              </Button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
