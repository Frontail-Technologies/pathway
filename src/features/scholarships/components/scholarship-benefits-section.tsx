import { IndianRupee } from 'lucide-react'
import type { ScholarshipDetailData } from '../api/scholarships-api'


export function ScholarshipBenefitsSection({ scholarship }: { scholarship: ScholarshipDetailData }) {
  const supportingRows = [
    { label: 'Coverage', value: scholarship.benefits.coverage },
    { label: 'Duration', value: scholarship.benefits.duration },
    { label: 'Disbursement', value: scholarship.benefits.disbursement },
  ].filter((row) => row.value)

  return (
    <section id="benefits" className="scroll-mt-section rounded-xl border bg-card p-4 sm:p-6">
      <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">Benefits</h2>

      <div className="mt-4 flex items-center gap-3 rounded-lg border p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
          <IndianRupee className="size-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Main benefit</p>
          <p className="mt-0.5 text-lg font-bold text-foreground sm:text-xl">{scholarship.benefits.amount}</p>
        </div>
      </div>

      {supportingRows.length ? (
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {supportingRows.map((row) => (
          <div key={row.label} className="rounded-[10px] border bg-card p-3">
            <p className="text-xs text-muted-foreground">{row.label}</p>
            <p className="mt-0.5 text-sm font-medium text-foreground">{row.value}</p>
          </div>
        ))}
      </div>
      ) : null}

      {scholarship.benefits.note ? <p className="mt-3 text-xs text-muted-foreground">{scholarship.benefits.note}</p> : null}
    </section>
  )
}
