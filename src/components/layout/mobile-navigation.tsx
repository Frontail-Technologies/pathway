'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Award,
  Bookmark,
  BookOpen,
  Briefcase,
  Building2,
  CalendarCheck,
  ChevronRight,
  FileText,
  Globe,
  House,
  Info,
  Landmark,
  Library,
  Menu,
  MessagesSquare,
  Presentation,
  Search,
  Star,
  UserRound,
  X,
} from 'lucide-react'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/shared/logo'

const navGroups = [
  {
    title: 'Discover',
    items: [
      { label: 'Colleges', href: '/colleges', icon: Landmark },
      { label: 'Courses', href: '/courses', icon: BookOpen },
      { label: 'Exams', href: '/exams', icon: FileText },
      { label: 'Admissions', href: '/admissions', icon: CalendarCheck },
      { label: 'Scholarships', href: '/scholarships', icon: Award },
      { label: 'Study Abroad', href: '/study-abroad', icon: Globe },
    ],
  },
  {
    title: 'Guidance',
    items: [
      { label: 'Counselling', href: '/counselling', icon: MessagesSquare },
      { label: 'Tutors & Coaching', href: '/tutors', icon: Presentation },
      { label: 'Reviews', href: '/reviews', icon: Star },
      { label: 'Careers', href: '/careers', icon: Briefcase },
    ],
  },
  {
    title: 'More',
    items: [
      { label: 'Resources', href: '/resources', icon: Library },
      { label: 'About', href: '/about', icon: Info },
    ],
  },
] as const

export function MobileNavigation() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation"
            className="size-11 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:border-transparent focus-visible:ring-white/70"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="left" showCloseButton={false} className="flex w-[min(86vw,350px)] flex-col gap-0 p-0">
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>

        <div className="flex h-14 shrink-0 items-center justify-between border-b px-4">
          <Link href="/" aria-label="Pathway home">
            <Logo />
          </Link>
          <SheetClose render={<Button variant="ghost" size="icon" aria-label="Close navigation" className="size-11 text-muted-foreground hover:bg-muted hover:text-foreground" />}>
            <X className="size-5" />
          </SheetClose>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
          <Link href="/search" className="mb-5 flex h-11 items-center gap-2 rounded-lg border bg-muted px-3 text-sm text-muted-foreground outline-none transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40">
            <Search className="size-4 shrink-0" aria-hidden="true" />
            Search colleges, courses...
          </Link>

          {navGroups.map((group) => (
            <div key={group.title} className="mb-5 last:mb-0">
              <p className="mb-1 px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">{group.title}</p>
              <nav className="flex flex-col">
                {group.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`group flex h-11 items-center gap-3 rounded-md px-3 text-sm outline-none transition-colors focus-visible:bg-secondary focus-visible:text-primary ${isActive ? 'bg-secondary font-semibold text-primary' : 'font-medium text-foreground hover:bg-secondary hover:text-primary'}`}
                    >
                      <item.icon className={`size-4.5 shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} aria-hidden="true" />
                      <span className="flex-1">{item.label}</span>
                      <ChevronRight className={`size-4 shrink-0 ${isActive ? 'text-primary/60' : 'text-muted-foreground/50'}`} aria-hidden="true" />
                    </Link>
                  )
                })}
              </nav>
            </div>
          ))}

          <div className="flex flex-col gap-2 rounded-[10px] border bg-secondary p-3">
            <p className="text-sm font-semibold text-secondary-foreground">Need help choosing?</p>
            <p className="text-xs leading-5 text-muted-foreground">Get free guidance from our counsellors.</p>
            <Button variant="cta" className="h-9 w-fit px-4 text-xs" nativeButton={false} render={<Link href="/counselling" />}>
              Get Free Counselling
            </Button>
          </div>
        </div>

        <div className="shrink-0 border-t p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <Link href="/login" className="flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium text-foreground outline-none transition-colors hover:bg-muted focus-visible:bg-muted">
            <UserRound className="size-4.5 shrink-0 text-muted-foreground" aria-hidden="true" />
            Sign in
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function MobileBottomNavigation() {
  const pathname = usePathname()
  const items = [
    { label: 'Home', href: '/', icon: House },
    { label: 'Colleges', href: '/colleges', icon: Building2 },
    { label: 'Courses', href: '/courses', icon: BookOpen },
    { label: 'Saved', href: '/saved', icon: Bookmark },
    { label: 'Profile', href: '/profile', icon: UserRound },
  ]
  return (
    <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-20 border-t bg-card pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5">
        {items.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? 'page' : undefined}
              className="relative flex min-h-11 flex-col items-center justify-center gap-0.5 text-[11px] outline-none transition-colors duration-150 motion-reduce:transition-none active:bg-cta/10 focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {isActive && <span aria-hidden="true" className="absolute top-0 h-0.75 w-6 rounded-full bg-cta" />}
              <Icon className={isActive ? 'size-5 text-cta' : 'size-5 text-muted-foreground'} aria-hidden="true" />
              <span className={isActive ? 'font-semibold text-cta' : 'text-muted-foreground'}>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
