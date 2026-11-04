'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ADMIN_STORAGE_EVENT, readAdminStorage, writeAdminStorage, type AdminStorageKey } from '@/features/admin/data/admin-demo-storage'

export function useDemoStorage<T>(key: AdminStorageKey, fallback: T) {
  const [value, setValue] = useState<T>(fallback)
  const [loaded, setLoaded] = useState(false)
  const current = useRef(fallback)

  useEffect(() => {
    const load = () => {
      const stored = readAdminStorage(key, fallback)
      current.current = stored
      setValue(stored)
    }
    load()
    setLoaded(true)
    const onChange = (event: Event) => {
      const changed = (event as CustomEvent<{ key: string }>).detail?.key
      if (changed === key || changed === 'all') load()
    }
    const onStorage = (event: StorageEvent) => {
      if (event.key === key || event.key === null) load()
    }
    window.addEventListener(ADMIN_STORAGE_EVENT, onChange)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener(ADMIN_STORAGE_EVENT, onChange)
      window.removeEventListener('storage', onStorage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fallback is a default, not a dependency
  }, [key])

  const save = useCallback(
    (next: T | ((previous: T) => T)) => {
      const resolved = typeof next === 'function' ? (next as (previous: T) => T)(current.current) : next
      current.current = resolved
      setValue(resolved)
      writeAdminStorage(key, resolved)
    },
    [key],
  )

  return [value, save, loaded] as const
}
