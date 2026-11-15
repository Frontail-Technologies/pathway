export const publicNavigation = [
  { label: 'Colleges', href: '/colleges', hasSubnav: true },
  { label: 'Courses', href: '/courses', hasSubnav: true },
  { label: 'Exams', href: '/exams', hasSubnav: true },
  { label: 'Scholarships', href: '/scholarships', hasSubnav: false },
  { label: 'Study Abroad', href: '/study-abroad', hasSubnav: false },
  { label: 'Careers', href: '/careers', hasSubnav: false },
  { label: 'Resources', href: '/notes', hasSubnav: false },
  { label: 'About', href: '/about', hasSubnav: false },
  { label: 'Contact', href: '/contact', hasSubnav: false },
] as const

export type SectionLink = { label: string; href: string }

export type HeaderSection = { id: string; label: string; match: RegExp; links: SectionLink[] }

export const headerSections: HeaderSection[] = [
  {
    id: 'colleges',
    label: 'Colleges',
    match: /^\/(colleges|college|compare)(\/|$)/,
    links: [
      { label: 'All colleges', href: '/colleges' },
      { label: 'Top ranked (NIRF)', href: '/colleges?sort=ranking' },
      { label: 'Government', href: '/colleges?instituteTypes=government' },
      { label: 'Private', href: '/colleges?instituteTypes=private' },
      { label: 'B.Tech colleges', href: '/colleges?courses=btech' },
      { label: 'MBA colleges', href: '/colleges?courses=mba' },
      { label: 'Compare colleges', href: '/compare/colleges' },
      { label: 'College predictor', href: '/college-predictor' },
    ],
  },
  {
    id: 'exams',
    label: 'Exams',
    match: /^\/(exams|exam|rank-predictor)(\/|$)/,
    links: [
      { label: 'All exams', href: '/exams' },
      { label: 'Engineering', href: '/exams?area=engineering' },
      { label: 'Medical', href: '/exams?area=medical' },
      { label: 'Management', href: '/exams?area=management' },
      { label: 'Law', href: '/exams?area=law' },
      { label: 'Rank predictor', href: '/rank-predictor' },
      { label: 'College predictor', href: '/college-predictor' },
    ],
  },
  {
    id: 'courses',
    label: 'Courses',
    match: /^\/(courses|course)(\/|$)/,
    links: [
      { label: 'All courses', href: '/courses' },
      { label: 'Undergraduate', href: '/courses?level=undergraduate' },
      { label: 'Postgraduate', href: '/courses?level=postgraduate' },
      { label: 'Engineering', href: '/courses?stream=engineering' },
      { label: 'Management', href: '/courses?stream=management' },
      { label: 'Medical', href: '/courses?stream=medical' },
      { label: 'Law', href: '/courses?stream=law' },
    ],
  },
  {
    id: 'scholarships',
    label: 'Scholarships',
    match: /^\/(scholarships|scholarship)(\/|$)/,
    links: [
      { label: 'All scholarships', href: '/scholarships' },
      { label: 'Closing soon', href: '/scholarships?status=closing-soon&sort=closing-soon' },
      { label: 'Government', href: '/scholarships?provider=government' },
      { label: 'Private', href: '/scholarships?provider=private' },
      { label: 'For girls', href: '/scholarships?gender=female' },
    ],
  },
]

export const headerSectionFor = (pathname: string) => headerSections.find((section) => section.match.test(pathname))

export const studentNavigation = [
  { id: 'dashboard', label: 'Dashboard', href: '/student', available: true },
  { id: 'profile', label: 'My Profile', href: '/student/profile', available: true },
  { id: 'preferences', label: 'Preferences', href: '/student/preferences', available: true },
  { id: 'saved', label: 'Saved Items', href: '/student/saved', available: true },
  { id: 'notes', label: 'My Notes', href: '/student/notes', available: true },
  { id: 'enquiries', label: 'Counselling & Enquiries', href: '/student/enquiries', available: true },
  { id: 'resume', label: 'Resume Builder', href: '/resume-builder', available: true },
] as const

export const adminNavigation = [
  { label: 'Dashboard', href: '/admin', available: true },
  { label: 'Institutions', href: '/admin/institutions', available: false },
  { label: 'Programs', href: '/admin/programs', available: false },
  { label: 'Admissions & Fees', href: '/admin/fees-admissions', available: false },
  { label: 'Scholarships', href: '/admin/scholarships', available: false },
  { label: 'Tutors & Coaching', href: '/admin/tutors-coaching', available: false },
  { label: 'Students', href: '/admin/students', available: false },
  { label: 'Enquiries & Leads', href: '/admin/enquiries', available: false },
  { label: 'Reviews', href: '/admin/reviews', available: false },
  { label: 'Featured', href: '/admin/featured', available: false },
  { label: 'Content', href: '/admin/content', available: false },
  { label: 'Banners', href: '/admin/banners', available: false },
  { label: 'Notes', href: '/admin/notes', available: true },
  { label: 'SEO', href: '/admin/seo', available: false },
  { label: 'Reports', href: '/admin/reports', available: false },
] as const

