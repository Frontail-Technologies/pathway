'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { tabHref } from '@/lib/detail-tabs'

/**
 * Detail pages used to be single pages with #anchors. Forward old links and
 * bookmarks (e.g. /college/x#placements) to the matching sub-page. Hashes
 * never reach the server, so this runs on the client.
 */
export function LegacyAnchorRedirect({ base, anchors }: { base: string; anchors: Record<string, string> }) {
  const router = useRouter()
  useEffect(() => {
    const segment = anchors[window.location.hash.slice(1)]
    if (segment !== undefined && segment !== '') router.replace(tabHref(base, segment))
  }, [router, base, anchors])
  return null
}
