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

