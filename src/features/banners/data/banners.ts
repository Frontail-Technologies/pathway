import { Banner } from '../types/banner'

export const canonicalBanners: Banner[] = []

export function getBanners(): Banner[] {
  return canonicalBanners
}

export function getBannerById(id: string): Banner | undefined {
  return canonicalBanners.find((banner) => banner.id === id)
}
