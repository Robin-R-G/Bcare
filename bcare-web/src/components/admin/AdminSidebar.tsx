'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  FolderKanban, 
  FileText, 
  MessageSquareQuote, 
  Image, 
  Users, 
  Globe, 
  Settings,
  LogOut
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Categories', href: '/admin/categories', icon: Layers },
  { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { name: 'Blogs & News', href: '/admin/blogs', icon: FileText },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
  { name: 'Media Library', href: '/admin/media', icon: Image },
  { name: 'Lead CRM', href: '/admin/leads', icon: Users },
  { name: 'SEO Management', href: '/admin/seo', icon: Globe },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant/30 flex flex-col h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-outline-variant/30 flex items-center gap-3">
        <div className="bg-primary text-white font-bold text-lg w-9 h-9 rounded-xl flex items-center justify-center">
          B
        </div>
        <div>
          <h2 className="font-title-md text-primary font-bold leading-none">BCare OS</h2>
          <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Enterprise Hub</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto hide-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-label-md text-sm transition-colors ${
                isActive
                  ? 'bg-primary text-white font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-on-surface-variant'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-outline-variant/30">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-label-md text-sm text-error hover:bg-error/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
