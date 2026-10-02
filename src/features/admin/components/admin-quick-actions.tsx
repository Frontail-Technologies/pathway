import Link from 'next/link'
import { GraduationCap, BookOpen, Award, Users, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type QuickActionItem = {
  id: string
  label: string
  description: string
  icon: LucideIcon
  href?: string
  available: boolean
  badge?: string
}

const quickActionItems: QuickActionItem[] = [
  {
    id: 'institutions',
    label: 'Manage Institutions',
    description: 'Colleges, universities & campus profiles',
    icon: GraduationCap,
    href: '/admin/institutions',
    available: true,
  },
  {
    id: 'courses',
    label: 'Manage Courses',
    description: 'Degree taxonomy, streams & eligibility',
    icon: BookOpen,
    href: '/admin/programs',
    available: true,
  },
  {
    id: 'scholarships',
    label: 'Manage Scholarships',
    description: 'Financial aid programs & deadlines',
    icon: Award,
    href: '/admin/scholarships',
    available: true,
  },
  {
    id: 'tutors-coaching',
    label: 'Manage Tutors & Coaching',
    description: 'Educator profiles & coaching institutes',
    icon: Users,
    href: '/admin/tutors-coaching',
    available: true,
  },
]

export function AdminQuickActions() {
  return (
    <div className="flex flex-1 flex-col gap-2">
      {quickActionItems.map((item) => {
        const Icon = item.icon

        if (item.available && item.href) {
          return (
            <Link
              key={item.id}
              href={item.href}
              className="group flex w-full items-center justify-between gap-3 rounded-lg bg-muted/40 p-2.5 text-left transition-colors hover:bg-muted/70 outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-8 h-8 rounded-lg bg-card shadow-xs flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0"
                  aria-hidden="true"
                >
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {item.label}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <Badge variant="info" size="xs">
                  Active
                </Badge>
              </div>
            </Link>
          )
        }

        return (
          <div
            key={item.id}
              className="flex w-full items-center justify-between gap-3 rounded-lg bg-muted/40 p-2.5 text-left transition-colors hover:bg-muted/70 opacity-90 cursor-default"
            aria-disabled="true"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-8 h-8 rounded-lg bg-card shadow-xs flex items-center justify-center text-muted-foreground shrink-0"
                aria-hidden="true"
              >
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-xs font-semibold text-foreground truncate">
                {item.label}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <Badge variant="muted" size="xs">
                {item.badge}
              </Badge>
            </div>
          </div>
        )
      })}
    </div>
  )
}
