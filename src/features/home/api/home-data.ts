import { cache } from 'react'
import { getCollegeFacets, listColleges } from '@/features/colleges/api/colleges-api'
import { listCourses } from '@/features/courses/api/courses-api'
import { listExams } from '@/features/exams/api/exams-api'
import { listScholarships } from '@/features/scholarships/api/scholarships-api'
import { catalogGet } from '@/services/api/catalog'

const totalOf = (request: Promise<{ page: { total?: number } }>) => request.then((list) => list.page.total ?? 0).catch(() => 0)

export const getCatalogTotals = cache(async () => {
  const [colleges, courses, exams, scholarships] = await Promise.all([
    totalOf(listColleges({ limit: '1' })),
    totalOf(listCourses({ limit: '1' })),
    totalOf(listExams({ limit: '1' })),
    totalOf(listScholarships({ limit: '1' })),
  ])
  return { colleges, courses, exams, scholarships }
})

export const getTopRanked = cache(async (limit = 5) =>
  listColleges({ sort: 'ranking', limit: String(limit) })
    .then((list) => list.items.filter((college) => college.ranking))
    .catch(() => []),
)

export type HomeStream = {
  slug: string
  name: string
  tagline: string
  icon: string
  degreeLabels: string[]
  exams: { slug: string; label: string }[]
  counts: { courses: number; exams: number; colleges: number; scholarships: number }
}

export const getStreams = cache(async (): Promise<HomeStream[]> => catalogGet<HomeStream[]>('/streams').catch(() => []))

export const getDegreeFacets = cache(async () => {
  const facets = await getCollegeFacets()
  return facets.courses
})

export const getCityFacets = cache(async () => {
  const facets = await getCollegeFacets()
  return facets.cities
})

export const getPopularExams = cache(async (limit = 8) =>
  listExams({ sort: 'popular', limit: '24' })
    .then((list) => list.items.filter((exam) => exam.popular).slice(0, limit))
    .catch(() => []),
)

export const getPopularCourses = cache(async (limit = 8) =>
  listCourses({ sort: 'popularity', limit: String(limit) })
    .then((list) => list.items)
    .catch(() => []),
)

export async function getPopularSearches(limit = 8) {
  const [exams, degrees] = await Promise.all([getPopularExams(4), getDegreeFacets()])
  const terms = [...degrees.slice(0, limit - Math.min(exams.length, 4)).map((degree) => degree.label), ...exams.map((exam) => exam.shortName)]
  return [...new Set(terms)].slice(0, limit)
}
