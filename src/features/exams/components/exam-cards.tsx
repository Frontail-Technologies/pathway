import Link from 'next/link'
import { Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Exam } from '../data/exams'

function monogram(exam: Exam) {
  return exam.shortName.split(' ')[0].slice(0, 4).toUpperCase()
}

/** Compact "Popular Exams" tile. Links to the detail page only when the record has one; otherwise a non-link "Details soon". */
export function PopularExamTile({ exam }: { exam: Exam }) {
  const tileClass = 'flex flex-col items-center rounded-[12px] border bg-card p-4 text-center shadow-[0_2px_10px_rgba(15,23,42,0.04)]'
  const body = (
    <>
      <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-xs font-bold text-primary">{monogram(exam)}</span>
      <p className="mt-2.5 text-sm font-bold text-foreground">{exam.shortName}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{exam.studyArea}</p>
      <p className={`mt-2 text-[11px] font-medium ${exam.hasDetailPage ? 'text-primary' : 'text-muted-foreground/80'}`}>{exam.hasDetailPage ? 'View details' : 'Details soon'}</p>
    </>
  )
  if (exam.hasDetailPage) {
    return (
      <Link href={`/exam/${exam.slug}`} className={`${tileClass} cursor-pointer outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40`}>
        {body}
      </Link>
    )
  }
  return <div className={tileClass}>{body}</div>
}

export function ExamCard({ exam }: { exam: Exam }) {
  return (
    <article className="flex h-full flex-col rounded-[12px] border bg-card p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-primary">{monogram(exam)}</span>
        <div className="min-w-0">
          <h3 className="font-heading text-base font-bold text-foreground">{exam.shortName}</h3>
          <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{exam.name}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-primary">{exam.studyArea}</span>
        <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground">{exam.scope}</span>
        <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground">{exam.level}</span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-6 text-foreground">{exam.description}</p>
      {exam.conductingBody && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Building2 className="size-3.5 shrink-0" aria-hidden="true" />
          {exam.conductingBody}
        </p>
      )}

      <div className="mt-4">
        {exam.hasDetailPage ? (
          <Button variant="outline" className="h-9 px-4 text-sm" nativeButton={false} render={<Link href={`/exam/${exam.slug}`} />}>
            View Details
          </Button>
        ) : (
          <Button variant="outline" className="h-9 px-4 text-sm" disabled title="Exam details coming soon">
            Details Soon
          </Button>
        )}
      </div>
    </article>
  )
}
