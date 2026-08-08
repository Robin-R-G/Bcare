'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, X, Check, Eye, EyeOff } from 'lucide-react';
import { getAdminBlogs, createBlog, updateBlog, deleteBlog } from '@/lib/supabase/admin-mutations';

type Blog = {
  id: string; title: string; slug: string; category: string; excerpt?: string;
  content?: string; cover_image?: string; status?: string; tags?: string[]; created_at?: string;
};

function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', slug: '', category: '', excerpt: '', content: '', cover_image: '', tags: '' });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try { const data = await getAdminBlogs(); setBlogs(data); } catch {}
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditId(null); setForm({ title: '', slug: '', category: '', excerpt: '', content: '', cover_image: '', tags: '' }); setShowForm(true); };
  const openEdit = (b: Blog) => { setEditId(b.id); setForm({ title: b.title, slug: b.slug, category: b.category || '', excerpt: b.excerpt || '', content: b.content || '', cover_image: b.cover_image || '', tags: (b.tags || []).join(', ') }); setShowForm(true); };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const data = {
        title: form.title, slug: form.slug || slugify(form.title), category: form.category,
        excerpt: form.excerpt, content: form.content, cover_image: form.cover_image || null,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        status: 'published',
      };
      if (editId) await updateBlog(editId, data);
      else await createBlog(data);
      setShowForm(false); load();
    } catch (e: unknown) { alert('Error: ' + (e instanceof Error ? e.message : 'Unknown')); }
    setSaving(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try { await deleteBlog(id); setBlogs(prev => prev.filter(b => b.id !== id)); } catch (e: unknown) { alert('Error: ' + (e instanceof Error ? e.message : 'Unknown')); }
  };

  const toggleStatus = async (id: string, current: string) => {
    const next = current === 'published' ? 'draft' : 'published';
    try { await updateBlog(id, { status: next }); load(); } catch {}
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F33]">Blogs</h1>
          <p className="text-[#44474c] text-sm mt-1">Manage blog posts and articles.</p>
        </div>
        <Button onClick={openNew} className="bg-[#0B1F33] text-white hover:bg-[#0B1F33]/90 font-semibold">
          <Plus className="w-4 h-4 mr-2" /> New Blog Post
        </Button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg text-[#0B1F33]">{editId ? 'Edit Blog' : 'New Blog Post'}</h2>
              <button onClick={() => setShowForm(false)} className="text-[#94A3B8] hover:text-[#0B1F33]"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1"><Label className="text-xs font-semibold">Title *</Label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: slugify(e.target.value) }))} /></div>
                <div className="space-y-1"><Label className="text-xs font-semibold">Slug</Label><Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} /></div>
                <div className="space-y-1"><Label className="text-xs font-semibold">Category</Label><Input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="e.g. Industry Trends" /></div>
                <div className="space-y-1"><Label className="text-xs font-semibold">Tags (comma separated)</Label><Input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="bakery, tips" /></div>
              </div>
              <div className="space-y-1"><Label className="text-xs font-semibold">Cover Image URL</Label><Input value={form.cover_image} onChange={e => setForm(f => ({ ...f, cover_image: e.target.value }))} /></div>
              <div className="space-y-1"><Label className="text-xs font-semibold">Excerpt</Label><Textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} rows={2} /></div>
              <div className="space-y-1"><Label className="text-xs font-semibold">Content</Label><Textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={10} placeholder="Write your blog content here..." /></div>
              <Button onClick={handleSave} disabled={saving || !form.title.trim()} className="w-full bg-[#F97316] text-white hover:bg-[#F97316]/90 font-semibold">
                <Check className="w-4 h-4 mr-2" /> {saving ? 'Saving...' : 'Save Blog'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {loading ? <div className="text-center py-20 text-[#94A3B8]">Loading...</div> : blogs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-[#94A3B8]/30"><p className="text-[#44474c]">No blog posts yet.</p></div>
      ) : (
        <div className="bg-white rounded-xl border border-[#94A3B8]/30 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#94A3B8]/20">
                <th className="text-left py-3 px-4 font-semibold text-[#0B1F33]">Title</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0B1F33]">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0B1F33]">Status</th>
                <th className="text-right py-3 px-4 font-semibold text-[#0B1F33]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(b => (
                <tr key={b.id} className="border-b border-[#94A3B8]/10 hover:bg-[#F8FAFC]">
                  <td className="py-3 px-4 font-medium text-[#0B1F33]">{b.title}</td>
                  <td className="py-3 px-4 text-[#44474c]">{b.category || '—'}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${b.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                      {b.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />} {b.status || 'published'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <Button size="sm" variant="outline" className="h-8" onClick={() => toggleStatus(b.id, b.status || 'published')}>{b.status === 'published' ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}</Button>
                    <Button size="sm" variant="outline" className="h-8" onClick={() => openEdit(b)}><Pencil className="w-3 h-3" /></Button>
                    <Button size="sm" variant="outline" className="h-8 text-red-600 hover:bg-red-50" onClick={() => handleDelete(b.id, b.title)}><Trash2 className="w-3 h-3" /></Button>
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
