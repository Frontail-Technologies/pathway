import Link from 'next/link'
import { UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/shared/logo'
import { GlobalSearch } from '@/components/shared/global-search'
import { DesktopNavigation } from './desktop-navigation'
import { MobileNavigation } from './mobile-navigation'
import { publicNavigation } from '@/config/navigation'

const headerNavItems = publicNavigation.filter((item) => !['About', 'Contact'].includes(item.label))

const iconButtonClass = 'text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:border-transparent focus-visible:ring-white/70'






 
export function PublicHeader() {
  return (
    <header className="web-chrome sticky top-0 z-30 pt-[env(safe-area-inset-top)] bg-[linear-gradient(180deg,var(--brand-blue)_0%,var(--brand-blue-dark)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(15,23,42,0.12)]">
      <div className="lg:hidden">
        <div className="container-shell flex h-14 items-center gap-3">
          <div className="flex items-center gap-2">
            <MobileNavigation />
            <Link href="/" aria-label="Pathway home">
              <Logo inverted />
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" className={`hidden sm:inline-flex ${iconButtonClass}`} nativeButton={false} render={<Link href="/login" />}>
              Sign in
            </Button>
            <Button size="icon" variant="ghost" aria-label="Account" className={`size-11 ${iconButtonClass}`} nativeButton={false} render={<Link href="/account" />}>
              <UserRound className="size-5" />
            </Button>
          </div>
        </div>
        <div className="container-shell border-t border-primary-foreground/10 py-2">
          <GlobalSearch compact placeholder="Search colleges, courses..." />
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="container-shell grid h-18 grid-cols-[minmax(150px,1fr)_minmax(0,760px)_minmax(150px,1fr)] items-center gap-6">
          <Link href="/" aria-label="Pathway home" className="w-fit rounded-md outline-none focus-visible:ring-2 focus-visible:ring-white/70">
            <Logo inverted className="text-[28px]" />
          </Link>
          <GlobalSearch quiet />
          <div className="flex items-center justify-end gap-3">
            <span className="h-8 w-px bg-primary-foreground/20" aria-hidden="true" />
            <Button variant="ghost" className={`text-[15px] font-semibold ${iconButtonClass}`} nativeButton={false} render={<Link href="/login" />}>
              Sign in
            </Button>
            <Button size="icon" variant="ghost" aria-label="Account" className={`size-10 rounded-full bg-primary-foreground/12 ${iconButtonClass}`} nativeButton={false} render={<Link href="/account" />}>
              <UserRound className="size-5" />
            </Button>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 bg-black/10">
          <div className="container-shell flex h-12">
            <DesktopNavigation items={headerNavItems} />
          </div>
        </div>
      </div>
    </header>
  )
}
