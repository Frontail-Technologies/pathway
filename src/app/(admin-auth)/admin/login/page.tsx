import type { Metadata } from 'next'
import { AdminLoginForm } from '@/features/admin/auth/admin-login-form'

export const metadata: Metadata = { title: 'Admin sign in', description: 'Sign in to the Pathway admin.', robots: { index: false, follow: false } }

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ next?: string | string[] }> }) {
  const { next } = await searchParams
  return <AdminLoginForm next={typeof next === 'string' ? next : undefined} />
}
