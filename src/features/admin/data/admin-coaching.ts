import {
  coachingProviders,
  type CoachingProvider,
  type CoachingProviderType,
  type LearningMode,
  type CoachingProgram,
  type CoachingFacultyNote,
  type CoachingFaq,
} from '@/features/coaching/data/coaching'

export type AdminCoachingQualityStatus = 'Ready' | 'Needs Review' | 'Conflict' | 'Missing'

export type AdminCoachingQualityCheck = {
  id: string
  label: string
  status: 'passed' | 'warning' | 'failed' | 'info'
  note: string
}

export type AdminCoachingQualityAssessment = {
  status: AdminCoachingQualityStatus
  score: number
  checks: AdminCoachingQualityCheck[]
  issuesCount: number
}

export type AdminCoachingCompletenessAssessment = {
  percentage: number
  completedCount: number
  totalCount: number
  missingFields: string[]
}

export type AdminCoachingSourceInfo = {
  source: 'Manual' | 'Imported Provider Directory' | 'Pipeline Staged'
  lastUpdated: string
  syncStatus: 'Manual Entry' | 'Synced' | 'Unsynced'
  scraperEligibility: 'Official Portal Staging / Diff Pipeline'
}

export type AdminCoachingProvider = CoachingProvider & {
  completeness: AdminCoachingCompletenessAssessment
  quality: AdminCoachingQualityAssessment
  sourceInfo: AdminCoachingSourceInfo
}

export function calculateCoachingCompleteness(provider: CoachingProvider): AdminCoachingCompletenessAssessment {
  const missing: string[] = []
  let completed = 0
  const total = 10

  if (provider.name?.trim()) completed++
  else missing.push('Provider name')

  if (provider.providerType?.trim()) completed++
  else missing.push('Provider type')

  if (provider.location?.trim()) completed++
  else missing.push('Location')

  if (provider.exams && provider.exams.length > 0) completed++
  else missing.push('Target exams')

  if (provider.subjects && provider.subjects.length > 0) completed++
  else missing.push('Subjects')

  if (provider.modes && provider.modes.length > 0) completed++
  else missing.push('Delivery modes')

  if (provider.courseTypes && provider.courseTypes.length > 0) completed++
  else missing.push('Course types')

  if (provider.programLabel?.trim() && provider.highlights?.length > 0) completed++
  else missing.push('Highlights / tagline')

  if (provider.hasDetailPage && provider.aboutCopy) {
    completed++
  } else if (!provider.hasDetailPage) {
    missing.push('Deep profile content')
  } else {
    missing.push('Incomplete overview content')
  }

  if (provider.programs && provider.programs.length > 0) {
    completed++
  } else {
    missing.push('Structured course programs')
  }

  const percentage = Math.round((completed / total) * 100)

  return {
    percentage,
    completedCount: completed,
    totalCount: total,
    missingFields: missing,
  }
}

export function calculateCoachingQuality(provider: CoachingProvider): AdminCoachingQualityAssessment {
  const checks: AdminCoachingQualityCheck[] = []
  let warnings = 0
  let failures = 0

  if (provider.name?.trim() && provider.providerType) {
    checks.push({
      id: 'identity',
      label: 'Identity & provider type',
      status: 'passed',
      note: `${provider.name} (${provider.providerType})`,
    })
  } else {
    failures++
    checks.push({
      id: 'identity',
      label: 'Identity & provider type',
      status: 'failed',
      note: 'Provider name or type missing',
    })
  }

  if (provider.location?.trim()) {
    checks.push({
      id: 'location',
      label: 'Location & footprint',
      status: 'passed',
      note: provider.state ? `${provider.location}, ${provider.state}` : provider.location,
    })
  } else {
    failures++
    checks.push({
      id: 'location',
      label: 'Location & footprint',
      status: 'failed',
      note: 'Location is not specified',
    })
  }

  if (provider.exams && provider.exams.length > 0 && provider.subjects && provider.subjects.length > 0) {
    checks.push({
      id: 'curriculum',
      label: 'Exam & subject mapping',
      status: 'passed',
      note: `${provider.exams.join(', ')} — ${provider.subjects.join(', ')}`,
    })
  } else {
    warnings++
    checks.push({
      id: 'curriculum',
      label: 'Exam & subject mapping',
      status: 'warning',
      note: 'Exam coverage or subject mapping incomplete',
    })
  }

  if (provider.programs && provider.programs.length > 0) {
    checks.push({
      id: 'programs',
      label: 'Program catalog',
      status: 'passed',
      note: `${provider.programs.length} structured program track(s) configured`,
    })
  } else {
    warnings++
    checks.push({
      id: 'programs',
      label: 'Program catalog',
      status: 'warning',
      note: 'No structured batch or course records linked',
    })
  }

  if (provider.facultyNotes && provider.facultyNotes.length > 0) {
    checks.push({
      id: 'faculty',
      label: 'Teaching approach & faculty policy',
      status: 'passed',
      note: `${provider.facultyNotes.length} approach note(s) documented without unverified rank claims`,
    })
  } else {
    checks.push({
      id: 'faculty',
      label: 'Teaching approach & faculty policy',
      status: 'info',
      note: 'Faculty notes pending configuration',
    })
  }

  if (provider.gallery && provider.gallery.length > 0) {
    checks.push({
      id: 'media',
      label: 'Media assets & gallery',
      status: 'passed',
      note: `${provider.gallery.length} visual asset(s) linked`,
    })
  } else {
    warnings++
    checks.push({
      id: 'media',
      label: 'Media assets & gallery',
      status: 'warning',
      note: 'Gallery imagery missing',
    })
  }

  checks.push({
    id: 'pipeline',
    label: 'Pipeline scraper policy',
    status: 'info',
    note: 'Staging -> Diff -> Approval pipeline eligible for official institutional portals',
  })

  let status: AdminCoachingQualityStatus = 'Ready'
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

export function getAdminCoachingProviders(): AdminCoachingProvider[] {
  return coachingProviders.map((provider) => {
    const completeness = calculateCoachingCompleteness(provider)
    const quality = calculateCoachingQuality(provider)
    const sourceInfo: AdminCoachingSourceInfo = {
      source: 'Manual',
      lastUpdated: '2026-09-15',
      syncStatus: 'Manual Entry',
      scraperEligibility: 'Official Portal Staging / Diff Pipeline',
    }

    return {
      ...provider,
      completeness,
      quality,
      sourceInfo,
    }
  })
}

export function getAdminCoachingProviderById(idOrSlug: string): AdminCoachingProvider | undefined {
  const provider = coachingProviders.find((p) => p.id === idOrSlug || p.slug === idOrSlug)
  if (!provider) return undefined

  const completeness = calculateCoachingCompleteness(provider)
  const quality = calculateCoachingQuality(provider)
  const sourceInfo: AdminCoachingSourceInfo = {
    source: 'Manual',
    lastUpdated: '2026-09-15',
    syncStatus: 'Manual Entry',
    scraperEligibility: 'Official Portal Staging / Diff Pipeline',
  }

  return {
    ...provider,
    completeness,
    quality,
    sourceInfo,
  }
}
