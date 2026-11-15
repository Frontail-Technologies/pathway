'use client'

import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LoadMoreFooter({ shown, total, noun, hasMore, loading, onLoadMore }: { shown: number; total: number; noun: string; hasMore: boolean; loading: boolean; onLoadMore: () => void }) {
  const progress = total ? Math.min(100, Math.round((shown / total) * 100)) : 100
  return (
    <div className="flex flex-col items-center gap-3 py-6">
      <p className="text-sm text-muted-foreground" aria-live="polite">
        Showing <span className="font-semibold text-foreground tabular-nums">{shown.toLocaleString('en-IN')}</span> of <span className="font-semibold text-foreground tabular-nums">{total.toLocaleString('en-IN')}</span> {noun}
      </p>
      <div className="h-1 w-40 overflow-hidden rounded-full bg-muted" aria-hidden="true">
        <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
      </div>
      {hasMore ? (
        <Button variant="outline" className="min-w-44" onClick={onLoadMore} disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
          {loading ? 'Loading…' : `Load more ${noun}`}
        </Button>
      ) : null}
    </div>
  )
}
