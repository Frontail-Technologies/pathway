'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useStudentSession } from '../state/student-session'





 
export function StudentAuthGuard({ children }: { children: React.ReactNode }) {
  const { signedIn, hydrated } = useStudentSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (hydrated && !signedIn) router.replace(`/login?next=${encodeURIComponent(pathname)}`)
  }, [hydrated, signedIn, router, pathname])

  if (!hydrated || !signedIn) return <div className="min-h-dvh bg-background" aria-busy="true" />
  return <>{children}</>
}
