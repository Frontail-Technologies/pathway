import { KeyValueTable } from '@/components/shared/key-value-table'
import { SourceNote } from '@/components/shared/source-note'
import type { CollegeDetailData } from '../data/college-detail'

const number = (value: number | null | undefined) => (value == null ? null : value.toLocaleString('en-IN'))

export function generatedOverview(college: CollegeDetailData) {
  const kind = college.instituteStatus || `${college.type.toLowerCase()} institution`
  const place = [college.city, college.state].filter(Boolean).join(', ')
  const parts = [`${college.fullName} is ${/^[aeiou]/i.test(kind) ? 'an' : 'a'} ${kind}${place ? ` in ${place}` : ''}${college.established ? `, established in ${college.established}` : ''}.`]
  const rank = college.highlights?.rank
  if (rank?.rank != null) parts.push(`It is ranked #${rank.rank} in the ${rank.source} ${rank.year} ${rank.category === 'Overall' ? 'overall' : rank.category.toLowerCase()} rankings.`)
  if (college.courses.length) parts.push(`Pathway lists ${college.courses.length} ${college.courses.length === 1 ? 'programme' : 'programmes'} offered here.`)
  return parts.join(' ')
}

export function CollegeOverviewSection({ college }: { college: CollegeDetailData }) {
  const facts = college.keyFacts
  const ratio = facts?.students && facts.faculty ? `${Math.round(facts.students / facts.faculty)} : 1` : null
  const nirfYear = college.rankings?.[0]?.year
  const rank = college.highlights?.rank
  const exams = [...new Set(college.admissions.map((block) => block.exam).filter(Boolean))]
  const extra = college.facts.filter((fact) => !['Established', 'Institution Type', 'Approved By', 'Campus', 'Institute Status'].includes(fact.label))

  return (
    <section id="overview" className="scroll-mt-section rounded-xl border bg-card p-4 sm:p-6">
      <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">About {college.name}</h2>
      <p className="mt-2.5 text-[15px] leading-7 text-muted-foreground">{college.overviewCopy || generatedOverview(college)}</p>

      <h3 className="mt-6 text-base font-semibold text-foreground">{college.name} highlights</h3>
      <KeyValueTable
        className="mt-3"
        head={['Parameter', 'Details']}
        rows={[
          { label: 'Established', value: college.established },
          { label: 'Location', value: [college.city, college.state].filter(Boolean).join(', ') },
          { label: 'Ownership', value: college.type },
          { label: 'Institute status', value: college.instituteStatus },
          { label: 'Approved by', value: college.approval },
          { label: 'NAAC grade', value: college.naacGrade?.replace(/^NAAC\s*/i, '') },
          { label: 'NIRF rank', value: rank?.rank != null ? `#${rank.rank} ${rank.category === 'Overall' ? 'Overall' : rank.category} (${rank.year})` : null },
          { label: college.highlights?.packageLabel || 'Package', value: college.highlights?.packageValue },
          { label: 'Courses listed', value: college.courses.length ? String(college.courses.length) : null },
          { label: 'Exams accepted', value: exams.length ? exams.join(', ') : null },
          { label: 'Students', value: number(facts?.students) },
          { label: 'Faculty', value: number(facts?.faculty) },
          { label: 'Students per faculty', value: ratio },
          { label: 'PhD scholars', value: number(facts?.phdStudents) },
          { label: 'Sanctioned intake', value: number(facts?.intake) },
          ...extra.map((fact) => ({ label: fact.label, value: fact.value })),
        ]}
      />
      {facts && (facts.students || facts.faculty) ? (
        <SourceNote className="mt-2.5" source="NIRF" year={nirfYear} href="https://www.nirfindia.org" note={facts.year ? `Student and faculty figures for ${facts.year}` : undefined} />
      ) : null}
    </section>
  )
}
