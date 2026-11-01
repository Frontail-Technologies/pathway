import type { Metadata } from 'next'
import { AuthFlow } from '@/features/auth/components/auth-flow'

export const metadata: Metadata = { title: 'Create account', description: 'Create a Pathway account with your mobile number or email.', robots: { index: false } }

export default async function Page({ searchParams }: { searchParams: Promise<{ next?: string | string[] }> }) {
  const { next } = await searchParams
  return <AuthFlow mode="register" next={typeof next === 'string' ? next : undefined} />
}
