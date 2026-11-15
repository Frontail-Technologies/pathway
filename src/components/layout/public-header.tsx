import Link from 'next/link'
import { Logo } from '@/components/shared/logo'
import { ExploreMenu } from './explore-menu'
import { HeaderAccount } from './header-account'
import { MobileHeaderBar } from './mobile-header-bar'
import { SearchDialog, SearchTrigger } from './search-dialog'
import { SectionNavigation } from './section-navigation'

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
            <div className="flex shrink-0 items-center">
              <HeaderAccount />
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
