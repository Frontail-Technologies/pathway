import type { OperationalAttentionSeverity } from '../types/dashboard'

export const ADMIN_ENQUIRY_TIME_RANGES = [
  { id: '7d', label: '7 Days' },
  { id: '30d', label: '30 Days' },
  { id: '90d', label: '90 Days' },
] as const

export const ADMIN_ATTENTION_PRESENTATION = {
  warning: {
    badgeClass: 'bg-warning-surface text-warning border-0',
    iconColor: 'text-warning',
  },
  info: {
    badgeClass: 'bg-secondary text-secondary-foreground border-0',
    iconColor: 'text-primary',
  },
  neutral: {
    badgeClass: 'bg-muted text-muted-foreground border-0',
    iconColor: 'text-muted-foreground',
  },
} satisfies Record<OperationalAttentionSeverity, { badgeClass: string; iconColor: string }>
