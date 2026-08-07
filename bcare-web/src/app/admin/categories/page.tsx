'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { getAdminCategories, createCategory, updateCategory, deleteCategory } from '@/lib/supabase/admin-mutations';

type Category = {
  id: string; name: string; slug: string; description?: string; image_url?: string; is_active?: boolean;
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', slug: '', description: '', image_url: '' });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAdminCategories();
      setCategories(data);
    } catch { /* mock fallback */ }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditId(null);
    setForm({ name: '', slug: '', description: '', image_url: '' });
    setShowForm(true);
  };

  const openEdit = (cat: Category) => {
    setEditId(cat.id);
    setForm({ name: cat.name, slug: cat.slug, description: cat.description || '', image_url: cat.image_url || '' });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      const slug = form.slug || slugify(form.name);
      if (editId) {
        await updateCategory(editId, { ...form, slug });
      } else {
        await createCategory({ ...form, slug });
      }
      setShowForm(false);
      load();
    } catch (e: unknown) {
      alert('Error: ' + (e instanceof Error ? e.message : 'Unknown'));
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    try {
      await deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (e: unknown) {
      alert('Error: ' + (e instanceof Error ? e.message : 'Unknown'));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F33]">Categories</h1>
          <p className="text-[#44474c] text-sm mt-1">Manage product categories.</p>
        </div>
        <Button onClick={openNew} className="bg-[#0B1F33] text-white hover:bg-[#0B1F33]/90 font-semibold">
          <Plus className="w-4 h-4 mr-2" /> Add Category
        </Button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg text-[#0B1F33]">{editId ? 'Edit Category' : 'New Category'}</h2>
              <button onClick={() => setShowForm(false)} className="text-[#94A3B8] hover:text-[#0B1F33]"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Name *</Label>
                <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value, slug: slugify(e.target.value) }))} placeholder="e.g. Mixers" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Slug</Label>
                <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Description</Label>
                <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Image URL</Label>
                <Input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://..." />
              </div>
              <Button onClick={handleSave} disabled={saving || !form.name.trim()} className="w-full bg-[#F97316] text-white hover:bg-[#F97316]/90 font-semibold">
                <Check className="w-4 h-4 mr-2" /> {saving ? 'Saving...' : 'Save Category'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-center py-20 text-[#94A3B8]">Loading...</div>
      ) : categories.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-[#94A3B8]/30">
          <p className="text-[#44474c]">No categories yet. Add your first category.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#94A3B8]/30 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#94A3B8]/20">
                <th className="text-left py-3 px-4 font-semibold text-[#0B1F33]">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0B1F33]">Slug</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0B1F33]">Description</th>
                <th className="text-right py-3 px-4 font-semibold text-[#0B1F33]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.id} className="border-b border-[#94A3B8]/10 hover:bg-[#F8FAFC]">
                  <td className="py-3 px-4 font-medium text-[#0B1F33]">{cat.name}</td>
                  <td className="py-3 px-4 text-[#94A3B8] font-mono text-xs">{cat.slug}</td>
                  <td className="py-3 px-4 text-[#44474c] truncate max-w-[200px]">{cat.description || '—'}</td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <Button size="sm" variant="outline" className="h-8" onClick={() => openEdit(cat)}><Pencil className="w-3 h-3" /></Button>
                    <Button size="sm" variant="outline" className="h-8 text-red-600 hover:bg-red-50" onClick={() => handleDelete(cat.id, cat.name)}><Trash2 className="w-3 h-3" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
