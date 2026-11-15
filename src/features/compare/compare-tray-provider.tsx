'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { toast } from 'sonner'

export const COMPARE_LIMIT = 3
const STORAGE_KEY = 'pw-compare-tray'

export type TrayCollege = { slug: string; name: string; shortName: string; location: string; program?: string }

type CompareTrayValue = {
  items: TrayCollege[]
  has: (slug: string) => boolean
  toggle: (college: TrayCollege) => void
  add: (college: TrayCollege) => void
  remove: (slug: string) => void
  clear: () => void
  href: string
}

const CompareTrayContext = createContext<CompareTrayValue | null>(null)

function read(): TrayCollege[] {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]') as unknown
    return Array.isArray(parsed) ? (parsed as TrayCollege[]).filter((item) => typeof item?.slug === 'string').slice(0, COMPARE_LIMIT) : []
  } catch {
    return []
  }
}

export function compareHref(items: TrayCollege[]) {
  const params = new URLSearchParams({ colleges: items.map((item) => item.slug).join(',') })
  if (items.some((item) => item.program)) params.set('programs', items.map((item) => item.program ?? '').join(','))
  return `/compare/colleges?${params.toString()}`
}

export function CompareTrayProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<TrayCollege[]>([])

  useEffect(() => {
    setItems(read())
    const sync = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setItems(read())
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  const commit = useCallback((next: TrayCollege[]) => {
    setItems(next)
    try {
      if (next.length) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      else window.localStorage.removeItem(STORAGE_KEY)
    } catch {}
  }, [])

  const add = useCallback(
    (college: TrayCollege) => {
      if (items.some((item) => item.slug === college.slug)) return
      if (items.length >= COMPARE_LIMIT) {
        toast.message(`You can compare up to ${COMPARE_LIMIT} colleges`, { description: 'Remove one from the compare tray to add another.' })
        return
      }
      commit([...items, college])
    },
    [items, commit],
  )

  const remove = useCallback((slug: string) => commit(items.filter((item) => item.slug !== slug)), [items, commit])

  const value = useMemo<CompareTrayValue>(
    () => ({
      items,
      has: (slug) => items.some((item) => item.slug === slug),
      toggle: (college) => (items.some((item) => item.slug === college.slug) ? remove(college.slug) : add(college)),
      add,
      remove,
      clear: () => commit([]),
      href: compareHref(items),
    }),
    [items, add, remove, commit],
  )

  return <CompareTrayContext.Provider value={value}>{children}</CompareTrayContext.Provider>
}

export function useCompareTray() {
  const context = useContext(CompareTrayContext)
  if (!context) throw new Error('useCompareTray must be used inside CompareTrayProvider')
  return context
}
