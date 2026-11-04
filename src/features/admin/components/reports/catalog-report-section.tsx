'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import type { CatalogDistributionItem, PlatformReportsData } from '../../data/admin-reports'
import { Panel } from '../kit'

const countConfig = (label: string): ChartConfig => ({ count: { label, color: 'var(--chart-1)' } })

function DistributionChart({ data, label }: { data: CatalogDistributionItem[]; label: string }) {
  if (data.length === 0) return <p className="text-sm text-muted-foreground">No records yet.</p>
  return (
    <ChartContainer config={countConfig(label)} className="aspect-auto h-64 w-full">
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis dataKey="name" tickLine={false} axisLine={false} interval={0} fontSize={12} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} allowDecimals={false} fontSize={12} />
        <ChartTooltip cursor={{ fill: 'var(--muted)' }} content={<ChartTooltipContent />} />
        <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} maxBarSize={44} />
      </BarChart>
    </ChartContainer>
  )
}

function ShareList({ items, total, noun }: { items: CatalogDistributionItem[]; total: number; noun: string }) {
  if (items.length === 0) return <p className="text-sm text-muted-foreground">No {noun} yet.</p>
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.name}>
          <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
            <span className="text-foreground">{item.name}</span>
            <span className="text-[13px] text-muted-foreground tabular-nums">
              {item.count} of {total} · {item.percentage}%
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full" style={{ width: `${Math.min(item.percentage, 100)}%`, backgroundColor: 'var(--chart-1)' }} />
          </div>
        </li>
      ))}
    </ul>
  )
}

export function CatalogReportSection({ data }: { data: PlatformReportsData['catalog'] }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Panel title="Courses by level" description={`${data.totalPrograms} courses`}>
        <DistributionChart data={data.programsByLevel} label="Courses" />
      </Panel>

      <Panel title="Scholarships by provider" description={`${data.totalScholarships} scholarships`}>
        <DistributionChart data={data.scholarshipsByProvider} label="Scholarships" />
      </Panel>

      <Panel title="Institutions by type" description={`${data.totalInstitutions} institutions`}>
        <ShareList items={data.institutionsByType} total={data.totalInstitutions} noun="institutions" />
      </Panel>

      <Panel title="How tutoring is delivered" description="A provider can offer more than one mode.">
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-[13px] font-medium text-muted-foreground">Tutors ({data.totalTutors})</h3>
            <ShareList items={data.tutorsByMode} total={data.totalTutors} noun="tutors" />
          </div>
          <div>
            <h3 className="mb-3 text-[13px] font-medium text-muted-foreground">Coaching providers ({data.totalCoaching})</h3>
            <ShareList items={data.coachingByMode} total={data.totalCoaching} noun="coaching providers" />
          </div>
        </div>
      </Panel>
    </div>
  )
}
