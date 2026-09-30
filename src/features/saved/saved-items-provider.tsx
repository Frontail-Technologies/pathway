'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

export type SavedKind = 'college' | 'course' | 'scholarship' | 'coaching' | 'tutor'
export const savedKinds: SavedKind[] = ['college', 'course', 'scholarship', 'coaching', 'tutor']
type SavedState = Record<SavedKind, string[]>

 
export const SAVED_ITEMS_STORAGE_KEY = 'pathway.savedItems.demo.v1'
const empty: SavedState = { college: [], course: [], scholarship: [], coaching: [], tutor: [] }

type SavedContextValue = {
  saved: SavedState
  hydrated: boolean
  isSaved: (kind: SavedKind, id: string) => boolean
  toggle: (kind: SavedKind, id: string) => boolean
  remove: (kind: SavedKind, id: string) => void
}

const SavedItemsContext = createContext<SavedContextValue | null>(null)

function readStored(): SavedState {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(SAVED_ITEMS_STORAGE_KEY) ?? 'null') as Partial<SavedState> | null
    if (!parsed) return empty
    return Object.fromEntries(savedKinds.map((kind) => [kind, Array.isArray(parsed[kind]) ? parsed[kind]!.filter((id) => typeof id === 'string') : []])) as SavedState
  } catch {
    return empty
  }
}




 
export function SavedItemsProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<SavedState>(empty)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setSaved(readStored())
    setHydrated(true)
  }, [])

  const persist = (next: SavedState) => {
    try {
      window.localStorage.setItem(SAVED_ITEMS_STORAGE_KEY, JSON.stringify(next))
    } catch {
      
    }
  }

  const isSaved = useCallback((kind: SavedKind, id: string) => saved[kind].includes(id), [saved])

  const toggle = useCallback(
    (kind: SavedKind, id: string) => {
      const willSave = !saved[kind].includes(id)
      const next = { ...saved, [kind]: willSave ? [...saved[kind], id] : saved[kind].filter((item) => item !== id) }
      setSaved(next)
      persist(next)
      return willSave
    },
    [saved],
  )

  const remove = useCallback(
    (kind: SavedKind, id: string) => {
      const next = { ...saved, [kind]: saved[kind].filter((item) => item !== id) }
      setSaved(next)
      persist(next)
    },
    [saved],
  )

  const value = useMemo(() => ({ saved, hydrated, isSaved, toggle, remove }), [saved, hydrated, isSaved, toggle, remove])
  return <SavedItemsContext.Provider value={value}>{children}</SavedItemsContext.Provider>
}

export function useSavedItems() {
  const context = useContext(SavedItemsContext)
  if (!context) throw new Error('useSavedItems must be used inside SavedItemsProvider')
  return context
}




 
export function useSavedItem(kind: SavedKind, id: string, entityLabel: string) {
  const store = useSavedItems()
  const saved = store.isSaved(kind, id)
  const toggleSaved = () => {
    const nowSaved = store.toggle(kind, id)
    toast.success(nowSaved ? `${entityLabel} saved to your list.` : `${entityLabel} removed from saved items.`)
  }
  return { saved, toggleSaved }
}
