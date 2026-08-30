export type TrendingCollege = {
  name: string
  city: string
  type: 'Government' | 'Private' | 'Deemed'
  href: string
}

export const trendingColleges: TrendingCollege[] = [
  { name: 'IIT Delhi', city: 'New Delhi', type: 'Government', href: '/college/iit-delhi' },
  { name: 'IIT Bombay', city: 'Mumbai', type: 'Government', href: '/college/iit-bombay' },
  { name: 'IIT Madras', city: 'Chennai', type: 'Government', href: '/college/iit-madras' },
  { name: 'Delhi University', city: 'New Delhi', type: 'Government', href: '/college/delhi-university' },
  { name: 'BITS Pilani', city: 'Pilani', type: 'Private', href: '/college/bits-pilani' },
  { name: 'VIT Vellore', city: 'Vellore', type: 'Private', href: '/college/vit-vellore' },
  { name: 'Manipal University', city: 'Manipal', type: 'Private', href: '/college/manipal-university' },
  { name: 'SRM Institute', city: 'Chennai', type: 'Private', href: '/college/srm-institute' },
]
