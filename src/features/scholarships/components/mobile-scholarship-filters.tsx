'use client'

import { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { emptyFilters, filterGroups, type FilterState } from '../data/filters'

type MobileScholarshipFiltersProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: FilterState
  onApply: (filters: FilterState) => void
}

export function MobileScholarshipFilters({ open, onOpenChange, filters, onApply }: MobileScholarshipFiltersProps) {
  const [draft, setDraft] = useState<FilterState>(filters)

  useEffect(() => {
    if (open) setDraft(filters)
  }, [open, filters])

  const toggle = (key: keyof FilterState, value: string) => {
    setDraft((prev) => {
      const current = prev[key]
      const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
      return { ...prev, [key]: next }
    })
  }

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
                  <label
                    key={option}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1.5 text-[13px] text-foreground transition-colors hover:bg-muted"
                  >
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
