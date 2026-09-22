'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type CoachingResultsToolbarProps = {
  query: string
  onSearchChange: (value: string) => void
}

export function CoachingResultsToolbar({
  query,
  onSearchChange,
}: CoachingResultsToolbarProps) {
  const [draftQuery, setDraftQuery] = useState(query)

  useEffect(() => {
    setDraftQuery(query)
  }, [query])

  const submitSearch = () => onSearchChange(draftQuery)

  return (
    <div className="rounded-[12px] border bg-card p-3 shadow-[0_16px_36px_rgba(15,23,42,0.10)] sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            value={draftQuery}
            onChange={(event) => setDraftQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') submitSearch()
            }}
            placeholder="Search by institute, exam, subject or location"
            className="h-12 border-input/70 bg-background pl-9 text-base sm:text-sm"
          />
        </div>
        <Button variant="cta" className="h-12 sm:w-32" onClick={submitSearch}>
          Search
        </Button>
      </div>
    </div>
  )
}
