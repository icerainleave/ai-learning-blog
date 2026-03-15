import matter from 'gray-matter';
import { format, type Locale } from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  cover?: string;
}

export interface Post extends PostMeta {
  content: string;
}

// 使用 Vite 的 glob 导入
const modules = import.meta.glob('../../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export function getPostSlugs(): string[] {
  return Object.keys(modules).map(path => {
    const filename = path.split('/').pop() || '';
    return filename.replace('.md', '');
  });
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const path = `../../posts/${slug}.md`;
    const content = modules[path];

    if (!content) return null;

    const { data, content: markdown } = matter(content);

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      cover: data.cover,
      content: markdown,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs.map(slug => {
    const post = getPostBySlug(slug);
    if (!post) return null;
    const { content, ...meta } = post;
    return meta;
  });

  return (posts.filter(Boolean) as PostMeta[]).sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function formatDate(dateString: string, locale: string = 'zh'): string {
  const date = new Date(dateString);
  const locales: Record<string, Locale> = { zh: zhCN, en: enUS };
  return format(date, 'yyyy年MM月dd日', { locale: locales[locale] || zhCN });
}
