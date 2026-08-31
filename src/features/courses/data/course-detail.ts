export type CourseFact = { label: string; value: string }

export type FeeRow = { institutionType: string; feeRange: string }
export type FeeComponent = { label: string; value: string }

export type ExamItem = { name: string; level: string; purpose: string }

export type SpecializationItem = { name: string; description?: string }

export type SyllabusYear = { year: string; subjects: string[] }

export type CareerItem = { role: string; description: string }
export type CareerMetric = { label: string; value: string }

export type CourseCollegeRow = {
  slug: string
  name: string
  city: string
  type: string
  exam: string
  fees: string
  verified?: boolean
  rating?: number
  /**
   * Where "View College" navigates. Only colleges with an implemented
   * College Detail record (see `features/colleges/data/college-detail.ts`)
   * link straight to `/college/[slug]` — every other mock row falls back to
   * `/colleges` so browsing never knowingly lands on a 404.
   */
  href: string
}

export type RelatedCourse = {
  slug: string
  name: string
  level: string
  duration: string
  /**
   * Where "Explore" navigates. Only a course with an implemented Course
   * Detail record links straight to `/course/[slug]`; unimplemented mock
   * courses fall back to a CRS-01-supported filtered `/courses` URL (or
   * plain `/courses` when no valid filter combination applies).
   */
  href: string
}

export type Faq = { question: string; answer: string }

export type CourseDetailData = {
  slug: string
  name: string
  fullName: string
  degree: string
  level: string
  stream: string
  specialization: string
  duration: string
  mode: string
  eligibilitySummary: string
  examsSummary: string
  feesSummary: string
  collegesCount: string
  overviewCopy: string
  facts: CourseFact[]
  eligibility: {
    academic: string
    subjects: string
    minimumMarks: string
    entrance: string
    note: string
  }
  fees: FeeRow[]
  feeComponents: FeeComponent[]
  exams: ExamItem[]
  specializations: SpecializationItem[]
  syllabus: SyllabusYear[]
  careers: CareerItem[]
  careerMetrics: CareerMetric[]
  colleges: CourseCollegeRow[]
  relatedCourses: RelatedCourse[]
  faqs: Faq[]
}

const courseDetails: Record<string, CourseDetailData> = {
  'btech-computer-science': {
    slug: 'btech-computer-science',
    name: 'B.Tech Computer Science',
    fullName: 'Bachelor of Technology in Computer Science & Engineering',
    degree: 'B.Tech',
    level: 'Undergraduate',
    stream: 'Engineering',
    specialization: 'Computer Science',
    duration: '4 Years',
    mode: 'Full Time',
    eligibilitySummary: '10+2 with PCM',
    examsSummary: 'JEE Main / JEE Advanced',
    feesSummary: '₹2–8 Lakh',
    collegesCount: '120+',
    overviewCopy:
      'B.Tech Computer Science is a 4-year undergraduate engineering programme covering programming, data structures, algorithms, systems, and software engineering, with growing emphasis on AI, data science, and cloud computing electives in the later years.',
    facts: [
      { label: 'Level', value: 'Undergraduate' },
      { label: 'Duration', value: '4 Years' },
      { label: 'Mode', value: 'Full Time' },
      { label: 'Stream', value: 'Engineering' },
      { label: 'Degree', value: 'B.Tech' },
      { label: 'Typical Fees', value: '₹2–8 Lakh' },
      { label: 'Colleges', value: '120+' },
    ],
    eligibility: {
      academic: '10+2 or equivalent from a recognised board',
      subjects: 'Physics, Chemistry, Mathematics (PCM)',
      minimumMarks: '50–60% aggregate, varies by institute',
      entrance: 'JEE Main / JEE Advanced / select state engineering entrance exams',
      note: 'Eligibility criteria vary by institution — always confirm exact requirements on the official college/exam website.',
    },
    fees: [
      { institutionType: 'Government', feeRange: '₹1–4 Lakh' },
      { institutionType: 'Private', feeRange: '₹4–12 Lakh' },
      { institutionType: 'Deemed University', feeRange: '₹5–15 Lakh' },
    ],
    feeComponents: [
      { label: 'Tuition', value: '₹1.5–10 Lakh' },
      { label: 'Hostel', value: '₹0.6–2 Lakh' },
      { label: 'Exam / Other', value: '₹0.1–0.4 Lakh' },
    ],
    exams: [
      { name: 'JEE Main', level: 'National', purpose: 'NIT/IIIT/state college admissions' },
      { name: 'JEE Advanced', level: 'National', purpose: 'IIT admissions' },
      { name: 'BITSAT', level: 'National', purpose: 'BITS Pilani campuses' },
      { name: 'VITEEE', level: 'National', purpose: 'VIT campuses' },
      { name: 'CUET UG', level: 'National', purpose: 'Central university admissions' },
      { name: 'State CET', level: 'State', purpose: 'State engineering colleges' },
    ],
    specializations: [
      { name: 'Artificial Intelligence', description: 'ML models, neural networks, applied AI systems' },
      { name: 'Data Science', description: 'Data engineering, analytics, visualization' },
      { name: 'Machine Learning', description: 'Predictive modelling and deep learning' },
      { name: 'Cyber Security', description: 'Network security and ethical hacking' },
      { name: 'Cloud Computing', description: 'Distributed systems and cloud infrastructure' },
      { name: 'Software Engineering', description: 'Large-scale application design and delivery' },
      { name: 'Information Technology', description: 'Enterprise systems and IT infrastructure' },
    ],
    syllabus: [
      { year: 'Year 1', subjects: ['Programming Fundamentals', 'Engineering Mathematics', 'Digital Logic'] },
      { year: 'Year 2', subjects: ['Data Structures', 'Algorithms', 'Database Systems'] },
      { year: 'Year 3', subjects: ['Operating Systems', 'Computer Networks', 'Software Engineering'] },
      { year: 'Year 4', subjects: ['AI / ML Electives', 'Major Project', 'Advanced Electives'] },
    ],
    careers: [
      { role: 'Software Engineer', description: 'Application and systems development' },
      { role: 'Data Scientist', description: 'Analytics and predictive modelling' },
      { role: 'Machine Learning Engineer', description: 'ML pipelines and model deployment' },
      { role: 'Cloud Engineer', description: 'Cloud infrastructure and DevOps' },
      { role: 'Cyber Security Analyst', description: 'Security auditing and threat response' },
      { role: 'Product Engineer', description: 'End-to-end product development' },
      { role: 'DevOps Engineer', description: 'CI/CD and infrastructure automation' },
    ],
    careerMetrics: [
      { label: 'Popular Career Paths', value: '7+' },
      { label: 'Industry Demand', value: 'High' },
      { label: 'Typical Entry Range', value: '₹4–12 LPA' },
      { label: 'Higher Studies', value: 'M.Tech / MS / MBA' },
    ],
    colleges: [
      // Only IIT Delhi has an implemented College Detail record — see the
      // `href` doc comment on `CourseCollegeRow` above.
      { slug: 'iit-delhi', name: 'IIT Delhi', city: 'New Delhi', type: 'Government', exam: 'JEE Advanced', fees: '₹2.2L', verified: true, rating: 4.7, href: '/college/iit-delhi' },
      { slug: 'iit-bombay', name: 'IIT Bombay', city: 'Mumbai', type: 'Government', exam: 'JEE Advanced', fees: '₹2.3L', verified: true, rating: 4.8, href: '/colleges' },
      { slug: 'bits-pilani', name: 'BITS Pilani', city: 'Pilani', type: 'Private', exam: 'BITSAT', fees: '₹5.2L', verified: true, rating: 4.5, href: '/colleges' },
      { slug: 'vit-vellore', name: 'VIT Vellore', city: 'Vellore', type: 'Private', exam: 'VITEEE', fees: '₹4.8L', verified: true, rating: 4.3, href: '/colleges' },
      { slug: 'manipal-university', name: 'Manipal University', city: 'Manipal', type: 'Private', exam: 'MET', fees: '₹4.5L', verified: true, rating: 4.2, href: '/colleges' },
      { slug: 'chandigarh-university', name: 'Chandigarh University', city: 'Chandigarh', type: 'Private', exam: 'CUCET', fees: '₹3.2L', rating: 4.1, href: '/colleges' },
    ],
    // None of these related courses have an implemented Course Detail record
    // yet (only `btech-computer-science` does) — each `href` below points to
    // a CRS-01-supported filtered `/courses` URL using only valid degree/
    // specialization slugs from `features/courses/data/filters.ts`, falling
    // back to plain `/courses` where no matching specialization slug exists.
    relatedCourses: [
      { slug: 'btech-ai-data-science', name: 'B.Tech Artificial Intelligence & Data Science', level: 'Undergraduate', duration: '4 Years', href: '/courses?degree=btech&specialization=artificial-intelligence' },
      { slug: 'btech-information-technology', name: 'B.Tech Information Technology', level: 'Undergraduate', duration: '4 Years', href: '/courses?degree=btech' },
      { slug: 'bca', name: 'BCA', level: 'Undergraduate', duration: '3 Years', href: '/courses?degree=bca' },
      { slug: 'mca', name: 'MCA', level: 'Postgraduate', duration: '2 Years', href: '/courses?degree=mca' },
      { slug: 'bsc-computer-science', name: 'B.Sc Computer Science', level: 'Undergraduate', duration: '3 Years', href: '/courses?degree=bsc&specialization=computer-science' },
      { slug: 'mtech-computer-science', name: 'M.Tech Computer Science', level: 'Postgraduate', duration: '2 Years', href: '/courses?degree=mtech&specialization=computer-science' },
    ],
    faqs: [
      { question: 'What is B.Tech Computer Science?', answer: 'A 4-year undergraduate engineering degree focused on programming, computer systems, and software development.' },
      { question: 'What is the eligibility for B.Tech Computer Science?', answer: '10+2 with Physics, Chemistry, and Mathematics, along with a qualifying entrance exam score.' },
      { question: 'Which entrance exams are accepted?', answer: 'JEE Main, JEE Advanced, BITSAT, VITEEE, CUET UG, and various state-level engineering entrance exams.' },
      { question: 'What is the average fee range?', answer: 'Fees typically range from ₹1–4 Lakh at government colleges to ₹5–15 Lakh at private and deemed universities.' },
      { question: 'What careers are available after this course?', answer: 'Software Engineering, Data Science, Machine Learning, Cloud Engineering, Cyber Security, and more.' },
      { question: 'Which colleges offer this course?', answer: 'IITs, NITs, BITS Pilani, VIT, and 120+ other government, private, and deemed universities across India.' },
    ],
  },
}

export function getCourseDetail(slug: string): CourseDetailData | undefined {
  return courseDetails[slug]
}
