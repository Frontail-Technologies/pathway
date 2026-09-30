import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminPrograms, getAdminProgramById } from '@/features/admin/data/admin-programs'
import { AdminProgramDetailView } from '@/features/admin/components/programs/admin-program-detail-view'

type Props = {
  params: Promise<{ programId: string }>
}

export async function generateStaticParams() {
  const programs = getAdminPrograms()
  const params: { programId: string }[] = []
  for (const prog of programs) {
    params.push({ programId: prog.id })
    if (prog.slug !== prog.id) {
      params.push({ programId: prog.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { programId } = await params
  const record = getAdminProgramById(programId)
  if (!record) {
    return {
      title: 'Program Not Found | Pathway Admin',
    }
  }
  return {
    title: `${record.program.name} | Program Details | Pathway Admin`,
    description: `Administrative view, curriculum, and offering institutions for ${record.program.name}.`,
  }
}

export default async function AdminProgramDetailPage({ params }: Props) {
  const { programId } = await params
  const record = getAdminProgramById(programId)

  if (!record) {
    notFound()
  }

  return <AdminProgramDetailView data={record} />
}
