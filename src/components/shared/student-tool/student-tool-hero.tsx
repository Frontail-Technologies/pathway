import type { LucideIcon } from 'lucide-react'
import { Container } from '@/components/shared/container'

export type StudentToolBenefit = { icon: LucideIcon; label: string }

type StudentToolHeroProps = {
  titleLead: string
  titleAccent: string
  description: string
  benefits?: StudentToolBenefit[]
  /** Defaults to "Student Tool". */
  eyebrow?: string
  /** Optional content under the description (e.g. a search field). */
  children?: React.ReactNode
  /** Decorative right-side artwork (desktop only) — supplied by each tool, never data or charts. */
  artwork: React.ReactNode
}

/** Shared Student Tool hero: light blue-white gradient, blue accent word in the H1, optional benefit chips, tool-specific artwork slot. */
export function StudentToolHero({ titleLead, titleAccent, description, benefits, eyebrow = 'Student Tool', children, artwork }: StudentToolHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.16),transparent_45%),linear-gradient(180deg,var(--brand-blue-light),var(--background))]">
      <Container className="flex min-h-44 items-center justify-between gap-8 px-4 py-6 lg:min-h-64 lg:py-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.18em] text-primary uppercase sm:text-sm">{eyebrow}</p>
          <h1 className="mt-2 font-heading text-[32px] leading-tight font-extrabold text-foreground sm:text-5xl">
            {titleLead} <span className="text-primary">{titleAccent}</span>
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground sm:mt-3 sm:text-base">{description}</p>
          {children}
          {benefits && (
            <ul className="mt-4 hidden flex-wrap gap-x-8 gap-y-2 sm:flex">
              {benefits.map((benefit) => (
                <li key={benefit.label} className="flex items-center gap-2.5 text-sm text-foreground">
                  <span className="flex size-8 items-center justify-center rounded-full bg-white text-primary shadow-sm ring-1 ring-primary/10">
                    <benefit.icon className="size-4" aria-hidden="true" />
                  </span>
                  {benefit.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        {artwork}
      </Container>
    </section>
  )
}
