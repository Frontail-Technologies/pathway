import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Bookmark, GraduationCap, PhoneCall } from 'lucide-react'
import { Logo } from '@/components/shared/logo'

const points = [
  { icon: Bookmark, text: 'Save colleges, courses and scholarships' },
  { icon: GraduationCap, text: 'Pick up any tool where you left off' },
  { icon: PhoneCall, text: 'Track enquiries and counselling call-backs' },
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="grid min-h-dvh bg-background lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <aside className="relative hidden overflow-hidden lg:block">
          <Image src="/coaching/coaching-hero.png" alt="" fill priority sizes="(min-width: 1280px) 55vw, 50vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.55)_0%,rgba(15,23,42,0.05)_30%,rgba(15,23,42,0.2)_55%,rgba(15,23,42,0.88)_100%)]" aria-hidden="true" />
          <div className="relative flex h-full flex-col justify-between p-10 text-white xl:p-12">
            <Link href="/" aria-label="Pathway home" className="w-fit rounded-md outline-none focus-visible:ring-2 focus-visible:ring-white/70">
              <Logo inverted />
            </Link>
            <div className="max-w-lg">
              <h2 className="font-heading text-[34px] leading-tight font-extrabold xl:text-[40px]">Colleges, courses and exams in one place.</h2>
              <ul className="mt-6 flex flex-col gap-3">
                {points.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-[15px] text-white/90">
                    <Icon className="size-4.5 shrink-0" aria-hidden="true" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <main className="flex flex-col px-5 pt-4 pb-10 sm:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="-ml-1 flex items-center gap-1.5 rounded-md px-1 py-2 text-sm font-medium text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/40">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Home
            </Link>
            <Link href="/" aria-label="Pathway home" className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-primary/40 lg:hidden">
              <Logo />
            </Link>
          </div>
          <div className="flex flex-1 items-start justify-center pt-8 sm:items-center sm:pt-0">
            <div className="w-full max-w-[400px]">{children}</div>
          </div>
        </main>
      </div>
  )
}
