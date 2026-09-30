import type { AdminStudent } from '@/features/admin/data/admin-students'

export function StudentPreferencesSection({ student }: { student: AdminStudent }) {
  return (
    <div className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4">
      <h2 className="text-base font-bold font-heading text-foreground">
        Study Preferences
      </h2>

      <div className="space-y-4 text-xs">
        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1.5">
          <span className="text-muted-foreground font-medium block">Primary Study Goal</span>
          <span className="text-sm font-semibold text-foreground block">
            {student.studyGoal || <span className="text-muted-foreground font-normal">Not configured</span>}
          </span>
        </div>

        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-2">
          <span className="text-muted-foreground font-medium block">Preferred Streams & Disciplines</span>
          {student.preferredStreams && student.preferredStreams.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {student.preferredStreams.map((stream) => (
                <span
                  key={stream}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-background border border-border text-foreground"
                >
                  {stream}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground font-normal">None selected</span>
          )}
        </div>

        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-2">
          <span className="text-muted-foreground font-medium block">Preferred Degree Courses</span>
          {student.preferredCourses && student.preferredCourses.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {student.preferredCourses.map((course) => (
                <span
                  key={course}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-background border border-border text-foreground"
                >
                  {course}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground font-normal">None selected</span>
          )}
        </div>

        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-2">
          <span className="text-muted-foreground font-medium block">Target Entrance Exams</span>
          {student.preferredExams && student.preferredExams.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {student.preferredExams.map((exam) => (
                <span
                  key={exam}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-background border border-border text-foreground"
                >
                  {exam}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground font-normal">None selected</span>
          )}
        </div>

        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-2">
          <span className="text-muted-foreground font-medium block">Preferred Study Locations</span>
          {student.preferredLocations && student.preferredLocations.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {student.preferredLocations.map((loc) => (
                <span
                  key={loc}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-background border border-border text-foreground"
                >
                  {loc}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground font-normal">Any location / Not restricted</span>
          )}
        </div>
      </div>
    </div>
  )
}
