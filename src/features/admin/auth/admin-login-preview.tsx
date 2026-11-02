import Image from 'next/image'
import { getAdminCoachingProviders } from '../data/admin-coaching'
import { getAdminInstitutions } from '../data/admin-institutions'
import { getAdminPrograms } from '../data/admin-programs'
import { getAdminScholarships } from '../data/admin-scholarships'
import { getAdminTutors } from '../data/admin-tutors'

/**
 * Right-hand panel on the admin sign-in page: a full-bleed classroom photo (site asset) with a short line and
 * the live catalogue counts, so the page shows what staff look after. Decorative, hidden from screen readers.
 */
export function AdminLoginPreview() {
  const stats = [
    { label: 'Institutions', value: getAdminInstitutions().length },
    { label: 'Courses', value: getAdminPrograms().length },
    { label: 'Scholarships', value: getAdminScholarships().length },
    { label: 'Tutors & coaching', value: getAdminTutors().length + getAdminCoachingProviders().length },
  ]

  return (
    <aside className="relative hidden overflow-hidden lg:block" aria-hidden="true">
      <Image src="/coaching/coaching-institute.png" alt="" fill priority sizes="55vw" className="object-cover" />
      {/* Darken the lower half so the text and counts read on any part of the photo. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0)_35%,rgba(15,23,42,0.55)_65%,rgba(15,23,42,0.88)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 p-10 text-white xl:p-14">
        <p className="max-w-md font-heading text-[30px] leading-tight font-bold tracking-tight">Keep the catalogue accurate.</p>
        <p className="mt-2 max-w-md text-[15px] text-white/85">Colleges, courses, fees, exams and enquiries, in one place.</p>
        <dl className="mt-8 grid max-w-xl grid-cols-4 overflow-hidden rounded-xl border border-white/15 bg-white/10 backdrop-blur-md">
          {stats.map((stat, index) => (
            <div key={stat.label} className={index > 0 ? 'border-l border-white/15 px-4 py-3.5' : 'px-4 py-3.5'}>
              <dt className="truncate text-xs text-white/75">{stat.label}</dt>
              <dd className="mt-0.5 font-heading text-2xl font-bold tabular-nums">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </aside>
  )
}
