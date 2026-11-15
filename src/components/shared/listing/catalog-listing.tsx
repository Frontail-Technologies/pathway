'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { Search } from 'lucide-react'
import type { BreadcrumbItemInput } from '@/components/shared'
import { Container } from '@/components/shared/container'
import { FilterToolbar } from '@/components/shared/filter-toolbar'
import { EmptyState } from '@/components/feedback'
import { Button } from '@/components/ui/button'
import { ListingError, ListingLoading } from '@/features/catalog/listing-states'
import { FilterSheet } from './filter-sheet'
import { FilterSidebar } from './filter-sidebar'
import { ListingHeader } from './listing-header'
import type { SpotArtName } from '@/components/shared/spot-art'
import { LoadMoreFooter } from './load-more-footer'
import { MobileListingBar } from './mobile-listing-bar'
import { appliedFilters, countSelected, type FacetGroup, type SelectedFilters, type SortOption } from './types'

type ListState<T> = {
  items: T[]
  total: number
  hasMore: boolean
  status: 'loading' | 'ready' | 'error'
  error: string | null
  loadingMore: boolean
  loadMore: () => void
  retry: () => void
}

export function CatalogListing<T>({
  breadcrumbs,
  title,
  description,
  meta,
  art,
  searchPlaceholder,
  noun,
  groups,
  selected,
  sort,
  sortOptions,
  query,
  onNavigate,
  list,
  renderItems,
  layout = 'list',
  footer,
  aboveResults,
}: {
  breadcrumbs: BreadcrumbItemInput[]
  title: string
  description?: string
  meta?: ReactNode
  art?: SpotArtName
  searchPlaceholder: string
  noun: [string, string]
  groups: FacetGroup[]
  selected: SelectedFilters
  sort: string
  sortOptions: SortOption[]
  query: string
  onNavigate: (selected: SelectedFilters, sort: string, query: string) => void
  list: ListState<T>
  renderItems: (items: T[]) => ReactNode
  layout?: 'list' | 'grid'
  footer?: ReactNode
  aboveResults?: ReactNode
}) {
  const [sheet, setSheet] = useState<{ open: boolean; pane?: string }>({ open: false })
  const [draftQuery, setDraftQuery] = useState(query)
  useEffect(() => setDraftQuery(query), [query])

  const toggle = (group: string, value: string) => {
    const current = selected[group] ?? []
    onNavigate({ ...selected, [group]: current.includes(value) ? current.filter((item) => item !== value) : [...current, value] }, sort, query)
  }
  const clearAll = () => onNavigate({}, sort, query)
  const applied = appliedFilters(groups, selected).map((filter) => ({
    key: `${filter.group}-${filter.value}`,
    label: filter.label,
    onRemove: () => onNavigate({ ...selected, [filter.group]: (selected[filter.group] ?? []).filter((item) => item !== filter.value) }, sort, query),
  }))
  const active = countSelected(selected)
  const sortLabel = sortOptions.find((option) => option.value === sort)?.label ?? sortOptions[0]?.label ?? 'Sort'

  return (
    <div className="bg-background pb-24 lg:pb-14">
      <ListingHeader breadcrumbs={breadcrumbs} title={title} description={description} meta={meta} art={art}>
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault()
            onNavigate(selected, sort, draftQuery)
          }}
          className="flex h-12 max-w-2xl items-center gap-2 rounded-xl bg-card pr-1.5 pl-3.5 text-foreground shadow-[0_8px_24px_rgba(15,23,42,0.18)]"
        >
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            value={draftQuery}
            onChange={(event) => setDraftQuery(event.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="h-full min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground sm:text-sm"
          />
          <Button type="submit" variant="cta" className="h-9 px-4 font-semibold">
            Search
          </Button>
        </form>
      </ListingHeader>

      <Container className="pt-5 sm:pt-6">
        <div className="flex gap-8 lg:items-start">
          <div className="sticky top-header-gap hidden max-h-[calc(100dvh-var(--pw-header-h)-2rem)] overflow-y-auto rounded-xl lg:block">
            <FilterSidebar groups={groups} selected={selected} onToggle={toggle} onClearAll={clearAll} onClearGroup={(group) => onNavigate({ ...selected, [group]: [] }, sort, query)} />
          </div>

          <div className="min-w-0 flex-1">
            {aboveResults ? <div className="mb-4">{aboveResults}</div> : null}
            <div className="mb-4 flex items-start justify-between gap-4">
              <FilterToolbar total={list.status === 'ready' ? list.total : undefined} noun={noun} applied={applied} onClearAll={clearAll} className="min-w-0 flex-1" />
              {sortOptions.length > 1 ? (
                <label className="hidden shrink-0 items-center gap-2 text-sm text-muted-foreground lg:flex">
                  Sort by
                  <select
                    value={sort}
                    onChange={(event) => onNavigate(selected, event.target.value, query)}
                    className="h-10 cursor-pointer rounded-lg border border-input bg-card px-3 text-sm font-medium text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
            </div>

            {list.status === 'loading' ? (
              <ListingLoading label={`Loading ${noun[1]}`} />
            ) : list.status === 'error' ? (
              <ListingError message={list.error} onRetry={list.retry} />
            ) : list.items.length === 0 ? (
              <div className="flex flex-col items-center gap-4 rounded-xl border bg-card py-8">
                <EmptyState title={`No ${noun[1]} match these filters.`} />
                <div className="flex flex-wrap justify-center gap-2">
                  {active ? (
                    <Button variant="outline" onClick={clearAll}>
                      Clear filters
                    </Button>
                  ) : null}
                  {query ? (
                    <Button variant="outline" onClick={() => onNavigate(selected, sort, '')}>
                      Clear search
                    </Button>
                  ) : null}
                </div>
              </div>
            ) : (
              <>
                <div className={layout === 'grid' ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 [&>*]:min-w-0' : 'grid grid-cols-1 gap-4 [&>*]:min-w-0'}>{renderItems(list.items)}</div>
                <LoadMoreFooter shown={list.items.length} total={list.total} noun={noun[1]} hasMore={list.hasMore} loading={list.loadingMore} onLoadMore={list.loadMore} />
              </>
            )}
            {footer}
          </div>
        </div>
      </Container>

      <MobileListingBar
        sortLabel={sortLabel}
        activeCount={active}
        onOpen={(pane) => setSheet({ open: true, pane: pane === 'sort' && sortOptions.length > 1 ? undefined : groups.find((group) => group.options.length)?.key })}
      />
      <FilterSheet
        open={sheet.open}
        onOpenChange={(open) => setSheet((previous) => ({ ...previous, open }))}
        groups={groups}
        selected={selected}
        sortOptions={sortOptions}
        sort={sort}
        initialPane={sheet.pane}
        onApply={(nextSelected, nextSort) => onNavigate(nextSelected, nextSort, query)}
      />
    </div>
  )
}
