import type { AdminReview } from '@/features/admin/data/admin-reviews'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building2, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export function ReviewEntitySection({ review }: { review: AdminReview }) {
  return (
    <Card className="border-0 shadow-xs">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold font-heading flex items-center justify-between">
          <span>Target Entity</span>
          <Badge variant="outline" className="text-xs font-normal">
            {review.entityTypeLabel}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-muted/20 border border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">
                {review.targetName || review.entityId}
              </h4>
              <p className="text-xs text-muted-foreground font-mono">
                Entity ID: {review.entityId}
              </p>
            </div>
          </div>

          {review.targetAdminUrl ? (
            <Link
              href={review.targetAdminUrl}
              className="inline-flex items-center justify-center rounded-md border border-input bg-background h-8 px-3 text-xs font-medium shrink-0 hover:bg-muted transition-colors text-foreground"
            >
              Manage Entity
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
