import type { AdminReview } from '@/features/admin/data/admin-reviews'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Star, User, ShieldCheck } from 'lucide-react'

export function ReviewSummarySection({ review }: { review: AdminReview }) {
  return (
    <Card className="border-0 shadow-xs">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold font-heading">
          Review Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-muted/30 rounded-lg p-3 space-y-1">
            <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-500" />
              Rating Score
            </span>
            <p className="text-sm font-semibold text-foreground">
              {review.rating ? `${review.rating.toFixed(1)} out of 5` : 'No rating'}
            </p>
          </div>

          <div className="bg-muted/30 rounded-lg p-3 space-y-1">
            <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-500" />
              Reviewer Name
            </span>
            <p className="text-sm font-semibold text-foreground">
              {review.reviewerName || 'Anonymous Reviewer'}
            </p>
          </div>

          <div className="bg-muted/30 rounded-lg p-3 space-y-1">
            <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Session Verification
            </span>
            <p className="text-sm font-semibold text-foreground">
              {review.verifiedSession ? 'Verified Completed Session' : 'Unverified / External'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
