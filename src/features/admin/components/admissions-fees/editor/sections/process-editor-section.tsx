import * as React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { type ApplicationStep } from '@/features/admin/data/admin-admissions-fees'

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
    <section id="process" className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4 scroll-mt-20">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
          Admission Workflow Steps
        </h2>
        <span className="text-xs text-muted-foreground">
          {applicationSteps.length} {applicationSteps.length === 1 ? 'Step' : 'Steps'}
        </span>
      </div>

      <div className="space-y-3">
        {applicationSteps.map((st) => (
          <div
            key={st.id}
            className="p-3.5 rounded-lg bg-muted/20 border border-border/60 flex items-start justify-between gap-3 text-xs"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                {st.stepNumber}
              </div>
              <div className="space-y-0.5 min-w-0">
                <span className="font-bold text-foreground block">{st.title}</span>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{st.description}</p>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onRemoveStep(st.id)}
              className="h-7 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        ))}

        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-3">
          <span className="text-xs font-semibold text-foreground block">
            Add Workflow Step
          </span>

          <div className="space-y-2.5">
            <div className="space-y-1">
              <Label htmlFor="step-title" className="text-[11px] font-semibold">
                Step Title
              </Label>
              <Input
                id="step-title"
                value={newStepTitle}
                onChange={(e) => onNewStepTitleChange(e.target.value)}
                placeholder="e.g. Register for JoSAA Online Choice Filling"
                className="text-xs h-8"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="step-desc" className="text-[11px] font-semibold">
                Step Description
              </Label>
              <Textarea
                id="step-desc"
                value={newStepDesc}
                onChange={(e) => onNewStepDescChange(e.target.value)}
                placeholder="Details of the required candidate action, deadlines, and portals..."
                rows={2}
                className="text-xs resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onAddStep}
              disabled={!newStepTitle.trim()}
              className="text-xs h-8 font-semibold bg-card"
            >
              <Plus className="w-3.5 h-3.5 mr-1 text-primary" />
              Add Step
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
