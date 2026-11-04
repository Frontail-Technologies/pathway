import Link from 'next/link'
import { Award, BookOpen, ChevronRight, FileText, Landmark, Search } from 'lucide-react'
import { SearchResultRow } from './search-result-row'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/container'
import { popularSearches, searchKinds, searchLocalEntries, type SearchKind } from '../data/search-index'
import { searchCatalog } from '../api/catalog-search'

const GROUP_PREVIEW = 4

function searchHref(q: string, type?: SearchKind) {
  const params = new URLSearchParams({ q })
  if (type) params.set('type', type)
  return `/search?${params.toString()}`
}

function SuggestionChips({ title }: { title: string }) {
  return (
    <div>
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {popularSearches.map((term) => (
          <Link key={term} href={searchHref(term)} className="rounded-full border bg-card px-3.5 py-2 text-sm font-medium text-foreground outline-none transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40">
            {term}
          </Link>
        ))}
      </div>
    </div>
  )
}

export async function SearchResultsPage({ query, type }: { query: string; type?: SearchKind }) {
  const local = query ? searchLocalEntries(query) : []
  const catalog = query ? await searchCatalog(query, { type, perKind: GROUP_PREVIEW }) : { entries: [], counts: new Map<SearchKind, number>(), failed: [] }
  const results = [...catalog.entries, ...local]
  const counts = new Map<SearchKind, number>(catalog.counts)
  for (const entry of local) counts.set(entry.kind, (counts.get(entry.kind) ?? 0) + 1)
  const totalCount = [...counts.values()].reduce((sum, value) => sum + value, 0)
  const activeType = type && counts.has(type) ? type : undefined
  const visibleKinds = searchKinds.filter(({ kind }) => counts.has(kind))

  return (
    <Container className="px-4 py-5 lg:py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">{query ? <>Results for &ldquo;{query}&rdquo;</> : 'Search Pathway'}</h1>

        <form action="/search" role="search" className="mt-4 flex h-12 items-center gap-2 rounded-[12px] border bg-card pr-1 pl-3.5 transition-colors focus-within:border-primary">
          <Search className="size-4.5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input name="q" type="search" defaultValue={query} autoFocus={!query} enterKeyHint="search" aria-label="Search colleges, courses, exams and more" placeholder="Colleges, courses, exams…" className="h-full min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground" />
          <Button type="submit" variant="cta" className="h-10 px-5 text-sm font-semibold">
            Search
          </Button>
        </form>

        {!query && (
          <div className="mt-8 flex flex-col gap-8">
            <SuggestionChips title="Popular searches" />
            <div>
              <p className="text-sm font-semibold text-foreground">Browse by category</p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { label: 'Colleges', href: '/colleges', icon: Landmark },
                  { label: 'Courses', href: '/courses', icon: BookOpen },
                  { label: 'Exams', href: '/exams', icon: FileText },
                  { label: 'Scholarships', href: '/scholarships', icon: Award },
                ].map(({ label, href, icon: Icon }) => (
                  <Link key={href} href={href} className="flex h-14 items-center gap-2.5 rounded-[10px] border bg-card px-3.5 text-sm font-semibold text-foreground outline-none transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40">
                    <Icon className="size-4.5 text-primary" aria-hidden="true" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {query && catalog.failed.length > 0 && (
          <p role="alert" className="mt-4 rounded-[10px] border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-foreground">
            Some results couldn&apos;t be loaded right now. Please try again in a moment.
          </p>
        )}

        {query && results.length === 0 && catalog.failed.length === 0 && (
          <div className="mt-8 flex flex-col gap-8">
            <div className="rounded-[12px] border border-dashed bg-card p-6 text-center">
              <p className="font-heading font-bold text-foreground">No matches for &ldquo;{query}&rdquo;</p>
              <p className="mt-1 text-sm text-muted-foreground">Check the spelling, try a shorter term, or ask a counsellor for help.</p>
              <Button variant="outline" className="mt-4 h-10 px-5 text-sm font-semibold" nativeButton={false} render={<Link href="/counselling" />}>
                Get Free Counselling
              </Button>
            </div>
            <SuggestionChips title="Try a popular search" />
          </div>
        )}

        {results.length > 0 && (
          <>
            <nav aria-label="Filter results by type" className="-mx-4 mt-4 overflow-x-auto px-4">
              <div className="flex w-max gap-2">
                <Link href={searchHref(query)} aria-current={!activeType ? 'page' : undefined} className={`rounded-full border px-3.5 py-1.5 text-sm font-medium whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${!activeType ? 'border-primary bg-primary text-primary-foreground' : 'bg-card text-foreground hover:border-primary'}`}>
                  All · {totalCount}
                </Link>
                {visibleKinds.map(({ kind, plural }) => (
                  <Link key={kind} href={searchHref(query, kind)} aria-current={activeType === kind ? 'page' : undefined} className={`rounded-full border px-3.5 py-1.5 text-sm font-medium whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${activeType === kind ? 'border-primary bg-primary text-primary-foreground' : 'bg-card text-foreground hover:border-primary'}`}>
                    {plural} · {counts.get(kind)}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="mt-5 flex flex-col gap-5">
              {(activeType ? visibleKinds.filter(({ kind }) => kind === activeType) : visibleKinds).map(({ kind, plural }) => {
                const group = results.filter((entry) => entry.kind === kind)
                const shown = activeType ? group : group.slice(0, GROUP_PREVIEW)
                const groupTotal = counts.get(kind) ?? group.length
                return (
                  <section key={kind} aria-labelledby={`results-${kind}`} className="overflow-hidden rounded-[12px] border bg-card">
                    <h2 id={`results-${kind}`} className="border-b px-4 py-3 text-sm font-bold text-foreground">
                      {plural}
                    </h2>
                    <ul className="divide-y">
                      {shown.map((entry) => (
                        <SearchResultRow key={entry.id} entry={entry} />
                      ))}
                    </ul>
                    {shown.length < groupTotal && !activeType && (
                      <Link href={searchHref(query, kind)} className="flex h-11 items-center justify-center gap-1 border-t text-sm font-semibold text-primary outline-none hover:bg-secondary/60 focus-visible:bg-secondary">
                        See all {groupTotal} {plural.toLowerCase()}
                        <ChevronRight className="size-4" aria-hidden="true" />
                      </Link>
                    )}
                  </section>
                )
              })}
            </div>
          </>
        )}
      </div>
    </Container>
  )
}
