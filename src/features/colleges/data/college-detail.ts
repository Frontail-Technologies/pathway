export type CollegeFact = { label: string; value: string }

export type CollegeCourse = {
  name: string
  level: 'UG' | 'PG'
  mode: string
  duration: string
  fees: string
  exam: string
  eligibility: string
}

export type FeeRow = { course: string; duration: string; tuitionFee: string; totalFee: string }

export type AdmissionBlock = { title: string; exam: string; eligibility: string; selection: string }

export type ImportantDate = { label: string; date: string }

export type PlacementMetric = { label: string; value: string }

export type Scholarship = { name: string; eligibility: string; benefit: string; deadline: string }

export type ReviewCategory = { label: string; value: number }

export type ReviewPreview = {
  rating: number
  course: string
  title: string
  text: string
  verified: boolean
  date: string
}

export type Faq = { question: string; answer: string }

export type CollegeGalleryCategory = 'Campus' | 'Library' | 'Classrooms' | 'Hostel' | 'Labs' | 'Sports'

export type CollegeGalleryImage = {
  id: string
  src: string
  alt: string
  category: CollegeGalleryCategory
}

export type CollegeDetailData = {
  slug: string
  name: string
  fullName: string
  city: string
  state: string
  type: 'Government' | 'Private' | 'Deemed'
  approval: string
  instituteStatus: string
  established: string
  rating: number
  reviewCount: number
  verified: boolean
  sponsored?: boolean
  gallery: CollegeGalleryImage[]
  overviewCopy: string
  facts: CollegeFact[]
  courses: CollegeCourse[]
  fees: FeeRow[]
  admissions: AdmissionBlock[]
  importantDates: ImportantDate[]
  placementMetrics: PlacementMetric[]
  recruiters: string[]
  facilities: string[]
  scholarships: Scholarship[]
  reviewCategories: ReviewCategory[]
  reviewPreviews: ReviewPreview[]
  faqs: Faq[]
}

const collegeDetails: Record<string, CollegeDetailData> = {
  'iit-delhi': {
    slug: 'iit-delhi',
    name: 'IIT Delhi',
    fullName: 'Indian Institute of Technology Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    type: 'Government',
    approval: 'UGC / AICTE',
    instituteStatus: 'Institute of National Importance',
    established: '1961',
    rating: 4.7,
    reviewCount: 2150,
    verified: true,
    gallery: [
      { id: 'g1', src: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=1000&q=75', alt: 'Campus building exterior', category: 'Campus' },
      { id: 'g2', src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1000&q=75', alt: 'Academic block', category: 'Campus' },
      { id: 'g3', src: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1000&q=75', alt: 'Library reading area', category: 'Library' },
      { id: 'g4', src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=75', alt: 'Classroom session', category: 'Classrooms' },
      { id: 'g5', src: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=75', alt: 'Hostel block', category: 'Hostel' },
      { id: 'g6', src: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=1000&q=75', alt: 'Engineering lab', category: 'Labs' },
      { id: 'g7', src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=75', alt: 'Sports ground', category: 'Sports' },
    ],
    overviewCopy:
      'IIT Delhi is a premier engineering and technology institute known for its rigorous B.Tech, M.Tech, and research programmes, strong industry placements, and a highly selective JEE Advanced admission process.',
    facts: [
      { label: 'Established', value: '1961' },
      { label: 'Institution Type', value: 'Government' },
      { label: 'Campus', value: 'New Delhi' },
      { label: 'Approved By', value: 'UGC / AICTE' },
      { label: 'Institute Status', value: 'Institute of National Importance' },
      { label: 'Mode', value: 'Full-time' },
    ],
    courses: [
      { name: 'B.Tech Computer Science', level: 'UG', mode: 'Full Time', duration: '4 Years', fees: '₹2.2 Lakh', exam: 'JEE Advanced', eligibility: '10+2 with PCM' },
      { name: 'B.Tech Electrical Engineering', level: 'UG', mode: 'Full Time', duration: '4 Years', fees: '₹2.2 Lakh', exam: 'JEE Advanced', eligibility: '10+2 with PCM' },
      { name: 'B.Tech Mechanical Engineering', level: 'UG', mode: 'Full Time', duration: '4 Years', fees: '₹2.2 Lakh', exam: 'JEE Advanced', eligibility: '10+2 with PCM' },
      { name: 'M.Tech Computer Science', level: 'PG', mode: 'Full Time', duration: '2 Years', fees: '₹1.4 Lakh', exam: 'GATE', eligibility: "B.Tech/B.E. in relevant discipline" },
      { name: 'MBA', level: 'PG', mode: 'Full Time', duration: '2 Years', fees: '₹10.4 Lakh', exam: 'CAT', eligibility: "Bachelor's degree" },
      { name: 'M.Sc Physics', level: 'PG', mode: 'Full Time', duration: '2 Years', fees: '₹0.9 Lakh', exam: 'JAM', eligibility: "B.Sc in relevant discipline" },
    ],
    fees: [
      { course: 'B.Tech CSE', duration: '4 Years', tuitionFee: '₹2.2L', totalFee: '₹8.8L' },
      { course: 'B.Tech Electrical', duration: '4 Years', tuitionFee: '₹2.2L', totalFee: '₹8.8L' },
      { course: 'M.Tech CSE', duration: '2 Years', tuitionFee: '₹1.4L', totalFee: '₹2.8L' },
      { course: 'MBA', duration: '2 Years', tuitionFee: '₹10.4L', totalFee: '₹20.8L' },
      { course: 'M.Sc Physics', duration: '2 Years', tuitionFee: '₹0.9L', totalFee: '₹1.8L' },
    ],
    admissions: [
      { title: 'B.Tech Admission', exam: 'JEE Advanced', eligibility: '10+2 with PCM, JEE Main qualified', selection: 'JoSAA Counselling' },
      { title: 'M.Tech Admission', exam: 'GATE', eligibility: "B.Tech/B.E. in relevant discipline", selection: 'CCMT Counselling' },
      { title: 'MBA Admission', exam: 'CAT', eligibility: "Bachelor's degree, min. 60%", selection: 'Written Test + Interview' },
    ],
    importantDates: [
      { label: 'JEE Main Application', date: 'Nov 2025 – Dec 2025' },
      { label: 'JEE Advanced Exam', date: 'May 2026' },
      { label: 'JoSAA Counselling', date: 'Jun 2026 – Jul 2026' },
      { label: 'Academic Session Starts', date: 'Aug 2026' },
    ],
    placementMetrics: [
      { label: 'Median Package', value: '₹16 LPA' },
      { label: 'Highest Package', value: '₹82 LPA' },
      { label: 'Placement Rate', value: '92%' },
      { label: 'Recruiters', value: '250+' },
    ],
    recruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'Adobe', 'Samsung', 'Qualcomm', 'Sprinklr'],
    facilities: ['Library', 'Hostel', 'Labs', 'Sports', 'Wi-Fi', 'Cafeteria', 'Medical', 'Auditorium'],
    scholarships: [
      { name: 'Merit Scholarship', eligibility: 'Based on academic performance', benefit: 'Up to ₹50,000', deadline: 'Apply by Oct 15, 2026' },
      { name: 'SC/ST Fee Waiver', eligibility: 'SC/ST category students', benefit: 'Full tuition waiver', deadline: 'Apply by Sep 30, 2026' },
      { name: 'Means-cum-Merit Scholarship', eligibility: 'Family income below ₹5 Lakh/year', benefit: 'Up to ₹1,00,000', deadline: 'Apply by Oct 31, 2026' },
    ],
    reviewCategories: [
      { label: 'Faculty', value: 4.6 },
      { label: 'Placements', value: 4.8 },
      { label: 'Infrastructure', value: 4.5 },
      { label: 'Value for Money', value: 4.3 },
    ],
    reviewPreviews: [
      {
        rating: 5,
        course: 'B.Tech CSE, 2024 Batch',
        title: 'Outstanding academics and placement support',
        text: 'The faculty is deeply knowledgeable and the placement cell works closely with students from the third year onward. Campus facilities are well maintained.',
        verified: true,
        date: 'Jun 2025',
      },
      {
        rating: 4,
        course: 'M.Tech CSE, 2023 Batch',
        title: 'Strong research exposure',
        text: 'Great labs and research opportunities, though the coursework is intense. Worth it for anyone serious about a technical career.',
        verified: true,
        date: 'Feb 2025',
      },
      {
        rating: 4.5,
        course: 'MBA, 2022 Batch',
        title: 'Good mix of theory and industry interaction',
        text: 'Regular guest lectures from industry leaders and a solid alumni network helped with internships and placements.',
        verified: false,
        date: 'Nov 2024',
      },
    ],
    faqs: [
      { question: 'What courses does IIT Delhi offer?', answer: 'IIT Delhi offers B.Tech, M.Tech, MBA, and M.Sc programmes across engineering, management, and sciences.' },
      { question: 'What entrance exams are accepted?', answer: 'JEE Advanced for B.Tech, GATE for M.Tech, CAT for MBA, and JAM for M.Sc programmes.' },
      { question: 'What is the B.Tech admission process?', answer: 'Candidates must qualify JEE Main, then JEE Advanced, followed by JoSAA counselling for seat allotment.' },
      { question: 'What are IIT Delhi placement highlights?', answer: 'IIT Delhi reports a median package of ₹16 LPA and a highest package of ₹82 LPA, with 250+ recruiters visiting campus.' },
      { question: 'Does IIT Delhi provide hostel facilities?', answer: 'Yes, on-campus hostel accommodation is available for both undergraduate and postgraduate students.' },
    ],
  },
}

export function getCollegeDetail(slug: string): CollegeDetailData | undefined {
  return collegeDetails[slug]
}
