import Link from 'next/link'
import { ArrowRight, Check, Info, type LucideIcon } from 'lucide-react'

 
export function ToolStepper({ steps, step }: { steps: string[]; step: number }) {
  return (
    <>
      <ol className="hidden items-center gap-4 md:flex" aria-label="Progress">
        {steps.map((label, index) => {
          const active = index === step
          const done = index < step
          return (
            <li key={label} className={`flex items-center gap-3 ${index < steps.length - 1 ? 'flex-1' : ''}`} aria-current={active ? 'step' : undefined}>
              <span className={`flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${active || done ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                {done ? <Check className="size-4" aria-hidden="true" /> : index + 1}
              </span>
              <span className={`text-sm ${active ? 'font-semibold text-foreground' : done ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>{label}</span>
              {index < steps.length - 1 && <span className={`h-px flex-1 ${done ? 'bg-primary' : 'bg-border'}`} />}
            </li>
          )
        })}
      </ol>
      <div className="md:hidden">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-foreground">
            Step {step + 1} of {steps.length}
          </span>
          <span className="text-muted-foreground">{steps[step]}</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
      </div>
    </>
  )
}

export type ToolHowItWorksItem = { icon: LucideIcon; title: string; text: string }

export function ToolHowItWorks({ items, columnsClass }: { items: ToolHowItWorksItem[]; columnsClass: string }) {
  return (
    <section className="pt-10">
      <h2 className="font-heading text-xl font-bold text-foreground">How it works</h2>
      <div className={`mt-4 grid gap-4 ${columnsClass}`}>
        {items.map((item, index) => (
          <div key={item.title} className="flex h-full items-start gap-3 rounded-[12px] border bg-card p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{index + 1}</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{item.text}</p>
            </div>
            <item.icon className="size-5 shrink-0 text-primary/70" aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  )
}

 
export type ToolRelatedItem = { icon: LucideIcon; title: string; text: string; href?: string }

const cardClass = 'flex h-full items-center gap-4 rounded-[12px] border bg-card p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]'

export function ToolRelatedTools({ tools, columnsClass = 'md:grid-cols-3' }: { tools: ToolRelatedItem[]; columnsClass?: string }) {
  return (
    <section className="py-10">
      <h2 className="font-heading text-xl font-bold text-foreground">Related Student Tools</h2>
      <div className={`mt-4 grid gap-4 ${columnsClass}`}>
        {tools.map(({ icon: Icon, title, text, href }) =>
          href ? (
            <Link key={title} href={href} className={`group ${cardClass} transition-colors hover:border-primary/40`}>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground group-hover:text-primary">{title}</p>
                <p className="text-xs text-muted-foreground">{text}</p>
              </div>
              <ArrowRight className="size-4 shrink-0 text-foreground/70 group-hover:text-primary" aria-hidden="true" />
            </Link>
          ) : (
            <div key={title} className={cardClass}>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground">{text}</p>
              </div>
              <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">Coming Soon</span>
            </div>
          ),
        )}
      </div>
    </section>
  )
}

 
export function ToolSummaryCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[14px] border bg-card p-5 shadow-[0_10px_30px_rgba(30,58,138,0.07)] sm:p-6">
      <h2 className="font-heading text-lg font-bold text-foreground">{title}</h2>
      {children}
    </div>
  )
}

 
export function ToolEngineNotice({ title, text }: { title: string; text: string }) {
  return (
    <div className="mt-3 flex items-start gap-3 rounded-[10px] bg-primary/8 p-4">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Info className="size-4" aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm font-semibold text-primary">{title}</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p>
      </div>
    </div>
  )
}

 
export function ToolActionBar({ children }: { children: React.ReactNode }) {
  return <div className="mt-6 flex items-center justify-between gap-3 border-t pt-3">{children}</div>
}

 
export function ToolExamCard({ exam, active, onClick }: { exam: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`relative flex min-h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-[12px] border p-3 text-center transition-colors ${active ? 'border-primary bg-primary/8 ring-1 ring-primary/30' : 'border-border bg-card hover:border-primary/40'}`}
    >
      {active && (
        <span className="absolute top-2 right-2 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-3" aria-hidden="true" />
        </span>
      )}
      <span className={`flex size-12 items-center justify-center rounded-full text-xs font-bold ${active ? 'bg-primary text-primary-foreground' : 'bg-secondary text-primary'}`}>{exam.split(' ')[0].slice(0, 4).toUpperCase()}</span>
      <span className="text-sm font-semibold text-foreground">{exam}</span>
    </button>
  )
}









 
export function StudentToolPageFrame({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-[calc(100dvh-var(--pw-header-h))] flex-col bg-background">{children}</div>
}
