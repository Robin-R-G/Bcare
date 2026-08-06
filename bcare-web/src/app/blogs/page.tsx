'use client';

import { motion } from 'framer-motion';
import { blogs } from '@/lib/data/mock';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BlogsPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-surface-container-low py-20 border-b border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="font-display-lg text-display-lg text-primary mb-6">Insights & Resources</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Expert advice, industry trends, and technical guides to help you optimize your commercial kitchen operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blogs List */}
      <section className="py-section-padding">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-ambient border border-outline-variant/30 hover:shadow-ambient-hover hover:border-surface-tint transition-all group flex flex-col h-full"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={blog.coverImage} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-surface-tint text-white font-label-sm text-xs px-3 py-1 rounded-full shadow-sm">
                      {blog.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="font-title-md text-title-md text-primary mb-3 line-clamp-2 group-hover:text-surface-tint transition-colors">
                    <Link href={`/blogs/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h2>
                  
                  <div className="flex flex-wrap gap-4 text-xs text-on-surface-variant font-label-sm mb-4">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {blog.author}</span>
                  </div>
                  
                  <p className="text-on-surface-variant font-body-md text-body-md line-clamp-3 mb-6 flex-grow">
                    {blog.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-outline-variant/30">
                    <Link href={`/blogs/${blog.slug}`}>
                      <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary-container px-0 -ml-2">
                        Read Full Article <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
