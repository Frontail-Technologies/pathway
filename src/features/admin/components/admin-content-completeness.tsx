'use client'

import { getContentCompleteness } from '../data/admin-stats'
import { CheckCircle2 } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const chartConfig = {
  completed: {
    label: 'Complete Profiles',
    color: 'var(--chart-1)',
  },
  remaining: {
    label: 'Pending Detail',
    color: 'var(--muted-foreground)',
  },
} satisfies ChartConfig

export function AdminContentCompleteness() {
  const { items, overallCompleted, overallTotal, overallPercentage } = getContentCompleteness()

  const chartData = items.map((item) => ({
    label: item.label,
    completed: item.completedCount,
    remaining: Math.max(item.totalCount - item.completedCount, 0),
    total: item.totalCount,
    percentage: item.percentage,
  }))

  return (
    <div className="space-y-3 flex-1 flex flex-col">
      <div className="bg-muted/50 rounded-lg px-3.5 py-2.5 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
          <span className="text-xs font-semibold text-foreground">
            {overallCompleted} of {overallTotal} Profiles Complete
          </span>
        </div>
        <span className="text-xs font-bold text-foreground tabular-nums">
          {overallPercentage}%
        </span>
      </div>

      <div className="flex-1 min-h-[200px] w-full pt-1 flex flex-col">
        <ChartContainer config={chartConfig} className="flex-1 w-full h-full aspect-auto">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid horizontal={false} strokeDasharray="3 3" className="stroke-border/40" />
            <XAxis type="number" hide />
            <YAxis
              dataKey="label"
              type="category"
              tickLine={false}
              axisLine={false}
              width={120}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
            />
            <ChartTooltip
              cursor={{ fill: 'var(--muted)/40' }}
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="completed"
              stackId="a"
              fill="var(--color-completed)"
              radius={[4, 0, 0, 4]}
              maxBarSize={22}
            />
            <Bar
              dataKey="remaining"
              stackId="a"
              fill="var(--muted)"
              radius={[0, 4, 4, 0]}
              maxBarSize={22}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}
