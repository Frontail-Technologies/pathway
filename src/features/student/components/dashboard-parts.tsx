import type { ReactNode } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

/** Grouped profile section: heading row (+ optional trailing action) over a white, softly shadowed body. */
export function DashboardSection({ id, title, description, action, children, className = '' }: { id?: string; title: string; description?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`rounded-[12px] border bg-card p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:p-5 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-heading text-base font-bold text-foreground sm:text-lg">{title}</h2>
          {description && <p className="mt-0.5 text-[13px] text-muted-foreground">{description}</p>}
        </div>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  )
}

/** Action whose target account screen does not exist yet — disabled, never a dead link. */
export function SoonButton({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <Button variant="outline" disabled title="Coming soon" className={`h-8 shrink-0 px-3 text-xs ${className}`}>
      {children}
    </Button>
  )
}

/** Live link to an existing account screen when `href` is given; otherwise the disabled "coming soon" action. */
export function ActionButton({ href, children, variant = 'outline', className = '' }: { href?: string; children: ReactNode; variant?: 'outline' | 'cta'; className?: string }) {
  if (!href) return <SoonButton className={className}>{children}</SoonButton>
  return (
    <Button variant={variant} className={`h-8 shrink-0 px-3 text-xs ${className}`} nativeButton={false} render={<Link href={href} />}>
      {children}
    </Button>
  )
}

/** Label + value pair; a missing value renders as a muted "Not added". */
export function ProfileField({ label, value }: { label: string; value?: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] tracking-wide text-muted-foreground uppercase">{label}</dt>
      <dd className={`mt-1 text-sm ${value ? 'font-medium text-foreground' : 'text-muted-foreground/80 italic'}`}>{value || 'Not added'}</dd>
    </div>
  )
}

/** Chip group with an explicit empty state. */
export function ChipField({ label, values, emptyText = 'Not added yet' }: { label: string; values: string[]; emptyText?: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] tracking-wide text-muted-foreground uppercase">{label}</dt>
      <dd className="mt-1.5">
        {values.length ? (
          <div className="flex flex-wrap gap-1.5">
            {values.map((value) => (
              <span key={value} className="rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold text-primary">
                {value}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-sm text-muted-foreground/80 italic">{emptyText}</span>
        )}
      </dd>
    </div>
  )
}
