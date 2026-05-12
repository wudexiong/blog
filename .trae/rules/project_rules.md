# 净土博客平台项目规则

## 核心原则

1. **技能优先**：每个开发步骤必须使用相关专业技能，没有技能就搜索或创建技能
2. **子代理协作**：合理使用子代理处理独立任务，提高开发效率
3. **验证驱动**：每个功能完成后必须验证，确保代码质量

## 技术栈

- **框架**: Next.js 14+ (App Router)
- **内容**: MDX + Frontmatter
- **样式**: Tailwind CSS + CSS变量主题系统
- **搜索**: FlexSearch
- **部署**: Vercel
- **语言**: TypeScript
- **包管理器**: pnpm

## 开发流程

### 1. 项目初始化
- 使用 `fullstack-developer` 技能创建Next.js项目
- 配置TypeScript、Tailwind CSS、ESLint

### 2. 主题系统开发
- 使用 `ui-ux-pro-max` 技能设计主题系统
- 使用 `frontend-design` 技能实现主题切换

### 3. 内容系统开发
- 使用 `fullstack-developer` 技能实现MDX内容处理
- 使用 `writing-docs` 技能编写内容模板

### 4. SEO优化
- 使用 `seo-audit` 技能进行SEO检查
- 实现元数据、结构化数据、sitemap

### 5. 测试验证
- 使用 `webapp-testing` 技能进行功能测试
- 使用 `verification-before-completion` 技能验证完成

## 主题配置

### 四种主题
1. **禅意主题（默认）**: 米白背景 + 檀木色调 + 金色点缀
2. **护眼主题**: 暖色调 + 低对比度
3. **深色主题**: 深灰背景 + 柔和文字
4. **经典主题**: 宣纸色 + 墨色文字

## 内容板块

1. 净土佛学笔记
2. AI技术讲解
3. 净土理念与技术融合
4. 实用工具分享

## 功能清单

### 包含功能
- 文章发布与展示
- 分类与标签系统
- 全文搜索
- 归档页面
- 工具分享平台
- 多主题切换
- 响应式设计
- SEO优化
- 结构化数据
- RSS订阅

### 不包含功能
- 用户注册/登录
- 评论系统
- 点赞/收藏
- 后台管理

## 代码规范

- 使用TypeScript严格模式
- 组件使用函数式组件 + Hooks
- 样式使用Tailwind CSS + CSS变量
- 内容使用MDX格式
- 所有代码必须通过ESLint检查
