import type { ReactNode } from 'react'
import { Container } from './container'

export type DiscoveryListingHeroStat = { label: string; value: string }

type DiscoveryListingHeroProps = {
  eyebrow: string
  titleLead: string
  titleAccent: string
  description: string
   
  children?: ReactNode
   
  artwork?: ReactNode
   
  stats?: DiscoveryListingHeroStat[]
  className?: string
}






 
export function DiscoveryListingHero({ eyebrow, titleLead, titleAccent, description, children, artwork, stats, className = '' }: DiscoveryListingHeroProps) {
  return (
    <section className={`relative overflow-hidden bg-[radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.16),transparent_45%),linear-gradient(180deg,var(--brand-blue-light),var(--background))] ${className}`}>
      <Container className="flex min-h-44 items-center justify-between gap-8 px-4 py-6 lg:min-h-64 lg:py-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.18em] text-primary uppercase sm:text-sm">{eyebrow}</p>
          <h1 className="mt-2 font-heading text-[32px] leading-tight font-extrabold text-foreground sm:text-5xl">
            {titleLead} <span className="text-primary">{titleAccent}</span>
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground sm:mt-3 sm:text-base">{description}</p>
          {children}
          {stats && stats.length > 0 && (
            <ul className="mt-4 hidden flex-wrap gap-x-8 gap-y-2 sm:flex">
              {stats.map((stat) => (
                <li key={stat.label} className="text-sm text-foreground">
                  <span className="font-bold text-primary">{stat.value}</span> {stat.label}
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
