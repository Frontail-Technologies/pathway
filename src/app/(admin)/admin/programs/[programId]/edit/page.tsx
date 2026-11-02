import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminPrograms, getAdminProgramById } from '@/features/admin/data/admin-programs'
import { AdminProgramEditor } from '@/features/admin/components/programs/admin-program-editor'

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
      title: 'Course not found | Pathway Admin',
    }
  }
  return {
    title: `Edit ${record.program.name} | Pathway Admin`,
    description: `Edit ${record.program.name}.`,
  }
}

export default async function AdminProgramEditPage({ params }: Props) {
  const { programId } = await params
  const record = getAdminProgramById(programId)

  if (!record) {
    notFound()
  }

  return <AdminProgramEditor program={record.program} mode="edit" />
}
