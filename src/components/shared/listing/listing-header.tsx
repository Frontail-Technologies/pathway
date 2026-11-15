import type { ReactNode } from 'react'
import { Breadcrumbs, type BreadcrumbItemInput } from '@/components/shared'
import { Container } from '@/components/shared/container'

export function ListingHeader({
  breadcrumbs,
  title,
  description,
  meta,
  children,
}: {
  breadcrumbs: BreadcrumbItemInput[]
  title: string
  description?: string
  meta?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="border-b bg-card">
      <Container className="py-4 sm:py-6">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-2.5 font-heading text-[26px] leading-8 font-extrabold text-foreground sm:text-[32px] sm:leading-10">{title}</h1>
        {description ? <p className="mt-1.5 max-w-3xl text-sm text-muted-foreground sm:text-[15px]">{description}</p> : null}
        {meta ? <div className="mt-2.5">{meta}</div> : null}
        {children ? <div className="mt-4">{children}</div> : null}
      </Container>
    </div>
  )
}
