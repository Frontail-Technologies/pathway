import type { CoachingProvider, CoachingProviderType } from './coaching'

/** Badge label/color still follows provider type — only the photo is per-provider (see below). */
const providerTypeBadge: Record<CoachingProviderType, { label: string; accentClass: string }> = {
  'Coaching Institute': { label: 'Institute', accentClass: 'bg-secondary text-primary' },
  'Online Platform': { label: 'Online', accentClass: 'bg-accent text-accent-foreground' },
}

type ProviderPhoto = { src: string; alt: string; objectPosition: string }

/**
 * Each of the 9 coaching providers gets a deliberately assigned photo (keyed
 * by slug, not by `providerType`) — visual polish pass. Reusing one shared
 * image per type was what made the Recommended strip and result list look
 * duplicated even though the underlying records are unique. No image implies
 * a private tutor/one-person setup (see `/coaching` scope rule).
 */
const providerPhotosBySlug: Record<string, ProviderPhoto> = {
  'apex-jee-academy-kota': { src: '/coaching/apex-jee-academy.jpg', alt: 'Students in a classroom taking notes', objectPosition: 'center 30%' },
  'medprep-institute-delhi': { src: '/coaching/coaching-institute.png', alt: 'Classroom setup with study materials', objectPosition: 'center center' },
  'central-cuet-classes-pune': { src: '/coaching/coaching-online.png', alt: 'Laptop set up for an online class', objectPosition: 'center center' },
  'horizon-cat-coaching-mumbai': { src: '/coaching/horizon-cat-coaching.jpg', alt: 'Seminar-style session with a presenter and seated group', objectPosition: 'center 35%' },
  'commerce-edge-online': { src: '/coaching/commerce-edge-online.jpg', alt: 'Laptop on a study desk for online classes', objectPosition: 'center center' },
  'gateworks-engineering-bengaluru': { src: '/coaching/gateworks-engineering.jpg', alt: 'Handwritten engineering problem-solving notes', objectPosition: 'center center' },
  'lawprep-circle-lucknow': { src: '/coaching/lawprep-circle.jpg', alt: 'Stack of study books', objectPosition: 'center center' },
  'design-aptitude-studio-ahmedabad': { src: '/coaching/design-aptitude-studio.jpg', alt: 'Paintbrush and colours on a sketching canvas', objectPosition: 'center center' },
  'science-bridge-foundation-chennai': { src: '/coaching/science-bridge-foundation.jpg', alt: 'Group study session with laptops', objectPosition: 'center center' },
}

const fallbackPhoto: ProviderPhoto = { src: '/coaching/coaching-institute.png', alt: 'Classroom setup with study materials', objectPosition: 'center center' }

export function getCoachingVisual(provider: CoachingProvider) {
  const badge = providerTypeBadge[provider.providerType]
  const photo = providerPhotosBySlug[provider.slug] ?? fallbackPhoto
  return { ...photo, ...badge }
}
