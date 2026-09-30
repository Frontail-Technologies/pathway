'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItem = { label: string; href: string }

 
export function DesktopNavigation({ items }: { items: readonly NavItem[] }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Primary navigation" className="flex h-full items-stretch gap-0 xl:gap-1 2xl:gap-4">
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className="group relative flex shrink-0 items-center px-0.5 outline-none xl:px-1.5 2xl:px-3"
          >
            <span
              className={`rounded-full px-2.5 py-1.5 text-[13px] xl:text-[14px] leading-none whitespace-nowrap transition-colors duration-150 group-focus-visible:ring-2 group-focus-visible:ring-white/70 xl:px-3 2xl:px-4 2xl:text-[15px] ${
                isActive ? 'bg-white/14 font-semibold text-white' : 'font-medium text-white/80 group-hover:bg-white/8 group-hover:text-white'
              }`}
            >
              {item.label}
            </span>
            {isActive && <span className="absolute inset-x-2 bottom-0 xl:inset-x-4 h-[3px] rounded-t-full bg-white" aria-hidden="true" />}
          </Link>
        )
      })}
    </nav>
  )
}
