'use client'

import { useEffect, useState } from 'react'
import { FileCheck2, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StudentToolHero } from '@/components/shared/student-tool/student-tool-hero'

 
function ExamArtwork() {
  return (
    <div className="relative hidden h-52 w-120 shrink-0 lg:block" aria-hidden="true">
      <svg viewBox="0 0 240 180" className="absolute bottom-0 left-8 h-48 w-64 drop-shadow-[0_16px_20px_rgba(30,58,138,0.2)]">
        <rect x="40" y="10" width="150" height="160" rx="10" fill="#fff" />
        <rect x="40" y="10" width="150" height="26" rx="10" fill="#1e3a8a" />
        <rect x="52" y="20" width="60" height="7" rx="3.5" fill="#93b4f5" />
        {[52, 86, 120].map((y) => (
          <g key={y}>
            <circle cx="62" cy={y + 12} r="9" fill="#e8effd" />
            <path d={`M57 ${y + 12} l4 4 l7 -8`} fill="none" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="82" y={y + 6} width="90" height="6" rx="3" fill="#dbe6fb" />
            <rect x="82" y={y + 17} width="62" height="6" rx="3" fill="#e8effd" />
          </g>
        ))}
        <g transform="rotate(38 200 120)">
          <rect x="188" y="70" width="14" height="80" rx="3" fill="#f5b53d" />
          <path d="M188 150 h14 l-7 16 Z" fill="#f3d9a4" />
          <rect x="188" y="70" width="14" height="10" rx="3" fill="#1e3a8a" />
        </g>
      </svg>
      <div className="absolute top-4 right-16 flex size-14 items-center justify-center rounded-2xl bg-white/85 text-primary shadow-[0_12px_32px_rgba(30,58,138,0.12)] ring-1 ring-primary/10">
        <FileCheck2 className="size-7" />
      </div>
      <span className="absolute top-2 left-24 text-xl text-cta/70">+</span>
      <span className="absolute right-4 bottom-16 text-xl text-cta/70">+</span>
    </div>
  )
}

export function ExamHero({ query, onSearch }: { query: string; onSearch: (value: string) => void }) {
  const [draft, setDraft] = useState(query)
  useEffect(() => setDraft(query), [query])

  return (
    <StudentToolHero
      eyebrow="Exam Discovery"
      titleLead="Entrance"
      titleAccent="Exams"
      description="Explore entrance exams by course, stream and study goal."
      artwork={<ExamArtwork />}
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
          <Input aria-label="Search exams" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Search exams, e.g. JEE, medical, engineering" className="h-11 border-0 bg-transparent pl-9 text-base shadow-none focus-visible:ring-0 sm:text-sm" />
        </div>
        <Button type="submit" variant="cta" className="h-11 px-5 font-semibold">
          Search
        </Button>
      </form>
    </StudentToolHero>
  )
}
