'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Edit, ExternalLink, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { AdminCoachingProvider } from '@/features/admin/data/admin-coaching'

export function CoachingActionsPanel({ provider }: { provider: AdminCoachingProvider }) {
  const [copied, setCopied] = useState(false)

  const handleCopyId = () => {
    navigator.clipboard.writeText(provider.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-xs space-y-3">
      <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Admin Actions</h3>

      <div className="space-y-2 pt-1 border-t border-border/50">
        <Button
          size="sm"
          className="w-full h-8 text-xs justify-start"
          nativeButton={false}
          render={<Link href={`/admin/tutors-coaching/coaching/${provider.id}/edit`} />}
        >
          <Edit className="w-3.5 h-3.5 mr-2" />
          Edit Provider Record
        </Button>

        {provider.hasDetailPage && (
          <Button
            variant="outline"
            size="sm"
            className="w-full h-8 text-xs justify-start"
            nativeButton={false}
            render={<Link href={`/coaching/${provider.slug}`} target="_blank" />}
          >
            <ExternalLink className="w-3.5 h-3.5 mr-2" />
            View Public Page
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyId}
          className="w-full h-8 text-xs justify-start text-muted-foreground hover:text-foreground"
        >
          {copied ? <Check className="w-3.5 h-3.5 mr-2 text-success" /> : <Copy className="w-3.5 h-3.5 mr-2" />}
          {copied ? 'Copied ID' : 'Copy Provider ID'}
        </Button>
      </div>
    </div>
  )
}
