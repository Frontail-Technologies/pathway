'use client'

import Link from 'next/link'
import { Award, BarChart3, BookOpen, Briefcase, ChevronDown, FileText, Globe, Landmark, Library, Newspaper, Scale, Target } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const discover = [
  { label: 'Colleges', href: '/colleges', icon: Landmark },
  { label: 'Courses', href: '/courses', icon: BookOpen },
  { label: 'Exams', href: '/exams', icon: FileText },
  { label: 'Scholarships', href: '/scholarships', icon: Award },
  { label: 'Study abroad', href: '/study-abroad', icon: Globe },
  { label: 'Careers', href: '/careers', icon: Briefcase },
  { label: 'Articles & news', href: '/articles', icon: Newspaper },
  { label: 'Notes & resources', href: '/notes', icon: Library },
]

const tools = [
  { label: 'College predictor', href: '/college-predictor', icon: Target },
  { label: 'Rank predictor', href: '/rank-predictor', icon: BarChart3 },
  { label: 'Compare colleges', href: '/compare/colleges', icon: Scale },
]

export function ExploreMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-3 text-[15px] font-semibold text-white outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70 data-[popup-open]:bg-white/12">
        Explore
        <ChevronDown className="size-4" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={10} className="w-64 p-1.5">
        <DropdownMenuLabel className="text-xs text-muted-foreground">Discover</DropdownMenuLabel>
        {discover.map((item) => (
          <DropdownMenuItem key={item.href} render={<Link href={item.href} />} className="h-9 gap-2.5 text-sm">
            <item.icon className="size-4 text-primary" aria-hidden="true" />
            {item.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs text-muted-foreground">Tools</DropdownMenuLabel>
        {tools.map((item) => (
          <DropdownMenuItem key={item.href} render={<Link href={item.href} />} className="h-9 gap-2.5 text-sm">
            <item.icon className="size-4 text-primary" aria-hidden="true" />
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
