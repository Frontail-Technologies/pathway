import type { Promotion, PromotionPlacement } from '../types/promotion'

export const canonicalPromotions: Promotion[] = []

export function getCanonicalPromotions(): Promotion[] {
  return canonicalPromotions
}

export function getCanonicalPromotionById(id: string): Promotion | undefined {
  return canonicalPromotions.find((p) => p.id === id)
}

export function getCanonicalPromotionsByPlacement(
  placement: PromotionPlacement
): Promotion[] {
  return canonicalPromotions.filter((p) => p.placement === placement)
}
