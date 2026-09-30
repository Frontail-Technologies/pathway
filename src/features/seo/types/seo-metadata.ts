export type SeoTargetType =
  | 'static_page'
  | 'institution'
  | 'program'
  | 'exam'
  | 'scholarship'
  | 'tutor'
  | 'coaching'
  | 'note'

export interface SeoTargetTypeMeta {
  label: string
  description: string
  routePrefix: string
  entityKind: 'static' | 'canonical_entity'
}

export const seoTargetTypeMap: Record<SeoTargetType, SeoTargetTypeMeta> = {
  static_page: {
    label: 'Static Public Page',
    description: 'Main discovery landing pages, tools, and policy routes.',
    routePrefix: '',
    entityKind: 'static',
  },
  institution: {
    label: 'Institution (College/University)',
    description: 'Public college and university detail pages.',
    routePrefix: '/college/',
    entityKind: 'canonical_entity',
  },
  program: {
    label: 'Program / Course',
    description: 'Public academic degree and program detail pages.',
    routePrefix: '/course/',
    entityKind: 'canonical_entity',
  },
  exam: {
    label: 'Entrance Exam',
    description: 'Public entrance exam guides and pattern pages.',
    routePrefix: '/exam/',
    entityKind: 'canonical_entity',
  },
  scholarship: {
    label: 'Scholarship Scheme',
    description: 'Public scholarship and financial aid scheme pages.',
    routePrefix: '/scholarship/',
    entityKind: 'canonical_entity',
  },
  tutor: {
    label: 'Verified Educator',
    description: 'Public 1-on-1 educator teaching profile pages.',
    routePrefix: '/tutor/',
    entityKind: 'canonical_entity',
  },
  coaching: {
    label: 'Coaching Institute',
    description: 'Public coaching provider and academy profile pages.',
    routePrefix: '/coaching/',
    entityKind: 'canonical_entity',
  },
  note: {
    label: 'Study Note / Material',
    description: 'Public educational study notes and formula sheet pages.',
    routePrefix: '/notes/',
    entityKind: 'canonical_entity',
  },
}

export interface KnownStaticRoute {
  path: string
  label: string
  category: 'Discovery & Landing' | 'Tools' | 'Legal'
  defaultTitle: string
  defaultDescription: string
  defaultRobotsIndex?: boolean
  defaultRobotsFollow?: boolean
}

export const KNOWN_STATIC_ROUTES: KnownStaticRoute[] = [
  {
    path: '/',
    label: 'Homepage',
    category: 'Discovery & Landing',
    defaultTitle: 'Pathway — Education discovery, made clearer',
    defaultDescription: 'A trusted education discovery platform for finding the right colleges, courses, exams, and opportunities.',
  },
  {
    path: '/colleges',
    label: 'Colleges & Universities Directory',
    category: 'Discovery & Landing',
    defaultTitle: 'Top Colleges & Universities in India | Pathway',
    defaultDescription: 'Explore, compare, and filter top colleges and universities across India with authentic fee and placement insights.',
  },
  {
    path: '/courses',
    label: 'Programs & Courses Directory',
    category: 'Discovery & Landing',
    defaultTitle: 'Explore Degree Programs & Courses | Pathway',
    defaultDescription: 'Discover undergraduate and postgraduate degree programs, career paths, and eligibility requirements.',
  },
  {
    path: '/exams',
    label: 'Entrance Exams Directory',
    category: 'Discovery & Landing',
    defaultTitle: 'Entrance Exams in India — Schedules & Syllabus | Pathway',
    defaultDescription: 'Comprehensive guide to national and state-level entrance exams, registration deadlines, and eligibility criteria.',
  },
  {
    path: '/scholarships',
    label: 'Scholarships Directory',
    category: 'Discovery & Landing',
    defaultTitle: 'Scholarships & Financial Aid Grants | Pathway',
    defaultDescription: 'Discover government schemes, institutional fee waivers, and merit scholarships for higher education in India.',
  },
  {
    path: '/tutors',
    label: 'Verified Educators & Tutors',
    category: 'Discovery & Landing',
    defaultTitle: 'Find Verified 1-on-1 Educators & Tutors | Pathway',
    defaultDescription: 'Connect with expert educators for competitive exams, board preparation, and personalized academic guidance.',
  },
  {
    path: '/coaching',
    label: 'Coaching Institutes Directory',
    category: 'Discovery & Landing',
    defaultTitle: 'Top Coaching Institutes & Academies | Pathway',
    defaultDescription: 'Compare premier coaching institutes for JEE, NEET, UPSC, and Foundation courses with fee and program details.',
  },
  {
    path: '/study-abroad',
    label: 'Study Abroad Landing',
    category: 'Discovery & Landing',
    defaultTitle: 'Study Abroad Guide — Top Global Destinations | Pathway',
    defaultDescription: 'Plan your international education journey with guides on popular destinations, intake cycles, and required exams.',
  },
  {
    path: '/careers',
    label: 'Careers Explorer',
    category: 'Discovery & Landing',
    defaultTitle: 'Career Explorer & Degree Pathways | Pathway',
    defaultDescription: 'Explore trending career paths, industry skill requirements, and recommended academic degree routes.',
  },
  {
    path: '/notes',
    label: 'Notes & Study Material Marketplace',
    category: 'Discovery & Landing',
    defaultTitle: 'Notes & Study Material Marketplace | Pathway',
    defaultDescription: 'Discover chapter notes, revision sheets, and formula guides curated by top educators and students.',
  },
  {
    path: '/compare/colleges',
    label: 'College Comparison Tool',
    category: 'Tools',
    defaultTitle: 'Compare Colleges Side-by-Side | Pathway',
    defaultDescription: 'Compare top colleges side-by-side on fees, placements, accreditation, and campus facilities.',
  },
  {
    path: '/college-predictor',
    label: 'College Predictor Tool',
    category: 'Tools',
    defaultTitle: 'College Predictor — Estimate Your Admission Chances | Pathway',
    defaultDescription: 'Estimate your admission chances at top engineering and medical colleges based on exam scores and rank.',
  },
  {
    path: '/rank-predictor',
    label: 'Rank Predictor Tool',
    category: 'Tools',
    defaultTitle: 'Rank Predictor — Calculate Predicted Rank | Pathway',
    defaultDescription: 'Calculate your estimated all-India rank from test scores and past year cutoff trends.',
  },
  {
    path: '/resume-builder',
    label: 'Student Resume Builder',
    category: 'Tools',
    defaultTitle: 'Free Student Resume Builder | Pathway',
    defaultDescription: 'Build polished academic resumes and CVs tailored for internships, college admissions, and scholarships.',
  },
  {
    path: '/psychometric-test',
    label: 'Psychometric Career Test',
    category: 'Tools',
    defaultTitle: 'Psychometric Career Assessment | Pathway',
    defaultDescription: 'Discover career interests, strengths, and suitable academic disciplines through an interactive self-assessment.',
  },
  {
    path: '/privacy',
    label: 'Privacy Policy',
    category: 'Legal',
    defaultTitle: 'Privacy Policy | Pathway',
    defaultDescription: 'Learn how Pathway collects, protects, and handles student and institutional information.',
  },
  {
    path: '/terms',
    label: 'Terms & Conditions',
    category: 'Legal',
    defaultTitle: 'Terms & Conditions | Pathway',
    defaultDescription: 'Terms of service and acceptable use policies governing the Pathway education platform.',
  },
  {
    path: '/disclaimer',
    label: 'Disclaimer',
    category: 'Legal',
    defaultTitle: 'Disclaimer & Content Integrity | Pathway',
    defaultDescription: 'Important notices regarding educational information accuracy, admission criteria, and data sources.',
  },
  {
    path: '/cookies',
    label: 'Cookie Policy',
    category: 'Legal',
    defaultTitle: 'Cookie Policy | Pathway',
    defaultDescription: 'Information about how cookies and session storage are utilized on Pathway.',
  },
]

export interface SeoMetadataRecord {
  id: string
  targetType: SeoTargetType
  targetId?: string
  routePath?: string

  title?: string
  description?: string

  primaryKeyword?: string
  secondaryKeywords?: string[]

  canonicalPath?: string

  robotsIndex?: boolean
  robotsFollow?: boolean

  ogTitle?: string
  ogDescription?: string
  ogImage?: string

  createdAt?: string
  updatedAt?: string
}

export interface ResolvedSeoMetadata {
  title: string
  description: string
  primaryKeyword?: string
  secondaryKeywords: string[]
  canonicalPath: string
  robotsIndex: boolean
  robotsFollow: boolean
  ogTitle: string
  ogDescription: string
  ogImage?: string
  targetLabel: string
  targetRoutePath: string
  isOverrideTitle: boolean
  isOverrideDescription: boolean
  isOverrideCanonical: boolean
  isOverrideRobots: boolean
  isOverrideRobotsIndex: boolean
  isOverrideRobotsFollow: boolean
  isOverrideOgTitle: boolean
  isOverrideOgDescription: boolean
  isOverrideOgImage: boolean
}

export interface SeoTargetOption {
  id: string
  label: string
  sublabel?: string
  routePath: string
}

