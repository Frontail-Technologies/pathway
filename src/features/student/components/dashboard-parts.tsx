import type { ReactNode } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SpotArt, type SpotArtName } from '@/components/shared/spot-art'

 
export function DashboardSection({ id, title, description, action, art, children, className = '' }: { id?: string; title: string; description?: string; action?: ReactNode; art?: SpotArtName; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`rounded-xl border bg-card p-4 sm:p-5 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {art ? <SpotArt name={art} className="size-10 rounded-lg" /> : null}
          <div className="min-w-0">
            <h2 className="font-heading text-base font-bold text-foreground sm:text-lg">{title}</h2>
            {description && <p className="mt-0.5 text-[13px] text-muted-foreground">{description}</p>}
          </div>
        </div>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  )
}

 
export function SoonButton({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <Button variant="outline" disabled title="Coming soon" className={`h-8 shrink-0 px-3 text-xs ${className}`}>
      {children}
    </Button>
  )
}

 
export function ActionButton({ href, children, variant = 'outline', className = '' }: { href?: string; children: ReactNode; variant?: 'outline' | 'cta'; className?: string }) {
  if (!href) return <SoonButton className={className}>{children}</SoonButton>
  return (
    <Button variant={variant} className={`h-8 shrink-0 px-3 text-xs ${className}`} nativeButton={false} render={<Link href={href} />}>
      {children}
    </Button>
  )
}

 
export function ProfileField({ label, value }: { label: string; value?: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className={`mt-1 text-sm ${value ? 'font-medium text-foreground' : 'text-muted-foreground/80 italic'}`}>{value || 'Not added'}</dd>
    </div>
  )
}

 
export function ChipField({ label, values, emptyText = 'Not added yet' }: { label: string; values: string[]; emptyText?: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-muted-foreground">{label}</dt>
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

export function StudentPageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-[28px]">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  )
}
