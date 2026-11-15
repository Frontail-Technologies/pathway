import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function HomeSectionHeading({
  eyebrow,
  title,
  subtitle,
  href,
  linkLabel,
  tone = 'light',
}: {
  eyebrow: string
  title: string
  subtitle?: string
  href?: string
  linkLabel?: string
  tone?: 'light' | 'dark'
}) {
  const dark = tone === 'dark'
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
      <div className="min-w-0">
        <h2 className={cn('font-heading text-[22px] leading-tight font-extrabold sm:text-[28px]', dark ? 'text-white' : 'text-foreground')}>{title}</h2>
        {subtitle ? <p className={cn('mt-1.5 text-sm sm:text-[15px]', dark ? 'text-white/70' : 'text-muted-foreground')}>{subtitle}</p> : null}
      </div>
      {href && linkLabel ? (
        <Link
          href={href}
          className={cn('flex shrink-0 items-center gap-1 text-sm font-semibold hover:underline', dark ? 'text-white' : 'text-primary')}
        >
          {linkLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  )
}
