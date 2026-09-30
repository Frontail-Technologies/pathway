import type { AdminReview } from '@/features/admin/data/admin-reviews'
import { ReviewSourceBadge } from '../shared/review-source-badge'
import { ModerationStatusBadge } from '../shared/moderation-status-badge'
import { Badge } from '@/components/ui/badge'
import { Star, CheckCircle, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export function ReviewMobileCard({ review }: { review: AdminReview }) {
  return (
    <div className="bg-card rounded-xl p-4 border border-border/60 shadow-xs space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {review.rating ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                {review.rating.toFixed(1)}
              </span>
            ) : null}
            <span className="font-semibold text-sm text-foreground truncate">
              {review.title || 'Review Entry'}
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-mono">#{review.id}</p>
        </div>
        <ModerationStatusBadge status={review.moderationStatus} />
      </div>

      {review.body ? (
        <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
          {review.body}
        </p>
      ) : null}

      <div className="pt-2 border-t border-border/40 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="space-y-0.5">
          <div className="font-medium text-foreground">
            {review.targetName || review.entityId}
          </div>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-normal text-muted-foreground border-border/60">
            {review.entityTypeLabel}
          </Badge>
        </div>
        <ReviewSourceBadge source={review.source} />
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
        <div className="text-muted-foreground">
          <span>By {review.reviewerName || 'Anonymous'}</span>
          {review.verifiedSession ? (
            <span className="inline-flex items-center gap-1 ml-1.5 text-[10px] text-emerald-600 font-medium">
              <CheckCircle className="w-3 h-3" />
              Verified Session
            </span>
          ) : null}
        </div>
        <Link
          href={`/admin/reviews/${review.id}`}
          className="inline-flex items-center h-7 px-2 text-xs font-medium rounded text-foreground hover:text-primary hover:bg-muted transition-colors"
        >
          Inspect
          <ChevronRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>
    </div>
  )
}
