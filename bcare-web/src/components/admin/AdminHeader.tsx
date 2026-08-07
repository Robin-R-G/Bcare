'use client';

import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function AdminHeader() {
  return (
    <header className="h-16 bg-surface-container-lowest border-b border-outline-variant/30 px-8 flex items-center justify-between sticky top-0 z-10">
      {/* Search Bar */}
      <div className="relative w-80">
        <Search className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
        <Input
          type="text"
          placeholder="Search products, leads, articles..."
          className="pl-9 bg-surface-container-low border-none h-9 text-xs"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error"></span>
        </button>

        <div className="h-6 w-px bg-outline-variant/40"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
            A
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-on-surface">Admin User</p>
            <p className="text-[10px] text-on-surface-variant">Super Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
