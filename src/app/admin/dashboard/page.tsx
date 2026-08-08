'use client';

import { useState, useEffect } from 'react';
import { Package, Layers, FolderKanban, FileText, Users, Star, TrendingUp, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { getDashboardCounts } from '@/lib/supabase/admin-mutations';

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState({ products: 0, categories: 0, projects: 0, blogs: 0, leads: 0, reviews: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardCounts()
      .then(setCounts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { title: 'Total Products', value: counts.products, icon: Package, color: 'text-blue-500 bg-blue-500/10' },
    { title: 'Categories', value: counts.categories, icon: Layers, color: 'text-indigo-500 bg-indigo-500/10' },
    { title: 'Projects', value: counts.projects, icon: FolderKanban, color: 'text-emerald-500 bg-emerald-500/10' },
    { title: 'Blog Posts', value: counts.blogs, icon: FileText, color: 'text-amber-500 bg-amber-500/10' },
    { title: 'Leads', value: counts.leads, icon: Users, color: 'text-rose-500 bg-rose-500/10' },
    { title: 'Reviews', value: counts.reviews, icon: Star, color: 'text-purple-500 bg-purple-500/10' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F33]">Platform Overview</h1>
        <p className="text-[#44474c] text-sm mt-1">Welcome back. Here is what is happening across BCare digital operations today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white p-6 rounded-2xl border border-[#94A3B8]/30 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">{stat.title}</p>
                <h3 className="text-3xl font-bold text-[#0B1F33] mt-2">{loading ? '—' : stat.value}</h3>
              </div>
              <div className={`p-4 rounded-2xl ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-[#94A3B8]/30 space-y-4">
          <div className="flex items-center justify-between border-b border-[#94A3B8]/20 pb-4">
            <h2 className="text-lg font-bold text-[#0B1F33]">Quick Actions</h2>
            <TrendingUp className="w-5 h-5 text-[#94A3B8]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Manage Products', href: '/admin/products' },
              { label: 'View Leads', href: '/admin/leads' },
              { label: 'Add Project', href: '/admin/projects' },
              { label: 'Write Blog', href: '/admin/blogs' },
              { label: 'Add Review', href: '/admin/reviews' },
              { label: 'Upload Media', href: '/admin/media' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="p-3 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#94A3B8]/20 flex items-center justify-between group transition-colors">
                <span className="text-sm text-[#0B1F33] font-medium">{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#0B1F33] transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#94A3B8]/30 space-y-4">
          <div className="flex items-center justify-between border-b border-[#94A3B8]/20 pb-4">
            <h2 className="text-lg font-bold text-[#0B1F33]">Quick Links</h2>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-[#44474c]">All data is stored in Supabase and reflects live on the public website.</p>
            <ul className="space-y-1 text-[#94A3B8]">
              <li>• Products added here appear on <Link href="/products" className="text-[#0B1F33] hover:underline">/products</Link></li>
              <li>• Reviews appear on <Link href="/reviews" className="text-[#0B1F33] hover:underline">/reviews</Link></li>
              <li>• Blogs appear on <Link href="/blogs" className="text-[#0B1F33] hover:underline">/blogs</Link></li>
              <li>• Projects appear on <Link href="/projects" className="text-[#0B1F33] hover:underline">/projects</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
