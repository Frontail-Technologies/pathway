import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminCoachingProviderById, getAdminCoachingProviders } from '@/features/admin/data/admin-coaching'
import { AdminCoachingDetailView } from '@/features/admin/components/tutors-coaching/coaching/detail/admin-coaching-detail-view'

type Props = {
  params: Promise<{ providerId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { providerId } = await params
  const provider = getAdminCoachingProviderById(providerId)
  if (!provider) return { title: 'Provider Not Found | Pathway Admin' }

  return {
    title: `${provider.name} | Coaching Details | Pathway Admin`,
    description: `Admin profile and program tracks for ${provider.name}.`,
  }
}

export async function generateStaticParams() {
  const providers = getAdminCoachingProviders()
  return providers.map((p) => ({
    providerId: p.id,
  }))
}

export default async function AdminCoachingDetailPage({ params }: Props) {
  const { providerId } = await params
  const provider = getAdminCoachingProviderById(providerId)

  if (!provider) {
    notFound()
  }

  return <AdminCoachingDetailView provider={provider} />
}
