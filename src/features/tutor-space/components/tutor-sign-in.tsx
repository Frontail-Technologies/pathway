'use client'

import Link from 'next/link'
import { CalendarClock, Inbox, UserRound } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

const points = [
  { icon: UserRound, text: 'Keep your public tutor profile up to date' },
  { icon: CalendarClock, text: 'Set the times you are available each week' },
  { icon: Inbox, text: 'Review and respond to session requests' },
]

export function TutorSignIn() {
  return (
    <div className="mx-auto w-full max-w-md py-6 sm:py-10">
      <div className="rounded-[14px] border bg-card p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] sm:p-8">
        <p className="text-xs font-bold tracking-[0.14em] text-primary uppercase">For tutors</p>
        <h1 className="mt-2 font-heading text-2xl font-extrabold text-foreground">Tutor space</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage how students find you on Pathway.</p>
        <ul className="mt-5 flex flex-col gap-3">
          {points.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-sm text-foreground">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <Icon className="size-4.5" aria-hidden="true" />
              </span>
              {text}
            </li>
          ))}
        </ul>
        <Link href={{ pathname: '/login', query: { next: '/tutor-dashboard' } }} className={buttonVariants({ variant: 'cta', className: 'mt-6 h-11 w-full text-sm font-semibold' })}>
          Sign in as a tutor
        </Link>
        <Link href={{ pathname: '/register', query: { as: 'tutor' } }} className={buttonVariants({ variant: 'outline', className: 'mt-2 h-11 w-full text-sm font-semibold' })}>
          Create a tutor account
        </Link>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Looking for a tutor instead?{' '}
          <Link href="/tutors" className="font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-primary/40">
            Browse tutors
          </Link>
        </p>
      </div>
    </div>
  )
}
