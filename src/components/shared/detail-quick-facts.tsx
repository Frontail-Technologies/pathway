import type { ComponentType } from 'react'

export type DetailQuickFact = {
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>
  label: string
  value: string
}






 
export function DetailQuickFacts({ facts }: { facts: DetailQuickFact[] }) {
  if (facts.length === 0) return null

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {facts.map((fact) => (
        <div key={fact.label} className="flex items-start gap-2 rounded-[10px] border bg-card px-3 py-2.5">
          <fact.icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-[11px] tracking-wide text-muted-foreground uppercase">{fact.label}</p>
            <p className="mt-0.5 truncate text-sm font-semibold text-foreground">{fact.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
