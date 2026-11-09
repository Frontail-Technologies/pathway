import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type AdminSectionProps = {
  title: string
  description?: string
  action?: ReactNode
  badge?: ReactNode
  children: ReactNode
  className?: string
  contentClassName?: string
  noPadding?: boolean
  padding?: 'default' | 'compact'
  fill?: boolean
}

export function AdminSection({
  title,
  description,
  action,
  badge,
  children,
  className,
  contentClassName,
  noPadding = false,
  padding = 'default',
  fill = true,
}: AdminSectionProps) {
  const headingId = `section-${title.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <section
      className={cn(
        'flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm',
        fill ? 'h-full' : 'h-auto',
        className
      )}
      aria-labelledby={headingId}
    >
      <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-border/70 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 id={headingId} className="min-w-0 truncate text-[15px] font-semibold text-foreground">
              {title}
            </h2>
            {badge}
          </div>
          {description && (
            <p className="mt-0.5 text-[13px] text-muted-foreground">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div
        className={cn(
          noPadding ? '' : padding === 'compact' ? 'px-3 pt-3 pb-1 sm:px-4 sm:pt-4 sm:pb-1' : 'p-5',
          'flex-1 flex flex-col min-h-0',
          contentClassName
        )}
      >
        {children}
      </div>
    </section>
  )
}
