'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useDemoAuth } from '../state/demo-auth-provider'





 
export function StudentAuthGuard({ children }: { children: React.ReactNode }) {
  const { signedIn, hydrated } = useDemoAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Come back to the page they asked for after signing in.
    if (hydrated && !signedIn) router.replace(`/login?next=${encodeURIComponent(pathname)}`)
  }, [hydrated, signedIn, router, pathname])

  if (!hydrated || !signedIn) return <div className="min-h-dvh bg-background" aria-busy="true" />
  return <>{children}</>
}
