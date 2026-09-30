import { Info } from 'lucide-react'
import type { CollegeDetailData } from '../data/college-detail'






 
export function CollegeReviewsSection({ college }: { college: CollegeDetailData }) {
  return (
    <section id="reviews" className="scroll-mt-[172px] border-b py-7 lg:scroll-mt-44 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">{college.name} Reviews</h2>
      <div className="mt-4 flex items-start gap-3 rounded-[10px] border border-dashed bg-muted/40 p-4">
        <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-sm leading-6 text-muted-foreground">Verified student reviews for {college.name} aren&apos;t connected yet. Check the college&apos;s official channels for current student feedback.</p>
      </div>
    </section>
  )
}
