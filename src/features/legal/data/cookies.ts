import type { LegalDocument } from './legal-shared'
import { CONTACT_PARAGRAPH } from './legal-shared'

export const cookiePolicy: LegalDocument = {
  slug: 'cookies',
  title: 'Cookie Policy',
  intro: 'How Pathway may use cookies and browser storage to keep the site working and remember your choices.',
  sections: [
    { id: 'what-they-are', title: 'What Cookies / Browser Storage Are', paragraphs: ['Cookies are small files a website can place in your browser. Browsers also offer other storage that lets a site remember information on your device. In this policy, "cookies" includes both.'] },
    { id: 'how-pathway-may-use-them', title: 'How Pathway May Use Them', paragraphs: ['Pathway may use cookies and browser storage to make the site work, remember your settings and, at the current stage, keep some demonstration features working on your device.'] },
    { id: 'essential-storage', title: 'Essential Storage', paragraphs: ['Some storage is needed for basic functionality, such as remembering demo sign-in state. Without it, parts of the site may not work as expected.'] },
    { id: 'preferences', title: 'Preferences', paragraphs: ['Pathway may store choices such as saved items, study preferences and resume drafts in your browser so they are available when you return on the same device.'] },
    { id: 'analytics', title: 'Analytics', paragraphs: ['Where enabled, analytics tools may use cookies or similar technologies to help us understand how the site is used so we can improve it. We will update this policy if this is introduced or changes.'] },
    { id: 'third-party-technologies', title: 'Third-Party Technologies', paragraphs: ['Where Pathway uses third-party services, they may set their own cookies or similar technologies, which are governed by their own policies.'] },
    { id: 'managing', title: 'Managing Cookies / Browser Storage', paragraphs: ['You can manage or delete cookies and site data through your browser settings. Doing so may remove saved items, preferences or drafts stored on your device and may affect how parts of the site work.'] },
    { id: 'updates', title: 'Policy Updates', paragraphs: ['We may update this policy as Pathway evolves. The "Last updated" date at the top of this page shows when it was last revised.'] },
    { id: 'contact', title: 'Contact', paragraphs: [CONTACT_PARAGRAPH] },
  ],
}
