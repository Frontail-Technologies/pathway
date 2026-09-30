'use client'

import * as React from 'react'
import Link from 'next/link'
import type { AdminEnquiry } from '@/features/admin/data/admin-enquiries'
import { buttonVariants, Button } from '@/components/ui/button'
import { Copy, Check, ExternalLink, GraduationCap } from 'lucide-react'

export function EnquiryActionsPanel({ enquiry }: { enquiry: AdminEnquiry }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(enquiry.id)
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
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyId}
          className="w-full justify-start text-xs font-semibold gap-2 shadow-2xs"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-muted-foreground" />
          )}
          {copied ? 'Enquiry ID Copied' : 'Copy Enquiry ID'}
        </Button>

        {enquiry.studentId && (
          <Link
            href={`/admin/students/${enquiry.studentId}`}
            className={buttonVariants({
              variant: 'outline',
              size: 'sm',
              className: 'w-full justify-start text-xs font-semibold gap-2 shadow-2xs',
            })}
          >
            <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />
            Open Student Profile
          </Link>
        )}

        {enquiry.targetAdminUrl && (
          <Link
            href={enquiry.targetAdminUrl}
            className={buttonVariants({
              variant: 'outline',
              size: 'sm',
              className: 'w-full justify-start text-xs font-semibold gap-2 shadow-2xs',
            })}
          >
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
            Open Target Record
          </Link>
        )}
      </div>
    </div>
  )
}
