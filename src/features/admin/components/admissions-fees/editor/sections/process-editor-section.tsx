import * as React from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { type ApplicationStep } from '@/features/admin/data/admin-admissions-fees'
import { EditorSection, Field } from '../../../programs/shared/section-kit'

export function ProcessEditorSection({
  applicationSteps,
  newStepTitle,
  onNewStepTitleChange,
  newStepDesc,
  onNewStepDescChange,
  onAddStep,
  onRemoveStep,
}: {
  applicationSteps: ApplicationStep[]
  newStepTitle: string
  onNewStepTitleChange: (val: string) => void
  newStepDesc: string
  onNewStepDescChange: (val: string) => void
  onAddStep: () => void
  onRemoveStep: (id: string) => void
}) {
  return (
    <EditorSection id="process" title="Admission steps" action={`${applicationSteps.length} ${applicationSteps.length === 1 ? 'step' : 'steps'}`}>
      {applicationSteps.length > 0 ? (
        <ol className="divide-y divide-border rounded-md border border-border">
          {applicationSteps.map((st) => (
            <li key={st.id} className="flex items-start justify-between gap-3 px-4 py-3">
              <div className="flex min-w-0 gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-[13px] font-medium text-muted-foreground tabular-nums">{st.stepNumber}</span>
                <div className="min-w-0 pt-0.5">
                  <p className="text-sm font-medium text-foreground">{st.title}</p>
                  {st.description ? <p className="text-[13px] text-muted-foreground">{st.description}</p> : null}
                </div>
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={() => onRemoveStep(st.id)} className="shrink-0 text-muted-foreground hover:text-destructive" aria-label={`Remove step ${st.stepNumber}`}>
                Remove
              </Button>
            </li>
          ))}
        </ol>
      ) : null}

      <div className="space-y-4 rounded-md border border-border p-4">
        <p className="text-sm font-medium text-foreground">Add a step</p>
        <Field label="Title" htmlFor="step-title">
          <Input id="step-title" value={newStepTitle} onChange={(e) => onNewStepTitleChange(e.target.value)} placeholder="e.g. Register for JoSAA choice filling" className="text-sm" />
        </Field>
        <Field label="Details" htmlFor="step-desc">
          <Textarea id="step-desc" value={newStepDesc} onChange={(e) => onNewStepDescChange(e.target.value)} placeholder="What the student does, deadlines and links" rows={2} className="resize-none text-sm" />
        </Field>
        <div className="flex justify-end">
          <Button type="button" variant="outline" onClick={onAddStep} disabled={!newStepTitle.trim()} className="gap-1.5">
            <Plus className="size-4" aria-hidden="true" />
            Add step
          </Button>
        </div>
      </div>
    </EditorSection>
  )
}
