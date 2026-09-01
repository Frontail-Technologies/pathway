import type { LucideIcon } from 'lucide-react'
import {
  BadgeCheck,
  BedDouble,
  Building2,
  BriefcaseBusiness,
  ClipboardCheck,
  Dumbbell,
  FlaskConical,
  GraduationCap,
  IndianRupee,
  Landmark,
  Library,
  Star,
  Stethoscope,
  Utensils,
  Wifi,
} from 'lucide-react'
import type { CollegeComparisonItem } from './college-compare'
import type { ProgramSnapshot } from './programs'

export type ComparisonEntry = { college: CollegeComparisonItem; program: ProgramSnapshot }

export type ComparisonRowValue = string | number | boolean | string[]

export type ComparisonRowConfig = {
  label: string
  type: 'text' | 'rating' | 'boolean' | 'chips'
  getValue: (entry: ComparisonEntry) => ComparisonRowValue
  /** Restrained difference highlight — only applied to genuinely comparable numeric rows. */
  highlight?: 'lowest' | 'highest'
}

export type ComparisonSectionConfig = {
  title: string
  icon: LucideIcon
  rows: ComparisonRowConfig[]
}

/** Strips non-numeric characters so fee/package strings like "₹2.2L / year" can be compared. */
function toComparableNumber(value: ComparisonRowValue): number {
  if (typeof value === 'number') return value
  if (typeof value !== 'string') return NaN
  const match = value.match(/[\d.]+/)
  return match ? parseFloat(match[0]) : NaN
}

export const comparisonSections: ComparisonSectionConfig[] = [
  {
    title: 'Institute Information',
    icon: Building2,
    rows: [
      { label: 'College Type', type: 'text', getValue: ({ college }) => college.type },
      { label: 'Location', type: 'text', getValue: ({ college }) => college.location },
      { label: 'Established', type: 'text', getValue: ({ college }) => college.established },
      { label: 'Institute Status', type: 'text', getValue: ({ college }) => college.instituteStatus },
    ],
  },
  {
    title: 'Course Details',
    icon: GraduationCap,
    rows: [
      { label: 'Degree', type: 'text', getValue: ({ program }) => program.degree },
      { label: 'Course', type: 'text', getValue: ({ program }) => program.course },
      { label: 'Course Level', type: 'text', getValue: ({ program }) => program.courseLevel },
      { label: 'Duration', type: 'text', getValue: ({ program }) => program.duration },
      { label: 'Study Mode', type: 'text', getValue: ({ program }) => program.studyMode },
    ],
  },
  {
    title: 'Ratings & Reviews',
    icon: Star,
    rows: [
      { label: 'Overall Rating', type: 'rating', getValue: ({ college }) => college.ratings.overall, highlight: 'highest' },
      { label: 'Faculty', type: 'rating', getValue: ({ college }) => college.ratings.faculty },
      { label: 'Placements', type: 'rating', getValue: ({ college }) => college.ratings.placements },
      { label: 'Infrastructure', type: 'rating', getValue: ({ college }) => college.ratings.infrastructure },
      { label: 'Value for Money', type: 'rating', getValue: ({ college }) => college.ratings.valueForMoney },
    ],
  },
  {
    title: 'Placements',
    icon: BriefcaseBusiness,
    rows: [
      { label: 'Average Package', type: 'text', getValue: ({ college }) => college.placements.averagePackage, highlight: 'highest' },
      { label: 'Highest Package', type: 'text', getValue: ({ college }) => college.placements.highestPackage },
      { label: 'Placement Rate', type: 'text', getValue: ({ college }) => college.placements.placementRate },
      { label: 'Top Recruiters', type: 'chips', getValue: ({ college }) => college.placements.topRecruiters },
    ],
  },
  {
    title: 'Fees',
    icon: IndianRupee,
    rows: [
      { label: 'Typical Tuition', type: 'text', getValue: ({ program }) => program.tuition, highlight: 'lowest' },
      { label: 'Hostel Estimate', type: 'text', getValue: ({ college }) => college.fees.hostel },
      { label: 'Other Charges', type: 'text', getValue: ({ college }) => college.fees.other },
    ],
  },
  {
    title: 'Admission Information',
    icon: ClipboardCheck,
    rows: [
      { label: 'Entrance Exam', type: 'text', getValue: ({ program }) => program.entranceExam },
      { label: 'Eligibility', type: 'text', getValue: ({ program }) => program.eligibility },
      { label: 'Admission Route', type: 'text', getValue: ({ program }) => program.admissionRoute },
      { label: 'Total Programs', type: 'text', getValue: ({ college }) => college.totalPrograms },
    ],
  },
  {
    title: 'Accreditation',
    icon: BadgeCheck,
    rows: [
      { label: 'NAAC', type: 'text', getValue: ({ college }) => college.naacGrade },
      { label: 'Approved By', type: 'text', getValue: ({ college }) => college.approvedBy },
    ],
  },
  {
    title: 'Infrastructure & Facilities',
    icon: Landmark,
    rows: [
      { label: 'Hostel', type: 'boolean', getValue: ({ college }) => college.facilities.hostel },
      { label: 'Library', type: 'boolean', getValue: ({ college }) => college.facilities.library },
      { label: 'Labs', type: 'boolean', getValue: ({ college }) => college.facilities.labs },
      { label: 'Sports', type: 'boolean', getValue: ({ college }) => college.facilities.sports },
      { label: 'Wi-Fi', type: 'boolean', getValue: ({ college }) => college.facilities.wifi },
      { label: 'Medical', type: 'boolean', getValue: ({ college }) => college.facilities.medical },
      { label: 'Cafeteria', type: 'boolean', getValue: ({ college }) => college.facilities.cafeteria },
    ],
  },
]

/** Semantic icon per facility row label, for the Infrastructure & Facilities section only. */
export const facilityRowIcons: Record<string, LucideIcon> = {
  Hostel: BedDouble,
  Library: Library,
  Labs: FlaskConical,
  Sports: Dumbbell,
  'Wi-Fi': Wifi,
  Medical: Stethoscope,
  Cafeteria: Utensils,
}

/** Index (within `entries`) of the cell that should receive the restrained highlight for this row, or -1 if not applicable (fewer than 2 comparable values). */
export function highlightedIndex(row: ComparisonRowConfig, entries: ComparisonEntry[]): number {
  if (!row.highlight || entries.length < 2) return -1
  const numbers = entries.map((entry) => toComparableNumber(row.getValue(entry)))
  if (numbers.some((n) => Number.isNaN(n))) return -1
  const target = row.highlight === 'lowest' ? Math.min(...numbers) : Math.max(...numbers)
  return numbers.indexOf(target)
}
