import { getDegreeFacets, getStreams } from '../api/home-data'
import { StreamSwitcher, type StreamEntry, type StreamPanel } from './stream-switcher'

const MIN_COLLEGES = 10

const count = (value: number) => value.toLocaleString('en-IN')

export async function StreamSwitcherSection() {
  const [streams, degrees] = await Promise.all([getStreams(), getDegreeFacets()])
  if (!streams.length) return null
  const degreeByLabel = new Map(degrees.map((degree) => [degree.label.toLowerCase(), degree]))

  const panels: StreamPanel[] = streams.map((stream) => {
    const offered = stream.degreeLabels
      .map((label) => degreeByLabel.get(label.toLowerCase()))
      .filter((degree): degree is NonNullable<typeof degree> => Boolean(degree && degree.count >= MIN_COLLEGES))
    const entries: StreamEntry[] = offered.slice(0, 2).map((degree) => ({
      label: `Top ${degree.label} colleges`,
      hint: `${count(degree.count)} colleges, ranked by NIRF`,
      href: `/colleges?courses=${degree.slug}&sort=ranking`,
      icon: 'landmark',
    }))
    if (stream.counts.courses) entries.push({ label: `${stream.name} courses`, hint: `${count(stream.counts.courses)} ${stream.counts.courses === 1 ? 'course' : 'courses'} · ${stream.tagline}`, href: `/courses?stream=${stream.slug}`, icon: 'book' })
    if (stream.counts.exams) entries.push({ label: 'Entrance exams', hint: stream.exams.slice(0, 3).map((exam) => exam.label).join(', ') || `${stream.counts.exams} exams`, href: `/exams?area=${stream.slug}`, icon: 'file' })
    if (stream.counts.scholarships) entries.push({ label: 'Scholarships', hint: `${count(stream.counts.scholarships)} for ${stream.name.toLowerCase()} students`, href: `/scholarships?stream=${stream.slug}`, icon: 'award' })
    if (stream.exams.some((exam) => exam.slug === 'jee-main')) entries.push({ label: 'College predictor', hint: 'Colleges for your JEE rank', href: '/college-predictor', icon: 'target' })
    entries.push({ label: 'Compare colleges', hint: 'Fees, ranks and placements side by side', href: '/compare/colleges', icon: 'scale' })
    entries.push({ label: `${stream.name} guide`, hint: 'Everything for this stream', href: `/${stream.slug}`, icon: 'compass' })
    return { slug: stream.slug, name: stream.name, icon: stream.icon, colleges: stream.counts.colleges, entries: entries.slice(0, 8) }
  })
  return <StreamSwitcher panels={panels} />
}
