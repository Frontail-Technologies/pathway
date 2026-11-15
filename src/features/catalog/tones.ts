export type Tone = { solid: string; soft: string; text: string; gradient: string }

const brand: Tone = { solid: 'bg-primary', soft: 'bg-secondary', text: 'text-primary', gradient: 'bg-secondary text-primary' }

export const toneForArea = (..._labels: (string | null | undefined)[]): Tone => brand

export const toneForOwnership = (_type: string | null | undefined): Tone => brand

export const toneForProvider = (_type: string | null | undefined): Tone => brand
