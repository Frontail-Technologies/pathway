import type { AdminReview } from '@/features/admin/data/admin-reviews'
import { ReviewSourceBadge } from '../shared/review-source-badge'
import { Globe, ExternalLink, ShieldCheck } from 'lucide-react'

export function ReviewSourcePanel({ review }: { review: AdminReview }) {
  return (
    <div className="bg-card rounded-xl p-4 shadow-xs border-0 space-y-3">
      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
        Source & Provenance
      </h3>

      <div className="space-y-2.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Provider:</span>
          <ReviewSourceBadge source={review.source} />
        </div>

        {review.isGoogleReview ? (
          <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-blue-900 space-y-1.5 text-[11px]">
            <div className="font-semibold flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              External Google Review
            </div>
            <p className="text-blue-800 leading-relaxed">
              Imported via Google Places API integration. Content editing and author removal are governed by Google policies.
            </p>
            {review.sourceUrl ? (
              <a
                href={review.sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-blue-700 hover:underline font-medium pt-1"
              >
                View on Google
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : null}
          </div>
        ) : review.isPathwayNative ? (
          <div className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-100 text-indigo-900 space-y-1.5 text-[11px]">
            <div className="font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              Pathway-Native Review
            </div>
            <p className="text-indigo-800 leading-relaxed">
              Directly submitted by a registered student following an educator tutoring session.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
