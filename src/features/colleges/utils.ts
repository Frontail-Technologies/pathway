import type { CollegeDetailData, Faq } from './data/college-detail'

export const collegeInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter((part) => /^[A-Z]/.test(part))
    .map((part) => part[0])
    .slice(0, 3)
    .join('') || name.slice(0, 2).toUpperCase()

const listOf = (items: string[], max = 6) => (items.length > max ? `${items.slice(0, max).join(', ')} and ${items.length - max} more` : items.join(', '))

export function collegeFactFaqs(college: CollegeDetailData): Faq[] {
  const place = [college.city, college.state].filter(Boolean).join(', ')
  const rank = college.highlights?.rank
  const exams = [...new Set(college.admissions.flatMap((block) => block.exam.split(' / ')).filter(Boolean))]
  const faqs: (Faq | null)[] = [
    place ? { question: `Where is ${college.name} located?`, answer: `${college.fullName} is located in ${place}.` } : null,
    college.established ? { question: `When was ${college.name} established?`, answer: `${college.name} was established in ${college.established}.` } : null,
    {
      question: `Is ${college.name} a government or private institution?`,
      answer: `${college.name} is a ${college.type.toLowerCase()} institution${college.instituteStatus ? ` with ${college.instituteStatus} status` : ''}${college.approval ? `, approved by ${college.approval}` : ''}.`,
    },
    college.courses.length
      ? { question: `Which courses does ${college.name} offer?`, answer: `Pathway lists ${college.courses.length} ${college.courses.length === 1 ? 'programme' : 'programmes'} at ${college.name}: ${listOf(college.courses.map((course) => course.name))}.` }
      : null,
    rank?.rank != null ? { question: `What is the NIRF rank of ${college.name}?`, answer: `${college.name} is ranked #${rank.rank} in the ${rank.source} ${rank.year} ${rank.category === 'Overall' ? 'overall' : rank.category} ranking.` } : null,
    exams.length ? { question: `Which entrance exams does ${college.name} accept?`, answer: `${college.name} admits students through ${listOf(exams)}.` } : null,
    college.highlights?.packageValue ? { question: `What is the placement package at ${college.name}?`, answer: `The ${college.highlights.packageLabel ? college.highlights.packageLabel.replace(/^./, (c) => c.toLowerCase()) : 'reported package'} at ${college.name} is ${college.highlights.packageValue}, as reported to NIRF.` } : null,
    college.naacGrade ? { question: `What is the NAAC grade of ${college.name}?`, answer: `${college.name} holds a NAAC ${college.naacGrade.replace(/^NAAC\s*/i, '')} grade.` } : null,
  ]
  return faqs.filter((faq): faq is Faq => Boolean(faq))
}

const institutePrefixes: [RegExp, string][] = [
  [/^Indian Institute of Technology \(Banaras Hindu University\)/, 'IIT (BHU)'],
  [/^Indian Institute of Technology/, 'IIT'],
  [/^National Institute of Technology/, 'NIT'],
  [/^Indian Institute of Information Technology/, 'IIIT'],
  [/^Indian Institute of Management/, 'IIM'],
  [/^Indian Institute of Science Education and Research/, 'IISER'],
  [/^Indian Institute of Science\b/, 'IISc'],
  [/^All India Institute of Medical Sciences,?/, 'AIIMS'],
]

export const shortInstituteName = (name: string) => institutePrefixes.reduce((value, [pattern, short]) => value.replace(pattern, short), name).replace(/\s+/g, ' ').trim()
