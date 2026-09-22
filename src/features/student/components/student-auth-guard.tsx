'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDemoAuth } from '../state/demo-auth-provider'

/**
 * Client-side gate for `/student/*`: without the local demo sign-in flag the visitor is sent to `/login`.
 * This is a UX convenience for the frontend demo, NOT security — the pages are static and the "session" is a
 * localStorage flag. Real route protection must come with real authentication.
 */
export function StudentAuthGuard({ children }: { children: React.ReactNode }) {
  const { signedIn, hydrated } = useDemoAuth()
  const router = useRouter()

  useEffect(() => {
    if (hydrated && !signedIn) router.replace('/login')
  }, [hydrated, signedIn, router])

  if (!hydrated || !signedIn) return <div className="min-h-dvh bg-background" aria-busy="true" />
  return <>{children}</>
}
