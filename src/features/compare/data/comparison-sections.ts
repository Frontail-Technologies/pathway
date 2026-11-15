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
   
  highlight?: 'lowest' | 'highest'
}

export type ComparisonSectionConfig = {
  title: string
  icon: LucideIcon
  rows: ComparisonRowConfig[]
}

 
function toComparableNumber(value: ComparisonRowValue): number {
  if (typeof value === 'number') return value
  if (typeof value !== 'string') return NaN
  const match = value.replace(/,/g, '').match(/(\d+(?:\.\d+)?)\s*(crore|cr|lakh|lpa|l\b|k\b)?/i)
  if (!match) return NaN
  const unit = (match[2] ?? '').toLowerCase()
  const scale = unit === 'crore' || unit === 'cr' ? 1e7 : unit === 'lakh' || unit === 'lpa' || unit === 'l' ? 1e5 : unit === 'k' ? 1e3 : 1
  return parseFloat(match[1]!) * scale
}

const empty = (value: ComparisonRowValue) => value === '' || value === 'Not available' || value === 0 || (Array.isArray(value) && value.length === 0)

export function visibleRows(section: ComparisonSectionConfig, entries: ComparisonEntry[]) {
  return section.rows.filter((row) => entries.some((entry) => !empty(row.getValue(entry))))
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
      { label: 'NIRF Rank', type: 'text', getValue: ({ college }) => college.nirfRank ?? 'Not available', highlight: 'lowest' },
      { label: 'Students', type: 'text', getValue: ({ college }) => college.students ?? 'Not available' },
      { label: 'Faculty', type: 'text', getValue: ({ college }) => college.faculty ?? 'Not available' },
      { label: 'Students per Faculty', type: 'text', getValue: ({ college }) => college.studentFacultyRatio ?? 'Not available', highlight: 'lowest' },
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
      { label: 'Median Package', type: 'text', getValue: ({ college }) => college.placements.medianPackage ?? 'Not available', highlight: 'highest' },
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

 
export const facilityRowIcons: Record<string, LucideIcon> = {
  Hostel: BedDouble,
  Library: Library,
  Labs: FlaskConical,
  Sports: Dumbbell,
  'Wi-Fi': Wifi,
  Medical: Stethoscope,
  Cafeteria: Utensils,
}

 
export function highlightedIndex(row: ComparisonRowConfig, entries: ComparisonEntry[]): number {
  if (!row.highlight || entries.length < 2) return -1
  const numbers = entries.map((entry) => toComparableNumber(row.getValue(entry)))
  const valid = numbers.filter((n) => !Number.isNaN(n))
  if (valid.length < 2) return -1
  const target = row.highlight === 'lowest' ? Math.min(...valid) : Math.max(...valid)
  if (valid.filter((n) => n === target).length > 1) return -1
  return numbers.indexOf(target)
}

export function rowDiffers(row: ComparisonRowConfig, entries: ComparisonEntry[]) {
  const values = entries.map((entry) => JSON.stringify(row.getValue(entry)))
  return new Set(values).size > 1
}

export const glanceRows: string[] = ['NIRF Rank', 'Median Package', 'Typical Tuition', 'Students per Faculty', 'Entrance Exam']
