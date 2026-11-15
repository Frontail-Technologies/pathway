import Link from 'next/link'
import { cn } from '@/lib/utils'

export type StatItem = {
  label: string
  value: string | null | undefined
  href?: string
}

export function StatGrid({ items, columns = 2, className }: { items: StatItem[]; columns?: 2 | 4; className?: string }) {
  const visible = items.filter((item) => item.value && item.value.trim() && item.value.trim() !== '-')
  if (visible.length === 0) return null

  return (
    <dl className={cn('grid gap-x-4 gap-y-3', columns === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2', className)}>
      {visible.map((item) => (
        <div key={item.label} className="min-w-0">
          <dt className="truncate text-xs text-muted-foreground">{item.label}</dt>
          <dd className="mt-0.5 truncate text-sm font-semibold text-foreground tabular-nums">
            {item.href ? (
              <Link href={item.href} className="hover:text-primary hover:underline underline-offset-4">
                {item.value}
              </Link>
            ) : (
              item.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}
