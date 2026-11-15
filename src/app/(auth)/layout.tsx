import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/shared/logo'
import { HeroScene } from '@/components/shared/landing-art'
import { SpotArt, type SpotArtName } from '@/components/shared/spot-art'

const points: { art: SpotArtName; title: string; text: string }[] = [
  { art: 'college', title: 'Save your shortlist', text: 'Colleges, courses and scholarships in one place' },
  { art: 'predictor', title: 'Pick up any tool', text: 'Predictors and your resume, right where you left them' },
  { art: 'guide', title: 'Track your enquiries', text: 'Counselling call-backs and replies from colleges' },
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh bg-background lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
      <aside className="relative hidden overflow-hidden bg-primary text-primary-foreground lg:block">
        <div className="relative flex h-full flex-col justify-between gap-8 p-10 xl:p-12">
          <Link href="/" aria-label="Pathway home" className="w-fit rounded-md outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/70">
            <Logo inverted />
          </Link>
          <div className="mx-auto w-full max-w-md">
            <HeroScene name="about" />
          </div>
          <div className="max-w-lg">
            <h2 className="font-heading text-[32px] leading-tight font-extrabold xl:text-[38px]">Colleges, courses and exams in one place</h2>
            <ul className="mt-6 flex flex-col gap-4">
              {points.map((point) => (
                <li key={point.title} className="flex items-center gap-3.5">
                  <SpotArt name={point.art} className="size-11 bg-card" />
                  <span>
                    <span className="block text-[15px] font-semibold">{point.title}</span>
                    <span className="block text-sm text-primary-foreground/80">{point.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      <main className="flex flex-col">
        <div className="flex items-center justify-between bg-primary px-5 py-3 text-primary-foreground sm:px-8 lg:bg-transparent lg:text-muted-foreground">
          <Link href="/" className="-ml-1 flex items-center gap-1.5 rounded-md px-1 py-2 text-sm font-medium outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-primary/40 lg:hover:text-foreground lg:hover:opacity-100">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Home
          </Link>
          <Link href="/" aria-label="Pathway home" className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/60 lg:hidden">
            <Logo inverted />
          </Link>
        </div>
        <div className="flex flex-1 items-start justify-center px-5 pt-8 pb-10 sm:items-center sm:px-8 sm:pt-0">
          <div className="w-full max-w-[420px]">{children}</div>
        </div>
      </main>
    </div>
  )
}
