'use client'

import { useCallback, useEffect, useState } from 'react'

/**
 * Demo admin session. There is no auth server yet, so the session lives in the browser:
 * localStorage when "Keep me signed in" is on, sessionStorage (cleared when the browser closes) otherwise.
 */
export const ADMIN_SESSION_KEY = 'pathway.adminSession.v1'

export type AdminSession = { email: string; name: string; signedInAt: string }

function read(): AdminSession | null {
  try {
    const raw = window.localStorage.getItem(ADMIN_SESSION_KEY) ?? window.sessionStorage.getItem(ADMIN_SESSION_KEY)
    const parsed = raw ? (JSON.parse(raw) as Partial<AdminSession>) : null
    return parsed?.email ? { email: parsed.email, name: parsed.name ?? 'Administrator', signedInAt: parsed.signedInAt ?? '' } : null
  } catch {
    return null
  }
}

export function startAdminSession(email: string, remember: boolean): AdminSession {
  const local = email.split('@')[0] ?? 'admin'
  const name = local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase() + part.slice(1))
    .join(' ')
  const session = { email, name: name || 'Administrator', signedInAt: new Date().toISOString() }
  try {
    window.localStorage.removeItem(ADMIN_SESSION_KEY)
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY)
    ;(remember ? window.localStorage : window.sessionStorage).setItem(ADMIN_SESSION_KEY, JSON.stringify(session))
  } catch {
    // Storage blocked (private mode): the session still works until reload.
  }
  return session
}

export function endAdminSession() {
  try {
    window.localStorage.removeItem(ADMIN_SESSION_KEY)
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY)
  } catch {
    // ignore
  }
}

export function useAdminSession() {
  const [session, setSession] = useState<AdminSession | null>(null)
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => {
    setSession(read())
    setHydrated(true)
  }, [])
  const signOut = useCallback(() => {
    endAdminSession()
    setSession(null)
  }, [])
  return { session, hydrated, signOut }
}

/** Only admin paths are allowed after sign-in, so a crafted ?next= can't send staff elsewhere. */
export function safeAdminNext(next: string | undefined): string {
  if (!next || !next.startsWith('/admin') || next.startsWith('/admin/login') || next.includes('//')) return '/admin'
  return next
}
