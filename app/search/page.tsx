'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { SearchBox } from '@/components/ui/SearchBox';
import { SearchIcon, FileIcon, ToolIcon } from '@/components/ui/Icons';

interface SearchResult {
  id: string;
  type: 'post' | 'tool';
  title: string;
  description: string;
  slug: string;
}

export default function SearchPage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleResults = useCallback((newResults: SearchResult[]) => {
    setResults(newResults);
    setHasSearched(true);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
          <SearchIcon size={24} className="text-[var(--color-primary)]" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">搜索</h1>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            搜索文章和工具
          </p>
        </div>
      </div>
      
      <SearchBox onResults={handleResults} />

      <div className="mt-8">
        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((result) => {
              const Icon = result.type === 'post' ? FileIcon : ToolIcon;
              return (
                <Link
                  key={result.id}
                  href={`/${result.type === 'post' ? 'posts' : 'tools'}/${result.slug}`}
                  className="group flex items-start gap-4 p-5 border border-[var(--color-border)] rounded-xl hover:border-[var(--color-primary)]/50 hover:shadow-lg hover:shadow-[var(--color-primary)]/5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={20} className="text-[var(--color-primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs text-[var(--color-muted)] mb-2">
                      <span className="px-2 py-0.5 bg-[var(--color-border)] rounded">
                        {result.type === 'post' ? '文章' : '工具'}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                      {result.title}
                    </h2>
                    <p className="text-sm text-[var(--color-muted)] line-clamp-2">
                      {result.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : hasSearched ? (
          <div className="text-center py-16 border border-dashed border-[var(--color-border)] rounded-xl">
            <p className="text-[var(--color-muted)]">
              未找到相关内容
            </p>
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-[var(--color-border)] rounded-xl">
            <p className="text-[var(--color-muted)]">
              输入关键词开始搜索
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
