import type { Metadata } from 'next'
import { ExamCalendarPage } from '@/features/exam-calendar/components/exam-calendar-page'

export const metadata: Metadata = {
  title: 'Entrance Exam Calendar',
  description: 'Upcoming application windows, exam days and result dates for entrance exams, from official notices.',
  alternates: { canonical: '/exam-calendar' },
}

export const dynamic = 'force-dynamic'

export default function Page() {
  return <ExamCalendarPage />
}
