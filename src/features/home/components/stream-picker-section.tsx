import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getPublishedStreams } from '@/features/streams/data/stream-hub'

/** Stream-first entry point (Shiksha-style): one tile per published stream hub. */
export function StreamPickerSection() {
  const streams = getPublishedStreams()
  if (streams.length === 0) return null
  return (
    <section aria-labelledby="stream-picker-title" className="bg-background pt-7 sm:pt-9 lg:pt-12">
      <div className="container-shell">
        <h2 id="stream-picker-title" className="font-heading text-xl font-bold text-foreground sm:text-2xl">
          What do you want to study?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">Pick a stream to see its colleges, courses, exams and scholarships.</p>
        <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
          {streams.map((stream) => {
            const Icon = stream.icon
            return (
              <li key={stream.slug}>
                <Link href={`/${stream.slug}`} className="group flex h-full items-center gap-3 rounded-[12px] border bg-card p-3.5 outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40 active:bg-secondary lg:flex-col lg:items-start lg:gap-2.5 lg:p-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-foreground group-hover:text-primary">{stream.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">{stream.tagline}</span>
                  </span>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground/60 lg:hidden" aria-hidden="true" />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
