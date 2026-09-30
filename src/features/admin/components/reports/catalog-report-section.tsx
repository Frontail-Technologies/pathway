'use client'

import { PlatformReportsData } from '../../data/admin-reports'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart'
import { Building2, BookOpen, Award, GraduationCap, Users2, Sparkles, FileText } from 'lucide-react'

const chartColors = [
  '#1a56db',
  '#3b82f6',
  '#60a5fa',
  '#93c5fd',
  '#bfdbfe',
]

const programChartConfig: ChartConfig = {
  count: {
    label: 'Programs Count',
    color: '#1a56db',
  },
}

const schChartConfig: ChartConfig = {
  count: {
    label: 'Scholarships',
    color: '#3b82f6',
  },
}

export function CatalogReportSection({ data }: { data: PlatformReportsData['catalog'] }) {
  return (
    <section className="space-y-4">
      <h2 className="text-base font-bold font-heading text-foreground">
        Educational Catalog Distribution
      </h2>

      { }
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        <div className="bg-card rounded-lg p-3 border-0 shadow-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
            <Building2 className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-medium truncate">Institutions</span>
          </div>
          <div className="text-lg font-bold text-foreground">{data.totalInstitutions}</div>
        </div>

        <div className="bg-card rounded-lg p-3 border-0 shadow-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[11px] font-medium truncate">Programs</span>
          </div>
          <div className="text-lg font-bold text-foreground">{data.totalPrograms}</div>
        </div>

        <div className="bg-card rounded-lg p-3 border-0 shadow-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-[11px] font-medium truncate">Offerings</span>
          </div>
          <div className="text-lg font-bold text-foreground">{data.totalOfferings}</div>
        </div>

        <div className="bg-card rounded-lg p-3 border-0 shadow-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px] font-medium truncate">Scholarships</span>
          </div>
          <div className="text-lg font-bold text-foreground">{data.totalScholarships}</div>
        </div>

        <div className="bg-card rounded-lg p-3 border-0 shadow-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
            <Users2 className="w-3.5 h-3.5 text-purple-600" />
            <span className="text-[11px] font-medium truncate">Tutors</span>
          </div>
          <div className="text-lg font-bold text-foreground">{data.totalTutors}</div>
        </div>

        <div className="bg-card rounded-lg p-3 border-0 shadow-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-[11px] font-medium truncate">Coaching</span>
          </div>
          <div className="text-lg font-bold text-foreground">{data.totalCoaching}</div>
        </div>

        <div className="bg-card rounded-lg p-3 border-0 shadow-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
            <FileText className="w-3.5 h-3.5 text-rose-600" />
            <span className="text-[11px] font-medium truncate">Exams</span>
          </div>
          <div className="text-lg font-bold text-foreground">{data.totalExams}</div>
        </div>
      </div>

      { }
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        { }
        <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-foreground">Programs by Academic Level</h3>
          <div className="h-64 w-full">
            <ChartContainer config={programChartConfig} className="h-full w-full">
              <BarChart
                data={data.programsByLevel}
                margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis
                  dataKey="name"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                />
                <YAxis fontSize={11} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="count"
                  fill="#1a56db"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={45}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>

        { }
        <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-foreground">Institutions by Management Type</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 h-64">
            <div className="h-full w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.institutionsByType}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {data.institutionsByType.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.name}`}
                        fill={chartColors[index % chartColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any, name: any) => [`${val} institutions`, name]}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2.5 pr-2">
              {data.institutionsByType.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: chartColors[index % chartColors.length] }}
                    />
                    <span className="font-medium text-foreground">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">{item.count}</span>
                    <span className="text-muted-foreground text-[11px]">({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        { }
        <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-foreground">Scholarships by Provider</h3>
          <div className="h-64 w-full">
            <ChartContainer config={schChartConfig} className="h-full w-full">
              <BarChart
                data={data.scholarshipsByProvider}
                margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis fontSize={11} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="count"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={45}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>

        { }
        <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-foreground">Educator Delivery Modes</h3>
          <div className="h-64 flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-foreground">Tutors by Delivery Mode</span>
                <span className="text-muted-foreground">{data.totalTutors} Total Tutors</span>
              </div>
              <div className="space-y-1.5">
                {data.tutorsByMode.map((m) => (
                  <div key={m.name} className="space-y-0.5">
                    <div className="flex justify-between text-[11px] text-muted-foreground">
                      <span>{m.name}</span>
                      <span className="font-medium text-foreground">
                        {m.count} of {data.totalTutors} ({m.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${Math.min(m.percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-border/60">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-foreground">Coaching Institutes by Delivery Mode</span>
                <span className="text-muted-foreground">{data.totalCoaching} Total Providers</span>
              </div>
              <div className="space-y-1.5">
                {data.coachingByMode.map((m) => (
                  <div key={m.name} className="space-y-0.5">
                    <div className="flex justify-between text-[11px] text-muted-foreground">
                      <span>{m.name}</span>
                      <span className="font-medium text-foreground">
                        {m.count} of {data.totalCoaching} ({m.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${Math.min(m.percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
