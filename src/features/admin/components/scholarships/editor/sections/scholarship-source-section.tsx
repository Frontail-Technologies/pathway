import { FactList } from '../../../kit'

export function ScholarshipSourceSection({ isEdit }: { isEdit: boolean }) {
  return (
    <section id="review" className="scroll-mt-20 space-y-4 rounded-xl border border-border bg-card shadow-sm p-5 sm:p-6">
      <div>
        <h2 className="text-[15px] font-semibold text-foreground">Source and review</h2>
      </div>
      <FactList
        columns={3}
        items={[
          { label: 'Source', value: 'Official notification' },
          { label: 'Entry', value: 'Added by hand' },
          { label: 'Review', value: isEdit ? 'Being checked' : 'Draft' },
        ]}
      />
    </section>
  )
}
