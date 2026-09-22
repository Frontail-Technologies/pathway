// UI-phase fixtures for exam discovery (EXM-01) and detail (EXM-02). Detail-only content lives in the
// optional `detail` field of the same record — never a duplicate lookup. Deliberately no dates,
// deadlines, fees, seats, cutoffs, percentile/rank mappings or acceptance rates — none of that is
// backed by data yet. Sections without verified data are omitted (or shown as pending).
// Exams are limited to those already present in Pathway's top-exams/coaching fixtures.

export type StudyArea = 'Engineering' | 'Medical' | 'Management' | 'Law' | 'Undergraduate / General'
export type ExamScope = 'National' | 'State' | 'University / Institute'
export type ExamLevel = 'Undergraduate' | 'Postgraduate'

export type ExamDetail = {
  /** Two or three sentences shown under the overview points. */
  longDescription: string
  /** Four short overview points (label + one line). */
  overview: { label: string; text: string }[]
  /** Omit until verified — the page then shows an honest "not connected yet" state. */
  eligibility?: { label: string; text: string }[]
  /** Only fixture-backed facts. Omit until verified exam data is connected. */
  pattern?: { label: string; value: string }[]
  /** Subject areas only. `topics` stays omitted until verified exam data is connected — never invent chapter lists. */
  syllabusGroups?: { title: string; topics?: string[] }[]
  /** Generic stages that never imply registration is currently open. */
  processSteps: { title: string; text: string }[]
  faqs: { question: string; answer: string }[]
  /** Pathway college slugs to *explore* — not a verified participating-college list. */
  collegeSlugs?: string[]
}

export type Exam = {
  id: string
  slug: string
  name: string
  shortName: string
  studyArea: StudyArea
  scope: ExamScope
  level: ExamLevel
  conductingBody?: string
  /** One concise context line — never dates, eligibility paragraphs, syllabus or cutoffs. */
  description: string
  popular: boolean
  /** True only for records whose `detail` is implemented; drives the live "View Details" link. */
  hasDetailPage: boolean
  detail?: ExamDetail
}

const genericProcess: ExamDetail['processSteps'] = [
  { title: 'Check eligibility', text: 'Read the official information bulletin to confirm you meet the requirements.' },
  { title: 'Register when applications open', text: 'Registration windows are announced by the conducting body — follow official channels.' },
  { title: 'Appear for the exam', text: 'Attend the exam as scheduled by the conducting body.' },
  { title: 'Use results for admission', text: 'Results are used in counselling or admission processes of participating institutes.' },
]

const jeeMainDetail: ExamDetail = {
  longDescription:
    'JEE Main is a national-level entrance exam for undergraduate engineering programmes at NITs, IIITs and other institutes, conducted by the National Testing Agency.',
  overview: [
    { label: 'Purpose', text: 'Entrance exam for undergraduate engineering admissions.' },
    { label: 'Study area', text: 'Engineering.' },
    { label: 'Admission context', text: 'Results feed counselling and admission processes of participating institutes.' },
    { label: 'Conducted by', text: 'National Testing Agency.' },
  ],
  syllabusGroups: [{ title: 'Physics' }, { title: 'Chemistry' }, { title: 'Mathematics' }],
  processSteps: genericProcess,
  faqs: [
    { question: 'What is JEE Main used for?', answer: 'It is used for admission to undergraduate engineering programmes at participating institutes in India.' },
    { question: 'Which study area is JEE Main related to?', answer: 'Engineering. It is used for undergraduate engineering admissions.' },
    { question: 'Can I use the College Predictor after this exam?', answer: 'Yes. The College Predictor can preselect JEE Main so you can add your own performance details and see a placeholder preview. It does not use live cutoff data yet.' },
    { question: 'Where can I explore colleges?', answer: 'Use the Colleges to Explore section on this page or browse the full colleges listing on Pathway.' },
    { question: 'When will detailed dates be available?', answer: 'Dates, deadlines and fees are not connected to Pathway yet. Please check the official National Testing Agency notification for current information.' },
  ],
  collegeSlugs: ['iit-delhi', 'iit-bombay', 'bits-pilani', 'vit-vellore', 'manipal-university'],
}

export const exams: Exam[] = [
  { id: 'x1', slug: 'jee-main', name: 'Joint Entrance Examination Main', shortName: 'JEE Main', studyArea: 'Engineering', scope: 'National', level: 'Undergraduate', conductingBody: 'National Testing Agency', description: 'Entrance exam for undergraduate engineering programmes at NITs, IIITs and other institutes.', popular: true, hasDetailPage: true, detail: jeeMainDetail },
  { id: 'x2', slug: 'jee-advanced', name: 'Joint Entrance Examination Advanced', shortName: 'JEE Advanced', studyArea: 'Engineering', scope: 'National', level: 'Undergraduate', conductingBody: 'Indian Institutes of Technology', description: 'Entrance exam for undergraduate programmes at the Indian Institutes of Technology.', popular: true, hasDetailPage: false },
  { id: 'x3', slug: 'neet-ug', name: 'National Eligibility cum Entrance Test (UG)', shortName: 'NEET UG', studyArea: 'Medical', scope: 'National', level: 'Undergraduate', conductingBody: 'National Testing Agency', description: 'Entrance exam for MBBS, BDS and other undergraduate medical programmes.', popular: true, hasDetailPage: false },
  { id: 'x4', slug: 'cuet-ug', name: 'Common University Entrance Test (UG)', shortName: 'CUET UG', studyArea: 'Undergraduate / General', scope: 'National', level: 'Undergraduate', conductingBody: 'National Testing Agency', description: 'Common entrance test for undergraduate admissions to participating central and other universities.', popular: true, hasDetailPage: false },
  { id: 'x5', slug: 'bitsat', name: 'BITS Admission Test', shortName: 'BITSAT', studyArea: 'Engineering', scope: 'University / Institute', level: 'Undergraduate', conductingBody: 'BITS Pilani', description: 'Institute-level entrance test for undergraduate programmes at the BITS campuses.', popular: true, hasDetailPage: false },
  { id: 'x6', slug: 'wbjee', name: 'West Bengal Joint Entrance Examination', shortName: 'WBJEE', studyArea: 'Engineering', scope: 'State', level: 'Undergraduate', conductingBody: 'West Bengal Joint Entrance Examinations Board', description: 'State-level entrance exam for engineering and related programmes in West Bengal.', popular: true, hasDetailPage: false },
  { id: 'x7', slug: 'cat', name: 'Common Admission Test', shortName: 'CAT', studyArea: 'Management', scope: 'National', level: 'Postgraduate', conductingBody: 'Indian Institutes of Management', description: 'Entrance test for MBA and management programmes at IIMs and other business schools.', popular: false, hasDetailPage: false },
  { id: 'x8', slug: 'gate', name: 'Graduate Aptitude Test in Engineering', shortName: 'GATE', studyArea: 'Engineering', scope: 'National', level: 'Postgraduate', conductingBody: 'IISc and IITs', description: 'Entrance exam for postgraduate engineering and technology programmes.', popular: false, hasDetailPage: false },
  { id: 'x9', slug: 'clat', name: 'Common Law Admission Test', shortName: 'CLAT', studyArea: 'Law', scope: 'National', level: 'Undergraduate', conductingBody: 'Consortium of National Law Universities', description: 'Common entrance test for law programmes at participating National Law Universities.', popular: false, hasDetailPage: false },
]

export function getExamBySlug(slug: string): Exam | undefined {
  return exams.find((exam) => exam.slug === slug && exam.hasDetailPage && exam.detail)
}

/** Related by study area first, then level, then scope; excludes the current exam. */
export function getRelatedExams(exam: Exam, limit = 4): Exam[] {
  const score = (other: Exam) => Number(other.studyArea === exam.studyArea) * 4 + Number(other.level === exam.level) * 2 + Number(other.scope === exam.scope)
  return exams
    .filter((other) => other.id !== exam.id && score(other) > 0)
    .sort((a, b) => score(b) - score(a) || Number(b.popular) - Number(a.popular))
    .slice(0, limit)
}

// --- Filters / sort / search ------------------------------------------------------
export const studyAreaOptions: StudyArea[] = ['Engineering', 'Medical', 'Management', 'Law', 'Undergraduate / General']
export const scopeOptions: ExamScope[] = ['National', 'State', 'University / Institute']

export type FilterKey = 'studyAreas' | 'scopes'
export type FilterState = Record<FilterKey, string[]>
export const emptyFilters: FilterState = { studyAreas: [], scopes: [] }

export const filterGroups: { key: FilterKey; title: string; options: readonly string[] }[] = [
  { key: 'studyAreas', title: 'Study Area', options: studyAreaOptions },
  { key: 'scopes', title: 'Exam Scope', options: scopeOptions },
]

export type SortValue = 'popular' | 'name'
export const sortOptions: { value: SortValue; label: string }[] = [
  { value: 'popular', label: 'Popular First' },
  { value: 'name', label: 'Name A–Z' },
]

const areaSlugs: Record<string, string> = { Engineering: 'engineering', Medical: 'medical', Management: 'management', Law: 'law', 'Undergraduate / General': 'undergraduate' }
const scopeSlugs: Record<string, string> = { National: 'national', State: 'state', 'University / Institute': 'institute' }
const slugMaps: Record<FilterKey, Record<string, string>> = { studyAreas: areaSlugs, scopes: scopeSlugs }
export const filterKeyToParam: Record<FilterKey, string> = { studyAreas: 'area', scopes: 'scope' }

const reverse = (map: Record<string, string>) => Object.fromEntries(Object.entries(map).map(([value, slug]) => [slug, value]))

/** URL convention (same family as the other listings): `q`, comma-separated slug params per filter group, default sort omitted, invalid values silently dropped. */
export function serializeExamFilters(filters: FilterState, sort: SortValue, query: string): string {
  const params = new URLSearchParams()
  if (query.trim()) params.set('q', query.trim())
  filterGroups.forEach((group) => {
    const slugs = filters[group.key].map((value) => slugMaps[group.key][value]).filter(Boolean)
    if (slugs.length) params.set(filterKeyToParam[group.key], slugs.join(','))
  })
  if (sort !== 'popular') params.set('sort', sort)
  return params.toString()
}

export function parseExamFilters(searchParams: URLSearchParams): FilterState {
  const result: FilterState = { studyAreas: [], scopes: [] }
  filterGroups.forEach((group) => {
    const raw = searchParams.get(filterKeyToParam[group.key])
    if (!raw) return
    const back = reverse(slugMaps[group.key])
    result[group.key] = raw.split(',').map((slug) => back[slug]).filter(Boolean)
  })
  return result
}

export function parseExamSort(searchParams: URLSearchParams): SortValue {
  const raw = searchParams.get('sort')
  return sortOptions.find((option) => option.value === raw)?.value ?? 'popular'
}

/** `q` wins; otherwise a known `?exam=<slug>` (used by existing homepage links) prefills the search with that exam. Unknown slugs are ignored. */
export function parseExamSearch(searchParams: URLSearchParams): string {
  const q = searchParams.get('q')
  if (q !== null) return q
  const slug = searchParams.get('exam')
  return exams.find((exam) => exam.slug === slug)?.shortName ?? ''
}

export function countActiveFilters(filters: FilterState) {
  return Object.values(filters).reduce((total, values) => total + values.length, 0)
}

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

/** Searches exam name, abbreviation, full name and study area / scope (e.g. "jee", "medical", "engineering"). */
export function matchesSearch(exam: Exam, query: string) {
  const terms = normalize(query).split(' ').filter(Boolean)
  if (terms.length === 0) return true
  const haystack = normalize([exam.name, exam.shortName, exam.slug, exam.studyArea, exam.scope, exam.level].join(' '))
  return terms.every((term) => haystack.includes(term))
}

export function matchesFilters(exam: Exam, filters: FilterState) {
  if (filters.studyAreas.length && !filters.studyAreas.includes(exam.studyArea)) return false
  if (filters.scopes.length && !filters.scopes.includes(exam.scope)) return false
  return true
}

export function sortExams(list: Exam[], sort: SortValue): Exam[] {
  const indexed = list.map((exam, index) => ({ exam, index }))
  indexed.sort((a, b) => {
    if (sort === 'name') return a.exam.shortName.localeCompare(b.exam.shortName)
    return Number(b.exam.popular) - Number(a.exam.popular) || a.index - b.index
  })
  return indexed.map(({ exam }) => exam)
}
