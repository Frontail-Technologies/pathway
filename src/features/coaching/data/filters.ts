import type { CoachingProvider } from './coaching'

export const providerTypeOptions = ['Coaching Institute', 'Online Platform'] as const
export const examOptions = ['JEE Main', 'JEE Advanced', 'NEET UG', 'CUET UG', 'CAT', 'XAT', 'GATE', 'CLAT', 'NID DAT', 'UCEED', 'Olympiad', 'CA Foundation'] as const
export const subjectOptions = [
  'Physics',
  'Chemistry',
  'Mathematics',
  'Biology',
  'English',
  'General Test',
  'Commerce',
  'Quantitative Aptitude',
  'Verbal Ability',
  'Data Interpretation',
  'Accountancy',
  'Business Studies',
  'Economics',
  'Computer Science',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Legal Reasoning',
  'General Knowledge',
  'Design Aptitude',
  'Drawing',
  'Visual Reasoning',
  'Science',
] as const
export const modeOptions = ['Online', 'Offline', 'Hybrid'] as const
export const locationOptions = ['Online', 'Kota', 'Delhi', 'Pune', 'Mumbai', 'Bengaluru', 'Lucknow', 'Ahmedabad', 'Chennai'] as const
export const courseTypeOptions = ['Classroom Program', 'Live Classes', 'Test Series', 'Crash Course', 'Self-Paced Course', 'Weekend Batch', 'Portfolio Guidance', 'Foundation Batch'] as const

export const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'az', label: 'A-Z' },
] as const

export type SortValue = (typeof sortOptions)[number]['value']

export type FilterKey = 'providerTypes' | 'exams' | 'subjects' | 'modes' | 'locations' | 'courseTypes'

export type FilterState = Record<FilterKey, string[]>

export const emptyFilters: FilterState = {
  providerTypes: [],
  exams: [],
  subjects: [],
  modes: [],
  locations: [],
  courseTypes: [],
}

export const filterGroups: { key: FilterKey; title: string; options: readonly string[] }[] = [
  { key: 'providerTypes', title: 'Provider Type', options: providerTypeOptions },
  { key: 'exams', title: 'Exam / Preparation', options: examOptions },
  { key: 'subjects', title: 'Subject / Stream', options: subjectOptions },
  { key: 'modes', title: 'Learning Mode', options: modeOptions },
  { key: 'locations', title: 'Location', options: locationOptions },
  { key: 'courseTypes', title: 'Course Type', options: courseTypeOptions },
]

export function matchesFilters(provider: CoachingProvider, filters: FilterState): boolean {
  if (filters.providerTypes.length && !filters.providerTypes.includes(provider.providerType)) return false
  if (filters.exams.length && !filters.exams.some((exam) => provider.exams.includes(exam))) return false
  if (filters.subjects.length && !filters.subjects.some((subject) => provider.subjects.includes(subject))) return false
  if (filters.modes.length && !filters.modes.some((mode) => provider.modes.includes(mode as CoachingProvider['modes'][number]))) return false
  if (filters.locations.length && !filters.locations.includes(provider.location)) return false
  if (filters.courseTypes.length && !filters.courseTypes.some((courseType) => provider.courseTypes.includes(courseType))) return false
  return true
}

export function matchesSearch(provider: CoachingProvider, query: string): boolean {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return true
  const searchable = [
    provider.name,
    provider.providerType,
    provider.location,
    provider.programLabel,
    ...provider.exams,
    ...provider.subjects,
    ...provider.modes,
    ...provider.courseTypes,
    ...provider.highlights,
  ]
    .join(' ')
    .toLowerCase()
  return searchable.includes(normalized)
}

export function sortCoachingProviders(list: CoachingProvider[], sort: SortValue): CoachingProvider[] {
  const copy = [...list]
  if (sort === 'az') return copy.sort((a, b) => a.name.localeCompare(b.name))
  return copy.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
}

export function countActiveFilters(filters: FilterState): number {
  return Object.values(filters).reduce((total, values) => total + values.length, 0)
}

export const filterKeyToParam: Record<FilterKey, string> = {
  providerTypes: 'type',
  exams: 'exam',
  subjects: 'subject',
  modes: 'mode',
  locations: 'location',
  courseTypes: 'courseType',
}

const providerTypeSlugs: Record<string, string> = {
  'Coaching Institute': 'coaching-institute',
  'Online Platform': 'online-platform',
}

const examSlugs: Record<string, string> = {
  'JEE Main': 'jee-main',
  'JEE Advanced': 'jee-advanced',
  'NEET UG': 'neet-ug',
  'CUET UG': 'cuet-ug',
  CAT: 'cat',
  XAT: 'xat',
  GATE: 'gate',
  CLAT: 'clat',
  'NID DAT': 'nid-dat',
  UCEED: 'uceed',
  Olympiad: 'olympiad',
  'CA Foundation': 'ca-foundation',
}

const subjectSlugs: Record<string, string> = {
  Physics: 'physics',
  Chemistry: 'chemistry',
  Mathematics: 'mathematics',
  Biology: 'biology',
  English: 'english',
  'General Test': 'general-test',
  Commerce: 'commerce',
  'Quantitative Aptitude': 'quantitative-aptitude',
  'Verbal Ability': 'verbal-ability',
  'Data Interpretation': 'data-interpretation',
  Accountancy: 'accountancy',
  'Business Studies': 'business-studies',
  Economics: 'economics',
  'Computer Science': 'computer-science',
  'Mechanical Engineering': 'mechanical-engineering',
  'Electrical Engineering': 'electrical-engineering',
  'Legal Reasoning': 'legal-reasoning',
  'General Knowledge': 'general-knowledge',
  'Design Aptitude': 'design-aptitude',
  Drawing: 'drawing',
  'Visual Reasoning': 'visual-reasoning',
  Science: 'science',
}

const modeSlugs: Record<string, string> = {
  Online: 'online',
  Offline: 'offline',
  Hybrid: 'hybrid',
}

const locationSlugs: Record<string, string> = {
  Online: 'online',
  Kota: 'kota',
  Delhi: 'delhi',
  Pune: 'pune',
  Mumbai: 'mumbai',
  Bengaluru: 'bengaluru',
  Lucknow: 'lucknow',
  Ahmedabad: 'ahmedabad',
  Chennai: 'chennai',
}

const courseTypeSlugs: Record<string, string> = {
  'Classroom Program': 'classroom-program',
  'Live Classes': 'live-classes',
  'Test Series': 'test-series',
  'Crash Course': 'crash-course',
  'Self-Paced Course': 'self-paced-course',
  'Weekend Batch': 'weekend-batch',
  'Portfolio Guidance': 'portfolio-guidance',
  'Foundation Batch': 'foundation-batch',
}

const filterSlugMaps: Record<FilterKey, Record<string, string>> = {
  providerTypes: providerTypeSlugs,
  exams: examSlugs,
  subjects: subjectSlugs,
  modes: modeSlugs,
  locations: locationSlugs,
  courseTypes: courseTypeSlugs,
}

function invert(map: Record<string, string>): Record<string, string> {
  return Object.fromEntries(Object.entries(map).map(([value, slug]) => [slug, value]))
}

const filterSlugReverseMaps: Record<FilterKey, Record<string, string>> = Object.fromEntries(
  (Object.keys(filterSlugMaps) as FilterKey[]).map((key) => [key, invert(filterSlugMaps[key])])
) as Record<FilterKey, Record<string, string>>

export function serializeCoachingFilters(filters: FilterState, sort: SortValue, query: string): string {
  const params = new URLSearchParams()
  const trimmedQuery = query.trim()
  if (trimmedQuery) params.set('q', trimmedQuery)
  filterGroups.forEach((group) => {
    const values = filters[group.key]
    if (!values.length) return
    const slugs = values.map((value) => filterSlugMaps[group.key][value]).filter((slug): slug is string => Boolean(slug))
    if (slugs.length) params.set(filterKeyToParam[group.key], slugs.join(','))
  })
  if (sort !== 'recommended') params.set('sort', sort)
  return params.toString()
}

export function parseCoachingFilters(searchParams: URLSearchParams): FilterState {
  const result: FilterState = { providerTypes: [], exams: [], subjects: [], modes: [], locations: [], courseTypes: [] }
  filterGroups.forEach((group) => {
    const raw = searchParams.get(filterKeyToParam[group.key])
    if (!raw) return
    const reverseMap = filterSlugReverseMaps[group.key]
    result[group.key] = raw
      .split(',')
      .map((slug) => reverseMap[slug])
      .filter((value): value is string => Boolean(value))
  })
  return result
}

export function parseCoachingSort(searchParams: URLSearchParams): SortValue {
  const raw = searchParams.get('sort')
  const match = sortOptions.find((option) => option.value === raw)
  return match ? match.value : 'recommended'
}

export function parseCoachingSearch(searchParams: URLSearchParams): string {
  return searchParams.get('q') ?? ''
}
