# 净土博客平台设计文档

## 项目概述

### 项目名称
净土博客平台 (Pure Land Blog)

### 项目愿景
融合净土佛学理念与AI技术的个人技术博客，实现"技术学习中种下净土种子"的核心目标。

### 目标受众
1. **程序员群体**：提供AI技术讲解、实用工具分享
2. **净土同修**：提供净土佛学笔记、实用技术工具

---

## 技术架构

### 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js App Router                    │
├─────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │ 首页    │  │ 文章页  │  │ 工具页  │  │ 分类页  │    │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐   │
│  │              内容层 (MDX + Frontmatter)          │   │
│  │  /content/posts/*.mdx  /content/tools/*.mdx     │   │
│  └─────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐   │
│  │              样式层 (Tailwind + 主题系统)         │   │
│  │  禅意主题 / 护眼主题 / 深色主题 / 经典主题        │   │
│  └─────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐   │
│  │              SEO层 (元数据 + 结构化数据)          │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                      ↓
              ┌──────────────┐
              │   Vercel     │
              │  (部署平台)   │
              └──────────────┘
```

### 技术栈

| 层级 | 技术选型 | 说明 |
|------|---------|------|
| 框架 | Next.js 14+ | App Router，支持SSG/SSR |
| 内容 | MDX + Frontmatter | Markdown + React组件 |
| 样式 | Tailwind CSS + CSS变量 | 原子化CSS + 主题系统 |
| 搜索 | FlexSearch | 客户端全文搜索 |
| 部署 | Vercel | 自动部署 + CDN |
| 语言 | TypeScript | 类型安全 |
| 包管理 | pnpm | 高效、节省磁盘空间 |

---

## 目录结构

```
blog/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # 根布局
│   ├── page.tsx              # 首页
│   ├── posts/                # 文章相关页面
│   │   ├── page.tsx          # 文章列表
│   │   └── [slug]/page.tsx   # 文章详情
│   ├── tools/                # 工具分享页面
│   │   ├── page.tsx          # 工具列表
│   │   └── [slug]/page.tsx   # 工具详情
│   ├── categories/           # 分类页面
│   │   └── [category]/page.tsx
│   ├── tags/                 # 标签页面
│   │   └── [tag]/page.tsx
│   ├── archives/             # 归档页面
│   │   └── page.tsx
│   ├── search/               # 搜索页面
│   │   └── page.tsx
│   ├── rss.xml/              # RSS订阅
│   │   └── route.ts
│   └── api/                  # API路由
│       └── search/route.ts
├── components/               # React组件
│   ├── ui/                   # 基础UI组件
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── ...
│   ├── layout/               # 布局组件
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── ThemeSwitcher.tsx
│   └── mdx/                  # MDX自定义组件
│       ├── PostCard.tsx
│       ├── ToolCard.tsx
│       └── ...
├── content/                  # MDX内容文件
│   ├── posts/                # 博客文章
│   │   ├── buddhism/         # 净土佛学笔记
│   │   ├── ai-tech/          # AI技术讲解
│   │   ├── fusion/           # 理念融合
│   │   └── *.mdx
│   └── tools/                # 工具介绍
│       └── *.mdx
├── lib/                      # 工具函数
│   ├── mdx.ts                # MDX处理
│   ├── seo.ts                # SEO工具
│   ├── themes.ts             # 主题配置
│   ├── search.ts             # 搜索功能
│   └── utils.ts              # 通用工具
├── styles/                   # 样式文件
│   ├── globals.css           # 全局样式
│   └── themes/               # 主题CSS变量
│       ├── zen.css           # 禅意主题
│       ├── eye-care.css      # 护眼主题
│       ├── dark.css          # 深色主题
│       └── classic.css       # 经典主题
├── public/                   # 静态资源
│   ├── images/               # 图片资源
│   ├── fonts/                # 字体文件
│   └── favicon.ico
├── .trae/                    # 项目规则
│   └── rules/
│       └── project_rules.md
├── next.config.js            # Next.js配置
├── tailwind.config.js        # Tailwind配置
├── tsconfig.json             # TypeScript配置
└── package.json              # 项目依赖
```

---

## 主题系统设计

### 主题概述

| 主题名称 | 背景 | 主色调 | 点缀色 | 适用场景 |
|---------|------|--------|--------|---------|
| 禅意主题（默认） | 米白 #FAF8F5 | 檀木 #8B7355 | 金色 #C9A962 | 日常阅读 |
| 护眼主题 | 暖黄 #FDF6E3 | 深褐 #5C4B37 | 橙色 #D4883C | 长时间阅读 |
| 深色主题 | 深灰 #1A1A2E | 浅灰 #E0E0E0 | 青色 #4ECDC4 | 夜间阅读 |
| 经典主题 | 宣纸 #F5F0E6 | 墨色 #2C2C2C | 朱红 #C53D43 | 传统风格 |

### 主题实现

使用CSS变量实现主题切换：

```css
:root {
  --bg-primary: #FAF8F5;
  --bg-secondary: #F5F2ED;
  --text-primary: #2C2C2C;
  --text-secondary: #5C5C5C;
  --accent: #C9A962;
  --border: #E5E0D8;
}

[data-theme="eye-care"] {
  --bg-primary: #FDF6E3;
  --bg-secondary: #F7F0DC;
  --text-primary: #5C4B37;
  --text-secondary: #7A6B55;
  --accent: #D4883C;
  --border: #E8DCC8;
}

[data-theme="dark"] {
  --bg-primary: #1A1A2E;
  --bg-secondary: #252540;
  --text-primary: #E0E0E0;
  --text-secondary: #A0A0A0;
  --accent: #4ECDC4;
  --border: #3A3A50;
}

[data-theme="classic"] {
  --bg-primary: #F5F0E6;
  --bg-secondary: #EBE6DC;
  --text-primary: #2C2C2C;
  --text-secondary: #4A4A4A;
  --accent: #C53D43;
  --border: #D8D3C9;
}
```

---

## 内容架构

### 四大核心板块

#### 1. 净土佛学笔记
- 净土经典讲解（阿弥陀经、无量寿经、观无量寿经）
- 念佛修行心得
- 祖师语录学习（印光大师、蕅益大师等）
- 净土问答

#### 2. AI技术讲解
- AI基础概念（机器学习、深度学习、大语言模型）
- 实用工具教程（ChatGPT、Claude、Midjourney等）
- 技术趋势分析
- AI应用案例

#### 3. 净土理念与技术融合
- AI与佛学思考
- 技术修行心得
- 正念与编程
- 数字时代的修行

#### 4. 实用工具分享
- 念佛计数器
- 佛学资源导航
- 开发工具推荐
- 效率工具分享

### MDX Frontmatter 规范

#### 文章 Frontmatter

```yaml
---
title: 文章标题
description: 文章描述（用于SEO）
date: 2024-01-01
updated: 2024-01-02
category: buddhism | ai-tech | fusion | tools
tags: [标签1, 标签2]
image: /images/cover.jpg
author: 作者名
readingTime: 5分钟
---
```

#### 工具 Frontmatter

```yaml
---
title: 工具名称
description: 工具描述
category: buddhism | development | productivity
tags: [标签1, 标签2]
link: https://example.com
platform: web | windows | mac | linux | mobile
pricing: free | freemium | paid
image: /images/tool.jpg
---
```

---

## 功能设计

### 包含功能

#### 1. 文章系统
- 文章列表页（分页、筛选）
- 文章详情页（MDX渲染）
- 分类页面
- 标签页面
- 归档页面

#### 2. 搜索功能
- 全文搜索（FlexSearch）
- 搜索结果高亮
- 搜索历史

#### 3. 工具分享
- 工具列表页
- 工具详情页
- 分类筛选

#### 4. 主题系统
- 四种主题切换
- 主题持久化（localStorage）
- 系统主题跟随

#### 5. SEO优化
- 元数据优化
- 结构化数据（JSON-LD）
- sitemap.xml
- robots.txt
- RSS订阅

#### 6. 响应式设计
- 移动端适配
- 平板适配
- 桌面端适配

### 不包含功能
- 用户注册/登录
- 评论系统
- 点赞/收藏
- 后台管理

---

## SEO策略

### 元数据优化
- 每个页面独立的title、description、keywords
- Open Graph标签（社交分享）
- Twitter Card标签

### 结构化数据
- WebSite结构化数据
- Article结构化数据
- BreadcrumbList结构化数据

### 技术SEO
- 语义化HTML
- 图片alt属性
- 内部链接优化
- 页面加载速度优化

---

## 开发里程碑

### 阶段一：项目初始化
- 创建Next.js项目
- 配置TypeScript、Tailwind CSS
- 配置ESLint、Prettier

### 阶段二：基础架构
- 实现主题系统
- 实现MDX内容处理
- 创建基础组件

### 阶段三：核心功能
- 实现文章系统
- 实现工具分享
- 实现搜索功能

### 阶段四：SEO优化
- 实现元数据
- 实现结构化数据
- 生成sitemap和RSS

### 阶段五：测试部署
- 功能测试
- 性能优化
- Vercel部署

---

## 验收标准

1. 所有页面正常访问
2. 四种主题正常切换
3. 搜索功能正常工作
4. SEO检查通过
5. 响应式设计正常
6. 性能指标达标（Lighthouse > 90）
