export type CollegeComparisonFees = {
  hostel: string
  other: string
}

export type CollegeComparisonPlacements = {
  averagePackage: string
  highestPackage: string
  placementRate: string
  topRecruiters: string[]
}

export type CollegeComparisonRatings = {
  overall: number
  faculty: number
  placements: number
  infrastructure: number
  valueForMoney: number
}

export type CollegeComparisonFacilities = {
  hostel: boolean
  library: boolean
  labs: boolean
  sports: boolean
  wifi: boolean
  medical: boolean
  cafeteria: boolean
}

export type CollegeComparisonItem = {
  slug: string
  /** Where "View College" navigates — only implemented College Detail slugs point at /college/[slug]; everything else falls back to /colleges. */
  href: string
  /** Local mock logo asset — see public/compare-logos/. Not a real institution logo, no dynamic fetch. */
  logo: string
  name: string
  shortName: string
  location: string
  type: string
  rating: number
  reviewCount: number
  verified?: boolean
  established: string
  naacGrade: string
  approvedBy: string
  instituteStatus: string
  totalPrograms: string
  fees: CollegeComparisonFees
  placements: CollegeComparisonPlacements
  ratings: CollegeComparisonRatings
  facilities: CollegeComparisonFacilities
}

export const collegeComparisonItems: CollegeComparisonItem[] = [
  {
    slug: 'iit-delhi',
    href: '/college/iit-delhi',
    logo: '/compare-logos/iit-delhi.svg',
    name: 'IIT Delhi',
    shortName: 'IIT Delhi',
    location: 'New Delhi, Delhi',
    type: 'Government',
    rating: 4.7,
    reviewCount: 2150,
    verified: true,
    established: '1961',
    naacGrade: 'NAAC A++',
    approvedBy: 'UGC / AICTE',
    instituteStatus: 'Institute of National Importance',
    totalPrograms: '65+',
    fees: { hostel: '₹0.4L / year', other: '₹0.1L / year' },
    placements: { averagePackage: '₹16 LPA', highestPackage: '₹82 LPA', placementRate: '92%', topRecruiters: ['Google', 'Microsoft', 'Goldman Sachs'] },
    ratings: { overall: 4.7, faculty: 4.6, placements: 4.8, infrastructure: 4.5, valueForMoney: 4.3 },
    facilities: { hostel: true, library: true, labs: true, sports: true, wifi: true, medical: true, cafeteria: true },
  },
  {
    slug: 'iit-bombay',
    href: '/colleges',
    logo: '/compare-logos/iit-bombay.svg',
    name: 'IIT Bombay',
    shortName: 'IIT Bombay',
    location: 'Mumbai, Maharashtra',
    type: 'Government',
    rating: 4.8,
    reviewCount: 2480,
    verified: true,
    established: '1958',
    naacGrade: 'NAAC A++',
    approvedBy: 'UGC / AICTE',
    instituteStatus: 'Institute of National Importance',
    totalPrograms: '70+',
    fees: { hostel: '₹0.45L / year', other: '₹0.1L / year' },
    placements: { averagePackage: '₹18 LPA', highestPackage: '₹1.2 Cr', placementRate: '94%', topRecruiters: ['Google', 'Amazon', 'Sprinklr'] },
    ratings: { overall: 4.8, faculty: 4.7, placements: 4.9, infrastructure: 4.6, valueForMoney: 4.3 },
    facilities: { hostel: true, library: true, labs: true, sports: true, wifi: true, medical: true, cafeteria: true },
  },
  {
    slug: 'iit-madras',
    href: '/colleges',
    logo: '/compare-logos/iit-madras.svg',
    name: 'IIT Madras',
    shortName: 'IIT Madras',
    location: 'Chennai, Tamil Nadu',
    type: 'Government',
    rating: 4.7,
    reviewCount: 1980,
    verified: true,
    established: '1959',
    naacGrade: 'NAAC A++',
    approvedBy: 'UGC / AICTE',
    instituteStatus: 'Institute of National Importance',
    totalPrograms: '60+',
    fees: { hostel: '₹0.4L / year', other: '₹0.1L / year' },
    placements: { averagePackage: '₹15 LPA', highestPackage: '₹93 LPA', placementRate: '91%', topRecruiters: ['Microsoft', 'Adobe', 'Qualcomm'] },
    ratings: { overall: 4.7, faculty: 4.6, placements: 4.7, infrastructure: 4.5, valueForMoney: 4.4 },
    facilities: { hostel: true, library: true, labs: true, sports: true, wifi: true, medical: true, cafeteria: true },
  },
  {
    slug: 'iit-kanpur',
    href: '/colleges',
    logo: '/compare-logos/iit-kanpur.svg',
    name: 'IIT Kanpur',
    shortName: 'IIT Kanpur',
    location: 'Kanpur, Uttar Pradesh',
    type: 'Government',
    rating: 4.6,
    reviewCount: 1560,
    verified: true,
    established: '1959',
    naacGrade: 'NAAC A++',
    approvedBy: 'UGC / AICTE',
    instituteStatus: 'Institute of National Importance',
    totalPrograms: '55+',
    fees: { hostel: '₹0.4L / year', other: '₹0.1L / year' },
    placements: { averagePackage: '₹14 LPA', highestPackage: '₹85 LPA', placementRate: '90%', topRecruiters: ['Samsung', 'Google', 'Adobe'] },
    ratings: { overall: 4.6, faculty: 4.5, placements: 4.6, infrastructure: 4.4, valueForMoney: 4.3 },
    facilities: { hostel: true, library: true, labs: true, sports: true, wifi: true, medical: true, cafeteria: true },
  },
  {
    slug: 'bits-pilani',
    href: '/colleges',
    logo: '/compare-logos/bits-pilani.svg',
    name: 'BITS Pilani',
    shortName: 'BITS Pilani',
    location: 'Pilani, Rajasthan',
    type: 'Private',
    rating: 4.5,
    reviewCount: 1340,
    verified: true,
    established: '1964',
    naacGrade: 'NAAC A',
    approvedBy: 'UGC · Deemed University',
    instituteStatus: 'Deemed University',
    totalPrograms: '40+',
    fees: { hostel: '₹0.7L / year', other: '₹0.15L / year' },
    placements: { averagePackage: '₹17 LPA', highestPackage: '₹1.1 Cr', placementRate: '95%', topRecruiters: ['Microsoft', 'Goldman Sachs', 'Texas Instruments'] },
    ratings: { overall: 4.5, faculty: 4.4, placements: 4.7, infrastructure: 4.5, valueForMoney: 4.0 },
    facilities: { hostel: true, library: true, labs: true, sports: true, wifi: true, medical: true, cafeteria: true },
  },
  {
    slug: 'vit-vellore',
    href: '/colleges',
    logo: '/compare-logos/vit-vellore.svg',
    name: 'VIT Vellore',
    shortName: 'VIT Vellore',
    location: 'Vellore, Tamil Nadu',
    type: 'Private',
    rating: 4.3,
    reviewCount: 3620,
    verified: true,
    established: '1984',
    naacGrade: 'NAAC A++',
    approvedBy: 'UGC · Deemed University',
    instituteStatus: 'Deemed University',
    totalPrograms: '50+',
    fees: { hostel: '₹0.6L / year', other: '₹0.12L / year' },
    placements: { averagePackage: '₹7.5 LPA', highestPackage: '₹57 LPA', placementRate: '88%', topRecruiters: ['TCS', 'Amazon', 'Cognizant'] },
    ratings: { overall: 4.3, faculty: 4.2, placements: 4.3, infrastructure: 4.4, valueForMoney: 4.1 },
    facilities: { hostel: true, library: true, labs: true, sports: true, wifi: true, medical: false, cafeteria: true },
  },
]

export const defaultComparisonSlugs = ['iit-delhi', 'iit-bombay', 'bits-pilani']

export const maxComparisonSlots = 3

export function getCollegeComparisonItem(slug: string): CollegeComparisonItem | undefined {
  return collegeComparisonItems.find((item) => item.slug === slug)
}

/** Short 2-letter identity fallback derived from the college's short name (e.g. "IIT Delhi" -> "ID") — only used if a logo asset ever fails to load. */
export function getCollegeInitials(shortName: string): string {
  const words = shortName.split(' ').filter(Boolean)
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

/** Parses the `colleges` URL param into valid, deduped, max-3 slugs — unknown slugs are silently dropped. */
export function parseComparisonSlugs(searchParams: URLSearchParams): string[] {
  const raw = searchParams.get('colleges')
  if (!raw) return []

  const seen = new Set<string>()
  const result: string[] = []
  for (const slug of raw.split(',')) {
    if (!getCollegeComparisonItem(slug) || seen.has(slug)) continue
    seen.add(slug)
    result.push(slug)
    if (result.length === maxComparisonSlots) break
  }
  return result
}

/** Builds the `colleges` query string for a given slug order — empty when no colleges are selected. */
export function serializeComparisonSlugs(slugs: string[]): string {
  if (slugs.length === 0) return ''
  const params = new URLSearchParams()
  params.set('colleges', slugs.join(','))
  return params.toString()
}
