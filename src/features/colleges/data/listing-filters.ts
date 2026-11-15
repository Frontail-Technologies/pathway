import type { FacetGroup, SelectedFilters } from '@/components/shared/listing/types'
import { sortOptions, type SortValue } from './filters'

export const collegeFilterKeys = ['states', 'cities', 'courses', 'instituteTypes', 'exams', 'fees', 'studyModes'] as const
export type CollegeFilterKey = (typeof collegeFilterKeys)[number]

export type FacetCount = { slug: string; label: string; count: number; state?: string }
export type CollegeFacets = Record<'states' | 'cities' | 'courses' | 'instituteTypes' | 'exams', FacetCount[]>

export const emptyCollegeFacets: CollegeFacets = { states: [], cities: [], courses: [], instituteTypes: [], exams: [] }

const feeOptions = [
  { value: 'under-1-lakh', label: 'Under ₹1 Lakh' },
  { value: '1-3-lakh', label: '₹1–3 Lakh' },
  { value: '3-6-lakh', label: '₹3–6 Lakh' },
  { value: '6-plus-lakh', label: '₹6 Lakh +' },
]

const studyModeOptions = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'online', label: 'Online' },
  { value: 'distance', label: 'Distance' },
]

const SLUG = /^[a-z0-9][a-z0-9-]{0,80}$/

export function parseCollegeListingFilters(params: URLSearchParams): SelectedFilters {
  return Object.fromEntries(
    collegeFilterKeys.map((key) => [
      key,
      (params.get(key) ?? '')
        .split(',')
        .map((value) => value.trim().toLowerCase())
        .filter((value) => SLUG.test(value)),
    ]),
  )
}

export function parseCollegeListingSort(params: URLSearchParams): SortValue {
  const raw = params.get('sort')
  return sortOptions.find((option) => option.value === raw)?.value ?? 'popularity'
}

export const parseCollegeListingSearch = (params: URLSearchParams) => (params.get('q') ?? '').trim()

export function serializeCollegeListing(filters: SelectedFilters, sort: string, query = ''): string {
  const params = new URLSearchParams()
  if (query.trim()) params.set('q', query.trim())
  for (const key of collegeFilterKeys) {
    const values = filters[key] ?? []
    if (values.length) params.set(key, values.join(','))
  }
  if (sort && sort !== 'popularity') params.set('sort', sort)
  return params.toString()
}

const toOptions = (rows: FacetCount[]) => rows.map((row) => ({ value: row.slug, label: row.label, count: row.count, hint: row.state }))

export function collegeFacetGroups(facets: CollegeFacets): FacetGroup[] {
  return [
    { key: 'states', title: 'State', options: toOptions(facets.states), searchable: true },
    { key: 'cities', title: 'City', options: toOptions(facets.cities), searchable: true },
    { key: 'courses', title: 'Course', options: toOptions(facets.courses) },
    { key: 'instituteTypes', title: 'Ownership', options: toOptions(facets.instituteTypes) },
    { key: 'fees', title: 'Tuition per year', options: feeOptions },
    { key: 'exams', title: 'Entrance exam', options: toOptions(facets.exams) },
    { key: 'studyModes', title: 'Study mode', options: studyModeOptions },
  ]
}

export const collegeSortOptions = sortOptions.map((option) => ({ value: option.value, label: option.label }))
