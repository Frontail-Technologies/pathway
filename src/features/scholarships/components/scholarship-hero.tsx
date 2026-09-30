'use client'

import { useEffect, useState } from 'react'
import { Award, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DiscoveryListingHero } from '@/components/shared/discovery-listing-hero'

 
function ScholarshipArtwork() {
  return (
    <div className="relative hidden h-52 w-104 shrink-0 lg:block" aria-hidden="true">
      <svg viewBox="0 0 200 170" className="absolute bottom-0 left-8 h-44 w-48 drop-shadow-[0_16px_20px_rgba(30,58,138,0.2)]">
        <rect x="20" y="10" width="140" height="100" rx="8" fill="#fff" stroke="#dbe6fb" strokeWidth="2" />
        <circle cx="90" cy="45" r="18" fill="#e8effd" stroke="#93b4f5" strokeWidth="2" />
        <path d="M82 45 88 51 100 39" fill="none" stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="45" y="75" width="90" height="6" rx="3" fill="#dbe6fb" />
        <rect x="60" y="86" width="60" height="6" rx="3" fill="#e8effd" />
        <path d="M75 105 60 145 90 130 100 148 112 106Z" fill="#f5b53d" />
      </svg>
      <div className="absolute top-2 right-14 flex size-14 items-center justify-center rounded-2xl bg-white/85 text-primary shadow-[0_12px_32px_rgba(30,58,138,0.12)] ring-1 ring-primary/10">
        <Award className="size-7" />
      </div>
      <span className="absolute top-4 left-24 text-xl text-cta/70">+</span>
      <span className="absolute right-4 bottom-14 text-xl text-cta/70">+</span>
    </div>
  )
}

export function ScholarshipHero({ query, onSearch }: { query: string; onSearch: (value: string) => void }) {
  const [draft, setDraft] = useState(query)
  useEffect(() => setDraft(query), [query])

  return (
    <DiscoveryListingHero
      eyebrow="Scholarship Discovery"
      titleLead="Find"
      titleAccent="Scholarships"
      description="Find government and private scholarships by eligibility, course, location and benefit."
      artwork={<ScholarshipArtwork />}
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
            aria-label="Search scholarships"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Search scholarships by name or provider"
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
