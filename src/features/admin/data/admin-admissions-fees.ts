import { colleges, type CollegeListItem } from '@/features/colleges/data/colleges'
import { getCollegeDetail, type CollegeDetailData } from '@/features/colleges/data/college-detail'
import { courses, type CourseListItem } from '@/features/courses/data/courses'
import { getCourseDetail, type CourseDetailData } from '@/features/courses/data/course-detail'

export type AdminContentStatus = 'complete' | 'partial' | 'basic'
export type AdminDataQualityStatus = 'ready' | 'needs_review' | 'conflict' | 'incomplete'
export type AdminSourceType = 'manual' | 'scraped' | 'imported'
export type AdminSyncStatus = 'manual' | 'imported' | 'needs_review' | 'conflict'

export type SectionCompletenessState = 'complete' | 'missing' | 'partial'
export type SectionQualityState = 'ready' | 'needs_review' | 'missing'

export type OfferingCompletenessBreakdown = {
  identity: SectionCompletenessState
  fees: SectionCompletenessState
  eligibility: SectionCompletenessState
  exams: SectionCompletenessState
  process: SectionCompletenessState
  documents: SectionCompletenessState
}

export type OfferingQualityBreakdown = {
  identity: SectionQualityState
  fees: SectionQualityState
  eligibility: SectionQualityState
  exams: SectionQualityState
  process: SectionQualityState
  source: SectionQualityState
}

export type ProvenanceMetadata = {
  sourceType: AdminSourceType
  sourceName?: string
  sourceUrl?: string
  externalSourceId?: string
  lastImportedAt?: string
  lastReviewedAt?: string
  syncStatus: AdminSyncStatus
  hasManualOverride?: boolean
}

export type ContentIssue = {
  id: string
  label: string
  severity: 'warning' | 'info'
}

export type FeeComponent = {
  id: string
  label: string
  amount: string
  period: string
  type: 'tuition' | 'hostel' | 'examination' | 'admission' | 'other'
}

export type ApplicationStep = {
  id: string
  stepNumber: number
  title: string
  description: string
}

export type OfferingDocumentType =
  | 'brochure'
  | 'fee_structure'
  | 'admission_notice'
  | 'guidelines'
  | 'other'

export type OfferingDocument = {
  id: string
  title: string
  type: OfferingDocumentType
  fileFormat?: string
  fileSize?: string
  url?: string
  provenance: ProvenanceMetadata
}

export type AdminProgramOffering = {
  id: string
  slug: string
  institutionId: string
  institutionSlug: string
  institutionName: string
  institutionCity: string
  institutionState: string
  institutionType: 'Government' | 'Private' | 'Deemed'
  programId: string
  programSlug: string
  programName: string
  degree: string
  level: 'Undergraduate' | 'Postgraduate' | 'Diploma' | 'Certificate'
  stream: string
  duration: string
  studyMode: 'Full-time' | 'Part-time' | 'Online' | 'Distance'
  admissionMode: 'Entrance Exam' | 'Merit Based' | 'Direct / Management'
  annualFee: string
  annualFeeValue: number
  totalProgrammeFee: string
  feePeriod: 'Per Annum' | 'Per Semester' | 'Total Programme'
  currency: string
  academicSession: string
  feeComponents: FeeComponent[]
  entranceExams: string[]
  counsellingBody: string
  eligibilitySummary: string
  academicQualification: string
  mandatorySubjects: string
  minimumMarks: string
  selectionProcess: string
  applicationSteps: ApplicationStep[]
  importantRequirements: string[]
  documents: OfferingDocument[]
  provenance: ProvenanceMetadata
  fieldProvenance?: Record<string, { sourceName: string; verified: boolean; lastReviewedAt?: string }>
  completeness: number
  contentStatus: AdminContentStatus
  qualityStatus: AdminDataQualityStatus
  breakdown: OfferingCompletenessBreakdown
  qualityBreakdown: OfferingQualityBreakdown
  topIssues: ContentIssue[]
}

export type AdminProgramOfferingDetail = {
  offering: AdminProgramOffering
  college?: CollegeListItem
  collegeDetail?: CollegeDetailData
  course?: CourseListItem
  courseDetail?: CourseDetailData
}

export function calculateOfferingCompleteness(
  offering: Omit<AdminProgramOffering, 'completeness' | 'contentStatus' | 'qualityStatus' | 'breakdown' | 'qualityBreakdown' | 'topIssues'>
): {
  percentage: number
  status: AdminContentStatus
  breakdown: OfferingCompletenessBreakdown
} {
  const breakdown: OfferingCompletenessBreakdown = {
    identity: offering.institutionId && offering.programId && offering.degree ? 'complete' : 'partial',
    fees: offering.annualFee ? (offering.feeComponents.length > 0 ? 'complete' : 'partial') : 'missing',
    eligibility: offering.academicQualification && offering.mandatorySubjects ? 'complete' : offering.eligibilitySummary ? 'partial' : 'missing',
    exams: offering.entranceExams.length > 0 || offering.admissionMode === 'Merit Based' ? 'complete' : 'missing',
    process: offering.applicationSteps.length > 0 ? 'complete' : offering.selectionProcess ? 'partial' : 'missing',
    documents: offering.documents.length > 0 ? 'complete' : 'missing',
  }

  const weights: Record<keyof OfferingCompletenessBreakdown, number> = {
    identity: 20,
    fees: 25,
    eligibility: 20,
    exams: 15,
    process: 15,
    documents: 5,
  }

  let earned = 0
  let totalWeight = 0

  for (const [k, state] of Object.entries(breakdown) as [keyof OfferingCompletenessBreakdown, SectionCompletenessState][]) {
    const w = weights[k] || 10
    totalWeight += w
    if (state === 'complete') earned += w
    if (state === 'partial') earned += w * 0.5
  }

  const percentage = Math.round((earned / totalWeight) * 100)
  const status: AdminContentStatus = percentage >= 80 ? 'complete' : percentage >= 45 ? 'partial' : 'basic'

  return { percentage, status, breakdown }
}

export function calculateOfferingQuality(
  offering: Omit<AdminProgramOffering, 'completeness' | 'contentStatus' | 'qualityStatus' | 'breakdown' | 'qualityBreakdown' | 'topIssues'>,
  completenessState: { percentage: number; breakdown: OfferingCompletenessBreakdown }
): {
  status: AdminDataQualityStatus
  qualityBreakdown: OfferingQualityBreakdown
  topIssues: ContentIssue[]
} {
  const issues: ContentIssue[] = []
  const hasSource = Boolean(offering.provenance?.sourceName)

  const qualityBreakdown: OfferingQualityBreakdown = {
    identity: offering.institutionId && offering.programId ? 'ready' : 'needs_review',
    fees: offering.annualFee ? (hasSource ? 'ready' : 'needs_review') : 'missing',
    eligibility: offering.academicQualification ? 'ready' : 'needs_review',
    exams: offering.entranceExams.length > 0 || offering.admissionMode === 'Merit Based' ? 'ready' : 'needs_review',
    process: offering.applicationSteps.length > 0 || offering.selectionProcess ? 'ready' : 'needs_review',
    source: hasSource ? 'ready' : 'needs_review',
  }

  if (!offering.annualFee) {
    issues.push({ id: 'fee-missing', label: 'Annual tuition fee schedule is not configured', severity: 'warning' })
  } else if (!hasSource) {
    issues.push({ id: 'fee-unverified', label: 'Fee schedule has no recorded institutional source document', severity: 'warning' })
  }

  if (offering.entranceExams.length === 0 && offering.admissionMode === 'Entrance Exam') {
    issues.push({ id: 'exam-missing', label: 'Admission mode requires entrance exams but none are specified', severity: 'warning' })
  }

  if (offering.applicationSteps.length === 0 && !offering.selectionProcess) {
    issues.push({ id: 'process-missing', label: 'Step-by-step admission workflow is not outlined', severity: 'info' })
  }

  if (offering.documents.length === 0) {
    issues.push({ id: 'doc-pending', label: 'No official admission or fee notification document attached', severity: 'info' })
  }

  let status: AdminDataQualityStatus = 'ready'
  if (completenessState.percentage < 40) {
    status = 'incomplete'
  } else if (issues.some((i) => i.severity === 'warning')) {
    status = 'needs_review'
  }

  return { status, qualityBreakdown, topIssues: issues }
}

const rawOfferingsData = [
  {
    id: 'off-iit-delhi-btech-cse',
    slug: 'iit-delhi-btech-computer-science',
    institutionId: 'c1',
    institutionSlug: 'iit-delhi',
    institutionName: 'IIT Delhi',
    institutionCity: 'New Delhi',
    institutionState: 'Delhi',
    institutionType: 'Government' as const,
    programId: 'crs1',
    programSlug: 'btech-computer-science',
    programName: 'B.Tech Computer Science',
    degree: 'B.Tech',
    level: 'Undergraduate' as const,
    stream: 'Engineering',
    duration: '4 Years',
    studyMode: 'Full-time' as const,
    admissionMode: 'Entrance Exam' as const,
    annualFee: '₹2.2 Lakh',
    annualFeeValue: 220000,
    totalProgrammeFee: '₹8.8 Lakh',
    feePeriod: 'Per Annum' as const,
    currency: 'INR',
    academicSession: '2026-27',
    feeComponents: [],
    entranceExams: ['JEE Advanced'],
    counsellingBody: 'JoSAA Counselling',
    eligibilitySummary: '10+2 with PCM',
    academicQualification: '10+2 or equivalent examination with Physics, Mathematics, and Chemistry',
    mandatorySubjects: 'Physics, Mathematics, and Chemistry (PCM)',
    minimumMarks: '50–60% aggregate, varies by institute',
    selectionProcess: 'JoSAA Counselling',
    applicationSteps: [],
    importantRequirements: [],
    documents: [],
    provenance: {
      sourceType: 'manual' as const,
      syncStatus: 'manual' as const,
      hasManualOverride: false,
    },
  },
  {
    id: 'off-iit-delhi-mtech-cse',
    slug: 'iit-delhi-mtech-computer-science',
    institutionId: 'c1',
    institutionSlug: 'iit-delhi',
    institutionName: 'IIT Delhi',
    institutionCity: 'New Delhi',
    institutionState: 'Delhi',
    institutionType: 'Government' as const,
    programId: 'crs8',
    programSlug: 'mtech-computer-science',
    programName: 'M.Tech Computer Science',
    degree: 'M.Tech',
    level: 'Postgraduate' as const,
    stream: 'Engineering',
    duration: '2 Years',
    studyMode: 'Full-time' as const,
    admissionMode: 'Entrance Exam' as const,
    annualFee: '₹1.4 Lakh',
    annualFeeValue: 140000,
    totalProgrammeFee: '₹2.8 Lakh',
    feePeriod: 'Per Annum' as const,
    currency: 'INR',
    academicSession: '2026-27',
    feeComponents: [],
    entranceExams: ['GATE'],
    counsellingBody: 'CCMT Counselling',
    eligibilitySummary: 'B.Tech/B.E. in relevant discipline',
    academicQualification: "Bachelor's degree in Engineering / Technology in relevant discipline",
    mandatorySubjects: 'Relevant engineering discipline',
    minimumMarks: 'As per CCMT norms',
    selectionProcess: 'CCMT Counselling',
    applicationSteps: [],
    importantRequirements: [],
    documents: [],
    provenance: {
      sourceType: 'manual' as const,
      syncStatus: 'manual' as const,
    },
  },
  {
    id: 'off-iit-delhi-mba',
    slug: 'iit-delhi-mba',
    institutionId: 'c1',
    institutionSlug: 'iit-delhi',
    institutionName: 'IIT Delhi',
    institutionCity: 'New Delhi',
    institutionState: 'Delhi',
    institutionType: 'Government' as const,
    programId: 'crs2',
    programSlug: 'mba',
    programName: 'MBA',
    degree: 'MBA',
    level: 'Postgraduate' as const,
    stream: 'Management',
    duration: '2 Years',
    studyMode: 'Full-time' as const,
    admissionMode: 'Entrance Exam' as const,
    annualFee: '₹10.4 Lakh',
    annualFeeValue: 1040000,
    totalProgrammeFee: '₹20.8 Lakh',
    feePeriod: 'Per Annum' as const,
    currency: 'INR',
    academicSession: '2026-27',
    feeComponents: [],
    entranceExams: ['CAT'],
    counsellingBody: 'DMS IIT Delhi Admissions',
    eligibilitySummary: "Bachelor's degree, min. 60%",
    academicQualification: "Bachelor's degree in any discipline from a recognized university",
    mandatorySubjects: 'Any discipline',
    minimumMarks: 'Min. 60%',
    selectionProcess: 'Written Test + Interview',
    applicationSteps: [],
    importantRequirements: [],
    documents: [],
    provenance: {
      sourceType: 'manual' as const,
      syncStatus: 'manual' as const,
    },
  },
  {
    id: 'off-bits-pilani-btech-cse',
    slug: 'bits-pilani-btech-computer-science',
    institutionId: 'c4',
    institutionSlug: 'bits-pilani',
    institutionName: 'BITS Pilani',
    institutionCity: 'Pilani',
    institutionState: 'Rajasthan',
    institutionType: 'Deemed' as const,
    programId: 'crs1',
    programSlug: 'btech-computer-science',
    programName: 'B.Tech Computer Science',
    degree: 'B.E. / B.Tech',
    level: 'Undergraduate' as const,
    stream: 'Engineering',
    duration: '4 Years',
    studyMode: 'Full-time' as const,
    admissionMode: 'Entrance Exam' as const,
    annualFee: '₹4.5 Lakh',
    annualFeeValue: 450000,
    totalProgrammeFee: '₹18.0 Lakh',
    feePeriod: 'Per Annum' as const,
    currency: 'INR',
    academicSession: '2026-27',
    feeComponents: [],
    entranceExams: ['BITSAT'],
    counsellingBody: 'BITS Online Counselling',
    eligibilitySummary: '10+2 with PCM',
    academicQualification: '10+2 or equivalent examination with Physics, Mathematics, and Chemistry',
    mandatorySubjects: 'Physics, Chemistry, and Mathematics (PCM)',
    minimumMarks: '75% aggregate in PCM',
    selectionProcess: 'BITSAT score based allotment',
    applicationSteps: [],
    importantRequirements: [],
    documents: [],
    provenance: {
      sourceType: 'manual' as const,
      syncStatus: 'manual' as const,
    },
  },
  {
    id: 'off-iiit-hyderabad-btech-cse',
    slug: 'iiit-hyderabad-btech-computer-science',
    institutionId: 'c6',
    institutionSlug: 'iiit-hyderabad',
    institutionName: 'IIIT Hyderabad',
    institutionCity: 'Hyderabad',
    institutionState: 'Telangana',
    institutionType: 'Private' as const,
    programId: 'crs1',
    programSlug: 'btech-computer-science',
    programName: 'B.Tech Computer Science',
    degree: 'B.Tech',
    level: 'Undergraduate' as const,
    stream: 'Engineering',
    duration: '4 Years',
    studyMode: 'Full-time' as const,
    admissionMode: 'Entrance Exam' as const,
    annualFee: '₹3.6 Lakh',
    annualFeeValue: 360000,
    totalProgrammeFee: '₹14.4 Lakh',
    feePeriod: 'Per Annum' as const,
    currency: 'INR',
    academicSession: '2026-27',
    feeComponents: [],
    entranceExams: ['JEE Main', 'UGEE'],
    counsellingBody: 'IIIT-H Admissions Portal',
    eligibilitySummary: '10+2 with PCM',
    academicQualification: '10+2 or equivalent examination with Mathematics, Physics, and Chemistry',
    mandatorySubjects: 'Physics, Chemistry, and Mathematics (PCM)',
    minimumMarks: '60% marks in Class 12',
    selectionProcess: 'JEE Main / UGEE channel',
    applicationSteps: [],
    importantRequirements: [],
    documents: [],
    provenance: {
      sourceType: 'manual' as const,
      syncStatus: 'manual' as const,
    },
  },
  {
    id: 'off-dtu-delhi-btech-cse',
    slug: 'dtu-delhi-btech-computer-science',
    institutionId: 'c8',
    institutionSlug: 'dtu-delhi',
    institutionName: 'DTU Delhi',
    institutionCity: 'New Delhi',
    institutionState: 'Delhi',
    institutionType: 'Government' as const,
    programId: 'crs1',
    programSlug: 'btech-computer-science',
    programName: 'B.Tech Computer Science',
    degree: 'B.Tech',
    level: 'Undergraduate' as const,
    stream: 'Engineering',
    duration: '4 Years',
    studyMode: 'Full-time' as const,
    admissionMode: 'Entrance Exam' as const,
    annualFee: '₹1.9 Lakh',
    annualFeeValue: 190000,
    totalProgrammeFee: '₹7.6 Lakh',
    feePeriod: 'Per Annum' as const,
    currency: 'INR',
    academicSession: '2026-27',
    feeComponents: [],
    entranceExams: ['JEE Main'],
    counsellingBody: 'JAC Delhi Counselling',
    eligibilitySummary: '10+2 with PCM',
    academicQualification: 'Senior School Certificate Examination (12th Class) with PCM and English',
    mandatorySubjects: 'Physics, Chemistry, and Mathematics (PCM)',
    minimumMarks: '60% aggregate in PCM',
    selectionProcess: 'JAC Delhi Counselling',
    applicationSteps: [],
    importantRequirements: [],
    documents: [],
    provenance: {
      sourceType: 'manual' as const,
      syncStatus: 'manual' as const,
    },
  },
  {
    id: 'off-nit-trichy-btech-cse',
    slug: 'nit-trichy-btech-computer-science',
    institutionId: 'c3',
    institutionSlug: 'nit-trichy',
    institutionName: 'NIT Trichy',
    institutionCity: 'Tiruchirappalli',
    institutionState: 'Tamil Nadu',
    institutionType: 'Government' as const,
    programId: 'crs1',
    programSlug: 'btech-computer-science',
    programName: 'B.Tech Computer Science',
    degree: 'B.Tech',
    level: 'Undergraduate' as const,
    stream: 'Engineering',
    duration: '4 Years',
    studyMode: 'Full-time' as const,
    admissionMode: 'Entrance Exam' as const,
    annualFee: '₹1.8 Lakh',
    annualFeeValue: 180000,
    totalProgrammeFee: '₹7.2 Lakh',
    feePeriod: 'Per Annum' as const,
    currency: 'INR',
    academicSession: '2026-27',
    feeComponents: [],
    entranceExams: ['JEE Main'],
    counsellingBody: 'JoSAA / CSAB Counselling',
    eligibilitySummary: '10+2 with PCM',
    academicQualification: '10+2 examination with Physics, Mathematics, and Chemistry',
    mandatorySubjects: 'Physics, Mathematics, and Chemistry (PCM)',
    minimumMarks: '75% aggregate in 12th board',
    selectionProcess: 'JoSAA / CSAB Counselling',
    applicationSteps: [],
    importantRequirements: [],
    documents: [],
    provenance: {
      sourceType: 'manual' as const,
      syncStatus: 'manual' as const,
    },
  },
  {
    id: 'off-vit-vellore-btech-cse',
    slug: 'vit-vellore-btech-computer-science',
    institutionId: 'c7',
    institutionSlug: 'vit-vellore',
    institutionName: 'VIT Vellore',
    institutionCity: 'Vellore',
    institutionState: 'Tamil Nadu',
    institutionType: 'Private' as const,
    programId: 'crs1',
    programSlug: 'btech-computer-science',
    programName: 'B.Tech Computer Science',
    degree: 'B.Tech',
    level: 'Undergraduate' as const,
    stream: 'Engineering',
    duration: '4 Years',
    studyMode: 'Full-time' as const,
    admissionMode: 'Entrance Exam' as const,
    annualFee: '₹1.98 Lakh',
    annualFeeValue: 198000,
    totalProgrammeFee: '₹7.92 Lakh',
    feePeriod: 'Per Annum' as const,
    currency: 'INR',
    academicSession: '2026-27',
    feeComponents: [],
    entranceExams: ['VITEEE'],
    counsellingBody: 'VIT Online Counselling',
    eligibilitySummary: '10+2 with PCM',
    academicQualification: 'Higher Secondary Examination (10+2) with Physics, Chemistry, and Mathematics',
    mandatorySubjects: 'Physics, Chemistry, and Mathematics/Biology',
    minimumMarks: '60% aggregate in PCM/PCB',
    selectionProcess: 'VITEEE Online Counselling',
    applicationSteps: [],
    importantRequirements: [],
    documents: [],
    provenance: {
      sourceType: 'manual' as const,
      syncStatus: 'manual' as const,
    },
  },
  {
    id: 'off-iim-ahmedabad-mba',
    slug: 'iim-ahmedabad-pgp-mba',
    institutionId: 'c5',
    institutionSlug: 'iim-ahmedabad',
    institutionName: 'IIM Ahmedabad',
    institutionCity: 'Ahmedabad',
    institutionState: 'Gujarat',
    institutionType: 'Government' as const,
    programId: 'crs2',
    programSlug: 'mba',
    programName: 'MBA / PGP',
    degree: 'MBA / PGP',
    level: 'Postgraduate' as const,
    stream: 'Management',
    duration: '2 Years',
    studyMode: 'Full-time' as const,
    admissionMode: 'Entrance Exam' as const,
    annualFee: '₹12.5 Lakh',
    annualFeeValue: 1250000,
    totalProgrammeFee: '₹25.0 Lakh',
    feePeriod: 'Per Annum' as const,
    currency: 'INR',
    academicSession: '2026-27',
    feeComponents: [],
    entranceExams: ['CAT'],
    counsellingBody: 'IIMA Admissions Committee',
    eligibilitySummary: "Bachelor's degree with 50% marks",
    academicQualification: "Bachelor's degree with at least 50% marks or equivalent CGPA",
    mandatorySubjects: 'Any recognized discipline',
    minimumMarks: '50% aggregate in undergraduate degree',
    selectionProcess: 'CAT + AWT / Personal Interview',
    applicationSteps: [],
    importantRequirements: [],
    documents: [],
    provenance: {
      sourceType: 'manual' as const,
      syncStatus: 'manual' as const,
    },
  },
  {
    id: 'off-aiims-delhi-mbbs',
    slug: 'aiims-delhi-mbbs',
    institutionId: 'c2',
    institutionSlug: 'aiims-delhi',
    institutionName: 'AIIMS Delhi',
    institutionCity: 'New Delhi',
    institutionState: 'Delhi',
    institutionType: 'Government' as const,
    programId: 'crs5',
    programSlug: 'mbbs',
    programName: 'MBBS',
    degree: 'MBBS',
    level: 'Undergraduate' as const,
    stream: 'Medical',
    duration: '5.5 Years',
    studyMode: 'Full-time' as const,
    admissionMode: 'Entrance Exam' as const,
    annualFee: '₹1,628',
    annualFeeValue: 1628,
    totalProgrammeFee: '₹8,950',
    feePeriod: 'Total Programme' as const,
    currency: 'INR',
    academicSession: '2026-27',
    feeComponents: [],
    entranceExams: ['NEET UG'],
    counsellingBody: 'MCC Counselling',
    eligibilitySummary: '10+2 with PCB and English',
    academicQualification: '10+2 examination with Physics, Chemistry, Biology, and English',
    mandatorySubjects: 'Physics, Chemistry, Biology, and English',
    minimumMarks: '60% aggregate in PCB (50% for SC/ST)',
    selectionProcess: 'NEET UG All India Rank via MCC',
    applicationSteps: [],
    importantRequirements: [],
    documents: [],
    provenance: {
      sourceType: 'manual' as const,
      syncStatus: 'manual' as const,
    },
  },
]

export function getAdminOfferings(): AdminProgramOffering[] {
  return rawOfferingsData.map((raw) => {
    const completeness = calculateOfferingCompleteness(raw)
    const quality = calculateOfferingQuality(raw, completeness)

    return {
      ...raw,
      completeness: completeness.percentage,
      contentStatus: completeness.status,
      qualityStatus: quality.status,
      breakdown: completeness.breakdown,
      qualityBreakdown: quality.qualityBreakdown,
      topIssues: quality.topIssues,
    }
  })
}

export function getAdminOfferingById(idOrSlug: string): AdminProgramOfferingDetail | undefined {
  const offerings = getAdminOfferings()
  const offering = offerings.find((o) => o.id === idOrSlug || o.slug === idOrSlug)
  if (!offering) return undefined

  const college = colleges.find((c) => c.id === offering.institutionId || c.slug === offering.institutionSlug)
  const collegeDetail = offering.institutionSlug ? getCollegeDetail(offering.institutionSlug) : undefined
  const course = courses.find((crs) => crs.id === offering.programId || crs.slug === offering.programSlug)
  const courseDetail = offering.programSlug ? getCourseDetail(offering.programSlug) : undefined

  return {
    offering,
    college,
    collegeDetail,
    course,
    courseDetail,
  }
}
