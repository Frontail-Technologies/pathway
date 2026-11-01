import type { ReactNode } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

/** Overview-page summary of one sub-page, ending in a "View all" link into it. */
export function CollegePreviewCard({ title, href, linkLabel, children }: { title: string; href: string; linkLabel: string; children: ReactNode }) {
  return (
    <section className="border-b py-7 lg:py-9">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">{title}</h2>
        <Link href={href} className="hidden shrink-0 items-center gap-0.5 text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-primary/40 sm:flex">
          {linkLabel}
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-4">{children}</div>
      <Link href={href} className="mt-3 flex h-11 items-center justify-center gap-1 rounded-[10px] border bg-card text-sm font-semibold text-primary outline-none active:bg-secondary focus-visible:ring-2 focus-visible:ring-primary/40 sm:hidden">
        {linkLabel}
        <ChevronRight className="size-4" aria-hidden="true" />
      </Link>
    </section>
  )
}
