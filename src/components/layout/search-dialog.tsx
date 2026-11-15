'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Clock, CornerDownLeft, Loader2, Search, TrendingUp, X } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { kindIcons } from '@/features/search/components/search-result-row'
import { listCatalogEntries, type CatalogKind } from '@/features/search/api/catalog-search'
import { searchKinds, searchLocalEntries, type SearchEntry } from '@/features/search/data/search-index'
import { getPopularSearches } from '@/features/home/api/home-data'
import { cn } from '@/lib/utils'

const OPEN_EVENT = 'pw:open-search'
const RECENT_KEY = 'pw-recent-searches'
const MAX_RECENT = 6

const groups: { kind: CatalogKind; limit: number }[] = [
  { kind: 'college', limit: 5 },
  { kind: 'exam', limit: 3 },
  { kind: 'course', limit: 3 },
  { kind: 'scholarship', limit: 3 },
]

const quickLinks = [
  { label: 'Top ranked colleges (NIRF)', href: '/colleges?sort=ranking' },
  { label: 'College predictor', href: '/college-predictor' },
  { label: 'Scholarships closing soon', href: '/scholarships?status=closing-soon&sort=closing-soon' },
  { label: 'Compare colleges', href: '/compare/colleges' },
]

export const openSearchDialog = (query = '') => window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: query }))

function readRecent(): string[] {
  try {
    const value = JSON.parse(window.localStorage.getItem(RECENT_KEY) ?? '[]')
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string').slice(0, MAX_RECENT) : []
  } catch {
    return []
  }
}

function writeRecent(items: string[]) {
  try {
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(items.slice(0, MAX_RECENT)))
  } catch {
    return
  }
}

function Highlight({ text, query }: { text: string; query: string }) {
  const index = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1
  if (index < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded-sm bg-transparent font-bold text-primary">{text.slice(index, index + query.length)}</mark>
      {text.slice(index + query.length)}
    </>
  )
}

type Row = { id: string; href: string; render: (active: boolean) => ReactNode }

export function SearchDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [recent, setRecent] = useState<string[]>([])
  const [popular, setPopular] = useState<string[]>([])
  const [active, setActive] = useState(0)
  const request = useRef(0)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onOpen = (event: Event) => {
      setQuery(typeof (event as CustomEvent).detail === 'string' ? (event as CustomEvent<string>).detail : '')
      setRecent(readRecent())
      setActive(0)
      setOpen(true)
      getPopularSearches(8)
        .then(setPopular)
        .catch(() => setPopular([]))
    }
    const onKey = (event: globalThis.KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      if ((event.key === 'k' && (event.ctrlKey || event.metaKey)) || (event.key === '/' && !typing)) {
        event.preventDefault()
        onOpen(new CustomEvent(OPEN_EVENT, { detail: '' }))
      }
    }
    window.addEventListener(OPEN_EVENT, onOpen)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  const term = query.trim()

  useEffect(() => {
    if (term.length < 2) {
      setResults([])
      setLoading(false)
      return
    }
    const id = ++request.current
    setLoading(true)
    const timer = window.setTimeout(async () => {
      const settled = await Promise.allSettled(groups.map(({ kind, limit }) => listCatalogEntries(kind, { q: term, limit: String(limit) })))
      if (id !== request.current) return
      const entries = settled.flatMap((result) => (result.status === 'fulfilled' ? result.value.items : []))
      const local = searchLocalEntries(term)
        .filter((entry) => (entry.kind === 'tool' || entry.kind === 'stream') && entry.title.toLowerCase().includes(term.toLowerCase()))
        .slice(0, 3)
      setResults([...entries, ...local])
      setActive(0)
      setLoading(false)
    }, 180)
    return () => window.clearTimeout(timer)
  }, [term])

  const remember = useCallback((value: string) => {
    const clean = value.trim()
    if (!clean) return
    const next = [clean, ...readRecent().filter((item) => item.toLowerCase() !== clean.toLowerCase())]
    writeRecent(next)
    setRecent(next.slice(0, MAX_RECENT))
  }, [])

  const go = useCallback(
    (href: string, remembered?: string) => {
      if (remembered) remember(remembered)
      setOpen(false)
      router.push(href)
    },
    [remember, router],
  )

  const searchAll = term ? `/search?q=${encodeURIComponent(term)}` : '/search'

  const grouped = useMemo(() => {
    const order = [...groups.map((group) => group.kind), 'stream', 'tool'] as string[]
    return order
      .map((kind) => ({ kind, label: searchKinds.find((item) => item.kind === kind)?.plural ?? kind, items: results.filter((entry) => entry.kind === kind) }))
      .filter((group) => group.items.length)
  }, [results])

  const rows: Row[] = useMemo(() => {
    if (term.length < 2) {
      const recentRows: Row[] = recent.map((item) => ({
        id: `recent-${item}`,
        href: `/search?q=${encodeURIComponent(item)}`,
        render: () => (
          <>
            <Clock className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate text-sm text-foreground">{item}</span>
          </>
        ),
      }))
      const quick: Row[] = quickLinks.map((link) => ({
        id: `quick-${link.href}`,
        href: link.href,
        render: () => (
          <>
            <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">{link.label}</span>
          </>
        ),
      }))
      return [...recentRows, ...quick]
    }
    const resultRows: Row[] = grouped.flatMap((group) =>
      group.items.map((entry) => {
        const Icon = kindIcons[entry.kind]
        return {
          id: entry.id,
          href: entry.href,
          render: () => (
            <>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <Icon className="size-4.5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-foreground">
                  <Highlight text={entry.title} query={term} />
                </span>
                <span className="block truncate text-xs text-muted-foreground">{entry.subtitle}</span>
              </span>
            </>
          ),
        }
      }),
    )
    return [
      ...resultRows,
      {
        id: 'all',
        href: searchAll,
        render: () => (
          <>
            <Search className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-primary">See all results for &ldquo;{term}&rdquo;</span>
          </>
        ),
      },
    ]
  }, [term, recent, grouped, searchAll])

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((index) => Math.min(rows.length - 1, index + 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((index) => Math.max(0, index - 1))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const row = rows[active]
      if (term.length >= 2 && (!row || row.id === 'all' || loading)) go(searchAll, term)
      else if (row) go(row.href, term.length >= 2 ? term : row.id.startsWith('recent-') ? row.id.slice(7) : undefined)
      else if (term) go(searchAll, term)
    }
  }

  let index = -1
  const renderRow = (row: Row) => {
    index += 1
    const current = index
    return (
      <button
        key={row.id}
        type="button"
        role="option"
        aria-selected={active === current}
        data-index={current}
        onMouseMove={() => setActive(current)}
        onClick={() => go(row.href, term.length >= 2 ? term : row.id.startsWith('recent-') ? row.id.slice(7) : undefined)}
        className={cn('flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left outline-none', active === current ? 'bg-secondary' : '')}
      >
        {row.render(active === current)}
        {active === current ? <CornerDownLeft className="hidden size-3.5 shrink-0 text-muted-foreground sm:block" aria-hidden="true" /> : null}
      </button>
    )
  }

  const resultRowsById = new Map(rows.map((row) => [row.id, row]))

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="top-0 left-0 flex h-dvh max-h-dvh w-full max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none p-0 sm:top-[8vh] sm:left-1/2 sm:h-auto sm:max-h-[80vh] sm:max-w-2xl sm:-translate-x-1/2 sm:rounded-2xl"
      >
        <DialogTitle className="sr-only">Search Pathway</DialogTitle>
        <DialogDescription className="sr-only">Search colleges, courses, exams and scholarships</DialogDescription>
        <div className="flex items-center gap-2 border-b px-3 pt-[env(safe-area-inset-top)] sm:px-4">
          <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search colleges, courses, exams, scholarships"
            aria-label="Search"
            role="combobox"
            aria-expanded="true"
            aria-controls="search-dialog-results"
            enterKeyHint="search"
            className="h-14 min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
          />
          {loading ? <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" aria-hidden="true" /> : null}
          {query ? (
            <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-muted">
              <X className="size-4" aria-hidden="true" />
            </button>
          ) : null}
          <button type="button" onClick={() => setOpen(false)} className="h-8 shrink-0 cursor-pointer rounded-md border px-2 text-xs font-medium text-muted-foreground hover:bg-muted">
            <span className="sm:hidden">Cancel</span>
            <span className="hidden sm:inline">Esc</span>
          </button>
        </div>

        <div ref={listRef} id="search-dialog-results" role="listbox" className="min-h-0 flex-1 overflow-y-auto p-2 sm:max-h-[60vh]">
          {term.length < 2 ? (
            <div className="flex flex-col gap-4 p-1">
              {recent.length ? (
                <div>
                  <div className="flex items-center justify-between px-2 py-1.5">
                    <p className="text-xs font-semibold text-muted-foreground">Recent searches</p>
                    <button
                      type="button"
                      onClick={() => {
                        writeRecent([])
                        setRecent([])
                      }}
                      className="cursor-pointer text-xs font-medium text-primary hover:underline"
                    >
                      Clear
                    </button>
                  </div>
                  {recent.map((item) => renderRow(resultRowsById.get(`recent-${item}`)!))}
                </div>
              ) : null}
              {popular.length ? (
              <div>
                <p className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  <TrendingUp className="size-3.5" aria-hidden="true" />
                  Popular searches
                </p>
                <div className="flex flex-wrap gap-2 px-2 pt-1 pb-2">
                  {popular.map((item) => (
                    <button key={item} type="button" onClick={() => setQuery(item)} className="h-8 cursor-pointer rounded-full border bg-card px-3 text-sm text-foreground hover:border-primary/40 hover:text-primary">
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              ) : null}
              <div>
                <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Jump to</p>
                {quickLinks.map((link) => renderRow(resultRowsById.get(`quick-${link.href}`)!))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {grouped.map((group) => (
                <div key={group.kind}>
                  <p className="px-3 pt-2 pb-1 text-xs font-semibold text-muted-foreground">{group.label}</p>
                  {group.items.map((entry) => renderRow(resultRowsById.get(entry.id)!))}
                </div>
              ))}
              {!loading && grouped.length === 0 ? <p className="px-3 py-6 text-center text-sm text-muted-foreground">No quick matches. Press Enter to search everything.</p> : null}
              <div className="border-t pt-2">{renderRow(resultRowsById.get('all')!)}</div>
            </div>
          )}
        </div>

        <div className="hidden items-center gap-4 border-t px-4 py-2.5 text-xs text-muted-foreground sm:flex">
          <span>
            <kbd className="rounded border bg-muted px-1.5 py-0.5 font-sans">↑</kbd> <kbd className="rounded border bg-muted px-1.5 py-0.5 font-sans">↓</kbd> to move
          </span>
          <span>
            <kbd className="rounded border bg-muted px-1.5 py-0.5 font-sans">Enter</kbd> to open
          </span>
          <span className="ml-auto">
            <kbd className="rounded border bg-muted px-1.5 py-0.5 font-sans">Ctrl K</kbd> anywhere
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function SearchTrigger({ variant }: { variant: 'desktop' | 'mobile' }) {
  if (variant === 'mobile') {
    return (
      <button
        type="button"
        onClick={() => openSearchDialog()}
        aria-label="Search colleges, exams and courses"
        className="flex h-10 min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-full bg-card pr-1 pl-3.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <span className="min-w-0 flex-1 truncate text-base text-muted-foreground">Search colleges, exams…</span>
      </button>
    )
  }
  return (
    <button
      type="button"
      onClick={() => openSearchDialog()}
      aria-label="Search colleges, courses, exams and scholarships"
      className="group flex h-11 w-full cursor-pointer items-center gap-2.5 rounded-xl bg-card pr-1.5 pl-4 text-left outline-none transition-shadow hover:shadow-[0_6px_20px_rgba(8,20,60,0.25)] focus-visible:ring-2 focus-visible:ring-white/70"
    >
      <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">Search colleges, courses, exams and scholarships</span>
      <kbd className="hidden shrink-0 rounded-md border bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground xl:block">Ctrl K</kbd>
      <span className="flex h-8 shrink-0 items-center rounded-lg bg-cta px-4 text-sm font-semibold text-cta-foreground">Search</span>
    </button>
  )
}
