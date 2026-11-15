import type { ReactNode } from 'react'
import { Breadcrumbs, type BreadcrumbItemInput } from '@/components/shared'
import { Container } from '@/components/shared/container'
import { SpotArt, type SpotArtName } from '@/components/shared/spot-art'

function ListingArt({ name }: { name: SpotArtName }) {
  return (
    <div aria-hidden="true" className="relative hidden size-44 shrink-0 lg:block">
      <span className="absolute inset-0 rounded-full bg-primary-foreground/10" />
      <span className="absolute top-2 right-3 size-3 rounded-full bg-cta" />
      <span className="absolute bottom-4 left-1 size-2 rounded-full bg-primary-foreground/60" />
      <span className="absolute top-8 -left-2 h-0.5 w-5 rounded-full bg-primary-foreground/50" />
      <SpotArt name={name} className="absolute inset-9 size-auto rounded-3xl bg-card shadow-[0_14px_36px_rgba(15,23,42,0.22)]" />
    </div>
  )
}

export function ListingHeader({
  breadcrumbs,
  title,
  description,
  meta,
  art,
  children,
}: {
  breadcrumbs: BreadcrumbItemInput[]
  title: string
  description?: string
  meta?: ReactNode
  art?: SpotArtName
  children?: ReactNode
}) {
  return (
    <div className="bg-primary text-primary-foreground">
      <Container className="flex items-center justify-between gap-10 py-5 sm:py-7">
        <div className="min-w-0 flex-1">
          <div className="[&_a]:text-primary-foreground/80 [&_li]:text-primary-foreground/80 [&_span]:text-primary-foreground">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          <h1 className="mt-3 font-heading text-[26px] leading-8 font-extrabold sm:text-[34px] sm:leading-10">{title}</h1>
          {description ? <p className="mt-1.5 max-w-3xl text-sm text-primary-foreground/85 sm:text-[15px]">{description}</p> : null}
          {meta ? <div className="mt-2.5 [&_a]:text-primary-foreground [&_p]:text-primary-foreground/80 [&_span]:text-primary-foreground/85 [&_svg]:text-primary-foreground">{meta}</div> : null}
          {children ? <div className="mt-4">{children}</div> : null}
        </div>
        {art ? <ListingArt name={art} /> : null}
      </Container>
    </div>
  )
}
