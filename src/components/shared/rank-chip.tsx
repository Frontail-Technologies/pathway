import { Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

export function RankChip({ rank, source = 'NIRF', year, category, className }: { rank: number; source?: string; year?: number | string; category?: string; className?: string }) {
  const context = [category, year].filter(Boolean).join(' ')
  return (
    <span
      className={cn('inline-flex h-6 items-center gap-1 rounded-md border border-success/25 bg-success-surface px-2 text-xs font-semibold text-success', className)}
      aria-label={`Ranked ${rank} by ${source}${context ? ` ${context}` : ''}`}
    >
      <Trophy className="size-3.5" aria-hidden="true" />
      <span>
        {source} #{rank}
      </span>
      {context ? <span className="font-medium text-success/80">· {context}</span> : null}
    </span>
  )
}
