import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            关于
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
            prose-p:text-gray-700 dark:prose-p:text-gray-300
            prose-a:text-blue-600 dark:prose-a:text-blue-400
          ">
            <p>
              这是一个专注于 AI 学习的个人博客，记录我在人工智能领域的学习历程和心得体会。
            </p>

            <h2>内容方向</h2>
            <ul>
              <li>Transformer 架构深入理解</li>
              <li>大语言模型 (LLM) 的训练与微调</li>
              <li>Prompt Engineering 最佳实践</li>
              <li>AI 工具与项目实战</li>
              <li>前沿论文解读</li>
            </ul>

            <h2>更新频率</h2>
            <p>
              由于是个人学习博客，更新频率会比较低，但每篇文章都会认真撰写，力求内容准确、有价值。
            </p>

            <h2>联系我</h2>
            <p>
              如果有问题或建议，欢迎通过 GitHub 提交 Issue 或 Pull Request。
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
