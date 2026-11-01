'use client'

import Link from 'next/link'
import { CalendarClock, Inbox, UserRound } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { TutorPortrait } from '@/features/tutors/components/tutor-avatar'
import { demoTutor } from '../data/tutor-space'
import { useTutorSpace } from '../state/tutor-space-provider'

const points = [
  { icon: UserRound, text: 'Keep your public tutor profile up to date' },
  { icon: CalendarClock, text: 'Set the times you are available each week' },
  { icon: Inbox, text: 'Review and respond to session requests' },
]

/** Shown inside Tutor Space when signed out. Demo: one click signs in as the sample tutor. */
export function TutorSignIn() {
  const { signIn } = useTutorSpace()
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
        <div className="mt-6 flex items-center gap-3 rounded-[10px] border bg-muted/40 p-3">
          <TutorPortrait tutor={demoTutor} className="size-11 rounded-lg" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">{demoTutor.name}</p>
            <p className="truncate text-xs text-muted-foreground">Demo tutor account</p>
          </div>
        </div>
        <Button
          variant="cta"
          className="mt-4 h-11 w-full text-sm font-semibold"
          onClick={() => {
            signIn()
            toast.success('Signed in to the demo tutor account.')
          }}
        >
          Continue as demo tutor
        </Button>
        <p className="mt-4 rounded-lg bg-muted/60 p-3 text-xs leading-5 text-muted-foreground">Demo only: tutor sign-in is not connected to a server yet. Changes are saved on this device.</p>
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
