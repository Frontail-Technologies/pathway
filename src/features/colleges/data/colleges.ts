export type CollegeListItem = {
  id: string
  slug: string
  name: string
  city: string
  state: string
  type: 'Government' | 'Private' | 'Deemed'
  approval: string
  degree: string
  popularCourse: string
  fees: string
  feesValue: number
  exam: string
  studyMode: 'Full-time' | 'Distance' | 'Online'
  placement: string
  rating: number
  reviewCount: number
  verified?: boolean
  sponsored?: boolean
}

export const colleges: CollegeListItem[] = [
  {
    id: 'c1',
    slug: 'iit-delhi',
    name: 'IIT Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    type: 'Government',
    approval: 'UGC Approved',
    degree: 'B.Tech',
    popularCourse: 'B.Tech Computer Science',
    fees: '₹2.2 Lakh',
    feesValue: 2.2,
    exam: 'JEE Advanced',
    studyMode: 'Full-time',
    placement: '₹21 LPA median',
    rating: 4.7,
    reviewCount: 2150,
    verified: true,
  },
  {
    id: 'c2',
    slug: 'iit-bombay',
    name: 'IIT Bombay',
    city: 'Mumbai',
    state: 'Maharashtra',
    type: 'Government',
    approval: 'UGC Approved',
    degree: 'B.Tech',
    popularCourse: 'B.Tech Computer Science',
    fees: '₹2.3 Lakh',
    feesValue: 2.3,
    exam: 'JEE Advanced',
    studyMode: 'Full-time',
    placement: '₹23 LPA median',
    rating: 4.8,
    reviewCount: 2480,
    verified: true,
  },
  {
    id: 'c3',
    slug: 'iit-madras',
    name: 'IIT Madras',
    city: 'Chennai',
    state: 'Tamil Nadu',
    type: 'Government',
    approval: 'UGC Approved',
    degree: 'B.Tech',
    popularCourse: 'B.Tech Electrical Engineering',
    fees: '₹2.1 Lakh',
    feesValue: 2.1,
    exam: 'JEE Advanced',
    studyMode: 'Full-time',
    placement: '₹19 LPA median',
    rating: 4.7,
    reviewCount: 1980,
    verified: true,
  },
  {
    id: 'c4',
    slug: 'bits-pilani',
    name: 'BITS Pilani',
    city: 'Pilani',
    state: 'Rajasthan',
    type: 'Private',
    approval: 'UGC Approved · Deemed University',
    degree: 'B.E.',
    popularCourse: 'B.E. Computer Science',
    fees: '₹5.2 Lakh',
    feesValue: 5.2,
    exam: 'BITSAT',
    studyMode: 'Full-time',
    placement: '₹15 LPA median',
    rating: 4.5,
    reviewCount: 1340,
    verified: true,
  },
  {
    id: 'c5',
    slug: 'vit-vellore',
    name: 'VIT Vellore',
    city: 'Vellore',
    state: 'Tamil Nadu',
    type: 'Private',
    approval: 'UGC Approved',
    degree: 'B.Tech',
    popularCourse: 'B.Tech Computer Science',
    fees: '₹4.8 Lakh',
    feesValue: 4.8,
    exam: 'VITEEE',
    studyMode: 'Full-time',
    placement: '₹7.5 LPA median',
    rating: 4.3,
    reviewCount: 3620,
    verified: true,
  },
  {
    id: 'c6',
    slug: 'delhi-university',
    name: 'Delhi University',
    city: 'New Delhi',
    state: 'Delhi',
    type: 'Government',
    approval: 'UGC Approved',
    degree: 'B.Com',
    popularCourse: 'B.Com (Hons)',
    fees: '₹45,000',
    feesValue: 0.45,
    exam: 'CUET UG',
    studyMode: 'Full-time',
    placement: '₹6 LPA median',
    rating: 4.4,
    reviewCount: 2890,
    verified: true,
  },
  {
    id: 'c7',
    slug: 'manipal-university',
    name: 'Manipal University',
    city: 'Manipal',
    state: 'Karnataka',
    type: 'Private',
    approval: 'UGC Approved · Deemed University',
    degree: 'B.Tech',
    popularCourse: 'B.Tech Information Technology',
    fees: '₹4.5 Lakh',
    feesValue: 4.5,
    exam: 'MET',
    studyMode: 'Full-time',
    placement: '₹8 LPA median',
    rating: 4.2,
    reviewCount: 1560,
    verified: true,
    sponsored: true,
  },
  {
    id: 'c8',
    slug: 'chandigarh-university',
    name: 'Chandigarh University',
    city: 'Chandigarh',
    state: 'Punjab',
    type: 'Private',
    approval: 'UGC Approved',
    degree: 'BBA',
    popularCourse: 'BBA',
    fees: '₹3.2 Lakh',
    feesValue: 3.2,
    exam: 'CUCET',
    studyMode: 'Full-time',
    placement: '₹5.5 LPA median',
    rating: 4.1,
    reviewCount: 4210,
  },
]

/**
 * UI-only infinite-scroll demo feed: cycles the 8 authored records to
 * simulate a larger listing without hand-authoring hundreds of records.
 * Each cycle gets a unique `id` suffix so list keys and per-card state
 * (e.g. compare selection) stay distinct.
 */
export const collegeFeedSize = 40

export function getCollegeFeed(): CollegeListItem[] {
  return Array.from({ length: collegeFeedSize }, (_, index) => {
    const base = colleges[index % colleges.length]
    const cycle = Math.floor(index / colleges.length)
    return cycle === 0 ? base : { ...base, id: `${base.id}-${cycle}` }
  })
}
