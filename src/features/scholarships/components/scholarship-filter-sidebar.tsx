'use client'

import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { filterGroups, type FilterKey, type FilterState } from '../data/filters'

type ScholarshipFilterSidebarProps = {
  filters: FilterState
  onToggle: (key: FilterKey, value: string) => void
  onClearAll: () => void
}

export function ScholarshipFilterSidebar({ filters, onToggle, onClearAll }: ScholarshipFilterSidebarProps) {
  return (
    <aside className="w-[270px] shrink-0">
      <div className="flex items-center justify-between px-1 pb-3">
        <p className="text-sm font-semibold text-foreground">Search Filters</p>
        <button type="button" onClick={onClearAll} className="cursor-pointer text-xs font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-primary/40">
          Clear
        </button>
      </div>
      <div className="rounded-[10px] border bg-card px-3">
        <Accordion multiple defaultValue={filterGroups.map((group) => group.key)}>
          {filterGroups.map((group) => (
            <FilterGroupSection key={group.key} groupKey={group.key} title={group.title} options={group.options} selected={filters[group.key]} onToggle={onToggle} />
          ))}
        </Accordion>
      </div>
    </aside>
  )
}

function FilterGroupSection({
  groupKey,
  title,
  options,
  selected,
  onToggle,
}: {
  groupKey: FilterKey
  title: string
  options: readonly string[]
  selected: string[]
  onToggle: (key: FilterKey, value: string) => void
}) {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? options : options.slice(0, 5)

  return (
    <AccordionItem value={groupKey}>
      <AccordionTrigger className="text-[13px] font-semibold text-foreground">{title}</AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-2.5">
          {visible.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-[13px] text-foreground transition-colors hover:bg-muted"
            >
              <Checkbox checked={selected.includes(option)} onCheckedChange={() => onToggle(groupKey, option)} />
              {option}
            </label>
          ))}
          {options.length > 5 && (
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              className="w-fit cursor-pointer text-xs font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {showAll ? 'View Less' : 'View More'}
            </button>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
