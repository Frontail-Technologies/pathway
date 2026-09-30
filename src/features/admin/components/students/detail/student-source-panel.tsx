import type { AdminStudent } from '@/features/admin/data/admin-students'
import { Lock } from 'lucide-react'

export function StudentSourcePanel({ student }: { student: AdminStudent }) {
  return (
    <div className="bg-card rounded-xl p-5 shadow-xs border-0 space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Data Source & Privacy
      </h3>

      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between py-1">
          <span className="text-muted-foreground">Source</span>
          <span className="font-semibold text-foreground">{student.dataSource}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-t border-border/60">
          <span className="text-muted-foreground">Classification</span>
          <div className="flex items-center gap-1.5 font-semibold text-foreground">
            <Lock className="w-3.5 h-3.5 text-purple-600" />
            <span>Private Student Profile</span>
          </div>
        </div>

        <div className="flex items-center justify-between py-1 border-t border-border/60">
          <span className="text-muted-foreground">Data Access</span>
          <span className="font-semibold text-foreground">Account data only</span>
        </div>
      </div>
    </div>
  )
}
