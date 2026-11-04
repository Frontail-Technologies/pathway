'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Heart, MapPin, MonitorPlay } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSavedItem } from '@/features/saved/saved-items-provider'
import type { CoachingProvider } from '../data/coaching'
import { getCoachingVisual } from '../data/visuals'

export function CoachingResultCard({ provider }: { provider: CoachingProvider }) {
  const { saved, toggleSaved } = useSavedItem('coaching', provider.slug, 'Provider')
  const visual = getCoachingVisual(provider)
  
  
  
  const detailHref = provider.hasDetailPage ? `/coaching/${provider.slug}` : undefined

  
  
  
  const tags = [...provider.exams, ...provider.subjects].slice(0, 3)

  return (
    <article className="rounded-[10px] border bg-card p-2.5 shadow-[0_8px_24px_rgba(15,23,42,0.045)] transition-colors hover:border-primary/35 hover:shadow-[0_12px_30px_rgba(15,23,42,0.07)] sm:p-3">
      <div className="grid grid-cols-[96px_minmax(0,1fr)] gap-3 md:grid-cols-[158px_minmax(0,1fr)_132px] md:items-center">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted md:aspect-[4/3]">
          <Image
            src={visual.src}
            alt=""
            fill
            sizes="(min-width: 768px) 158px, 96px"
            className="object-cover"
            style={{ objectPosition: visual.objectPosition }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0)_52%,rgba(15,23,42,0.26)_100%)]" />
          <span className={`absolute bottom-1.5 left-1.5 rounded-md px-1.5 py-0.5 text-[11px] font-semibold shadow-sm md:bottom-2 md:left-2 md:px-2 md:text-xs ${visual.accentClass}`}>
            {visual.label}
          </span>
        </div>

        <div className="min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <h3 className="truncate text-sm font-bold text-foreground sm:text-base">{provider.name}</h3>
                <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[11px] font-semibold text-primary sm:text-xs">{provider.providerType}</span>
              </div>
              <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground sm:text-xs">
                <MapPin className="size-3 shrink-0" aria-hidden="true" />
                {provider.location}
              </p>
            </div>
            <button
              type="button"
              aria-label={saved ? 'Remove from saved providers' : 'Save provider'}
              aria-pressed={saved}
              onClick={toggleSaved}
              className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40 md:hidden"
            >
              <Heart className={saved ? 'size-4 fill-primary text-primary' : 'size-4 text-muted-foreground'} aria-hidden="true" />
            </button>
          </div>

          <p className="mt-2 truncate text-xs font-medium text-foreground sm:text-sm">{provider.highlights[0] ?? provider.programLabel}</p>

          <div className="mt-2 flex flex-wrap items-center gap-1">
            {tags.map((tag) => (
              <span key={tag} className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium text-foreground sm:px-2 sm:text-xs">
                {tag}
              </span>
            ))}
            {detailHref ? (
              <Link href={detailHref} className="ml-auto flex shrink-0 items-center gap-0.5 text-[11px] font-semibold text-primary md:hidden">
                View Details
                <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
              </Link>
            ) : (
              <span className="ml-auto flex shrink-0 items-center gap-0.5 text-[11px] font-medium text-muted-foreground/70 md:hidden">
                Details soon
                <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
              </span>
            )}
          </div>

          <p className="mt-2 hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
            <MonitorPlay className="size-3.5 shrink-0" aria-hidden="true" />
            {provider.modes.join(' & ')} · {provider.courseTypes[0]}
          </p>
        </div>

        <div className="hidden md:flex md:min-h-24 md:flex-col md:items-stretch md:justify-between md:border-l md:pl-3">
          <button
            type="button"
            aria-label={saved ? 'Remove from saved providers' : 'Save provider'}
            aria-pressed={saved}
            onClick={toggleSaved}
            className="ml-auto flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <Heart className={saved ? 'size-4 fill-primary text-primary' : 'size-4 text-muted-foreground'} aria-hidden="true" />
          </button>
          {detailHref ? (
            <Button className="h-9 gap-1 px-3 text-xs sm:text-sm" nativeButton={false} render={<Link href={detailHref} />}>
              View Details
              <ChevronRight className="size-3.5" aria-hidden="true" />
            </Button>
          ) : (
            <Button variant="outline" className="h-9 gap-1 px-3 text-xs sm:text-sm" disabled title="Coming soon">
              View Details
              <ChevronRight className="size-3.5" aria-hidden="true" />
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
