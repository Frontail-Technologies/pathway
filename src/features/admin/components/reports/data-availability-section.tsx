import { DomainAvailabilityItem } from '../../data/admin-reports'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, CircleDashed, Link2Off } from 'lucide-react'

export function DataAvailabilitySection({ items }: { items: DomainAvailabilityItem[] }) {
  return (
    <section className="space-y-4">
      <h2 className="text-base font-bold font-heading text-foreground">
        Platform Data Availability Matrix
      </h2>

      <div className="bg-card rounded-xl border-0 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/40 text-muted-foreground font-semibold uppercase tracking-wider text-[10px] border-b border-border/60">
              <tr>
                <th className="px-4 py-3">Domain</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Data Source</th>
                <th className="px-4 py-3">Records / Status</th>
                <th className="px-4 py-3">Pipeline Status</th>
                <th className="px-4 py-3">Operational Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                    {item.domain}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                    {item.category}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                    {item.dataSource}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                    {item.recordCount}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {item.status === 'available' && (
                      <Badge
                        variant="secondary"
                        className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-0 text-[11px] font-semibold gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        Available
                      </Badge>
                    )}
                    {item.status === 'empty' && (
                      <Badge
                        variant="secondary"
                        className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-0 text-[11px] font-semibold gap-1"
                      >
                        <CircleDashed className="w-3 h-3" />
                        Empty (0)
                      </Badge>
                    )}
                    {item.status === 'not_connected' && (
                      <Badge
                        variant="secondary"
                        className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-0 text-[11px] font-semibold gap-1"
                      >
                        <Link2Off className="w-3 h-3" />
                        Not Connected
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground max-w-xs sm:max-w-md truncate">
                    {item.operationalNote}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
