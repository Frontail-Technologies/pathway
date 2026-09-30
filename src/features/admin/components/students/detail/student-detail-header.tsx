import Link from 'next/link'
import {
  type AdminStudent,
  initialsOf,
} from '@/features/admin/data/admin-students'
import { StudentStatusBadge } from '../shared/student-status-badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import { ChevronLeft, Edit, ExternalLink, MapPin, Mail } from 'lucide-react'

export function StudentDetailHeader({ student }: { student: AdminStudent }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link
          href="/admin/students"
          className={buttonVariants({
            variant: 'ghost',
            size: 'sm',
            className: 'text-xs text-muted-foreground hover:text-foreground gap-1.5 px-2.5',
          })}
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Students
        </Link>
      </div>

      <div className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <Avatar size="lg" className="bg-primary/10 text-primary font-bold shrink-0">
              <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">
                {initialsOf(student.name)}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
                  {student.name}
                </h1>
                <StudentStatusBadge status={student.accountStatus} />
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-muted-foreground/80" />
                  <span>{student.email}</span>
                </div>
                {student.city && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground/80" />
                    <span>{student.city}</span>
                  </div>
                )}
                <span className="text-muted-foreground/50">•</span>
                <span>ID: {student.id}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
            <Link
              href={`/admin/students/${student.id}/edit`}
              className={buttonVariants({
                size: 'sm',
                className: 'text-xs font-semibold gap-1.5 shadow-2xs',
              })}
            >
              <Edit className="w-3.5 h-3.5" />
              Edit Student
            </Link>
            <Link
              href="/student"
              className={buttonVariants({
                variant: 'outline',
                size: 'sm',
                className: 'text-xs font-semibold gap-1.5 shadow-2xs',
              })}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open Demo Student Space
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
