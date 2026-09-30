


export type CoachingProviderType = 'Coaching Institute' | 'Online Platform'
export type LearningMode = 'Online' | 'Offline' | 'Hybrid'

export type CoachingProgram = { name: string; mode?: string; courseType?: string; description: string }
export type CoachingFaq = { question: string; answer: string }
export type CoachingFacultyNote = { title: string; description: string }

export type CoachingProvider = {
  id: string
  slug: string
  name: string
  providerType: CoachingProviderType
  location: string
  exams: string[]
  subjects: string[]
  modes: LearningMode[]
  courseTypes: string[]
  programLabel: string
  highlights: string[]
  featured?: boolean

  
  
  
  
  
  
  
  
  hasDetailPage?: boolean
  state?: string
  aboutCopy?: string
   
  gallery?: string[]
  programs?: CoachingProgram[]
   
  facultyNotes?: CoachingFacultyNote[]
  faqs?: CoachingFaq[]
}

export const coachingProviders: CoachingProvider[] = [
  {
    id: 'coa1',
    slug: 'apex-jee-academy-kota',
    name: 'Apex JEE Academy',
    providerType: 'Coaching Institute',
    location: 'Kota',
    exams: ['JEE Main', 'JEE Advanced'],
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    modes: ['Offline', 'Hybrid'],
    courseTypes: ['Classroom Program', 'Test Series'],
    programLabel: 'JEE Main & Advanced preparation',
    highlights: ['Foundation and repeater batches', 'Weekly test practice', 'Doubt-clearing labs'],
    featured: true,
    hasDetailPage: true,
    state: 'Rajasthan',
    aboutCopy:
      'Apex JEE Academy offers JEE Main and JEE Advanced preparation in Kota through classroom and hybrid learning formats. The program is built around foundation and repeater batches, weekly test practice, and doubt-clearing labs across Physics, Chemistry and Mathematics.',
    gallery: ['/coaching/apex-jee-academy.jpg', '/coaching/coaching-institute.png', '/coaching/gateworks-engineering.jpg', '/coaching/lawprep-circle.jpg'],
    programs: [
      {
        name: 'JEE Main Program',
        mode: 'Classroom',
        courseType: 'Classroom Program',
        description: 'JEE Main preparation covering Physics, Chemistry and Mathematics with regular test practice.',
      },
      {
        name: 'JEE Advanced Program',
        mode: 'Hybrid',
        courseType: 'Classroom Program',
        description: 'Advanced-level preparation for JEE Advanced with doubt-clearing labs and structured problem practice.',
      },
      {
        name: 'Repeater / Dropper Batch',
        mode: 'Classroom',
        courseType: 'Test Series',
        description: 'A focused batch for repeater students built around a weekly test series and revision support.',
      },
    ],
    facultyNotes: [
      { title: 'Subject Faculty', description: "Classroom and hybrid sessions led by the institute's subject faculty." },
      { title: 'Doubt-Clearing Support', description: 'Weekly test practice paired with structured doubt-clearing support.' },
      { title: 'Foundation & Repeater Tracks', description: 'Separate tracks for foundation and repeater (dropper) batches.' },
    ],
    faqs: [
      { question: 'What learning modes does Apex JEE Academy offer?', answer: 'Apex JEE Academy offers Offline and Hybrid learning modes.' },
      { question: 'Which exams does this institute prepare for?', answer: 'The institute prepares students for JEE Main and JEE Advanced.' },
      {
        question: 'What course formats are available?',
        answer: 'Classroom Program and Test Series formats are available, including a dedicated repeater/dropper batch.',
      },
      { question: 'What subjects are covered?', answer: 'Physics, Chemistry and Mathematics are covered as part of the JEE preparation program.' },
      {
        question: 'How do I get more information or enquire?',
        answer: 'Use the Enquire Now action on this page to share your details and get in touch with the institute.',
      },
    ],
  },
  {
    id: 'coa2',
    slug: 'medprep-institute-delhi',
    name: 'MedPrep Institute',
    providerType: 'Coaching Institute',
    location: 'Delhi',
    exams: ['NEET UG'],
    subjects: ['Biology', 'Physics', 'Chemistry'],
    modes: ['Offline'],
    courseTypes: ['Classroom Program', 'Crash Course'],
    programLabel: 'NEET UG classroom coaching',
    highlights: ['Biology-focused revision modules', 'Board + entrance alignment', 'Practice test calendar'],
  },
  {
    id: 'coa3',
    slug: 'central-cuet-classes-pune',
    name: 'Central CUET Classes',
    providerType: 'Online Platform',
    location: 'Pune',
    exams: ['CUET UG'],
    subjects: ['English', 'General Test', 'Commerce'],
    modes: ['Online'],
    courseTypes: ['Live Classes', 'Test Series'],
    programLabel: 'CUET UG online preparation',
    highlights: ['Domain subject batches', 'Mock tests with analysis', 'Recorded class access'],
  },
  {
    id: 'coa4',
    slug: 'horizon-cat-coaching-mumbai',
    name: 'Horizon CAT Coaching',
    providerType: 'Coaching Institute',
    location: 'Mumbai',
    exams: ['CAT', 'XAT'],
    subjects: ['Quantitative Aptitude', 'Verbal Ability', 'Data Interpretation'],
    modes: ['Hybrid'],
    courseTypes: ['Weekend Batch', 'Test Series'],
    programLabel: 'MBA entrance preparation',
    highlights: ['Weekend working-professional batches', 'Sectional tests', 'Interview preparation add-on'],
    featured: true,
  },
  {
    id: 'coa7',
    slug: 'commerce-edge-online',
    name: 'Commerce Edge Online',
    providerType: 'Online Platform',
    location: 'Online',
    exams: ['CUET UG', 'CA Foundation'],
    subjects: ['Accountancy', 'Business Studies', 'Economics'],
    modes: ['Online'],
    courseTypes: ['Live Classes', 'Self-Paced Course'],
    programLabel: 'Commerce entrance and foundation programs',
    highlights: ['Self-paced concept library', 'Live doubt rooms', 'Commerce domain mock tests'],
  },
  {
    id: 'coa8',
    slug: 'gateworks-engineering-bengaluru',
    name: 'GateWorks Engineering',
    providerType: 'Coaching Institute',
    location: 'Bengaluru',
    exams: ['GATE'],
    subjects: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering'],
    modes: ['Offline', 'Hybrid'],
    courseTypes: ['Classroom Program', 'Test Series'],
    programLabel: 'GATE preparation for engineering branches',
    highlights: ['Branch-wise modules', 'Previous-year paper practice', 'Interview guidance for PSU tracks'],
  },
  {
    id: 'coa10',
    slug: 'lawprep-circle-lucknow',
    name: 'LawPrep Circle',
    providerType: 'Coaching Institute',
    location: 'Lucknow',
    exams: ['CLAT'],
    subjects: ['Legal Reasoning', 'English', 'General Knowledge'],
    modes: ['Offline', 'Online'],
    courseTypes: ['Classroom Program', 'Test Series'],
    programLabel: 'Law entrance preparation',
    highlights: ['Legal aptitude modules', 'Current affairs capsules', 'Timed mock analysis'],
  },
  {
    id: 'coa11',
    slug: 'design-aptitude-studio-ahmedabad',
    name: 'Design Aptitude Studio',
    providerType: 'Coaching Institute',
    location: 'Ahmedabad',
    exams: ['NID DAT', 'UCEED'],
    subjects: ['Design Aptitude', 'Drawing', 'Visual Reasoning'],
    modes: ['Hybrid'],
    courseTypes: ['Portfolio Guidance', 'Crash Course'],
    programLabel: 'Design entrance preparation',
    highlights: ['Studio-based assignments', 'Portfolio review sessions', 'Creative aptitude drills'],
  },
  {
    id: 'coa12',
    slug: 'science-bridge-foundation-chennai',
    name: 'Science Bridge Foundation',
    providerType: 'Online Platform',
    location: 'Chennai',
    exams: ['Olympiad', 'JEE Main'],
    subjects: ['Science', 'Mathematics'],
    modes: ['Online', 'Hybrid'],
    courseTypes: ['Foundation Batch', 'Live Classes'],
    programLabel: 'Class 9-10 science foundation',
    highlights: ['Early foundation curriculum', 'School exam support', 'Monthly skill diagnostics'],
  },
]








 
export function getCoachingFeed(): CoachingProvider[] {
  return coachingProviders
}

 
export function getCoachingDetail(slug: string): CoachingProvider | undefined {
  return coachingProviders.find((provider) => provider.slug === slug && provider.hasDetailPage)
}





 
export function getSimilarCoachingProviders(provider: CoachingProvider, limit = 3): CoachingProvider[] {
  const score = (candidate: CoachingProvider) => {
    const sharedExams = candidate.exams.filter((exam) => provider.exams.includes(exam)).length
    const sharedSubjects = candidate.subjects.filter((subject) => provider.subjects.includes(subject)).length
    const sameType = candidate.providerType === provider.providerType ? 1 : 0
    return sharedExams * 2 + sharedSubjects * 2 + sameType
  }

  return coachingProviders
    .filter((candidate) => candidate.slug !== provider.slug)
    .map((candidate, index) => ({ candidate, index, score: score(candidate) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map(({ candidate }) => candidate)
}
