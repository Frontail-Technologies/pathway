'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft, Search } from 'lucide-react'
import { AccountBadge } from './header-account'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/shared/logo'
import { MobileNavigation } from './mobile-navigation'
import { SearchTrigger, openSearchDialog } from './search-dialog'

const DETAIL = /^\/(college|course|exam|scholarship|coaching|tutor|notes)\/[^/]+/

const iconButton = 'size-11 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:border-transparent focus-visible:ring-white/70'

function useDocumentTitle(pathname: string) {
  const [title, setTitle] = useState('')
  useEffect(() => {
    const read = () => setTitle(document.title.split(/\s+[|—–]\s+/)[0]?.trim() ?? '')
    read()
    const observer = new MutationObserver(read)
    const head = document.querySelector('head')
    if (head) observer.observe(head, { subtree: true, childList: true, characterData: true })
    return () => observer.disconnect()
  }, [pathname])
  return title
}

export function MobileHeaderBar() {
  const pathname = usePathname()
  const router = useRouter()
  const isDetail = DETAIL.test(pathname)
  const title = useDocumentTitle(pathname)

  return (
    <div className="container-shell flex h-14 items-center gap-1.5">
      {isDetail ? (
        <>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Go back"
            className={iconButton}
            onClick={() => (window.history.length > 1 ? router.back() : router.push('/'))}
          >
            <ArrowLeft className="size-5" />
          </Button>
          <p className="min-w-0 flex-1 truncate text-base font-semibold text-primary-foreground">{title}</p>
          <Button size="icon" variant="ghost" aria-label="Search" className={iconButton} onClick={() => openSearchDialog()}>
            <Search className="size-5" />
          </Button>
        </>
      ) : pathname === '/' ? (
        <>
          <MobileNavigation />
          <Link href="/" aria-label="Pathway home" className="mr-auto rounded-md outline-none focus-visible:ring-2 focus-visible:ring-white/70">
            <Logo inverted />
          </Link>
        </>
      ) : (
        <>
          <MobileNavigation />
          <SearchTrigger variant="mobile" />
        </>
      )}
      <Button size="icon" variant="ghost" aria-label="Account" className={iconButton} nativeButton={false} render={<Link href="/account" />}>
        <AccountBadge />
      </Button>
    </div>
  )
}
