import type { AdminStudent } from '@/features/admin/data/admin-students'

export function StudentEducationSection({ student }: { student: AdminStudent }) {
  return (
    <div className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4">
      <h2 className="text-base font-bold font-heading text-foreground">
        Education Background
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
          <span className="text-muted-foreground font-medium block">Current Study Level</span>
          <span className="text-sm font-semibold text-foreground block">
            {student.studyLevel || <span className="text-muted-foreground font-normal">Not provided</span>}
          </span>
        </div>

        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
          <span className="text-muted-foreground font-medium block">Academic Stream</span>
          <span className="text-sm font-semibold text-foreground block">
            {student.stream || <span className="text-muted-foreground font-normal">Not provided</span>}
          </span>
        </div>

        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
          <span className="text-muted-foreground font-medium block">School / College / Institution</span>
          <span className="text-sm font-semibold text-foreground block">
            {student.education?.institution || <span className="text-muted-foreground font-normal">Not provided</span>}
          </span>
        </div>

        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
          <span className="text-muted-foreground font-medium block">Passing / Graduation Year</span>
          <span className="text-sm font-semibold text-foreground block">
            {student.education?.graduationYear ? (
              String(student.education.graduationYear)
            ) : (
              <span className="text-muted-foreground font-normal">Not provided</span>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}
