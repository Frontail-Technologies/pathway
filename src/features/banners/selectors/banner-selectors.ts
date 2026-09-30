import { Banner, BannerStatus } from '../types/banner'

export function getBannerEffectiveStatus(banner: Banner, now: Date = new Date()): BannerStatus {
  if (banner.status === 'draft') return 'draft'
  if (banner.status === 'paused') return 'paused'

  const currentTime = now.getTime()

  if (banner.startsAt) {
    const startTime = new Date(banner.startsAt).getTime()
    if (!isNaN(startTime) && currentTime < startTime) {
      return 'scheduled'
    }
  }

  if (banner.endsAt) {
    const endTime = new Date(banner.endsAt).getTime()
    if (!isNaN(endTime) && currentTime > endTime) {
      return 'ended'
    }
  }

  return 'active'
}
