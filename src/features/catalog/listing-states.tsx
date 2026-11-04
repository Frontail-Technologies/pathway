'use client'

import { AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ListingLoading({ label }: { label: string }) {
  return (
    <div role="status" className="flex flex-col gap-4" aria-label={label}>
      {[0, 1, 2].map((index) => (
        <div key={index} className="h-36 animate-pulse rounded-[12px] border bg-muted/60" />
      ))}
      <span className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        {label}…
      </span>
    </div>
  )
}

export function ListingError({ message, onRetry }: { message: string | null; onRetry: () => void }) {
  return (
    <div role="alert" className="flex flex-col items-center gap-3 rounded-[12px] border border-destructive/30 bg-destructive/5 px-6 py-10 text-center">
      <AlertCircle className="size-6 text-destructive" aria-hidden="true" />
      <p className="text-sm font-semibold text-foreground">Results couldn&apos;t be loaded</p>
      <p className="max-w-md text-sm text-muted-foreground">{message ?? 'Please try again.'}</p>
      <Button variant="outline" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}
