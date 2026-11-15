import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { scoreDraft, type PsychometricDraft, type PsychometricTest } from '../data/psychometric'
import { StepTitle } from './psy-steps'

const joinNatural = (items: string[]) => (items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`)

export function PsychometricResult({ test, draft }: { test: PsychometricTest; draft: PsychometricDraft }) {
  const scores = scoreDraft(test, draft)
  const top = scores.slice(0, 3)

  return (
    <div className="flex flex-col gap-5">
      <StepTitle>Your interest profile</StepTitle>
      <p className="text-[15px] leading-7 text-foreground">
        Your answers lean most towards <span className="font-semibold">{joinNatural(top.map((score) => score.dimension.label.toLowerCase()))}</span> work.
      </p>

      <ol className="grid gap-3 md:grid-cols-3">
        {top.map((score, index) => (
          <li key={score.dimension.key} className="flex flex-col rounded-xl border p-4">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{index + 1}</span>
              <p className="font-heading text-base font-bold text-foreground">{score.dimension.label}</p>
              <span className="ml-auto text-sm font-semibold text-primary tabular-nums">{Math.round(score.strength * 100)}%</span>
            </div>
            <p className="mt-2.5 text-sm leading-6 text-muted-foreground">
              You enjoy {score.dimension.summary}, and may like work {score.dimension.environments}.
            </p>
            {score.dimension.areas.length ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {score.dimension.areas.map((area) =>
                  area.stream ? (
                    <Link key={area.label} href={`/courses?stream=${area.stream}`} className="inline-flex h-7 items-center gap-1 rounded-md bg-secondary px-2.5 text-xs font-medium text-primary hover:underline">
                      {area.label}
                      <ArrowUpRight className="size-3" aria-hidden="true" />
                    </Link>
                  ) : (
                    <span key={area.label} className="inline-flex h-7 items-center rounded-md bg-muted px-2.5 text-xs font-medium text-foreground">
                      {area.label}
                    </span>
                  ),
                )}
              </div>
            ) : null}
          </li>
        ))}
      </ol>

      <section aria-labelledby="all-dimensions" className="rounded-xl border p-4 sm:p-5">
        <h3 id="all-dimensions" className="font-heading text-base font-bold text-foreground">
          All dimensions
        </h3>
        <ul className="mt-4 flex flex-col gap-3">
          {scores.map((score) => (
            <li key={score.dimension.key} className="grid grid-cols-[7rem_1fr_3rem] items-center gap-3 text-sm">
              <span className="font-medium text-foreground">{score.dimension.label}</span>
              <span className="h-2 overflow-hidden rounded-full bg-muted" role="img" aria-label={`${score.dimension.label}: ${score.points} of ${score.max} points`}>
                <span className="block h-full rounded-full bg-primary" style={{ width: `${Math.round(score.strength * 100)}%` }} />
              </span>
              <span className="text-right text-muted-foreground tabular-nums">{Math.round(score.strength * 100)}%</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-xs text-muted-foreground">An exploratory interest tool for self-reflection, not a validated psychological assessment.</p>
    </div>
  )
}
