export const publicNavigation = [
  { label: 'Colleges', href: '/colleges', hasSubnav: true },
  { label: 'Courses', href: '/courses', hasSubnav: true },
  { label: 'Exams', href: '/exams', hasSubnav: true },
  { label: 'Admissions', href: '/admissions', hasSubnav: true },
  { label: 'Scholarships', href: '/scholarships', hasSubnav: false },
  { label: 'Study Abroad', href: '/study-abroad', hasSubnav: false },
  { label: 'Counselling', href: '/counselling', hasSubnav: false },
  { label: 'Reviews', href: '/reviews', hasSubnav: false },
  { label: 'Careers', href: '/careers', hasSubnav: false },
  { label: 'Resources', href: '/resources', hasSubnav: true },
  { label: 'About', href: '/about', hasSubnav: false },
  { label: 'Contact', href: '/contact', hasSubnav: false },
] as const
/** `available: false` renders a disabled "Soon" item (never a dead link). Every Phase 6 route now exists. */
export const studentNavigation = [
  { id: 'dashboard', label: 'Dashboard', href: '/student', available: true },
  { id: 'profile', label: 'My Profile', href: '/student/profile', available: true },
  { id: 'preferences', label: 'Preferences', href: '/student/preferences', available: true },
  { id: 'saved', label: 'Saved Items', href: '/student/saved', available: true },
  { id: 'enquiries', label: 'Counselling & Enquiries', href: '/student/enquiries', available: true },
  { id: 'resume', label: 'Resume Builder', href: '/resume-builder', available: true },
] as const
export const adminNavigation = [{ label: 'Overview', href: '/admin' }, { label: 'Institutions', href: '/admin/institutions' }, { label: 'Courses', href: '/admin/courses' }, { label: 'Leads & enquiries', href: '/admin/leads' }, { label: 'Scraper operations', href: '/admin/scraper' }] as const
