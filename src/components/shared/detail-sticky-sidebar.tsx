import type { ReactNode } from 'react'

/**
 * Shell-only sticky sidebar shell shared by every Public Detail screen
 * (College/Course/Scholarship/Coaching) — desktop-only, sticky beneath the
 * header, fixed width. Content stays entirely feature-specific; this
 * component owns nothing but the positioning/visibility behavior every
 * detail sidebar already needed identically.
 */
export function DetailStickySidebar({ children }: { children: ReactNode }) {
  return <div className="hidden shrink-0 lg:sticky lg:top-40 lg:z-10 lg:block lg:w-75">{children}</div>
}
