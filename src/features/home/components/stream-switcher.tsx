'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { FieldArt, type FieldArtName } from '@/components/shared/landing-art'
import { SpotArt, type SpotArtName } from '@/components/shared/spot-art'
import { cn } from '@/lib/utils'

export type StreamEntry = { label: string; hint: string; href: string; icon: keyof typeof icons }
export type StreamPanel = { slug: string; name: string; icon: string; colleges: number; entries: StreamEntry[] }

const icons = { landmark: 'college', book: 'courses', file: 'exam', award: 'scholarship', compass: 'guide', target: 'predictor', chart: 'chart', scale: 'compare', presentation: 'presentation' } satisfies Record<string, SpotArtName>

const streamArt: Record<string, FieldArtName> = { cpu: 'engineering', briefcase: 'business', stethoscope: 'medicine', scale: 'law', 'flask-conical': 'science', flask: 'science', calculator: 'commerce' }

export function StreamSwitcher({ panels }: { panels: StreamPanel[] }) {
  const [active, setActive] = useState(panels[0]?.slug ?? '')
  const panel = panels.find((item) => item.slug === active) ?? panels[0]
  if (!panel) return null

  return (
    <section aria-labelledby="stream-switcher-title" className="relative z-10 -mt-20 pb-8 sm:pb-10 lg:-mt-24 lg:pb-12">
      <div className="container-shell">
        <div className="rounded-2xl border bg-card p-4 shadow-[0_8px_24px_rgba(15,23,42,0.08)] sm:p-6">
          <div className="flex items-baseline justify-between gap-3">
            <h2 id="stream-switcher-title" className="font-heading text-lg font-bold text-foreground sm:text-xl">
              What do you want to study?
            </h2>
            <Link href={`/${panel.slug}`} className="hidden shrink-0 text-sm font-semibold text-primary hover:underline sm:block">
              {panel.name} guide
            </Link>
          </div>
          <div role="tablist" aria-label="Streams" className="mt-4 grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
            {panels.map((item) => {
              const selected = item.slug === panel.slug
              return (
                <button
                  key={item.slug}
                  type="button"
                  role="tab"
                  id={`stream-tab-${item.slug}`}
                  aria-selected={selected}
                  aria-controls={`stream-panel-${item.slug}`}
                  onClick={() => setActive(item.slug)}
                  className={cn(
                    'flex cursor-pointer flex-col items-start gap-2.5 rounded-xl border p-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 sm:p-4',
                    selected ? 'border-primary bg-secondary' : 'bg-card hover:bg-muted/60',
                  )}
                >
                  <FieldArt name={streamArt[item.icon] ?? 'education'} className={cn('size-12 rounded-xl sm:size-14', selected ? 'bg-card' : 'bg-secondary')} />
                  <span>
                    <span className="block text-sm font-bold text-foreground sm:text-[15px]">{item.name}</span>
                    {item.colleges >= 10 ? <span className="block text-xs text-muted-foreground">{item.colleges.toLocaleString('en-IN')} colleges</span> : <span className="block text-xs text-muted-foreground">Courses &amp; exams</span>}
                  </span>
                </button>
              )
            })}
          </div>
          <div role="tabpanel" id={`stream-panel-${panel.slug}`} aria-labelledby={`stream-tab-${panel.slug}`} className="mt-4 grid gap-2.5 border-t pt-4 sm:grid-cols-2 lg:grid-cols-4">
            {panel.entries.map((entry) => {
              return (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className="group flex items-center gap-3 rounded-xl p-2.5 outline-none transition-colors hover:bg-muted/70 focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  <SpotArt name={icons[entry.icon]} className="size-11 rounded-lg" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-semibold text-foreground group-hover:text-primary">{entry.label}</span>
                    <span className="block truncate text-[13px] text-muted-foreground">{entry.hint}</span>
                  </span>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
