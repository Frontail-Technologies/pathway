import type { LegalDocument } from './legal-shared'
import { CONTACT_PARAGRAPH } from './legal-shared'

export const termsAndConditions: LegalDocument = {
  slug: 'terms',
  title: 'Terms & Conditions',
  intro: 'The terms that apply when you use Pathway, our education discovery and planning platform.',
  sections: [
    { id: 'acceptance', title: 'Acceptance of Terms', paragraphs: ['By accessing or using Pathway, you agree to these Terms & Conditions. If you do not agree, please do not use the platform.'] },
    {
      id: 'about-pathway',
      title: 'About Pathway',
      paragraphs: ['Pathway is an education discovery and planning platform that helps students explore and compare colleges, courses, exams, scholarships and related options. Pathway is not a university or college, an admission or examination authority, a recruitment agency, or a guaranteed counselling service.'],
    },
    { id: 'eligibility-and-accounts', title: 'Eligibility / Account Use', paragraphs: ['Where account features are available, you are responsible for the information you provide and for activity under your account. Younger users should use Pathway with the involvement of a parent or guardian.'] },
    {
      id: 'educational-information',
      title: 'Educational Information',
      paragraphs: ['Information on Pathway is intended to help you explore options. It may change, may be incomplete, and may not reflect the latest updates from institutions or official bodies. Please verify important details with the relevant institution or official source before making decisions.'],
    },
    {
      id: 'user-responsibilities',
      title: 'User Responsibilities',
      bullets: ['Provide accurate information where you choose to provide it', 'Use Pathway lawfully and respectfully', 'Keep any sign-in details secure', 'Verify important information with official sources'],
    },
    {
      id: 'saved-profile-resume',
      title: 'Saved/Profile/Resume Features',
      paragraphs: ['Features such as saved items, the student profile and the resume builder are provided for your convenience. At the current stage some of these work as demonstrations and may store data in your browser or device, so please keep your own copies of anything important.'],
    },
    { id: 'third-party-information', title: 'Third-Party Information and Links', paragraphs: ['Pathway may show information from, or link to, third-party sources. We do not control those sources and are not responsible for their content or practices.'] },
    {
      id: 'counselling-and-enquiries',
      title: 'Counselling / Enquiries',
      paragraphs: ['Counselling and enquiry features are intended to help you plan your next steps. Guidance is general in nature and is not a promise of any outcome.'],
    },
    { id: 'intellectual-property', title: 'Intellectual Property', paragraphs: ['The Pathway name, design and original content belong to Pathway or its licensors. You may use the platform for your personal, non-commercial use, but you may not copy or redistribute its content without permission.'] },
    {
      id: 'prohibited-use',
      title: 'Prohibited Use',
      bullets: ['Attempting to disrupt, probe or gain unauthorised access to the platform', 'Scraping or copying content at scale without permission', 'Posting unlawful, misleading or abusive content', 'Using Pathway to impersonate others or misrepresent your identity'],
    },
    { id: 'availability', title: 'Availability of Services', paragraphs: ['We work to keep Pathway available, but we do not promise uninterrupted or error-free service. Features may change, be limited or be withdrawn.'] },
    {
      id: 'disclaimer-of-warranties',
      title: 'Disclaimer of Warranties',
      paragraphs: ['Pathway is provided "as is" and "as available". We do not guarantee admission, rank, college allotment, scholarship, exam result, career outcome, job, visa or counselling outcome. Predictor and tool outputs are informational and, at the current stage, may be based on limited or demonstration data.'],
    },
    { id: 'limitation-of-liability', title: 'Limitation of Liability', paragraphs: ['To the extent permitted by law, Pathway is not liable for indirect or consequential losses arising from your use of the platform or from decisions made using information on it.'] },
    { id: 'changes', title: 'Changes to Services / Terms', paragraphs: ['We may update the platform and these terms from time to time. Continued use of Pathway after changes means you accept the updated terms.'] },
    {
      id: 'governing-and-contact',
      title: 'Governing / Contact',
      paragraphs: ['These terms are governed by the laws applicable to the operation of Pathway. The specific governing law and jurisdiction will be confirmed as the product is formally launched.', CONTACT_PARAGRAPH],
    },
  ],
}
