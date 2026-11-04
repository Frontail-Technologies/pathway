'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-client'
import { toast } from 'sonner'
import { apiRequest } from '@/features/auth/lib/session-client'
import { useRoleSession } from '@/features/auth/state/auth-session-provider'

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

function readGuest(): SavedState {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(SAVED_ITEMS_STORAGE_KEY) ?? 'null') as Partial<SavedState> | null
    if (!parsed) return empty
    return Object.fromEntries(savedKinds.map((kind) => [kind, Array.isArray(parsed[kind]) ? parsed[kind]!.filter((id) => typeof id === 'string') : []])) as SavedState
  } catch {
    return empty
  }
}

function writeGuest(next: SavedState | null) {
  try {
    if (next) window.localStorage.setItem(SAVED_ITEMS_STORAGE_KEY, JSON.stringify(next))
    else window.localStorage.removeItem(SAVED_ITEMS_STORAGE_KEY)
  } catch {
  }
}

const countOf = (state: SavedState) => savedKinds.reduce((sum, kind) => sum + state[kind].length, 0)

type ServerItem = { kind: string; slug: string }
type MergeResult = { added: number; alreadySaved: number; invalid: { kind: string; slug: string }[] }

function fromServer(items: ServerItem[]): SavedState {
  const next: SavedState = { college: [], course: [], scholarship: [], coaching: [], tutor: [] }
  for (const item of items) if ((savedKinds as string[]).includes(item.kind)) next[item.kind as SavedKind].push(item.slug)
  return next
}

export function SavedItemsProvider({ children }: { children: React.ReactNode }) {
  const { hydrated: sessionReady, user } = useRoleSession('student')
  const studentId = user?.id
  const queryClient = useQueryClient()
  const accountKey = queryKeys.studentSaved(studentId ?? '')
  const [guest, setGuest] = useState<SavedState>(empty)
  const [guestReady, setGuestReady] = useState(false)

  useEffect(() => {
    if (!sessionReady || studentId) return
    setGuest(readGuest())
    setGuestReady(true)
  }, [sessionReady, studentId])

  const account = useQuery({
    queryKey: accountKey,
    queryFn: async () => {
      const pending = readGuest()
      if (countOf(pending)) {
        try {
          const result = await apiRequest<MergeResult>('POST', '/me/saved-items/merge', { items: pending })
          writeGuest(null)
          if (result.added) toast.success(`${result.added} saved ${result.added === 1 ? 'item was' : 'items were'} added to your account.`)
          if (result.invalid.length) toast.info(`${result.invalid.length} saved ${result.invalid.length === 1 ? 'item is' : 'items are'} no longer available and ${result.invalid.length === 1 ? 'was' : 'were'} removed.`)
        } catch {
          toast.error('Your saved items on this device could not be added to your account yet. They will be added next time.')
        }
      }
      return fromServer(await apiRequest<ServerItem[]>('GET', '/me/saved-items'))
    },
    enabled: sessionReady && Boolean(studentId),
  })

  const saved = studentId ? (account.data ?? empty) : guest
  const hydrated = sessionReady && (studentId ? !account.isPending : guestReady)
  const savedRef = useRef(saved)
  savedRef.current = saved

  const isSaved = useCallback((kind: SavedKind, id: string) => saved[kind].includes(id), [saved])

  const apply = useCallback(
    (kind: SavedKind, id: string, save: boolean) => {
      const withItem = (state: SavedState, present: boolean): SavedState => ({
        ...state,
        [kind]: present ? (state[kind].includes(id) ? state[kind] : [id, ...state[kind]]) : state[kind].filter((item) => item !== id),
      })
      if (!studentId) {
        const next = withItem(savedRef.current, save)
        setGuest(next)
        writeGuest(next)
        return
      }
      const key = queryKeys.studentSaved(studentId)
      queryClient.setQueryData<SavedState>(key, (current) => withItem(current ?? empty, save))
      apiRequest(save ? 'PUT' : 'DELETE', `/me/saved-items/${kind}/${encodeURIComponent(id)}`).catch(() => {
        queryClient.setQueryData<SavedState>(key, (current) => withItem(current ?? empty, !save))
        toast.error(save ? 'Could not save this item. Please try again.' : 'Could not remove this item. Please try again.')
      })
    },
    [studentId, queryClient],
  )

  const toggle = useCallback(
    (kind: SavedKind, id: string) => {
      const willSave = !savedRef.current[kind].includes(id)
      apply(kind, id, willSave)
      return willSave
    },
    [apply],
  )
  const remove = useCallback((kind: SavedKind, id: string) => apply(kind, id, false), [apply])

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
