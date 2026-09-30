import { notFound } from 'next/navigation'
import { type Metadata } from 'next'
import {
  getAdminScholarships,
  getAdminScholarshipById,
} from '@/features/admin/data/admin-scholarships'
import { AdminScholarshipEditor } from '@/features/admin/components/scholarships/editor/admin-scholarship-editor'

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
    title: `Edit: ${data.scholarship.name} | Admin Console`,
    description: `Edit scholarship parameters, benefits, and eligibility criteria for ${data.scholarship.name}.`,
  }
}

export default async function AdminScholarshipEditPage({ params }: Props) {
  const { scholarshipId } = await params
  const data = getAdminScholarshipById(scholarshipId)

  if (!data) {
    notFound()
  }

  return <AdminScholarshipEditor scholarship={data.scholarship} mode="edit" />
}
