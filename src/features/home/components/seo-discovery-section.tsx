import { getCityFacets, getDegreeFacets, getPopularExams, getStreams } from '../api/home-data'
import type { SeoLinkGroup } from '../data/seo-discovery-links'
import { SeoDiscoveryLinks } from './seo-discovery-links'

const LINKS = 8
const MIN_COLLEGES = 10

export async function SeoDiscoverySection() {
  const [degrees, exams, cities, streams] = await Promise.all([getDegreeFacets(), getPopularExams(LINKS), getCityFacets(), getStreams()])
  const groups: SeoLinkGroup[] = [
    { title: 'Colleges by course', links: degrees.filter((degree) => degree.count >= MIN_COLLEGES).slice(0, LINKS).map((degree) => ({ label: `${degree.label} colleges (${degree.count.toLocaleString('en-IN')})`, href: `/colleges?courses=${degree.slug}&sort=ranking` })) },
    { title: 'Popular exams', links: exams.map((exam) => ({ label: exam.shortName, href: `/exam/${exam.slug}` })) },
    { title: 'Colleges by city', links: cities.filter((city) => city.count >= MIN_COLLEGES).slice(0, LINKS).map((city) => ({ label: `Colleges in ${city.label} (${city.count.toLocaleString('en-IN')})`, href: `/colleges?cities=${city.slug}` })) },
    { title: 'Streams', links: streams.map((stream) => ({ label: `${stream.name}${stream.counts.colleges ? ` (${stream.counts.colleges.toLocaleString('en-IN')} colleges)` : ''}`, href: `/${stream.slug}` })) },
  ].filter((group) => group.links.length)
  if (!groups.length) return null
  return <SeoDiscoveryLinks groups={groups} />
}
