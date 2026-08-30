import Link from 'next/link'

const searches = ['B.Tech', 'MBA', 'MBBS', 'BCA', 'MCA', 'JEE Main', 'NEET', 'CUET']

export function PopularSearches() { return <section className="container-shell px-4 py-4 sm:py-5"><div className="flex flex-wrap items-center gap-2 sm:gap-3"><span className="shrink-0 text-sm font-semibold text-foreground">Popular Searches:</span>{searches.map((search) => <Link key={search} href={`/search?q=${encodeURIComponent(search)}`} className="shrink-0 rounded-md border bg-card px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary">{search}</Link>)}</div></section> }
