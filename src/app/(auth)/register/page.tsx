import type { Metadata } from 'next'
import { RegisterForm } from '@/features/auth/components/register-form'

export const metadata: Metadata = { title: 'Create account', description: 'Create a Pathway student account (frontend demo).', robots: { index: false } }

export default function Page() {
  return <RegisterForm />
}
