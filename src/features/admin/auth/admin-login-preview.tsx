import { getAdminCoachingProviders } from '../data/admin-coaching'
import { getAdminInstitutions } from '../data/admin-institutions'
import { getAdminPrograms } from '../data/admin-programs'
import { getAdminScholarships } from '../data/admin-scholarships'
import { getNeedsAttentionTasks } from '../data/admin-stats'
import { getAdminTutors } from '../data/admin-tutors'
import { StatusBadge } from '../components/kit'

/**
 * Right-hand panel on the admin sign-in page: a static preview of the real dashboard (live counts from the
 * catalogue), so the page shows what staff are signing in to instead of decorative art. Hidden from screen readers.
 */
export function AdminLoginPreview() {
  const stats = [
    { label: 'Institutions', value: getAdminInstitutions().length },
    { label: 'Courses', value: getAdminPrograms().length },
    { label: 'Scholarships', value: getAdminScholarships().length },
    { label: 'Tutors & coaching', value: getAdminTutors().length + getAdminCoachingProviders().length },
  ]
  const tasks = getNeedsAttentionTasks().slice(0, 3)

  return (
    <aside className="relative hidden overflow-hidden border-l border-border bg-accent lg:flex lg:flex-col lg:justify-center" aria-hidden="true">
      <div className="px-12 xl:px-16">
        <p className="max-w-md font-heading text-[28px] leading-tight font-bold tracking-tight text-foreground">Keep the catalogue accurate.</p>
        <p className="mt-2 max-w-md text-[15px] text-muted-foreground">Colleges, courses, fees, exams and enquiries, in one place.</p>
      </div>

      <div className="mt-10 ml-12 overflow-hidden rounded-l-xl border border-r-0 border-border bg-background shadow-[0_24px_48px_-24px_rgba(15,23,42,0.25)] xl:ml-16">
        <div className="flex h-10 items-center gap-2 border-b border-border bg-card px-4">
          <span className="font-heading text-sm font-extrabold">Pathway</span>
          <span className="text-xs text-muted-foreground">Admin</span>
          <span className="ml-6 text-xs font-medium text-foreground">Dashboard</span>
        </div>
        <div className="space-y-4 p-5">
          <div className="grid grid-cols-4 gap-2.5">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border bg-card p-3">
                <p className="truncate text-[11px] font-medium text-muted-foreground">{stat.label}</p>
                <p className="mt-0.5 font-heading text-xl font-bold tabular-nums">{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-border bg-card">
            <p className="border-b border-border px-4 py-2.5 text-[13px] font-semibold">Needs attention</p>
            <ul className="divide-y divide-border">
              {tasks.map((task) => (
                <li key={task.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <span className="truncate text-[13px] text-foreground">{task.title}</span>
                  <StatusBadge tone={task.severity === 'warning' ? 'warning' : task.severity === 'info' ? 'info' : 'neutral'}>{task.badgeText}</StatusBadge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  )
}
