import { getProducts, getProjects, getBlogs, getCategories } from '@/lib/supabase/queries';
import { products as mockProducts, projects as mockProjects, blogs as mockBlogs, categories as mockCategories } from '@/lib/data/mock';
import { Package, Layers, FolderKanban, FileText, Users, MessageSquareQuote, TrendingUp, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  let products = mockProducts;
  let categories = mockCategories;
  let projects = mockProjects;
  let blogs = mockBlogs;

  try {
    const [p, c, pr, b] = await Promise.all([getProducts(), getCategories(), getProjects(), getBlogs()]);
    if (p.length > 0) products = p;
    if (c.length > 0) categories = c;
    if (pr.length > 0) projects = pr;
    if (b.length > 0) blogs = b;
  } catch {
    // Fallback to mock data
  }

  const stats = [
    { title: 'Total Products', value: products.length, icon: Package, color: 'text-blue-500 bg-blue-500/10' },
    { title: 'Active Categories', value: categories.length, icon: Layers, color: 'text-indigo-500 bg-indigo-500/10' },
    { title: 'Projects Completed', value: projects.length, icon: FolderKanban, color: 'text-emerald-500 bg-emerald-500/10' },
    { title: 'Published Blogs', value: blogs.length, icon: FileText, color: 'text-amber-500 bg-amber-500/10' },
    { title: 'New CRM Leads', value: 12, icon: Users, color: 'text-rose-500 bg-rose-500/10' },
    { title: 'Quote Requests', value: 5, icon: MessageSquareQuote, color: 'text-purple-500 bg-purple-500/10' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div>
        <h1 className="font-display-md text-2xl font-bold text-primary">Platform Overview</h1>
        <p className="text-on-surface-variant text-sm mt-1">Welcome back. Here is what is happening across BCare digital operations today.</p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-ambient flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">{stat.title}</p>
                <h3 className="text-3xl font-bold text-primary mt-2">{stat.value}</h3>
              </div>
              <div className={`p-4 rounded-2xl ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section: Quick Links & Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Management Links */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-ambient space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
            <h2 className="font-title-md text-lg font-bold text-primary">Quick Actions</h2>
            <TrendingUp className="w-5 h-5 text-surface-tint" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/admin/products"
              className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 flex items-center justify-between group transition-colors"
            >
              <span className="font-label-sm text-sm text-on-surface font-medium">Manage Products</span>
              <ArrowUpRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="/admin/leads"
              className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 flex items-center justify-between group transition-colors"
            >
              <span className="font-label-sm text-sm text-on-surface font-medium">View Leads & Quotes</span>
              <ArrowUpRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="/admin/projects"
              className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 flex items-center justify-between group transition-colors"
            >
              <span className="font-label-sm text-sm text-on-surface font-medium">Add Project Showcase</span>
              <ArrowUpRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="/admin/blogs"
              className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 flex items-center justify-between group transition-colors"
            >
              <span className="font-label-sm text-sm text-on-surface font-medium">Write Blog Article</span>
              <ArrowUpRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>

        {/* Catalog Highlights */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-ambient space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
            <h2 className="font-title-md text-lg font-bold text-primary">Active Products Overview</h2>
            <Link href="/admin/products" className="text-xs text-surface-tint font-semibold hover:underline">View All</Link>
          </div>

          <div className="space-y-3">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-low transition-colors">
                <div className="flex items-center gap-3">
                  <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-cover rounded-lg" />
                  <div>
                    <p className="text-sm font-semibold text-on-surface line-clamp-1">{product.name}</p>
                    <p className="text-xs text-on-surface-variant">{product.categoryName}</p>
                  </div>
                </div>
                <span className="bg-emerald-500/10 text-emerald-600 text-xs px-2.5 py-1 rounded-full font-medium">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
