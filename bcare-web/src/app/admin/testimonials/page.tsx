'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, X, Check, Star } from 'lucide-react';
import { getAdminTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '@/lib/supabase/admin-mutations';

type Testimonial = {
  id: string; name: string; company?: string; role?: string; content: string;
  rating?: number; avatar_url?: string; status?: string;
};

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', company: '', role: '', content: '', rating: '5', avatar_url: '' });
  const [saving, setSaving] = useState(false);

  const load = async () => { setLoading(true); try { setItems(await getAdminTestimonials()); } catch {} setLoading(false); };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditId(null); setForm({ name: '', company: '', role: '', content: '', rating: '5', avatar_url: '' }); setShowForm(true); };
  const openEdit = (t: Testimonial) => { setEditId(t.id); setForm({ name: t.name, company: t.company || '', role: t.role || '', content: t.content, rating: t.rating?.toString() || '5', avatar_url: t.avatar_url || '' }); setShowForm(true); };

  const handleSave = async () => {
    if (!form.name.trim() || !form.content.trim()) return;
    setSaving(true);
    try {
      const data = { name: form.name, company: form.company, role: form.role, content: form.content, rating: parseInt(form.rating) || 5, avatar_url: form.avatar_url || null, status: 'published' };
      if (editId) await updateTestimonial(editId, data); else await createTestimonial(data);
      setShowForm(false); load();
    } catch (e: unknown) { alert('Error: ' + (e instanceof Error ? e.message : 'Unknown')); }
    setSaving(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from "${name}"?`)) return;
    try { await deleteTestimonial(id); setItems(prev => prev.filter(t => t.id !== id)); } catch (e: unknown) { alert('Error: ' + (e instanceof Error ? e.message : 'Unknown')); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F33]">Testimonials</h1>
          <p className="text-[#44474c] text-sm mt-1">Manage customer testimonials.</p>
        </div>
        <Button onClick={openNew} className="bg-[#0B1F33] text-white hover:bg-[#0B1F33]/90 font-semibold">
          <Plus className="w-4 h-4 mr-2" /> Add Testimonial
        </Button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg text-[#0B1F33]">{editId ? 'Edit' : 'New'} Testimonial</h2>
              <button onClick={() => setShowForm(false)} className="text-[#94A3B8] hover:text-[#0B1F33]"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><Label className="text-xs font-semibold">Name *</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
                <div className="space-y-1"><Label className="text-xs font-semibold">Rating</Label>
                  <select value={form.rating} onChange={e => setForm(f => ({ ...f, rating: e.target.value }))} className="w-full border border-[#94A3B8]/40 rounded-md px-3 py-2 text-sm">
                    {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><Label className="text-xs font-semibold">Company</Label><Input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} /></div>
                <div className="space-y-1"><Label className="text-xs font-semibold">Role</Label><Input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} /></div>
              </div>
              <div className="space-y-1"><Label className="text-xs font-semibold">Avatar URL</Label><Input value={form.avatar_url} onChange={e => setForm(f => ({ ...f, avatar_url: e.target.value }))} /></div>
              <div className="space-y-1"><Label className="text-xs font-semibold">Testimonial *</Label><Textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={4} /></div>
              <Button onClick={handleSave} disabled={saving || !form.name.trim() || !form.content.trim()} className="w-full bg-[#F97316] text-white hover:bg-[#F97316]/90 font-semibold">
                <Check className="w-4 h-4 mr-2" /> {saving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {loading ? <div className="text-center py-20 text-[#94A3B8]">Loading...</div> : items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-[#94A3B8]/30"><p className="text-[#44474c]">No testimonials yet.</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map(t => (
            <div key={t.id} className="bg-white p-5 rounded-xl border border-[#94A3B8]/30">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-[#0B1F33]">{t.name}</p>
                  <p className="text-xs text-[#94A3B8]">{[t.role, t.company].filter(Boolean).join(' at ')}</p>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating || 5 }, (_, i) => <Star key={i} className="w-3 h-3 fill-[#F97316] text-[#F97316]" />)}
                </div>
              </div>
              <p className="text-sm text-[#44474c] line-clamp-3 mb-3">&ldquo;{t.content}&rdquo;</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="h-7" onClick={() => openEdit(t)}><Pencil className="w-3 h-3" /></Button>
                <Button size="sm" variant="outline" className="h-7 text-red-600 hover:bg-red-50" onClick={() => handleDelete(t.id, t.name)}><Trash2 className="w-3 h-3" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
