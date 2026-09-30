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
import { getLeadPipelineStats } from '@/features/admin/data/admin-enquiries'
import type {
  AdminKPI,
  AdminNavGroup,
  CatalogDomainItem,
  ContentCompletenessItem,
  LeadPipelineStage,
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
      label: 'Institution Profiles',
      completedCount: collegeDetailCount,
      totalCount: colleges.length,
      percentage: Math.round((collegeDetailCount / colleges.length) * 100),
      exampleNote: 'IIT Delhi complete',
    },
    {
      id: 'courses',
      label: 'Course Details',
      completedCount: courseDetailCount,
      totalCount: courses.length,
      percentage: Math.round((courseDetailCount / courses.length) * 100),
      exampleNote: 'B.Tech CS complete',
    },
    {
      id: 'scholarships',
      label: 'Scholarship Details',
      completedCount: scholarshipDetailCount,
      totalCount: scholarships.length,
      percentage: Math.round((scholarshipDetailCount / scholarships.length) * 100),
      exampleNote: 'AICTE Pragati complete',
    },
    {
      id: 'tutors',
      label: 'Tutor Profiles',
      completedCount: tutorDetailCount,
      totalCount: tutors.length,
      percentage: Math.round((tutorDetailCount / tutors.length) * 100),
      exampleNote: '4 profiles complete',
    },
    {
      id: 'coaching',
      label: 'Coaching Profiles',
      completedCount: coachingDetailCount,
      totalCount: coachingProviders.length,
      percentage: Math.round((coachingDetailCount / coachingProviders.length) * 100),
      exampleNote: 'Apex JEE Academy complete',
    },
    {
      id: 'exams',
      label: 'Exam Guides',
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
      title: `${missingCollegesCount} Institution profiles pending full detail content`,
      description: 'Colleges have active catalog listings; comprehensive campus profile modules remain to be authored.',
      severity: 'warning',
      badgeText: `${missingCollegesCount} Incomplete`,
      actionLabel: 'Review in Institutions',
    },
    {
      id: 'incomplete-course-curriculum',
      title: `${missingCoursesCount} Programs pending semester curriculum and syllabus details`,
      description: 'Program catalog outlines are active; structured semester curriculum and detailed syllabus topics remain to be added.',
      severity: 'warning',
      badgeText: `${missingCoursesCount} Incomplete`,
      actionLabel: 'Review in Programs',
    },
    {
      id: 'tutor-portrait-assets',
      title: `${tutorsUsingAvatarFallback} Tutor profiles pending photographic portraits`,
      description: 'Educator profiles are currently using fallback avatars until photographic assets are linked.',
      severity: 'info',
      badgeText: `${tutorsUsingAvatarFallback} Pending`,
      actionLabel: 'Review in Tutors',
    },
    {
      id: 'enquiry-crm-pipeline',
      title: 'Enquiry CRM & Lead pipeline awaiting live connection',
      description: 'Student counselling and enquiry submissions are currently in UI prototype state without active persistence.',
      severity: 'neutral',
      badgeText: 'Pipeline Offline',
      actionLabel: 'Configure in Enquiries',
    },
  ]
}



 
export function getLeadPipelineStages(): LeadPipelineStage[] {
  const stats = getLeadPipelineStats()
  const total = Object.values(stats).reduce((a, b) => a + b, 0) || 1
  return [
    { id: 'new', label: 'New', count: stats.new, percentage: Math.round((stats.new / total) * 100) },
    { id: 'contacted', label: 'Contacted', count: stats.contacted, percentage: Math.round((stats.contacted / total) * 100) },
    { id: 'qualified', label: 'Qualified', count: stats.qualified, percentage: Math.round((stats.qualified / total) * 100) },
    { id: 'converted', label: 'Converted', count: stats.converted, percentage: Math.round((stats.converted / total) * 100) },
    { id: 'closed', label: 'Closed', count: stats.closed, percentage: Math.round((stats.closed / total) * 100) },
  ]
}

export const adminNavigationGroups: AdminNavGroup[] = [
  {
    id: 'overview',
    title: 'Overview',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        href: '/admin',
        icon: 'LayoutDashboard',
        active: true,
        available: true,
      },
    ],
  },
  {
    id: 'academic-data',
    title: 'Academic Data',
    items: [
      {
        id: 'institutions',
        label: 'Institutions',
        href: '/admin/institutions',
        icon: 'GraduationCap',
        available: true,
      },
      {
        id: 'programs',
        label: 'Programs & Courses',
        href: '/admin/programs',
        icon: 'BookOpen',
        available: true,
      },
      {
        id: 'admissions',
        label: 'Admissions & Fees',
        href: '/admin/admissions-fees',
        icon: 'Banknote',
        available: true,
      },
      {
        id: 'scholarships',
        label: 'Scholarships',
        href: '/admin/scholarships',
        icon: 'Award',
        available: true,
      },
    ],
  },
  {
    id: 'people-services',
    title: 'People & Services',
    items: [
      {
        id: 'tutors',
        label: 'Tutors & Coaching',
        href: '/admin/tutors-coaching',
        icon: 'Users',
        available: true,
      },
      {
        id: 'students',
        label: 'Students',
        href: '/admin/students',
        icon: 'UserCheck',
        available: true,
      },
      {
        id: 'enquiries',
        label: 'Enquiries & Leads',
        href: '/admin/enquiries',
        icon: 'Inbox',
        available: true,
      },
      {
        id: 'reviews',
        label: 'Reviews',
        href: '/admin/reviews',
        icon: 'MessageSquare',
        available: true,
      },
    ],
  },
  {
    id: 'content-discovery',
    title: 'Content & Discovery',
    items: [
      {
        id: 'featured',
        label: 'Featured / Sponsored',
        href: '/admin/promotions',
        icon: 'Sparkles',
        available: true,
      },
      {
        id: 'content',
        label: 'Articles & Content',
        href: '/admin/content',
        icon: 'FileText',
        available: true,
      },
      {
        id: 'banners',
        label: 'Banners',
        href: '/admin/banners',
        icon: 'Image',
        available: true,
      },
      {
        id: 'notes',
        label: 'Notes & Study Material',
        href: '/admin/notes',
        icon: 'BookMarked',
        available: true,
      },
      {
        id: 'seo',
        label: 'SEO Metadata',
        href: '/admin/seo',
        icon: 'SearchCode',
        available: true,
      },
    ],
  },
  {
    id: 'insights',
    title: 'Insights',
    items: [
      {
        id: 'reports',
        label: 'Reports',
        href: '/admin/reports',
        icon: 'BarChart3',
        available: true,
      },
    ],
  },
]
