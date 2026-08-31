import type { Metadata } from 'next'
import { PublicHeader } from '@/components/layout/public-header'
import { PublicFooter } from '@/components/layout/public-footer'
import { MobileBottomNavigation } from '@/components/layout/mobile-navigation'
import { NotFoundContent } from '@/components/shared/not-found-content'

export const metadata: Metadata = { title: 'Page Not Found' }

// Used only for a truly unmatched top-level path — one that doesn't fall
// under any route group's segment tree, so no layout already renders a
// shell around it. Missing routes *inside* `(public)` (e.g. an unknown
// `/course/[slug]`) use `(public)/not-found.tsx` instead, which relies on
// `(public)/layout.tsx`'s own PublicHeader/PublicFooter — see that file's
// comment for why both are needed.
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col pb-15 md:pb-0">
      <PublicHeader />
      <NotFoundContent />
      <PublicFooter />
      <MobileBottomNavigation />
    </div>
  )
}
