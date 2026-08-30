import Link from 'next/link'
import type { Metadata } from 'next'
import { SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlobalSearch, Logo } from '@/components/shared'

export const metadata: Metadata = { title: 'Page Not Found' }

const popularDestinations = [
  { label: 'Colleges', href: '/colleges' },
  { label: 'Courses', href: '/courses' },
  { label: 'Exams', href: '/exams' },
  { label: 'Scholarships', href: '/scholarships' },
  { label: 'College Predictor', href: '/college-predictor' },
  { label: 'Counselling', href: '/counselling' },
]

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="container-shell flex flex-1 flex-col items-center justify-center py-10 sm:py-14">
        <Link href="/" className="mb-8 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:mb-10">
          <Logo />
        </Link>

        <div className="w-full max-w-160 text-center">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-xl bg-secondary text-primary sm:mb-6 sm:size-16">
            <SearchX className="size-7 sm:size-8" aria-hidden="true" />
          </div>

          <p className="font-heading text-[56px] leading-none font-extrabold text-primary sm:text-[72px]">404</p>

          <h1 className="mt-3 font-heading text-xl font-bold text-foreground sm:text-2xl">Page couldn&apos;t be found</h1>

          <p className="mx-auto mt-2.5 max-w-120 text-sm leading-6 text-muted-foreground sm:text-[15px]">
            The page you&apos;re looking for may have moved or no longer exists. Try searching again or continue exploring Pathway.
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:items-center sm:justify-center">
            <Button className="h-11 px-6 text-sm font-semibold" nativeButton={false} render={<Link href="/" />}>
              Go to Homepage
            </Button>
            <Button variant="outline" className="h-11 px-6 text-sm font-semibold" nativeButton={false} render={<Link href="/colleges" />}>
              Browse Colleges
            </Button>
          </div>

          <div className="mx-auto mt-7 max-w-105 sm:mt-8">
            <GlobalSearch compact placeholder="Search colleges, courses, exams..." />
          </div>
        </div>

        <div className="mt-9 w-full max-w-160 border-t pt-6 sm:mt-10 sm:pt-7">
          <p className="text-center text-xs font-semibold tracking-wide text-muted-foreground uppercase">Popular destinations</p>
          <nav aria-label="Popular destinations" className="mt-3.5 flex flex-wrap items-center justify-center gap-2">
            {popularDestinations.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="cursor-pointer rounded-full border bg-card px-3.5 py-1.5 text-sm font-medium text-foreground outline-none transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </main>
  )
}
