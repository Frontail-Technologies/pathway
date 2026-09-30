'use client'

import Link from 'next/link'
import { Shield, ChevronDown, ExternalLink, GraduationCap } from 'lucide-react'
import { AdminMobileNav } from './admin-mobile-nav'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { usePathname } from 'next/navigation'

function getAdminRouteMeta(pathname: string): { title: string; section?: string } {
  if (pathname === '/admin/institutions') {
    return { title: 'Institutions', section: 'Institutions' }
  }
  if (pathname.startsWith('/admin/institutions/')) {
    return { title: 'Institution Details', section: 'Institutions' }
  }
  if (pathname === '/admin/programs') {
    return { title: 'Programs & Courses', section: 'Programs & Courses' }
  }
  if (pathname === '/admin/programs/new') {
    return { title: 'Create Program', section: 'Programs & Courses' }
  }
  if (pathname.endsWith('/edit') && pathname.startsWith('/admin/programs/')) {
    return { title: 'Edit Program', section: 'Programs & Courses' }
  }
  if (pathname.startsWith('/admin/programs/')) {
    return { title: 'Program Details', section: 'Programs & Courses' }
  }
  if (pathname === '/admin/admissions-fees') {
    return { title: 'Admissions & Fees', section: 'Admissions & Fees' }
  }
  if (pathname === '/admin/admissions-fees/new') {
    return { title: 'Create Offering', section: 'Admissions & Fees' }
  }
  if (pathname.endsWith('/edit') && pathname.startsWith('/admin/admissions-fees/')) {
    return { title: 'Edit Offering', section: 'Admissions & Fees' }
  }
  if (pathname.startsWith('/admin/admissions-fees/')) {
    return { title: 'Offering Details', section: 'Admissions & Fees' }
  }
  if (pathname === '/admin/scholarships') {
    return { title: 'Scholarships', section: 'Scholarships' }
  }
  if (pathname === '/admin/scholarships/new') {
    return { title: 'Create Scholarship', section: 'Scholarships' }
  }
  if (pathname.endsWith('/edit') && pathname.startsWith('/admin/scholarships/')) {
    return { title: 'Edit Scholarship', section: 'Scholarships' }
  }
  if (pathname.startsWith('/admin/scholarships/')) {
    return { title: 'Scholarship Details', section: 'Scholarships' }
  }
  if (pathname === '/admin/tutors-coaching') {
    return { title: 'Tutors & Coaching', section: 'Tutors & Coaching' }
  }
  if (pathname === '/admin/tutors-coaching/tutors/new') {
    return { title: 'Create Tutor', section: 'Tutors & Coaching' }
  }
  if (pathname.endsWith('/edit') && pathname.startsWith('/admin/tutors-coaching/tutors/')) {
    return { title: 'Edit Tutor', section: 'Tutors & Coaching' }
  }
  if (pathname.startsWith('/admin/tutors-coaching/tutors/')) {
    return { title: 'Tutor Details', section: 'Tutors & Coaching' }
  }
  if (pathname === '/admin/tutors-coaching/coaching/new') {
    return { title: 'Create Coaching Provider', section: 'Tutors & Coaching' }
  }
  if (pathname.endsWith('/edit') && pathname.startsWith('/admin/tutors-coaching/coaching/')) {
    return { title: 'Edit Coaching Provider', section: 'Tutors & Coaching' }
  }
  if (pathname.startsWith('/admin/tutors-coaching/coaching/')) {
    return { title: 'Coaching Details', section: 'Tutors & Coaching' }
  }
  if (pathname === '/admin/students') {
    return { title: 'Students', section: 'Students' }
  }
  if (pathname.startsWith('/admin/students/')) {
    return { title: 'Student Details', section: 'Students' }
  }
  if (pathname === '/admin/enquiries') {
    return { title: 'Enquiries & Leads', section: 'Enquiries & Leads' }
  }
  if (pathname.startsWith('/admin/enquiries/')) {
    return { title: 'Enquiry Details', section: 'Enquiries & Leads' }
  }
  if (pathname === '/admin/reviews') {
    return { title: 'Reviews', section: 'Reviews' }
  }
  if (pathname.startsWith('/admin/reviews/')) {
    return { title: 'Review Details', section: 'Reviews' }
  }
  if (pathname === '/admin/promotions') {
    return { title: 'Featured / Sponsored', section: 'Featured / Sponsored' }
  }
  if (pathname === '/admin/promotions/new') {
    return { title: 'Create Placement', section: 'Featured / Sponsored' }
  }
  if (pathname.endsWith('/edit') && pathname.startsWith('/admin/promotions/')) {
    return { title: 'Edit Placement', section: 'Featured / Sponsored' }
  }
  if (pathname.startsWith('/admin/promotions/')) {
    return { title: 'Placement Details', section: 'Featured / Sponsored' }
  }
  if (pathname === '/admin/content') {
    return { title: 'Articles & Content', section: 'Articles & Content' }
  }
  if (pathname === '/admin/content/new') {
    return { title: 'Create Content', section: 'Articles & Content' }
  }
  if (pathname.endsWith('/edit') && pathname.startsWith('/admin/content/')) {
    return { title: 'Edit Content', section: 'Articles & Content' }
  }
  if (pathname.startsWith('/admin/content/')) {
    return { title: 'Content Details', section: 'Articles & Content' }
  }
  if (pathname === '/admin/banners') {
    return { title: 'Banners', section: 'Banners' }
  }
  if (pathname === '/admin/banners/new') {
    return { title: 'Create Banner', section: 'Banners' }
  }
  if (pathname.endsWith('/edit') && pathname.startsWith('/admin/banners/')) {
    return { title: 'Edit Banner', section: 'Banners' }
  }
  if (pathname.startsWith('/admin/banners/')) {
    return { title: 'Banner Details', section: 'Banners' }
  }
  if (pathname === '/admin/notes') {
    return { title: 'Notes & Study Material', section: 'Notes & Study Material' }
  }
  if (pathname === '/admin/notes/new') {
    return { title: 'Create Study Note', section: 'Notes & Study Material' }
  }
  if (pathname.endsWith('/edit') && pathname.startsWith('/admin/notes/')) {
    return { title: 'Edit Study Note', section: 'Notes & Study Material' }
  }
  if (pathname.startsWith('/admin/notes/')) {
    return { title: 'Note Details', section: 'Notes & Study Material' }
  }
  if (pathname === '/admin/seo') {
    return { title: 'SEO Metadata', section: 'SEO Metadata' }
  }
  if (pathname === '/admin/seo/new') {
    return { title: 'Create SEO Override', section: 'SEO Metadata' }
  }
  if (pathname.endsWith('/edit') && pathname.startsWith('/admin/seo/')) {
    return { title: 'Edit SEO Override', section: 'SEO Metadata' }
  }
  if (pathname.startsWith('/admin/seo/')) {
    return { title: 'SEO Details', section: 'SEO Metadata' }
  }
  if (pathname === '/admin/reports') {
    return { title: 'Reports', section: 'Insights' }
  }
  return { title: 'Admin Dashboard' }
}

export function AdminTopbar() {
  const pathname = usePathname()
  const meta = getAdminRouteMeta(pathname)

  return (
    <header className="sticky top-0 z-30 h-16 bg-card border-b border-border flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <AdminMobileNav />
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground hidden sm:inline">
            Console
          </span>
          <span className="text-xs text-muted-foreground/60 hidden sm:inline">/</span>
          {meta.section && meta.section !== meta.title && (
            <>
              <span className="text-xs font-semibold text-muted-foreground hidden sm:inline">
                {meta.section}
              </span>
              <span className="text-xs text-muted-foreground/60 hidden sm:inline">/</span>
            </>
          )}
          <span className="text-sm font-bold text-foreground">
            {meta.title}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Badge
          variant="secondary"
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-primary/10 text-primary border-0"
        >
          <Shield className="w-3.5 h-3.5" />
          Demo Admin
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-lg hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                aria-label="Admin account menu"
              />
            }
          >
            <Avatar size="sm" className="bg-primary text-primary-foreground font-bold">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                A
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-foreground leading-tight">
                Admin
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight">
                Demo Mode
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden md:block" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 p-1.5">
            <DropdownMenuLabel className="px-2.5 py-2">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground">
                  Demo Administrator
                </span>
                <span className="text-[11px] text-muted-foreground font-normal mt-0.5">
                  Local frontend session
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <div className="px-2.5 py-1.5 text-[11px] text-muted-foreground leading-normal">
              No backend authentication is connected. All statistics reflect static fixture datasets.
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="p-0 focus:bg-transparent">
              <Link
                href="/"
                className="w-full flex items-center justify-between px-2.5 py-2 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Public Portal</span>
                </div>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="p-0 focus:bg-transparent">
              <Link
                href="/student"
                className="w-full flex items-center justify-between px-2.5 py-2 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Student Space</span>
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
