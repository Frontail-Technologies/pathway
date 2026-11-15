export const rankExamFromSlug: Record<string, string> = { 'jee-main': 'JEE Main' }

export const jeeMainCandidates = { year: 2025, appeared: 1_475_103, source: 'NTA JEE (Main) 2025 result press note' }

export const referencePercentiles = [99.99, 99.9, 99.5, 99, 98, 97, 95, 92, 90, 85, 80, 75]

export function rankFromPercentile(percentile: number, appeared = jeeMainCandidates.appeared) {
  return Math.max(1, Math.round(((100 - percentile) * appeared) / 100))
}

export function parsePercentile(raw: string | undefined) {
  if (!raw) return null
  const value = Number(raw)
  return Number.isFinite(value) && value > 0 && value <= 100 ? value : null
}
