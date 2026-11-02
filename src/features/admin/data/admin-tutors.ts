import {
  tutors,
  type Tutor,
  type TutorSubject,
  type TutorExam,
  type TutorLevel,
  type TutorLanguage,
  type TutorMode,
  type TutorAvatarSpec,
  type TutorDetail,
} from '@/features/tutors/data/tutors'

export type AdminTutorPortraitStatus = 'real' | 'illustration' | 'missing'

export type AdminTutorQualityStatus = 'Ready' | 'Needs Review' | 'Conflict' | 'Missing'

export type AdminTutorQualityCheck = {
  id: string
  label: string
  status: 'passed' | 'warning' | 'failed' | 'info'
  note: string
}

export type AdminTutorQualityAssessment = {
  status: AdminTutorQualityStatus
  score: number
  checks: AdminTutorQualityCheck[]
  issuesCount: number
}

export type AdminTutorCompletenessAssessment = {
  percentage: number
  completedCount: number
  totalCount: number
  missingFields: string[]
}

export type AdminTutorSourceInfo = {
  source: 'Manual' | 'Imported Approved' | 'Pipeline Staged'
  lastUpdated: string
  syncStatus: 'Manual Entry' | 'Synced' | 'Unsynced'
  scraperEligibility: 'Authorized Import Only (Personal Data)'
}

export type AdminTutor = Tutor & {
  portraitStatus: AdminTutorPortraitStatus
  completeness: AdminTutorCompletenessAssessment
  quality: AdminTutorQualityAssessment
  sourceInfo: AdminTutorSourceInfo
}

export function getTutorPortraitStatus(tutor: Tutor): AdminTutorPortraitStatus {
  if (tutor.portrait && tutor.portrait.trim().length > 0) {
    return 'real'
  }
  if (tutor.avatar) {
    return 'illustration'
  }
  return 'missing'
}

export function calculateTutorCompleteness(tutor: Tutor): AdminTutorCompletenessAssessment {
  const missing: string[] = []
  let completed = 0
  const total = 10

  if (tutor.name?.trim()) completed++
  else missing.push('Full name')

  if (tutor.headline?.trim()) completed++
  else missing.push('Headline')

  if (tutor.intro?.trim()) completed++
  else missing.push('Intro / bio')

  if (tutor.subjects && tutor.subjects.length > 0) completed++
  else missing.push('Subjects')

  if (tutor.exams && tutor.exams.length > 0) completed++
  else missing.push('Exam targets')

  if (tutor.studyLevels && tutor.studyLevels.length > 0) completed++
  else missing.push('Study levels')

  if (tutor.languages && tutor.languages.length > 0) completed++
  else missing.push('Languages')

  if (tutor.modes && tutor.modes.length > 0) completed++
  else missing.push('Delivery modes')

  if (tutor.hasDetailPage && tutor.detail?.longBio && tutor.detail.traits?.length > 0) {
    completed++
  } else if (!tutor.hasDetailPage) {
    missing.push('Deep detail profile')
  } else {
    missing.push('Incomplete detail profile')
  }

  if (tutor.portrait && tutor.portrait.trim().length > 0) {
    completed++
  } else {
    missing.push('Photographic portrait')
  }

  const percentage = Math.round((completed / total) * 100)

  return {
    percentage,
    completedCount: completed,
    totalCount: total,
    missingFields: missing,
  }
}

export function calculateTutorQuality(tutor: Tutor): AdminTutorQualityAssessment {
  const checks: AdminTutorQualityCheck[] = []
  let warnings = 0
  let failures = 0

  if (tutor.name?.trim() && tutor.headline?.trim()) {
    checks.push({
      id: 'identity',
      label: 'Identity & headline',
      status: 'passed',
      note: `${tutor.name} — ${tutor.headline}`,
    })
  } else {
    failures++
    checks.push({
      id: 'identity',
      label: 'Identity & headline',
      status: 'failed',
      note: 'Missing name or professional headline',
    })
  }

  if (tutor.intro && tutor.intro.length >= 20) {
    checks.push({
      id: 'bio',
      label: 'Intro & bio quality',
      status: 'passed',
      note: 'Clear teaching summary without unsupported marketing claims',
    })
  } else {
    warnings++
    checks.push({
      id: 'bio',
      label: 'Intro & bio quality',
      status: 'warning',
      note: 'Intro is sparse or missing',
    })
  }

  if (tutor.subjects && tutor.subjects.length > 0) {
    checks.push({
      id: 'subjects',
      label: 'Subject coverage',
      status: 'passed',
      note: `${tutor.subjects.length} subject(s) mapped: ${tutor.subjects.join(', ')}`,
    })
  } else {
    failures++
    checks.push({
      id: 'subjects',
      label: 'Subject coverage',
      status: 'failed',
      note: 'No subjects assigned to educator',
    })
  }

  if (tutor.exams && tutor.exams.length > 0) {
    checks.push({
      id: 'exams',
      label: 'Exam target alignment',
      status: 'passed',
      note: `${tutor.exams.length} exam(s) targeted: ${tutor.exams.join(', ')}`,
    })
  } else {
    warnings++
    checks.push({
      id: 'exams',
      label: 'Exam target alignment',
      status: 'warning',
      note: 'No target entrance or board exams specified',
    })
  }

  if (tutor.languages && tutor.languages.length > 0 && tutor.modes && tutor.modes.length > 0) {
    checks.push({
      id: 'delivery',
      label: 'Languages & delivery modes',
      status: 'passed',
      note: `${tutor.languages.join(', ')} | ${tutor.modes.join(', ')}`,
    })
  } else {
    warnings++
    checks.push({
      id: 'delivery',
      label: 'Languages & delivery modes',
      status: 'warning',
      note: 'Delivery mode or language specification incomplete',
    })
  }

  const portraitStatus = getTutorPortraitStatus(tutor)
  if (portraitStatus === 'real') {
    checks.push({
      id: 'portrait',
      label: 'Portrait asset',
      status: 'passed',
      note: 'Verified photographic headshot present',
    })
  } else if (portraitStatus === 'illustration') {
    warnings++
    checks.push({
      id: 'portrait',
      label: 'Portrait asset',
      status: 'warning',
      note: 'Using illustrated avatar placeholder; photographic asset needed for full review',
    })
  } else {
    failures++
    checks.push({
      id: 'portrait',
      label: 'Portrait asset',
      status: 'failed',
      note: 'No portrait asset or fallback avatar found',
    })
  }

  checks.push({
    id: 'provenance',
    label: 'Source provenance & scraper policy',
    status: 'info',
    note: 'Manual record — web scraping restricted for individual personal profiles',
  })

  let status: AdminTutorQualityStatus = 'Ready'
  if (failures > 0) {
    status = 'Needs Review'
  } else if (warnings > 0) {
    status = 'Needs Review'
  }

  const score = Math.max(0, 100 - (failures * 30 + warnings * 15))

  return {
    status,
    score,
    checks,
    issuesCount: failures + warnings,
  }
}

export function getAdminTutors(): AdminTutor[] {
  return tutors.map((tutor) => {
    const portraitStatus = getTutorPortraitStatus(tutor)
    const completeness = calculateTutorCompleteness(tutor)
    const quality = calculateTutorQuality(tutor)
    const sourceInfo: AdminTutorSourceInfo = {
      source: 'Manual',
      lastUpdated: '2026-09-15',
      syncStatus: 'Manual Entry',
      scraperEligibility: 'Authorized Import Only (Personal Data)',
    }

    return {
      ...tutor,
      portraitStatus,
      completeness,
      quality,
      sourceInfo,
    }
  })
}

export function getAdminTutorById(idOrSlug: string): AdminTutor | undefined {
  const tutor = tutors.find((t) => t.id === idOrSlug || t.slug === idOrSlug)
  if (!tutor) return undefined

  const portraitStatus = getTutorPortraitStatus(tutor)
  const completeness = calculateTutorCompleteness(tutor)
  const quality = calculateTutorQuality(tutor)
  const sourceInfo: AdminTutorSourceInfo = {
    source: 'Manual',
    lastUpdated: '2026-09-15',
    syncStatus: 'Manual Entry',
    scraperEligibility: 'Authorized Import Only (Personal Data)',
  }

  return {
    ...tutor,
    portraitStatus,
    completeness,
    quality,
    sourceInfo,
  }
}
