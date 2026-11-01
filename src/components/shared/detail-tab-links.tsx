import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

/** "Explore" tiles on an overview tab, one per other sub-page. */
export function DetailTabLinks({ title, items }: { title: string; items: { href: string; label: string; teaser?: string }[] }) {
  if (items.length === 0) return null
  return (
    <section className="border-b py-7 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">{title}</h2>
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="group flex min-h-16 items-center gap-3 rounded-[10px] border bg-card px-4 py-3 outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40 active:bg-secondary">
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-foreground group-hover:text-primary">{item.label}</span>
                {item.teaser && <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">{item.teaser}</span>}
              </span>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground/60 group-hover:text-primary" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
