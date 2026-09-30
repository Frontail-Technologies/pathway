import { Badge, type badgeVariants } from '@/components/ui/badge'
import type { VariantProps } from 'class-variance-authority'
import type { AdminTutorQualityStatus, AdminTutorPortraitStatus } from '@/features/admin/data/admin-tutors'
import type { AdminCoachingQualityStatus } from '@/features/admin/data/admin-coaching'
import { CheckCircle2, AlertTriangle, AlertCircle, Camera, Sparkles, ImageOff } from 'lucide-react'

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>

export interface StatusBadgeMeta {
  label: string
  variant: BadgeVariant
  icon?: React.ComponentType<{ className?: string }>
}

export function getTutorQualityBadgeMeta(status: AdminTutorQualityStatus): StatusBadgeMeta {
  switch (status) {
    case 'Ready':
      return { label: 'Ready', variant: 'success', icon: CheckCircle2 }
    case 'Needs Review':
      return { label: 'Needs Review', variant: 'warning', icon: AlertTriangle }
    case 'Conflict':
      return { label: 'Conflict', variant: 'destructive', icon: AlertCircle }
    case 'Missing':
    default:
      return { label: 'Missing', variant: 'muted', icon: AlertCircle }
  }
}

export function getCoachingQualityBadgeMeta(status: AdminCoachingQualityStatus): StatusBadgeMeta {
  return getTutorQualityBadgeMeta(status as AdminTutorQualityStatus)
}

export function getTutorPortraitBadgeMeta(status: AdminTutorPortraitStatus): StatusBadgeMeta {
  switch (status) {
    case 'real':
      return { label: 'Real Photo', variant: 'success', icon: Camera }
    case 'illustration':
      return { label: 'Illustration', variant: 'info', icon: Sparkles }
    case 'missing':
    default:
      return { label: 'No Portrait', variant: 'muted', icon: ImageOff }
  }
}

export function getDetailPageBadgeMeta(hasDetailPage: boolean): StatusBadgeMeta {
  return hasDetailPage
    ? { label: 'Complete Detail', variant: 'success' }
    : { label: 'Listing Only', variant: 'muted' }
}

export function TutorQualityBadge({
  status,
}: {
  status: AdminTutorQualityStatus
}) {
  const meta = getTutorQualityBadgeMeta(status)
  const Icon = meta.icon

  return (
    <Badge variant={meta.variant} size="sm">
      {Icon && <Icon />}
      {meta.label}
    </Badge>
  )
}

export function CoachingQualityBadge({
  status,
}: {
  status: AdminCoachingQualityStatus
}) {
  const meta = getCoachingQualityBadgeMeta(status)
  const Icon = meta.icon

  return (
    <Badge variant={meta.variant} size="sm">
      {Icon && <Icon />}
      {meta.label}
    </Badge>
  )
}

export function TutorPortraitBadge({
  status,
}: {
  status: AdminTutorPortraitStatus
}) {
  const meta = getTutorPortraitBadgeMeta(status)
  const Icon = meta.icon

  return (
    <Badge variant={meta.variant} size="sm">
      {Icon && <Icon />}
      {meta.label}
    </Badge>
  )
}

export function DetailPageBadge({
  hasDetailPage,
}: {
  hasDetailPage: boolean
}) {
  const meta = getDetailPageBadgeMeta(hasDetailPage)

  return (
    <Badge variant={meta.variant} size="sm">
      {meta.label}
    </Badge>
  )
}
