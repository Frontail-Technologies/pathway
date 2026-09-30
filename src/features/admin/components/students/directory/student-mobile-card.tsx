import Link from 'next/link'
import {
  type AdminStudent,
  initialsOf,
} from '@/features/admin/data/admin-students'
import { StudentStatusBadge } from '../shared/student-status-badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { buttonVariants } from '@/components/ui/button'
import { Edit, Eye } from 'lucide-react'

export function StudentMobileCard({ student }: { student: AdminStudent }) {
  return (
    <div className="bg-card rounded-xl p-4 border border-border/80 shadow-xs space-y-3.5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar size="default" className="bg-primary/10 text-primary font-bold shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
              {initialsOf(student.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <Link
              href={`/admin/students/${student.id}`}
              className="text-sm font-bold text-foreground hover:text-primary transition-colors block truncate"
            >
              {student.name}
            </Link>
            <p className="text-xs text-muted-foreground truncate">{student.email}</p>
          </div>
        </div>
        <StudentStatusBadge status={student.accountStatus} />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-border/60">
        <div>
          <span className="text-[11px] text-muted-foreground block">Study Level</span>
          <span className="font-semibold text-foreground">{student.studyLevel || '—'}</span>
        </div>
        <div>
          <span className="text-[11px] text-muted-foreground block">Stream</span>
          <span className="font-semibold text-foreground truncate block">{student.stream || '—'}</span>
        </div>
      </div>

      {student.preferredExams && student.preferredExams.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-muted-foreground">Exams:</span>
          {student.preferredExams.map((exam) => (
            <span
              key={exam}
              className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted text-foreground"
            >
              {exam}
            </span>
          ))}
        </div>
      )}

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Profile Completion</span>
          <span className="font-bold text-foreground">{student.profileCompletion.percent}%</span>
        </div>
        <Progress value={student.profileCompletion.percent} className="h-1.5" />
      </div>

      <div className="flex items-center gap-2 pt-1">
        <Link
          href={`/admin/students/${student.id}`}
          className={buttonVariants({
            variant: 'outline',
            size: 'sm',
            className: 'flex-1 text-xs font-semibold gap-1.5',
          })}
        >
          <Eye className="w-3.5 h-3.5" />
          View Details
        </Link>
        <Link
          href={`/admin/students/${student.id}/edit`}
          className={buttonVariants({
            variant: 'ghost',
            size: 'sm',
            className: 'text-xs font-medium text-muted-foreground hover:text-foreground gap-1.5',
          })}
        >
          <Edit className="w-3.5 h-3.5" />
          Edit
        </Link>
      </div>
    </div>
  )
}
