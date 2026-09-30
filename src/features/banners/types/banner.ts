export type BannerManualStatus = 'draft' | 'active' | 'paused'
export type BannerEffectiveStatus = 'draft' | 'scheduled' | 'active' | 'paused' | 'ended'
export type BannerStatus = BannerEffectiveStatus

export type BannerPlacement =
  | 'homepage_admissions'
  | 'homepage_predictor'
  | 'homepage_counselling'
  | 'study_abroad_cta'

export type Banner = {
  id: string
  name: string
  title: string
  description?: string
  eyebrow?: string
  image?: string
  mobileImage?: string
  imageAlt?: string
  ctaLabel?: string
  ctaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  status: BannerManualStatus | BannerStatus
  startsAt?: string
  endsAt?: string
  placement: BannerPlacement
  createdAt?: string
  updatedAt?: string
}

export interface BannerPlacementMeta {
  label: string
  surface: string
  recommendedWidth: number
  recommendedHeight: number
  ratioLabel: string
  dimensionsLabel: string
  description: string
}

export const bannerPlacementMap: Record<BannerPlacement, BannerPlacementMeta> = {
  homepage_admissions: {
    label: 'Homepage — Admissions Callout',
    surface: 'Homepage',
    recommendedWidth: 1200,
    recommendedHeight: 400,
    ratioLabel: '3:1',
    dimensionsLabel: '1200 × 400 px · 3:1',
    description: 'Promotional strip highlighting upcoming admissions cycles and deadline awareness.',
  },
  homepage_predictor: {
    label: 'Homepage — Rank & College Predictor Banner',
    surface: 'Homepage',
    recommendedWidth: 1200,
    recommendedHeight: 500,
    ratioLabel: '12:5',
    dimensionsLabel: '1200 × 500 px · 12:5',
    description: 'Interactive tool callout encouraging students to calculate admission probabilities.',
  },
  homepage_counselling: {
    label: 'Homepage — 1-on-1 Counselling CTA Strip',
    surface: 'Homepage',
    recommendedWidth: 1200,
    recommendedHeight: 450,
    ratioLabel: '8:3',
    dimensionsLabel: '1200 × 450 px · 8:3',
    description: 'Full-width guidance strip connecting students with verified academic counsellors.',
  },
  study_abroad_cta: {
    label: 'Study Abroad — Guidance & Scholarships Strip',
    surface: 'Study Abroad',
    recommendedWidth: 1200,
    recommendedHeight: 480,
    ratioLabel: '5:2',
    dimensionsLabel: '1200 × 480 px · 5:2',
    description: 'Global admissions guidance callout for international university applications.',
  },
}

export const bannerStatusMap: Record<
  BannerStatus,
  {
    label: string
    variant: 'default' | 'secondary' | 'outline' | 'destructive'
    description: string
  }
> = {
  draft: {
    label: 'Draft',
    variant: 'secondary',
    description: 'Work in progress, not visible on public surfaces.',
  },
  scheduled: {
    label: 'Scheduled',
    variant: 'outline',
    description: 'Configured with future start date, pending activation.',
  },
  active: {
    label: 'Active',
    variant: 'default',
    description: 'Currently eligible for display on mapped surfaces.',
  },
  paused: {
    label: 'Paused',
    variant: 'secondary',
    description: 'Manually paused by administrator.',
  },
  ended: {
    label: 'Ended',
    variant: 'destructive',
    description: 'Schedule window has passed.',
  },
}

export const suggestedPathwayRoutes: { label: string; href: string }[] = [
  { label: 'Colleges Listing', href: '/colleges' },
  { label: 'College Predictor', href: '/college-predictor' },
  { label: 'Rank Predictor', href: '/rank-predictor' },
  { label: 'Study Abroad', href: '/study-abroad' },
  { label: 'Careers Explorer', href: '/careers' },
  { label: 'Scholarships', href: '/scholarships' },
  { label: 'Tutors Directory', href: '/tutors' },
  { label: 'Coaching Directory', href: '/coaching' },
  { label: 'Exams Directory', href: '/exams' },
]
