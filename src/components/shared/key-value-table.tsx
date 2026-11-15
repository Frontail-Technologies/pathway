import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type KeyValueRow = { label: string; value: ReactNode }

export function KeyValueTable({ rows, head, className }: { rows: KeyValueRow[]; head?: [string, string]; className?: string }) {
  const visible = rows.filter((row) => row.value !== null && row.value !== undefined && row.value !== '')
  if (!visible.length) return null
  return (
    <div className={cn('overflow-hidden rounded-lg border', className)}>
      <table className="w-full text-left text-sm">
        {head ? (
          <thead className="bg-muted/60 text-[13px] text-muted-foreground">
            <tr>
              <th scope="col" className="w-2/5 px-4 py-2.5 font-semibold sm:w-1/3">{head[0]}</th>
              <th scope="col" className="px-4 py-2.5 font-semibold">{head[1]}</th>
            </tr>
          </thead>
        ) : null}
        <tbody className="divide-y">
          {visible.map((row) => (
            <tr key={row.label} className="align-top">
              <th scope="row" className="w-2/5 border-r px-4 py-3 font-medium text-muted-foreground sm:w-1/3">{row.label}</th>
              <td className="px-4 py-3 font-medium text-foreground">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
