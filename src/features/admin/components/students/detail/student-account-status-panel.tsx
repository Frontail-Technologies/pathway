import type { AdminStudent } from '@/features/admin/data/admin-students'
import { StudentStatusBadge } from '../shared/student-status-badge'

export function StudentAccountStatusPanel({ student }: { student: AdminStudent }) {
  return (
    <div className="bg-card rounded-xl p-5 shadow-xs border-0 space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Account Status
      </h3>

      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between py-1">
          <span className="text-muted-foreground">Status</span>
          <StudentStatusBadge status={student.accountStatus} />
        </div>

        <div className="flex items-center justify-between py-1 border-t border-border/60">
          <span className="text-muted-foreground">Account Type</span>
          <span className="font-semibold text-foreground">{student.accountType}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-t border-border/60">
          <span className="text-muted-foreground">Authentication</span>
          <span className="font-semibold text-foreground">Demo mode</span>
        </div>
      </div>
    </div>
  )
}
