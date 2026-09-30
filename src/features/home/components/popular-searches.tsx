import Link from 'next/link'

const searches = ['B.Tech', 'MBA', 'MBBS', 'BCA', 'MCA', 'JEE Main', 'NEET', 'CUET']

export function PopularSearchChips() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="shrink-0 text-sm font-semibold text-foreground">Popular:</span>
      {searches.map((search) => (
        <Link key={search} href={`/search?q=${encodeURIComponent(search)}`} className="shrink-0 rounded-full border bg-card/80 px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary">
          {search}
        </Link>
      ))}
    </div>
  )
}
