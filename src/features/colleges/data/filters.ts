import type { CollegeListItem } from './colleges'


export const stateOptions = ['Delhi', 'Maharashtra', 'Tamil Nadu', 'Rajasthan', 'Karnataka', 'Punjab'] as const
export const cityOptions = ['New Delhi', 'Mumbai', 'Chennai', 'Pilani', 'Vellore', 'Manipal'] as const
export const courseOptions = ['B.Tech', 'B.E.', 'B.Com', 'BBA', 'MBA', 'BCA'] as const
export const feesOptions = ['Under ₹1 Lakh', '₹1–3 Lakh', '₹3–6 Lakh', '₹6+ Lakh'] as const
export const instituteTypeOptions = ['Government', 'Private', 'Deemed'] as const
export const studyModeOptions = ['Full-time', 'Distance', 'Online'] as const
export const ratingOptions = ['4★ & above', '3★ & above'] as const
export const examOptions = ['JEE Main', 'JEE Advanced', 'NEET UG', 'CAT', 'CUET UG', 'BITSAT'] as const

export const sortOptions = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'rating', label: 'Rating' },
  { value: 'fees-asc', label: 'Fees: Low to High' },
  { value: 'fees-desc', label: 'Fees: High to Low' },
] as const

export type SortValue = (typeof sortOptions)[number]['value']

export type FilterKey = 'states' | 'cities' | 'courses' | 'fees' | 'instituteTypes' | 'studyModes' | 'ratings' | 'exams'

export type FilterState = Record<FilterKey, string[]>

export const emptyFilters: FilterState = {
  states: [],
  cities: [],
  courses: [],
  fees: [],
  instituteTypes: [],
  studyModes: [],
  ratings: [],
  exams: [],
}

export const filterGroups: { key: FilterKey; title: string; options: readonly string[] }[] = [
  { key: 'states', title: 'State', options: stateOptions },
  { key: 'cities', title: 'City', options: cityOptions },
  { key: 'courses', title: 'Course / Degree', options: courseOptions },
  { key: 'fees', title: 'Fees', options: feesOptions },
  { key: 'instituteTypes', title: 'Institute Type', options: instituteTypeOptions },
  { key: 'studyModes', title: 'Study Mode', options: studyModeOptions },
  { key: 'ratings', title: 'Rating', options: ratingOptions },
  { key: 'exams', title: 'Entrance Exam', options: examOptions },
]

const slugOf = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const filterSlugs: Record<FilterKey, Record<string, string>> = {
  states: Object.fromEntries(stateOptions.map((option) => [option, slugOf(option)])),
  cities: Object.fromEntries(cityOptions.map((option) => [option, slugOf(option)])),
  courses: { 'B.Tech': 'btech', 'B.E.': 'be', 'B.Com': 'bcom', BBA: 'bba', MBA: 'mba', BCA: 'bca' },
  fees: { 'Under ₹1 Lakh': 'under-1-lakh', '₹1–3 Lakh': '1-3-lakh', '₹3–6 Lakh': '3-6-lakh', '₹6+ Lakh': '6-plus-lakh' },
  instituteTypes: { Government: 'government', Private: 'private', Deemed: 'deemed' },
  studyModes: { 'Full-time': 'full-time', Distance: 'distance', Online: 'online' },
  ratings: { '4★ & above': '4-plus', '3★ & above': '3-plus' },
  exams: { 'JEE Main': 'jee-main', 'JEE Advanced': 'jee-advanced', 'NEET UG': 'neet-ug', CAT: 'cat', 'CUET UG': 'cuet-ug', BITSAT: 'bitsat' },
}
const filterLabels = Object.fromEntries(
  (Object.keys(filterSlugs) as FilterKey[]).map((key) => [key, Object.fromEntries(Object.entries(filterSlugs[key]).map(([label, slug]) => [slug, label]))]),
) as Record<FilterKey, Record<string, string>>

export function serializeCollegeFilters(filters: FilterState, sort: SortValue, query = ''): string {
  const params = new URLSearchParams()
  if (query.trim()) params.set('q', query.trim())
  for (const group of filterGroups) {
    const slugs = filters[group.key].map((value) => filterSlugs[group.key][value]).filter(Boolean)
    if (slugs.length) params.set(group.key, slugs.join(','))
  }
  if (sort !== 'popularity') params.set('sort', sort)
  return params.toString()
}

export function parseCollegeFilters(params: URLSearchParams): FilterState {
  const result: FilterState = { ...emptyFilters }
  for (const group of filterGroups) {
    const raw = params.get(group.key)
    result[group.key] = raw ? raw.split(',').map((slug) => filterLabels[group.key][slug]).filter((label): label is string => Boolean(label)) : []
  }
  return result
}

export const parseCollegeSearch = (params: URLSearchParams) => params.get('q') ?? ''

export function parseCollegeSort(params: URLSearchParams): SortValue {
  const raw = params.get('sort')
  return sortOptions.find((option) => option.value === raw)?.value ?? 'popularity'
}

function feesMatchesBucket(feesValue: number, bucket: string): boolean {
  if (bucket === 'Under ₹1 Lakh') return feesValue < 1
  if (bucket === '₹1–3 Lakh') return feesValue >= 1 && feesValue <= 3
  if (bucket === '₹3–6 Lakh') return feesValue > 3 && feesValue <= 6
  if (bucket === '₹6+ Lakh') return feesValue > 6
  return true
}

function ratingMatchesBucket(rating: number, bucket: string): boolean {
  if (bucket === '4★ & above') return rating >= 4
  if (bucket === '3★ & above') return rating >= 3
  return true
}

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

 
export function matchesQuery(college: CollegeListItem, query: string): boolean {
  const terms = normalize(query).split(' ').filter(Boolean)
  if (terms.length === 0) return true
  const haystack = normalize([college.name, college.city, college.state, college.popularCourse, college.degree].join(' '))
  return terms.every((term) => haystack.includes(term))
}

export function matchesFilters(college: CollegeListItem, filters: FilterState): boolean {
  if (filters.states.length && !filters.states.includes(college.state)) return false
  if (filters.cities.length && !filters.cities.includes(college.city)) return false
  if (filters.courses.length && !filters.courses.includes(college.degree)) return false
  if (filters.instituteTypes.length && !filters.instituteTypes.includes(college.type)) return false
  if (filters.studyModes.length && !filters.studyModes.includes(college.studyMode)) return false
  if (filters.exams.length && !filters.exams.includes(college.exam)) return false
  if (filters.fees.length && !filters.fees.some((bucket) => feesMatchesBucket(college.feesValue, bucket))) return false
  if (filters.ratings.length && !filters.ratings.some((bucket) => ratingMatchesBucket(college.rating, bucket))) return false
  return true
}

export function sortColleges(list: CollegeListItem[], sort: SortValue): CollegeListItem[] {
  const copy = [...list]
  if (sort === 'rating') return copy.sort((a, b) => b.rating - a.rating)
  if (sort === 'fees-asc') return copy.sort((a, b) => a.feesValue - b.feesValue)
  if (sort === 'fees-desc') return copy.sort((a, b) => b.feesValue - a.feesValue)
  return copy
}

export function countActiveFilters(filters: FilterState): number {
  return Object.values(filters).reduce((total, values) => total + values.length, 0)
}
