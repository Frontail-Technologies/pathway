import type { AdminStudent } from '@/features/admin/data/admin-students'

export function StudentOverviewSection({ student }: { student: AdminStudent }) {
  return (
    <div className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4">
      <h2 className="text-base font-bold font-heading text-foreground">
        Profile Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
          <span className="text-muted-foreground font-medium block">Full Name</span>
          <span className="text-sm font-semibold text-foreground block">{student.name}</span>
        </div>

        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
          <span className="text-muted-foreground font-medium block">Email Address</span>
          <span className="text-sm font-semibold text-foreground block break-all">{student.email}</span>
        </div>

        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
          <span className="text-muted-foreground font-medium block">Phone Number</span>
          <span className="text-sm font-semibold text-foreground block">
            {student.phone || <span className="text-muted-foreground font-normal">Not provided</span>}
          </span>
        </div>

        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
          <span className="text-muted-foreground font-medium block">City / Location</span>
          <span className="text-sm font-semibold text-foreground block">
            {student.city || <span className="text-muted-foreground font-normal">Not provided</span>}
          </span>
        </div>
      </div>
    </div>
  )
}
