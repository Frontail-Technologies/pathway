'use client'

import { useEffect, useMemo, useState } from 'react'
import { Check, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { countSelected, type FacetGroup, type SelectedFilters, type SortOption } from './types'

const SORT = '__sort'

export function FilterSheet({
  open,
  onOpenChange,
  groups,
  selected,
  sortOptions,
  sort,
  initialPane,
  onApply,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  groups: FacetGroup[]
  selected: SelectedFilters
  sortOptions: SortOption[]
  sort: string
  initialPane?: string
  onApply: (selected: SelectedFilters, sort: string) => void
}) {
  const visibleGroups = useMemo(() => groups.filter((group) => group.options.length > 0), [groups])
  const [draft, setDraft] = useState<SelectedFilters>(selected)
  const [draftSort, setDraftSort] = useState(sort)
  const [pane, setPane] = useState(initialPane ?? SORT)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) return
    setDraft(selected)
    setDraftSort(sort)
    setPane(initialPane ?? SORT)
    setQuery('')
  }, [open, selected, sort, initialPane])

  const toggle = (group: string, value: string) =>
    setDraft((previous) => {
      const current = previous[group] ?? []
      return { ...previous, [group]: current.includes(value) ? current.filter((item) => item !== value) : [...current, value] }
    })

  const activeGroup = visibleGroups.find((group) => group.key === pane)
  const options = activeGroup ? (query ? activeGroup.options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase())) : activeGroup.options).slice(0, 120) : []
  const total = countSelected(draft)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="flex flex-col gap-0 overflow-hidden p-0 data-[side=bottom]:h-[88dvh] data-[side=bottom]:rounded-t-2xl">
        <SheetHeader className="shrink-0 border-b px-4 py-3.5">
          <SheetTitle>Sort &amp; filter</SheetTitle>
        </SheetHeader>
        <div className="flex min-h-0 flex-1">
          <nav aria-label="Filter groups" className="w-[38%] max-w-40 shrink-0 overflow-y-auto border-r bg-muted/60">
            <PaneButton active={pane === SORT} onClick={() => setPane(SORT)} label="Sort by" />
            {visibleGroups.map((group) => (
              <PaneButton
                key={group.key}
                active={pane === group.key}
                onClick={() => {
                  setPane(group.key)
                  setQuery('')
                }}
                label={group.title}
                count={draft[group.key]?.length ?? 0}
              />
            ))}
          </nav>
          <div className="min-w-0 flex-1 overflow-y-auto px-4 py-3">
            {pane === SORT ? (
              <div role="radiogroup" aria-label="Sort by" className="flex flex-col">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={draftSort === option.value}
                    onClick={() => setDraftSort(option.value)}
                    className="flex min-h-11 cursor-pointer items-center justify-between gap-2 border-b text-left text-sm text-foreground last:border-b-0"
                  >
                    {option.label}
                    {draftSort === option.value ? <Check className="size-4 text-primary" aria-hidden="true" /> : null}
                  </button>
                ))}
              </div>
            ) : activeGroup ? (
              <div className="flex flex-col">
                {activeGroup.options.length > 10 ? (
                  <div className="mb-2 flex h-10 items-center gap-2 rounded-lg border bg-card px-3 focus-within:border-primary">
                    <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder={`Search ${activeGroup.title.toLowerCase()}`}
                      aria-label={`Search ${activeGroup.title}`}
                      className="h-full min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                ) : null}
                {options.map((option) => (
                  <label key={option.value} className="flex min-h-11 cursor-pointer items-center gap-3 border-b text-sm text-foreground last:border-b-0">
                    <Checkbox checked={(draft[activeGroup.key] ?? []).includes(option.value)} onCheckedChange={() => toggle(activeGroup.key, option.value)} />
                    <span className="min-w-0 flex-1">
                      {option.label}
                      {option.hint ? <span className="block text-xs text-muted-foreground">{option.hint}</span> : null}
                    </span>
                    {option.count != null ? <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{option.count.toLocaleString('en-IN')}</span> : null}
                  </label>
                ))}
                {options.length === 0 ? <p className="py-3 text-sm text-muted-foreground">No matches.</p> : null}
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex shrink-0 gap-2 border-t bg-card p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <Button variant="outline" size="lg" className="flex-2" onClick={() => setDraft({})} disabled={total === 0}>
            Clear all
          </Button>
          <Button
            variant="cta"
            size="lg"
            className="flex-3"
            onClick={() => {
              onApply(draft, draftSort)
              onOpenChange(false)
            }}
          >
            Apply{total ? ` (${total})` : ''}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function PaneButton({ active, onClick, label, count = 0 }: { active: boolean; onClick: () => void; label: string; count?: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'true' : undefined}
      className={cn(
        'flex min-h-12 w-full cursor-pointer items-center justify-between gap-1 border-l-[3px] px-3 text-left text-[13px] font-medium',
        active ? 'border-primary bg-card text-foreground' : 'border-transparent text-muted-foreground',
      )}
    >
      <span className="min-w-0">{label}</span>
      {count ? <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">{count}</span> : null}
    </button>
  )
}
