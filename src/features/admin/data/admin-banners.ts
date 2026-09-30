import {
  Banner,
  BannerPlacement,
  BannerStatus,
  BannerPlacementMeta,
  bannerPlacementMap,
  bannerStatusMap,
} from '@/features/banners/types/banner'
import { canonicalBanners } from '@/features/banners/data/banners'
import { getBannerEffectiveStatus } from '@/features/banners/selectors/banner-selectors'

export interface AdminBanner extends Banner {
  effectiveStatus: BannerStatus
  placementMeta: BannerPlacementMeta
}

export function transformToAdminBanner(banner: Banner): AdminBanner {
  const effectiveStatus = getBannerEffectiveStatus(banner)
  const placementMeta = bannerPlacementMap[banner.placement] || {
    label: banner.placement,
    surface: 'Custom Surface',
    recommendedWidth: 1200,
    recommendedHeight: 400,
    ratioLabel: '3:1',
    dimensionsLabel: '1200 × 400 px · 3:1',
    description: 'Custom placement surface',
  }

  return {
    ...banner,
    effectiveStatus,
    placementMeta,
  }
}

export function getAdminBanners(): AdminBanner[] {
  return canonicalBanners.map(transformToAdminBanner)
}

export function getAdminBannerById(id: string): AdminBanner | undefined {
  const banner = canonicalBanners.find((b) => b.id === id)
  if (!banner) return undefined
  return transformToAdminBanner(banner)
}

export function getBannersSummaryStats(): {
  total: number
  active: number
  scheduled: number
  draft: number
  paused: number
  ended: number
} {
  const banners = getAdminBanners()
  return {
    total: banners.length,
    active: banners.filter((b) => b.effectiveStatus === 'active').length,
    scheduled: banners.filter((b) => b.effectiveStatus === 'scheduled').length,
    draft: banners.filter((b) => b.effectiveStatus === 'draft').length,
    paused: banners.filter((b) => b.effectiveStatus === 'paused').length,
    ended: banners.filter((b) => b.effectiveStatus === 'ended').length,
  }
}
