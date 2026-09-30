import type { ReactNode } from 'react'

type DetailIdentityHeroProps = {
   
  media: ReactNode
   
  eyebrow?: string
  title: string
  subtitle?: string
  description?: string
   
  meta?: ReactNode
   
  tags?: ReactNode
   
  actions?: ReactNode
   
  quickFacts?: ReactNode
  className?: string
}






 
export function DetailIdentityHero({ media, eyebrow, title, subtitle, description, meta, tags, actions, quickFacts, className = '' }: DetailIdentityHeroProps) {
  return (
    <div className={`border-b pb-5 sm:pb-6 ${className}`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
        <div className="w-full shrink-0 lg:w-[38%] xl:w-[40%]">{media}</div>

        <div className="min-w-0 flex-1">
          {eyebrow && <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{eyebrow}</p>}
          <h1 className={`font-heading text-xl font-bold text-foreground sm:text-3xl ${eyebrow ? 'mt-1' : ''}`}>{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground sm:text-[15px]">{subtitle}</p>}
          {meta && <div className="mt-2 text-[13px] text-muted-foreground sm:text-sm">{meta}</div>}
          {description && <p className="mt-2.5 text-sm leading-6 text-foreground sm:text-[15px]">{description}</p>}
          {tags && <div className="mt-2.5 flex flex-wrap items-center gap-2">{tags}</div>}
          {actions && <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row sm:items-center">{actions}</div>}
        </div>
      </div>

      {quickFacts && <div className="mt-5">{quickFacts}</div>}
    </div>
  )
}
