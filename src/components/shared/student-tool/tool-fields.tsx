'use client'

import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function Field({ label, required, hint, error, htmlFor, children }: { label: string; required?: boolean; hint?: string; error?: string; htmlFor?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {children}
      {error ? (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : (
        hint && <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  )
}

export function OptionSelect({ value, onChange, options, placeholder, invalid }: { value: string; onChange: (value: string) => void; options: string[]; placeholder: string; invalid?: boolean }) {
  return (
    <Select value={value || undefined} onValueChange={(next) => onChange(next ?? '')} items={options.map((option) => ({ value: option, label: option }))}>
      <SelectTrigger className="h-10 w-full border-border bg-muted/40 hover:bg-muted/60" aria-invalid={invalid}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} side="bottom" align="start" sideOffset={4}>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

 
export function ChipGroup({ options, selected, onToggle, ariaLabel }: { options: string[]; selected: string[]; onToggle: (option: string) => void; ariaLabel: string }) {
  return (
    <div role="group" aria-label={ariaLabel} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = selected.includes(option)
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onToggle(option)}
            className={`min-h-9 cursor-pointer rounded-full border px-3.5 text-sm transition-colors ${
              active ? 'border-primary bg-primary/10 font-medium text-primary' : 'border-border bg-card text-foreground hover:border-primary/40'
            }`}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

 
export function SegmentedChoice<T extends string>({ options, value, onChange, ariaLabel }: { options: T[]; value: T | ''; onChange: (value: T) => void; ariaLabel: string }) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option === value
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option)}
            className={`min-h-10 flex-1 cursor-pointer rounded-lg border px-4 text-sm transition-colors sm:flex-none ${
              active ? 'border-primary bg-primary/10 font-medium text-primary' : 'border-border bg-card text-foreground hover:border-primary/40'
            }`}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

export const softInputClass = 'h-10 border-border bg-muted/40'

export function StepHeading({ title, helper }: { title: string; helper: string }) {
  return (
    <div>
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{helper}</p>
    </div>
  )
}
