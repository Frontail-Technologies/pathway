import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, X } from 'lucide-react'
import {
  providerTypes,
  scholarshipTypes,
  educationLevels,
  genderOptions,
  incomeLimitOptions,
} from '../../shared/scholarship-constants'
import {
  type ProviderType,
  type ScholarshipType,
  type EducationLevel,
  type GenderEligibility,
  type IncomeLimitBucket,
} from '@/features/scholarships/data/scholarships'

export function ScholarshipIdentitySection({
  name,
  setName,
  provider,
  setProvider,
  providerType,
  setProviderType,
  providerInitials,
  setProviderInitials,
  scholarshipType,
  setScholarshipType,
  selectedLevels,
  onToggleLevel,
  streams,
  newStreamInput,
  setNewStreamInput,
  onAddStream,
  onRemoveStream,
  states,
  newStateInput,
  setNewStateInput,
  onAddState,
  onRemoveState,
  categories,
  newCategoryInput,
  setNewCategoryInput,
  onAddCategory,
  onRemoveCategory,
  genderEligibility,
  setGenderEligibility,
  incomeLimitBucket,
  setIncomeLimitBucket,
  overviewCopy,
  setOverviewCopy,
  errors,
}: {
  name: string
  setName: (v: string) => void
  provider: string
  setProvider: (v: string) => void
  providerType: ProviderType
  setProviderType: (v: ProviderType) => void
  providerInitials: string
  setProviderInitials: (v: string) => void
  scholarshipType: ScholarshipType
  setScholarshipType: (v: ScholarshipType) => void
  selectedLevels: EducationLevel[]
  onToggleLevel: (lvl: EducationLevel) => void
  streams: string[]
  newStreamInput: string
  setNewStreamInput: (v: string) => void
  onAddStream: () => void
  onRemoveStream: (s: string) => void
  states: string[]
  newStateInput: string
  setNewStateInput: (v: string) => void
  onAddState: () => void
  onRemoveState: (s: string) => void
  categories: string[]
  newCategoryInput: string
  setNewCategoryInput: (v: string) => void
  onAddCategory: () => void
  onRemoveCategory: (c: string) => void
  genderEligibility: GenderEligibility
  setGenderEligibility: (v: GenderEligibility) => void
  incomeLimitBucket: IncomeLimitBucket | 'none'
  setIncomeLimitBucket: (v: IncomeLimitBucket | 'none') => void
  overviewCopy: string
  setOverviewCopy: (v: string) => void
  errors: Record<string, string>
}) {
  return (
    <section id="identity" className="rounded-xl border border-border bg-card shadow-sm p-5 sm:p-6 space-y-5 scroll-mt-20">
      <h2 className="text-[15px] font-semibold text-foreground">
        Basics
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1 sm:col-span-2">
            <label className="text-sm font-medium text-foreground">
              Name <span className="text-destructive">*</span>
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. AICTE Pragati Scholarship for Girls"
              className={`text-sm ${errors.name ? 'border-destructive' : ''}`}
            />
            {errors.name && (
              <span className="text-[13px] text-destructive block">{errors.name}</span>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">
              Provider <span className="text-destructive">*</span>
            </label>
            <Input
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              placeholder="e.g. Government of India / AICTE / Reliance Foundation"
              className={`text-sm ${errors.provider ? 'border-destructive' : ''}`}
            />
            {errors.provider && (
              <span className="text-[13px] text-destructive block">{errors.provider}</span>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">
              Provider type
            </label>
            <Select
              items={providerTypes}
              value={providerType}
              onValueChange={(val) => setProviderType(val as ProviderType)}
            >
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Select provider type" />
              </SelectTrigger>
              <SelectContent>
                {providerTypes.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">
              Provider initials
            </label>
            <Input
              value={providerInitials}
              onChange={(e) => setProviderInitials(e.target.value.toUpperCase())}
              placeholder="e.g. AICTE / GOI / DST"
              className="text-sm"
              maxLength={6}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">
              Scholarship type
            </label>
            <Select
              items={scholarshipTypes}
              value={scholarshipType}
              onValueChange={(val) => setScholarshipType(val as ScholarshipType)}
            >
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Select scholarship type" />
              </SelectTrigger>
              <SelectContent>
                {scholarshipTypes.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div id="provider" className="space-y-2 pt-2 border-t border-border/60 scroll-mt-20">
          <label className="text-sm font-medium text-foreground block">
            Study levels
          </label>
          <div className="flex flex-wrap gap-2">
            {educationLevels.map((lvl) => {
              const selected = selectedLevels.includes(lvl.value)
              return (
                <button
                  key={lvl.value}
                  type="button"
                  onClick={() => onToggleLevel(lvl.value)}
                  aria-pressed={selected}
                  className={`text-sm px-3 py-1.5 rounded-md font-medium transition-colors border ${
                    selected
                      ? 'bg-accent text-accent-foreground border-primary/50'
                      : 'bg-card text-foreground border-border hover:bg-muted'
                  }`}
                >
                  {lvl.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border/60">
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">
              Gender
            </label>
            <Select
              items={genderOptions}
              value={genderEligibility}
              onValueChange={(val) => setGenderEligibility(val as GenderEligibility)}
            >
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Gender eligibility" />
              </SelectTrigger>
              <SelectContent>
                {genderOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">
              Family income limit
            </label>
            <Select
              items={[{ value: 'none', label: 'No limit' }, ...incomeLimitOptions]}
              value={incomeLimitBucket}
              onValueChange={(val) => setIncomeLimitBucket(val as any)}
            >
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Income limit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No limit</SelectItem>
                {incomeLimitOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t border-border/60">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Streams (optional)
            </label>
            <div className="flex gap-2">
              <Input
                value={newStreamInput}
                onChange={(e) => setNewStreamInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    onAddStream()
                  }
                }}
                placeholder="e.g. Engineering / Science / Medical"
                className="text-sm flex-1"
              />
              <Button type="button" variant="outline" size="sm" onClick={onAddStream} className="text-sm">
                <Plus className="w-3.5 h-3.5 mr-1" />
                Add
              </Button>
            </div>
            {streams.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {streams.map((s) => (
                  <Badge key={s} variant="secondary" className="text-sm gap-1 bg-muted px-2 py-0.5">
                    {s}
                    <button type="button" onClick={() => onRemoveStream(s)} className="hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              States (optional)
            </label>
            <div className="flex gap-2">
              <Input
                value={newStateInput}
                onChange={(e) => setNewStateInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    onAddState()
                  }
                }}
                placeholder="e.g. Maharashtra / Karnataka / Uttar Pradesh"
                className="text-sm flex-1"
              />
              <Button type="button" variant="outline" size="sm" onClick={onAddState} className="text-sm">
                <Plus className="w-3.5 h-3.5 mr-1" />
                Add
              </Button>
            </div>
            {states.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {states.map((st) => (
                  <Badge key={st} variant="secondary" className="text-sm gap-1 bg-muted px-2 py-0.5">
                    {st}
                    <button type="button" onClick={() => onRemoveState(st)} className="hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-1 pt-2 border-t border-border/60">
          <label className="text-sm font-medium text-foreground">
            Overview
          </label>
          <Textarea
            value={overviewCopy}
            onChange={(e) => setOverviewCopy(e.target.value)}
            placeholder="What the scholarship is for, who runs it and who it helps"
            rows={3}
            className="text-sm leading-relaxed resize-y"
          />
        </div>
      </div>
    </section>
  )
}
