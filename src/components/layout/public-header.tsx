import Link from 'next/link'
import { UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/shared/logo'
import { ExploreMenu } from './explore-menu'
import { MobileHeaderBar } from './mobile-header-bar'
import { SearchDialog, SearchTrigger } from './search-dialog'
import { SectionNavigation } from './section-navigation'

const iconButtonClass = 'text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:border-transparent focus-visible:ring-white/70'

const blueSurface = 'pw-brand-surface'

export function PublicHeader() {
  return (
    <>
      <header className={`web-chrome sticky top-0 z-30 pt-[env(safe-area-inset-top)] ${blueSurface} shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(15,23,42,0.12)]`}>
        <div className="lg:hidden">
          <MobileHeaderBar />
        </div>

        <div className="hidden lg:block">
          <div className="container-shell flex h-15 items-center gap-4">
            <Link href="/" aria-label="Pathway home" className="shrink-0 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-white/70">
              <Logo inverted className="text-[26px]" />
            </Link>
            <ExploreMenu />
            <div className="mx-auto w-full max-w-160 min-w-0">
              <SearchTrigger variant="desktop" />
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Button variant="ghost" className={`text-[15px] font-semibold ${iconButtonClass}`} nativeButton={false} render={<Link href="/login" />}>
                Sign in
              </Button>
              <Button size="icon" variant="ghost" aria-label="Account" className={`rounded-full bg-primary-foreground/12 ${iconButtonClass}`} nativeButton={false} render={<Link href="/account" />}>
                <UserRound className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className="web-chrome pw-brand-surface pw-brand-surface-lower hidden border-t border-white/10 lg:block">
        <div className="container-shell flex h-11">
          <SectionNavigation />
        </div>
      </div>
      <SearchDialog />
    </>
  )
}
