import {
  Award,
  Banknote,
  BarChart3,
  BookMarked,
  BookOpen,
  ClipboardList,
  Compass,
  Database,
  FileText,
  GraduationCap,
  History,
  Image,
  Inbox,
  LayoutDashboard,
  MessageSquare,
  SearchCode,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  type LucideIcon,
} from 'lucide-react'

export type AdminModuleGroup = 'overview' | 'catalogue' | 'people' | 'content' | 'insights' | 'workspace'

export type AdminModuleChild = { label: string; href: string; match: (pathname: string, search: string) => boolean }

export type AdminModule = {
  id: string
  label: string
  href: string
  icon: LucideIcon
  group: AdminModuleGroup
  description: string
  badge?: 'enquiries' | 'tutorReviews'
  status?: 'soon'
  children?: AdminModuleChild[]
  create?: { label: string; href: string }
}

export const adminModuleGroups: { id: AdminModuleGroup; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'catalogue', label: 'Catalogue' },
  { id: 'people', label: 'People' },
  { id: 'content', label: 'Content' },
  { id: 'insights', label: 'Insights' },
  { id: 'workspace', label: 'Workspace' },
]

const tab = (value: string) => (pathname: string, search: string) => pathname === '/admin/tutors-coaching' && (new URLSearchParams(search).get('tab') ?? 'tutors') === value

export const adminModules: AdminModule[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/admin', icon: LayoutDashboard, group: 'overview', description: 'Catalogue health and what needs attention.' },
  { id: 'institutions', label: 'Institutions', href: '/admin/institutions', icon: GraduationCap, group: 'catalogue', description: 'Colleges and universities.', create: { label: 'Institution', href: '/admin/institutions/new' } },
  { id: 'programs', label: 'Courses', href: '/admin/programs', icon: BookOpen, group: 'catalogue', description: 'Degrees and programmes.', create: { label: 'Course', href: '/admin/programs/new' } },
  { id: 'admissions', label: 'Admissions & fees', href: '/admin/admissions-fees', icon: Banknote, group: 'catalogue', description: 'What each institution offers, with fees and admission steps.', create: { label: 'Offering', href: '/admin/admissions-fees/new' } },
  { id: 'exams', label: 'Exams', href: '/admin/exams', icon: ClipboardList, group: 'catalogue', description: 'Entrance exams.', create: { label: 'Exam', href: '/admin/exams/new' } },
  { id: 'scholarships', label: 'Scholarships', href: '/admin/scholarships', icon: Award, group: 'catalogue', description: 'Scholarships and fee waivers.', create: { label: 'Scholarship', href: '/admin/scholarships/new' } },
  { id: 'streams', label: 'Streams', href: '/admin/streams', icon: Compass, group: 'catalogue', description: 'Stream hubs on the public site.' },
  { id: 'students', label: 'Students', href: '/admin/students', icon: UserCheck, group: 'people', description: 'Student accounts.' },
  {
    id: 'tutors',
    label: 'Tutors & coaching',
    href: '/admin/tutors-coaching',
    icon: Users,
    group: 'people',
    description: 'Individual tutors and coaching providers.',
    children: [
      { label: 'Tutors', href: '/admin/tutors-coaching?tab=tutors', match: tab('tutors') },
      { label: 'Coaching providers', href: '/admin/tutors-coaching?tab=coaching', match: tab('coaching') },
    ],
    create: { label: 'Tutor', href: '/admin/tutors-coaching/tutors/new' },
  },
  { id: 'tutor-reviews', label: 'Tutor reviews', href: '/admin/tutor-accounts', icon: ShieldCheck, group: 'people', description: 'Profiles submitted from Tutor Space.', badge: 'tutorReviews' },
  { id: 'enquiries', label: 'Enquiries', href: '/admin/enquiries', icon: Inbox, group: 'people', description: 'Leads from the website and app.', badge: 'enquiries' },
  { id: 'reviews', label: 'Reviews', href: '/admin/reviews', icon: MessageSquare, group: 'people', description: 'Review moderation.' },
  { id: 'content', label: 'Articles', href: '/admin/content', icon: FileText, group: 'content', description: 'Articles, guides and explainers.', create: { label: 'Article', href: '/admin/content/new' } },
  { id: 'notes', label: 'Notes', href: '/admin/notes', icon: BookMarked, group: 'content', description: 'Study notes for sale or free.', create: { label: 'Note', href: '/admin/notes/new' } },
  { id: 'banners', label: 'Banners', href: '/admin/banners', icon: Image, group: 'content', description: 'Scheduled banners.', create: { label: 'Banner', href: '/admin/banners/new' } },
  { id: 'featured', label: 'Featured listings', href: '/admin/promotions', icon: Sparkles, group: 'content', description: 'Featured and sponsored placements.' },
  { id: 'seo', label: 'SEO', href: '/admin/seo', icon: SearchCode, group: 'content', description: 'Metadata overrides for public pages.' },
  { id: 'reports', label: 'Reports', href: '/admin/reports', icon: BarChart3, group: 'insights', description: 'Catalogue and operations reports.' },
  { id: 'activity', label: 'Activity log', href: '/admin/activity', icon: History, group: 'insights', description: 'Every change, by whom and when.' },
  { id: 'master-data', label: 'Master data', href: '/admin/master-data', icon: Database, group: 'workspace', description: 'Taxonomy terms, aliases, states and cities.' },
  { id: 'team', label: 'Team & access', href: '/admin/team', icon: ShieldCheck, group: 'workspace', description: 'Staff accounts, invitations and roles.' },
  { id: 'settings', label: 'Settings', href: '/admin/settings', icon: Settings, group: 'workspace', description: 'Workspace settings.', status: 'soon' },
]

export const adminQuickAdd = adminModules.flatMap((module) => (module.create ? [{ id: module.id, ...module.create, icon: module.icon }] : []))

export type AdminRouteKind = 'index' | 'new' | 'edit' | 'detail'

export type AdminRouteMatch = { module: AdminModule; child?: AdminModuleChild; kind: AdminRouteKind }

export function matchAdminRoute(pathname: string, search = ''): AdminRouteMatch | null {
  const module = adminModules
    .filter((entry) => (entry.href === '/admin' ? pathname === '/admin' : pathname === entry.href || pathname.startsWith(`${entry.href}/`)))
    .sort((a, b) => b.href.length - a.href.length)[0]
  if (!module) return null
  const rest = pathname.slice(module.href.length)
  const kind: AdminRouteKind = !rest || rest === '/' ? 'index' : rest.endsWith('/new') ? 'new' : rest.endsWith('/edit') ? 'edit' : 'detail'
  const child = module.children?.find((entry) => entry.match(pathname, search))
  return { module, child, kind }
}

export const adminRouteKindLabel: Record<Exclude<AdminRouteKind, 'index'>, string> = { new: 'New', edit: 'Edit', detail: 'Details' }
