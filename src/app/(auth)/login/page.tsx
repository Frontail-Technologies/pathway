import type { Metadata } from 'next'
import { LoginForm } from '@/features/auth/components/login-form'

export const metadata: Metadata = { title: 'Sign in', description: 'Sign in to your Pathway student account (frontend demo).', robots: { index: false } }

export default function Page() {
  return <LoginForm />
}
