import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Calendar, User, ArrowLeft } from 'lucide-react';
import { blogs } from '@/lib/data/mock';
import { asset } from '@/lib/utils';
import { sanitizeHtml } from '@/lib/utils/sanitize';

export const dynamicParams = false;

export async function generateStaticParams() {
  // BCare has no published articles yet. `output: export` still requires at least one
  // param, so emit a placeholder that renders notFound() until real posts exist.
  if (blogs.length === 0) return [{ slug: '__placeholder__' }];
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) notFound();

  return (
    <div className="bg-background min-h-screen pb-16">
      <div className="border-b border-outline-variant/30 py-4 bg-white">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop flex items-center text-xs font-label-sm uppercase tracking-wider text-secondary">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2" />
          <Link href="/blogs" className="hover:text-primary transition-colors">Blogs</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2" />
          <span className="text-primary font-semibold line-clamp-1">{blog.title}</span>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop py-12">
        <span className="bg-primary text-white font-label-sm text-xs px-2.5 py-1 rounded font-semibold uppercase tracking-wider">
          {blog.category}
        </span>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mt-6 mb-4">{blog.title}</h1>

        <div className="flex flex-wrap gap-4 text-xs text-on-surface-variant font-semibold uppercase tracking-wider mb-8">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />{' '}
            {new Date(blog.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {blog.author}</span>
        </div>

        {blog.coverImage && (
          <div className="relative h-72 w-full rounded-xl overflow-hidden mb-10 bg-surface-container-low">
            <img src={asset(blog.coverImage)} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div
          className="prose prose-slate max-w-none text-on-surface-variant leading-relaxed"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.content) }}
        />

        <div className="mt-12 pt-8 border-t border-outline-variant/30">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>
        </div>
      </article>
    </div>
  );
}
