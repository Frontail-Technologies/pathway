import { notFound } from 'next/navigation'
import { type Metadata } from 'next'
import {
  getAdminScholarships,
  getAdminScholarshipById,
} from '@/features/admin/data/admin-scholarships'
import { AdminScholarshipDetailView } from '@/features/admin/components/scholarships/detail/admin-scholarship-detail-view'

type Props = {
  params: Promise<{
    scholarshipId: string
  }>
}

export async function generateStaticParams() {
  const scholarships = getAdminScholarships()
  const params: { scholarshipId: string }[] = []

  for (const s of scholarships) {
    params.push({ scholarshipId: s.id })
    if (s.slug && s.slug !== s.id) {
      params.push({ scholarshipId: s.slug })
    }
  }

  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { scholarshipId } = await params
  const data = getAdminScholarshipById(scholarshipId)

  if (!data) {
    return {
      title: 'Scholarship Not Found | Admin Console',
    }
  }

  return {
    title: `${data.scholarship.name} | Scholarship Details | Admin Console`,
    description: `Administrative details and eligibility for ${data.scholarship.name}.`,
  }
}

export default async function AdminScholarshipDetailPage({ params }: Props) {
  const { scholarshipId } = await params
  const data = getAdminScholarshipById(scholarshipId)

  if (!data) {
    notFound()
  }

  return <AdminScholarshipDetailView scholarship={data.scholarship} />
}
