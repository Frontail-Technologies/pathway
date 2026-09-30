import type { ContentEntry, ContentType, ContentStatus } from '../types/content'

export const canonicalContent: ContentEntry[] = []

export function getCanonicalContent(): ContentEntry[] {
  return canonicalContent
}

export function getCanonicalContentById(id: string): ContentEntry | undefined {
  return canonicalContent.find((c) => c.id === id)
}

export function getCanonicalContentBySlug(slug: string): ContentEntry | undefined {
  return canonicalContent.find((c) => c.slug === slug)
}

export function getCanonicalContentByType(type: ContentType): ContentEntry[] {
  return canonicalContent.filter((c) => c.type === type)
}

export function getCanonicalContentByStatus(status: ContentStatus): ContentEntry[] {
  return canonicalContent.filter((c) => c.status === status)
}
