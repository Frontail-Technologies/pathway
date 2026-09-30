


export type CareerCategory = {
  id: string
  label: string
  description: string
  relatedCourseTags: string[]
   
  href?: string
}

export const careerCategories: CareerCategory[] = [
  { id: 'engineering', label: 'Engineering & Technology', description: 'Building, designing and maintaining systems, software and infrastructure.', relatedCourseTags: ['B.Tech', 'Computer Science'], href: '/courses?stream=engineering' },
  { id: 'medicine', label: 'Medicine & Healthcare', description: 'Diagnosing, treating and caring for patients across clinical and allied-health roles.', relatedCourseTags: ['MBBS', 'Nursing'], href: '/courses?stream=medical' },
  { id: 'business', label: 'Business & Management', description: 'Leading teams, strategy, operations and growth across organisations.', relatedCourseTags: ['MBA', 'BBA'], href: '/courses?stream=management' },
  { id: 'design', label: 'Design & Creative', description: 'Shaping how products, spaces and experiences look, feel and function.', relatedCourseTags: ['Design', 'UX'], href: '/courses?q=design' },
  { id: 'law', label: 'Law & Public Policy', description: 'Interpreting law, representing clients and shaping public rules and institutions.', relatedCourseTags: ['LLB', 'Public Policy'], href: '/courses?stream=law' },
  { id: 'science', label: 'Science & Research', description: 'Investigating, experimenting and advancing knowledge across scientific fields.', relatedCourseTags: ['B.Sc', 'M.Sc'], href: '/courses?stream=science' },
  { id: 'education', label: 'Education', description: 'Teaching, mentoring and shaping learning for students of all ages.', relatedCourseTags: ['B.Ed', 'Education'] },
  { id: 'media', label: 'Media & Communication', description: 'Telling stories and shaping messages across journalism, content and public relations.', relatedCourseTags: ['Journalism', 'Communication'] },
]

export type FeaturedCareerPath = {
  id: string
  title: string
  field: string
  workInvolves: string
  relatedCourses: string[]
  relatedExam?: string
}

export const featuredCareerPaths: FeaturedCareerPath[] = [
  { id: 'software-engineering', title: 'Software Engineering', field: 'Engineering & Technology', workInvolves: 'Designing, building and maintaining software applications and systems.', relatedCourses: ['B.Tech Computer Science', 'BCA'], relatedExam: 'JEE Main' },
  { id: 'data-science', title: 'Data Science', field: 'Engineering & Technology', workInvolves: 'Analysing data to find patterns and support decisions across industries.', relatedCourses: ['B.Tech Computer Science', 'M.Sc'] },
  { id: 'medicine', title: 'Medicine', field: 'Medicine & Healthcare', workInvolves: 'Diagnosing and treating patients across clinical specialisations.', relatedCourses: ['MBBS'], relatedExam: 'NEET UG' },
  { id: 'product-design', title: 'Product Design', field: 'Design & Creative', workInvolves: 'Designing how digital products look, feel and function for users.', relatedCourses: ['Design', 'BBA'] },
  { id: 'chartered-accountancy', title: 'Chartered Accountancy', field: 'Business & Management', workInvolves: 'Managing accounts, audits, taxation and financial compliance.', relatedCourses: ['B.Com', 'BBA'] },
  { id: 'law', title: 'Law', field: 'Law & Public Policy', workInvolves: 'Advising clients, representing cases and interpreting legislation.', relatedCourses: ['BA LLB'], relatedExam: 'CLAT' },
  { id: 'marketing', title: 'Marketing', field: 'Business & Management', workInvolves: 'Planning campaigns and communication to reach and grow an audience.', relatedCourses: ['BBA', 'MBA'] },
]

export const journeySteps = [
  { title: 'Explore categories', text: 'Get a feel for broad career fields and what each one generally involves.' },
  { title: 'Try the psychometric test', text: 'Use it as one input among several to reflect on your interests and strengths.' },
  { title: 'Connect to courses', text: 'See which courses commonly lead into the paths you are curious about.' },
  { title: 'Talk to a counsellor', text: 'Get personalised guidance to help narrow down your options.' },
]
