'use client'

import * as React from 'react'
import Link from 'next/link'
import type { AdminStudent } from '@/features/admin/data/admin-students'
import { buttonVariants, Button } from '@/components/ui/button'
import { ExternalLink, SlidersHorizontal, Copy, Check } from 'lucide-react'

export function StudentActionsPanel({ student }: { student: AdminStudent }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(student.id)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="bg-card rounded-xl p-5 shadow-xs border-0 space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Administrative Actions
      </h3>

      <div className="space-y-2">
        <Link
          href="/student"
          className={buttonVariants({
            variant: 'outline',
            size: 'sm',
            className: 'w-full justify-start text-xs font-semibold gap-2 shadow-2xs',
          })}
        >
          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
          Open Demo Student Space
        </Link>

        <Link
          href="/student/preferences"
          className={buttonVariants({
            variant: 'outline',
            size: 'sm',
            className: 'w-full justify-start text-xs font-semibold gap-2 shadow-2xs',
          })}
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
          View Demo Preferences
        </Link>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyId}
          className="w-full justify-start text-xs font-medium text-muted-foreground hover:text-foreground gap-2"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-muted-foreground" />
          )}
          {copied ? 'Student ID Copied' : 'Copy Student ID'}
        </Button>
      </div>
    </div>
  )
}
