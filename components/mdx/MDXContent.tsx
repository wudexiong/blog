import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { ReactNode } from 'react';

interface ComponentProps {
  children?: ReactNode;
  href?: string;
  src?: string;
  alt?: string;
}

const components = {
  h1: (props: ComponentProps) => (
    <h1 className="text-3xl font-bold mb-6 mt-8">{props.children}</h1>
  ),
  h2: (props: ComponentProps) => (
    <h2 className="text-2xl font-semibold mb-4 mt-6">{props.children}</h2>
  ),
  h3: (props: ComponentProps) => (
    <h3 className="text-xl font-semibold mb-3 mt-4">{props.children}</h3>
  ),
  p: (props: ComponentProps) => (
    <p className="mb-4 leading-relaxed">{props.children}</p>
  ),
  ul: (props: ComponentProps) => (
    <ul className="list-disc list-inside mb-4 space-y-2">{props.children}</ul>
  ),
  ol: (props: ComponentProps) => (
    <ol className="list-decimal list-inside mb-4 space-y-2">{props.children}</ol>
  ),
  li: (props: ComponentProps) => (
    <li className="leading-relaxed">{props.children}</li>
  ),
  blockquote: (props: ComponentProps) => (
    <blockquote className="border-l-4 border-[var(--color-accent)] pl-4 py-2 my-4 italic text-[var(--color-muted)]">
      {props.children}
    </blockquote>
  ),
  code: (props: ComponentProps) => (
    <code className="bg-[var(--color-border)] px-1.5 py-0.5 rounded text-sm font-mono">
      {props.children}
    </code>
  ),
  pre: (props: ComponentProps) => (
    <pre className="bg-[var(--color-border)] p-4 rounded-lg overflow-x-auto mb-4 text-sm">
      {props.children}
    </pre>
  ),
  a: (props: ComponentProps) => (
    <a href={props.href} className="text-[var(--color-accent)] hover:underline">
      {props.children}
    </a>
  ),
  img: (props: ComponentProps) => (
    <Image 
      src={props.src || ''} 
      alt={props.alt || ''} 
      className="rounded-lg my-4 max-w-full" 
      width={800}
      height={450}
      style={{ width: 'auto', height: 'auto' }}
    />
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
