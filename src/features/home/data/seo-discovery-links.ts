export type SeoLinkGroup = {
  title: string
  links: { label: string; href: string }[]
}

export const seoDiscoveryLinkGroups: SeoLinkGroup[] = [
  {
    title: 'Popular Courses',
    links: [
      { label: 'B.Tech', href: '/courses?q=b-tech' },
      { label: 'MBA', href: '/courses?q=mba' },
      { label: 'MBBS', href: '/courses?q=mbbs' },
      { label: 'BCA', href: '/courses?q=bca' },
      { label: 'MCA', href: '/courses?q=mca' },
      { label: 'BBA', href: '/courses?q=bba' },
      { label: 'B.Sc Nursing', href: '/courses?q=b-sc-nursing' },
      { label: 'B.Pharm', href: '/courses?q=b-pharm' },
    ],
  },
  {
    title: 'Popular Exams',
    links: [
      { label: 'JEE Main', href: '/exams?exam=jee-main' },
      { label: 'NEET UG', href: '/exams?exam=neet-ug' },
      { label: 'CUET UG', href: '/exams?exam=cuet-ug' },
      { label: 'CAT', href: '/exams?exam=cat' },
      { label: 'GATE', href: '/exams?exam=gate' },
      { label: 'CLAT', href: '/exams?exam=clat' },
      { label: 'MAT', href: '/exams?exam=mat' },
      { label: 'XAT', href: '/exams?exam=xat' },
    ],
  },
  {
    title: 'Colleges by Location',
    links: [
      { label: 'Colleges in Delhi', href: '/colleges?city=delhi' },
      { label: 'Colleges in Mumbai', href: '/colleges?city=mumbai' },
      { label: 'Colleges in Bangalore', href: '/colleges?city=bangalore' },
      { label: 'Colleges in Pune', href: '/colleges?city=pune' },
      { label: 'Colleges in Hyderabad', href: '/colleges?city=hyderabad' },
      { label: 'Colleges in Chennai', href: '/colleges?city=chennai' },
      { label: 'Colleges in Kolkata', href: '/colleges?city=kolkata' },
      { label: 'Colleges in Jaipur', href: '/colleges?city=jaipur' },
    ],
  },
  {
    title: 'Popular Discovery',
    links: [
      { label: 'Engineering Colleges', href: '/colleges?stream=engineering' },
      { label: 'Medical Colleges', href: '/colleges?stream=medical' },
      { label: 'MBA Colleges', href: '/colleges?stream=mba' },
      { label: 'Government Colleges', href: '/colleges?type=government' },
      { label: 'Private Colleges', href: '/colleges?type=private' },
      { label: 'Scholarships', href: '/scholarships' },
      { label: 'College Predictor', href: '/college-predictor' },
      { label: 'Compare Colleges', href: '/compare' },
    ],
  },
]
