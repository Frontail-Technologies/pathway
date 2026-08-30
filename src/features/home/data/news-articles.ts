export type NewsArticle = {
  id: string
  category: string
  date: string
  title: string
  description?: string
  href: string
  image?: string
  imageAlt?: string
}

export const newsArticles: NewsArticle[] = [
  {
    id: 'cuet-2026-registration-window',
    category: 'Admissions',
    date: 'Aug 28, 2026',
    title: 'CUET UG 2026 registration window opens for over 300 universities',
    description: 'Candidates can now apply for the common entrance test used for admission to central and state universities across India.',
    href: '/article/cuet-2026-registration-window',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=75',
    imageAlt: 'A university building with a large lawn in front',
  },
  {
    id: 'jee-main-session-2-admit-card',
    category: 'Exams',
    date: 'Aug 26, 2026',
    title: 'JEE Main 2026 Session 2 admit card expected this week',
    href: '/article/jee-main-session-2-admit-card',
  },
  {
    id: 'neet-counselling-round-2-result',
    category: 'Counselling',
    date: 'Aug 24, 2026',
    title: 'NEET UG counselling Round 2 seat allotment result declared',
    href: '/article/neet-counselling-round-2-result',
  },
  {
    id: 'national-scholarship-deadline-extended',
    category: 'Scholarships',
    date: 'Aug 22, 2026',
    title: 'National Scholarship Portal extends application deadline to September',
    href: '/article/national-scholarship-deadline-extended',
  },
  {
    id: 'engineering-college-rankings-2026',
    category: 'Rankings',
    date: 'Aug 20, 2026',
    title: 'Engineering college rankings 2026: what changed this year',
    href: '/article/engineering-college-rankings-2026',
  },
]
