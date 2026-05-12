import { getAllTools } from '@/lib/mdx';
import { ToolCard } from '@/components/mdx/ToolCard';
import { ToolIcon } from '@/components/ui/Icons';

export const metadata = {
  title: '工具分享',
  description: '实用工具推荐与分享',
};

export default function ToolsPage() {
  const tools = getAllTools();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
          <ToolIcon size={24} className="text-[var(--color-primary)]" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">工具分享</h1>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            为净土同修和程序员推荐的实用工具 · 共 {tools.length} 个工具
          </p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
      
      {tools.length === 0 && (
        <div className="text-center py-16 border border-dashed border-[var(--color-border)] rounded-xl">
          <p className="text-[var(--color-muted)]">
            暂无工具，请添加内容到 content/tools 目录
          </p>
        </div>
      )}
    </div>
  );
}
