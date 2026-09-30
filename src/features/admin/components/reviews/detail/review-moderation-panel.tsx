import type { AdminReview } from '@/features/admin/data/admin-reviews'
import { ModerationStatusBadge } from '../shared/moderation-status-badge'
import { Button } from '@/components/ui/button'
import { Check, EyeOff, AlertTriangle } from 'lucide-react'

export function ReviewModerationPanel({ review }: { review: AdminReview }) {
  return (
    <div className="bg-card rounded-xl p-4 shadow-xs border-0 space-y-3">
      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
        Moderation Status
      </h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Current State:</span>
          <ModerationStatusBadge status={review.moderationStatus} />
        </div>

        {review.isPathwayNative ? (
          <div className="space-y-2 pt-2 border-t border-border/50">
            <p className="text-[11px] text-muted-foreground">
              Moderation actions for Pathway student reviews:
            </p>
            <div className="grid grid-cols-1 gap-1.5">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="w-full justify-start h-8 text-xs text-muted-foreground"
              >
                <Check className="w-3.5 h-3.5 mr-2 text-emerald-600" />
                Publish Review
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled
                className="w-full justify-start h-8 text-xs text-muted-foreground"
              >
                <EyeOff className="w-3.5 h-3.5 mr-2 text-slate-500" />
                Hide from Public
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled
                className="w-full justify-start h-8 text-xs text-muted-foreground"
              >
                <AlertTriangle className="w-3.5 h-3.5 mr-2 text-rose-500" />
                Flag for Investigation
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground/80 italic pt-1">
              Moderation state updates require the Admin API.
            </p>
          </div>
        ) : (
          <div className="pt-2 border-t border-border/50 space-y-2">
            <p className="text-[11px] text-muted-foreground">
              Google review display actions:
            </p>
            <Button
              variant="outline"
              size="sm"
              disabled
              className="w-full justify-start h-8 text-xs text-muted-foreground"
            >
              <EyeOff className="w-3.5 h-3.5 mr-2 text-slate-500" />
              Suppress on Pathway
            </Button>
            <p className="text-[10px] text-muted-foreground/80 italic">
              External reviews cannot be edited or deleted from Pathway.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
