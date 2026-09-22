import { Pencil } from 'lucide-react'
import { ToolEngineNotice, ToolSummaryCard } from '@/components/shared/student-tool/student-tool-parts'
import { getCourse, type CollegePredictorDraft } from '../data/predictor'

type Row = { label: string; value: string }

/** Progressive: only groups/rows that actually have content render — no wall of empty dashes. */
export function ProfileSummary({ draft, onEdit }: { draft: CollegePredictorDraft; onEdit: (step: number) => void }) {
  const course = getCourse(draft.course)

  const courseRows: Row[] = []
  if (course) courseRows.push({ label: 'Course', value: course.label })
  if (draft.exams.length > 0) courseRows.push({ label: 'Exams', value: draft.exams.join(', ') })

  const performanceRows: Row[] = draft.exams
    .map((exam) => ({ exam, entry: draft.performance[exam] }))
    .filter(({ entry }) => entry && entry.value.trim())
    .map(({ exam, entry }) => ({ label: exam, value: `${entry!.inputType} ${entry!.value.trim()}` }))

  const preferenceRows: Row[] = [
    { label: 'Category', value: draft.category },
    { label: 'Home State', value: draft.homeState },
    { label: 'Gender', value: draft.gender },
    { label: 'Preferred Counselling', value: draft.counselling },
    { label: 'Preferred States', value: draft.preferredStates.join(', ') },
    { label: 'Preferred Branches', value: draft.preferredBranches.join(', ') },
  ].filter((row) => row.value)

  const groups = [
    { title: 'Course & Exams', step: 0, rows: courseRows },
    { title: 'Performance', step: 1, rows: performanceRows },
    { title: 'Preferences', step: 2, rows: preferenceRows },
  ].filter((group) => group.rows.length > 0)

  return (
    <ToolSummaryCard title="Your Profile">
      {groups.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">Your selections will appear here as you go.</p>
      ) : (
        <div className="mt-2 divide-y">
          {groups.map((group) => (
            <section key={group.title} className="py-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{group.title}</p>
                <button type="button" onClick={() => onEdit(group.step)} className="flex cursor-pointer items-center gap-1 text-xs font-medium text-primary hover:underline" aria-label={`Edit ${group.title}`}>
                  <Pencil className="size-3" aria-hidden="true" />
                  Edit
                </button>
              </div>
              <dl className="mt-1.5">
                {group.rows.map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-3 py-1 text-sm">
                    <dt className="text-muted-foreground">{row.label}</dt>
                    <dd className="text-right font-semibold text-foreground">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      )}

      <ToolEngineNotice title="Prediction engine not connected yet" text="This page is for exploration only. No prediction or probability is shown yet." />
    </ToolSummaryCard>
  )
}
