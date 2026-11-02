'use client'

import { useCallback } from 'react'
import { ADMIN_STORAGE_KEYS } from '@/features/admin/data/admin-demo-storage'
import { logAdminActivity } from '@/features/admin/data/admin-activity'
import type { AdminStream, StreamPublishOverrides } from '@/features/admin/data/admin-streams'
import { useDemoStorage } from '@/features/admin/hooks/use-demo-storage'

/** Published state per hub: the live value unless changed on this device (demo). */
export function useStreamPublish() {
  const [overrides, setOverrides] = useDemoStorage<StreamPublishOverrides>(ADMIN_STORAGE_KEYS.streamPublish, {})

  const isPublished = useCallback((stream: AdminStream) => overrides[stream.slug] ?? stream.livePublished, [overrides])
  const isOverridden = useCallback((stream: AdminStream) => stream.slug in overrides && overrides[stream.slug] !== stream.livePublished, [overrides])

  const setPublished = useCallback(
    (stream: AdminStream, published: boolean) => {
      setOverrides((previous) => {
        const next = { ...previous }
        if (published === stream.livePublished) delete next[stream.slug]
        else next[stream.slug] = published
        return next
      })
      logAdminActivity({ area: 'Streams', action: published ? 'Published' : 'Unpublished', label: `${stream.name} hub`, href: `/admin/streams/${stream.slug}` })
    },
    [setOverrides],
  )

  return { isPublished, isOverridden, setPublished }
}
