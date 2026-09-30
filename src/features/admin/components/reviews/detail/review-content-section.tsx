import type { AdminReview } from '@/features/admin/data/admin-reviews'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Quote } from 'lucide-react'

export function ReviewContentSection({ review }: { review: AdminReview }) {
  return (
    <Card className="border-0 shadow-xs">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold font-heading">
          Review Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {review.title ? (
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {review.title}
            </h3>
          </div>
        ) : null}

        {review.body ? (
          <div className="relative pl-6 py-2 border-l-2 border-primary/30 bg-muted/20 rounded-r-lg p-4">
            <Quote className="w-4 h-4 text-muted-foreground absolute left-1.5 top-3 -scale-x-100 opacity-60" />
            <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
              {review.body}
            </p>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground italic">
            No descriptive review remarks provided.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
