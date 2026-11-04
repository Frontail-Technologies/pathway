import type { Metadata } from 'next'

export type DetailTab<T> = {
  segment: string
  label: string
  heading: (entity: T) => string
  description: (entity: T) => string
  teaser?: (entity: T) => string
  available?: (entity: T) => boolean
}

export const tabHref = (base: string, segment: string) => (segment ? `${base}/${segment}` : base)

export function availableTabs<T>(tabs: DetailTab<T>[], entity: T): DetailTab<T>[] {
  return tabs.filter((tab) => !tab.available || tab.available(entity))
}

export function findTab<T>(tabs: DetailTab<T>[], entity: T, segment: string): DetailTab<T> | undefined {
  return availableTabs(tabs, entity).find((tab) => tab.segment === segment)
}

export function tabMetadata<T>(tabs: DetailTab<T>[], entity: T | undefined, segment: string, base: (entity: T) => string, notFoundTitle: string): Metadata {
  const tab = entity ? findTab(tabs, entity, segment) : undefined
  if (!entity || !tab) return { title: notFoundTitle }
  return {
    title: tab.heading(entity),
    description: tab.description(entity),
    alternates: { canonical: tabHref(base(entity), segment) },
  }
}

export function tabLinks<T>(tabs: DetailTab<T>[], entity: T, base: string) {
  return availableTabs(tabs, entity).map((tab) => ({ href: tabHref(base, tab.segment), label: tab.label, segment: tab.segment }))
}
