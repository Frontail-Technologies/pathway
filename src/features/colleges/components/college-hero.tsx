'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DiscoveryListingHero } from '@/components/shared/discovery-listing-hero'

 
function CollegeArtwork() {
  return (
    <div className="relative hidden h-52 w-104 shrink-0 lg:block" aria-hidden="true">
      <svg viewBox="0 0 220 170" className="absolute bottom-0 left-6 h-46 w-56 drop-shadow-[0_16px_20px_rgba(30,58,138,0.2)]">
        <rect x="30" y="70" width="160" height="90" rx="6" fill="#fff" />
        <polygon points="30,70 110,25 190,70" fill="#1e3a8a" />
        <rect x="100" y="45" width="20" height="16" rx="2" fill="#93b4f5" />
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => <rect key={`${row}-${col}`} x={48 + col * 32} y={90 + row * 22} width="16" height="14" rx="2" fill="#dbe6fb" />),
        )}
        <rect x="98" y="130" width="24" height="30" rx="2" fill="#1d4ed8" />
      </svg>
      <div className="absolute top-4 right-14 flex size-14 items-center justify-center rounded-2xl bg-white/85 text-primary shadow-[0_12px_32px_rgba(30,58,138,0.12)] ring-1 ring-primary/10">
        <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10 12 5 2 10l10 5 10-5Z" />
          <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
        </svg>
      </div>
      <span className="absolute top-2 left-20 text-xl text-cta/70">+</span>
      <span className="absolute right-6 bottom-14 text-xl text-cta/70">+</span>
    </div>
  )
}

export function CollegeHero({ query, onSearch }: { query: string; onSearch: (value: string) => void }) {
  const [draft, setDraft] = useState(query)
  useEffect(() => setDraft(query), [query])

  return (
    <DiscoveryListingHero
      eyebrow="College Discovery"
      titleLead="Explore"
      titleAccent="Colleges"
      description="Discover colleges by course, location, exams and study preferences."
      artwork={<CollegeArtwork />}
    >
      <form
        role="search"
        className="mt-4 flex max-w-xl items-center gap-2 rounded-[12px] border bg-card p-1.5 shadow-[0_10px_30px_rgba(30,58,138,0.08)]"
        onSubmit={(event) => {
          event.preventDefault()
          onSearch(draft)
        }}
      >
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            aria-label="Search colleges"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Search colleges by name, city or course"
            className="h-11 border-0 bg-transparent pl-9 text-base shadow-none focus-visible:ring-0 sm:text-sm"
          />
        </div>
        <Button type="submit" variant="cta" className="h-11 px-5 font-semibold">
          Search
        </Button>
      </form>
    </DiscoveryListingHero>
  )
}
