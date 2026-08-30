import { SectionHeader } from '@/components/shared/section-header'
import { discoveryTools } from '../data/discovery-tools'
import { DiscoveryToolCard } from './discovery-tool-card'

export function DiscoveryToolsSection() {
  return (
    <section className="border-b bg-card py-6 sm:py-9 lg:py-11">
      <div className="container-shell px-4">
        <SectionHeader title="Explore Education Tools" />
        <div className="mt-3.5 grid grid-cols-2 gap-2.5 sm:mt-5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {discoveryTools.map((tool) => <DiscoveryToolCard key={tool.title} tool={tool} />)}
        </div>
      </div>
    </section>
  )
}
