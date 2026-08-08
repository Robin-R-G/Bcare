'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Lock } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';
  const [authorized, setAuthorized] = useState<boolean | null>(isLoginPage ? true : null);

  useEffect(() => {
    if (isLoginPage) {
      setAuthorized(true);
      return;
    }

    const supabase = createClient();

    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace('/admin/login');
        setAuthorized(false);
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (!profile || profile.role !== 'admin') {
        await supabase.auth.signOut();
        router.replace('/admin/login');
        setAuthorized(false);
        return;
      }

      setAuthorized(true);
    };

    check();
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  if (authorized === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-container-low">
        <div className="flex flex-col items-center gap-3 text-on-surface-variant">
          <Lock className="w-6 h-6 animate-pulse" />
          <p className="text-sm font-medium">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div className="flex min-h-screen bg-surface-container-low text-on-surface">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="p-8 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
