import Link from 'next/link';
import { Tool } from '@/lib/mdx';
import { TagIcon } from '@/components/ui/Icons';

interface ToolCardProps {
  tool: Tool;
}

const categoryLabels: Record<string, string> = {
  buddhism: '佛学工具',
  development: '开发工具',
  productivity: '效率工具',
};

const platformLabels: Record<string, string> = {
  web: 'Web',
  windows: 'Windows',
  mac: 'macOS',
  linux: 'Linux',
  mobile: '移动端',
};

const pricingLabels: Record<string, string> = {
  free: '免费',
  freemium: '免费增值',
  paid: '付费',
};

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <article className="group border border-[var(--color-border)] rounded-xl p-6 hover:border-[var(--color-primary)]/50 hover:shadow-lg hover:shadow-[var(--color-primary)]/5 transition-all duration-300">
      <Link href={`/tools/${tool.slug}`} className="block">
        <div className="flex items-center gap-2 text-xs text-[var(--color-muted)] mb-3 flex-wrap">
          <span className="px-2.5 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-md font-medium">
            {categoryLabels[tool.category]}
          </span>
          {tool.platform && (
            <span className="px-2 py-0.5 border border-[var(--color-border)] rounded text-[var(--color-muted)]">
              {platformLabels[tool.platform]}
            </span>
          )}
          {tool.pricing && (
            <span className="text-[var(--color-accent)] font-medium">
              {pricingLabels[tool.pricing]}
            </span>
          )}
        </div>
        
        <h2 className="text-lg font-semibold mb-3 group-hover:text-[var(--color-primary)] transition-colors">
          {tool.title}
        </h2>
        
        <p className="text-sm text-[var(--color-muted)] line-clamp-2">
          {tool.description}
        </p>
        
        {tool.tags.length > 0 && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[var(--color-border)]/50">
            <TagIcon size={14} className="text-[var(--color-muted)] opacity-60" />
            <div className="flex gap-2 flex-wrap">
              {tool.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </Link>
    </article>
  );
}
