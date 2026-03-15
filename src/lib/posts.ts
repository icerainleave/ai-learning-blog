import { format, type Locale } from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';
import { posts as generatedPosts } from './posts.generated';

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[] | readonly string[];
  cover?: string;
}

export interface Post extends PostMeta {
  content: string;
}

export function getPostSlugs(): string[] {
  return generatedPosts.map((post) => post.slug);
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const post = generatedPosts.find((p) => p.slug === slug);
    if (!post) return null;
    return { ...post };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): PostMeta[] {
  return generatedPosts.map(({ content, ...meta }) => meta);
}

export function formatDate(dateString: string, locale: string = 'zh'): string {
  const date = new Date(dateString);
  const locales: Record<string, Locale> = { zh: zhCN, en: enUS };
  return format(date, 'yyyy年MM月dd日', { locale: locales[locale] || zhCN });
}
