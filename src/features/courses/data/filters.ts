import type { CourseListItem } from './courses'

export const levelOptions = ['Undergraduate', 'Postgraduate', 'Diploma', 'Certificate'] as const
export const streamOptions = ['Engineering', 'Management', 'Medical', 'Commerce', 'Science', 'Law', 'Design'] as const
export const degreeOptions = ['B.Tech', 'MBA', 'MBBS', 'BCA', 'MCA', 'BBA', 'B.Sc', 'M.Tech', 'B.Pharm', 'BA LLB'] as const
export const specializationOptions = [
  'Computer Science',
  'Artificial Intelligence',
  'Data Science',
  'Mechanical Engineering',
  'Finance',
  'Marketing',
  'Biotechnology',
  'UI/UX Design',
] as const
export const durationOptions = ['Less than 1 Year', '1–2 Years', '3 Years', '4 Years', '5+ Years'] as const
export const feesOptions = ['Under ₹1 Lakh', '₹1–3 Lakh', '₹3–6 Lakh', '₹6+ Lakh'] as const
export const studyModeOptions = ['Full-time', 'Part-time', 'Online', 'Distance'] as const
export const examOptions = ['JEE Main', 'JEE Advanced', 'NEET UG', 'CAT', 'CUET UG', 'GATE'] as const

export const sortOptions = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'fees-low-high', label: 'Fees: Low to High' },
  { value: 'duration-short-long', label: 'Duration: Short to Long' },
  { value: 'duration-long-short', label: 'Duration: Long to Short' },
] as const

export type SortValue = (typeof sortOptions)[number]['value']

export type FilterKey = 'levels' | 'streams' | 'degrees' | 'specializations' | 'durations' | 'fees' | 'studyModes' | 'exams'

export type FilterState = Record<FilterKey, string[]>

export const emptyFilters: FilterState = {
  levels: [],
  streams: [],
  degrees: [],
  specializations: [],
  durations: [],
  fees: [],
  studyModes: [],
  exams: [],
}

export const filterGroups: { key: FilterKey; title: string; options: readonly string[] }[] = [
  { key: 'levels', title: 'Level', options: levelOptions },
  { key: 'streams', title: 'Stream', options: streamOptions },
  { key: 'degrees', title: 'Degree', options: degreeOptions },
  { key: 'specializations', title: 'Specialization', options: specializationOptions },
  { key: 'durations', title: 'Duration', options: durationOptions },
  { key: 'fees', title: 'Fees', options: feesOptions },
  { key: 'studyModes', title: 'Study Mode', options: studyModeOptions },
  { key: 'exams', title: 'Entrance Exam', options: examOptions },
]

function feesMatchesBucket(feesValue: number, bucket: string): boolean {
  if (bucket === 'Under ₹1 Lakh') return feesValue < 1
  if (bucket === '₹1–3 Lakh') return feesValue >= 1 && feesValue <= 3
  if (bucket === '₹3–6 Lakh') return feesValue > 3 && feesValue <= 6
  if (bucket === '₹6+ Lakh') return feesValue > 6
  return true
}

function durationMatchesBucket(durationValue: number, bucket: string): boolean {
  if (bucket === 'Less than 1 Year') return durationValue < 1
  if (bucket === '1–2 Years') return durationValue >= 1 && durationValue <= 2
  if (bucket === '3 Years') return durationValue > 2 && durationValue <= 3
  if (bucket === '4 Years') return durationValue > 3 && durationValue <= 4
  if (bucket === '5+ Years') return durationValue > 4
  return true
}

export function matchesFilters(course: CourseListItem, filters: FilterState): boolean {
  if (filters.levels.length && !filters.levels.includes(course.level)) return false
  if (filters.streams.length && !filters.streams.includes(course.stream)) return false
  if (filters.degrees.length && !filters.degrees.includes(course.degree)) return false
  if (filters.specializations.length && !filters.specializations.includes(course.specialization)) return false
  if (filters.studyModes.length && !filters.studyModes.includes(course.studyMode)) return false
  if (filters.exams.length && !filters.exams.some((exam) => course.entranceExams.includes(exam))) return false
  if (filters.fees.length && !filters.fees.some((bucket) => feesMatchesBucket(course.feesValue, bucket))) return false
  if (filters.durations.length && !filters.durations.some((bucket) => durationMatchesBucket(course.durationValue, bucket))) return false
  return true
}

export function sortCourses(list: CourseListItem[], sort: SortValue): CourseListItem[] {
  const copy = [...list]
  if (sort === 'fees-low-high') return copy.sort((a, b) => a.feesValue - b.feesValue)
  if (sort === 'duration-short-long') return copy.sort((a, b) => a.durationValue - b.durationValue)
  if (sort === 'duration-long-short') return copy.sort((a, b) => b.durationValue - a.durationValue)
  return copy
}

export function countActiveFilters(filters: FilterState): number {
  return Object.values(filters).reduce((total, values) => total + values.length, 0)
}

/**
 * ==================================================================
 * URL query-state convention (Course Listing)
 * ==================================================================
 *
 * The URL is the single source of truth for applied filters/sort — the
 * page derives `filters`/`sort` from `useSearchParams()` via `useMemo`
 * rather than keeping a separate, parallel `useState` that could drift
 * out of sync with Back/Forward navigation.
 *
 * - One query param per filter group, using the stable keys below
 *   (`level`, `stream`, `degree`, `specialization`, `duration`, `fees`,
 *   `studyMode`, `exam`) plus `sort`.
 * - Multi-select values within one group are comma-separated in a single
 *   param (e.g. `stream=engineering,science`) — chosen over repeated
 *   params (`stream=engineering&stream=science`) for simplicity with the
 *   plain `URLSearchParams` API. Every group uses this same convention.
 * - Every value is a short, stable, hand-authored slug (e.g. `btech`,
 *   `1-3-lakh`) — never the human-readable label. Slugs are explicit
 *   per-option maps below (not a generic auto-slugify), so the mapping
 *   stays exact and reversible even for labels like "B.Tech" -> `btech`.
 * - Only active filters appear in the URL; an empty group's param is
 *   omitted entirely, and `sort` is omitted when it's the default
 *   (`popularity`).
 * - Params are always written in the stable order the filter groups are
 *   defined in above, with `sort` last, so generated URLs are
 *   deterministic and easy to read/debug.
 * - Unknown/invalid slugs are silently dropped during parsing (never
 *   shown in the UI, never crash) — see `parseCourseFilters`/`parseCourseSort`.
 */

export const filterKeyToParam: Record<FilterKey, string> = {
  levels: 'level',
  streams: 'stream',
  degrees: 'degree',
  specializations: 'specialization',
  durations: 'duration',
  fees: 'fees',
  studyModes: 'studyMode',
  exams: 'exam',
}

const levelSlugs: Record<string, string> = {
  Undergraduate: 'undergraduate',
  Postgraduate: 'postgraduate',
  Diploma: 'diploma',
  Certificate: 'certificate',
}

const streamSlugs: Record<string, string> = {
  Engineering: 'engineering',
  Management: 'management',
  Medical: 'medical',
  Commerce: 'commerce',
  Science: 'science',
  Law: 'law',
  Design: 'design',
}

const degreeSlugs: Record<string, string> = {
  'B.Tech': 'btech',
  MBA: 'mba',
  MBBS: 'mbbs',
  BCA: 'bca',
  MCA: 'mca',
  BBA: 'bba',
  'B.Sc': 'bsc',
  'M.Tech': 'mtech',
  'B.Pharm': 'bpharm',
  'BA LLB': 'ballb',
}

const specializationSlugs: Record<string, string> = {
  'Computer Science': 'computer-science',
  'Artificial Intelligence': 'artificial-intelligence',
  'Data Science': 'data-science',
  'Mechanical Engineering': 'mechanical-engineering',
  Finance: 'finance',
  Marketing: 'marketing',
  Biotechnology: 'biotechnology',
  'UI/UX Design': 'ui-ux-design',
}

const durationSlugs: Record<string, string> = {
  'Less than 1 Year': 'less-than-1-year',
  '1–2 Years': '1-2-years',
  '3 Years': '3-years',
  '4 Years': '4-years',
  '5+ Years': '5-plus-years',
}

const feesSlugs: Record<string, string> = {
  'Under ₹1 Lakh': 'under-1-lakh',
  '₹1–3 Lakh': '1-3-lakh',
  '₹3–6 Lakh': '3-6-lakh',
  '₹6+ Lakh': '6-plus-lakh',
}

const studyModeSlugs: Record<string, string> = {
  'Full-time': 'full-time',
  'Part-time': 'part-time',
  Online: 'online',
  Distance: 'distance',
}

const examSlugs: Record<string, string> = {
  'JEE Main': 'jee-main',
  'JEE Advanced': 'jee-advanced',
  'NEET UG': 'neet-ug',
  CAT: 'cat',
  'CUET UG': 'cuet-ug',
  GATE: 'gate',
}

const filterSlugMaps: Record<FilterKey, Record<string, string>> = {
  levels: levelSlugs,
  streams: streamSlugs,
  degrees: degreeSlugs,
  specializations: specializationSlugs,
  durations: durationSlugs,
  fees: feesSlugs,
  studyModes: studyModeSlugs,
  exams: examSlugs,
}

function invert(map: Record<string, string>): Record<string, string> {
  return Object.fromEntries(Object.entries(map).map(([value, slug]) => [slug, value]))
}

const filterSlugReverseMaps: Record<FilterKey, Record<string, string>> = Object.fromEntries(
  (Object.keys(filterSlugMaps) as FilterKey[]).map((key) => [key, invert(filterSlugMaps[key])])
) as Record<FilterKey, Record<string, string>>

/** Builds a deterministic, minimal query string for the given filters/sort — omits empty groups and a default sort. */
export function serializeCourseFilters(filters: FilterState, sort: SortValue): string {
  const params = new URLSearchParams()
  filterGroups.forEach((group) => {
    const values = filters[group.key]
    if (!values.length) return
    const slugMap = filterSlugMaps[group.key]
    const slugs = values.map((value) => slugMap[value]).filter((slug): slug is string => Boolean(slug))
    if (!slugs.length) return
    params.set(filterKeyToParam[group.key], slugs.join(','))
  })
  if (sort !== 'popularity') params.set('sort', sort)
  return params.toString()
}

/** Parses filters from URL search params. Unknown/invalid slugs are silently dropped. */
export function parseCourseFilters(searchParams: URLSearchParams): FilterState {
  const result: FilterState = { levels: [], streams: [], degrees: [], specializations: [], durations: [], fees: [], studyModes: [], exams: [] }
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

/** Parses sort from URL search params. Falls back to `popularity` for a missing/invalid value. */
export function parseCourseSort(searchParams: URLSearchParams): SortValue {
  const raw = searchParams.get('sort')
  const match = sortOptions.find((option) => option.value === raw)
  return match ? match.value : 'popularity'
}
