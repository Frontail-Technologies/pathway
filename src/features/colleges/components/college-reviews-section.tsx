import { BadgeCheck } from 'lucide-react'
import { Rating } from '@/components/shared/rating'
import type { CollegeDetailData } from '../data/college-detail'

export function CollegeReviewsSection({ college }: { college: CollegeDetailData }) {
  return (
    <section id="reviews" className="scroll-mt-[172px] border-b py-7 lg:scroll-mt-40 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">{college.name} Reviews</h2>

      <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:gap-8">
        <div className="shrink-0 sm:w-32">
          <p className="font-heading text-3xl font-bold text-foreground">{college.rating.toFixed(1)}<span className="text-base font-medium text-muted-foreground"> / 5</span></p>
          <p className="mt-1 text-sm text-muted-foreground">{college.reviewCount.toLocaleString()} Reviews</p>
        </div>

        <div className="flex flex-1 flex-col gap-2.5">
          {college.reviewCategories.map((category) => (
            <div key={category.label} className="flex items-center gap-3">
              <p className="w-32 shrink-0 text-xs text-muted-foreground sm:text-sm">{category.label}</p>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${(category.value / 5) * 100}%` }} />
              </div>
              <p className="w-8 shrink-0 text-right text-xs font-medium text-foreground sm:text-sm">{category.value.toFixed(1)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-[10px] border bg-card">
        <div className="divide-y">
          {college.reviewPreviews.map((review) => (
            <div key={review.title} className="p-4">
              <div className="flex items-center justify-between gap-2">
                <Rating value={review.rating} />
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-foreground">{review.title}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{review.text}</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                {review.verified && (
                  <span className="inline-flex items-center gap-1 text-success">
                    <BadgeCheck className="size-3.5" aria-hidden="true" />
                    Verified
                  </span>
                )}
                <span>{review.course}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
