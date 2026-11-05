import { colleges } from '@/features/colleges/data/colleges'
import { getCollegeDetail } from '@/features/colleges/data/college-detail'
import { courses } from '@/features/courses/data/courses'
import { getCourseDetail } from '@/features/courses/data/course-detail'
import { scholarships } from '@/features/scholarships/data/scholarships'
import { getScholarshipDetail } from '@/features/scholarships/data/scholarship-detail'
import { tutors } from '@/features/tutors/data/tutors'
import { coachingProviders } from '@/features/coaching/data/coaching'
import { exams } from '@/features/exams/data/exams'
import { getAdminOfferings } from './admin-admissions-fees'
import type {
  AdminKPI,
  AdminNavGroup,
  CatalogDomainItem,
  ContentCompletenessItem,
  OperationalAttentionTask,
} from '../types/dashboard'

export type {
  AdminKPI,
  AdminNavGroup,
  CatalogDomainItem,
  ContentCompletenessItem,
  LeadPipelineStage,
  OperationalAttentionTask,
} from '../types/dashboard'




 
export function getAdminKPIs(): AdminKPI[] {
  return [
    {
      id: 'institutions',
      label: 'Institutions',
      value: colleges.length,
      subtext: `${colleges.length} catalogued colleges`,
      iconName: 'Building',
      iconColor: 'blue',
      connected: true,
    },
    {
      id: 'programs',
      label: 'Programs & Courses',
      value: courses.length,
      subtext: `${courses.length} degree programs`,
      iconName: 'BookOpen',
      iconColor: 'amber',
      connected: true,
    },
    {
      id: 'scholarships',
      label: 'Scholarships',
      value: scholarships.length,
      subtext: `${scholarships.length} financial aid listings`,
      iconName: 'Award',
      iconColor: 'emerald',
      connected: true,
    },
    {
      id: 'students',
      label: 'Student Profiles',
      value: 1,
      subtext: '1 local demo profile',
      iconName: 'Users',
      iconColor: 'purple',
      connected: true,
    },
    {
      id: 'enquiries',
      label: 'Enquiries & Leads',
      value: '—',
      subtext: 'Tracking not connected yet',
      iconName: 'MessageSquareQuote',
      iconColor: 'indigo',
      connected: false,
    },
  ]
}



 
export function getCatalogDistribution(): {
  items: CatalogDomainItem[]
  totalItems: number
} {
  const offerings = getAdminOfferings()
  const rawItems = [
    { id: 'scholarships', label: 'Scholarships', count: scholarships.length },
    { id: 'courses', label: 'Degree Programs', count: courses.length },
    { id: 'offerings', label: 'Course Offerings', count: offerings.length },
    { id: 'tutors', label: 'Educators & Tutors', count: tutors.length },
    { id: 'coaching', label: 'Coaching Institutes', count: coachingProviders.length },
    { id: 'exams', label: 'Entrance Exams', count: exams.length },
    { id: 'colleges', label: 'Institutions', count: colleges.length },
  ]

  const maxCount = Math.max(...rawItems.map((i) => i.count), 1)
  const totalItems = rawItems.reduce((acc, curr) => acc + curr.count, 0)

  const items: CatalogDomainItem[] = rawItems.map((item) => ({
    id: item.id,
    label: item.label,
    count: item.count,
    percentageOfMax: Math.round((item.count / maxCount) * 100),
  }))

  return { items, totalItems }
}



 
export function getContentCompleteness(): {
  items: ContentCompletenessItem[]
  overallCompleted: number
  overallTotal: number
  overallPercentage: number
} {
  const collegeDetailCount = colleges.filter((c) => !!getCollegeDetail(c.slug)).length
  const courseDetailCount = courses.filter((c) => !!getCourseDetail(c.slug)).length
  const scholarshipDetailCount = scholarships.filter((s) => !!getScholarshipDetail(s.slug)).length
  const tutorDetailCount = tutors.filter((t) => t.hasDetailPage).length
  const coachingDetailCount = coachingProviders.filter((c) => c.hasDetailPage).length
  const examDetailCount = exams.filter((e) => e.hasDetailPage).length

  const items: ContentCompletenessItem[] = [
    {
      id: 'institutions',
      label: 'Institutions',
      completedCount: collegeDetailCount,
      totalCount: colleges.length,
      percentage: Math.round((collegeDetailCount / colleges.length) * 100),
      exampleNote: 'IIT Delhi complete',
    },
    {
      id: 'courses',
      label: 'Courses',
      completedCount: courseDetailCount,
      totalCount: courses.length,
      percentage: Math.round((courseDetailCount / courses.length) * 100),
      exampleNote: 'B.Tech CS complete',
    },
    {
      id: 'scholarships',
      label: 'Scholarships',
      completedCount: scholarshipDetailCount,
      totalCount: scholarships.length,
      percentage: Math.round((scholarshipDetailCount / scholarships.length) * 100),
      exampleNote: 'AICTE Pragati complete',
    },
    {
      id: 'tutors',
      label: 'Tutors',
      completedCount: tutorDetailCount,
      totalCount: tutors.length,
      percentage: Math.round((tutorDetailCount / tutors.length) * 100),
      exampleNote: '4 profiles complete',
    },
    {
      id: 'coaching',
      label: 'Coaching',
      completedCount: coachingDetailCount,
      totalCount: coachingProviders.length,
      percentage: Math.round((coachingDetailCount / coachingProviders.length) * 100),
      exampleNote: 'Apex JEE Academy complete',
    },
    {
      id: 'exams',
      label: 'Exams',
      completedCount: examDetailCount,
      totalCount: exams.length,
      percentage: Math.round((examDetailCount / exams.length) * 100),
      exampleNote: 'JEE Main complete',
    },
  ]

  const overallCompleted =
    collegeDetailCount +
    courseDetailCount +
    scholarshipDetailCount +
    tutorDetailCount +
    coachingDetailCount +
    examDetailCount

  const overallTotal =
    colleges.length +
    courses.length +
    scholarships.length +
    tutors.length +
    coachingProviders.length +
    exams.length

  const overallPercentage = Math.round((overallCompleted / overallTotal) * 100)

  return { items, overallCompleted, overallTotal, overallPercentage }
}



 
export function getNeedsAttentionTasks(): OperationalAttentionTask[] {
  const collegeDetailCount = colleges.filter((c) => !!getCollegeDetail(c.slug)).length
  const courseDetailCount = courses.filter((c) => !!getCourseDetail(c.slug)).length
  const missingCollegesCount = colleges.length - collegeDetailCount
  const missingCoursesCount = courses.length - courseDetailCount
  const tutorsUsingAvatarFallback = tutors.filter((t) => !t.portrait).length

  return [
    {
      id: 'incomplete-college-profiles',
      title: `${missingCollegesCount} institutions need a full profile`,
      description: 'Colleges have active catalog listings; comprehensive campus profile modules remain to be authored.',
      severity: 'warning',
      badgeText: `${missingCollegesCount} incomplete`,
      actionLabel: 'Review in Institutions',
    },
    {
      id: 'incomplete-course-curriculum',
      title: `${missingCoursesCount} courses need syllabus and curriculum`,
      description: 'Program catalog outlines are active; structured semester curriculum and detailed syllabus topics remain to be added.',
      severity: 'warning',
      badgeText: `${missingCoursesCount} incomplete`,
      actionLabel: 'Review in Programs',
    },
    {
      id: 'tutor-portrait-assets',
      title: `${tutorsUsingAvatarFallback} tutors need a photo`,
      description: 'Educator profiles are currently using fallback avatars until photographic assets are linked.',
      severity: 'info',
      badgeText: `${tutorsUsingAvatarFallback} pending`,
      actionLabel: 'Review in Tutors',
    },
    {
      id: 'enquiry-crm-pipeline',
      title: 'Enquiry tracking is not connected yet',
      description: 'Student counselling and enquiry submissions are currently in UI prototype state without active persistence.',
      severity: 'neutral',
      badgeText: 'Not connected',
      actionLabel: 'Configure in Enquiries',
    },
  ]
}



 

export const adminNavigationGroups: AdminNavGroup[] = [
  { id: 'overview', title: 'Overview', items: [{ id: 'dashboard', label: 'Dashboard', href: '/admin', icon: 'LayoutDashboard', available: true }] },
  {
    id: 'catalogue',
    title: 'Catalogue',
    items: [
      { id: 'institutions', label: 'Institutions', href: '/admin/institutions', icon: 'GraduationCap', available: true },
      { id: 'programs', label: 'Courses', href: '/admin/programs', icon: 'BookOpen', available: true },
      { id: 'admissions', label: 'Admissions & fees', href: '/admin/admissions-fees', icon: 'Banknote', available: true },
      { id: 'exams', label: 'Exams', href: '/admin/exams', icon: 'ClipboardList', available: true },
      { id: 'scholarships', label: 'Scholarships', href: '/admin/scholarships', icon: 'Award', available: true },
      { id: 'streams', label: 'Streams', href: '/admin/streams', icon: 'Compass', available: true },
    ],
  },
  {
    id: 'people',
    title: 'People',
    items: [
      { id: 'students', label: 'Students', href: '/admin/students', icon: 'UserCheck', available: true },
      { id: 'tutors', label: 'Tutors & coaching', href: '/admin/tutors-coaching', icon: 'Users', available: true },
      { id: 'tutor-reviews', label: 'Tutor reviews', href: '/admin/tutor-accounts', icon: 'ShieldCheck', available: true },
      { id: 'enquiries', label: 'Enquiries', href: '/admin/enquiries', icon: 'Inbox', available: true },
      { id: 'reviews', label: 'Reviews', href: '/admin/reviews', icon: 'MessageSquare', available: true },
    ],
  },
  {
    id: 'content',
    title: 'Content',
    items: [
      { id: 'content', label: 'Articles', href: '/admin/content', icon: 'FileText', available: true },
      { id: 'notes', label: 'Notes', href: '/admin/notes', icon: 'BookMarked', available: true },
      { id: 'banners', label: 'Banners', href: '/admin/banners', icon: 'Image', available: true },
      { id: 'featured', label: 'Featured listings', href: '/admin/promotions', icon: 'Sparkles', available: true },
      { id: 'seo', label: 'SEO', href: '/admin/seo', icon: 'SearchCode', available: true },
    ],
  },
  {
    id: 'insights',
    title: 'Insights',
    items: [
      { id: 'reports', label: 'Reports', href: '/admin/reports', icon: 'BarChart3', available: true },
      { id: 'activity', label: 'Activity log', href: '/admin/activity', icon: 'History', available: true },
    ],
  },
  {
    id: 'workspace',
    title: 'Workspace',
    items: [
      { id: 'team', label: 'Team & access', href: '/admin/team', icon: 'ShieldCheck', available: true },
      { id: 'settings', label: 'Settings', href: '/admin/settings', icon: 'Settings', available: true },
    ],
  },
]

export function findAdminNavItem(pathname: string) {
  for (const group of adminNavigationGroups) {
    for (const item of group.items) {
      if (item.href === '/admin' ? pathname === '/admin' : pathname === item.href || pathname.startsWith(`${item.href}/`)) {
        const rest = pathname.slice(item.href.length)
        const kind: 'index' | 'new' | 'edit' | 'detail' = !rest || rest === '/' ? 'index' : rest.endsWith('/new') ? 'new' : rest.endsWith('/edit') ? 'edit' : 'detail'
        return { group, item, kind }
      }
    }
  }
  return null
}
