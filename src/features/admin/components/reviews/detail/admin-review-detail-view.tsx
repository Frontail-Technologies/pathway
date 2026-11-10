'use client'

import * as React from 'react'
import Link from 'next/link'
import { Check, Copy, ExternalLink } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import type { AdminReview } from '@/features/admin/data/admin-reviews'
import { FactList, Panel, Tag, Monogram, RecordHeader } from '../../kit'
import { ModerationStatusBadge } from '../shared/moderation-status-badge'
import { Rating } from '../shared/review-rating'
import { formatReviewDate, reviewEntityTypeLabels, reviewSourceLabels } from '../shared/review-constants'

export function AdminReviewDetailView({ review }: { review: AdminReview }) {
  const [copied, setCopied] = React.useState(false)
  const submitted = formatReviewDate(review.submittedAt)
  const entityLabel = reviewEntityTypeLabels[review.entityType]

  async function copyId() {
    try {
      await navigator.clipboard.writeText(review.id)
    } catch {
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <RecordHeader
        back={{ href: '/admin/reviews', label: 'Reviews' }}
        title={review.title || `Review of ${review.targetName || review.entityId}`}
        media={<Monogram name={review.title || `Review of ${review.targetName || review.entityId}`} size="lg" />}
        chips={
          <>
            <ModerationStatusBadge status={review.moderationStatus} />
            <Tag>{reviewSourceLabels[review.source]}</Tag>
            {submitted ? <span className="text-[13px] text-muted-foreground">Submitted {submitted}</span> : null}
          </>
        }
        actions={
          <>
            {review.sourceUrl ? (
              <a href={review.sourceUrl} target="_blank" rel="noreferrer noopener" className={buttonVariants({ variant: 'outline', size: 'sm', className: 'h-9 gap-1.5' })}>
                <ExternalLink className="size-4" aria-hidden="true" />
                View on Google
              </a>
            ) : null}
            {review.targetAdminUrl ? (
              <Link href={review.targetAdminUrl} className={buttonVariants({ variant: 'outline', size: 'sm', className: 'h-9' })}>
                Open {entityLabel.toLowerCase()}
              </Link>
            ) : null}
          </>
        }
      />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <Panel title="Review">
            {review.body ? (
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">{review.body}</p>
            ) : (
              <p className="text-sm text-muted-foreground">The reviewer left a rating without any text.</p>
            )}
          </Panel>

          <Panel title="Details">
            <FactList
              items={[
                { label: 'Rating', value: <Rating value={review.rating} /> },
                { label: 'Reviewer', value: review.reviewerName || 'Anonymous' },
                { label: 'Verification', value: review.verifiedSession ? 'Verified completed session' : 'Not verified' },
                { label: 'Submitted', value: submitted ?? '—' },
                {
                  label: entityLabel,
                  value: review.targetAdminUrl ? (
                    <Link href={review.targetAdminUrl} className="text-primary hover:underline">
                      {review.targetName || review.entityId}
                    </Link>
                  ) : (
                    review.targetName || review.entityId
                  ),
                },
                { label: 'Source', value: review.isGoogleReview ? 'Imported from Google' : 'Written on Pathway' },
              ]}
            />
          </Panel>
        </div>

        <div className="space-y-6 lg:sticky lg:top-[4.5rem] lg:col-span-4">
          <Panel title="Moderation">
            <div className="space-y-3">
              {review.isPathwayNative ? (
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" disabled>
                    Publish
                  </Button>
                  <Button size="sm" variant="outline" disabled>
                    Hide
                  </Button>
                  <Button size="sm" variant="outline" disabled>
                    Flag
                  </Button>
                </div>
              ) : (
                <Button size="sm" variant="outline" disabled>
                  Hide on Pathway
                </Button>
              )}
              <p className="text-[13px] text-muted-foreground">
                {review.isGoogleReview ? 'Google reviews can be hidden on Pathway but not edited or deleted. ' : ''}
                Moderation needs the admin API, which is not connected yet.
              </p>
            </div>
          </Panel>

          <Panel title="Record">
            <FactList
              columns={1}
              items={[
                {
                  label: 'Provenance',
                  value: (
                    <span className="font-normal text-muted-foreground">
                      {review.isGoogleReview ? 'Imported through the Google Places integration. Google’s policies govern edits and removals.' : 'Submitted by a registered student after a tutoring session.'}
                    </span>
                  ),
                },
                {
                  label: 'Review ID',
                  value: (
                    <button type="button" onClick={copyId} className="inline-flex items-center gap-1.5 rounded font-mono text-[13px] font-normal text-foreground outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/40">
                      {review.id}
                      {copied ? <Check className="size-3.5 text-success" aria-hidden="true" /> : <Copy className="size-3.5 text-muted-foreground" aria-hidden="true" />}
                      <span className="sr-only">{copied ? 'Copied' : 'Copy ID'}</span>
                    </button>
                  ),
                },
              ]}
            />
          </Panel>
        </div>
      </div>
    </div>
  )
}
