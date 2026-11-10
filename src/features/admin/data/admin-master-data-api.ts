import { apiRequest } from '@/features/auth/lib/session-client'

export const TAXONOMY_KINDS = [
  'study_level',
  'stream',
  'exam',
  'study_mode',
  'delivery_mode',
  'institution_ownership',
  'reservation_category',
  'gender_eligibility',
  'degree',
  'specialization',
  'subject',
  'language',
  'facility',
  'coaching_course_type',
] as const
export type TaxonomyKind = (typeof TAXONOMY_KINDS)[number]

export type KindOverview = { kind: TaxonomyKind; label: string; active: number; retired: number; aliases: number }
export type TermAlias = { id: string; context: string; alias: string }
export type AdminTerm = {
  id: string
  kind: TaxonomyKind
  slug: string
  label: string
  parent: { id: string; slug: string; label: string } | null
  sortOrder: number
  isActive: boolean
  metadata: Record<string, unknown>
  aliases: TermAlias[]
  usage: number
  children: number
  updatedAt: string
}
export type AdminTermDetail = AdminTerm & { usageByTable: { table: string; count: number }[] }
export type AdminState = { id: string; code: string; slug: string; name: string; kind: 'state' | 'union_territory'; cities: number; usage: number }
export type AdminCity = { id: string; stateId: string; slug: string; name: string; lgdCode: string | null; usage: number }
export type Geography = { states: AdminState[]; cities: AdminCity[] }

export const kindHelp: Record<TaxonomyKind, string> = {
  study_level: 'Class bands and degree levels used by profiles, courses, scholarships, tutors and notes.',
  stream: 'Broad study areas. Stream hubs, course and scholarship filters, and student preferences use these.',
  exam: 'Entrance exams tutors prepare students for and students follow. Catalogue exam records link to these terms.',
  study_mode: 'How a course is studied: full-time, part-time, online, distance.',
  delivery_mode: 'How a tutor or coaching provider teaches: online, in person, hybrid.',
  institution_ownership: 'Government, private, deemed and similar ownership types.',
  reservation_category: 'Reservation categories scholarships are restricted to.',
  gender_eligibility: 'Gender eligibility values for scholarships.',
  degree: 'Degree names such as B.Tech or MBA.',
  specialization: 'Specialisations within a degree.',
  subject: 'Subjects tutors teach.',
  language: 'Languages tutors teach in.',
  facility: 'Campus facilities shown on institution pages.',
  coaching_course_type: 'Coaching programme types: classroom, crash course, test series and similar.',
}

export const aliasContextHelp: Record<string, string> = {
  'fe.student.profile': 'Student profile form',
  'fe.student.preferences': 'Student preferences',
  'fe.courses': 'Course listing filters',
  'fe.colleges': 'College listing filters',
  'fe.scholarships': 'Scholarship filters',
  'fe.exams': 'Exam filters',
  'fe.tutors': 'Tutor filters',
  'fe.coaching': 'Coaching filters',
  'fe.notes': 'Notes filters',
  'fe.exam_label': 'Exam label',
  'fe.compare': 'Compare tool',
  'url.scholarships.level': 'URL · scholarships level',
  'url.scholarships.stream': 'URL · scholarships stream',
  'url.scholarships.gender': 'URL · scholarships gender',
  'url.exams.area': 'URL · exams area',
  'url.coaching.mode': 'URL · coaching mode',
  'url.compare.course': 'URL · compare course',
}

export const tableLabels: Record<string, string> = {
  institutions: 'Institutions',
  institution_facilities: 'Institution facilities',
  institution_approvals: 'Institution approvals',
  programs: 'Courses',
  program_exams: 'Course exam links',
  program_specializations: 'Course specialisations',
  offerings: 'Offerings',
  offering_eligibility_exams: 'Offering exams',
  exams: 'Exams',
  scholarships: 'Scholarships',
  scholarship_terms: 'Scholarship criteria',
  scholarship_states: 'Scholarship states',
  tutors: 'Tutors',
  tutor_terms: 'Tutor terms',
  tutor_accounts: 'Tutor accounts',
  tutor_account_terms: 'Tutor account terms',
  coaching_providers: 'Coaching providers',
  coaching_provider_terms: 'Coaching terms',
  coaching_programs: 'Coaching programmes',
  student_profiles: 'Student profiles',
  student_preference_terms: 'Student preferences',
  student_preference_states: 'Student preferred states',
  cities: 'Cities',
}

export const tableLabel = (table: string) => tableLabels[table] ?? table.replace(/_/g, ' ')

const enc = encodeURIComponent
const base = '/admin/master-data'

export const listKinds = () => apiRequest<KindOverview[]>('GET', `${base}/taxonomy`)
export const listTerms = (kind: TaxonomyKind) => apiRequest<AdminTerm[]>('GET', `${base}/taxonomy/${kind}`)
export const getTerm = (kind: TaxonomyKind, id: string) => apiRequest<AdminTermDetail>('GET', `${base}/taxonomy/${kind}/terms/${enc(id)}`)
export const createTerm = (kind: TaxonomyKind, body: { slug: string; label: string; parent?: string | null }) => apiRequest<AdminTermDetail>('POST', `${base}/taxonomy/${kind}/terms`, body)
export const updateTerm = (kind: TaxonomyKind, id: string, body: { label?: string; parent?: string | null; isActive?: boolean }) => apiRequest<AdminTermDetail>('PATCH', `${base}/taxonomy/${kind}/terms/${enc(id)}`, body)
export const reorderTerms = (kind: TaxonomyKind, ids: string[]) => apiRequest<AdminTerm[]>('PUT', `${base}/taxonomy/${kind}/order`, { ids })
export const mergeTerm = (kind: TaxonomyKind, id: string, into: string) => apiRequest<{ source: AdminTermDetail; target: AdminTermDetail; moved: number }>('POST', `${base}/taxonomy/${kind}/terms/${enc(id)}/merge`, { into })
export const addAlias = (kind: TaxonomyKind, id: string, body: { context: string; alias: string }) => apiRequest<AdminTermDetail>('POST', `${base}/taxonomy/${kind}/terms/${enc(id)}/aliases`, body)
export const removeAlias = (aliasId: string) => apiRequest<AdminTermDetail>('POST', `${base}/aliases/${enc(aliasId)}/remove`)

export const getGeography = () => apiRequest<Geography>('GET', `${base}/geography`)
export const createState = (body: { code: string; slug: string; name: string; kind: AdminState['kind'] }) => apiRequest<AdminState>('POST', `${base}/geography/states`, body)
export const updateState = (id: string, body: { name?: string; kind?: AdminState['kind'] }) => apiRequest<AdminState>('PATCH', `${base}/geography/states/${enc(id)}`, body)
export const createCity = (stateId: string, body: { slug: string; name: string; lgdCode?: string | null }) => apiRequest<AdminCity>('POST', `${base}/geography/states/${enc(stateId)}/cities`, body)
export const updateCity = (id: string, body: { name?: string; lgdCode?: string | null }) => apiRequest<AdminCity>('PATCH', `${base}/geography/cities/${enc(id)}`, body)

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
