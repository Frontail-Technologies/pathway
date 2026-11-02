import type { StatusTone } from '@/features/admin/components/kit'
import type { BannerPlacement, BannerStatus } from '@/features/banners/types/banner'
import { bannerPlacementMap } from '@/features/banners/types/banner'

/** Admin-facing labels, sentence case. */
export const bannerStatusLabels: Record<BannerStatus, string> = {
  draft: 'Draft',
  scheduled: 'Scheduled',
  active: 'Live',
  paused: 'Paused',
  ended: 'Ended',
}

export const bannerStatusTones: Record<BannerStatus, StatusTone> = {
  draft: 'neutral',
  scheduled: 'info',
  active: 'success',
  paused: 'warning',
  ended: 'neutral',
}

export const bannerStatusHints: Record<BannerStatus, string> = {
  draft: 'Not shown on the site.',
  scheduled: 'Goes live at the start date.',
  active: 'Showing on the site.',
  paused: 'Hidden until you resume it.',
  ended: 'The end date has passed.',
}

export const bannerPlacementLabels: Record<BannerPlacement, string> = {
  homepage_admissions: 'Homepage · admissions',
  homepage_predictor: 'Homepage · college predictor',
  homepage_counselling: 'Homepage · counselling',
  study_abroad_cta: 'Study abroad page',
}

export const bannerPlacementHints: Record<BannerPlacement, string> = {
  homepage_admissions: 'Strip about upcoming admissions and deadlines.',
  homepage_predictor: 'Points students to the rank and college predictor.',
  homepage_counselling: 'Full-width strip for booking a counsellor.',
  study_abroad_cta: 'Guidance for applying to universities abroad.',
}

export const placementLabel = (placement: BannerPlacement) => bannerPlacementLabels[placement] ?? placement
export const placementDimensions = (placement: BannerPlacement) => bannerPlacementMap[placement]?.dimensionsLabel ?? '1200 × 400 px · 3:1'

export const bannerPlacementOptions = (Object.keys(bannerPlacementLabels) as BannerPlacement[]).map((value) => ({ value, label: bannerPlacementLabels[value] }))
export const bannerStatusOptions = (Object.keys(bannerStatusLabels) as BannerStatus[]).map((value) => ({ value, label: bannerStatusLabels[value] }))

export function formatBannerDate(value?: string, withTime = false) {
  if (!value) return null
  return new Date(value).toLocaleString('en-GB', withTime ? { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' } : { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatBannerWindow(startsAt?: string, endsAt?: string) {
  if (!startsAt && !endsAt) return 'No end date'
  return `${formatBannerDate(startsAt) ?? 'Now'} – ${formatBannerDate(endsAt) ?? 'no end date'}`
}
