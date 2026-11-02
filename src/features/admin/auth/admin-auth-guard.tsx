'use client'

import { useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useAdminSession } from './admin-session'

/** Sends signed-out visitors to /admin/login and brings them back to the page they asked for. */
export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { session, hydrated } = useAdminSession()
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  useEffect(() => {
    if (hydrated && !session) {
      const query = params.toString()
      const here = query ? `${pathname}?${query}` : pathname
      router.replace(`/admin/login?next=${encodeURIComponent(here)}`)
    }
  }, [hydrated, session, pathname, params, router])

  if (!hydrated || !session) return <div className="min-h-dvh bg-admin-canvas" data-theme="admin" aria-busy="true" />
  return <>{children}</>
}
