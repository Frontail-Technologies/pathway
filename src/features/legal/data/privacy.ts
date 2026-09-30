import type { LegalDocument } from './legal-shared'
import { CONTACT_PARAGRAPH } from './legal-shared'

export const privacyPolicy: LegalDocument = {
  slug: 'privacy',
  title: 'Privacy Policy',
  intro: 'Learn how Pathway handles information when you use our education discovery platform.',
  sections: [
    {
      id: 'information-we-collect',
      title: 'Information We Collect',
      paragraphs: ['Pathway is an education discovery and planning platform. Depending on the features you use, we may handle the information described in this policy. We aim to keep the information we handle limited to what each feature needs.'],
    },
    {
      id: 'information-you-provide',
      title: 'Information You Provide',
      paragraphs: ['You may provide information when you use features such as the student profile, study preferences, saved items, the resume builder, or when you send an enquiry. This can include:'],
      bullets: ['Basic profile details such as your name, contact details and education background', 'Study preferences such as courses, exams and locations you are interested in', 'Content you write in tools such as the resume builder', 'Details you include when you contact us or request counselling'],
      after: 'Please only share information you are comfortable providing.',
    },
    {
      id: 'information-collected-through-use',
      title: 'Information Collected Through Use',
      paragraphs: ['When you browse Pathway, basic technical information such as your device type, browser and the pages you visit may be handled by our hosting infrastructure so the site works reliably.'],
    },
    {
      id: 'how-we-use-information',
      title: 'How We Use Information',
      bullets: ['To provide and improve Pathway features', 'To personalise discovery, such as remembering your preferences and saved items', 'To respond to enquiries and counselling requests', 'To keep the platform secure and working properly'],
    },
    {
      id: 'local-demo-data',
      title: 'Local / Demo Data',
      paragraphs: ['At its current stage, some Pathway functionality is provided as a demonstration and may keep information in your own browser or device, for example a demo profile, preferences, saved items, resume drafts and demo sign-in state. This information is not necessarily sent to a Pathway server. It stays on your device until you clear it, and it may be lost if you clear your browser data or switch devices.'],
    },
    {
      id: 'cookies-and-similar-technologies',
      title: 'Cookies and Similar Technologies',
      paragraphs: ['Pathway may use cookies and similar browser storage to make the site work and remember your choices. See our Cookie Policy for more detail.'],
    },
    {
      id: 'third-party-services',
      title: 'Third-Party Services',
      paragraphs: ['Pathway may use third-party infrastructure, analytics, communications or integrated services as the product evolves. Some information may be provided by third-party sources where clearly identified. Third-party services have their own privacy practices, and we encourage you to review them.'],
    },
    {
      id: 'data-sharing',
      title: 'Data Sharing',
      paragraphs: ['We do not sell your personal information. We may share information with service providers who help us operate Pathway, where required by law, or with your permission, for example when you ask us to connect you with an institution or counsellor.'],
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      paragraphs: ['We keep information only for as long as it is needed for the purposes described in this policy or as required by law. Information stored in your browser stays there until you remove it.'],
    },
    {
      id: 'security',
      title: 'Security',
      paragraphs: ['We take reasonable steps to protect information we handle. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.'],
    },
    {
      id: 'your-choices',
      title: 'Your Choices',
      bullets: ['You can review and edit profile and preference details you have entered', 'You can remove saved items and clear locally stored data through your browser settings', 'You can choose not to provide optional information'],
    },
    {
      id: 'children',
      title: 'Children / Age Considerations',
      paragraphs: ['Pathway is designed for students planning their education, and many users are teenagers. Younger users should use the platform with the involvement of a parent or guardian, who may also contact us about information relating to a child.'],
    },
    {
      id: 'changes',
      title: 'Changes to This Policy',
      paragraphs: ['We may update this policy as Pathway evolves. The "Last updated" date at the top of this page shows when it was last revised.'],
    },
    { id: 'contact', title: 'Contact', paragraphs: [CONTACT_PARAGRAPH] },
  ],
}
