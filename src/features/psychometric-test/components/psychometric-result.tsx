import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ToolEngineNotice } from '@/components/shared/student-tool/student-tool-parts'
import { StepHeading } from '@/components/shared/student-tool/tool-fields'
import { dimensionInfo, scoreDraft, type DimensionScore, type PsychometricDraft } from '../data/psychometric'

function joinNatural(items: string[]) {
  if (items.length <= 1) return items.join('')
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

function CareerDirectionCard({ score }: { score: DimensionScore }) {
  const info = dimensionInfo[score.dimension]
  return (
    <div className="rounded-[12px] border bg-card p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
      <p className="font-heading text-base font-bold text-foreground">{score.dimension}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">Areas you may want to explore</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {info.areas.map((area) =>
          area.stream ? (
            <Link key={area.label} href={`/courses?stream=${area.stream}`} className="inline-flex min-h-8 items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-3 text-xs font-medium text-primary transition-colors hover:bg-primary/10">
              {area.label}
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </Link>
          ) : (
            <span key={area.label} className="inline-flex min-h-8 items-center rounded-full border bg-muted/50 px-3 text-xs font-medium text-foreground">
              {area.label}
            </span>
          ),
        )}
      </div>
    </div>
  )
}

/** Everything here is derived from the student's own local answers via `scoreDraft` — no random or canned result. */
export function PsychometricResult({ draft }: { draft: PsychometricDraft }) {
  const scores = scoreDraft(draft)
  const top = scores.slice(0, 3)

  return (
    <div className="flex flex-col gap-6">
      <StepHeading title="Your Career Exploration Profile" helper="A starting point for reflection, based only on the answers you just gave." />

      <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        <section className="rounded-[12px] border bg-primary/5 p-5" aria-labelledby="top-interests">
          <h3 id="top-interests" className="font-heading text-base font-bold text-foreground">
            Where your interests pointed
          </h3>
          <p className="mt-2 text-sm text-foreground">
            You showed stronger interest in <span className="font-semibold">{joinNatural(top.map((score) => score.dimension.toLowerCase()))}</span> activities.
          </p>
          <ol className="mt-4 flex flex-col gap-3">
            {top.map((score, index) => {
              const info = dimensionInfo[score.dimension]
              return (
                <li key={score.dimension} className="flex items-start gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{index + 1}</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{score.dimension}</p>
                    <p className="text-xs leading-5 text-muted-foreground">
                      You may enjoy {info.summary}, and environments {info.environments}.
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </section>

        <section className="rounded-[12px] border bg-card p-5" aria-labelledby="all-dimensions">
          <h3 id="all-dimensions" className="font-heading text-base font-bold text-foreground">
            Interest dimensions
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">Bars show points earned from your answers, out of the most each dimension could earn.</p>
          <ul className="mt-4 flex flex-col gap-3">
            {scores.map((score) => (
              <li key={score.dimension}>
                <div className="flex items-baseline justify-between gap-2 text-sm">
                  <span className="font-medium text-foreground">{score.dimension}</span>
                  <span className="text-xs text-muted-foreground">
                    {score.points} of {score.max} points
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted" role="img" aria-label={`${score.dimension}: ${score.points} of ${score.max} points`}>
                  <div className="h-full rounded-full bg-primary" style={{ width: `${Math.round(score.strength * 100)}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section aria-labelledby="explore-areas">
        <h3 id="explore-areas" className="font-heading text-base font-bold text-foreground">
          Suggested areas to explore
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground">These are directions worth considering, not recommendations to choose any one of them. Linked areas open matching course listings.</p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {top.map((score) => (
            <CareerDirectionCard key={score.dimension} score={score} />
          ))}
        </div>
      </section>

      <ToolEngineNotice title="An exploratory tool, not an assessment" text="This is an exploratory career-interest tool, not a validated psychological or clinical assessment. Use it for self-reflection and to start conversations." />
    </div>
  )
}
