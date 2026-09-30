import {
  SeoMetadataRecord,
  SeoTargetType,
  SeoTargetTypeMeta,
  SeoTargetOption,
  ResolvedSeoMetadata,
  KNOWN_STATIC_ROUTES,
  seoTargetTypeMap,
} from '@/features/seo/types/seo-metadata'
import {
  canonicalSeoMetadata,
  getSeoMetadataById,
} from '@/features/seo/data/seo-metadata'
import {
  resolveEffectiveSeoMetadata,
} from '@/features/seo/selectors/seo-selectors'
import { colleges } from '@/features/colleges/data/colleges'
import { courses } from '@/features/courses/data/courses'
import { exams } from '@/features/exams/data/exams'
import { scholarships } from '@/features/scholarships/data/scholarships'
import { tutors } from '@/features/tutors/data/tutors'
import { coachingProviders } from '@/features/coaching/data/coaching'
import { getNotes } from '@/features/notes/data/notes'

export interface AdminSeoRecord extends SeoMetadataRecord {
  targetLabel: string
  targetRoutePath: string
  targetTypeMeta: SeoTargetTypeMeta
  effectiveTitle: string
  effectiveDescription: string
  effectiveCanonical: string
  effectiveIndexing: 'inherited' | 'indexable' | 'noindex'
  resolvedMetadata: ResolvedSeoMetadata
  hasOverrides: boolean
}

export function transformSeoRecord(record: SeoMetadataRecord): AdminSeoRecord {
  const resolved = resolveEffectiveSeoMetadata(
    record,
    record.targetType,
    record.targetType === 'static_page' ? record.routePath || '/' : record.targetId || ''
  )

  const hasOverrides =
    resolved.isOverrideTitle ||
    resolved.isOverrideDescription ||
    resolved.isOverrideCanonical ||
    resolved.isOverrideRobots ||
    resolved.isOverrideOgTitle ||
    resolved.isOverrideOgDescription ||
    resolved.isOverrideOgImage

  const effectiveIndexing: 'inherited' | 'indexable' | 'noindex' =
    record.robotsIndex === undefined
      ? 'inherited'
      : record.robotsIndex
      ? 'indexable'
      : 'noindex'

  return {
    ...record,
    targetLabel: resolved.targetLabel,
    targetRoutePath: resolved.targetRoutePath,
    targetTypeMeta: seoTargetTypeMap[record.targetType] || seoTargetTypeMap.static_page,
    effectiveTitle: resolved.title,
    effectiveDescription: resolved.description,
    effectiveCanonical: resolved.canonicalPath,
    effectiveIndexing,
    resolvedMetadata: resolved,
    hasOverrides,
  }
}

export function getAdminSeoRecords(): AdminSeoRecord[] {
  return canonicalSeoMetadata.map(transformSeoRecord)
}

export function getAdminSeoRecordById(id: string): AdminSeoRecord | undefined {
  const record = getSeoMetadataById(id)
  if (!record) return undefined
  return transformSeoRecord(record)
}

export function getSeoSummaryStats(): {
  totalOverrides: number
  indexableCount: number
  noindexCount: number
  inheritedCount: number
  staticPageOverrides: number
  entityOverrides: number
} {
  const records = getAdminSeoRecords()
  return {
    totalOverrides: records.length,
    indexableCount: records.filter((r) => r.robotsIndex === true).length,
    noindexCount: records.filter((r) => r.robotsIndex === false).length,
    inheritedCount: records.filter((r) => r.robotsIndex === undefined).length,
    staticPageOverrides: records.filter((r) => r.targetType === 'static_page').length,
    entityOverrides: records.filter((r) => r.targetType !== 'static_page').length,
  }
}

export function getTargetOptions(targetType: SeoTargetType): SeoTargetOption[] {
  switch (targetType) {
    case 'static_page':
      return KNOWN_STATIC_ROUTES.map((route) => ({
        id: route.path,
        label: route.label,
        sublabel: route.category,
        routePath: route.path,
      }))

    case 'institution':
      return colleges.map((college) => ({
        id: college.slug,
        label: college.name,
        sublabel: `${college.city}, ${college.state} · ${college.type}`,
        routePath: `/college/${college.slug}`,
      }))

    case 'program':
      return courses.map((course) => ({
        id: course.slug,
        label: course.name,
        sublabel: `${course.level} · ${course.stream} (${course.duration})`,
        routePath: `/course/${course.slug}`,
      }))

    case 'exam':
      return exams.map((exam) => ({
        id: exam.slug,
        label: exam.name,
        sublabel: `${exam.studyArea} · ${exam.scope}`,
        routePath: `/exam/${exam.slug}`,
      }))

    case 'scholarship':
      return scholarships.map((sch) => ({
        id: sch.slug,
        label: sch.name,
        sublabel: `${sch.provider} · ${sch.scholarshipType}`,
        routePath: `/scholarship/${sch.slug}`,
      }))

    case 'tutor':
      return tutors.map((tutor) => ({
        id: tutor.slug,
        label: tutor.name,
        sublabel: `${tutor.subjects.join(', ')} · ${tutor.headline}`,
        routePath: `/tutor/${tutor.slug}`,
      }))

    case 'coaching':
      return coachingProviders.map((cp) => ({
        id: cp.slug,
        label: cp.name,
        sublabel: `${cp.location} · ${cp.exams.join(', ')}`,
        routePath: `/coaching/${cp.slug}`,
      }))

    case 'note': {
      const allNotes = getNotes()
      return allNotes.map((note) => ({
        id: note.slug,
        label: note.title,
        sublabel: `${note.subject} · ${note.studyLevel}`,
        routePath: `/notes/${note.slug}`,
      }))
    }
  }
}
