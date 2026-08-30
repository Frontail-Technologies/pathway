'use client'

import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { seoDiscoveryLinkGroups } from '../data/seo-discovery-links'

export function SeoDiscoveryLinks() {
  return (
    <section className="border-b bg-muted py-8 sm:py-9 lg:py-10">
      <div className="container-shell px-4">
        <div className="hidden gap-6 md:grid md:grid-cols-4">
          {seoDiscoveryLinkGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{group.title}</p>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="rounded-sm text-sm text-foreground outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Accordion className="md:hidden">
          {seoDiscoveryLinkGroups.map((group) => (
            <AccordionItem key={group.title} value={group.title}>
              <AccordionTrigger className="min-h-11 text-xs font-semibold uppercase tracking-wider text-foreground">{group.title}</AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-wrap gap-x-4 gap-y-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="rounded-sm text-sm text-muted-foreground outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
