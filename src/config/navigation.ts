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
export const studentNavigation = [{ label: 'Overview', href: '/student' }, { label: 'Saved colleges', href: '/student/saved-colleges' }, { label: 'Applications', href: '/student/applications' }, { label: 'Counselling', href: '/student/counselling' }] as const
export const adminNavigation = [{ label: 'Overview', href: '/admin' }, { label: 'Institutions', href: '/admin/institutions' }, { label: 'Courses', href: '/admin/courses' }, { label: 'Leads & enquiries', href: '/admin/leads' }, { label: 'Scraper operations', href: '/admin/scraper' }] as const
