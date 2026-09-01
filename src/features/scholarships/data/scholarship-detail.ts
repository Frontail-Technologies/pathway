import type { ApplicationStatus, ProviderType, ScholarshipType } from './scholarships'

export type EligibilityRow = { label: string; value: string }
export type DateItem = { label: string; value: string }
export type Faq = { question: string; answer: string }

export type RelatedScholarshipPreview = {
  slug: string
  name: string
  provider: string
  benefitLabel: string
  deadlineDisplay: string
  status: ApplicationStatus
  /**
   * Where "View Scholarship" navigates. Only a scholarship with an
   * implemented `SCH-02` detail record links straight to
   * `/scholarship/[slug]`; every other mock preview falls back to a
   * SCH-01-supported filtered `/scholarships` URL (or plain `/scholarships`
   * when no valid filter combination applies) — never a knowing link to a
   * detail page that doesn't exist.
   */
  href: string
}

export type ScholarshipDetailData = {
  slug: string
  name: string
  provider: string
  providerType: ProviderType
  providerInitials: string
  scholarshipType: ScholarshipType
  status: ApplicationStatus
  educationLevels: string[]
  streams: string[]
  benefitLabel: string
  deadline: string
  deadlineDisplay: string
  overviewCopy: string
  /** 3–4 concise "Eligibility at a Glance" checks shown near the top — a distinct, shorter list from the full `eligibility.rows` table further down the page. */
  eligibilitySnapshot: string[]
  benefits: {
    amount: string
    coverage: string
    duration: string
    disbursement: string
    note: string
  }
  eligibility: {
    rows: EligibilityRow[]
    note: string
  }
  importantDates: DateItem[]
  documents: string[]
  applicableCourses: string[]
  applicableLocations: string[]
  applicationSteps: string[]
  selectionProcess: string[]
  importantNotes: string[]
  /** Real official top-level domain only (never a fabricated deep application link). */
  officialApplyUrl?: string
  relatedScholarships: RelatedScholarshipPreview[]
  faqs: Faq[]
}

const scholarshipDetails: Record<string, ScholarshipDetailData> = {
  'aicte-pragati-scholarship-girls': {
    slug: 'aicte-pragati-scholarship-girls',
    name: 'AICTE Pragati Scholarship for Girls',
    provider: 'AICTE',
    providerType: 'Government',
    providerInitials: 'AICTE',
    scholarshipType: 'Women',
    status: 'open',
    educationLevels: ['Undergraduate', 'Diploma'],
    streams: ['Engineering'],
    benefitLabel: 'Up to ₹50,000/year',
    deadline: '2026-10-15',
    deadlineDisplay: '15 Oct 2026',
    overviewCopy:
      'The AICTE Pragati Scholarship for Girls is a Government of India scheme administered by AICTE to support female students pursuing technical education. It provides annual financial assistance to help meet tuition and other essential education-related expenses for eligible undergraduate and diploma engineering students.',
    eligibilitySnapshot: ['Female students', 'Undergraduate / Diploma', 'AICTE-approved technical course', 'Family income within provider limit'],
    benefits: {
      amount: 'Up to ₹50,000 per year',
      coverage: 'Tuition fees and other essential education-related expenses',
      duration: 'For the duration of the eligible course, subject to renewal each academic year',
      disbursement: "Directly to the student's bank account, subject to provider rules",
      note: 'Final benefit terms may vary by academic year/provider notification.',
    },
    eligibility: {
      rows: [
        { label: 'Gender', value: 'Female students' },
        { label: 'Education Level', value: 'Undergraduate / Diploma' },
        { label: 'Course', value: 'AICTE-approved technical degree/diploma' },
        { label: 'Family Income', value: 'Below ₹8,00,000 per annum' },
        { label: 'Admission', value: 'Admitted through an approved counselling process' },
        { label: 'Family', value: 'Maximum two girls per family' },
      ],
      note: 'Eligibility shown here is for UI demonstration; applicants must verify the latest official notification.',
    },
    importantDates: [
      { label: 'Application Opens', value: '01 Aug 2026' },
      { label: 'Application Deadline', value: '15 Oct 2026' },
      { label: 'Document Verification', value: 'Oct – Nov 2026' },
      { label: 'Result / Selection', value: 'To be announced' },
    ],
    documents: [
      'Aadhaar / government identity proof',
      'Recent passport-size photograph',
      'Proof of admission to an AICTE-approved institution',
      'Previous academic marksheet',
      'Family income certificate',
      'Bank account details for disbursement',
    ],
    applicableCourses: ['B.Tech', 'B.E.', 'Diploma in Engineering'],
    applicableLocations: ['All India'],
    applicationSteps: [
      'Visit the official AICTE scholarship portal.',
      'Register using your academic and personal details.',
      'Complete the student and institution details form.',
      'Upload the required documents.',
      'Review your application for accuracy.',
      'Submit and save your acknowledgement/application number.',
    ],
    selectionProcess: ['Application Submission', 'Eligibility Verification', 'Document Verification', 'Provider Merit/Criteria Review', 'Final Selection'],
    importantNotes: [
      'This scholarship may have renewal requirements each academic year.',
      'The provider may request additional documents during verification.',
      'Dates and eligibility criteria can change — always check the official notification.',
      'Applicants should verify final details on the official provider website before applying.',
    ],
    officialApplyUrl: 'https://www.aicte-india.org/',
    // None of these related scholarships have an implemented SCH-02 detail
    // record yet (only `aicte-pragati-scholarship-girls` does) — each `href`
    // below points to a SCH-01-supported filtered `/scholarships` URL using
    // only valid slugs from `features/scholarships/data/filters.ts`.
    relatedScholarships: [
      { slug: 'aicte-saksham-scholarship', name: 'AICTE Saksham Scholarship', provider: 'AICTE', benefitLabel: '₹50,000/year', deadlineDisplay: '15 Oct 2026', status: 'open', href: '/scholarships?provider=government&type=disability' },
      { slug: 'central-sector-scheme-scholarship', name: 'Central Sector Scheme of Scholarship', provider: 'Government of India', benefitLabel: '₹12,000/year', deadlineDisplay: '10 Sep 2026', status: 'closing-soon', href: '/scholarships?provider=government&type=merit' },
      { slug: 'inspire-scholarship-higher-education', name: 'INSPIRE Scholarship for Higher Education', provider: 'Dept. of Science & Technology', benefitLabel: '₹80,000/year', deadlineDisplay: '30 Nov 2026', status: 'open', href: '/scholarships?provider=government&stream=science' },
      { slug: 'reliance-foundation-ug-scholarship', name: 'Reliance Foundation Undergraduate Scholarship', provider: 'Reliance Foundation', benefitLabel: 'Up to ₹2,00,000', deadlineDisplay: '05 Dec 2026', status: 'open', href: '/scholarships?provider=trust-foundation' },
    ],
    faqs: [
      { question: 'Who can apply for this scholarship?', answer: 'Female students pursuing an AICTE-approved undergraduate or diploma engineering programme, with family income below the defined provider threshold.' },
      { question: 'What is the scholarship amount?', answer: 'Up to ₹50,000 per year, subject to provider rules and renewal each academic year.' },
      { question: 'What documents are required?', answer: 'Identity proof, a recent photograph, proof of admission, previous marksheet, family income certificate, and bank account details.' },
      { question: 'What is the application deadline?', answer: '15 October 2026 for the current cycle, subject to change per the official notification.' },
      { question: 'How do I apply?', answer: 'Through the official AICTE scholarship portal — register, complete your academic and institution details, upload documents, and submit online.' },
      { question: 'Is the scholarship renewable?', answer: 'Yes, subject to maintaining eligibility and satisfactory academic performance each year, as per provider rules.' },
    ],
  },
}

export function getScholarshipDetail(slug: string): ScholarshipDetailData | undefined {
  return scholarshipDetails[slug]
}
