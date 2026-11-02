import type { ReactNode } from 'react'
import { Label } from '@/components/ui/label'
import { Panel } from '../../kit'

/** Editor section: a kit Panel with an anchor id for the section nav / scroll-spy. */
export function FormSection({ id, title, description, action, children }: { id: string; title: string; description?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div id={id} className="scroll-mt-24">
      <Panel title={title} description={description} action={action} bodyClassName="space-y-4">
        {children}
      </Panel>
    </div>
  )
}

/** Label, control, then either the error or a short hint. */
export function Field({ id, label, required, hint, error, children, className }: { id?: string; label: string; required?: boolean; hint?: ReactNode; error?: string; children: ReactNode; className?: string }) {
  return (
    <div className={className ? `space-y-1.5 ${className}` : 'space-y-1.5'}>
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </Label>
      {children}
      {error ? <p className="text-[13px] text-destructive">{error}</p> : hint ? <p className="text-[13px] text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

/** Inline notice for messages such as "saving needs the Admin API". Neutral, not coloured. */
export function FormNotice({ children }: { children: ReactNode }) {
  return (
    <p role="status" className="rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm text-foreground">
      {children}
    </p>
  )
}
