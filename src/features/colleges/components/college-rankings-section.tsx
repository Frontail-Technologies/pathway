import { SourceNote } from '@/components/shared/source-note'
import type { CollegeDetailData } from '../data/college-detail'

export function CollegeRankingsSection({ college }: { college: CollegeDetailData }) {
  const rows = college.rankings ?? []
  if (!rows.length) return null
  const year = rows[0]?.year
  const overall = rows.find((row) => row.category === 'Overall' && row.rank != null)

  return (
    <section id="rankings" className="scroll-mt-section rounded-xl border bg-card p-4 sm:p-6">
      <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">{college.name} Rankings</h2>
      <p className="mt-1 text-sm text-muted-foreground">National Institutional Ranking Framework (NIRF) {year}, Ministry of Education</p>

      {overall ? (
        <div className="mt-5 flex items-center gap-4 rounded-xl border bg-card p-4 sm:p-5">
          <span className="flex size-16 shrink-0 flex-col items-center justify-center rounded-xl bg-success-surface text-success">
            <span className="text-[11px] font-semibold">NIRF</span>
            <span className="font-heading text-2xl leading-none font-extrabold tabular-nums">#{overall.rank}</span>
          </span>
          <div className="min-w-0">
            <p className="text-base font-semibold text-foreground">Overall rank in India</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {overall.score != null ? `Score ${overall.score.toFixed(2)} out of 100 · ` : ''}NIRF {overall.year}
            </p>
          </div>
        </div>
      ) : null}

      <div className="mt-4 overflow-hidden rounded-xl border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left text-xs text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-2.5 font-medium">Category</th>
              <th scope="col" className="px-4 py-2.5 text-right font-medium">Rank</th>
              <th scope="col" className="hidden px-4 py-2.5 text-right font-medium sm:table-cell">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((row) => (
              <tr key={`${row.source}-${row.category}`}>
                <td className="px-4 py-3 font-medium text-foreground">{row.category}</td>
                <td className="px-4 py-3 text-right font-semibold text-foreground tabular-nums">{row.rank != null ? `#${row.rank}` : row.band ?? '—'}</td>
                <td className="hidden px-4 py-3 text-right text-muted-foreground tabular-nums sm:table-cell">{row.score != null ? row.score.toFixed(2) : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SourceNote className="mt-3" source="NIRF" year={year} href="https://www.nirfindia.org" />
    </section>
  )
}
