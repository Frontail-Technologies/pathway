'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, MapPin, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { CompareToggle } from '@/features/compare/components/compare-toggle'
import { cn } from '@/lib/utils'
import { chanceLabel, quotaLabel, type Chance, type Prediction, type PredictionCollege } from '../data/predictor'

const SEATS_SHOWN = 4
const COLLEGES_STEP = 15

const chanceClass: Record<Chance, string> = {
  safe: 'bg-primary text-primary-foreground',
  likely: 'bg-secondary text-primary',
  reach: 'bg-accent text-cta',
}

export function ChancePill({ chance, className }: { chance: Chance; className?: string }) {
  return <span className={cn('inline-flex h-6 shrink-0 items-center rounded-md px-2 text-xs font-semibold whitespace-nowrap', chanceClass[chance], className)}>{chanceLabel[chance]}</span>
}

const branchName = (program: string) => program.replace(/\s*\(.*\)\s*$/, '')
const programNote = (program: string) => program.match(/\(([^)]*)\)\s*$/)?.[1] ?? ''

function CollegeResult({ college }: { college: PredictionCollege }) {
  const [open, setOpen] = useState(false)
  const seats = open ? college.seats : college.seats.slice(0, SEATS_SHOWN)
  const place = [college.city, college.state].filter(Boolean).join(', ')
  return (
    <li className="rounded-xl border bg-card">
      <div className="flex flex-wrap items-start justify-between gap-3 p-4 sm:px-5">
        <div className="min-w-0">
          <Link href={`/college/${college.slug}`} className="text-base font-semibold text-foreground outline-none hover:text-primary focus-visible:text-primary">
            {college.name}
          </Link>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted-foreground">
            {place ? (
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5" aria-hidden="true" />
                {place}
              </span>
            ) : null}
            {college.nirfRank ? <span>NIRF #{college.nirfRank}</span> : null}
            <span>
              {college.seats.length} {college.seats.length === 1 ? 'branch' : 'branches'}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <CompareToggle college={{ slug: college.slug, name: college.name, shortName: college.name, location: place }} />
          <ChancePill chance={college.bestChance} />
        </div>
      </div>

      <div className="overflow-x-auto border-t">
        <table className="w-full min-w-[34rem] text-sm">
          <thead className="bg-muted/50 text-left text-xs text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-2 font-medium sm:px-5">Branch</th>
              <th scope="col" className="px-3 py-2 font-medium">Quota</th>
              <th scope="col" className="px-3 py-2 text-right font-medium">Opening</th>
              <th scope="col" className="px-3 py-2 text-right font-medium">Closing</th>
              <th scope="col" className="px-4 py-2 text-right font-medium sm:px-5">Chance</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {seats.map((seat) => (
              <tr key={`${seat.program}-${seat.quota}-${seat.gender}`}>
                <td className="px-4 py-2.5 sm:px-5">
                  <span className="font-medium text-foreground">{branchName(seat.program)}</span>
                  <span className="block text-xs text-muted-foreground">
                    {[programNote(seat.program), seat.gender === 'female' ? 'Female-only seat' : ''].filter(Boolean).join(' · ')}
                  </span>
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap text-muted-foreground">{quotaLabel[seat.quota] ?? seat.quota}</td>
                <td className="px-3 py-2.5 text-right text-muted-foreground tabular-nums">{seat.openingRank.toLocaleString('en-IN')}</td>
                <td className="px-3 py-2.5 text-right font-semibold text-foreground tabular-nums">{seat.closingRank.toLocaleString('en-IN')}</td>
                <td className="px-4 py-2.5 text-right sm:px-5">
                  <ChancePill chance={seat.chance} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {college.seats.length > SEATS_SHOWN ? (
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex w-full cursor-pointer items-center justify-center gap-1 border-t py-2.5 text-sm font-semibold text-primary outline-none hover:bg-muted/40 focus-visible:bg-muted"
        >
          {open ? 'Show fewer branches' : `Show all ${college.seats.length} branches`}
          <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} aria-hidden="true" />
        </button>
      ) : null}
    </li>
  )
}

export function PredictorResults({ prediction }: { prediction: Prediction }) {
  const [chance, setChance] = useState<Chance | 'all'>('all')
  const [query, setQuery] = useState('')
  const [shown, setShown] = useState(COLLEGES_STEP)

  const colleges = useMemo(() => {
    const term = query.trim().toLowerCase()
    return prediction.colleges
      .map((college) => ({ ...college, seats: college.seats.filter((seat) => (chance === 'all' || seat.chance === chance) && (!term || seat.program.toLowerCase().includes(term) || college.name.toLowerCase().includes(term))) }))
      .filter((college) => college.seats.length)
      .map((college) => ({ ...college, bestChance: college.seats[0]!.chance }))
  }, [prediction, chance, query])

  const filters: { value: Chance | 'all'; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: prediction.counts.safe + prediction.counts.likely + prediction.counts.reach },
    { value: 'safe', label: chanceLabel.safe, count: prediction.counts.safe },
    { value: 'likely', label: chanceLabel.likely, count: prediction.counts.likely },
    { value: 'reach', label: chanceLabel.reach, count: prediction.counts.reach },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="radiogroup" aria-label="Filter by chance" className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              role="radio"
              aria-checked={chance === filter.value}
              onClick={() => {
                setChance(filter.value)
                setShown(COLLEGES_STEP)
              }}
              className={cn(
                'h-9 shrink-0 cursor-pointer rounded-full border px-3.5 text-sm font-medium whitespace-nowrap outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40',
                chance === filter.value ? 'border-primary bg-primary text-primary-foreground' : 'bg-card text-foreground hover:border-primary/50',
              )}
            >
              {filter.label} <span className={chance === filter.value ? 'text-primary-foreground/80' : 'text-muted-foreground'}>{filter.count}</span>
            </button>
          ))}
        </div>
        <div className="relative sm:w-64">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search branch or college" aria-label="Search branch or college" className="pl-9" />
        </div>
      </div>

      {colleges.length ? (
        <ul className="flex flex-col gap-3">
          {colleges.slice(0, shown).map((college) => (
            <CollegeResult key={college.slug} college={college} />
          ))}
        </ul>
      ) : (
        <p className="rounded-xl border bg-card p-6 text-center text-sm text-muted-foreground">No branches match these filters.</p>
      )}

      {colleges.length > shown ? (
        <button type="button" onClick={() => setShown((value) => value + COLLEGES_STEP)} className="h-11 cursor-pointer rounded-lg border bg-card text-sm font-semibold text-primary outline-none hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-primary/40">
          Show more colleges ({colleges.length - shown} left)
        </button>
      ) : null}
    </div>
  )
}
