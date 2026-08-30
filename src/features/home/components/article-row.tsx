import Link from 'next/link'
import type { NewsArticle } from '../data/news-articles'

export function ArticleRow({ article }: { article: NewsArticle }) {
  return (
    <Link href={article.href} className="group flex flex-col gap-1 rounded-sm border-b py-3 outline-none last:border-b-0 focus-visible:ring-2 focus-visible:ring-primary/40">
      <div className="flex items-center gap-2 text-xs">
        <span className="font-semibold text-primary">{article.category}</span>
        <span className="text-muted-foreground">{article.date}</span>
      </div>
      <span className="text-sm font-medium leading-5 text-foreground transition-colors group-hover:text-primary">{article.title}</span>
    </Link>
  )
}
