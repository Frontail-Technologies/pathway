import type { ReactNode } from 'react'
import { Label } from '@/components/ui/label'
import { Panel } from '../../kit'

export function FormSection({ id, title, action, children }: { id: string; title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div id={id} className="scroll-mt-24">
      <Panel title={title} action={action} bodyClassName="space-y-4">
        {children}
      </Panel>
    </div>
  )
}

export function Field({ id, label, required, error, children, className }: { id?: string; label: string; required?: boolean; error?: string; children: ReactNode; className?: string }) {
  return (
    <div className={className ? `space-y-1.5 ${className}` : 'space-y-1.5'}>
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </Label>
      {children}
      {error ? <p className="text-[13px] text-destructive">{error}</p> : null}
    </div>
  )
}

export function FormNotice({ children }: { children: ReactNode }) {
  return (
    <p role="status" className="rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm text-foreground">
      {children}
    </p>
  )
}
