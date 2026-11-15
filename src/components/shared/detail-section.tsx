import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function DetailSection({ id, title, subtitle, action, className, children }: { id?: string; title: string; subtitle?: ReactNode; action?: ReactNode; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={cn('scroll-mt-section rounded-xl border bg-card p-4 sm:p-6', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export function DetailBody({ aside, children }: { aside?: ReactNode; children: ReactNode }) {
  return (
    <div className="bg-muted/50 py-4 lg:py-6">
      <div className="container-shell px-4">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="flex min-w-0 flex-1 flex-col gap-4">{children}</div>
          {aside ? <aside className="hidden shrink-0 lg:sticky lg:top-[calc(var(--pw-header-h)+var(--pw-section-nav-h)+16px)] lg:z-10 lg:block lg:w-75">{aside}</aside> : null}
        </div>
      </div>
    </div>
  )
}
