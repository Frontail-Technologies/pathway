import Image from 'next/image'
import Link from 'next/link'
import type { NewsArticle } from '../data/news-articles'

export function ArticleCard({ article }: { article: NewsArticle }) {
  return (
    <Link href={article.href} className="group flex flex-col overflow-hidden rounded-[10px] border bg-card outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
      {article.image && (
        <div className="relative aspect-16/9 w-full overflow-hidden">
          <Image src={article.image} alt={article.imageAlt ?? ''} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-primary">{article.category}</span>
          <span className="text-muted-foreground">{article.date}</span>
        </div>
        <h3 className="text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">{article.title}</h3>
        {article.description && <p className="text-sm leading-6 text-muted-foreground">{article.description}</p>}
      </div>
    </Link>
  )
}
