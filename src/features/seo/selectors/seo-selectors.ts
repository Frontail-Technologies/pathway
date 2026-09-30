import {
  SeoTargetType,
  SeoMetadataRecord,
  ResolvedSeoMetadata,
  KNOWN_STATIC_ROUTES,
  seoTargetTypeMap,
} from '../types/seo-metadata'
import { colleges } from '@/features/colleges/data/colleges'
import { getCollegeDetail } from '@/features/colleges/data/college-detail'
import { courses } from '@/features/courses/data/courses'
import { getCourseDetail } from '@/features/courses/data/course-detail'
import { exams } from '@/features/exams/data/exams'
import { scholarships } from '@/features/scholarships/data/scholarships'
import { getScholarshipDetail } from '@/features/scholarships/data/scholarship-detail'
import { tutors } from '@/features/tutors/data/tutors'
import { coachingProviders } from '@/features/coaching/data/coaching'
import { getNotes } from '@/features/notes/data/notes'

export interface GeneratedBaselineMetadata {
  title: string
  description: string
  canonicalPath: string
  robotsIndex?: boolean
  robotsFollow?: boolean
  ogTitle: string
  ogDescription: string
  ogImage?: string
  targetLabel: string
  targetRoutePath: string
}

export function validateCanonicalPath(path?: string): { isValid: boolean; error?: string } {
  if (!path || path.trim() === '') {
    return { isValid: true }
  }

  const trimmed = path.trim()

  if (!trimmed.startsWith('/')) {
    return { isValid: false, error: 'Canonical path must be an internal relative path starting with / (e.g. /college/iit-delhi).' }
  }

  if (
    trimmed.startsWith('//') ||
    trimmed.startsWith('javascript:') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('#') ||
    trimmed.includes(' ') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://')
  ) {
    return { isValid: false, error: 'Canonical path contains invalid protocols, schemes, or spaces. Use internal relative paths only.' }
  }

  return { isValid: true }
}

export function getGeneratedMetadataForSeoTarget(
  targetType: SeoTargetType,
  identifier: string
): GeneratedBaselineMetadata {
  switch (targetType) {
    case 'static_page': {
      const route = KNOWN_STATIC_ROUTES.find((r) => r.path === identifier)
      if (route) {
        return {
          title: route.defaultTitle,
          description: route.defaultDescription,
          canonicalPath: route.path,
          robotsIndex: route.defaultRobotsIndex ?? true,
          robotsFollow: route.defaultRobotsFollow ?? true,
          ogTitle: route.defaultTitle,
          ogDescription: route.defaultDescription,
          targetLabel: route.label,
          targetRoutePath: route.path,
        }
      }
      return {
        title: 'Pathway — Education discovery, made clearer',
        description: 'A trusted education discovery platform for finding the right colleges, courses, exams, and opportunities.',
        canonicalPath: identifier.startsWith('/') ? identifier : `/${identifier}`,
        robotsIndex: true,
        robotsFollow: true,
        ogTitle: 'Pathway — Education discovery, made clearer',
        ogDescription: 'A trusted education discovery platform for finding the right colleges, courses, exams, and opportunities.',
        targetLabel: identifier,
        targetRoutePath: identifier.startsWith('/') ? identifier : `/${identifier}`,
      }
    }

    case 'institution': {
      const college = colleges.find((c) => c.slug === identifier || c.id === identifier)
      if (college) {
        const detail = getCollegeDetail(college.slug)
        const title = `${college.name} | Pathway`
        const description = detail?.overviewCopy || `Explore admissions, degree programs, fee schedules, and campus facilities at ${college.name} in ${college.city}, ${college.state}.`
        return {
          title,
          description,
          canonicalPath: `/college/${college.slug}`,
          ogTitle: title,
          ogDescription: description,
          ogImage: detail?.gallery?.[0]?.src,
          targetLabel: college.name,
          targetRoutePath: `/college/${college.slug}`,
        }
      }
      break
    }

    case 'program': {
      const course = courses.find((c) => c.slug === identifier || c.id === identifier)
      if (course) {
        const detail = getCourseDetail(course.slug)
        const title = `${course.name} | Degree Program | Pathway`
        const description = detail?.overviewCopy || `Discover ${course.name} degree structure (${course.level} · ${course.stream}), eligibility requirements, and career pathways.`
        return {
          title,
          description,
          canonicalPath: `/course/${course.slug}`,
          ogTitle: title,
          ogDescription: description,
          targetLabel: course.name,
          targetRoutePath: `/course/${course.slug}`,
        }
      }
      break
    }

    case 'exam': {
      const exam = exams.find((e) => e.slug === identifier || e.id === identifier)
      if (exam) {
        const title = `${exam.name} — Exam Dates, Syllabus & Pattern | Pathway`
        const description = exam.description || `Comprehensive guide to ${exam.name} (${exam.studyArea} · ${exam.scope}) registration deadlines, syllabus topics, and pattern.`
        return {
          title,
          description,
          canonicalPath: `/exam/${exam.slug}`,
          ogTitle: title,
          ogDescription: description,
          targetLabel: exam.name,
          targetRoutePath: `/exam/${exam.slug}`,
        }
      }
      break
    }

    case 'scholarship': {
      const scholarship = scholarships.find((s) => s.slug === identifier || s.id === identifier)
      if (scholarship) {
        const detail = getScholarshipDetail(scholarship.slug)
        const title = `${scholarship.name} — Eligibility & Benefits | Pathway`
        const description = detail?.overviewCopy || `Discover ${scholarship.name} eligibility criteria, ${scholarship.benefitLabel} coverage, and application details.`
        return {
          title,
          description,
          canonicalPath: `/scholarship/${scholarship.slug}`,
          ogTitle: title,
          ogDescription: description,
          targetLabel: scholarship.name,
          targetRoutePath: `/scholarship/${scholarship.slug}`,
        }
      }
      break
    }

    case 'tutor': {
      const tutor = tutors.find((t) => t.slug === identifier || t.id === identifier)
      if (tutor) {
        const title = `${tutor.name} — Verified Educator | Pathway`
        const description = tutor.intro || `${tutor.name} (${tutor.headline}) offers personalized academic mentorship and competitive exam preparation on Pathway.`
        return {
          title,
          description,
          canonicalPath: `/tutor/${tutor.slug}`,
          ogTitle: title,
          ogDescription: description,
          ogImage: tutor.portrait,
          targetLabel: tutor.name,
          targetRoutePath: `/tutor/${tutor.slug}`,
        }
      }
      break
    }

    case 'coaching': {
      const provider = coachingProviders.find((c) => c.slug === identifier || c.id === identifier)
      if (provider) {
        const title = `${provider.name} — Coaching Programs & Fees | Pathway`
        const description = provider.aboutCopy || `Explore classroom programs, faculty credentials, and exam coaching for ${provider.exams.join(', ')} at ${provider.name} in ${provider.location}.`
        return {
          title,
          description,
          canonicalPath: `/coaching/${provider.slug}`,
          ogTitle: title,
          ogDescription: description,
          ogImage: provider.gallery?.[0],
          targetLabel: provider.name,
          targetRoutePath: `/coaching/${provider.slug}`,
        }
      }
      break
    }

    case 'note': {
      const allNotes = getNotes()
      const note = allNotes.find((n) => n.slug === identifier || n.id === identifier)
      if (note) {
        const title = `${note.title} | Notes & Study Material | Pathway`
        const description = note.shortDescription || `Download and study ${note.title} curated for ${note.subject} on Pathway.`
        return {
          title,
          description,
          canonicalPath: `/notes/${note.slug}`,
          ogTitle: title,
          ogDescription: description,
          ogImage: note.coverImage,
          targetLabel: note.title,
          targetRoutePath: `/notes/${note.slug}`,
        }
      }
      break
    }
  }

  const prefix = seoTargetTypeMap[targetType]?.routePrefix || '/'
  const fallbackPath = `${prefix}${identifier}`
  return {
    title: 'Pathway — Education discovery, made clearer',
    description: 'A trusted education discovery platform for finding the right colleges, courses, exams, and opportunities.',
    canonicalPath: fallbackPath,
    ogTitle: 'Pathway — Education discovery, made clearer',
    ogDescription: 'A trusted education discovery platform for finding the right colleges, courses, exams, and opportunities.',
    targetLabel: identifier,
    targetRoutePath: fallbackPath,
  }
}

export function resolveEffectiveSeoMetadata(
  record?: Partial<SeoMetadataRecord>,
  targetType: SeoTargetType = 'static_page',
  identifier: string = '/'
): ResolvedSeoMetadata {
  const baseline = getGeneratedMetadataForSeoTarget(
    record?.targetType || targetType,
    record?.targetType === 'static_page' ? record?.routePath || identifier : record?.targetId || identifier
  )

  const isOverrideTitle = Boolean(record?.title && record.title.trim() !== '')
  const isOverrideDescription = Boolean(record?.description && record.description.trim() !== '')
  const isOverrideCanonical = Boolean(record?.canonicalPath && record.canonicalPath.trim() !== '')
  const isOverrideRobotsIndex = record?.robotsIndex !== undefined
  const isOverrideRobotsFollow = record?.robotsFollow !== undefined
  const isOverrideRobots = isOverrideRobotsIndex || isOverrideRobotsFollow
  const isOverrideOgTitle = Boolean(record?.ogTitle && record.ogTitle.trim() !== '')
  const isOverrideOgDescription = Boolean(record?.ogDescription && record.ogDescription.trim() !== '')
  const isOverrideOgImage = Boolean(record?.ogImage && record.ogImage.trim() !== '')

  const effectiveTitle = isOverrideTitle ? record!.title!.trim() : baseline.title
  const effectiveDescription = isOverrideDescription ? record!.description!.trim() : baseline.description
  const effectiveCanonical = isOverrideCanonical ? record!.canonicalPath!.trim() : baseline.canonicalPath

  const effectiveRobotsIndex = isOverrideRobotsIndex ? record!.robotsIndex! : (baseline.robotsIndex ?? true)
  const effectiveRobotsFollow = isOverrideRobotsFollow ? record!.robotsFollow! : (baseline.robotsFollow ?? true)

  const effectiveOgTitle = isOverrideOgTitle
    ? record!.ogTitle!.trim()
    : isOverrideTitle
    ? record!.title!.trim()
    : baseline.ogTitle

  const effectiveOgDescription = isOverrideOgDescription
    ? record!.ogDescription!.trim()
    : isOverrideDescription
    ? record!.description!.trim()
    : baseline.ogDescription

  const effectiveOgImage = isOverrideOgImage ? record!.ogImage!.trim() : baseline.ogImage

  const primaryKeyword = record?.primaryKeyword?.trim() || undefined
  const secondaryKeywords = (record?.secondaryKeywords || [])
    .map((k) => k.trim())
    .filter((k) => k.length > 0)

  return {
    title: effectiveTitle,
    description: effectiveDescription,
    primaryKeyword,
    secondaryKeywords,
    canonicalPath: effectiveCanonical,
    robotsIndex: effectiveRobotsIndex,
    robotsFollow: effectiveRobotsFollow,
    ogTitle: effectiveOgTitle,
    ogDescription: effectiveOgDescription,
    ogImage: effectiveOgImage,
    targetLabel: baseline.targetLabel,
    targetRoutePath: baseline.targetRoutePath,
    isOverrideTitle,
    isOverrideDescription,
    isOverrideCanonical,
    isOverrideRobots,
    isOverrideRobotsIndex,
    isOverrideRobotsFollow,
    isOverrideOgTitle,
    isOverrideOgDescription,
    isOverrideOgImage,
  }
}
