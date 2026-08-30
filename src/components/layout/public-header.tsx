import Link from 'next/link'
import { UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/shared/logo'
import { GlobalSearch } from '@/components/shared/global-search'
import { DesktopNavigation } from './desktop-navigation'
import { MobileNavigation } from './mobile-navigation'
import { publicNavigation } from '@/config/navigation'

const headerNavItems = publicNavigation.filter((item) => !['About', 'Contact'].includes(item.label))

export function PublicHeader() { return <header className="sticky top-0 z-30 bg-primary"><div className="container-shell flex h-14 items-center gap-3 px-4 md:h-16"><div className="flex items-center gap-2"><div className="md:hidden"><MobileNavigation /></div><Link href="/" aria-label="Pathway home"><Logo inverted /></Link></div><div className="hidden min-w-0 flex-1 justify-center px-4 md:flex"><div className="w-full max-w-xl"><GlobalSearch compact /></div></div><div className="ml-auto flex items-center gap-1"><Button variant="ghost" className="hidden text-primary-foreground/90 hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:border-transparent focus-visible:ring-white/70 sm:inline-flex">Sign in</Button><Button size="icon" variant="ghost" aria-label="Profile" className="size-11 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:border-transparent focus-visible:ring-white/70"><UserRound className="size-5" /></Button></div></div><nav aria-label="Primary navigation" className="hidden border-t border-primary-foreground/10 md:block"><div className="container-shell flex h-10 items-center px-4"><DesktopNavigation items={headerNavItems} /></div></nav><div className="container-shell border-t border-primary-foreground/10 px-4 py-2 md:hidden"><GlobalSearch compact placeholder="Search colleges, courses..." /></div></header> }
