import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getCollegeInitials } from '../data/college-compare'
import { serializeProgramSlug, type Degree } from '../data/programs'
import type { CompareEntry } from '../api/compare-api'

export type ProgramOverride = { degree: Degree; course: string }

type PopularComparisonCardProps = {
  collegeA: CompareEntry
  collegeB: CompareEntry
  programA?: ProgramOverride
  programB?: ProgramOverride
}

export function PopularComparisonCard({ collegeA, collegeB, programA, programB }: PopularComparisonCardProps) {
  const query = new URLSearchParams({
    colleges: `${collegeA.college.slug},${collegeB.college.slug}`,
    programs: [programA ? serializeProgramSlug(programA.degree, programA.course) : collegeA.program.slug, programB ? serializeProgramSlug(programB.degree, programB.course) : collegeB.program.slug].join(','),
  }).toString()

  return (
    <div className="group rounded-xl border bg-card p-4 transition-colors hover:border-primary/40">
      <div className="flex items-start justify-center gap-3">
        <CollegeMini entry={collegeA} />
        <span className="mt-3 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">VS</span>
        <CollegeMini entry={collegeB} />
      </div>
      <Button variant="cta" className="mt-4 h-10 w-full text-sm font-semibold" nativeButton={false} render={<Link href={`/compare/colleges?${query}`} />}>
        Compare
      </Button>
    </div>
  )
}

function CollegeMini({ entry }: { entry: CompareEntry }) {
  const { college, program } = entry
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-1 text-center">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-[13px] font-bold text-primary">{getCollegeInitials(college.shortName)}</div>
      <p className="mt-1 line-clamp-2 w-full text-sm font-semibold text-foreground">{college.shortName}</p>
      {program.slug ? <p className="line-clamp-2 w-full text-xs text-muted-foreground">{program.degree} {program.course}</p> : null}
      {college.nirfRank && college.nirfRank !== 'Not available' ? <p className="text-xs font-medium text-primary">NIRF {college.nirfRank.replace(/\s*\(\d{4}\)$/, '')}</p> : null}
    </div>
  )
}
