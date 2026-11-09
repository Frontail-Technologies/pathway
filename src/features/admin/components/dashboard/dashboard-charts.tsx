'use client'

import { useMemo } from 'react'
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'

const DAY = 24 * 60 * 60 * 1000

const dayKey = (date: Date) => date.toISOString().slice(0, 10)
const shortDay = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'UTC' })

export function buildDailySeries(timestamps: string[], days = 14, now = new Date()) {
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - (days - 1) * DAY)
  const buckets = new Map<string, number>()
  for (let index = 0; index < days; index += 1) buckets.set(dayKey(new Date(start.getTime() + index * DAY)), 0)
  for (const value of timestamps) {
    const key = dayKey(new Date(value))
    if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + 1)
  }
  return [...buckets.entries()].map(([date, count]) => ({ date, label: shortDay(date), count }))
}

export function weekOverWeek(timestamps: string[], now = new Date()) {
  const end = now.getTime()
  const thisWeek = timestamps.filter((value) => end - new Date(value).getTime() < 7 * DAY).length
  const lastWeek = timestamps.filter((value) => {
    const age = end - new Date(value).getTime()
    return age >= 7 * DAY && age < 14 * DAY
  }).length
  const change = lastWeek === 0 ? (thisWeek > 0 ? 100 : 0) : Math.round(((thisWeek - lastWeek) / lastWeek) * 100)
  return { thisWeek, lastWeek, change }
}

const trendConfig: ChartConfig = { count: { label: 'Enquiries', color: 'var(--chart-1)' } }

export function EnquiriesTrendChart({ timestamps, days = 14 }: { timestamps: string[]; days?: number }) {
  const data = useMemo(() => buildDailySeries(timestamps, days), [timestamps, days])
  return (
    <ChartContainer config={trendConfig} className="h-56 w-full">
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="enquiries-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-count)" stopOpacity={0.28} />
            <stop offset="100%" stopColor="var(--color-count)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} interval="preserveStartEnd" minTickGap={24} tick={{ fontSize: 12 }} />
        <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={40} tick={{ fontSize: 12 }} />
        <ChartTooltip cursor={{ stroke: 'var(--border)' }} content={<ChartTooltipContent labelKey="label" nameKey="count" />} />
        <Area type="monotone" dataKey="count" stroke="var(--color-count)" strokeWidth={2.2} fill="url(#enquiries-fill)" dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
      </AreaChart>
    </ChartContainer>
  )
}

export type DonutSlice = { id: string; label: string; value: number; color?: string }

export function CoverageDonut({ slices, total, centerLabel, size = 184 }: { slices: DonutSlice[]; total: number; centerLabel: string; size?: number }) {
  const palette = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-4)', 'var(--chart-3)']
  const config = Object.fromEntries(slices.map((slice, index) => [slice.id, { label: slice.label, color: slice.color ?? palette[index % palette.length] }])) as ChartConfig
  const data = slices.map((slice, index) => ({ ...slice, fill: slice.color ?? palette[index % palette.length] }))
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <ChartContainer config={config} className="aspect-square h-full w-full">
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <ChartTooltip content={<ChartTooltipContent nameKey="label" hideLabel />} />
          <Pie data={data} dataKey="value" nameKey="label" innerRadius="70%" outerRadius="100%" paddingAngle={2} strokeWidth={0} isAnimationActive={false}>
            {data.map((slice) => (
              <Cell key={slice.id} fill={slice.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs font-medium text-muted-foreground">{centerLabel}</span>
        <span className="font-heading text-[28px] leading-8 font-bold text-foreground tabular-nums">{total}</span>
      </div>
    </div>
  )
}
