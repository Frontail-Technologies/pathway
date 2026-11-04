import { apiRequest } from '@/features/auth/lib/session-client'
import { toLabel, type AccountVocabulary } from '@/features/taxonomy/data/account-terms'
import type { TutorAvatarSpec, TutorExam, TutorLanguage, TutorLevel, TutorMode, TutorSubject } from '@/features/tutors/data/tutors'
import type { AdminTutor, AdminTutorQualityStatus } from './admin-tutors'

type CatalogStatus = 'draft' | 'published' | 'archived'

type AdminTutorRecordDto = {
  slug: string
  name: string
  headline: string
  intro: string
  longBio: string | null
  whoHelps: string[]
  traits: string[]
  subjects: string[]
  exams: string[]
  studyLevels: string[]
  languages: string[]
  modes: string[]
  avatar: TutorAvatarSpec
  portraitStatus: 'real' | 'illustration' | 'missing'
  featured: boolean
  listed: boolean
  hasDetailPage: boolean
}

type AdminTutorRowDto = {
  id: string
  status: CatalogStatus
  updatedAt: string
  record: AdminTutorRecordDto
  assessment: {
    model: 'checklist'
    completeness: { percentage: number; completedCount: number; totalCount: number; missingFields: string[] }
    quality: { status: 'Ready' | 'Needs Review'; score: number; issuesCount: number; checks: { id: string; label: string; status: 'passed' | 'warning' | 'failed' | 'info'; note: string }[] }
  }
}

export type CatalogAdminTutor = AdminTutor & { catalogStatus: CatalogStatus; listed: boolean }

const termLabels = <T extends string>(vocabulary: AccountVocabulary, slugs: string[]) => slugs.map((slug) => toLabel(vocabulary, slug) ?? slug) as T[]

export function toAdminTutor(row: AdminTutorRowDto): CatalogAdminTutor {
  const { record, assessment } = row
  return {
    id: row.id,
    slug: record.slug,
    name: record.name,
    avatar: record.avatar,
    headline: record.headline,
    subjects: termLabels<TutorSubject>('tutorSubject', record.subjects),
    exams: termLabels<TutorExam>('tutorExam', record.exams),
    studyLevels: termLabels<TutorLevel>('tutorLevel', record.studyLevels),
    languages: termLabels<TutorLanguage>('tutorLanguage', record.languages),
    modes: termLabels<TutorMode>('tutorMode', record.modes),
    intro: record.intro,
    featured: record.featured,
    hasDetailPage: record.hasDetailPage,
    detail: { longBio: record.longBio ?? '', traits: record.traits, whoHelps: record.whoHelps },
    portraitStatus: record.portraitStatus,
    completeness: assessment.completeness,
    quality: { status: assessment.quality.status as AdminTutorQualityStatus, score: assessment.quality.score, issuesCount: assessment.quality.issuesCount, checks: assessment.quality.checks },
    sourceInfo: {
      source: 'Manual',
      lastUpdated: new Date(row.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      syncStatus: 'Manual Entry',
      scraperEligibility: 'Authorized Import Only (Personal Data)',
    },
    catalogStatus: row.status,
    listed: record.listed,
  }
}

export const listCatalogAdminTutors = async () => (await apiRequest<AdminTutorRowDto[]>('GET', '/admin/tutors')).map(toAdminTutor)
export const getCatalogAdminTutor = async (id: string) => toAdminTutor(await apiRequest<AdminTutorRowDto>('GET', `/admin/tutors/${encodeURIComponent(id)}`))

export const catalogStatusLabels: Record<CatalogStatus, string> = { draft: 'Draft', published: 'Published', archived: 'Archived' }
