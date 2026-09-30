import type { Metadata } from 'next'
import { PublicHeader } from '@/components/layout/public-header'
import { PublicFooter } from '@/components/layout/public-footer'
import { MobileBottomNavigation } from '@/components/layout/mobile-navigation'
import { NotFoundContent } from '@/components/shared/not-found-content'

export const metadata: Metadata = { title: 'Page Not Found' }







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
