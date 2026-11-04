export type TermRef = { slug: string; label: string }
export type Place = { city: { slug: string; name: string } | null; state: { slug: string; name: string; code?: string } | null }

const LAKH_PAISE = 1e7

const trim = (value: number, digits = 1) => String(Number(value.toFixed(digits)))

export const lakhNumber = (paise: number) => Number((paise / LAKH_PAISE).toFixed(2))

export const formatLakh = (paise: number | null | undefined) => (paise == null ? '' : `₹${trim(paise / LAKH_PAISE, 2)} Lakh`)

export const formatLakhShort = (paise: number | null | undefined) => (paise == null ? '' : `₹${trim(paise / LAKH_PAISE, 2)}L`)

export function formatLakhRange(min: number | null | undefined, max: number | null | undefined) {
  if (min == null && max == null) return ''
  if (min == null || max == null || min === max) return formatLakh(min ?? max)
  return `₹${trim(min / LAKH_PAISE, 2)}–${trim(max / LAKH_PAISE, 2)} Lakh`
}

export const formatRupees = (paise: number | null | undefined) => (paise == null ? '' : `₹${Math.round(paise / 100).toLocaleString('en-IN')}`)

export const formatLpa = (paise: number | null | undefined) => (paise == null ? '' : `₹${trim(paise / LAKH_PAISE, 1)} LPA`)

export const labels = (terms: readonly TermRef[] | undefined) => (terms ?? []).map((term) => term.label)

export const cityName = (place: Place) => place.city?.name ?? ''
export const stateName = (place: Place) => place.state?.name ?? ''

export function durationText(months: number | null | undefined, label?: string | null) {
  if (label) return label
  if (!months) return ''
  if (months % 12 === 0) return `${months / 12} Year${months === 12 ? '' : 's'}`
  return `${months} Months`
}

export function formatDate(iso: string | null | undefined) {
  if (!iso) return ''
  const date = new Date(`${iso.slice(0, 10)}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
}

export const enumLabel = (value: string | null | undefined) => (value ? value.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()) : '')
