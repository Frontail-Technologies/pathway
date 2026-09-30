'use client'

import type { AdminReview } from '@/features/admin/data/admin-reviews'
import { Button } from '@/components/ui/button'
import { Copy, Check, ExternalLink } from 'lucide-react'
import * as React from 'react'
import Link from 'next/link'

export function ReviewActionsPanel({ review }: { review: AdminReview }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopyId = () => {
    navigator.clipboard.writeText(review.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-card rounded-xl p-4 shadow-xs border-0 space-y-3">
      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
        Actions
      </h3>

      <div className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyId}
          className="w-full justify-start h-8 text-xs font-medium"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 mr-2 text-emerald-600" />
          ) : (
            <Copy className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
          )}
          {copied ? 'Copied Review ID' : 'Copy Review ID'}
        </Button>

        {review.targetAdminUrl ? (
          <Link
            href={review.targetAdminUrl}
            className="w-full inline-flex items-center justify-start h-8 px-3 text-xs font-medium rounded-md border border-input bg-background hover:bg-muted transition-colors text-foreground"
          >
            <ExternalLink className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
            Open Target Entity
          </Link>
        ) : null}
      </div>
    </div>
  )
}
