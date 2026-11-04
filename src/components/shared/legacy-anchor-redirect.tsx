'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { tabHref } from '@/lib/detail-tabs'

export function LegacyAnchorRedirect({ base, anchors }: { base: string; anchors: Record<string, string> }) {
  const router = useRouter()
  useEffect(() => {
    const segment = anchors[window.location.hash.slice(1)]
    if (segment !== undefined && segment !== '') router.replace(tabHref(base, segment))
  }, [router, base, anchors])
  return null
}
