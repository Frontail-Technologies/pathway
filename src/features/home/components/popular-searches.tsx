import Link from 'next/link'
import { cn } from '@/lib/utils'

export function PopularSearchChips({ terms, tone = 'light' }: { terms: string[]; tone?: 'light' | 'dark' }) {
  if (!terms.length) return null
  const dark = tone === 'dark'
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={cn('shrink-0 text-sm font-semibold', dark ? 'text-white/80' : 'text-foreground')}>Popular:</span>
      {terms.map((term) => (
        <Link
          key={term}
          href={`/search?q=${encodeURIComponent(term)}`}
          className={cn(
            'shrink-0 rounded-full border px-3 py-1 text-sm transition-colors',
            dark ? 'border-white/25 bg-white/10 text-white hover:bg-white/20' : 'bg-card/80 text-muted-foreground hover:border-primary hover:text-primary',
          )}
        >
          {term}
        </Link>
      ))}
    </div>
  )
}
