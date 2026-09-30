'use client'

import type { AdminPromotion } from '@/features/admin/data/admin-promotions'
import { PromotionEditorForm } from './promotion-editor-form'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function AdminPromotionEditorView({
  promotion,
  isCreate = false,
}: {
  promotion?: AdminPromotion
  isCreate?: boolean
}) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Link
            href="/admin/promotions"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Placements</span>
          </Link>
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
            {isCreate ? 'Create Placement' : `Edit Placement #${promotion?.id}`}
          </h1>
        </div>
      </div>

      <PromotionEditorForm initialPromotion={promotion} isCreate={isCreate} />
    </div>
  )
}
