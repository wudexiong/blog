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

export function getRecentPosts(limit: number = 6): Post[] {
  return getAllPosts().slice(0, limit);
}

export function getPostBySlug(slug: string): Post | null {
  const extensions = ['.mdx', '.md'];
  
  for (const ext of extensions) {
    const filePath = path.join(postsDirectory, `${slug}${ext}`);
    if (fs.existsSync(filePath)) {
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
  }
  
  return null;
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
  const extensions = ['.mdx', '.md'];
  
  for (const ext of extensions) {
    const filePath = path.join(toolsDirectory, `${slug}${ext}`);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      return {
        ...(data as ToolFrontMatter),
        slug,
        content,
      };
    }
  }
  
  return null;
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
    const dateStr = typeof post.date === 'string' ? post.date : new Date(post.date).toISOString();
    const yearMonth = dateStr.substring(0, 7);
    if (!archives[yearMonth]) {
      archives[yearMonth] = [];
    }
    archives[yearMonth].push(post);
  });

  return archives;
}
