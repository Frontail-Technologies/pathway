'use client'

import type { ComponentType } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Bookmark, BookOpen, FileText, LayoutDashboard, LogOut, MessagesSquare, SlidersHorizontal, UserRound } from 'lucide-react'
import { studentNavigation } from '@/config/navigation'
import { useDemoAuth } from '@/features/student/state/demo-auth-provider'

const icons: Record<(typeof studentNavigation)[number]['id'], ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>> = {
  dashboard: LayoutDashboard,
  profile: UserRound,
  preferences: SlidersHorizontal,
  saved: Bookmark,
  notes: BookOpen,
  enquiries: MessagesSquare,
  resume: FileText,
}

 
export function StudentNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const { signOut } = useDemoAuth()

  
  const logOut = () => {
    signOut()
    onNavigate?.()
    toast.success('Signed out of the demo account.')
    router.push('/login')
  }

  return (
    <nav aria-label="Student navigation" className="flex flex-col gap-1">
      {studentNavigation.map((item) => {
        const Icon = icons[item.id]
        const base = 'flex min-h-10 items-center gap-3 rounded-md px-3 text-sm font-medium outline-none'

        if (!item.available) {
          return (
            <span key={item.id} aria-disabled="true" className={`${base} cursor-not-allowed text-muted-foreground/70`}>
              <Icon className="size-4.5 shrink-0" aria-hidden="true" />
              <span className="flex-1">{item.label}</span>
              <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase">Soon</span>
            </span>
          )
        }

        const active = pathname === item.href
        return (
          <Link
            key={item.id}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={`${base} transition-colors focus-visible:ring-2 focus-visible:ring-primary/40 ${active ? 'bg-secondary font-semibold text-primary' : 'text-foreground hover:bg-muted hover:text-primary'}`}
          >
            <Icon className={`size-4.5 shrink-0 ${active ? 'text-primary' : 'text-muted-foreground'}`} aria-hidden="true" />
            {item.label}
          </Link>
        )
      })}
      <button type="button" onClick={logOut} className="mt-1 flex min-h-10 cursor-pointer items-center gap-3 rounded-md border-t px-3 pt-1 text-sm font-medium text-foreground outline-none transition-colors hover:bg-muted hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40">
        <LogOut className="size-4.5 shrink-0 text-muted-foreground" aria-hidden="true" />
        Log out
      </button>
    </nav>
  )
}
