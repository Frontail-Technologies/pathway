import type { Metadata } from 'next'
import { TutorSpaceLayout } from '@/features/tutor-space/components/tutor-space-layout'

export const metadata: Metadata = { title: { default: 'Tutor space', template: '%s · Tutor space | Pathway' }, robots: { index: false, follow: false } }

export default function TutorDashboardLayout({ children }: { children: React.ReactNode }) {
  return <TutorSpaceLayout>{children}</TutorSpaceLayout>
}
