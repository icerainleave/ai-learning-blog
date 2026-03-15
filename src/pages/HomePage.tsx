import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { PostCard } from '../components/PostCard';
import { getAllPosts, type PostMeta } from '../lib/posts';
import { Loader2 } from 'lucide-react';

export function HomePage() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const allPosts = getAllPosts();
      setPosts(allPosts);
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            AI 学习日志
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            记录 AI 学习过程中的思考与总结，包括 Transformer、LLM、Prompt Engineering 等内容。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            最新文章
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Posts loaded: {posts.length}
            {posts[0]?.title ? ` · First: ${posts[0].title}` : ''}
          </p>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
          ) : posts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2">
              {posts.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400">
                暂无文章，敬请期待...
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
