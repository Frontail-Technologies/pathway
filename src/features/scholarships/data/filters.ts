import type { EducationLevel, ScholarshipListItem } from './scholarships'

export const providerTypeOptions = ['Government', 'Private', 'University', 'Trust / Foundation'] as const
export const scholarshipTypeOptions = ['Merit Based', 'Need Based', 'Minority', 'Sports', 'Research', 'Women', 'Disability'] as const
export const educationLevelOptions = ['Class 10', 'Class 12', 'Undergraduate', 'Postgraduate', 'Diploma', 'PhD'] as const
export const streamOptions = ['Engineering', 'Medical', 'Management', 'Science', 'Arts', 'Law', 'Design'] as const
export const stateOptions = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'West Bengal'] as const
export const categoryOptions = ['General', 'OBC', 'SC', 'ST', 'EWS', 'Minority'] as const
export const genderOptions = ['All Genders', 'Female Only'] as const
export const incomeLimitOptions = ['Below ₹2.5 Lakh', '₹2.5–5 Lakh', '₹5–8 Lakh', 'Above ₹8 Lakh'] as const
export const benefitAmountOptions = ['Under ₹50,000', '₹50,000–1,00,000', '₹1,00,000–2,00,000', 'Above ₹2,00,000'] as const
export const applicationStatusOptions = ['Open', 'Closing Soon', 'Upcoming'] as const

export const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'closing-soon', label: 'Closing Soon' },
  { value: 'highest-benefit', label: 'Highest Benefit' },
  { value: 'recently-added', label: 'Recently Added' },
] as const

export type SortValue = (typeof sortOptions)[number]['value']

export type FilterKey =
  | 'providerTypes'
  | 'scholarshipTypes'
  | 'educationLevels'
  | 'streams'
  | 'states'
  | 'categories'
  | 'genders'
  | 'incomeLimits'
  | 'benefitAmounts'
  | 'statuses'

export type FilterState = Record<FilterKey, string[]>

export const emptyFilters: FilterState = {
  providerTypes: [],
  scholarshipTypes: [],
  educationLevels: [],
  streams: [],
  states: [],
  categories: [],
  genders: [],
  incomeLimits: [],
  benefitAmounts: [],
  statuses: [],
}

export const filterGroups: { key: FilterKey; title: string; options: readonly string[] }[] = [
  { key: 'providerTypes', title: 'Provider Type', options: providerTypeOptions },
  { key: 'scholarshipTypes', title: 'Scholarship Type', options: scholarshipTypeOptions },
  { key: 'educationLevels', title: 'Education Level', options: educationLevelOptions },
  { key: 'streams', title: 'Course / Stream', options: streamOptions },
  { key: 'states', title: 'State / Location', options: stateOptions },
  { key: 'categories', title: 'Category', options: categoryOptions },
  { key: 'genders', title: 'Gender Eligibility', options: genderOptions },
  { key: 'incomeLimits', title: 'Annual Family Income', options: incomeLimitOptions },
  { key: 'benefitAmounts', title: 'Benefit Amount', options: benefitAmountOptions },
  { key: 'statuses', title: 'Application Status', options: applicationStatusOptions },
]

const statusLabelToValue: Record<string, ScholarshipListItem['status']> = {
  Open: 'open',
  'Closing Soon': 'closing-soon',
  Upcoming: 'upcoming',
}

function benefitMatchesBucket(benefitValue: number, bucket: string): boolean {
  if (bucket === 'Under ₹50,000') return benefitValue < 50000
  if (bucket === '₹50,000–1,00,000') return benefitValue >= 50000 && benefitValue <= 100000
  if (bucket === '₹1,00,000–2,00,000') return benefitValue > 100000 && benefitValue <= 200000
  if (bucket === 'Above ₹2,00,000') return benefitValue > 200000
  return true
}

export function matchesFilters(scholarship: ScholarshipListItem, filters: FilterState): boolean {
  if (filters.providerTypes.length && !filters.providerTypes.includes(scholarship.providerType)) return false
  if (filters.scholarshipTypes.length && !filters.scholarshipTypes.includes(scholarship.scholarshipType)) return false
  if (filters.educationLevels.length && !filters.educationLevels.some((level) => scholarship.educationLevels.includes(level as EducationLevel))) return false
  if (filters.streams.length && scholarship.streams.length && !filters.streams.some((stream) => scholarship.streams.includes(stream))) return false
  if (filters.states.length && scholarship.states.length && !filters.states.some((state) => scholarship.states.includes(state))) return false
  if (filters.categories.length && scholarship.categories.length && !filters.categories.some((category) => scholarship.categories.includes(category))) return false
  if (filters.genders.length && !filters.genders.includes(scholarship.genderEligibility)) return false
  if (filters.incomeLimits.length && scholarship.incomeLimitBucket && !filters.incomeLimits.includes(scholarship.incomeLimitBucket)) return false
  if (filters.benefitAmounts.length && !filters.benefitAmounts.some((bucket) => benefitMatchesBucket(scholarship.benefitValue, bucket))) return false
  if (filters.statuses.length && !filters.statuses.some((label) => statusLabelToValue[label] === scholarship.status)) return false
  return true
}

export function sortScholarships(list: ScholarshipListItem[], sort: SortValue): ScholarshipListItem[] {
  const copy = [...list]
  if (sort === 'closing-soon') return copy.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
  if (sort === 'highest-benefit') return copy.sort((a, b) => b.benefitValue - a.benefitValue)
  if (sort === 'recently-added') return copy.sort((a, b) => (a.id < b.id ? 1 : -1))
  // Recommended: the authored/cycled feed order (see `getScholarshipFeed`), with
  // closed scholarships pushed to the end so they don't dominate default results
  // (rule 9). Deliberately does NOT also promote `featured` records ahead of the
  // rest here — doing so across a cycled demo feed would cluster every repeated
  // copy of the same one or two featured records at the very front, defeating
  // the mock-feed-variety correction below. `featured` still surfaces visually
  // via `SponsoredBadge` on the card itself.
  return copy.sort((a, b) => {
    if ((a.status === 'closed') !== (b.status === 'closed')) return a.status === 'closed' ? 1 : -1
    return 0
  })
}

export function countActiveFilters(filters: FilterState): number {
  return Object.values(filters).reduce((total, values) => total + values.length, 0)
}

/**
 * ==================================================================
 * URL query-state convention (Scholarship Listing)
 * ==================================================================
 *
 * Follows the same convention as `features/courses/data/filters.ts` (the
 * `CRS-01` reference implementation) exactly — see that file's header
 * comment for the full rationale. Summary:
 *
 * - The URL is the single source of truth; `filters`/`sort` are derived
 *   from `useSearchParams()` via `useMemo`, never a parallel `useState`.
 * - One query param per filter group, stable hand-authored slugs (never
 *   human labels), comma-separated for multi-select
 *   (`provider=government,private`).
 * - Empty groups and the default sort (`recommended`) are omitted from
 *   the URL entirely.
 * - Params are written in the stable order `filterGroups` is defined in,
 *   with `sort` last, so generated URLs are deterministic.
 * - Unknown/invalid slugs are silently dropped during parsing.
 */

export const filterKeyToParam: Record<FilterKey, string> = {
  providerTypes: 'provider',
  scholarshipTypes: 'type',
  educationLevels: 'level',
  streams: 'stream',
  states: 'state',
  categories: 'category',
  genders: 'gender',
  incomeLimits: 'income',
  benefitAmounts: 'benefit',
  statuses: 'status',
}

const providerTypeSlugs: Record<string, string> = {
  Government: 'government',
  Private: 'private',
  University: 'university',
  'Trust / Foundation': 'trust-foundation',
}

const scholarshipTypeSlugs: Record<string, string> = {
  'Merit Based': 'merit',
  'Need Based': 'need',
  Minority: 'minority',
  Sports: 'sports',
  Research: 'research',
  Women: 'women',
  Disability: 'disability',
}

const educationLevelSlugs: Record<string, string> = {
  'Class 10': 'class-10',
  'Class 12': 'class-12',
  Undergraduate: 'undergraduate',
  Postgraduate: 'postgraduate',
  Diploma: 'diploma',
  PhD: 'phd',
}

const streamSlugs: Record<string, string> = {
  Engineering: 'engineering',
  Medical: 'medical',
  Management: 'management',
  Science: 'science',
  Arts: 'arts',
  Law: 'law',
  Design: 'design',
}

const stateSlugs: Record<string, string> = {
  Maharashtra: 'maharashtra',
  Delhi: 'delhi',
  Karnataka: 'karnataka',
  'Tamil Nadu': 'tamil-nadu',
  'Uttar Pradesh': 'uttar-pradesh',
  'West Bengal': 'west-bengal',
}

const categorySlugs: Record<string, string> = {
  General: 'general',
  OBC: 'obc',
  SC: 'sc',
  ST: 'st',
  EWS: 'ews',
  Minority: 'minority',
}

const genderSlugs: Record<string, string> = {
  'All Genders': 'all',
  'Female Only': 'female',
}

const incomeLimitSlugs: Record<string, string> = {
  'Below ₹2.5 Lakh': 'below-2-5-lakh',
  '₹2.5–5 Lakh': '2-5-5-lakh',
  '₹5–8 Lakh': '5-8-lakh',
  'Above ₹8 Lakh': 'above-8-lakh',
}

const benefitAmountSlugs: Record<string, string> = {
  'Under ₹50,000': 'under-50k',
  '₹50,000–1,00,000': '50k-1l',
  '₹1,00,000–2,00,000': '1l-2l',
  'Above ₹2,00,000': 'above-2l',
}

const applicationStatusSlugs: Record<string, string> = {
  Open: 'open',
  'Closing Soon': 'closing-soon',
  Upcoming: 'upcoming',
}

const filterSlugMaps: Record<FilterKey, Record<string, string>> = {
  providerTypes: providerTypeSlugs,
  scholarshipTypes: scholarshipTypeSlugs,
  educationLevels: educationLevelSlugs,
  streams: streamSlugs,
  states: stateSlugs,
  categories: categorySlugs,
  genders: genderSlugs,
  incomeLimits: incomeLimitSlugs,
  benefitAmounts: benefitAmountSlugs,
  statuses: applicationStatusSlugs,
}

function invert(map: Record<string, string>): Record<string, string> {
  return Object.fromEntries(Object.entries(map).map(([value, slug]) => [slug, value]))
}

const filterSlugReverseMaps: Record<FilterKey, Record<string, string>> = Object.fromEntries(
  (Object.keys(filterSlugMaps) as FilterKey[]).map((key) => [key, invert(filterSlugMaps[key])])
) as Record<FilterKey, Record<string, string>>

/** Builds a deterministic, minimal query string for the given filters/sort — omits empty groups and a default sort. */
export function serializeScholarshipFilters(filters: FilterState, sort: SortValue): string {
  const params = new URLSearchParams()
  filterGroups.forEach((group) => {
    const values = filters[group.key]
    if (!values.length) return
    const slugMap = filterSlugMaps[group.key]
    const slugs = values.map((value) => slugMap[value]).filter((slug): slug is string => Boolean(slug))
    if (!slugs.length) return
    params.set(filterKeyToParam[group.key], slugs.join(','))
  })
  if (sort !== 'recommended') params.set('sort', sort)
  return params.toString()
}

/** Parses filters from URL search params. Unknown/invalid slugs are silently dropped. */
export function parseScholarshipFilters(searchParams: URLSearchParams): FilterState {
  const result: FilterState = { ...emptyFilters }
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

/** Parses sort from URL search params. Falls back to `recommended` for a missing/invalid value. */
export function parseScholarshipSort(searchParams: URLSearchParams): SortValue {
  const raw = searchParams.get('sort')
  const match = sortOptions.find((option) => option.value === raw)
  return match ? match.value : 'recommended'
}
