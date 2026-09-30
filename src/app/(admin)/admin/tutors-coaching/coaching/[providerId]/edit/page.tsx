import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminCoachingProviderById, getAdminCoachingProviders } from '@/features/admin/data/admin-coaching'
import { AdminCoachingEditor } from '@/features/admin/components/tutors-coaching/coaching/editor/admin-coaching-editor'

type Props = {
  params: Promise<{ providerId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { providerId } = await params
  const provider = getAdminCoachingProviderById(providerId)
  if (!provider) return { title: 'Provider Not Found | Pathway Admin' }

  return {
    title: `Edit ${provider.name} | Coaching Editor | Pathway Admin`,
    description: `Edit programs and profile for ${provider.name}.`,
  }
}

export async function generateStaticParams() {
  const providers = getAdminCoachingProviders()
  return providers.map((p) => ({
    providerId: p.id,
  }))
}

export default async function AdminEditCoachingPage({ params }: Props) {
  const { providerId } = await params
  const provider = getAdminCoachingProviderById(providerId)

  if (!provider) {
    notFound()
  }

  return <AdminCoachingEditor initialProvider={provider} />
}
