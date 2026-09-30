








export type StudyDestination = {
  id: string
  country: string
  descriptor: string
  commonStudyAreas: string[]
  imageUrl: string
  imageAlt: string
}

export const studyDestinations: StudyDestination[] = [
  {
    id: 'us',
    country: 'United States',
    descriptor: 'A wide range of universities and colleges across every field, from research-focused to liberal arts.',
    commonStudyAreas: ['Engineering', 'Business', 'Computer Science'],
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=75',
    imageAlt: 'Students in a classroom session',
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    descriptor: 'Established universities offering shorter-duration undergraduate and postgraduate programmes.',
    commonStudyAreas: ['Business', 'Law', 'Medicine'],
    imageUrl: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=75',
    imageAlt: 'University library reading area',
  },
  {
    id: 'canada',
    country: 'Canada',
    descriptor: 'Public universities and colleges known for co-op and applied-learning programmes.',
    commonStudyAreas: ['Engineering', 'Computer Science', 'Healthcare'],
    imageUrl: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=1200&q=75',
    imageAlt: 'Engineering lab session',
  },
  {
    id: 'australia',
    country: 'Australia',
    descriptor: 'Universities across major cities with a mix of research and industry-linked programmes.',
    commonStudyAreas: ['Business', 'Engineering', 'Design'],
    imageUrl: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=75',
    imageAlt: 'University academic block',
  },
  {
    id: 'germany',
    country: 'Germany',
    descriptor: 'Strong public university system with a focus on engineering, science and research programmes.',
    commonStudyAreas: ['Engineering', 'Science', 'Research'],
    imageUrl: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=1200&q=75',
    imageAlt: 'Campus building exterior',
  },
]

export type StudyLevelOption = {
  id: string
  label: string
   
  href?: string
}

export const studyLevelOptions: StudyLevelOption[] = [
  { id: 'ug', label: 'Undergraduate', href: '/courses?level=undergraduate' },
  { id: 'pg', label: 'Postgraduate', href: '/courses?level=postgraduate' },
  { id: 'mba', label: 'MBA / Management', href: '/courses?stream=management' },
  { id: 'doctoral', label: 'Doctoral / Research' },
]

export const popularStudyAreas = ['Engineering', 'Computer Science', 'Business & Management', 'Medicine & Health', 'Design', 'Social Sciences']

export type StudyAbroadExam = { name: string; category: string; description: string }

 
export const studyAbroadExams: StudyAbroadExam[] = [
  { name: 'IELTS', category: 'English Proficiency', description: 'Commonly used to demonstrate English-language ability.' },
  { name: 'TOEFL', category: 'English Proficiency', description: 'Commonly used to demonstrate English-language ability.' },
  { name: 'GRE', category: 'Graduate Admissions', description: 'Commonly required for postgraduate and research programmes.' },
  { name: 'GMAT', category: 'Business School Admissions', description: 'Commonly used for MBA and management programmes.' },
  { name: 'SAT', category: 'Undergraduate Admissions', description: 'Commonly used for undergraduate admissions.' },
]

export type ScholarshipCategory = { title: string; description: string }

 
export const scholarshipCategories: ScholarshipCategory[] = [
  { title: 'Merit-Based Scholarships', description: 'Awarded based on academic performance or achievement.' },
  { title: 'University Scholarships', description: 'Offered directly by universities to eligible incoming students.' },
  { title: 'Government Scholarship Resources', description: 'Government and public-body programmes supporting overseas study.' },
  { title: 'Education Funding Guides', description: 'General guidance on planning and researching how to fund your studies.' },
]

export type ApplicationResource = { title: string; description: string }

export const applicationResources: ApplicationResource[] = [
  { title: 'Statement of Purpose', description: 'A written summary of your goals and reasons for applying.' },
  { title: 'Letters of Recommendation', description: 'References from teachers, mentors or employers.' },
  { title: 'English-Language Tests', description: 'Proficiency tests many programmes ask for, such as IELTS or TOEFL.' },
  { title: 'Application Checklist', description: 'A general list of documents and steps applicants commonly prepare.' },
]

export const journeySteps = [
  { title: 'Explore destinations', text: 'Get a sense of where you might want to study and what each place is known for.' },
  { title: 'Shortlist courses', text: 'Narrow down study areas and course types that match your goals.' },
  { title: 'Understand requirements', text: 'Learn what documents, tests and preparation are commonly involved.' },
  { title: 'Plan applications', text: 'Use Pathway resources and counselling to plan your next steps.' },
]
