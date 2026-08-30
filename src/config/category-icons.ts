import { BookOpen, GraduationCap, Landmark, MonitorPlay, Stethoscope } from 'lucide-react'
import { Atom, Flask } from '@phosphor-icons/react'

export const categoryIcons = { colleges: GraduationCap, courses: BookOpen, exams: Flask, scholarships: Landmark, online: MonitorPlay, careers: Stethoscope, science: Atom } as const
