'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDemoAuth } from '../state/demo-auth-provider'





 
export function StudentAuthGuard({ children }: { children: React.ReactNode }) {
  const { signedIn, hydrated } = useDemoAuth()
  const router = useRouter()

  useEffect(() => {
    if (hydrated && !signedIn) router.replace('/login')
  }, [hydrated, signedIn, router])

  if (!hydrated || !signedIn) return <div className="min-h-dvh bg-background" aria-busy="true" />
  return <>{children}</>
}
