'use client'

import type { AdminPromotion } from '@/features/admin/data/admin-promotions'
import { Button } from '@/components/ui/button'
import { Copy, Check, ExternalLink, Edit } from 'lucide-react'
import * as React from 'react'
import Link from 'next/link'

export function PromotionActionsPanel({ promotion }: { promotion: AdminPromotion }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopyId = () => {
    navigator.clipboard.writeText(promotion.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-card rounded-xl p-4 shadow-xs border-0 space-y-3">
      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
        Actions
      </h3>

      <div className="space-y-2">
        <Link
          href={`/admin/promotions/${promotion.id}/edit`}
          className="w-full inline-flex items-center justify-start h-8 px-3 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Edit className="w-3.5 h-3.5 mr-2" />
          Edit Placement
        </Link>

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
          {copied ? 'Copied Placement ID' : 'Copy Placement ID'}
        </Button>

        {promotion.targetAdminUrl ? (
          <Link
            href={promotion.targetAdminUrl}
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
