'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { CalendarClock, Inbox, LayoutDashboard, LogOut, Settings, UserRound, type LucideIcon } from 'lucide-react'
import { useTutorSpace } from '../state/tutor-space-provider'

export const tutorSpaceNavigation: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/tutor-dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/tutor-dashboard/profile', label: 'Profile', icon: UserRound },
  { href: '/tutor-dashboard/availability', label: 'Availability', icon: CalendarClock },
  { href: '/tutor-dashboard/requests', label: 'Session Requests', icon: Inbox },
  { href: '/tutor-dashboard/settings', label: 'Settings', icon: Settings },
]

export function useTutorSignOut() {
  const { signOut } = useTutorSpace()
  const router = useRouter()
  return () => {
    void signOut().then(() => {
      toast.success('Signed out.')
      router.push('/tutor-dashboard')
    })
  }
}

export function TutorSpaceNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { state } = useTutorSpace()
  const signOut = useTutorSignOut()
  const newRequests = state.requests.filter((request) => request.status === 'new').length

  return (
    <nav aria-label="Tutor navigation" className="flex flex-col gap-1">
      {tutorSpaceNavigation.map(({ href, label, icon: Icon }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={`flex min-h-10 items-center gap-3 rounded-md px-3 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40 ${active ? 'bg-secondary font-semibold text-primary' : 'text-foreground hover:bg-muted hover:text-primary'}`}
          >
            <Icon className={`size-4.5 shrink-0 ${active ? 'text-primary' : 'text-muted-foreground'}`} aria-hidden="true" />
            <span className="flex-1">{label}</span>
            {href.endsWith('/requests') && newRequests > 0 && (
              <span className="rounded-full bg-cta px-1.5 py-0.5 text-[10px] font-bold text-cta-foreground" aria-label={`${newRequests} new`}>
                {newRequests}
              </span>
            )}
          </Link>
        )
      })}
      <button
        type="button"
        onClick={() => {
          onNavigate?.()
          signOut()
        }}
        className="mt-1 flex min-h-10 cursor-pointer items-center gap-3 rounded-md border-t px-3 pt-1 text-sm font-medium text-foreground outline-none transition-colors hover:bg-muted hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <LogOut className="size-4.5 shrink-0 text-muted-foreground" aria-hidden="true" />
        Log out
      </button>
    </nav>
  )
}
