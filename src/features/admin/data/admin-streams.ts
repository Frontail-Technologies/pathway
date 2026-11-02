import { buildStreamHub } from '@/features/streams/data/stream-hub'
import { streams } from '@/features/streams/data/stream-taxonomy'
import { ADMIN_STORAGE_KEYS, readAdminStorage, writeAdminStorage } from './admin-demo-storage'

/** A hub is published on the public site when it has content in at least two sections (see stream-hub.ts). */
const MIN_SECTIONS = 2

export type AdminStreamSection = {
  id: string
  title: string
  count: number
  viewAllHref?: string
  entries: { id: string; title: string; subtitle?: string; href: string }[]
}

/** Serializable summary of a stream hub (safe to pass from a server page to a client view). */
export type AdminStream = {
  slug: string
  name: string
  tagline: string
  description: string
  /** Whether the public site publishes this hub today (derived from its content). */
  livePublished: boolean
  collegeCount: number
  courseCount: number
  examCount: number
  sections: AdminStreamSection[]
}

export function getAdminStreams(): AdminStream[] {
  return streams.map((stream) => {
    const hub = buildStreamHub(stream)
    const sections: AdminStreamSection[] = hub.sections.map((section) => ({
      id: section.id,
      title: section.title,
      count: section.entries.length,
      viewAllHref: section.viewAllHref,
      entries: section.entries.map((entry) => ({ id: entry.id, title: entry.title, subtitle: entry.subtitle, href: entry.href })),
    }))
    const count = (id: string) => sections.find((section) => section.id === id)?.count ?? 0
    return {
      slug: stream.slug,
      name: stream.name,
      tagline: stream.tagline,
      description: stream.description,
      livePublished: sections.length >= MIN_SECTIONS,
      collegeCount: count('colleges'),
      courseCount: count('courses'),
      examCount: count('exams'),
      sections,
    }
  })
}

export function getAdminStream(slug: string): AdminStream | undefined {
  return getAdminStreams().find((stream) => stream.slug === slug)
}

export const STREAM_MIN_SECTIONS = MIN_SECTIONS

/* ------------------------------------------------------------------ demo publish overrides (this device) */

export type StreamPublishOverrides = Record<string, boolean>

export function readStreamPublishOverrides(): StreamPublishOverrides {
  return readAdminStorage<StreamPublishOverrides>(ADMIN_STORAGE_KEYS.streamPublish, {})
}

export function setStreamPublishOverride(slug: string, published: boolean) {
  writeAdminStorage(ADMIN_STORAGE_KEYS.streamPublish, { ...readStreamPublishOverrides(), [slug]: published })
}
