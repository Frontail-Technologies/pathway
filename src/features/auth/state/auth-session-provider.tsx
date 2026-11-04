'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { onSessionChange, refreshSession, signOut as endSession, type SessionUser } from '../lib/session-client'

type SessionStatus = 'restoring' | 'signedIn' | 'signedOut'

type AuthSessionValue = {
  status: SessionStatus
  user: SessionUser | null
  signOut: () => Promise<void>
}

const AuthSessionContext = createContext<AuthSessionValue | null>(null)

const LEGACY_KEYS = ['pathway.demoAuth.v1', 'pathway.tutorAuth.demo.v1', 'pathway.adminSession.v1']

export function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<SessionStatus>('restoring')
  const [user, setUser] = useState<SessionUser | null>(null)

  useEffect(() => {
    try {
      for (const key of LEGACY_KEYS) {
        window.localStorage.removeItem(key)
        window.sessionStorage.removeItem(key)
      }
    } catch {
    }
    const stop = onSessionChange((next) => {
      setUser(next)
      setStatus(next ? 'signedIn' : 'signedOut')
    })
    refreshSession().catch(() => {
      setUser(null)
      setStatus('signedOut')
    })
    return stop
  }, [])

  const queryClient = useQueryClient()
  const userId = user?.id ?? null
  const previousUser = useRef<string | null>(null)
  useEffect(() => {
    const previous = previousUser.current
    previousUser.current = userId
    if (!previous || previous === userId) return
    queryClient.removeQueries({ queryKey: ['admin'] })
    queryClient.removeQueries({ queryKey: ['me', previous] })
    queryClient.removeQueries({ queryKey: ['tutor', previous] })
  }, [queryClient, userId])

  const signOut = useCallback(() => endSession(), [])
  const value = useMemo(() => ({ status, user, signOut }), [status, user, signOut])
  return <AuthSessionContext.Provider value={value}>{children}</AuthSessionContext.Provider>
}

export function useAuthSession() {
  const context = useContext(AuthSessionContext)
  if (!context) throw new Error('useAuthSession must be used inside AuthSessionProvider')
  return context
}

export function useRoleSession(...roles: SessionUser['role'][]) {
  const { status, user, signOut } = useAuthSession()
  const matches = Boolean(user && roles.includes(user.role))
  return { hydrated: status !== 'restoring', signedIn: matches, user: matches ? user : null, signOut }
}
