import type { Metadata } from 'next'

export type DetailTab<T> = {
  segment: string
  label: string
  section?: string
  heading: (entity: T) => string
  description: (entity: T) => string
  teaser?: (entity: T) => string
  available?: (entity: T) => boolean
}

export const tabHref = (base: string, segment: string) => (segment ? `${base}/${segment}` : base)

export const tabSection = <T,>(tab: DetailTab<T>) => tab.section ?? (tab.segment || 'overview')

export function availableTabs<T>(tabs: DetailTab<T>[], entity: T): DetailTab<T>[] {
  return tabs.filter((tab) => !tab.available || tab.available(entity))
}

export function findTab<T>(tabs: DetailTab<T>[], entity: T, segment: string): DetailTab<T> | undefined {
  return availableTabs(tabs, entity).find((tab) => tab.segment === segment)
}

export function hasTab<T>(tabs: DetailTab<T>[], entity: T, segment: string) {
  return Boolean(findTab(tabs, entity, segment))
}

export function tabMetadata<T>(tabs: DetailTab<T>[], entity: T | undefined, segment: string, base: (entity: T) => string, notFoundTitle: string): Metadata {
  const tab = entity ? findTab(tabs, entity, segment) : undefined
  if (!entity || !tab) return { title: notFoundTitle }
  return {
    title: tab.heading(entity),
    description: tab.description(entity),
    alternates: { canonical: base(entity) },
  }
}

export function sectionNavItems<T>(tabs: DetailTab<T>[], entity: T) {
  return availableTabs(tabs, entity).map((tab) => ({ id: tabSection(tab), label: tab.label }))
}

export function tabLinks<T>(tabs: DetailTab<T>[], entity: T, base: string) {
  return availableTabs(tabs, entity).map((tab) => ({ href: tabHref(base, tab.segment), label: tab.label, segment: tab.segment }))
}
