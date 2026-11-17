import { getCollection, type CollectionEntry } from 'astro:content';

export type ContentKind = 'review' | 'compare' | 'top5';

export interface UnifiedArticleEntry {
  id: string;
  collection: 'blog' | 'compare' | 'top5';
  kind: ContentKind;
  url: string;
  entry: CollectionEntry<'blog'> | CollectionEntry<'compare'> | CollectionEntry<'top5'>;
}

const svgAssets = import.meta.glob<{ default: { src: string } }>('../assets/**/*.svg', { eager: true });

export function slugifyCategory(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function resolveAssetUrl(asset: any): string | null {
  if (!asset) return null;
  if (typeof asset === 'string') {
    const normalized = asset.replace(/^\.\.\/\.\.\//, '../');
    const mod = svgAssets[normalized] || svgAssets[asset];
    if (mod?.default) {
      return typeof mod.default === 'string' ? mod.default : mod.default.src;
    }
    return asset;
  }
  return asset.src || null;
}

export function isComparisonPost(post: { id: string; data: { serviceType?: string; articleType?: string } }): boolean {
  return (
    post.data.articleType === 'compare' ||
    post.data.serviceType?.toLowerCase() === 'comparison' ||
    post.id.includes('-vs-')
  );
}

export function sortByNewest<T extends { data: { date?: string } }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => new Date(b.data.date || 0).valueOf() - new Date(a.data.date || 0).valueOf()
  );
}

export function formatShortPrice(raw?: string): string {
  if (!raw) return 'See plans';
  const firstSegment = raw.split(/\s*[•·|]\s*/)[0].trim();
  const openCount = (firstSegment.match(/\(/g) || []).length;
  const closeCount = (firstSegment.match(/\)/g) || []).length;
  const balanced = openCount > closeCount ? `${firstSegment})` : firstSegment;
  return balanced.length > 28 ? `${balanced.slice(0, 26).trim()}…` : balanced;
}

/** Returns comparison guides from `src/content/compare` plus legacy `-vs-` comparisons in `src/content/blog`. */
export async function getComparisonEntries(): Promise<UnifiedArticleEntry[]> {
  const [comparePosts, blogPosts] = await Promise.all([
    getCollection('compare'),
    getCollection('blog'),
  ]);

  const fromCompare: UnifiedArticleEntry[] = comparePosts.map((entry) => ({
    id: entry.id,
    collection: 'compare',
    kind: 'compare',
    url: `/compare/${entry.id}/`,
    entry,
  }));

  const existingIds = new Set(fromCompare.map((item) => item.id));
  const fromBlog: UnifiedArticleEntry[] = blogPosts
    .filter((entry) => !existingIds.has(entry.id) && isComparisonPost(entry))
    .map((entry) => ({
      id: entry.id,
      collection: 'blog',
      kind: 'compare',
      url: `/blog/${entry.id}/`,
      entry,
    }));

  return [...fromCompare, ...fromBlog].sort(
    (a, b) => new Date(b.entry.data.date || 0).valueOf() - new Date(a.entry.data.date || 0).valueOf()
  );
}

/** Returns Top 5 niche guides from `src/content/top5`. */
export async function getTop5Entries(): Promise<UnifiedArticleEntry[]> {
  const top5Posts = await getCollection('top5');
  return sortByNewest(top5Posts).map((entry) => ({
    id: entry.id,
    collection: 'top5',
    kind: 'top5',
    url: `/top-5/${entry.id}/`,
    entry,
  }));
}

/** Returns all editorial articles across blog reviews, comparisons, and Top 5 guides. */
export async function getAllEditorialEntries(): Promise<UnifiedArticleEntry[]> {
  const [blogPosts, comparePosts, top5Posts] = await Promise.all([
    getCollection('blog'),
    getCollection('compare'),
    getCollection('top5'),
  ]);

  const mapped: UnifiedArticleEntry[] = [
    ...blogPosts.map((entry) => ({
      id: entry.id,
      collection: 'blog' as const,
      kind: isComparisonPost(entry) ? ('compare' as const) : ('review' as const),
      url: `/blog/${entry.id}/`,
      entry,
    })),
    ...comparePosts.map((entry) => ({
      id: entry.id,
      collection: 'compare' as const,
      kind: 'compare' as const,
      url: `/compare/${entry.id}/`,
      entry,
    })),
    ...top5Posts.map((entry) => ({
      id: entry.id,
      collection: 'top5' as const,
      kind: 'top5' as const,
      url: `/top-5/${entry.id}/`,
      entry,
    })),
  ];

  return mapped.sort(
    (a, b) => new Date(b.entry.data.date || 0).valueOf() - new Date(a.entry.data.date || 0).valueOf()
  );
}

