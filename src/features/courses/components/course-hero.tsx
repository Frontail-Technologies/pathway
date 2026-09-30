'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DiscoveryListingHero } from '@/components/shared/discovery-listing-hero'

 
function CourseArtwork() {
  return (
    <div className="relative hidden h-52 w-104 shrink-0 lg:block" aria-hidden="true">
      <svg viewBox="0 0 220 170" className="absolute bottom-0 left-6 h-40 w-56 drop-shadow-[0_16px_20px_rgba(30,58,138,0.2)]">
        <path d="M20 30c30-14 60-14 90 0v100c-30-14-60-14-90 0Z" fill="#fff" stroke="#dbe6fb" strokeWidth="2" />
        <path d="M200 30c-30-14-60-14-90 0v100c30-14 60-14 90 0Z" fill="#fff" stroke="#dbe6fb" strokeWidth="2" />
        {[0, 1, 2].map((row) => (
          <g key={row}>
            <rect x="34" y={46 + row * 20} width="62" height="6" rx="3" fill="#dbe6fb" />
            <rect x="126" y={46 + row * 20} width="62" height="6" rx="3" fill="#e8effd" />
          </g>
        ))}
        <rect x="106" y="20" width="8" height="112" fill="#1e3a8a" />
      </svg>
      <div className="absolute top-2 right-16 flex size-14 items-center justify-center rounded-2xl bg-white/85 text-primary shadow-[0_12px_32px_rgba(30,58,138,0.12)] ring-1 ring-primary/10">
        <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10 12 5 2 10l10 5 10-5Z" />
          <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
        </svg>
      </div>
      <span className="absolute top-4 left-24 text-xl text-cta/70">+</span>
      <span className="absolute right-6 bottom-16 text-xl text-cta/70">+</span>
    </div>
  )
}

export function CourseHero({ query, onSearch }: { query: string; onSearch: (value: string) => void }) {
  const [draft, setDraft] = useState(query)
  useEffect(() => setDraft(query), [query])

  return (
    <DiscoveryListingHero
      eyebrow="Course Discovery"
      titleLead="Explore"
      titleAccent="Courses"
      description="Discover courses by field, study level, duration and career direction."
      artwork={<CourseArtwork />}
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
            aria-label="Search courses"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Search courses by name, degree or specialization"
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
