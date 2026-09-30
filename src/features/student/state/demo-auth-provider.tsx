'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

 
export const DEMO_AUTH_STORAGE_KEY = 'pathway.demoAuth.v1'

type DemoAuthValue = {
  signedIn: boolean
   
  hydrated: boolean
  signIn: () => void
  signOut: () => void
}

const DemoAuthContext = createContext<DemoAuthValue | null>(null)





 
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
      
    }
  }, [])

  const signOut = useCallback(() => {
    setSignedIn(false)
    try {
      window.localStorage.removeItem(DEMO_AUTH_STORAGE_KEY)
    } catch {
      
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
