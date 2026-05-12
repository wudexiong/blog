import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, getAllTools } from '@/lib/mdx';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';

  if (!query.trim()) {
    return NextResponse.json([]);
  }

  const posts = getAllPosts();
  const tools = getAllTools();

  const documents = [
    ...posts.map((post) => ({
      id: `post-${post.slug}`,
      type: 'post' as const,
      title: post.title,
      description: post.description,
      tags: post.tags,
      slug: post.slug,
    })),
    ...tools.map((tool) => ({
      id: `tool-${tool.slug}`,
      type: 'tool' as const,
      title: tool.title,
      description: tool.description,
      tags: tool.tags,
      slug: tool.slug,
    })),
  ];

  const lowerQuery = query.toLowerCase();
  const results = documents.filter((doc) => 
    doc.title.toLowerCase().includes(lowerQuery) ||
    doc.description.toLowerCase().includes(lowerQuery) ||
    doc.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  ).slice(0, 10);

  return NextResponse.json(results);
}
