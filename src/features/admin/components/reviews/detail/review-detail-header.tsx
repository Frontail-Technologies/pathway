import type { AdminReview } from '@/features/admin/data/admin-reviews'
import { ModerationStatusBadge } from '../shared/moderation-status-badge'
import { ReviewSourceBadge } from '../shared/review-source-badge'
import { ArrowLeft, Star } from 'lucide-react'
import Link from 'next/link'

export function ReviewDetailHeader({ review }: { review: AdminReview }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link
          href="/admin/reviews"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Reviews</span>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
              {review.title || `Review #${review.id}`}
            </h1>
            <ReviewSourceBadge source={review.source} />
            <ModerationStatusBadge status={review.moderationStatus} />
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>ID: <code className="font-mono text-foreground font-medium">{review.id}</code></span>
            {review.rating ? (
              <>
                <span>•</span>
                <span className="inline-flex items-center gap-1 font-semibold text-amber-600">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  {review.rating.toFixed(1)} / 5.0
                </span>
              </>
            ) : null}
            {review.submittedAt ? (
              <>
                <span>•</span>
                <span>
                  Submitted {new Date(review.submittedAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
