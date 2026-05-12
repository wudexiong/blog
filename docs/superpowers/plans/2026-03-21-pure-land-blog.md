# 净土博客平台实施计划

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个融合净土佛学理念与AI技术的个人技术博客平台，支持四种主题切换、MDX内容管理、全文搜索和SEO优化。

**Architecture:** 采用Next.js 14+ App Router架构，使用MDX管理内容，Tailwind CSS + CSS变量实现多主题系统，FlexSearch实现客户端全文搜索，全面SEO优化。

**Tech Stack:** Next.js 14+, TypeScript, Tailwind CSS, MDX, FlexSearch, pnpm, Vercel

---

## 文件结构

```
blog/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 根布局（主题Provider）
│   ├── page.tsx                  # 首页
│   ├── posts/
│   │   ├── page.tsx              # 文章列表
│   │   └── [slug]/page.tsx       # 文章详情
│   ├── tools/
│   │   ├── page.tsx              # 工具列表
│   │   └── [slug]/page.tsx       # 工具详情
│   ├── categories/[category]/page.tsx
│   ├── tags/[tag]/page.tsx
│   ├── archives/page.tsx
│   ├── search/page.tsx
│   ├── rss.xml/route.ts
│   └── sitemap.ts
├── components/
│   ├── ui/                       # 基础UI组件
│   ├── layout/                   # 布局组件
│   └── mdx/                      # MDX组件
├── content/
│   ├── posts/                    # 博客文章MDX
│   └── tools/                    # 工具介绍MDX
├── lib/
│   ├── mdx.ts                    # MDX处理
│   ├── seo.ts                    # SEO工具
│   ├── themes.ts                 # 主题配置
│   └── search.ts                 # 搜索功能
├── styles/
│   ├── globals.css               # 全局样式+主题变量
│   └── prose.css                 # 文章排版样式
└── public/
    └── images/
```

---

## Chunk 1: 项目初始化与基础配置

### Task 1: 创建Next.js项目

**Files:**
- Create: `package.json`
- Create: `next.config.js`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`

- [ ] **Step 1: 初始化Next.js项目**

Run: `pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-pnpm`

Expected: 项目初始化成功，生成基础文件结构

- [ ] **Step 2: 安装MDX相关依赖**

Run: `pnpm add @next/mdx @mdx-js/loader @mdx-js/react next-mdx-remote gray-matter reading-time`

Expected: 依赖安装成功

- [ ] **Step 3: 安装搜索和其他依赖**

Run: `pnpm add flexsearch clsx tailwind-merge`

Expected: 依赖安装成功

- [ ] **Step 4: 配置next.config.js支持MDX**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
}

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

module.exports = withMDX(nextConfig)
```

- [ ] **Step 5: 配置tailwind.config.ts**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
        mono: ['var(--font-mono)'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '75ch',
            color: 'var(--color-foreground)',
            a: { color: 'var(--color-accent)' },
            'a:hover': { color: 'var(--color-primary)' },
            code: { color: 'var(--color-accent)' },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
```

- [ ] **Step 6: 安装Tailwind typography插件**

Run: `pnpm add -D @tailwindcss/typography`

Expected: 插件安装成功

- [ ] **Step 7: 提交初始配置**

Run: `git add . && git commit -m "chore: initialize Next.js project with MDX and Tailwind"`

Expected: 提交成功

---

### Task 2: 创建主题系统

**Files:**
- Create: `styles/globals.css`
- Create: `lib/themes.ts`
- Create: `components/layout/ThemeSwitcher.tsx`
- Create: `components/layout/ThemeProvider.tsx`

- [ ] **Step 1: 创建全局样式和主题CSS变量**

```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-background: #FAF8F5;
    --color-foreground: #2C2C2C;
    --color-primary: #8B7355;
    --color-secondary: #A69480;
    --color-accent: #C9A962;
    --color-muted: #5C5C5C;
    --color-border: #E5E0D8;
    --font-sans: system-ui, -apple-system, sans-serif;
    --font-serif: Georgia, 'Times New Roman', serif;
    --font-mono: 'Fira Code', monospace;
  }

  [data-theme="zen"] {
    --color-background: #FAF8F5;
    --color-foreground: #2C2C2C;
    --color-primary: #8B7355;
    --color-secondary: #A69480;
    --color-accent: #C9A962;
    --color-muted: #5C5C5C;
    --color-border: #E5E0D8;
  }

  [data-theme="eye-care"] {
    --color-background: #FDF6E3;
    --color-foreground: #5C4B37;
    --color-primary: #7A6B55;
    --color-secondary: #8B7D68;
    --color-accent: #D4883C;
    --color-muted: #6B5D4A;
    --color-border: #E8DCC8;
  }

  [data-theme="dark"] {
    --color-background: #1A1A2E;
    --color-foreground: #E0E0E0;
    --color-primary: #A0A0A0;
    --color-secondary: #808080;
    --color-accent: #4ECDC4;
    --color-muted: #909090;
    --color-border: #3A3A50;
  }

  [data-theme="classic"] {
    --color-background: #F5F0E6;
    --color-foreground: #2C2C2C;
    --color-primary: #4A4A4A;
    --color-secondary: #6A6A6A;
    --color-accent: #C53D43;
    --color-muted: #5A5A5A;
    --color-border: #D8D3C9;
  }

  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
    font-family: var(--font-sans);
    transition: background-color 0.3s ease, color 0.3s ease;
  }
}
```

- [ ] **Step 2: 创建主题配置文件**

```typescript
// lib/themes.ts
export type ThemeName = 'zen' | 'eye-care' | 'dark' | 'classic';

export interface Theme {
  name: ThemeName;
  label: string;
  description: string;
  icon: string;
}

export const themes: Theme[] = [
  {
    name: 'zen',
    label: '禅意',
    description: '米白背景，檀木色调，宁静致远',
    icon: '🪷',
  },
  {
    name: 'eye-care',
    label: '护眼',
    description: '暖色调，低对比度，适合长时间阅读',
    icon: '🌙',
  },
  {
    name: 'dark',
    label: '深色',
    description: '深灰背景，柔和文字，夜间阅读',
    icon: '🌑',
  },
  {
    name: 'classic',
    label: '经典',
    description: '宣纸色，墨色文字，传统书卷气息',
    icon: '📜',
  },
];

export const defaultTheme: ThemeName = 'zen';
```

- [ ] **Step 3: 创建ThemeProvider组件**

```typescript
// components/layout/ThemeProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeName, defaultTheme } from '@/lib/themes';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as ThemeName | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', defaultTheme);
    }
  }, []);

  const handleSetTheme = (newTheme: ThemeName) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

- [ ] **Step 4: 创建ThemeSwitcher组件**

```typescript
// components/layout/ThemeSwitcher.tsx
'use client';

import { useTheme } from './ThemeProvider';
import { themes } from '@/lib/themes';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--color-border)] transition-colors"
        aria-label="切换主题"
      >
        <span className="text-lg">{themes.find(t => t.name === theme)?.icon}</span>
        <span className="hidden sm:inline text-sm">{themes.find(t => t.name === theme)?.label}</span>
      </button>
      
      <div className="absolute right-0 top-full mt-1 py-2 w-48 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        {themes.map((t) => (
          <button
            key={t.name}
            onClick={() => setTheme(t.name)}
            className={`w-full px-4 py-2 text-left hover:bg-[var(--color-border)] transition-colors flex items-center gap-3 ${
              theme === t.name ? 'bg-[var(--color-border)]' : ''
            }`}
          >
            <span className="text-lg">{t.icon}</span>
            <div>
              <div className="text-sm font-medium">{t.label}</div>
              <div className="text-xs text-[var(--color-muted)]">{t.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: 提交主题系统**

Run: `git add . && git commit -m "feat: add theme system with 4 themes (zen, eye-care, dark, classic)"`

Expected: 提交成功

---

### Task 3: 创建基础布局组件

**Files:**
- Create: `app/layout.tsx`
- Create: `components/layout/Header.tsx`
- Create: `components/layout/Footer.tsx`
- Create: `components/layout/Navigation.tsx`

- [ ] **Step 1: 创建Header组件**

```typescript
// components/layout/Header.tsx
import Link from 'next/link';
import { ThemeSwitcher } from './ThemeSwitcher';

const navItems = [
  { href: '/', label: '首页' },
  { href: '/posts', label: '文章' },
  { href: '/tools', label: '工具' },
  { href: '/archives', label: '归档' },
  { href: '/search', label: '搜索' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-serif font-bold text-[var(--color-primary)]">
          净土博客
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: 创建Footer组件**

```typescript
// components/layout/Footer.tsx
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-8 mt-auto">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="text-sm text-[var(--color-muted)]">
          融合净土佛学理念与AI技术的个人技术博客
        </p>
        <p className="text-xs text-[var(--color-muted)] mt-2">
          © {new Date().getFullYear()} 净土博客 · 技术学习中种下净土种子
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Link href="/rss.xml" className="text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)]">
            RSS
          </Link>
          <Link href="/sitemap.xml" className="text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)]">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: 创建根布局**

```typescript
// app/layout.tsx
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: '净土博客 - 融合净土佛学理念与AI技术',
    template: '%s | 净土博客',
  },
  description: '融合净土佛学理念与AI技术的个人技术博客，技术学习中种下净土种子',
  keywords: ['净土', '佛学', 'AI', '技术博客', 'Next.js'],
  authors: [{ name: '净土博客' }],
  creator: '净土博客',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: '净土博客',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: 提交布局组件**

Run: `git add . && git commit -m "feat: add Header, Footer and root layout"`

Expected: 提交成功

---

## Chunk 2: MDX内容系统

### Task 4: 创建MDX处理工具

**Files:**
- Create: `lib/mdx.ts`
- Create: `lib/utils.ts`
- Create: `content/posts/` 目录
- Create: `content/tools/` 目录

- [ ] **Step 1: 创建工具函数**

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fa5-]/g, '');
}
```

- [ ] **Step 2: 创建MDX处理工具**

```typescript
// lib/mdx.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/posts');
const toolsDirectory = path.join(process.cwd(), 'content/tools');

export interface PostFrontMatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: 'buddhism' | 'ai-tech' | 'fusion' | 'tools';
  tags: string[];
  image?: string;
  author?: string;
}

export interface Post extends PostFrontMatter {
  slug: string;
  content: string;
  readingTime: string;
}

export interface ToolFrontMatter {
  title: string;
  description: string;
  category: 'buddhism' | 'development' | 'productivity';
  tags: string[];
  link?: string;
  platform?: 'web' | 'windows' | 'mac' | 'linux' | 'mobile';
  pricing?: 'free' | 'freemium' | 'paid';
  image?: string;
}

export interface Tool extends ToolFrontMatter {
  slug: string;
  content: string;
}

function getMDXFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }
  return fs.readdirSync(directory).filter((file) => /\.mdx?$/.test(file));
}

export function getAllPosts(): Post[] {
  const files = getMDXFiles(postsDirectory);
  const posts = files.map((file) => {
    const filePath = path.join(postsDirectory, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const slug = file.replace(/\.mdx?$/, '');
    const stats = readingTime(content);

    return {
      ...(data as PostFrontMatter),
      slug,
      content,
      readingTime: stats.text,
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    ...(data as PostFrontMatter),
    slug,
    content,
    readingTime: stats.text,
  };
}

export function getAllTools(): Tool[] {
  const files = getMDXFiles(toolsDirectory);
  const tools = files.map((file) => {
    const filePath = path.join(toolsDirectory, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const slug = file.replace(/\.mdx?$/, '');

    return {
      ...(data as ToolFrontMatter),
      slug,
      content,
    };
  });

  return tools;
}

export function getToolBySlug(slug: string): Tool | null {
  const filePath = path.join(toolsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    ...(data as ToolFrontMatter),
    slug,
    content,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getPostsByTag(tag: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

export function getPostsByCategory(category: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.category === category);
}

export function getArchives(): Record<string, Post[]> {
  const posts = getAllPosts();
  const archives: Record<string, Post[]> = {};

  posts.forEach((post) => {
    const yearMonth = post.date.substring(0, 7);
    if (!archives[yearMonth]) {
      archives[yearMonth] = [];
    }
    archives[yearMonth].push(post);
  });

  return archives;
}
```

- [ ] **Step 3: 创建示例文章目录结构**

Run: `mkdir -p content/posts content/tools`

Expected: 目录创建成功

- [ ] **Step 4: 创建示例文章**

```markdown
<!-- content/posts/welcome.mdx -->
---
title: 欢迎来到净土博客
description: 这是一个融合净土佛学理念与AI技术的个人技术博客
date: 2024-01-01
category: fusion
tags: [博客, 净土, 技术]
author: 净土博客
---

# 欢迎来到净土博客

这是一个融合净土佛学理念与AI技术的个人技术博客。

## 我们的愿景

> 技术学习中种下净土种子

我们希望在这个博客中：

1. 分享净土佛学笔记
2. 讲解AI技术知识
3. 探讨理念融合
4. 分享实用工具

## 关于净土

净土宗是佛教的一个重要宗派，以念佛求生西方极乐世界为宗旨。

南无阿弥陀佛 🙏
```

- [ ] **Step 5: 提交MDX系统**

Run: `git add . && git commit -m "feat: add MDX content system with sample post"`

Expected: 提交成功

---

### Task 5: 创建首页和文章列表页

**Files:**
- Create: `app/page.tsx`
- Create: `app/posts/page.tsx`
- Create: `components/mdx/PostCard.tsx`

- [ ] **Step 1: 创建PostCard组件**

```typescript
// components/mdx/PostCard.tsx
import Link from 'next/link';
import { Post } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';

interface PostCardProps {
  post: Post;
}

const categoryLabels: Record<string, string> = {
  buddhism: '净土佛学',
  'ai-tech': 'AI技术',
  fusion: '理念融合',
  tools: '实用工具',
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="border border-[var(--color-border)] rounded-lg p-6 hover:border-[var(--color-accent)] transition-colors">
      <Link href={`/posts/${post.slug}`}>
        <div className="flex items-center gap-2 text-xs text-[var(--color-muted)] mb-2">
          <span className="px-2 py-0.5 bg-[var(--color-border)] rounded">
            {categoryLabels[post.category]}
          </span>
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h2 className="text-lg font-semibold mb-2 hover:text-[var(--color-accent)] transition-colors">
          {post.title}
        </h2>
        <p className="text-sm text-[var(--color-muted)] line-clamp-2">
          {post.description}
        </p>
        <div className="flex gap-2 mt-3">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-[var(--color-accent)]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
}
```

- [ ] **Step 2: 创建首页**

```typescript
// app/page.tsx
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { PostCard } from '@/components/mdx/PostCard';

export default function Home() {
  const posts = getAllPosts().slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold mb-4 text-[var(--color-primary)]">
          净土博客
        </h1>
        <p className="text-lg text-[var(--color-muted)] mb-2">
          融合净土佛学理念与AI技术
        </p>
        <p className="text-[var(--color-muted)]">
          技术学习中种下净土种子
        </p>
      </section>

      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">最新文章</h2>
          <Link
            href="/posts"
            className="text-sm text-[var(--color-accent)] hover:underline"
          >
            查看全部 →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-4 text-center">
        <div className="p-6 border border-[var(--color-border)] rounded-lg">
          <div className="text-3xl mb-2">🪷</div>
          <h3 className="font-semibold mb-1">净土佛学</h3>
          <p className="text-sm text-[var(--color-muted)]">经典讲解与修行心得</p>
        </div>
        <div className="p-6 border border-[var(--color-border)] rounded-lg">
          <div className="text-3xl mb-2">🤖</div>
          <h3 className="font-semibold mb-1">AI技术</h3>
          <p className="text-sm text-[var(--color-muted)]">前沿技术与实用教程</p>
        </div>
        <div className="p-6 border border-[var(--color-border)] rounded-lg">
          <div className="text-3xl mb-2">☯️</div>
          <h3 className="font-semibold mb-1">理念融合</h3>
          <p className="text-sm text-[var(--color-muted)]">技术与佛学思考</p>
        </div>
        <div className="p-6 border border-[var(--color-border)] rounded-lg">
          <div className="text-3xl mb-2">🛠️</div>
          <h3 className="font-semibold mb-1">实用工具</h3>
          <p className="text-sm text-[var(--color-muted)]">提升效率的工具推荐</p>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 3: 创建文章列表页**

```typescript
// app/posts/page.tsx
import { getAllPosts } from '@/lib/mdx';
import { PostCard } from '@/components/mdx/PostCard';

export const metadata = {
  title: '文章',
  description: '所有文章列表',
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">文章</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {posts.length === 0 && (
        <p className="text-center text-[var(--color-muted)] py-12">
          暂无文章
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 4: 提交首页和文章列表**

Run: `git add . && git commit -m "feat: add homepage and posts list page"`

Expected: 提交成功

---

### Task 6: 创建文章详情页

**Files:**
- Create: `app/posts/[slug]/page.tsx`
- Create: `components/mdx/MDXContent.tsx`

- [ ] **Step 1: 创建MDXContent组件**

```typescript
// components/mdx/MDXContent.tsx
import { MDXRemote } from 'next-mdx-remote/rsc';

const components = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl font-bold mb-6 mt-8">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-semibold mb-4 mt-6">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold mb-3 mt-4">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-4 leading-relaxed">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-[var(--color-accent)] pl-4 py-2 my-4 italic text-[var(--color-muted)]">
      {children}
    </blockquote>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-[var(--color-border)] px-1.5 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-[var(--color-border)] p-4 rounded-lg overflow-x-auto mb-4 text-sm">
      {children}
    </pre>
  ),
  a: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} className="text-[var(--color-accent)] hover:underline">
      {children}
    </a>
  ),
  img: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} className="rounded-lg my-4 max-w-full" />
  ),
};

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <MDXRemote source={content} components={components} />
    </div>
  );
}
```

- [ ] **Step 2: 创建文章详情页**

```typescript
// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { MDXContent } from '@/components/mdx/MDXContent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const categoryLabels: Record<string, string> = {
  buddhism: '净土佛学',
  'ai-tech': 'AI技术',
  fusion: '理念融合',
  tools: '实用工具',
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: '文章未找到' };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || '净土博客'],
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/posts"
        className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] mb-6 inline-block"
      >
        ← 返回文章列表
      </Link>

      <article>
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-[var(--color-muted)] mb-4">
            <span className="px-2 py-0.5 bg-[var(--color-border)] rounded">
              {categoryLabels[post.category]}
            </span>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-lg text-[var(--color-muted)]">{post.description}</p>
        </header>

        <MDXContent content={post.content} />

        <footer className="mt-8 pt-8 border-t border-[var(--color-border)]">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="px-3 py-1 text-sm bg-[var(--color-border)] rounded-full hover:bg-[var(--color-accent)] hover:text-white transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </footer>
      </article>
    </div>
  );
}
```

- [ ] **Step 3: 提交文章详情页**

Run: `git add . && git commit -m "feat: add post detail page with MDX rendering"`

Expected: 提交成功

---

## Chunk 3: 工具分享与搜索功能

### Task 7: 创建工具分享页面

**Files:**
- Create: `app/tools/page.tsx`
- Create: `app/tools/[slug]/page.tsx`
- Create: `components/mdx/ToolCard.tsx`
- Create: `content/tools/nianfo-counter.mdx`

- [ ] **Step 1: 创建ToolCard组件**

```typescript
// components/mdx/ToolCard.tsx
import Link from 'next/link';
import { Tool } from '@/lib/mdx';

interface ToolCardProps {
  tool: Tool;
}

const categoryLabels: Record<string, string> = {
  buddhism: '佛学工具',
  development: '开发工具',
  productivity: '效率工具',
};

const platformLabels: Record<string, string> = {
  web: '🌐 Web',
  windows: '🪟 Windows',
  mac: '🍎 macOS',
  linux: '🐧 Linux',
  mobile: '📱 移动端',
};

const pricingLabels: Record<string, string> = {
  free: '免费',
  freemium: '免费增值',
  paid: '付费',
};

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <article className="border border-[var(--color-border)] rounded-lg p-6 hover:border-[var(--color-accent)] transition-colors">
      <Link href={`/tools/${tool.slug}`}>
        <div className="flex items-center gap-2 text-xs text-[var(--color-muted)] mb-2">
          <span className="px-2 py-0.5 bg-[var(--color-border)] rounded">
            {categoryLabels[tool.category]}
          </span>
          {tool.platform && (
            <span>{platformLabels[tool.platform]}</span>
          )}
          {tool.pricing && (
            <span className="text-[var(--color-accent)]">
              {pricingLabels[tool.pricing]}
            </span>
          )}
        </div>
        <h2 className="text-lg font-semibold mb-2 hover:text-[var(--color-accent)] transition-colors">
          {tool.title}
        </h2>
        <p className="text-sm text-[var(--color-muted)] line-clamp-2">
          {tool.description}
        </p>
        <div className="flex gap-2 mt-3">
          {tool.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-[var(--color-accent)]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
}
```

- [ ] **Step 2: 创建工具列表页**

```typescript
// app/tools/page.tsx
import { getAllTools } from '@/lib/mdx';
import { ToolCard } from '@/components/mdx/ToolCard';

export const metadata = {
  title: '工具分享',
  description: '实用工具推荐与分享',
};

export default function ToolsPage() {
  const tools = getAllTools();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">工具分享</h1>
      <p className="text-[var(--color-muted)] mb-8">
        为净土同修和程序员推荐的实用工具
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
      {tools.length === 0 && (
        <p className="text-center text-[var(--color-muted)] py-12">
          暂无工具
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 3: 创建工具详情页**

```typescript
// app/tools/[slug]/page.tsx
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
```

- [ ] **Step 4: 创建示例工具文章**

```markdown
<!-- content/tools/nianfo-counter.mdx -->
---
title: 念佛计数器
description: 简洁的在线念佛计数工具，帮助同修记录每日念佛数量
category: buddhism
tags: [念佛, 计数器, 佛学工具]
link: https://example.com/nianfo
platform: web
pricing: free
---

# 念佛计数器

一个简洁的在线念佛计数工具，帮助净土同修记录每日念佛数量。

## 功能特点

- **简洁界面**：无干扰的计数界面
- **数据保存**：自动保存计数记录
- **目标设定**：可设定每日念佛目标
- **历史统计**：查看历史念佛记录

## 使用方法

1. 打开工具页面
2. 点击计数按钮或按空格键计数
3. 数据会自动保存到本地

## 使用建议

建议每日设定一个固定的念佛数量目标，如：

- 初学者：每日1000声
- 进阶者：每日3000声
- 精进者：每日10000声

> 一声阿弥陀佛，消八十亿劫生死之罪。

南无阿弥陀佛 🙏
```

- [ ] **Step 5: 提交工具分享功能**

Run: `git add . && git commit -m "feat: add tools sharing pages with sample tool"`

Expected: 提交成功

---

### Task 8: 创建搜索功能

**Files:**
- Create: `lib/search.ts`
- Create: `app/search/page.tsx`
- Create: `components/ui/SearchBox.tsx`

- [ ] **Step 1: 创建搜索工具函数**

```typescript
// lib/search.ts
import FlexSearch from 'flexsearch';
import { getAllPosts, getAllTools, Post, Tool } from './mdx';

interface SearchDocument {
  id: string;
  type: 'post' | 'tool';
  title: string;
  description: string;
  content: string;
  tags: string[];
  slug: string;
}

let searchIndex: FlexSearch.Index | null = null;
let documents: SearchDocument[] = [];

function initSearchIndex() {
  if (searchIndex) return;

  searchIndex = new FlexSearch.Index({
    tokenize: 'forward',
    cache: 100,
  });

  const posts = getAllPosts();
  const tools = getAllTools();

  documents = [
    ...posts.map((post: Post) => ({
      id: `post-${post.slug}`,
      type: 'post' as const,
      title: post.title,
      description: post.description,
      content: post.content,
      tags: post.tags,
      slug: post.slug,
    })),
    ...tools.map((tool: Tool) => ({
      id: `tool-${tool.slug}`,
      type: 'tool' as const,
      title: tool.title,
      description: tool.description,
      content: tool.content,
      tags: tool.tags,
      slug: tool.slug,
    })),
  ];

  documents.forEach((doc, index) => {
    searchIndex!.add(index, `${doc.title} ${doc.description} ${doc.tags.join(' ')} ${doc.content}`);
  });
}

export function search(query: string): SearchDocument[] {
  initSearchIndex();

  if (!query.trim()) return [];

  const results = searchIndex!.search(query, 10) as number[];
  return results.map((index) => documents[index]);
}

export function getSearchData() {
  initSearchIndex();
  return documents;
}
```

- [ ] **Step 2: 创建SearchBox组件**

```typescript
// components/ui/SearchBox.tsx
'use client';

import { useState, useEffect } from 'react';
import { search } from '@/lib/search';

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

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query.trim()) {
        const results = search(query);
        onResults(results);
      } else {
        onResults([]);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, onResults]);

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
```

- [ ] **Step 3: 创建搜索页面**

```typescript
// app/search/page.tsx
'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { SearchBox } from '@/components/ui/SearchBox';

interface SearchResult {
  id: string;
  type: 'post' | 'tool';
  title: string;
  description: string;
  slug: string;
}

export default function SearchPage() {
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleResults = useCallback((newResults: SearchResult[]) => {
    setResults(newResults);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">搜索</h1>
      
      <SearchBox onResults={handleResults} />

      <div className="mt-8">
        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((result) => (
              <Link
                key={result.id}
                href={`/${result.type === 'post' ? 'posts' : 'tools'}/${result.slug}`}
                className="block p-4 border border-[var(--color-border)] rounded-lg hover:border-[var(--color-accent)] transition-colors"
              >
                <div className="flex items-center gap-2 text-xs text-[var(--color-muted)] mb-1">
                  <span className="px-2 py-0.5 bg-[var(--color-border)] rounded">
                    {result.type === 'post' ? '文章' : '工具'}
                  </span>
                </div>
                <h2 className="text-lg font-semibold mb-1">{result.title}</h2>
                <p className="text-sm text-[var(--color-muted)] line-clamp-2">
                  {result.description}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-[var(--color-muted)] py-12">
            输入关键词开始搜索
          </p>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: 提交搜索功能**

Run: `git add . && git commit -m "feat: add full-text search with FlexSearch"`

Expected: 提交成功

---

## Chunk 4: 分类、标签、归档与SEO

### Task 9: 创建分类和标签页面

**Files:**
- Create: `app/categories/[category]/page.tsx`
- Create: `app/tags/[tag]/page.tsx`
- Create: `app/archives/page.tsx`

- [ ] **Step 1: 创建分类页面**

```typescript
// app/categories/[category]/page.tsx
import { notFound } from 'next/navigation';
import { getPostsByCategory } from '@/lib/mdx';
import { PostCard } from '@/components/mdx/PostCard';

interface PageProps {
  params: Promise<{ category: string }>;
}

const categoryLabels: Record<string, string> = {
  buddhism: '净土佛学',
  'ai-tech': 'AI技术',
  fusion: '理念融合',
  tools: '实用工具',
};

export async function generateStaticParams() {
  return Object.keys(categoryLabels).map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const label = categoryLabels[category];
  if (!label) return { title: '分类未找到' };

  return {
    title: `${label} - 分类`,
    description: `${label}相关的所有文章`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const label = categoryLabels[category];

  if (!label) {
    notFound();
  }

  const posts = getPostsByCategory(category);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{label}</h1>
      <p className="text-[var(--color-muted)] mb-8">
        共 {posts.length} 篇文章
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {posts.length === 0 && (
        <p className="text-center text-[var(--color-muted)] py-12">
          暂无文章
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: 创建标签页面**

```typescript
// app/tags/[tag]/page.tsx`
import { getPostsByTag, getAllTags } from '@/lib/mdx';
import { PostCard } from '@/components/mdx/PostCard';

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: PageProps) {
  const { tag } = await params;
  return {
    title: `#${tag} - 标签`,
    description: `标签 #${tag} 相关的所有文章`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">#{tag}</h1>
      <p className="text-[var(--color-muted)] mb-8">
        共 {posts.length} 篇文章
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {posts.length === 0 && (
        <p className="text-center text-[var(--color-muted)] py-12">
          暂无文章
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 3: 创建归档页面**

```typescript
// app/archives/page.tsx
import Link from 'next/link';
import { getArchives } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';

export const metadata = {
  title: '归档',
  description: '所有文章按时间归档',
};

export default function ArchivesPage() {
  const archives = getArchives();
  const sortedArchives = Object.entries(archives).sort(
    ([a], [b]) => b.localeCompare(a)
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">归档</h1>

      {sortedArchives.map(([yearMonth, posts]) => {
        const [year, month] = yearMonth.split('-');
        const monthNames = [
          '一月', '二月', '三月', '四月', '五月', '六月',
          '七月', '八月', '九月', '十月', '十一月', '十二月',
        ];

        return (
          <div key={yearMonth} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-primary)]">
              {year}年 {monthNames[parseInt(month, 10) - 1]}
              <span className="text-sm text-[var(--color-muted)] ml-2">
                ({posts.length}篇)
              </span>
            </h2>
            <ul className="space-y-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="flex items-start gap-4 group"
                  >
                    <span className="text-sm text-[var(--color-muted)] shrink-0">
                      {formatDate(post.date)}
                    </span>
                    <span className="group-hover:text-[var(--color-accent)] transition-colors">
                      {post.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      {sortedArchives.length === 0 && (
        <p className="text-center text-[var(--color-muted)] py-12">
          暂无文章
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 4: 提交分类标签归档页面**

Run: `git add . && git commit -m "feat: add categories, tags and archives pages"`

Expected: 提交成功

---

### Task 10: 创建SEO相关文件

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `app/rss.xml/route.ts`
- Create: `lib/seo.ts`

- [ ] **Step 1: 创建SEO工具函数**

```typescript
// lib/seo.ts
import { Metadata } from 'next';

export const siteConfig = {
  name: '净土博客',
  description: '融合净土佛学理念与AI技术的个人技术博客',
  url: 'https://pureland.blog',
  ogImage: '/og-image.png',
  links: {
    github: 'https://github.com',
  },
};

export function generateSEO({
  title,
  description,
  image,
  ...rest
}: {
  title: string;
  description?: string;
  image?: string;
  [key: string]: unknown;
}): Metadata {
  return {
    title,
    description: description || siteConfig.description,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description: description || siteConfig.description,
      images: [{ url: image || siteConfig.ogImage }],
      ...rest,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteConfig.name}`,
      description: description || siteConfig.description,
      images: [image || siteConfig.ogImage],
    },
    ...rest,
  };
}
```

- [ ] **Step 2: 创建sitemap**

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllPosts, getAllTools } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pureland.blog';
  const posts = getAllPosts();
  const tools = getAllTools();

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.updated || post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const toolUrls = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/archives`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...postUrls,
    ...toolUrls,
  ];
}
```

- [ ] **Step 3: 创建robots.txt**

```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/private/'],
    },
    sitemap: 'https://pureland.blog/sitemap.xml',
  };
}
```

- [ ] **Step 4: 创建RSS订阅**

```typescript
// app/rss.xml/route.ts
import { getAllPosts } from '@/lib/mdx';

export async function GET() {
  const posts = getAllPosts();
  const baseUrl = 'https://pureland.blog';

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>净土博客</title>
    <link>${baseUrl}</link>
    <description>融合净土佛学理念与AI技术的个人技术博客</description>
    <language>zh-CN</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .slice(0, 20)
      .map(
        (post) => `
    <item>
      <title>${post.title}</title>
      <link>${baseUrl}/posts/${post.slug}</link>
      <description>${post.description}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${baseUrl}/posts/${post.slug}</guid>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
```

- [ ] **Step 5: 提交SEO文件**

Run: `git add . && git commit -m "feat: add sitemap, robots.txt and RSS feed"`

Expected: 提交成功

---

## Chunk 5: 测试与部署

### Task 11: 创建404页面和错误处理

**Files:**
- Create: `app/not-found.tsx`
- Create: `app/error.tsx`

- [ ] **Step 1: 创建404页面**

```typescript
// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-4">🪷</div>
      <h1 className="text-4xl font-bold mb-4">页面未找到</h1>
      <p className="text-[var(--color-muted)] mb-8">
        您访问的页面不存在，可能已被移动或删除。
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-[var(--color-accent)] text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        返回首页
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: 创建错误页面**

```typescript
// app/error.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-4">⚠️</div>
      <h1 className="text-4xl font-bold mb-4">出错了</h1>
      <p className="text-[var(--color-muted)] mb-8">
        抱歉，页面加载时发生了错误。
      </p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={reset}
          className="px-6 py-3 bg-[var(--color-accent)] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          重试
        </button>
        <Link
          href="/"
          className="px-6 py-3 border border-[var(--color-border)] rounded-lg hover:border-[var(--color-accent)] transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 提交错误处理页面**

Run: `git add . && git commit -m "feat: add 404 and error pages"`

Expected: 提交成功

---

### Task 12: 最终验证与部署准备

**Files:**
- Modify: `package.json` (添加scripts)
- Create: `README.md`

- [ ] **Step 1: 确保package.json有正确的scripts**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

- [ ] **Step 2: 运行构建测试**

Run: `pnpm build`

Expected: 构建成功，无错误

- [ ] **Step 3: 运行lint检查**

Run: `pnpm lint`

Expected: 无lint错误

- [ ] **Step 4: 启动开发服务器验证**

Run: `pnpm dev`

Expected: 开发服务器启动成功，可在浏览器访问

- [ ] **Step 5: 最终提交**

Run: `git add . && git commit -m "chore: final cleanup and deployment preparation"`

Expected: 提交成功

---

## 验收清单

- [ ] 所有页面正常访问
- [ ] 四种主题正常切换（禅意、护眼、深色、经典）
- [ ] 文章列表和详情页正常显示
- [ ] 工具列表和详情页正常显示
- [ ] 搜索功能正常工作
- [ ] 分类、标签、归档页面正常
- [ ] RSS订阅正常
- [ ] sitemap.xml正常生成
- [ ] 响应式设计正常
- [ ] 构建无错误
- [ ] Lint检查通过

---

**Plan complete and saved to `docs/superpowers/plans/2026-03-21-pure-land-blog.md`. Ready to execute?**
