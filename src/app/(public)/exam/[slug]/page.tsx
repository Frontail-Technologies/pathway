import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { exams, getExamBySlug } from '@/features/exams/data/exams'
import { ExamDetailPage } from '@/features/exams/components/exam-detail-page'
import { MobileBottomNavigation } from '@/components/layout/mobile-navigation'

export function generateStaticParams() {
  return exams.filter((exam) => exam.hasDetailPage).map((exam) => ({ slug: exam.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const exam = getExamBySlug(slug)
  return { title: exam ? exam.shortName : 'Exam Not Found', description: exam?.description }
}

export default async function ExamDetailRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const exam = getExamBySlug(slug)
  if (!exam?.detail) notFound()

  return (
    <>
      <ExamDetailPage exam={{ ...exam, detail: exam.detail }} />
      <MobileBottomNavigation />
    </>
  )
}
