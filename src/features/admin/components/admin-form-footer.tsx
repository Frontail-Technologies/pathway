'use client'

import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function AdminFormFooter({
  formId,
  submitLabel,
  onCancel,
  status,
  submitting,
  disabled,
  secondary,
  className,
}: {
  formId: string
  submitLabel: string
  onCancel: () => void
  status?: ReactNode
  submitting?: boolean
  disabled?: boolean
  secondary?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('sticky bottom-0 z-10 -mx-4 -mb-5 mt-auto flex flex-wrap items-center gap-3 border-t border-border bg-card/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-card/85 lg:-mx-6 lg:-mb-6 lg:px-6', className)}>
      {status ? <p className="min-w-0 flex-1 truncate text-[13px] text-muted-foreground">{status}</p> : <span className="flex-1" />}
      <div className="flex items-center gap-2">
        {secondary}
        <Button type="button" variant="outline" className="h-9" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" form={formId} className="h-9 min-w-32" disabled={disabled || submitting}>
          {submitting ? 'Saving…' : submitLabel}
        </Button>
      </div>
    </div>
  )
}
