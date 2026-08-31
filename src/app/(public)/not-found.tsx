import type { Metadata } from 'next'
import { NotFoundContent } from '@/components/shared/not-found-content'
import { MobileBottomNavigation } from '@/components/layout/mobile-navigation'

export const metadata: Metadata = { title: 'Page Not Found' }

// Closer `not-found` boundary for any `notFound()` thrown by a page inside
// this `(public)` route group (e.g. an unknown `/course/[slug]` or
// `/college/[slug]`). `(public)/layout.tsx` already renders PublicHeader/
// PublicFooter around whatever this segment resolves to, so this file must
// render ONLY the 404 body — adding the shell again here is what caused the
// duplicated header/footer bug (root `not-found.tsx` used to be the only
// not-found file, so Next fell back to it even for matched-but-missing
// `(public)` routes, and it built its own full shell on top of the one
// `(public)/layout.tsx` had already rendered).
export default function PublicNotFound() {
  return (
    <>
      <NotFoundContent />
      <MobileBottomNavigation />
    </>
  )
}
