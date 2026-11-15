import { ExternalLink, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const dateFormat = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' })

export function SourceNote({
  source,
  year,
  href,
  updatedAt,
  note,
  className,
}: {
  source: string
  year?: number | string
  href?: string
  updatedAt?: string | Date | null
  note?: string
  className?: string
}) {
  const updated = updatedAt ? new Date(updatedAt) : null
  const label = [source, year].filter(Boolean).join(' ')
  return (
    <p className={cn('flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-muted-foreground', className)}>
      <ShieldCheck className="size-3.5 shrink-0 text-success" aria-hidden="true" />
      <span>Source:</span>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 font-medium text-foreground hover:text-primary hover:underline underline-offset-4">
          {label}
          <ExternalLink className="size-3" aria-hidden="true" />
        </a>
      ) : (
        <span className="font-medium text-foreground">{label}</span>
      )}
      {updated && !Number.isNaN(updated.getTime()) ? <span>· Updated {dateFormat.format(updated)}</span> : null}
      {note ? <span>· {note}</span> : null}
    </p>
  )
}
