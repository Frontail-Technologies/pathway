import Link from 'next/link'
import { type ColumnDef } from '@tanstack/react-table'
import {
  type AdminStudent,
  initialsOf,
} from '@/features/admin/data/admin-students'
import { StudentStatusBadge } from '../shared/student-status-badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Eye, ExternalLink, Edit } from 'lucide-react'

export const studentTableColumns: ColumnDef<AdminStudent>[] = [
  {
    accessorKey: 'name',
    header: 'Student',
    cell: ({ row }) => {
      const student = row.original
      return (
        <div className="flex items-center gap-3 py-1">
          <Avatar size="sm" className="bg-primary/10 text-primary font-bold">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
              {initialsOf(student.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Link
              href={`/admin/students/${student.id}`}
              className="text-sm font-semibold text-foreground hover:text-primary hover:underline transition-colors"
            >
              {student.name}
            </Link>
            <span className="text-xs text-muted-foreground">{student.email}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'studyLevel',
    header: 'Study Level',
    cell: ({ row }) => {
      const level = row.original.studyLevel
      return (
        <span className="text-xs font-medium text-foreground">
          {level || '—'}
        </span>
      )
    },
  },
  {
    accessorKey: 'stream',
    header: 'Stream / Goal',
    cell: ({ row }) => {
      const student = row.original
      return (
        <div className="flex flex-col">
          <span className="text-xs font-medium text-foreground">
            {student.stream || '—'}
          </span>
          {student.studyGoal && (
            <span className="text-[11px] text-muted-foreground">
              {student.studyGoal}
            </span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'preferredExams',
    header: 'Preferred Exams',
    cell: ({ row }) => {
      const exams = row.original.preferredExams
      if (!exams || exams.length === 0) {
        return <span className="text-xs text-muted-foreground">—</span>
      }
      return (
        <div className="flex flex-wrap gap-1">
          {exams.map((exam) => (
            <span
              key={exam}
              className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-muted text-foreground"
            >
              {exam}
            </span>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: 'profileCompletion',
    header: 'Profile Completion',
    cell: ({ row }) => {
      const completion = row.original.profileCompletion
      return (
        <div className="flex items-center gap-2.5 min-w-[130px]">
          <Progress value={completion.percent} className="h-1.5 flex-1" />
          <span className="text-xs font-semibold text-foreground shrink-0 w-8 text-right">
            {completion.percent}%
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'accountStatus',
    header: 'Account Status',
    cell: ({ row }) => {
      return <StudentStatusBadge status={row.original.accountStatus} />
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const student = row.original

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="hover:bg-muted text-muted-foreground hover:text-foreground"
                  aria-label="Student actions menu"
                />
              }
            >
              <MoreHorizontal className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-1">
              <DropdownMenuLabel className="px-2 py-1.5 text-xs text-muted-foreground font-medium">
                Student Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-0 focus:bg-transparent">
                <Link
                  href={`/admin/students/${student.id}`}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>View Student Details</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0 focus:bg-transparent">
                <Link
                  href={`/admin/students/${student.id}/edit`}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  <Edit className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Edit Student</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0 focus:bg-transparent">
                <Link
                  href="/student"
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Open Demo Student Space</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
