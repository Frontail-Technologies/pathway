'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Accessibility, ArrowRight, MapPin, Trophy, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { toQueryString } from '@/services/api/catalog'
import { cn } from '@/lib/utils'
import { predictorCategories, predictorExams, predictorQuery, type PredictorCategory, type PredictorExamSlug, type PredictorInput } from '../data/predictor'

type Option = { value: string; label: string }

function Choice<T extends string>({ options, value, onChange, label }: { options: { value: T; label: string }[]; value: T; onChange: (value: T) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="grid grid-cols-2 gap-2">
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              'h-(--field-h) cursor-pointer rounded-lg border text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40',
              active ? 'border-primary bg-primary text-primary-foreground' : 'bg-card text-foreground hover:border-primary/50',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

function IconSelect({ id, icon: Icon, value, onChange, options, placeholder }: { id: string; icon: typeof Users; value: string; onChange: (value: string) => void; options: Option[]; placeholder: string }) {
  return (
    <Select value={value || null} onValueChange={(next) => onChange((next as string | null) ?? '')} items={options}>
      <SelectTrigger id={id} className="w-full gap-2">
        <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <SelectValue placeholder={placeholder} className="flex-1 text-left" />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} side="bottom" align="start" sideOffset={4} className="max-h-72">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function PredictorForm({ initial, states }: { initial: PredictorInput; states: Option[] }) {
  const router = useRouter()
  const [input, setInput] = useState(initial)
  const [rank, setRank] = useState(initial.rank ? String(initial.rank) : '')
  const [error, setError] = useState('')
  const set = <K extends keyof PredictorInput>(key: K, value: PredictorInput[K]) => setInput((current) => ({ ...current, [key]: value }))
  const main = input.exam === 'jee-main'

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const value = Number(rank.replace(/[,\s]/g, ''))
    if (!Number.isInteger(value) || value < 1 || value > 2_000_000) {
      setError('Enter your rank as a whole number, for example 15000.')
      return
    }
    setError('')
    router.push(`/college-predictor${toQueryString(predictorQuery({ ...input, rank: value }))}#results`)
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4 rounded-xl border bg-card p-4 sm:p-5">
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-foreground">Exam</span>
        <Choice label="Exam" options={predictorExams.map((exam) => ({ value: exam.slug, label: exam.label }))} value={input.exam} onChange={(value: PredictorExamSlug) => set('exam', value)} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="predictor-rank">{input.category === 'OPEN' ? `${main ? 'JEE Main' : 'JEE Advanced'} rank (CRL)` : 'Category rank'}</Label>
        <div className="relative">
          <Trophy className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id="predictor-rank"
            inputMode="numeric"
            autoComplete="off"
            placeholder="e.g. 15000"
            value={rank}
            onChange={(event) => setRank(event.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'predictor-rank-error' : undefined}
            className="pl-9"
          />
        </div>
        {error ? (
          <p id="predictor-rank-error" role="alert" className="text-xs text-destructive">
            {error}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="predictor-category">Category</Label>
        <IconSelect id="predictor-category" icon={Users} value={input.category} onChange={(value) => set('category', (value || 'OPEN') as PredictorCategory)} options={predictorCategories} placeholder="Category" />
      </div>

      {main ? (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="predictor-state">Home state</Label>
          <IconSelect id="predictor-state" icon={MapPin} value={input.state} onChange={(value) => set('state', value)} options={states} placeholder="Select your home state" />
        </div>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-foreground">Gender</span>
        <Choice label="Gender" options={[{ value: 'neutral', label: 'Male / other' }, { value: 'female', label: 'Female' }]} value={input.gender} onChange={(value) => set('gender', value)} />
      </div>

      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border px-3 py-2.5">
        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Accessibility className="size-4 text-muted-foreground" aria-hidden="true" />
          Applying under PwD quota
        </span>
        <Switch checked={input.pwd} onCheckedChange={(value) => set('pwd', value)} aria-label="Applying under PwD quota" />
      </label>

      <Button type="submit" variant="cta" size="lg" className="w-full gap-2 font-semibold">
        Predict my colleges
        <ArrowRight className="size-4" aria-hidden="true" />
      </Button>
    </form>
  )
}
