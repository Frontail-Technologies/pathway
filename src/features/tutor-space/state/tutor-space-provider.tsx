'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { TUTOR_AUTH_STORAGE_KEY, TUTOR_SPACE_STORAGE_KEY, initialTutorSpace, isStoredTutorSpace, type TutorSpaceState } from '../data/tutor-space'

type TutorSpaceContextValue = {
  hydrated: boolean
  signedIn: boolean
  signIn: () => void
  signOut: () => void
  state: TutorSpaceState
  update: (patch: Partial<TutorSpaceState> | ((current: TutorSpaceState) => Partial<TutorSpaceState>)) => void
  reset: () => void
}

const TutorSpaceContext = createContext<TutorSpaceContextValue | null>(null)

const read = <T,>(key: string): T | null => {
  try {
    return JSON.parse(window.localStorage.getItem(key) ?? 'null') as T | null
  } catch {
    return null
  }
}
const write = (key: string, value: unknown) => {
  try {
    if (value === null) window.localStorage.removeItem(key)
    else window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage can be unavailable (private mode); the session still works in memory.
  }
}

/**
 * Demo state for Tutor Space, kept separate from the student demo account so
 * the two roles never mix. Persisted on this device only.
 */
export function TutorSpaceProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false)
  const [signedIn, setSignedIn] = useState(false)
  const [state, setState] = useState<TutorSpaceState>(initialTutorSpace)

  useEffect(() => {
    setSignedIn(read<{ signedIn?: boolean }>(TUTOR_AUTH_STORAGE_KEY)?.signedIn === true)
    const stored = read<unknown>(TUTOR_SPACE_STORAGE_KEY)
    if (isStoredTutorSpace(stored)) setState(stored)
    setHydrated(true)
  }, [])

  const update = useCallback<TutorSpaceContextValue['update']>((patch) => {
    setState((current) => {
      const next = { ...current, ...(typeof patch === 'function' ? patch(current) : patch) }
      write(TUTOR_SPACE_STORAGE_KEY, next)
      return next
    })
  }, [])

  const signIn = useCallback(() => {
    setSignedIn(true)
    write(TUTOR_AUTH_STORAGE_KEY, { signedIn: true })
  }, [])

  const signOut = useCallback(() => {
    setSignedIn(false)
    write(TUTOR_AUTH_STORAGE_KEY, null)
  }, [])

  const reset = useCallback(() => {
    setState(initialTutorSpace)
    write(TUTOR_SPACE_STORAGE_KEY, null)
  }, [])

  const value = useMemo(() => ({ hydrated, signedIn, signIn, signOut, state, update, reset }), [hydrated, signedIn, signIn, signOut, state, update, reset])
  return <TutorSpaceContext.Provider value={value}>{children}</TutorSpaceContext.Provider>
}

export function useTutorSpace() {
  const context = useContext(TutorSpaceContext)
  if (!context) throw new Error('useTutorSpace must be used inside TutorSpaceProvider')
  return context
}
