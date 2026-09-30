import type { LegalDocument } from './legal-shared'
import { CONTACT_PARAGRAPH } from './legal-shared'

export const disclaimer: LegalDocument = {
  slug: 'disclaimer',
  title: 'Disclaimer',
  intro: 'What to keep in mind when using information and tools on Pathway.',
  sections: [
    {
      id: 'educational-information',
      title: 'Educational Information',
      paragraphs: ['Information on Pathway is intended to help students explore and compare educational options. Users should verify important details with the relevant institution, exam authority, scholarship provider or official source before making a decision.'],
    },
    { id: 'college-course-information', title: 'College / Course Information', paragraphs: ['Details such as courses, fees and facilities are shown for discovery. They may be incomplete or out of date and should be confirmed with the institution.'] },
    { id: 'exam-information', title: 'Exam Information', paragraphs: ['Exam information on Pathway is general. Dates, eligibility, patterns and other details are set by the conducting authority, so please rely on the official notification.'] },
    {
      id: 'predictors-and-tools',
      title: 'Predictors and Tools',
      paragraphs: ['The College Predictor, Rank Predictor and Psychometric Test are informational tools. At the current product stage they may use limited or demonstration inputs, and their outputs are not guarantees of admission, rank, allotment or any outcome. The Psychometric Test is a career-interest exploration and is not a clinical, diagnostic or validated psychological assessment.'],
    },
    { id: 'career-exploration', title: 'Career Exploration', paragraphs: ['Career descriptions are general and are not predictions of your future. They do not promise jobs, salaries or outcomes.'] },
    {
      id: 'study-abroad',
      title: 'Study Abroad',
      paragraphs: ['Study Abroad content is informational. Pathway does not provide legal or immigration advice through general site content. Students should verify visa rules, admission requirements, deadlines and financial requirements with official sources.'],
    },
    { id: 'scholarships', title: 'Scholarships', paragraphs: ['Scholarship information is for discovery only. Eligibility, amounts and deadlines are decided by the provider, so please confirm details with them directly.'] },
    { id: 'tutors-and-coaching', title: 'Tutors / Coaching', paragraphs: ['Tutor and coaching listings are for discovery. Pathway does not guarantee the quality of teaching or any academic result.'] },
    { id: 'external-information', title: 'External Information', paragraphs: ['Some information may be provided by third-party sources where clearly identified. We are not responsible for the accuracy of external content.'] },
    { id: 'professional-advice', title: 'Professional Advice', paragraphs: ['Content on Pathway is not a substitute for professional, legal, financial or immigration advice.'] },
    { id: 'updates-and-accuracy', title: 'Updates / Accuracy', paragraphs: ['We work to keep information useful and current, but we cannot promise it is always complete or up to date.'] },
    { id: 'contact', title: 'Contact', paragraphs: [CONTACT_PARAGRAPH] },
  ],
}
