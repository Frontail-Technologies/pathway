export function inCuratedOrder<T extends { slug: string }>(items: T[], slugs: readonly string[]) {
  const bySlug = new Map(items.map((item) => [item.slug, item]))
  return slugs.flatMap((slug) => bySlug.get(slug) ?? [])
}
