import { courses, type CourseListItem } from '@/features/courses/data/courses'
import { getCourseDetail, type CourseDetailData } from '@/features/courses/data/course-detail'
import { colleges } from '@/features/colleges/data/colleges'
import { getCollegeDetail } from '@/features/colleges/data/college-detail'
import type {
  AdminContentStatus,
  AdminDataQualityStatus,
  AdminProgram,
  AdminProgramDetail,
  AdminProgramDocument,
  AdminProgramDocumentType,
  AdminProgramInstitutionOffering,
  AdminProgramStudyLevel,
  ContentIssue,
  ProgramCompletenessBreakdown,
  ProgramQualityBreakdown,
  SectionCompletenessState,
  SectionQualityState,
} from '../types/programs'

export function calculateProgramCompleteness(
  course: CourseListItem,
  detail?: CourseDetailData
): {
  percentage: number
  status: AdminContentStatus
  breakdown: ProgramCompletenessBreakdown
} {
  const hasDetail = !!detail

  const breakdown: ProgramCompletenessBreakdown = {
    identity: course.name && course.degree && course.level && course.stream ? 'complete' : 'partial',
    overview: hasDetail && detail.overviewCopy ? 'complete' : 'missing',
    eligibility: hasDetail && detail.eligibility ? 'complete' : course.eligibility ? 'partial' : 'missing',
    curriculum: hasDetail && detail.syllabus && detail.syllabus.length > 0 ? 'complete' : 'missing',
    exams: hasDetail && detail.exams && detail.exams.length > 0 ? 'complete' : course.entranceExams.length > 0 ? 'partial' : 'missing',
    careers: hasDetail && detail.careers && detail.careers.length > 0 ? 'complete' : course.careerAreas.length > 0 ? 'partial' : 'missing',
    institutions: hasDetail && detail.colleges && detail.colleges.length > 0 ? 'complete' : course.collegesOffering > 0 ? 'partial' : 'missing',
  }

  const weights: Record<keyof ProgramCompletenessBreakdown, number> = {
    identity: 20,
    overview: 15,
    eligibility: 15,
    curriculum: 15,
    exams: 10,
    careers: 15,
    institutions: 10,
  }

  let totalScore = 0
  for (const [key, state] of Object.entries(breakdown) as [keyof ProgramCompletenessBreakdown, SectionCompletenessState][]) {
    const weight = weights[key]
    if (state === 'complete') {
      totalScore += weight
    } else if (state === 'partial') {
      totalScore += Math.round(weight * 0.45)
    }
  }

  let status: AdminContentStatus = 'basic'
  if (totalScore >= 80) {
    status = 'complete'
  } else if (totalScore >= 35) {
    status = 'partial'
  }

  return {
    percentage: Math.min(totalScore, 100),
    status,
    breakdown,
  }
}

export function calculateProgramQuality(
  course: CourseListItem,
  detail?: CourseDetailData
): {
  status: AdminDataQualityStatus
  breakdown: ProgramQualityBreakdown
  topIssues: ContentIssue[]
} {
  const hasDetail = !!detail

  const breakdown: ProgramQualityBreakdown = {
    identity: course.name && course.degree && course.level ? 'ready' : 'needs_review',
    eligibility: hasDetail && detail.eligibility ? 'ready' : course.eligibility ? 'ready' : 'missing',
    curriculum: hasDetail && detail.syllabus && detail.syllabus.length > 0 ? 'needs_review' : 'missing',
    exams: hasDetail && detail.exams && detail.exams.length > 0 ? 'ready' : course.entranceExams.length > 0 ? 'ready' : 'missing',
    careers: hasDetail && detail.careerMetrics && detail.careerMetrics.length > 0 ? 'needs_review' : course.careerAreas.length > 0 ? 'needs_review' : 'missing',
    institutions: hasDetail && detail.colleges && detail.colleges.length > 0 ? 'ready' : 'needs_review',
  }

  const topIssues: ContentIssue[] = []

  if (!hasDetail) {
    topIssues.push({
      id: 'missing-detail',
      label: 'Public course detail page not authored',
      severity: 'warning',
    })
    topIssues.push({
      id: 'missing-curriculum',
      label: 'Semester curriculum and syllabus subjects unlinked',
      severity: 'warning',
    })
    topIssues.push({
      id: 'unmapped-institutions',
      label: 'Institution offering relationships pending assignment',
      severity: 'info',
    })
  } else {
    topIssues.push({
      id: 'career-src',
      label: 'Salary ranges and career outcome claims require source verification',
      severity: 'warning',
    })
    topIssues.push({
      id: 'syllabus-doc',
      label: 'Curriculum syllabus has no verified official document attached',
      severity: 'info',
    })
    topIssues.push({
      id: 'fee-range-src',
      label: 'Baseline fee brackets lack verified institution-level breakdown',
      severity: 'info',
    })
  }

  let status: AdminDataQualityStatus = 'incomplete'
  if (hasDetail) {
    status = 'needs_review'
  } else {
    status = 'incomplete'
  }

  return {
    status,
    breakdown,
    topIssues,
  }
}

export function getProgramOfferings(courseSlug: string, courseName: string): AdminProgramInstitutionOffering[] {
  const detail = getCourseDetail(courseSlug)
  const offerings: AdminProgramInstitutionOffering[] = []
  const seenSlugs = new Set<string>()

  if (detail?.colleges && detail.colleges.length > 0) {
    for (const col of detail.colleges) {
      if (seenSlugs.has(col.slug)) continue
      seenSlugs.add(col.slug)

      const collegeBase = colleges.find((c) => c.slug === col.slug)
      const collegeDetail = getCollegeDetail(col.slug)

      offerings.push({
        id: collegeBase?.id || col.slug,
        slug: col.slug,
        name: col.name,
        city: col.city,
        state: collegeBase?.state || '',
        type: col.type || collegeBase?.type || 'Government',
        fees: col.fees || collegeBase?.fees,
        exam: col.exam || collegeBase?.exam,
        hasDetailPage: !!collegeDetail,
      })
    }
  }

  for (const college of colleges) {
    if (seenSlugs.has(college.slug)) continue

    const colDetail = getCollegeDetail(college.slug)
    const offersViaCourses = colDetail?.courses?.some(
      (c) => c.name.toLowerCase() === courseName.toLowerCase() || c.name.toLowerCase().includes(courseName.toLowerCase())
    )
    const offersViaPopular = college.popularCourse?.toLowerCase() === courseName.toLowerCase()

    if (offersViaCourses || offersViaPopular) {
      seenSlugs.add(college.slug)
      offerings.push({
        id: college.id,
        slug: college.slug,
        name: college.name,
        city: college.city,
        state: college.state,
        type: college.type,
        fees: college.fees,
        exam: college.exam,
        hasDetailPage: !!colDetail,
      })
    }
  }

  return offerings
}

export function getAdminPrograms(): AdminProgram[] {
  return courses.map((course) => {
    const detail = getCourseDetail(course.slug)
    const hasDetailPage = !!detail
    const completenessResult = calculateProgramCompleteness(course, detail)
    const qualityResult = calculateProgramQuality(course, detail)
    const offerings = getProgramOfferings(course.slug, course.name)

    return {
      id: course.id,
      slug: course.slug,
      name: course.name,
      degree: course.degree,
      level: course.level,
      stream: course.stream,
      specialization: course.specialization,
      duration: course.duration,
      durationValue: course.durationValue,
      studyMode: course.studyMode,
      eligibility: course.eligibility,
      entranceExams: course.entranceExams,
      fees: course.fees,
      feesValue: course.feesValue,
      careerAreas: course.careerAreas,
      collegesOfferingCount: offerings.length > 0 ? offerings.length : course.collegesOffering,
      offerings,
      documents: [],
      hasDetailPage,
      completeness: completenessResult.percentage,
      contentStatus: completenessResult.status,
      qualityStatus: qualityResult.status,
      provenance: {
        sourceType: 'manual',
        syncStatus: 'manual',
      },
      breakdown: completenessResult.breakdown,
      qualityBreakdown: qualityResult.breakdown,
      topIssues: qualityResult.topIssues,
    }
  })
}

export function getAdminProgramById(id: string): AdminProgramDetail | undefined {
  const all = getAdminPrograms()
  const program = all.find((item) => item.id === id || item.slug === id)
  if (!program) return undefined

  const detail = getCourseDetail(program.slug)
  return {
    program,
    detail,
  }
}

export function getAdminProgramFilterOptions(): {
  levels: AdminProgramStudyLevel[]
  streams: string[]
  durations: string[]
  qualityStatuses: { value: string; label: string }[]
  institutions: { id: string; slug: string; name: string }[]
} {
  const levels: AdminProgramStudyLevel[] = ['Undergraduate', 'Postgraduate', 'Diploma', 'Certificate']
  const streams = Array.from(new Set(courses.map((c) => c.stream))).sort()
  const durations = Array.from(new Set(courses.map((c) => c.duration))).sort()
  const qualityStatuses = [
    { value: 'all', label: 'All' },
    { value: 'ready', label: 'Ready' },
    { value: 'needs_review', label: 'Needs review' },
    { value: 'conflict', label: 'Conflict' },
    { value: 'incomplete', label: 'Incomplete' },
  ]
  const institutions = colleges.map((c) => ({ id: c.id, slug: c.slug, name: c.name }))

  return { levels, streams, durations, qualityStatuses, institutions }
}
