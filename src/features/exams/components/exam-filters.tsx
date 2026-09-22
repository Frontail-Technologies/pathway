'use client'

import { useEffect, useState } from 'react'
import { ArrowUpDown, SlidersHorizontal, X } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { countActiveFilters, emptyFilters, filterGroups, sortOptions, type FilterKey, type FilterState, type SortValue } from '../data/exams'

export function ExamFilterSidebar({ filters, onToggle, onClearAll }: { filters: FilterState; onToggle: (key: FilterKey, value: string) => void; onClearAll: () => void }) {
  const activeCount = countActiveFilters(filters)
  return (
    <aside className="w-56 shrink-0">
      <div className="rounded-[10px] border bg-card p-3 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <div className="flex items-start justify-between gap-3 border-b pb-3">
          <div>
            <p className="text-sm font-semibold text-foreground">Filters</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{activeCount} active</p>
          </div>
          <button type="button" onClick={onClearAll} className="cursor-pointer rounded-md px-1.5 py-1 text-xs font-semibold text-primary outline-none hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary/40">
            Clear
          </button>
        </div>
        <Accordion multiple defaultValue={filterGroups.map((group) => group.key)} className="mt-1">
          {filterGroups.map((group) => (
            <AccordionItem key={group.key} value={group.key}>
              <AccordionTrigger className="text-[13px] font-semibold text-foreground">{group.title}</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-1.5 pb-1">
                  {group.options.map((option) => (
                    <label key={option} className="flex min-h-8 cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-[13px] text-foreground transition-colors hover:bg-muted">
                      <Checkbox checked={filters[group.key].includes(option)} onCheckedChange={() => onToggle(group.key, option)} />
                      {option}
                    </label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </aside>
  )
}

function MobileExamFilters({ open, onOpenChange, filters, onApply }: { open: boolean; onOpenChange: (open: boolean) => void; filters: FilterState; onApply: (filters: FilterState) => void }) {
  const [draft, setDraft] = useState<FilterState>(filters)
  useEffect(() => {
    if (open) setDraft(filters)
  }, [open, filters])

  const toggle = (key: FilterKey, value: string) =>
    setDraft((prev) => ({ ...prev, [key]: prev[key].includes(value) ? prev[key].filter((item) => item !== value) : [...prev[key], value] }))

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="flex flex-col gap-0 overflow-hidden p-0 data-[side=bottom]:h-[85dvh]">
        <SheetHeader className="shrink-0 border-b p-4">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
          {filterGroups.map((group) => (
            <div key={group.key} className="mb-5 last:mb-0">
              <p className="mb-2 text-[13px] font-semibold text-foreground">{group.title}</p>
              <div className="flex flex-col gap-2.5">
                {group.options.map((option) => (
                  <label key={option} className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1.5 text-[13px] text-foreground transition-colors hover:bg-muted">
                    <Checkbox checked={draft[group.key].includes(option)} onCheckedChange={() => toggle(group.key, option)} />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex shrink-0 gap-2 border-t bg-card p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <Button variant="outline" className="h-11 flex-2" onClick={() => setDraft(emptyFilters)}>
            Clear All
          </Button>
          <Button
            variant="cta"
            className="h-11 flex-3"
            onClick={() => {
              onApply(draft)
              onOpenChange(false)
            }}
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function SortSelect({ sort, onSortChange, className = '' }: { sort: SortValue; onSortChange: (value: SortValue) => void; className?: string }) {
  return (
    <Select value={sort} onValueChange={(value) => onSortChange(value as SortValue)} items={sortOptions}>
      <SelectTrigger className={`gap-2 px-3 text-sm data-[size=default]:h-10 ${className}`}>
        <ArrowUpDown className="size-4 text-muted-foreground" aria-hidden="true" />
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent side="bottom" align="start" sideOffset={6} alignItemWithTrigger={false}>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function ExamResultsHeader({
  resultCount,
  filters,
  sort,
  onSortChange,
  onApplyMobileFilters,
  onRemoveFilter,
  onClearAll,
}: {
  resultCount: number
  filters: FilterState
  sort: SortValue
  onSortChange: (value: SortValue) => void
  onApplyMobileFilters: (filters: FilterState) => void
  onRemoveFilter: (key: FilterKey, value: string) => void
  onClearAll: () => void
}) {
  const [sheetOpen, setSheetOpen] = useState(false)
  const activeCount = countActiveFilters(filters)
  const chips = (Object.keys(filters) as FilterKey[]).flatMap((key) => filters[key].map((value) => ({ key, value })))

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-foreground">
          {resultCount} {resultCount === 1 ? 'exam' : 'exams'} found
        </p>
        <div className="hidden sm:block">
          <SortSelect sort={sort} onSortChange={onSortChange} />
        </div>
      </div>

      <div className="mt-3 flex gap-2 sm:hidden">
        <Button variant="outline" className="h-10 shrink-0 gap-1.5 px-3.5 text-sm" onClick={() => setSheetOpen(true)}>
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Filter{activeCount > 0 ? ` (${activeCount})` : ''}
        </Button>
        <div className="min-w-0 flex-1">
          <SortSelect sort={sort} onSortChange={onSortChange} className="w-full" />
        </div>
      </div>

      {chips.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <button
              key={`${chip.key}-${chip.value}`}
              type="button"
              onClick={() => onRemoveFilter(chip.key, chip.value)}
              className="flex cursor-pointer items-center gap-1 rounded-md border border-primary/30 bg-secondary px-2.5 py-1 text-xs font-medium text-primary outline-none transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {chip.value}
              <X className="size-3" aria-hidden="true" />
            </button>
          ))}
          <button type="button" onClick={onClearAll} className="cursor-pointer text-xs font-semibold text-muted-foreground outline-none hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-primary/40">
            Clear All
          </button>
        </div>
      )}

      <MobileExamFilters open={sheetOpen} onOpenChange={setSheetOpen} filters={filters} onApply={onApplyMobileFilters} />
    </div>
  )
}
