import { PublicHeader } from '@/components/layout/public-header'
import { PublicFooter } from '@/components/layout/public-footer'
import { MobileBottomNavigation } from '@/components/layout/mobile-navigation'

export default function StudentToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pw-bottom-nav-space flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
      <MobileBottomNavigation />
    </div>
  )
}
