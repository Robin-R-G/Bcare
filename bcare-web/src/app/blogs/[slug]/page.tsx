import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Calendar, User, ArrowLeft } from 'lucide-react';
import { blogs } from '@/lib/data/mock';

export async function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = blogs.find(b => b.slug === params.slug);
  if (!blog) notFound();

  return (
    <div className="bg-background min-h-screen pb-16">
      {/* Breadcrumbs */}
      <div className="border-b border-outline-variant/30 py-4 bg-white">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop flex items-center text-xs font-label-sm uppercase tracking-wider text-secondary">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2" />
          <Link href="/blogs" className="hover:text-primary transition-colors">Blogs</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2" />
          <span className="text-primary font-semibold line-clamp-1">{blog.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto">
        <Link href="/blogs" className="inline-flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>

        <span className="bg-primary text-white font-label-sm text-xs px-2.5 py-1 rounded font-semibold uppercase tracking-wider mb-4 inline-block">
          {blog.category}
        </span>

        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4 leading-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap gap-4 text-xs text-on-surface-variant font-semibold uppercase tracking-wider mb-8">
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {blog.author}</span>
        </div>

        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-10">
          <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-slate max-w-none text-on-surface-variant font-body-md text-body-md leading-relaxed">
          <p className="text-lg mb-6">{blog.excerpt}</p>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {blog.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-outline-variant/30">
            <div className="flex flex-wrap gap-2">
              {blog.tags.map(tag => (
                <span key={tag} className="text-xs bg-surface-container-low border border-outline-variant/30 px-3 py-1.5 rounded text-on-surface-variant font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
