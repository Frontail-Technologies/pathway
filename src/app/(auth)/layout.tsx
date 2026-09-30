import Link from 'next/link'
import { Bookmark, GraduationCap, UserRound } from 'lucide-react'
import { Logo } from '@/components/shared/logo'

const points = [
  { icon: UserRound, text: 'Keep your profile and preferences in one place' },
  { icon: Bookmark, text: 'Save colleges, courses, scholarships, coaching and tutors' },
  { icon: GraduationCap, text: 'Pick up where you left off on any student tool' },
]


export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh bg-background lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <aside className="hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <Link href="/" aria-label="Pathway home" className="w-fit outline-none focus-visible:ring-2 focus-visible:ring-white/60">
          <Logo inverted />
        </Link>
        <div>
          <h2 className="font-heading text-4xl leading-tight font-extrabold">Your education plans, all in one place.</h2>
          <p className="mt-3 max-w-md text-base text-primary-foreground/85">A student account helps Pathway keep what matters to you close at hand.</p>
          <ul className="mt-8 flex flex-col gap-4">
            {points.map((point) => (
              <li key={point.text} className="flex items-center gap-3 text-sm">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <point.icon className="size-4.5" aria-hidden="true" />
                </span>
                {point.text}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-primary-foreground/70">© 2026 Pathway</p>
      </aside>

      <main className="flex flex-col items-center justify-center px-4 py-10">
        <Link href="/" aria-label="Pathway home" className="mb-6 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 lg:hidden">
          <Logo />
        </Link>
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  )
}
