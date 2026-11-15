'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { headerSectionFor, publicNavigation } from '@/config/navigation'
import { cn } from '@/lib/utils'

const mainItems = publicNavigation.filter((item) => !['About', 'Contact'].includes(item.label))

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className="group relative flex shrink-0 items-center px-1 outline-none"
    >
      <span
        className={cn(
          'rounded-full px-3 py-1.5 text-[14px] leading-none whitespace-nowrap transition-colors group-focus-visible:ring-2 group-focus-visible:ring-white/70',
          active ? 'font-semibold text-white' : 'font-medium text-white/80 group-hover:bg-white/10 group-hover:text-white',
        )}
      >
        {label}
      </span>
      {active ? <span className="absolute inset-x-3 bottom-0 h-[3px] rounded-t-full bg-white" aria-hidden="true" /> : null}
    </Link>
  )
}

export function SectionNavigation() {
  const pathname = usePathname()
  const section = headerSectionFor(pathname)

  if (!section) {
    return (
      <nav aria-label="Primary navigation" className="flex h-full items-stretch overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {mainItems.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} active={pathname === item.href || pathname.startsWith(`${item.href}/`)} />
        ))}
      </nav>
    )
  }

  return (
    <nav aria-label={`${section.label} navigation`} className="flex h-full min-w-0 items-stretch">
      <span className="mr-2 flex shrink-0 items-center border-r border-white/15 pr-4 text-[13px] font-semibold tracking-wide text-white/60 uppercase">{section.label}</span>
      <div className="flex min-w-0 items-stretch overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {section.links.map((link) => (
          <NavLink key={link.href} href={link.href} label={link.label} active={!link.href.includes('?') && pathname === link.href} />
        ))}
      </div>
    </nav>
  )
}
