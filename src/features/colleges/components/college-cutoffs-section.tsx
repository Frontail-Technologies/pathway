'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { FilterPill } from '@/components/shared/filter-toolbar'
import { SourceNote } from '@/components/shared/source-note'
import { Button } from '@/components/ui/button'
import type { CollegeCutoffSet, CollegeDetailData } from '../data/college-detail'

const VISIBLE = 12

const quotaLabel: Record<string, string> = { AI: 'All India', HS: 'Home state', OS: 'Other state', GO: 'Goa', JK: 'J&K', LA: 'Ladakh' }

export const shortProgram = (label: string) => label.replace(/\s*\((\d+) Years?,\s*([^)]*)\)\s*$/i, (_match, years: string, degree: string) => ` · ${years} yr ${degree.replace(/Bachelor of Technology/i, 'B.Tech').replace(/Bachelor and Master of Technology \(Dual Degree\)/i, 'Dual degree').replace(/Bachelor of Science/i, 'B.Sc').replace(/Bachelor of Architecture/i, 'B.Arch')}`)

const setKey = (set: CollegeCutoffSet) => `${set.exam}-${set.year}-${set.round ?? 'final'}`

export function CutoffTable({ set, limit, query = '' }: { set: CollegeCutoffSet; limit?: number; query?: string }) {
  const rows = (query ? set.rows.filter((row) => row.program.toLowerCase().includes(query.toLowerCase())) : set.rows).slice(0, limit)
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-muted/60 text-left text-xs text-muted-foreground">
          <tr>
            <th scope="col" className="px-4 py-2.5 font-medium">Programme</th>
            <th scope="col" className="hidden px-3 py-2.5 font-medium sm:table-cell">Quota</th>
            <th scope="col" className="px-3 py-2.5 text-right font-medium">Opening</th>
            <th scope="col" className="px-4 py-2.5 text-right font-medium">Closing</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((row, index) => (
            <tr key={`${row.program}-${row.quota}-${index}`}>
              <td className="px-4 py-3">
                <span className="font-medium text-foreground">{shortProgram(row.program)}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground sm:hidden">{quotaLabel[row.quota] ?? row.quota}</span>
              </td>
              <td className="hidden px-3 py-3 text-muted-foreground sm:table-cell">{quotaLabel[row.quota] ?? row.quota}</td>
              <td className="px-3 py-3 text-right text-muted-foreground tabular-nums">{row.opening?.toLocaleString('en-IN') ?? '—'}</td>
              <td className="px-4 py-3 text-right font-semibold text-foreground tabular-nums">{row.closing?.toLocaleString('en-IN') ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 ? <p className="px-4 py-6 text-center text-sm text-muted-foreground">No programmes match.</p> : null}
    </div>
  )
}

export function CollegeCutoffsSection({ college }: { college: CollegeDetailData }) {
  const sets = useMemo(() => college.cutoffs ?? [], [college.cutoffs])
  const [active, setActive] = useState(sets[0] ? setKey(sets[0]) : '')
  const [expanded, setExpanded] = useState(false)
  const [query, setQuery] = useState('')
  const set = sets.find((item) => setKey(item) === active) ?? sets[0]
  if (!set) return null

  return (
    <section id="cutoffs" className="scroll-mt-section rounded-xl border bg-card p-4 sm:p-6">
      <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">{college.name} Cutoffs</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Opening and closing ranks, gender-neutral seats, open category · {set.examLabel} {set.year}
        {set.round ? `, round ${set.round}` : ''}
      </p>

      {sets.length > 1 ? (
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Cutoff year and round">
          {sets.map((item) => (
            <FilterPill
              key={setKey(item)}
              active={setKey(item) === setKey(set)}
              onClick={() => {
                setActive(setKey(item))
                setExpanded(false)
              }}
            >
              {item.examLabel} {item.year}
              {item.round ? ` · R${item.round}` : ''}
            </FilterPill>
          ))}
        </div>
      ) : null}

      {set.rows.length > VISIBLE ? (
        <label className="mt-4 flex h-10 max-w-sm items-center gap-2 rounded-lg border bg-card px-3 focus-within:border-primary">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a branch" aria-label="Find a branch" className="h-full min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground sm:text-sm" />
        </label>
      ) : null}

      <div className="mt-4">
        <CutoffTable set={set} limit={expanded || query ? undefined : VISIBLE} query={query} />
      </div>
      {set.rows.length > VISIBLE && !query ? (
        <Button variant="outline" className="mt-3" onClick={() => setExpanded((value) => !value)}>
          {expanded ? 'Show fewer' : `Show all ${set.rows.length} programmes`}
        </Button>
      ) : null}
      <SourceNote className="mt-3" source="JoSAA" year={set.year} href="https://josaa.nic.in" note="Ranks are indicative for the next session" />
    </section>
  )
}
