'use client'

import { useCallback, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

/**
 * List filters kept in the URL (?q=…&type=…), so Back, refresh and shared links keep the same view.
 * Defaults are omitted from the URL. Uses replace() so typing in search doesn't flood history.
 */
export function useUrlFilters<T extends Record<string, string>>(defaults: T) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const values = useMemo(() => {
    const next = { ...defaults }
    for (const key of Object.keys(defaults) as (keyof T)[]) {
      const value = params.get(key as string)
      if (value !== null) next[key] = value as T[keyof T]
    }
    return next
  }, [defaults, params])

  const set = useCallback(
    (patch: Partial<T>) => {
      const next = new URLSearchParams(params.toString())
      for (const [key, value] of Object.entries(patch)) {
        if (value === undefined || value === defaults[key]) next.delete(key)
        else next.set(key, value as string)
      }
      const query = next.toString()
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
    },
    [defaults, params, pathname, router],
  )

  const reset = useCallback(() => router.replace(pathname, { scroll: false }), [pathname, router])
  const active = (Object.keys(defaults) as (keyof T)[]).some((key) => values[key] !== defaults[key])

  return { values, set, reset, active }
}
