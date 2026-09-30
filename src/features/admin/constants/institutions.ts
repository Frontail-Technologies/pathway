import { AlertCircle, Check, X, type LucideIcon } from 'lucide-react'
import type {
  AdminContentStatus,
  AdminDataQualityStatus,
  SectionCompletenessState,
  SectionQualityState,
} from '../types/institutions'
import { adminStatusBadgeClassNames, adminStatusBadgeVariants } from './status'

type BadgePresentation = {
  label: string
  className: string
  variant: 'success' | 'warning' | 'destructive' | 'muted'
}
type CheckPresentation = {
  icon: LucideIcon
  badgeClass: string
  label: string
  variant: 'success' | 'warning' | 'muted'
}

export const institutionDirectoryQualityBadgeStyles: Record<AdminDataQualityStatus, BadgePresentation> = {
  ready: { label: 'Ready', className: adminStatusBadgeClassNames.success, variant: adminStatusBadgeVariants.success },
  needs_review: { label: 'Needs Review', className: adminStatusBadgeClassNames.warning, variant: adminStatusBadgeVariants.warning },
  conflict: { label: 'Conflict', className: adminStatusBadgeClassNames.destructive, variant: adminStatusBadgeVariants.destructive },
  incomplete: { label: 'Incomplete', className: adminStatusBadgeClassNames.muted, variant: adminStatusBadgeVariants.muted },
}

export const institutionDetailQualityBadgeStyles: Record<AdminDataQualityStatus, BadgePresentation> = {
  ready: { label: 'Ready for Publish', className: adminStatusBadgeClassNames.success, variant: adminStatusBadgeVariants.success },
  needs_review: { label: 'Needs Review', className: adminStatusBadgeClassNames.warning, variant: adminStatusBadgeVariants.warning },
  conflict: { label: 'Conflict Detected', className: adminStatusBadgeClassNames.destructive, variant: adminStatusBadgeVariants.destructive },
  incomplete: { label: 'Incomplete Data', className: adminStatusBadgeClassNames.muted, variant: adminStatusBadgeVariants.muted },
}

export const institutionContentStatusBadgeStyles: Record<AdminContentStatus, BadgePresentation> = {
  complete: { label: 'Complete', className: adminStatusBadgeClassNames.success, variant: adminStatusBadgeVariants.success },
  partial: { label: 'Partial', className: adminStatusBadgeClassNames.warning, variant: adminStatusBadgeVariants.warning },
  basic: { label: 'Basic', className: adminStatusBadgeClassNames.muted, variant: adminStatusBadgeVariants.muted },
}

export const institutionQualityCheckStyles: Record<SectionQualityState, CheckPresentation> = {
  ready: { icon: Check, badgeClass: adminStatusBadgeClassNames.success, label: 'Ready', variant: adminStatusBadgeVariants.success },
  needs_review: { icon: AlertCircle, badgeClass: adminStatusBadgeClassNames.warning, label: 'Needs Review', variant: adminStatusBadgeVariants.warning },
  missing: { icon: X, badgeClass: adminStatusBadgeClassNames.muted, label: 'Missing', variant: adminStatusBadgeVariants.muted },
}

export const institutionCompletenessStatusStyles: Record<SectionCompletenessState, CheckPresentation> = {
  complete: { icon: Check, badgeClass: adminStatusBadgeClassNames.success, label: 'Complete', variant: adminStatusBadgeVariants.success },
  partial: { icon: AlertCircle, badgeClass: adminStatusBadgeClassNames.warning, label: 'Partial', variant: adminStatusBadgeVariants.warning },
  missing: { icon: X, badgeClass: adminStatusBadgeClassNames.muted, label: 'Missing', variant: adminStatusBadgeVariants.muted },
}
