'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { collegeTabHref, legacyCollegeAnchors } from '../config/college-tabs'

/**
 * The college page used to be one long page with #anchors. Forward old links
 * and bookmarks (e.g. /college/iit-delhi#placements) to the new sub-page.
 * Hashes never reach the server, so this has to happen on the client.
 */
export function CollegeLegacyAnchorRedirect({ slug }: { slug: string }) {
  const router = useRouter()
  useEffect(() => {
    const segment = legacyCollegeAnchors[window.location.hash.slice(1)]
    if (segment) router.replace(collegeTabHref(slug, segment))
  }, [router, slug])
  return null
}
