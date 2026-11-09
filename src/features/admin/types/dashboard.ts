export type AdminKPI = {
  id: string
  label: string
  value: string | number
  subtext: string
  iconName: 'Building' | 'BookOpen' | 'Award' | 'Users' | 'MessageSquareQuote'
  iconColor: 'blue' | 'amber' | 'emerald' | 'purple' | 'indigo'
  connected: boolean
}

export type CatalogDomainItem = {
  id: string
  label: string
  count: number
  percentageOfMax: number
}

export type ContentCompletenessItem = {
  id: string
  label: string
  completedCount: number
  totalCount: number
  percentage: number
  exampleNote?: string
}

export type OperationalAttentionSeverity = 'warning' | 'info' | 'neutral'

export type OperationalAttentionTask = {
  id: string
  title: string
  description: string
  severity: OperationalAttentionSeverity
  badgeText: string
  actionLabel: string
}

export type LeadPipelineStage = {
  id: string
  label: string
  count: number
  percentage: number
}


export type EnquiryTrendPoint = {
  date: string
  enquiries: number
}
