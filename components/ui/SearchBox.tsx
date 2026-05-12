'use client';

import { useState, useEffect, useCallback } from 'react';

interface SearchResult {
  id: string;
  type: 'post' | 'tool';
  title: string;
  description: string;
  slug: string;
}

interface SearchBoxProps {
  onResults: (results: SearchResult[]) => void;
}

export function SearchBox({ onResults }: SearchBoxProps) {
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(async () => {
    if (query.trim()) {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const results = await response.json();
        onResults(results);
      } catch (error) {
        console.error('Search failed:', error);
        onResults([]);
      }
    } else {
      onResults([]);
    }
  }, [query, onResults]);

  useEffect(() => {
    const debounce = setTimeout(handleSearch, 300);
    return () => clearTimeout(debounce);
  }, [handleSearch]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索文章和工具..."
        className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
        >
          ✕
        </button>
      )}
    </div>
  );
}
