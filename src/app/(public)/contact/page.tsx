import type { Metadata } from 'next'
import { ContactPage } from '@/features/company/components/contact-page'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Pathway with questions, corrections, feedback or privacy requests.',
}

export default function ContactRoute() {
  return <ContactPage />
}
