'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { filterGroups, type FilterKey, type FilterState } from '../data/filters'

type CollegeFilterSidebarProps = {
  filters: FilterState
  onToggle: (key: FilterKey, value: string) => void
  onClearAll: () => void
}

export function CollegeFilterSidebar({ filters, onToggle, onClearAll }: CollegeFilterSidebarProps) {
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
  const showSearch = groupKey === 'states' || groupKey === 'cities'
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  const filtered = showSearch && query ? options.filter((option) => option.toLowerCase().includes(query.toLowerCase())) : options
  const visible = showAll ? filtered : filtered.slice(0, 5)

  return (
    <AccordionItem value={groupKey}>
      <AccordionTrigger className="text-[13px] font-semibold text-foreground">{title}</AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-2.5">
          {showSearch && (
            <div className="flex h-9 items-center gap-2 rounded-md border bg-card px-2.5 transition-colors focus-within:border-primary">
              <Search className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Search ${title.toLowerCase()}`}
                className="h-full min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
              />
            </div>
          )}
          {visible.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-[13px] text-foreground transition-colors hover:bg-muted"
            >
              <Checkbox checked={selected.includes(option)} onCheckedChange={() => onToggle(groupKey, option)} />
              {option}
            </label>
          ))}
          {filtered.length === 0 && <p className="text-xs text-muted-foreground">No matches.</p>}
          {filtered.length > 5 && (
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
