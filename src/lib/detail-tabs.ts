import type { Metadata } from 'next'

/**
 * Shared model for Shiksha-style detail pages split into sub-routes
 * (/college/x/placement, /exam/x/pattern, /course/x/syllabus …).
 * Each feature declares its tabs once; layouts, pages, breadcrumbs, metadata
 * and legacy-anchor forwarding all derive from that list.
 */
export type DetailTab<T> = {
  /** URL segment after the entity base; '' is the overview at the base itself. */
  segment: string
  label: string
  heading: (entity: T) => string
  description: (entity: T) => string
  /** One-line teaser shown on the overview's "Explore" tiles. */
  teaser?: (entity: T) => string
  /** Hide the tab (and 404 its page) when the entity has no data for it. */
  available?: (entity: T) => boolean
}

export const tabHref = (base: string, segment: string) => (segment ? `${base}/${segment}` : base)

export function availableTabs<T>(tabs: DetailTab<T>[], entity: T): DetailTab<T>[] {
  return tabs.filter((tab) => !tab.available || tab.available(entity))
}

/** The tab for this segment if the entity supports it; pages call notFound() otherwise. */
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

/** Serializable tab links for client components (tab bar, breadcrumbs). */
export function tabLinks<T>(tabs: DetailTab<T>[], entity: T, base: string) {
  return availableTabs(tabs, entity).map((tab) => ({ href: tabHref(base, tab.segment), label: tab.label, segment: tab.segment }))
}
