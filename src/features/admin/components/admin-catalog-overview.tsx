'use client'

import { getCatalogDistribution } from '../data/admin-stats'
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
  count: {
    label: 'Total Items',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

export function AdminCatalogOverview() {
  const { items } = getCatalogDistribution()

  return (
    <div className="flex-1 min-h-[220px] w-full pt-1 flex flex-col">
      <ChartContainer config={chartConfig} className="flex-1 w-full h-full aspect-auto">
        <BarChart
          data={items}
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
            width={125}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
          />
          <ChartTooltip
            cursor={{ fill: 'var(--muted)/40' }}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar
            dataKey="count"
            fill="var(--color-count)"
            radius={[0, 4, 4, 0]}
            maxBarSize={22}
          />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
