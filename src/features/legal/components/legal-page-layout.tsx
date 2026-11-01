import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { Container } from '@/components/shared/container'
import { LEGAL_LAST_UPDATED, type LegalDocument } from '../data/legal-shared'

 
export function LegalPageLayout({ document }: { document: LegalDocument }) {
  return (
    <div className="bg-background pb-12 lg:pb-16">
      <Container className="py-3">
        <Breadcrumbs items={['Home', document.title]} />
      </Container>
      <Container>
        <header className="border-b pb-6">
          <h1 className="font-heading text-3xl font-extrabold text-foreground sm:text-4xl">{document.title}</h1>
          <p className="mt-2 max-w-2xl text-base leading-7 text-muted-foreground">{document.intro}</p>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: {LEGAL_LAST_UPDATED}</p>
        </header>
        <div className="mt-8 flex gap-12 lg:items-start">
          <nav aria-label="On this page" className="sticky top-header-gap hidden w-60 shrink-0 lg:block">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">On this page</p>
            <ol className="mt-3 flex flex-col gap-1.5 border-l">
              {document.sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="-ml-px block border-l border-transparent py-0.5 pl-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                    {index + 1}. {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <article className="max-w-3xl min-w-0 flex-1">
            {document.sections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-36 border-b py-7 first:pt-0 last:border-b-0">
                <h2 className="font-heading text-xl font-bold text-foreground">
                  {index + 1}. {section.title}
                </h2>
                <div className="mt-3 flex flex-col gap-3 text-base leading-7 text-foreground/85">
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets && (
                    <ul className="list-disc space-y-1.5 pl-5 marker:text-muted-foreground">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                  {section.after && <p>{section.after}</p>}
                </div>
              </section>
            ))}
          </article>
        </div>
      </Container>
    </div>
  )
}
