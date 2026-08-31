import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { CollegeDetailData } from '../data/college-detail'

export function CollegeFeesSection({ college }: { college: CollegeDetailData }) {
  return (
    <section id="fees" className="scroll-mt-[172px] border-b py-7 lg:scroll-mt-40 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">{college.name} Fees</h2>

      <div className="mt-4 hidden overflow-hidden rounded-[10px] border sm:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="py-3 font-semibold text-foreground">Course</TableHead>
              <TableHead className="py-3 font-semibold text-foreground">Duration</TableHead>
              <TableHead className="py-3 text-right font-semibold text-foreground">Tuition Fee</TableHead>
              <TableHead className="py-3 text-right font-semibold text-foreground">Total Fee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {college.fees.map((row) => (
              <TableRow key={row.course}>
                <TableCell className="py-3.5 font-semibold text-foreground">{row.course}</TableCell>
                <TableCell className="py-3.5 text-muted-foreground">{row.duration}</TableCell>
                <TableCell className="py-3.5 text-right">{row.tuitionFee}</TableCell>
                <TableCell className="py-3.5 text-right font-semibold text-foreground">{row.totalFee}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 rounded-[10px] border bg-card sm:hidden">
        <div className="divide-y">
          {college.fees.map((row) => (
            <div key={row.course} className="p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-foreground">{row.course}</p>
                <p className="shrink-0 text-xs text-muted-foreground">{row.duration}</p>
              </div>
              <div className="mt-2.5 grid grid-cols-2 gap-x-4">
                <div>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">Tuition Fee</p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">{row.tuitionFee}</p>
                </div>
                <div>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">Total Fee</p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">{row.totalFee}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
