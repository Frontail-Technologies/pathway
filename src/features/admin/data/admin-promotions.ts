import { colleges } from '@/features/colleges/data/colleges'
import { courses } from '@/features/courses/data/courses'
import { scholarships } from '@/features/scholarships/data/scholarships'
import { exams } from '@/features/exams/data/exams'
import { tutors } from '@/features/tutors/data/tutors'
import { coachingProviders } from '@/features/coaching/data/coaching'
import type {
  Promotion,
  PromotionKind,
  PromotionTargetType,
  PromotionPlacement,
  PromotionStatus,
} from '@/features/promotions/types/promotion'
import {
  promotionKindMap,
  promotionPlacementMap,
  promotionTargetTypeMap,
  promotionStatusMap,
  getPromotionScheduleStatus,
} from '@/features/promotions/types/promotion'
import { canonicalPromotions } from '@/features/promotions/data/promotions'

export type {
  Promotion,
  PromotionKind,
  PromotionTargetType,
  PromotionPlacement,
  PromotionStatus,
}
export {
  promotionKindMap,
  promotionPlacementMap,
  promotionTargetTypeMap,
  promotionStatusMap,
  getPromotionScheduleStatus,
}

export type AdminPromotion = Promotion & {
  targetName?: string
  targetSubtitle?: string
  targetAdminUrl?: string
  targetPublicUrl?: string
  targetImageUrl?: string
  kindLabel: string
  placementLabel: string
  targetTypeLabel: string
  statusLabel: string
  effectiveStatus: PromotionStatus
  scraperExcluded: boolean
}

export function resolvePromotionTarget(
  targetType: PromotionTargetType,
  targetId: string
): {
  name?: string
  subtitle?: string
  adminUrl?: string
  publicUrl?: string
  imageUrl?: string
} {
  switch (targetType) {
    case 'institution': {
      const col = colleges.find((c) => c.slug === targetId || c.id === targetId)
      return {
        name: col?.name ?? targetId,
        subtitle: col ? `${col.city}, ${col.state} • ${col.type}` : undefined,
        adminUrl: col ? `/admin/institutions/${col.id || col.slug}` : undefined,
        publicUrl: col ? `/college/${col.slug}` : undefined,
        imageUrl: undefined,
      }
    }
    case 'program': {
      const crs = courses.find((c) => c.slug === targetId || c.id === targetId)
      return {
        name: crs?.name ?? targetId,
        subtitle: crs ? `${crs.stream} • ${crs.duration}` : undefined,
        adminUrl: crs ? `/admin/programs/${crs.id || crs.slug}` : undefined,
        publicUrl: crs ? `/course/${crs.slug}` : undefined,
      }
    }
    case 'scholarship': {
      const sch = scholarships.find((s) => s.slug === targetId || s.id === targetId)
      return {
        name: sch?.name ?? targetId,
        subtitle: sch ? `${sch.provider} • ${sch.scholarshipType}` : undefined,
        adminUrl: sch ? `/admin/scholarships/${sch.id || sch.slug}` : undefined,
        publicUrl: sch ? `/scholarship/${sch.slug}` : undefined,
      }
    }
    case 'exam': {
      const exm = exams.find((e) => e.slug === targetId || e.id === targetId)
      return {
        name: exm?.name ?? targetId,
        subtitle: exm ? `${exm.level} • ${exm.scope}` : undefined,
        adminUrl: undefined,
        publicUrl: exm ? `/exam/${exm.slug}` : undefined,
      }
    }
    case 'tutor': {
      const tut = tutors.find((t) => t.slug === targetId || t.id === targetId)
      return {
        name: tut?.name ?? targetId,
        subtitle: tut ? `${tut.headline} • ${tut.subjects.join(', ')}` : undefined,
        adminUrl: tut ? `/admin/tutors-coaching/tutors/${tut.id || tut.slug}` : undefined,
        publicUrl: tut ? `/tutor/${tut.slug}` : undefined,
        imageUrl: tut?.portrait,
      }
    }
    case 'coaching': {
      const coa = coachingProviders.find((c) => c.slug === targetId || c.id === targetId)
      return {
        name: coa?.name ?? targetId,
        subtitle: coa ? `${coa.location} • ${coa.providerType}` : undefined,
        adminUrl: coa ? `/admin/tutors-coaching/coaching/${coa.id || coa.slug}` : undefined,
        publicUrl: coa ? `/coaching/${coa.slug}` : undefined,
        imageUrl: coa?.gallery?.[0],
      }
    }
    default:
      return { name: targetId }
  }
}

export function getTargetOptionsForType(
  targetType: PromotionTargetType
): { id: string; label: string; subtext?: string }[] {
  switch (targetType) {
    case 'institution':
      return colleges.map((c) => ({
        id: c.slug,
        label: c.name,
        subtext: `${c.city}, ${c.state}`,
      }))
    case 'program':
      return courses.map((c) => ({
        id: c.slug,
        label: c.name,
        subtext: `${c.stream} (${c.duration})`,
      }))
    case 'scholarship':
      return scholarships.map((s) => ({
        id: s.slug,
        label: s.name,
        subtext: s.provider,
      }))
    case 'exam':
      return exams.map((e) => ({
        id: e.slug,
        label: e.name,
        subtext: e.level,
      }))
    case 'tutor':
      return tutors.map((t) => ({
        id: t.slug,
        label: t.name,
        subtext: t.headline,
      }))
    case 'coaching':
      return coachingProviders.map((c) => ({
        id: c.slug,
        label: c.name,
        subtext: `${c.location} (${c.providerType})`,
      }))
    default:
      return []
  }
}

export function mapToAdminPromotion(promotion: Promotion): AdminPromotion {
  const resolved = resolvePromotionTarget(promotion.targetType, promotion.targetId)
  const effectiveStatus = getPromotionScheduleStatus(promotion)

  return {
    ...promotion,
    targetName: resolved.name,
    targetSubtitle: resolved.subtitle,
    targetAdminUrl: resolved.adminUrl,
    targetPublicUrl: resolved.publicUrl,
    targetImageUrl: resolved.imageUrl,
    kindLabel: promotionKindMap[promotion.kind]?.label ?? promotion.kind,
    placementLabel: promotionPlacementMap[promotion.placement]?.label ?? promotion.placement,
    targetTypeLabel: promotionTargetTypeMap[promotion.targetType]?.label ?? promotion.targetType,
    statusLabel: promotionStatusMap[effectiveStatus]?.label ?? effectiveStatus,
    effectiveStatus,
    scraperExcluded: true,
  }
}

export function getAdminPromotions(): AdminPromotion[] {
  return canonicalPromotions.map(mapToAdminPromotion)
}

export function getAdminPromotionById(id: string): AdminPromotion | undefined {
  const item = canonicalPromotions.find((p) => p.id === id)
  if (!item) return undefined
  return mapToAdminPromotion(item)
}

export function getPromotionSummaryStats(): {
  total: number
  featuredCount: number
  sponsoredCount: number
  activeCount: number
} {
  const all = getAdminPromotions()
  return {
    total: all.length,
    featuredCount: all.filter((p) => p.kind === 'featured').length,
    sponsoredCount: all.filter((p) => p.kind === 'sponsored').length,
    activeCount: all.filter((p) => p.effectiveStatus === 'active').length,
  }
}
