import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { Button } from '@/components/ui/button'
import type { BreadcrumbItemInput } from '@/components/shared'

export function LandingHeader({ trail, title, description, actions, aside }: { trail: BreadcrumbItemInput[]; title: string; description?: ReactNode; actions?: ReactNode; aside?: ReactNode }) {
  return (
    <header className="border-b bg-card">
      <div className="container-shell px-4 pt-5 pb-6 lg:pt-6 lg:pb-8">
        <Breadcrumbs items={trail} />
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 max-w-3xl">
            <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">{title}</h1>
            {description ? <p className="mt-2 text-[15px] leading-7 text-muted-foreground">{description}</p> : null}
            {actions ? <div className="mt-5 flex flex-col gap-2 sm:flex-row">{actions}</div> : null}
          </div>
          {aside ? <div className="w-full shrink-0 lg:w-96">{aside}</div> : null}
        </div>
      </div>
    </header>
  )
}

export function LandingSection({ id, title, href, linkLabel, children }: { id?: string; title: string; href?: string; linkLabel?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-header rounded-xl border bg-card p-4 sm:p-6">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">{title}</h2>
        {href ? (
          <Link href={href} className="flex shrink-0 items-center gap-0.5 text-sm font-semibold text-primary hover:underline">
            {linkLabel}
            <ChevronRight className="size-4" aria-hidden="true" />
          </Link>
        ) : null}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export function LandingBody({ children }: { children: ReactNode }) {
  return (
    <div className="bg-muted/50 pb-10">
      <div className="container-shell flex flex-col gap-4 px-4 pt-4 lg:pt-6">{children}</div>
    </div>
  )
}

export function CtaBand({ title, text, href, label, secondary }: { title: string; text?: string; href: string; label: string; secondary?: { href: string; label: string } }) {
  return (
    <section className="flex flex-col gap-4 rounded-xl bg-primary p-5 text-primary-foreground sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div>
        <h2 className="font-heading text-lg font-bold sm:text-xl">{title}</h2>
        {text ? <p className="mt-1 text-sm text-primary-foreground/85">{text}</p> : null}
      </div>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
        <Button variant="cta" size="lg" className="gap-2 font-semibold" nativeButton={false} render={<Link href={href} />}>
          {label}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
        {secondary ? (
          <Button variant="outline" size="lg" className="border-primary-foreground/40 bg-transparent font-semibold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" nativeButton={false} render={<Link href={secondary.href} />}>
            {secondary.label}
          </Button>
        ) : null}
      </div>
    </section>
  )
}

export function StepList({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title} className="flex gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary">{index + 1}</span>
          <div>
            <p className="text-sm font-semibold text-foreground">{step.title}</p>
            <p className="mt-0.5 text-sm leading-6 text-muted-foreground">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function MarketingHero({ trail, title, description, actions, stats, aside }: { trail: BreadcrumbItemInput[]; title: string; description?: ReactNode; actions?: ReactNode; stats?: { label: string; value: string }[]; aside?: ReactNode }) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container-shell px-4 pt-5 pb-10 lg:pt-6 lg:pb-14">
        <div className="[&_a]:text-primary-foreground/80 [&_li]:text-primary-foreground/80 [&_span]:text-primary-foreground">
          <Breadcrumbs items={trail} />
        </div>
        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="min-w-0 max-w-2xl">
            <h1 className="font-heading text-[30px] leading-tight font-extrabold sm:text-[40px]">{title}</h1>
            {description ? <p className="mt-3 text-base leading-7 text-primary-foreground/85 sm:text-lg">{description}</p> : null}
            {stats?.length ? (
              <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dd className="font-heading text-2xl font-bold tabular-nums sm:text-3xl">{stat.value}</dd>
                    <dt className="text-sm text-primary-foreground/75">{stat.label}</dt>
                  </div>
                ))}
              </dl>
            ) : null}
            {actions ? <div className="mt-7 flex flex-col gap-2 sm:flex-row">{actions}</div> : null}
          </div>
          {aside ? <div className="w-full shrink-0 lg:w-[26rem]">{aside}</div> : null}
        </div>
      </div>
    </section>
  )
}

export function HeroOutlineButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Button variant="outline" size="lg" className="border-primary-foreground/40 bg-transparent font-semibold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" nativeButton={false} render={<Link href={href} />}>
      {children}
    </Button>
  )
}

export function Band({ id, title, subtitle, href, linkLabel, tone = 'white', children }: { id?: string; title: string; subtitle?: string; href?: string; linkLabel?: string; tone?: 'white' | 'muted'; children: ReactNode }) {
  return (
    <section id={id} className={`scroll-mt-section py-10 sm:py-12 lg:py-16 ${tone === 'muted' ? 'bg-muted/60' : 'bg-background'}`}>
      <div className="container-shell px-4">
        <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
          <div className="min-w-0">
            <h2 className="font-heading text-[22px] leading-tight font-extrabold text-foreground sm:text-[28px]">{title}</h2>
            {subtitle ? <p className="mt-1.5 text-sm text-muted-foreground sm:text-[15px]">{subtitle}</p> : null}
          </div>
          {href && linkLabel ? (
            <Link href={href} className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline">
              {linkLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  )
}

export function CtaBandSection(props: Parameters<typeof CtaBand>[0] & { tone?: 'white' | 'muted' }) {
  return (
    <section className={`py-10 sm:py-12 ${props.tone === 'muted' ? 'bg-muted/60' : 'bg-background'}`}>
      <div className="container-shell px-4">
        <CtaBand {...props} />
      </div>
    </section>
  )
}
