'use client';

import { motion } from 'framer-motion';
import { blogs } from '@/lib/data/mock';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BlogsPage() {
  return (
    <div className="bg-background min-h-screen pb-16">
      {/* Header */}
      <section className="bg-white border-b border-outline-variant/30 py-16 text-center">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
          <h1 className="font-heading text-4xl font-extrabold text-primary mb-4">
            Industrial Insights &amp; Resources
          </h1>
          <p className="font-body-lg text-secondary">
            Expert advice, industry trends, and technical guides to help you optimize your commercial kitchen operations.
          </p>
        </div>
      </section>

      {/* Blogs List */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-12">
        {blogs.length === 0 && (
          <div className="max-w-2xl mx-auto text-center bg-white border border-outline-variant/30 rounded-xl p-10">
            <h2 className="font-heading text-2xl font-bold text-primary mb-3">Articles coming soon</h2>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              We are preparing technical guides on selecting and maintaining bakery equipment. In the
              meantime, our team is happy to advise you directly.
            </p>
            <Link href="/contact">
              <Button className="font-bold">
                Talk to Our Team <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-outline-variant/30 hover:border-primary transition-all group flex flex-col h-full"
            >
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white font-label-sm text-xs px-2.5 py-1 rounded font-semibold uppercase tracking-wider">
                    {blog.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="font-heading font-bold text-lg text-primary mb-3 line-clamp-2 hover:text-[#F97316] transition-colors">
                  <Link href={`/blogs/${blog.slug}`}>
                    {blog.title}
                  </Link>
                </h2>
                
                <div className="flex flex-wrap gap-4 text-xs text-on-surface-variant font-semibold uppercase tracking-wider mb-4">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {blog.author}</span>
                </div>
                
                <p className="text-on-surface-variant font-body-md text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                  {blog.excerpt}
                </p>
                
                <div className="mt-auto pt-4 border-t border-outline-variant/30">
                  <Link href={`/blogs/${blog.slug}`}>
                    <Button variant="ghost" className="text-primary hover:text-[#F97316] hover:bg-transparent px-0 font-bold">
                      Read Full Article <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
