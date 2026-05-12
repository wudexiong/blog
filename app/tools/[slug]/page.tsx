import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getToolBySlug, getAllTools } from '@/lib/mdx';
import { MDXContent } from '@/components/mdx/MDXContent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const categoryLabels: Record<string, string> = {
  buddhism: '佛学工具',
  development: '开发工具',
  productivity: '效率工具',
};

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: '工具未找到' };

  return {
    title: tool.title,
    description: tool.description,
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/tools"
        className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] mb-6 inline-block"
      >
        ← 返回工具列表
      </Link>

      <article>
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-[var(--color-muted)] mb-4">
            <span className="px-2 py-0.5 bg-[var(--color-border)] rounded">
              {categoryLabels[tool.category]}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-4">{tool.title}</h1>
          <p className="text-lg text-[var(--color-muted)]">{tool.description}</p>
          {tool.link && (
            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              访问工具 →
            </a>
          )}
        </header>

        <MDXContent content={tool.content} />

        <footer className="mt-8 pt-8 border-t border-[var(--color-border)]">
          <div className="flex flex-wrap gap-2">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-[var(--color-border)] rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </footer>
      </article>
    </div>
  );
}
