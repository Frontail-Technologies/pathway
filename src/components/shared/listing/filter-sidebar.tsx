'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { countSelected, type FacetGroup, type SelectedFilters } from './types'

const VISIBLE = 6

export function FilterSidebar({
  groups,
  selected,
  onToggle,
  onClearAll,
  onClearGroup,
}: {
  groups: FacetGroup[]
  selected: SelectedFilters
  onToggle: (group: string, value: string) => void
  onClearAll: () => void
  onClearGroup: (group: string) => void
}) {
  const active = countSelected(selected)
  const visibleGroups = groups.filter((group) => group.options.length > 0)
  return (
    <aside aria-label="Filters" className="w-[17.5rem] shrink-0 rounded-xl border bg-card">
      <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
        <p className="text-sm font-semibold text-foreground">
          Filters{active ? <span className="ml-1.5 text-muted-foreground">({active})</span> : null}
        </p>
        {active ? (
          <button type="button" onClick={onClearAll} className="cursor-pointer text-xs font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring/50">
            Clear all
          </button>
        ) : null}
      </div>
      <Accordion multiple defaultValue={visibleGroups.slice(0, 4).map((group) => group.key)} className="px-4">
        {visibleGroups.map((group) => (
          <FilterGroupSection key={group.key} group={group} selected={selected[group.key] ?? []} onToggle={onToggle} onClear={() => onClearGroup(group.key)} />
        ))}
      </Accordion>
    </aside>
  )
}

function FilterGroupSection({ group, selected, onToggle, onClear }: { group: FacetGroup; selected: string[]; onToggle: (group: string, value: string) => void; onClear: () => void }) {
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(false)
  const searchable = group.searchable ?? group.options.length > 10
  const matches = query ? group.options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase())) : group.options
  const pinned = matches.filter((option) => selected.includes(option.value))
  const rest = matches.filter((option) => !selected.includes(option.value))
  const ordered = [...pinned, ...rest]
  const visible = expanded || query ? ordered.slice(0, 60) : ordered.slice(0, Math.max(VISIBLE, pinned.length))
  const hidden = ordered.length - visible.length

  return (
    <AccordionItem value={group.key}>
      <AccordionTrigger className="text-[13px] font-semibold text-foreground">
        <span className="flex items-center gap-1.5">
          {group.title}
          {selected.length ? <span className="grid size-5 place-items-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">{selected.length}</span> : null}
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-1">
          {searchable ? (
            <div className="mb-1.5 flex h-9 items-center gap-2 rounded-lg border bg-card px-2.5 transition-colors focus-within:border-primary">
              <Search className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Search ${group.title.toLowerCase()}`}
                aria-label={`Search ${group.title}`}
                className="h-full min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
              />
            </div>
          ) : null}
          {visible.map((option) => (
            <label key={option.value} className="flex cursor-pointer items-center gap-2.5 rounded-md px-1.5 py-1.5 text-[13px] text-foreground transition-colors hover:bg-muted">
              <Checkbox checked={selected.includes(option.value)} onCheckedChange={() => onToggle(group.key, option.value)} />
              <span className="min-w-0 flex-1 truncate">
                {option.label}
                {option.hint ? <span className="text-muted-foreground"> · {option.hint}</span> : null}
              </span>
              {option.count != null ? <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{option.count.toLocaleString('en-IN')}</span> : null}
            </label>
          ))}
          {matches.length === 0 ? <p className="px-1.5 py-1 text-xs text-muted-foreground">No matches.</p> : null}
          <div className="flex items-center justify-between gap-2 px-1.5 pt-1">
            {hidden > 0 && !query ? (
              <button type="button" onClick={() => setExpanded(true)} className="cursor-pointer text-xs font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring/50">
                +{hidden} more
              </button>
            ) : expanded && !query ? (
              <button type="button" onClick={() => setExpanded(false)} className="cursor-pointer text-xs font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring/50">
                Show less
              </button>
            ) : (
              <span />
            )}
            {selected.length ? (
              <button type="button" onClick={onClear} className="cursor-pointer text-xs font-medium text-muted-foreground outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/50">
                Clear
              </button>
            ) : null}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
