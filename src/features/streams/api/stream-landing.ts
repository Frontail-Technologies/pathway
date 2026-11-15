import { cache } from 'react'
import { getCollegeFacets, listColleges } from '@/features/colleges/api/colleges-api'
import { listNotices } from '@/features/content/api/content-api'
import { listCourses } from '@/features/courses/api/courses-api'
import { getDetailedExam } from '@/features/exams/api/exams-api'
import { examTabHref, examTabs } from '@/features/exams/config/exam-tabs'
import { listScholarships } from '@/features/scholarships/api/scholarships-api'
import { emptyFilters as emptyScholarshipFilters, serializeScholarshipFilters } from '@/features/scholarships/data/filters'
import { examFromSlug } from '@/features/college-predictor/data/predictor'
import { rankExamFromSlug } from '@/features/rank-predictor/data/rank'
import { availableTabs } from '@/lib/detail-tabs'
import { apiQueryFrom } from '@/lib/search-params'
import { getStreamDefinition, listStreamDtos } from './streams-api'

export type ExamQuickLinks = { slug: string; shortName: string; name: string; conductingBody: string; links: { label: string; href: string }[]; predictor: string | null }

async function examLinks(slug: string): Promise<ExamQuickLinks | null> {
  const exam = await getDetailedExam(slug).catch(() => undefined)
  if (!exam) return null
  const links = availableTabs(examTabs, exam).map((tab) => ({ label: tab.segment ? tab.label : 'Overview', href: examTabHref(exam.slug, tab.segment) }))
  if (examFromSlug[slug]) links.push({ label: 'College predictor', href: `/college-predictor?exam=${slug}` })
  if (rankExamFromSlug[slug]) links.push({ label: 'Rank predictor', href: `/rank-predictor?exam=${slug}` })
  return { slug, shortName: exam.shortName, name: exam.name, conductingBody: exam.conductingBody ?? '', links, predictor: examFromSlug[slug] ? `/college-predictor?exam=${slug}` : null }
}

export const getStreamLanding = cache(async (slug: string) => {
  const [stream, dtos, facets] = await Promise.all([getStreamDefinition(slug), listStreamDtos(), getCollegeFacets()])
  const dto = dtos.find((item) => item.slug === slug)
  if (!stream || !dto) return undefined

  const degrees = facets.courses.filter((option) => dto.degreeLabels.includes(option.label)).map((option) => option.slug)
  const collegeQuery = degrees.length ? `courses=${degrees.join(',')}` : ''
  const scholarshipQuery = stream.scholarshipStream ? serializeScholarshipFilters({ ...emptyScholarshipFilters, streams: [stream.scholarshipStream] }, 'closing-soon') : ''
  const examSlugs = dto.exams.map((exam) => exam.slug)

  const [colleges, courses, scholarships, notices, exams] = await Promise.all([
    degrees.length ? listColleges({ courses: degrees.join(','), sort: 'ranking', limit: '8' }).catch(() => null) : null,
    listCourses({ stream: slug, sort: 'popularity', limit: '6' }).catch(() => null),
    scholarshipQuery ? listScholarships({ ...apiQueryFrom(scholarshipQuery), limit: '8' }).catch(() => null) : null,
    listNotices(24),
    Promise.all(examSlugs.map(examLinks)),
  ])

  return {
    stream,
    tagline: dto.tagline,
    counts: { colleges: colleges?.page.total ?? dto.counts.colleges, courses: dto.counts.courses, exams: dto.counts.exams, scholarships: dto.counts.scholarships },
    colleges: colleges?.items ?? [],
    collegesHref: collegeQuery ? `/colleges?${collegeQuery}&sort=ranking` : '/colleges',
    courses: courses?.items ?? [],
    coursesHref: `/courses?stream=${slug}`,
    scholarships: scholarships?.items ?? [],
    scholarshipsHref: scholarshipQuery ? `/scholarships?${scholarshipQuery}` : '/scholarships',
    notices: notices.filter((notice) => notice.owner.kind === 'exam' && examSlugs.includes(notice.owner.slug)).slice(0, 6),
    exams: exams.filter((exam): exam is ExamQuickLinks => Boolean(exam)),
    states: collegeQuery ? facets.states.slice(0, 12).map((state) => ({ label: state.label, href: `/colleges?${collegeQuery}&states=${state.slug}&sort=ranking` })) : [],
  }
})

export type StreamLanding = NonNullable<Awaited<ReturnType<typeof getStreamLanding>>>
