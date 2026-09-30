import Link from 'next/link'
import { Landmark, MapPin } from 'lucide-react'
import { getCollegeDetail } from '../data/college-detail'
import type { CollegeListItem } from '../data/colleges'

 
export function FeaturedCollegeTile({ college }: { college: CollegeListItem }) {
  const hasDetail = !!getCollegeDetail(college.slug)
  const body = (
    <>
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary" aria-hidden="true">
        <Landmark className="size-5.5" />
      </span>
      <div className="mt-2.5 min-w-0">
        <p className="truncate text-sm font-bold text-foreground">{college.name}</p>
        <p className="mt-0.5 flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3 shrink-0" aria-hidden="true" />
          {college.city}
        </p>
      </div>
      <div className="mt-2.5 flex flex-wrap justify-center gap-1.5">
        <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-semibold text-primary">{college.type}</span>
        <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground">{college.popularCourse}</span>
      </div>
      <p className={`mt-2.5 text-[11px] font-medium ${hasDetail ? 'text-primary' : 'text-muted-foreground/80'}`}>{hasDetail ? 'View college' : 'Details soon'}</p>
    </>
  )
  const tileClass = 'flex w-44 shrink-0 snap-start flex-col items-center rounded-[12px] border bg-card p-4 text-center shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:w-auto'

  if (hasDetail) {
    return (
      <Link href={`/college/${college.slug}`} className={`${tileClass} cursor-pointer outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40`}>
        {body}
      </Link>
    )
  }
  return <div className={tileClass}>{body}</div>
}
