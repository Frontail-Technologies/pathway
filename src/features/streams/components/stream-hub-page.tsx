import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { EnquiryDialog } from '@/features/enquiries/components/enquiry-dialog'
import { SearchResultRow } from '@/features/search/components/search-result-row'
import type { StreamHub } from '../data/stream-hub'
import type { StreamDefinition } from '../data/stream-taxonomy'

const SECTION_PREVIEW = 5

export function StreamHubPage({ hub, otherStreams }: { hub: StreamHub; otherStreams: StreamDefinition[] }) {
  const { stream, sections } = hub
  const Icon = stream.icon
  const predictor = sections.find((section) => section.id === 'tools')?.entries[0]
  const count = (id: string) => sections.find((section) => section.id === id)?.entries.length ?? 0
  const stats = [
    ['courses', 'courses'],
    ['exams', 'exams'],
    ['colleges', 'colleges'],
    ['scholarships', 'scholarships'],
  ]
    .map(([id, noun]) => ({ n: count(id), noun }))
    .filter((stat) => stat.n > 0)

  return (
    <div className="bg-background">
      <section className="bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-blue-dark))] text-white">
        <Container className="px-4 pt-5 pb-7 lg:pt-6 lg:pb-10">
          <div className="[&_a]:text-white/80 [&_li]:text-white/80 [&_span]:text-white">
            <Breadcrumbs items={['Home', stream.name]} />
          </div>
          <div className="mt-5 flex items-start gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/12 sm:size-16">
              <Icon className="size-7 sm:size-8" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h1 className="font-heading text-[26px] leading-tight font-bold sm:text-4xl">{stream.name}</h1>
              <p className="mt-1 text-sm font-medium text-white/80 sm:text-[15px]">{stream.tagline}</p>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-white/85">{stream.description}</p>
          {stats.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {stats.map((stat) => (
                <li key={stat.noun} className="rounded-full bg-white/12 px-3 py-1 text-sm font-medium">
                  {stat.n} {stat.n === 1 ? stat.noun.replace(/s$/, '') : stat.noun}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <EnquiryDialog
              intent="counselling"
              entityName={stream.name}
              description={`Talk to a counsellor about ${stream.name.toLowerCase()} colleges, courses and exams.`}
              trigger={<Button variant="cta" className="h-11 px-6 text-sm font-semibold">Get Free Counselling</Button>}
            />
            {predictor && (
              <Button variant="outline" className="h-11 border-white/40 bg-transparent px-6 text-sm font-semibold text-white hover:bg-white/10 hover:text-white" nativeButton={false} render={<Link href={predictor.href} />}>
                {predictor.title}
              </Button>
            )}
          </div>
        </Container>
      </section>

      <Container className="px-4 py-6 lg:py-8">
        <nav aria-label={`${stream.name} sections`} className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none]">
          <ul className="flex w-max gap-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="block rounded-full border bg-card px-3.5 py-1.5 text-sm font-medium whitespace-nowrap text-foreground outline-none hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40">
                  {section.title.replace(`${stream.name} `, '').replace('Popular ', '')}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-header flex flex-col overflow-hidden rounded-[12px] border bg-card">
              <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
                <h2 id={`${section.id}-title`} className="text-[15px] font-bold text-foreground">
                  {section.title}
                </h2>
                <span className="text-xs font-medium text-muted-foreground">{section.entries.length}</span>
              </div>
              <ul className="flex-1 divide-y">
                {section.entries.slice(0, SECTION_PREVIEW).map((entry) => (
                  <SearchResultRow key={entry.id} entry={entry} />
                ))}
              </ul>
              {section.viewAllHref && (
                <Link href={section.viewAllHref} className="flex h-11 items-center justify-center gap-1 border-t text-sm font-semibold text-primary outline-none hover:bg-secondary/60 focus-visible:bg-secondary">
                  View all {section.title.replace('Popular ', '').toLowerCase()}
                  <ChevronRight className="size-4" aria-hidden="true" />
                </Link>
              )}
            </section>
          ))}
        </div>

        {otherStreams.length > 0 && (
          <section aria-labelledby="other-streams" className="mt-10">
            <h2 id="other-streams" className="font-heading text-xl font-bold text-foreground">
              Explore other streams
            </h2>
            <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {otherStreams.map((other) => {
                const OtherIcon = other.icon
                return (
                  <li key={other.slug}>
                    <Link href={`/${other.slug}`} className="flex h-14 items-center gap-2.5 rounded-[10px] border bg-card px-3.5 text-sm font-semibold text-foreground outline-none transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40">
                      <OtherIcon className="size-4.5 shrink-0 text-primary" aria-hidden="true" />
                      {other.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        )}
      </Container>
    </div>
  )
}
