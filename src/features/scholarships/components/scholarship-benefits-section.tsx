import { IndianRupee } from 'lucide-react'
import type { ScholarshipDetailData } from '../data/scholarship-detail'

/**
 * "Benefit Breakdown" — one visually emphasized Main Benefit block plus
 * compact supporting rows underneath, deliberately not the same generic
 * label/value table Course Detail uses for Fees.
 */
export function ScholarshipBenefitsSection({ scholarship }: { scholarship: ScholarshipDetailData }) {
  const supportingRows = [
    { label: 'Coverage', value: scholarship.benefits.coverage },
    { label: 'Duration', value: scholarship.benefits.duration },
    { label: 'Disbursement', value: scholarship.benefits.disbursement },
  ]

  return (
    <section id="benefits" className="scroll-mt-43 border-b py-7 lg:scroll-mt-40 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">Benefit Breakdown</h2>

      <div className="mt-4 flex items-center gap-3 rounded-[10px] border bg-secondary/40 p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-card text-primary">
          <IndianRupee className="size-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Main Benefit</p>
          <p className="mt-0.5 text-lg font-bold text-foreground sm:text-xl">{scholarship.benefits.amount}</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {supportingRows.map((row) => (
          <div key={row.label} className="rounded-[10px] border bg-card p-3">
            <p className="text-xs tracking-wide text-muted-foreground uppercase">{row.label}</p>
            <p className="mt-0.5 text-sm font-medium text-foreground">{row.value}</p>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-muted-foreground italic">{scholarship.benefits.note}</p>
    </section>
  )
}
