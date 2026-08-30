export type TopExam = {
  name: string
  category: string
  href: string
}

export const topExams: TopExam[] = [
  { name: 'JEE Main', category: 'Engineering', href: '/exams?exam=jee-main' },
  { name: 'JEE Advanced', category: 'Engineering', href: '/exams?exam=jee-advanced' },
  { name: 'NEET UG', category: 'Medical', href: '/exams?exam=neet-ug' },
  { name: 'CUET UG', category: 'Undergraduate', href: '/exams?exam=cuet-ug' },
  { name: 'CAT', category: 'MBA', href: '/exams?exam=cat' },
  { name: 'GATE', category: 'Engineering PG', href: '/exams?exam=gate' },
  { name: 'CLAT', category: 'Law', href: '/exams?exam=clat' },
  { name: 'MAT', category: 'MBA', href: '/exams?exam=mat' },
  { name: 'XAT', category: 'MBA', href: '/exams?exam=xat' },
  { name: 'CMAT', category: 'MBA', href: '/exams?exam=cmat' },
  { name: 'BITSAT', category: 'Engineering', href: '/exams?exam=bitsat' },
  { name: 'WBJEE', category: 'Engineering', href: '/exams?exam=wbjee' },
]
