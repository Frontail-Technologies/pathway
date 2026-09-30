import { getAdminInstitutions } from './admin-institutions'
import { getAdminPrograms } from './admin-programs'
import { getAdminOfferings, type AdminProgramOffering } from './admin-admissions-fees'
import { getAdminScholarships } from './admin-scholarships'
import { getAdminTutors } from './admin-tutors'
import { getAdminCoachingProviders } from './admin-coaching'
import { getAdminStudents } from './admin-students'
import { getAdminNotes } from './admin-notes'
import { getAdminReviews } from './admin-reviews'
import { getAdminPromotions } from './admin-promotions'
import { getAdminContent } from './admin-content'
import { getAdminBanners } from './admin-banners'
import { getAdminSeoRecords } from './admin-seo'
import { exams } from '@/features/exams/data/exams'
import { seoTargetTypeMap } from '@/features/seo/types/seo-metadata'
import { canonicalPurchases, canonicalEntitlements } from '@/features/notes/data/note-access'

export interface CatalogDistributionItem {
  name: string
  count: number
  percentage: number
}

export interface DataQualityDistribution {
  ready: number
  needsReview: number
  conflict: number
  notAssessed: number
  assessableTotal: number
  catalogTotal: number
}

export interface DomainAvailabilityItem {
  id: string
  domain: string
  category: 'Catalog' | 'Content' | 'Users & Commerce' | 'Telemetry & Integrations'
  dataSource: string
  recordCount: string
  status: 'available' | 'empty' | 'not_connected'
  statusLabel: string
  operationalNote: string
}

export interface PlatformReportsData {
  catalog: {
    totalInstitutions: number
    totalPrograms: number
    totalOfferings: number
    totalScholarships: number
    totalTutors: number
    totalCoaching: number
    totalExams: number
    totalCatalogRecords: number
    institutionsByType: CatalogDistributionItem[]
    programsByLevel: CatalogDistributionItem[]
    programsByStream: CatalogDistributionItem[]
    scholarshipsByProvider: CatalogDistributionItem[]
    scholarshipsByStatus: CatalogDistributionItem[]
    tutorsByMode: CatalogDistributionItem[]
    coachingByMode: CatalogDistributionItem[]
  }
  quality: {
    overallDistribution: DataQualityDistribution
    institutionsCompleteness: {
      total: number
      liveDetailPage: number
      basicListing: number
    }
    programsCompleteness: {
      total: number
      liveDetailPage: number
      basicListing: number
    }
    scholarshipsCompleteness: {
      total: number
      withEligibility: number
      withDeadlines: number
    }
  }
  content: {
    articlesCount: number
    bannersCount: number
    promotionsCount: number
    seoOverridesCount: number
    supportedSeoTargetTypesCount: number
  }
  peopleAndCommerce: {
    studentsCount: number
    studentsAverageCompletion: number
    notesCount: number
    purchasesCount: number
    entitlementsCount: number
    paymentGatewayStatus: 'not_connected'
    downloadTelemetryStatus: 'not_connected'
  }
  availability: {
    items: DomainAvailabilityItem[]
    availableCount: number
    notConnectedCount: number
    totalCount: number
  }
}

export function getPlatformReports(): PlatformReportsData {
  const institutions = getAdminInstitutions()
  const programs = getAdminPrograms()
  const offerings = getAdminOfferings()
  const scholarships = getAdminScholarships()
  const tutors = getAdminTutors()
  const coaching = getAdminCoachingProviders()
  const students = getAdminStudents()
  const notes = getAdminNotes()
  const reviews = getAdminReviews()
  const promotions = getAdminPromotions()
  const content = getAdminContent()
  const banners = getAdminBanners()
  const seo = getAdminSeoRecords()

  
  const instTypeCounts: Record<string, number> = {}
  let instLiveDetails = 0

  for (const inst of institutions) {
    instTypeCounts[inst.type] = (instTypeCounts[inst.type] || 0) + 1
    if (inst.hasDetailPage) instLiveDetails++
  }

  const institutionsByType: CatalogDistributionItem[] = Object.entries(instTypeCounts).map(
    ([name, count]) => ({
      name,
      count,
      percentage: institutions.length > 0 ? Math.round((count / institutions.length) * 100) : 0,
    })
  )

  
  const progLevelCounts: Record<string, number> = {}
  const progStreamCounts: Record<string, number> = {}
  let progLiveDetails = 0

  for (const prog of programs) {
    const levelKey = prog.level || 'Unspecified'
    progLevelCounts[levelKey] = (progLevelCounts[levelKey] || 0) + 1

    const streamKey = prog.stream || 'Unspecified'
    progStreamCounts[streamKey] = (progStreamCounts[streamKey] || 0) + 1

    if (prog.hasDetailPage) progLiveDetails++
  }

  const programsByLevel: CatalogDistributionItem[] = Object.entries(progLevelCounts).map(
    ([name, count]) => ({
      name,
      count,
      percentage: programs.length > 0 ? Math.round((count / programs.length) * 100) : 0,
    })
  )

  const programsByStream: CatalogDistributionItem[] = Object.entries(progStreamCounts).map(
    ([name, count]) => ({
      name,
      count,
      percentage: programs.length > 0 ? Math.round((count / programs.length) * 100) : 0,
    })
  )

  
  const schProviderCounts: Record<string, number> = {}
  const schStatusCounts: Record<string, number> = {}
  let schWithEligibility = 0
  let schWithDeadlines = 0

  for (const sch of scholarships) {
    schProviderCounts[sch.providerType] = (schProviderCounts[sch.providerType] || 0) + 1
    schStatusCounts[sch.applicationStatus] = (schStatusCounts[sch.applicationStatus] || 0) + 1
    if (sch.eligibilityRows && sch.eligibilityRows.length > 0) schWithEligibility++
    if (sch.deadline) schWithDeadlines++
  }

  const scholarshipsByProvider: CatalogDistributionItem[] = Object.entries(schProviderCounts).map(
    ([name, count]) => ({
      name,
      count,
      percentage: scholarships.length > 0 ? Math.round((count / scholarships.length) * 100) : 0,
    })
  )

  const scholarshipsByStatus: CatalogDistributionItem[] = Object.entries(schStatusCounts).map(
    ([name, count]) => ({
      name:
        name === 'open'
          ? 'Open'
          : name === 'closing-soon'
          ? 'Closing Soon'
          : name === 'upcoming'
          ? 'Upcoming'
          : name === 'closed'
          ? 'Closed'
          : 'Not Recorded',
      count,
      percentage: scholarships.length > 0 ? Math.round((count / scholarships.length) * 100) : 0,
    })
  )

  
  const tutorModeCounts: Record<string, number> = {}
  for (const tutor of tutors) {
    for (const m of tutor.modes || ['Online']) {
      tutorModeCounts[m] = (tutorModeCounts[m] || 0) + 1
    }
  }
  const tutorsTotal = tutors.length || 1
  const tutorsByMode: CatalogDistributionItem[] = Object.entries(tutorModeCounts).map(
    ([name, count]) => ({
      name: name === 'Offline' ? 'In-Person' : name,
      count,
      percentage: Math.round((count / tutorsTotal) * 100),
    })
  )

  const coachingModeCounts: Record<string, number> = {}
  for (const c of coaching) {
    for (const m of c.modes || ['Classroom']) {
      coachingModeCounts[m] = (coachingModeCounts[m] || 0) + 1
    }
  }
  const coachingTotal = coaching.length || 1
  const coachingByMode: CatalogDistributionItem[] = Object.entries(coachingModeCounts).map(
    ([name, count]) => ({
      name: name === 'Classroom' ? 'Classroom (Offline)' : name,
      count,
      percentage: Math.round((count / coachingTotal) * 100),
    })
  )

  
  const qualityTotal = {
    ready: 0,
    needsReview: 0,
    conflict: 0,
    notAssessed: 0,
    assessableTotal: 0,
    catalogTotal: 0,
  }

  function normalizeQuality(status?: string): 'ready' | 'needs_review' | 'conflict' | 'not_assessed' {
    if (!status) return 'not_assessed'
    const s = status.toLowerCase()
    if (s === 'ready') return 'ready'
    if (s === 'needs review' || s === 'needs_review') return 'needs_review'
    if (s === 'conflict') return 'conflict'
    return 'not_assessed'
  }

  const allQualityRecords: ('ready' | 'needs_review' | 'conflict' | 'not_assessed')[] = [
    ...institutions.map((i) => normalizeQuality(i.qualityStatus)),
    ...programs.map((p) => normalizeQuality(p.qualityStatus)),
    ...offerings.map((o: AdminProgramOffering) => normalizeQuality(o.qualityStatus)),
    ...scholarships.map((s) => normalizeQuality(s.qualityStatus)),
    ...tutors.map((t) => normalizeQuality(t.quality?.status)),
    ...coaching.map((c) => normalizeQuality(c.quality?.status)),
  ]

  const totalCatalogRecords =
    institutions.length +
    programs.length +
    offerings.length +
    scholarships.length +
    tutors.length +
    coaching.length +
    exams.length

  qualityTotal.assessableTotal = allQualityRecords.length
  qualityTotal.catalogTotal = totalCatalogRecords

  for (const q of allQualityRecords) {
    if (q === 'ready') qualityTotal.ready++
    else if (q === 'needs_review') qualityTotal.needsReview++
    else if (q === 'conflict') qualityTotal.conflict++
    else if (q === 'not_assessed') qualityTotal.notAssessed++
  }

  
  const studentsAvgCompletion =
    students.length > 0
      ? Math.round(
          students.reduce((acc, s) => acc + s.profileCompletion.percent, 0) / students.length
        )
      : 0

  
  const availabilityItems: DomainAvailabilityItem[] = [
    {
      id: 'catalog-institutions',
      domain: 'Institutions',
      category: 'Catalog',
      dataSource: 'Pathway Catalog',
      recordCount: `${institutions.length} records`,
      status: 'available',
      statusLabel: 'Available',
      operationalNote: 'Institution records available.',
    },
    {
      id: 'catalog-programs',
      domain: 'Programs & Courses',
      category: 'Catalog',
      dataSource: 'Pathway Catalog',
      recordCount: `${programs.length} records`,
      status: 'available',
      statusLabel: 'Available',
      operationalNote: 'Program catalog available.',
    },
    {
      id: 'catalog-offerings',
      domain: 'Admissions & Offerings',
      category: 'Catalog',
      dataSource: 'Pathway Catalog',
      recordCount: `${offerings.length} records`,
      status: 'available',
      statusLabel: 'Available',
      operationalNote: 'Program offerings and fee data available.',
    },
    {
      id: 'catalog-scholarships',
      domain: 'Scholarships',
      category: 'Catalog',
      dataSource: 'Pathway Catalog',
      recordCount: `${scholarships.length} records`,
      status: 'available',
      statusLabel: 'Available',
      operationalNote: 'Scholarship schemes available.',
    },
    {
      id: 'catalog-tutors',
      domain: 'Tutors Directory',
      category: 'Catalog',
      dataSource: 'Pathway Catalog',
      recordCount: `${tutors.length} records`,
      status: 'available',
      statusLabel: 'Available',
      operationalNote: 'Educator profiles available.',
    },
    {
      id: 'catalog-coaching',
      domain: 'Coaching Centers',
      category: 'Catalog',
      dataSource: 'Pathway Catalog',
      recordCount: `${coaching.length} records`,
      status: 'available',
      statusLabel: 'Available',
      operationalNote: 'Coaching provider directory available.',
    },
    {
      id: 'catalog-exams',
      domain: 'Entrance Exams',
      category: 'Catalog',
      dataSource: 'Pathway Catalog',
      recordCount: `${exams.length} records`,
      status: 'available',
      statusLabel: 'Available',
      operationalNote: 'Entrance exam guides available.',
    },
    {
      id: 'content-articles',
      domain: 'Articles & Guides',
      category: 'Content',
      dataSource: 'Pathway Content',
      recordCount: `${content.length} records`,
      status: content.length > 0 ? 'available' : 'empty',
      statusLabel: content.length > 0 ? 'Available' : 'Empty (0 records)',
      operationalNote: 'No editorial content configured.',
    },
    {
      id: 'content-banners',
      domain: 'Promotional Banners',
      category: 'Content',
      dataSource: 'Pathway Content',
      recordCount: `${banners.length} records`,
      status: banners.length > 0 ? 'available' : 'empty',
      statusLabel: banners.length > 0 ? 'Available' : 'Empty (0 records)',
      operationalNote: 'No banners configured.',
    },
    {
      id: 'content-promotions',
      domain: 'Featured / Sponsored',
      category: 'Content',
      dataSource: 'Pathway Content',
      recordCount: `${promotions.length} records`,
      status: promotions.length > 0 ? 'available' : 'empty',
      statusLabel: promotions.length > 0 ? 'Available' : 'Empty (0 records)',
      operationalNote: 'No placements configured.',
    },
    {
      id: 'content-seo',
      domain: 'SEO Metadata Overrides',
      category: 'Content',
      dataSource: 'Pathway Content',
      recordCount: `${seo.length} records`,
      status: seo.length > 0 ? 'available' : 'empty',
      statusLabel: seo.length > 0 ? 'Available' : 'Empty (0 records)',
      operationalNote: 'No SEO overrides configured.',
    },
    {
      id: 'users-students',
      domain: 'Student Accounts',
      category: 'Users & Commerce',
      dataSource: 'Student Account Data',
      recordCount: `${students.length} account`,
      status: 'available',
      statusLabel: 'Available',
      operationalNote: 'Demo student profile active.',
    },
    {
      id: 'users-notes',
      domain: 'Study Material (Notes)',
      category: 'Users & Commerce',
      dataSource: 'Pathway Notes Store',
      recordCount: `${notes.length} notes`,
      status: notes.length > 0 ? 'available' : 'empty',
      statusLabel: notes.length > 0 ? 'Available' : 'Empty (0 records)',
      operationalNote: 'No study notes configured.',
    },
    {
      id: 'users-reviews',
      domain: 'Pathway Reviews Store',
      category: 'Users & Commerce',
      dataSource: 'Pathway Reviews',
      recordCount: `${reviews.length} records`,
      status: reviews.length > 0 ? 'available' : 'empty',
      statusLabel: reviews.length > 0 ? 'Available' : 'Empty (0 records)',
      operationalNote: 'No review records configured.',
    },
    {
      id: 'telemetry-enquiries',
      domain: 'Enquiry & Lead Capture',
      category: 'Telemetry & Integrations',
      dataSource: 'CRM / Lead Capture',
      recordCount: '—',
      status: 'not_connected',
      statusLabel: 'Not Connected',
      operationalNote: 'Lead capture and CRM persistence not connected.',
    },
    {
      id: 'telemetry-google-reviews',
      domain: 'External Google Reviews Sync',
      category: 'Telemetry & Integrations',
      dataSource: 'Google Places / Reviews',
      recordCount: '—',
      status: 'not_connected',
      statusLabel: 'Not Connected',
      operationalNote: 'External Google reviews sync not connected.',
    },
    {
      id: 'telemetry-web-analytics',
      domain: 'Web Analytics (Traffic / CTR)',
      category: 'Telemetry & Integrations',
      dataSource: 'Web Analytics',
      recordCount: '—',
      status: 'not_connected',
      statusLabel: 'Not Connected',
      operationalNote: 'Traffic and analytics telemetry not connected.',
    },
    {
      id: 'telemetry-payment-gateways',
      domain: 'Payment Processing',
      category: 'Telemetry & Integrations',
      dataSource: 'Payment Provider',
      recordCount: '—',
      status: 'not_connected',
      statusLabel: 'Not Connected',
      operationalNote: 'Payment gateway integration not connected.',
    },
    {
      id: 'telemetry-search-console',
      domain: 'Google Search Console',
      category: 'Telemetry & Integrations',
      dataSource: 'Google Search Console',
      recordCount: '—',
      status: 'not_connected',
      statusLabel: 'Not Connected',
      operationalNote: 'Search Console integration not connected.',
    },
  ]

  const availableCount = availabilityItems.filter((item) => item.status !== 'not_connected').length
  const notConnectedCount = availabilityItems.filter((item) => item.status === 'not_connected').length

  return {
    catalog: {
      totalInstitutions: institutions.length,
      totalPrograms: programs.length,
      totalOfferings: offerings.length,
      totalScholarships: scholarships.length,
      totalTutors: tutors.length,
      totalCoaching: coaching.length,
      totalExams: exams.length,
      totalCatalogRecords,
      institutionsByType,
      programsByLevel,
      programsByStream,
      scholarshipsByProvider,
      scholarshipsByStatus,
      tutorsByMode,
      coachingByMode,
    },
    quality: {
      overallDistribution: qualityTotal,
      institutionsCompleteness: {
        total: institutions.length,
        liveDetailPage: instLiveDetails,
        basicListing: institutions.length - instLiveDetails,
      },
      programsCompleteness: {
        total: programs.length,
        liveDetailPage: progLiveDetails,
        basicListing: programs.length - progLiveDetails,
      },
      scholarshipsCompleteness: {
        total: scholarships.length,
        withEligibility: schWithEligibility,
        withDeadlines: schWithDeadlines,
      },
    },
    content: {
      articlesCount: content.length,
      bannersCount: banners.length,
      promotionsCount: promotions.length,
      seoOverridesCount: seo.length,
      supportedSeoTargetTypesCount: Object.keys(seoTargetTypeMap).length,
    },
    peopleAndCommerce: {
      studentsCount: students.length,
      studentsAverageCompletion: studentsAvgCompletion,
      notesCount: notes.length,
      purchasesCount: canonicalPurchases.length,
      entitlementsCount: canonicalEntitlements.length,
      paymentGatewayStatus: 'not_connected',
      downloadTelemetryStatus: 'not_connected',
    },
    availability: {
      items: availabilityItems,
      availableCount,
      notConnectedCount,
      totalCount: availabilityItems.length,
    },
  }
}
