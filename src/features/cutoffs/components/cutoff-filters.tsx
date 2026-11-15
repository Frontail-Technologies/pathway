'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { cutoffSearch, type CutoffFilters as Filters } from '../api/cutoffs-api'

type Option = { value: string; label: string }

const ALL = '__all__'

function Picker({ id, label, value, onChange, options }: { id: string; label: string; value: string; onChange: (value: string) => void; options: Option[] }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={(next) => onChange((next as string | null) ?? options[0]!.value)} items={options}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue className="truncate" />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false} side="bottom" align="start" sideOffset={4} className="max-h-72">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export function CutoffFilters({ initial, institutes }: { initial: Filters; institutes: { slug: string; name: string }[] }) {
  const router = useRouter()
  const [filters, setFilters] = useState(initial)
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => setFilters((current) => ({ ...current, [key]: value }))
  const apply = (next: Filters) => router.push(`/cutoffs?${cutoffSearch({ ...next, page: 1 })}`)
  const submit = (event: FormEvent) => {
    event.preventDefault()
    apply(filters)
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 rounded-xl border bg-card p-4 sm:p-5">
      <div role="radiogroup" aria-label="Exam" className="flex gap-2">
        {(['jee-main', 'jee-advanced'] as const).map((exam) => (
          <button
            key={exam}
            type="button"
            role="radio"
            aria-checked={filters.exam === exam}
            onClick={() => apply({ ...filters, exam, institute: '', quota: '' })}
            className={cn(
              'h-10 cursor-pointer rounded-lg border px-4 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40',
              filters.exam === exam ? 'border-primary bg-primary text-primary-foreground' : 'bg-card text-foreground hover:border-primary/50',
            )}
          >
            {exam === 'jee-main' ? 'JEE Main (NITs, IIITs, GFTIs)' : 'JEE Advanced (IITs)'}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <div className="flex flex-col gap-1.5 lg:col-span-2">
          <Label htmlFor="cutoff-q">Branch</Label>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input id="cutoff-q" value={filters.q} onChange={(event) => set('q', event.target.value)} placeholder="e.g. Computer Science" className="pl-9" />
          </div>
        </div>
        <div className="lg:col-span-2">
          <Picker id="cutoff-institute" label="Institute" value={filters.institute || ALL} onChange={(value) => set('institute', value === ALL ? '' : value)} options={[{ value: ALL, label: 'All institutes' }, ...institutes.map((institute) => ({ value: institute.slug, label: institute.name }))]} />
        </div>
        <Picker id="cutoff-category" label="Category" value={filters.category} onChange={(value) => set('category', value)} options={[{ value: 'OPEN', label: 'General (OPEN)' }, { value: 'EWS', label: 'EWS' }, { value: 'OBC-NCL', label: 'OBC-NCL' }, { value: 'SC', label: 'SC' }, { value: 'ST', label: 'ST' }]} />
        <Picker
          id="cutoff-quota"
          label="Quota"
          value={filters.quota || ALL}
          onChange={(value) => set('quota', value === ALL ? '' : value)}
          options={[{ value: ALL, label: 'All quotas' }, { value: 'AI', label: 'All India' }, ...(filters.exam === 'jee-main' ? [{ value: 'HS', label: 'Home state' }, { value: 'OS', label: 'Other state' }] : [])]}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <div role="radiogroup" aria-label="Seat type" className="flex gap-2">
            {(
              [
                ['neutral', 'Gender-neutral seats'],
                ['female', 'Female-only seats'],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={filters.gender === value}
                onClick={() => set('gender', value)}
                className={cn(
                  'h-9 cursor-pointer rounded-full border px-3.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40',
                  filters.gender === value ? 'border-primary bg-secondary text-primary' : 'bg-card text-foreground hover:border-primary/50',
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-foreground">
            <Switch checked={filters.pwd} onCheckedChange={(value) => set('pwd', value)} aria-label="PwD seats" />
            PwD seats
          </label>
        </div>
        <Button type="submit" variant="cta" className="font-semibold sm:w-auto">
          Show cutoffs
        </Button>
      </div>
    </form>
  )
}
