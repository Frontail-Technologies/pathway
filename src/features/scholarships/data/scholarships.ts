export type ProviderType = 'Government' | 'Private' | 'University' | 'Trust / Foundation'
export type ScholarshipType = 'Merit Based' | 'Need Based' | 'Minority' | 'Sports' | 'Research' | 'Women' | 'Disability'
export type EducationLevel = 'Class 10' | 'Class 12' | 'Undergraduate' | 'Postgraduate' | 'Diploma' | 'PhD'
export type ApplicationStatus = 'open' | 'closing-soon' | 'upcoming' | 'closed'
export type GenderEligibility = 'All Genders' | 'Female Only'
export type IncomeLimitBucket = 'Below ₹2.5 Lakh' | '₹2.5–5 Lakh' | '₹5–8 Lakh' | 'Above ₹8 Lakh'

/** Shared status badge styling — used by `ScholarshipResultCard` (SCH-01) and the Scholarship Detail identity header/sidebar (SCH-02) so the two never drift. */
export const scholarshipStatusStyles: Record<ApplicationStatus, { label: string; className: string }> = {
  open: { label: 'Open', className: 'bg-success-surface text-success' },
  'closing-soon': { label: 'Closing Soon', className: 'bg-warning-surface text-warning' },
  upcoming: { label: 'Upcoming', className: 'bg-secondary text-primary' },
  closed: { label: 'Closed', className: 'bg-muted text-muted-foreground' },
}

export type ScholarshipListItem = {
  id: string
  slug: string
  name: string
  provider: string
  providerType: ProviderType
  /** Initials-style placeholder shown when no real logo asset exists — never a stock image. */
  providerInitials: string
  scholarshipType: ScholarshipType
  /** Empty array means open to every education level listed in `filters.ts` — no restriction to encode. */
  educationLevels: EducationLevel[]
  /** Empty array means open to every stream (no course/stream restriction). */
  streams: string[]
  /** Empty array means all-India / no state restriction. */
  states: string[]
  /** Empty array means open to every category (no reservation-category restriction). */
  categories: string[]
  genderEligibility: GenderEligibility
  /** `undefined` means no family-income ceiling applies. */
  incomeLimitBucket?: IncomeLimitBucket
  benefitLabel: string
  /** Representative rupee value used only for bucketing/sorting — the card always displays `benefitLabel`, never a bare number. */
  benefitValue: number
  deadline: string
  deadlineDisplay: string
  status: ApplicationStatus
  shortEligibility: string[]
  /** Real official top-level domain only (never a fabricated deep application link) — omitted where no confident official domain exists for this mock record. */
  officialApplyUrl?: string
  featured?: boolean
}

export const scholarships: ScholarshipListItem[] = [
  {
    id: 'sch1',
    slug: 'central-sector-scheme-scholarship',
    name: 'Central Sector Scheme of Scholarship',
    provider: 'Government of India',
    providerType: 'Government',
    providerInitials: 'GOI',
    scholarshipType: 'Merit Based',
    educationLevels: ['Undergraduate', 'Postgraduate'],
    streams: [],
    states: [],
    categories: [],
    genderEligibility: 'All Genders',
    incomeLimitBucket: '₹2.5–5 Lakh',
    benefitLabel: '₹12,000/year',
    benefitValue: 12000,
    deadline: '2026-09-10',
    deadlineDisplay: '10 Sep 2026',
    status: 'closing-soon',
    shortEligibility: ['Class 12 pass with 80%+', 'Family income below ₹4.5L'],
    officialApplyUrl: 'https://scholarships.gov.in/',
    featured: true,
  },
  {
    id: 'sch2',
    slug: 'aicte-pragati-scholarship-girls',
    name: 'AICTE Pragati Scholarship for Girls',
    provider: 'AICTE',
    providerType: 'Government',
    providerInitials: 'AICTE',
    scholarshipType: 'Women',
    educationLevels: ['Undergraduate', 'Diploma'],
    streams: ['Engineering'],
    states: [],
    categories: [],
    genderEligibility: 'Female Only',
    incomeLimitBucket: '₹5–8 Lakh',
    benefitLabel: '₹50,000/year',
    benefitValue: 50000,
    deadline: '2026-10-15',
    deadlineDisplay: '15 Oct 2026',
    status: 'open',
    shortEligibility: ['Female engineering/diploma students', 'Family income below ₹8L', 'Max 2 girls per family'],
    officialApplyUrl: 'https://www.aicte-india.org/',
  },
  {
    id: 'sch3',
    slug: 'aicte-saksham-scholarship',
    name: 'AICTE Saksham Scholarship for Specially Abled Students',
    provider: 'AICTE',
    providerType: 'Government',
    providerInitials: 'AICTE',
    scholarshipType: 'Disability',
    educationLevels: ['Undergraduate', 'Diploma'],
    streams: ['Engineering'],
    states: [],
    categories: [],
    genderEligibility: 'All Genders',
    incomeLimitBucket: '₹5–8 Lakh',
    benefitLabel: '₹50,000/year',
    benefitValue: 50000,
    deadline: '2026-10-15',
    deadlineDisplay: '15 Oct 2026',
    status: 'open',
    shortEligibility: ['40%+ disability certificate', 'Engineering diploma/degree students'],
    officialApplyUrl: 'https://www.aicte-india.org/',
  },
  {
    id: 'sch4',
    slug: 'post-matric-scholarship-sc-students',
    name: 'Post Matric Scholarship for SC Students',
    provider: 'State Government',
    providerType: 'Government',
    providerInitials: 'STG',
    scholarshipType: 'Need Based',
    educationLevels: ['Class 12', 'Undergraduate', 'Postgraduate'],
    streams: [],
    states: ['Uttar Pradesh'],
    categories: ['SC'],
    genderEligibility: 'All Genders',
    incomeLimitBucket: 'Below ₹2.5 Lakh',
    benefitLabel: 'Tuition + Maintenance Allowance',
    benefitValue: 60000,
    deadline: '2026-09-05',
    deadlineDisplay: '05 Sep 2026',
    status: 'closing-soon',
    shortEligibility: ['SC category students', 'Studying beyond Class 10', 'Family income below ₹2.5L'],
  },
  {
    id: 'sch5',
    slug: 'national-means-cum-merit-scholarship',
    name: 'National Means-cum-Merit Scholarship',
    provider: 'Government of India',
    providerType: 'Government',
    providerInitials: 'GOI',
    scholarshipType: 'Merit Based',
    educationLevels: ['Class 10', 'Class 12'],
    streams: [],
    states: [],
    categories: [],
    genderEligibility: 'All Genders',
    incomeLimitBucket: 'Below ₹2.5 Lakh',
    benefitLabel: '₹12,000/year',
    benefitValue: 12000,
    deadline: '2027-01-15',
    deadlineDisplay: '15 Jan 2027',
    status: 'upcoming',
    shortEligibility: ['Class 8 NMMS exam qualified', 'Family income below ₹3.5L'],
    officialApplyUrl: 'https://scholarships.gov.in/',
  },
  {
    id: 'sch6',
    slug: 'inspire-scholarship-higher-education',
    name: 'INSPIRE Scholarship for Higher Education',
    provider: 'Dept. of Science & Technology',
    providerType: 'Government',
    providerInitials: 'DST',
    scholarshipType: 'Merit Based',
    educationLevels: ['Undergraduate'],
    streams: ['Science'],
    states: [],
    categories: [],
    genderEligibility: 'All Genders',
    benefitLabel: '₹80,000/year',
    benefitValue: 80000,
    deadline: '2026-11-30',
    deadlineDisplay: '30 Nov 2026',
    status: 'open',
    shortEligibility: ['Top 1% in Class 12 boards', 'Pursuing B.Sc / Integrated M.Sc'],
    officialApplyUrl: 'https://scholarships.gov.in/',
  },
  {
    id: 'sch7',
    slug: 'hdfc-bank-parivartan-ecss-scholarship',
    name: 'HDFC Bank Parivartan ECSS Scholarship',
    provider: 'HDFC Bank',
    providerType: 'Private',
    providerInitials: 'HDFC',
    scholarshipType: 'Need Based',
    educationLevels: ['Undergraduate', 'Postgraduate'],
    streams: [],
    states: [],
    categories: [],
    genderEligibility: 'All Genders',
    incomeLimitBucket: '₹2.5–5 Lakh',
    benefitLabel: 'Up to ₹75,000',
    benefitValue: 75000,
    deadline: '2026-09-08',
    deadlineDisplay: '08 Sep 2026',
    status: 'closing-soon',
    shortEligibility: ['Family income below ₹6L', 'Enrolled in a recognized institution'],
    officialApplyUrl: 'https://www.hdfcbank.com/',
    featured: true,
  },
  {
    id: 'sch8',
    slug: 'reliance-foundation-ug-scholarship',
    name: 'Reliance Foundation Undergraduate Scholarship',
    provider: 'Reliance Foundation',
    providerType: 'Trust / Foundation',
    providerInitials: 'RF',
    scholarshipType: 'Merit Based',
    educationLevels: ['Undergraduate'],
    streams: [],
    states: [],
    categories: [],
    genderEligibility: 'All Genders',
    incomeLimitBucket: '₹5–8 Lakh',
    benefitLabel: 'Up to ₹2,00,000',
    benefitValue: 200000,
    deadline: '2026-12-05',
    deadlineDisplay: '05 Dec 2026',
    status: 'open',
    shortEligibility: ['First-year undergraduate students', 'Family income below ₹15L'],
    officialApplyUrl: 'https://www.reliancefoundation.org/',
  },
  {
    id: 'sch9',
    slug: 'tata-capital-pankh-scholarship',
    name: 'Tata Capital Pankh Scholarship',
    provider: 'Tata Capital',
    providerType: 'Private',
    providerInitials: 'TC',
    scholarshipType: 'Need Based',
    educationLevels: ['Class 12', 'Undergraduate'],
    streams: [],
    states: [],
    categories: [],
    genderEligibility: 'All Genders',
    incomeLimitBucket: 'Below ₹2.5 Lakh',
    benefitLabel: 'Up to ₹40,000',
    benefitValue: 40000,
    deadline: '2026-09-04',
    deadlineDisplay: '04 Sep 2026',
    status: 'closing-soon',
    shortEligibility: ['Economically weaker section', 'Class 10/12 pass'],
    officialApplyUrl: 'https://www.tatacapital.com/',
  },
  {
    id: 'sch10',
    slug: 'state-merit-scholarship-engineering',
    name: 'State Merit Scholarship for Engineering',
    provider: 'State Government',
    providerType: 'Government',
    providerInitials: 'STG',
    scholarshipType: 'Merit Based',
    educationLevels: ['Undergraduate'],
    streams: ['Engineering'],
    states: ['Maharashtra'],
    categories: [],
    genderEligibility: 'All Genders',
    benefitLabel: 'Full Tuition Waiver',
    benefitValue: 150000,
    deadline: '2026-08-20',
    deadlineDisplay: '20 Aug 2026',
    status: 'closed',
    shortEligibility: ['JEE rank holders', 'State domicile required'],
  },
  {
    id: 'sch11',
    slug: 'maulana-azad-national-fellowship',
    name: 'Maulana Azad National Fellowship for Minority Students',
    provider: 'UGC',
    providerType: 'Government',
    providerInitials: 'UGC',
    scholarshipType: 'Minority',
    educationLevels: ['Postgraduate', 'PhD'],
    streams: [],
    states: [],
    categories: ['Minority'],
    genderEligibility: 'All Genders',
    benefitLabel: '₹31,000/month',
    benefitValue: 372000,
    deadline: '2026-10-20',
    deadlineDisplay: '20 Oct 2026',
    status: 'open',
    shortEligibility: ['Minority community students', 'M.Phil/PhD enrolled or admitted'],
    officialApplyUrl: 'https://scholarships.gov.in/',
  },
  {
    id: 'sch12',
    slug: 'aicte-women-in-engineering-scholarship',
    name: 'AICTE Women in Engineering Scholarship',
    provider: 'AICTE',
    providerType: 'Government',
    providerInitials: 'AICTE',
    scholarshipType: 'Women',
    educationLevels: ['Undergraduate'],
    streams: ['Engineering'],
    states: [],
    categories: [],
    genderEligibility: 'Female Only',
    incomeLimitBucket: '₹5–8 Lakh',
    benefitLabel: '₹50,000/year',
    benefitValue: 50000,
    deadline: '2026-11-05',
    deadlineDisplay: '05 Nov 2026',
    status: 'open',
    shortEligibility: ['Female engineering students', 'Merit + need based'],
    officialApplyUrl: 'https://www.aicte-india.org/',
  },
  {
    id: 'sch13',
    slug: 'ugc-net-jrf-research-fellowship',
    name: 'UGC NET-JRF Research Fellowship',
    provider: 'University Grants Commission',
    providerType: 'Government',
    providerInitials: 'UGC',
    scholarshipType: 'Research',
    educationLevels: ['PhD'],
    streams: [],
    states: [],
    categories: [],
    genderEligibility: 'All Genders',
    benefitLabel: '₹37,000/month',
    benefitValue: 444000,
    deadline: '2027-02-01',
    deadlineDisplay: '01 Feb 2027',
    status: 'upcoming',
    shortEligibility: ['UGC-NET JRF qualified', 'Enrolled in a PhD program'],
    officialApplyUrl: 'https://www.ugc.gov.in/',
  },
  {
    id: 'sch14',
    slug: 'national-fellowship-disability',
    name: 'National Fellowship for Persons with Disabilities',
    provider: 'Government of India',
    providerType: 'Government',
    providerInitials: 'GOI',
    scholarshipType: 'Disability',
    educationLevels: ['Postgraduate', 'PhD'],
    streams: [],
    states: [],
    categories: [],
    genderEligibility: 'All Genders',
    benefitLabel: '₹30,000/month',
    benefitValue: 360000,
    deadline: '2026-09-12',
    deadlineDisplay: '12 Sep 2026',
    status: 'closing-soon',
    shortEligibility: ['40%+ disability certificate', 'PG/PhD enrolled'],
    officialApplyUrl: 'https://scholarships.gov.in/',
  },
  {
    id: 'sch15',
    slug: 'state-minority-scholarship-higher-education',
    name: 'State Minority Scholarship for Higher Education',
    provider: 'State Government',
    providerType: 'Government',
    providerInitials: 'STG',
    scholarshipType: 'Minority',
    educationLevels: ['Undergraduate', 'Postgraduate'],
    streams: [],
    states: ['Karnataka'],
    categories: ['Minority'],
    genderEligibility: 'All Genders',
    incomeLimitBucket: 'Below ₹2.5 Lakh',
    benefitLabel: 'Up to ₹60,000',
    benefitValue: 60000,
    deadline: '2026-09-25',
    deadlineDisplay: '25 Sep 2026',
    status: 'closing-soon',
    shortEligibility: ['Minority category students', 'Family income below ₹2L'],
  },
  {
    id: 'sch16',
    slug: 'loreal-india-women-in-science',
    name: "L'Oréal India For Young Women in Science",
    provider: "L'Oréal India",
    providerType: 'Private',
    providerInitials: 'LOR',
    scholarshipType: 'Research',
    educationLevels: ['Postgraduate', 'PhD'],
    streams: ['Science'],
    states: [],
    categories: [],
    genderEligibility: 'Female Only',
    benefitLabel: '₹2,50,000 Fellowship',
    benefitValue: 250000,
    deadline: '2026-12-15',
    deadlineDisplay: '15 Dec 2026',
    status: 'open',
    shortEligibility: ['Women researchers in STEM', 'Pursuing PhD/post-doctoral science research'],
    officialApplyUrl: 'https://www.lorealindia.com/',
  },
]

/**
 * UI-only infinite-scroll demo feed: cycles the authored records to
 * simulate a larger listing without hand-authoring hundreds of records —
 * same convention as `features/courses/data/courses.ts`'s `getCourseFeed`.
 * Each cycle gets a unique `id` suffix so list keys stay distinct.
 */
export const scholarshipFeedSize = 48

export function getScholarshipFeed(): ScholarshipListItem[] {
  return Array.from({ length: scholarshipFeedSize }, (_, index) => {
    const base = scholarships[index % scholarships.length]
    const cycle = Math.floor(index / scholarships.length)
    return cycle === 0 ? base : { ...base, id: `${base.id}-${cycle}` }
  })
}

/** Days remaining until `deadline` (ISO date), for the "Closing in N days" helper text — computed at render time, never stored. */
export function getDaysRemaining(deadline: string): number {
  const diffMs = new Date(deadline).getTime() - Date.now()
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24))
}
