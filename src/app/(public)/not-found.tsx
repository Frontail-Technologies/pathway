import type { Metadata } from 'next'
import { NotFoundContent } from '@/components/shared/not-found-content'
import { MobileBottomNavigation } from '@/components/layout/mobile-navigation'

export const metadata: Metadata = { title: 'Page Not Found' }










export default function PublicNotFound() {
  return (
    <>
      <NotFoundContent />
      <MobileBottomNavigation />
    </>
  )
}
