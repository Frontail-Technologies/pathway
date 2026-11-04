import Image from 'next/image'
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
    <div className="group rounded-xl border bg-card p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] transition-all hover:border-primary/40 hover:shadow-sm">
      <div className="flex items-center justify-center gap-3">
        <CollegeMini college={collegeA.college} />
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] font-bold text-primary">VS</span>
        <CollegeMini college={collegeB.college} />
      </div>
      <Button className="mt-4 h-10 w-full text-sm font-semibold" nativeButton={false} render={<Link href={`/compare/colleges?${query}`} />}>
        Compare
      </Button>
    </div>
  )
}

function CollegeMini({ college }: { college: { logo: string; shortName: string; location: string } }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5 text-center">
      <div className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-secondary text-xs font-bold text-primary transition-transform group-hover:scale-[1.03]">
        {college.logo ? <Image src={college.logo} alt="" fill sizes="44px" className="object-cover" /> : getCollegeInitials(college.shortName)}
      </div>
      <p className="w-full truncate text-sm font-bold text-foreground">{college.shortName}</p>
      <p className="w-full truncate text-xs text-muted-foreground">{college.location.split(',')[0]}</p>
    </div>
  )
}
