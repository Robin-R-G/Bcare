'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { getAdminProjects, createProject, updateProject, deleteProject } from '@/lib/supabase/admin-mutations';

type Project = {
  id: string; title: string; slug: string; client_name?: string; industry?: string;
  location?: string; completion_year?: number; description?: string; featured_image?: string; status?: string;
};

function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', slug: '', client_name: '', industry: '', location: '', completion_year: '', description: '', featured_image: '' });
  const [saving, setSaving] = useState(false);

  const load = async () => { setLoading(true); try { setProjects(await getAdminProjects()); } catch {} setLoading(false); };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditId(null); setForm({ title: '', slug: '', client_name: '', industry: '', location: '', completion_year: '', description: '', featured_image: '' }); setShowForm(true); };
  const openEdit = (p: Project) => { setEditId(p.id); setForm({ title: p.title, slug: p.slug, client_name: p.client_name || '', industry: p.industry || '', location: p.location || '', completion_year: p.completion_year?.toString() || '', description: p.description || '', featured_image: p.featured_image || '' }); setShowForm(true); };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const data = {
        title: form.title, slug: form.slug || slugify(form.title), client_name: form.client_name,
        industry: form.industry, location: form.location,
        completion_year: form.completion_year ? parseInt(form.completion_year) : null,
        description: form.description, featured_image: form.featured_image || null, status: 'published',
      };
      if (editId) await updateProject(editId, data); else await createProject(data);
      setShowForm(false); load();
    } catch (e: unknown) { alert('Error: ' + (e instanceof Error ? e.message : 'Unknown')); }
    setSaving(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try { await deleteProject(id); setProjects(prev => prev.filter(p => p.id !== id)); } catch (e: unknown) { alert('Error: ' + (e instanceof Error ? e.message : 'Unknown')); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F33]">Projects</h1>
          <p className="text-[#44474c] text-sm mt-1">Manage portfolio projects.</p>
        </div>
        <Button onClick={openNew} className="bg-[#0B1F33] text-white hover:bg-[#0B1F33]/90 font-semibold">
          <Plus className="w-4 h-4 mr-2" /> New Project
        </Button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg text-[#0B1F33]">{editId ? 'Edit Project' : 'New Project'}</h2>
              <button onClick={() => setShowForm(false)} className="text-[#94A3B8] hover:text-[#0B1F33]"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1"><Label className="text-xs font-semibold">Title *</Label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: slugify(e.target.value) }))} /></div>
                <div className="space-y-1"><Label className="text-xs font-semibold">Slug</Label><Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} /></div>
                <div className="space-y-1"><Label className="text-xs font-semibold">Client Name</Label><Input value={form.client_name} onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))} /></div>
                <div className="space-y-1"><Label className="text-xs font-semibold">Industry</Label><Input value={form.industry} onChange={e => setForm(f => ({ ...f, industry: e.target.value }))} placeholder="e.g. Hotel" /></div>
                <div className="space-y-1"><Label className="text-xs font-semibold">Location</Label><Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} /></div>
                <div className="space-y-1"><Label className="text-xs font-semibold">Completion Year</Label><Input type="number" value={form.completion_year} onChange={e => setForm(f => ({ ...f, completion_year: e.target.value }))} /></div>
              </div>
              <div className="space-y-1"><Label className="text-xs font-semibold">Featured Image URL</Label><Input value={form.featured_image} onChange={e => setForm(f => ({ ...f, featured_image: e.target.value }))} /></div>
              <div className="space-y-1"><Label className="text-xs font-semibold">Description</Label><Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4} /></div>
              <Button onClick={handleSave} disabled={saving || !form.title.trim()} className="w-full bg-[#F97316] text-white hover:bg-[#F97316]/90 font-semibold">
                <Check className="w-4 h-4 mr-2" /> {saving ? 'Saving...' : 'Save Project'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {loading ? <div className="text-center py-20 text-[#94A3B8]">Loading...</div> : projects.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-[#94A3B8]/30"><p className="text-[#44474c]">No projects yet.</p></div>
      ) : (
        <div className="bg-white rounded-xl border border-[#94A3B8]/30 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#94A3B8]/20">
                <th className="text-left py-3 px-4 font-semibold text-[#0B1F33]">Title</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0B1F33]">Client</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0B1F33]">Industry</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0B1F33]">Year</th>
                <th className="text-right py-3 px-4 font-semibold text-[#0B1F33]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.id} className="border-b border-[#94A3B8]/10 hover:bg-[#F8FAFC]">
                  <td className="py-3 px-4 font-medium text-[#0B1F33]">{p.title}</td>
                  <td className="py-3 px-4 text-[#44474c]">{p.client_name || '—'}</td>
                  <td className="py-3 px-4 text-[#44474c]">{p.industry || '—'}</td>
                  <td className="py-3 px-4 text-[#44474c]">{p.completion_year || '—'}</td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <Button size="sm" variant="outline" className="h-8" onClick={() => openEdit(p)}><Pencil className="w-3 h-3" /></Button>
                    <Button size="sm" variant="outline" className="h-8 text-red-600 hover:bg-red-50" onClick={() => handleDelete(p.id, p.title)}><Trash2 className="w-3 h-3" /></Button>
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
