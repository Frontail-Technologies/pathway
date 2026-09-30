'use client'

import Link from 'next/link'
import { Send, Shield, Info, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface SeoPublishingSectionProps {
  isEditing: boolean
  isSubmitting: boolean
}

export function SeoPublishingSection({
  isEditing,
  isSubmitting,
}: SeoPublishingSectionProps) {
  return (
    <Card id="publishing" className="border-0 shadow-xs">
      <CardHeader className="p-4 sm:p-5 pb-2">
        <div className="flex items-center gap-2">
          <Send className="w-4 h-4 text-blue-600" />
          <CardTitle className="text-sm font-semibold">Review & Save</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-5 pt-2 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-10 text-xs font-semibold px-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 mr-2" />
                {isEditing ? 'Update SEO Override' : 'Save SEO Override'}
              </>
            )}
          </Button>

          <Link
            href="/admin/seo"
            className="h-10 text-xs font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors inline-flex items-center justify-center px-4 shadow-xs"
          >
            Cancel
          </Link>
        </div>

        <div className="pt-2">
          <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200 text-[11px] text-blue-900 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              <span>Admin API Boundary</span>
            </div>
            <p className="leading-relaxed">
              Saving and persisting SEO metadata overrides requires the connected Admin Persistence API. Local validation is enforced before dispatching save actions.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
