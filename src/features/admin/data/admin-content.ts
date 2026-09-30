import { colleges } from '@/features/colleges/data/colleges'
import { courses } from '@/features/courses/data/courses'
import { scholarships } from '@/features/scholarships/data/scholarships'
import { exams } from '@/features/exams/data/exams'
import { tutors } from '@/features/tutors/data/tutors'
import { coachingProviders } from '@/features/coaching/data/coaching'
import type {
  ContentEntry,
  ContentType,
  ContentStatus,
  ContentCategory,
  RelatedEntityType,
  RelatedEntityRef,
} from '@/features/content/types/content'
import {
  contentTypeMap,
  contentStatusMap,
  contentCategoryMap,
  relatedEntityTypeMap,
} from '@/features/content/types/content'
import { canonicalContent } from '@/features/content/data/content'

export type {
  ContentEntry,
  ContentType,
  ContentStatus,
  ContentCategory,
  RelatedEntityType,
  RelatedEntityRef,
}
export {
  contentTypeMap,
  contentStatusMap,
  contentCategoryMap,
  relatedEntityTypeMap,
}

export type ResolvedRelatedEntity = {
  entityType: RelatedEntityType
  entityId: string
  name: string
  subtitle?: string
  adminUrl?: string
  publicUrl?: string
  typeLabel: string
}

export type AdminContentEntry = ContentEntry & {
  typeLabel: string
  statusLabel: string
  categoryLabel: string
  resolvedRelatedEntities: ResolvedRelatedEntity[]
  publicUrlAvailable: boolean
  scraperExcluded: boolean
}

export function resolveRelatedEntity(
  entityType: RelatedEntityType,
  entityId: string
): ResolvedRelatedEntity {
  const typeLabel = relatedEntityTypeMap[entityType]?.label ?? entityType

  switch (entityType) {
    case 'institution': {
      const col = colleges.find((c) => c.slug === entityId || c.id === entityId)
      return {
        entityType,
        entityId,
        name: col?.name ?? entityId,
        subtitle: col ? `${col.city}, ${col.state} • ${col.type}` : undefined,
        adminUrl: col ? `/admin/institutions/${col.id || col.slug}` : undefined,
        publicUrl: col ? `/college/${col.slug}` : undefined,
        typeLabel,
      }
    }
    case 'program': {
      const crs = courses.find((c) => c.slug === entityId || c.id === entityId)
      return {
        entityType,
        entityId,
        name: crs?.name ?? entityId,
        subtitle: crs ? `${crs.stream} • ${crs.duration}` : undefined,
        adminUrl: crs ? `/admin/programs/${crs.id || crs.slug}` : undefined,
        publicUrl: crs ? `/course/${crs.slug}` : undefined,
        typeLabel,
      }
    }
    case 'scholarship': {
      const sch = scholarships.find((s) => s.slug === entityId || s.id === entityId)
      return {
        entityType,
        entityId,
        name: sch?.name ?? entityId,
        subtitle: sch ? `${sch.provider} • ${sch.scholarshipType}` : undefined,
        adminUrl: sch ? `/admin/scholarships/${sch.id || sch.slug}` : undefined,
        publicUrl: sch ? `/scholarship/${sch.slug}` : undefined,
        typeLabel,
      }
    }
    case 'exam': {
      const exm = exams.find((e) => e.slug === entityId || e.id === entityId)
      return {
        entityType,
        entityId,
        name: exm?.name ?? entityId,
        subtitle: exm ? `${exm.level} • ${exm.scope}` : undefined,
        adminUrl: undefined,
        publicUrl: exm ? `/exam/${exm.slug}` : undefined,
        typeLabel,
      }
    }
    case 'tutor': {
      const tut = tutors.find((t) => t.slug === entityId || t.id === entityId)
      return {
        entityType,
        entityId,
        name: tut?.name ?? entityId,
        subtitle: tut ? `${tut.headline} • ${tut.subjects.join(', ')}` : undefined,
        adminUrl: tut ? `/admin/tutors-coaching/tutors/${tut.id || tut.slug}` : undefined,
        publicUrl: tut ? `/tutor/${tut.slug}` : undefined,
        typeLabel,
      }
    }
    case 'coaching': {
      const coa = coachingProviders.find((c) => c.slug === entityId || c.id === entityId)
      return {
        entityType,
        entityId,
        name: coa?.name ?? entityId,
        subtitle: coa ? `${coa.location} • ${coa.providerType}` : undefined,
        adminUrl: coa ? `/admin/tutors-coaching/coaching/${coa.id || coa.slug}` : undefined,
        publicUrl: coa ? `/coaching/${coa.slug}` : undefined,
        typeLabel,
      }
    }
    default:
      return {
        entityType,
        entityId,
        name: entityId,
        typeLabel,
      }
  }
}

export function getEntityOptionsForType(
  entityType: RelatedEntityType
): { id: string; label: string; subtext?: string }[] {
  switch (entityType) {
    case 'institution':
      return colleges.map((c) => ({
        id: c.slug,
        label: c.name,
        subtext: `${c.city}, ${c.state}`,
      }))
    case 'program':
      return courses.map((c) => ({
        id: c.slug,
        label: c.name,
        subtext: `${c.stream} (${c.duration})`,
      }))
    case 'scholarship':
      return scholarships.map((s) => ({
        id: s.slug,
        label: s.name,
        subtext: s.provider,
      }))
    case 'exam':
      return exams.map((e) => ({
        id: e.slug,
        label: e.name,
        subtext: e.level,
      }))
    case 'tutor':
      return tutors.map((t) => ({
        id: t.slug,
        label: t.name,
        subtext: t.headline,
      }))
    case 'coaching':
      return coachingProviders.map((c) => ({
        id: c.slug,
        label: c.name,
        subtext: `${c.location} (${c.providerType})`,
      }))
    default:
      return []
  }
}

export function mapToAdminContent(entry: ContentEntry): AdminContentEntry {
  const resolvedRelatedEntities = (entry.relatedEntityRefs || []).map((ref) =>
    resolveRelatedEntity(ref.entityType, ref.entityId)
  )

  return {
    ...entry,
    typeLabel: contentTypeMap[entry.type]?.label ?? entry.type,
    statusLabel: contentStatusMap[entry.status]?.label ?? entry.status,
    categoryLabel: entry.category ? contentCategoryMap[entry.category]?.label ?? entry.category : 'Uncategorized',
    resolvedRelatedEntities,
    publicUrlAvailable: false,
    scraperExcluded: true,
  }
}

export function getAdminContent(): AdminContentEntry[] {
  return canonicalContent.map(mapToAdminContent)
}

export function getAdminContentById(id: string): AdminContentEntry | undefined {
  const item = canonicalContent.find((c) => c.id === id || c.slug === id)
  if (!item) return undefined
  return mapToAdminContent(item)
}

export function getContentSummaryStats(): {
  total: number
  published: number
  draft: number
  archived: number
  articles: number
  guides: number
} {
  const all = getAdminContent()
  return {
    total: all.length,
    published: all.filter((c) => c.status === 'published').length,
    draft: all.filter((c) => c.status === 'draft').length,
    archived: all.filter((c) => c.status === 'archived').length,
    articles: all.filter((c) => c.type === 'article').length,
    guides: all.filter((c) => c.type === 'guide').length,
  }
}
