import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { headingId, nodeText } from '../lib/headings'

const components: Components = {
  h2: ({ children }) => <h2 id={headingId(nodeText(children))} className="scroll-mt-header mt-9 mb-3 font-heading text-[22px] leading-snug font-bold text-foreground">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-7 mb-2 font-heading text-lg font-bold text-foreground">{children}</h3>,
  p: ({ children }) => <p className="my-4 text-[16px] leading-8 text-foreground/90">{children}</p>,
  ul: ({ children }) => <ul className="my-4 list-disc space-y-2 pl-6 text-[16px] leading-7 text-foreground/90 marker:text-primary">{children}</ul>,
  ol: ({ children }) => <ol className="my-4 list-decimal space-y-2 pl-6 text-[16px] leading-7 text-foreground/90 marker:font-semibold marker:text-primary">{children}</ol>,
  a: ({ href, children }) => {
    const external = href ? /^https?:\/\//.test(href) : false
    return (
      <a href={href} className="font-medium text-primary underline underline-offset-4 hover:text-primary/80" {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    )
  },
  blockquote: ({ children }) => <blockquote className="my-6 rounded-r-xl border-l-4 border-primary bg-secondary/60 px-5 py-1 text-foreground">{children}</blockquote>,
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  hr: () => <hr className="my-8 border-border" />,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="bg-muted/60 px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">{children}</th>,
  td: ({ children }) => <td className="border-t px-4 py-2.5 text-foreground">{children}</td>,
  img: () => null,
}

export function MarkdownBody({ source }: { source: string }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]} skipHtml>
        {source}
      </ReactMarkdown>
    </div>
  )
}
