'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export type BannerPreviewData = {
  title?: string
  description?: string
  eyebrow?: string
  ctaLabel?: string
  secondaryCtaLabel?: string
  image?: string | null
  mobileImage?: string | null
  imageAlt?: string
}

/**
 * Neutral mock of the banner as it appears on the site: real artwork, plain text, no decorative backdrop.
 * Shows placeholder copy when fields are empty so the editor preview is never blank.
 */
export function BannerPreview({ data, placeholders = false }: { data: BannerPreviewData; placeholders?: boolean }) {
  const [device, setDevice] = React.useState<'desktop' | 'mobile'>('desktop')
  const image = device === 'mobile' && data.mobileImage ? data.mobileImage : data.image
  const title = data.title || (placeholders ? 'Headline' : '')
  const description = data.description || (placeholders ? 'Supporting text' : '')
  const ctaLabel = data.ctaLabel || (placeholders ? 'Button' : '')
  const alt = data.imageAlt || title

  return (
    <div className="space-y-3">
      <div className="inline-flex rounded-md border border-border p-0.5" role="group" aria-label="Preview size">
        {(['desktop', 'mobile'] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setDevice(option)}
            aria-pressed={device === option}
            className={cn('rounded px-2.5 py-1 text-[13px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring/40', device === option ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground')}
          >
            {option === 'desktop' ? 'Desktop' : 'Mobile'}
          </button>
        ))}
      </div>

      <div className={cn('overflow-hidden rounded-lg border border-border bg-card', device === 'desktop' ? 'flex flex-col sm:flex-row' : 'mx-auto max-w-[280px]')}>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element -- previews arbitrary URLs and local object URLs
          <img src={image} alt={alt} className={cn('object-cover', device === 'desktop' ? 'aspect-video w-full sm:aspect-auto sm:w-2/5' : 'aspect-video w-full')} />
        ) : null}
        <div className="flex flex-1 flex-col justify-center gap-2 p-5">
          {data.eyebrow ? <span className="text-[13px] font-medium text-muted-foreground">{data.eyebrow}</span> : null}
          {title ? <p className="font-heading text-lg leading-snug font-semibold text-foreground">{title}</p> : null}
          {description ? <p className="line-clamp-3 text-sm text-muted-foreground">{description}</p> : null}
          {ctaLabel || data.secondaryCtaLabel ? (
            <div className="mt-1 flex flex-wrap items-center gap-3">
              {ctaLabel ? <span className="inline-flex h-8 items-center rounded-md bg-primary px-3 text-[13px] font-medium text-primary-foreground">{ctaLabel}</span> : null}
              {data.secondaryCtaLabel ? <span className="text-[13px] font-medium text-foreground underline underline-offset-4">{data.secondaryCtaLabel}</span> : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
