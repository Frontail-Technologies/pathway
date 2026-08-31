import Link from 'next/link'
import { Button } from '@/components/ui/button'

/**
 * The compact 404 body only — no header/footer/nav. Reused by both:
 * - `src/app/not-found.tsx` (truly unmatched top-level paths, which render
 *   outside every route group's layout, so it builds the full shell itself)
 * - `src/app/(public)/not-found.tsx` (a `notFound()` thrown by any page
 *   inside the `(public)` route group, which is already wrapped by
 *   `(public)/layout.tsx`'s PublicHeader/PublicFooter)
 *
 * SHORT PUBLIC PAGE height rule (see `docs/RESPONSIVE_RULES.md`): on mobile
 * this stays a compact, naturally-scrolling `60dvh` — never force a huge
 * empty viewport there. At `md:` and up it switches to
 * `100dvh - <header height>`, so `header + content` together fill exactly
 * one viewport and the footer starts right at the fold instead of a blind
 * `h-screen` (header + 100vh + footer) forcing extra scroll. `6.5rem` (104px)
 * is `PublicHeader`'s own measured height at `md:` and up (64px primary row
 * + 40px nav row) — see `CollegeDetailNav`'s offset comment for the same
 * figure. Reuse this exact min-height pattern for any future short utility
 * page (generic Error, maintenance, empty-state pages) — do not reinvent it
 * per page, and never apply it to a long discovery/detail/listing page.
 */
export function NotFoundContent() {
  return (
    <div className="flex min-h-[60dvh] items-center justify-center px-4 py-12 sm:py-20 md:min-h-[calc(100dvh-6.5rem)]">
      <div className="w-full max-w-md text-center">
        <p className="font-heading text-5xl font-extrabold text-primary sm:text-[64px]">404</p>
        <h1 className="mt-2 font-heading text-xl font-bold text-foreground sm:text-2xl">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          The page you&apos;re looking for may have moved or no longer exists.
        </p>
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-center">
          <Button className="h-11 px-6 text-sm font-semibold" nativeButton={false} render={<Link href="/" />}>
            Go to Homepage
          </Button>
          <Button variant="outline" className="h-11 px-6 text-sm font-semibold" nativeButton={false} render={<Link href="/colleges" />}>
            Browse Colleges
          </Button>
        </div>
      </div>
    </div>
  )
}
