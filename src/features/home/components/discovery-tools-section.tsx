import { discoveryTools } from '../data/discovery-tools'
import { DiscoveryToolCard } from './discovery-tool-card'

export function DiscoveryToolsSection() {
  return (
    <section className="bg-background py-7 sm:py-9 lg:py-12">
      <div className="container-shell">
        <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">Explore Education Tools</h2>
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {discoveryTools.map((tool) => (
            <DiscoveryToolCard key={tool.title} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  )
}
