'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

/** localStorage key for the demo sign-in flag. Holds only `{ signedIn: true }` — never a password, token or credential. */
export const DEMO_AUTH_STORAGE_KEY = 'pathway.demoAuth.v1'

type DemoAuthValue = {
  signedIn: boolean
  /** False until the stored flag has been read, so guards never redirect on a stale default. */
  hydrated: boolean
  signIn: () => void
  signOut: () => void
}

const DemoAuthContext = createContext<DemoAuthValue | null>(null)

/**
 * FRONTEND DEMO AUTHENTICATION ONLY. There is no backend, session, JWT or credential check: signing in just sets a
 * local flag so the Student Account shell can be exercised. It provides no security and must be replaced by real
 * auth before launch. Signing out clears this flag only — profile, saved items and Resume Builder drafts are kept.
 */
export function DemoAuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      setSignedIn(JSON.parse(window.localStorage.getItem(DEMO_AUTH_STORAGE_KEY) ?? 'null')?.signedIn === true)
    } catch {
      setSignedIn(false)
    }
    setHydrated(true)
  }, [])

  const signIn = useCallback(() => {
    setSignedIn(true)
    try {
      window.localStorage.setItem(DEMO_AUTH_STORAGE_KEY, JSON.stringify({ signedIn: true }))
    } catch {
      // Storage unavailable — the demo session lasts until reload.
    }
  }, [])

  const signOut = useCallback(() => {
    setSignedIn(false)
    try {
      window.localStorage.removeItem(DEMO_AUTH_STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  const value = useMemo(() => ({ signedIn, hydrated, signIn, signOut }), [signedIn, hydrated, signIn, signOut])
  return <DemoAuthContext.Provider value={value}>{children}</DemoAuthContext.Provider>
}

export function useDemoAuth() {
  const context = useContext(DemoAuthContext)
  if (!context) throw new Error('useDemoAuth must be used inside DemoAuthProvider')
  return context
}
