import Link from 'next/link'
import { FlaskConical, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StepHeading } from '@/components/shared/student-tool/tool-fields'
import { getPreviewCollege, previewBuckets, type CollegePredictorDraft } from '../data/predictor'





 
export function ResultsPreview({ draft }: { draft: CollegePredictorDraft }) {
  const context = [draft.exams.join(' + '), draft.counselling].filter(Boolean).join(' · ')

  return (
    <div className="flex flex-col gap-6">
      <StepHeading title="Your prediction preview" helper="Here's how your college options will be grouped once predictions are available." />

      <div className="flex items-start gap-3 rounded-[10px] border border-primary/25 bg-primary/5 p-4">
        <FlaskConical className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold text-foreground">Prediction Preview — predictor engine not connected yet</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            This shows how your results will be organised. The colleges below are placeholders for the layout only — they are not predictions and don&apos;t reflect the details you entered.
          </p>
        </div>
      </div>

      {previewBuckets.map((bucket) => (
        <section key={bucket.id} aria-labelledby={`bucket-${bucket.id}`}>
          <div className="flex flex-wrap items-center gap-2">
            <h3 id={`bucket-${bucket.id}`} className="font-heading text-base font-bold text-foreground">
              {bucket.title}
            </h3>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">Sample layout</span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{bucket.description}</p>

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {bucket.slugs.map((slug) => {
              const preview = getPreviewCollege(slug)
              if (!preview) return null
              const { college, hasDetailPage } = preview
              return (
                <div key={slug} className="flex flex-col rounded-[12px] border border-dashed border-primary/25 bg-card p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-heading text-base leading-snug font-bold text-foreground">{college.name}</p>
                    <span className="shrink-0 rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-primary">{college.type}</span>
                  </div>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                    {college.city}, {college.state}
                  </p>
                  <dl className="mt-4 grid grid-cols-2 gap-3 border-t pt-3 text-xs">
                    <div>
                      <dt className="text-muted-foreground">Program</dt>
                      <dd className="mt-0.5 font-medium text-foreground">{college.popularCourse}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Exam</dt>
                      <dd className="mt-0.5 font-medium text-foreground">{context || college.exam}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 rounded-md bg-muted px-2.5 py-1.5 text-xs text-muted-foreground">
                    Expected cutoff: <span className="font-medium text-foreground">Cutoff data pending integration</span>
                  </p>
                  <div className="mt-4">
                    {hasDetailPage ? (
                      <Button variant="outline" className="h-9 px-4 text-sm" nativeButton={false} render={<Link href={`/college/${slug}`} />}>
                        View College
                      </Button>
                    ) : (
                      <Button variant="outline" className="h-9 px-4 text-sm" disabled title="College page coming soon">
                        Details soon
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      ))}

      <p className="text-xs leading-5 text-muted-foreground">Predictions will depend on verified historical cutoff and counselling data once the prediction engine is connected.</p>
    </div>
  )
}
