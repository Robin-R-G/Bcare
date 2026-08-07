'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { createProduct, getAdminCategories, addProductImages } from '@/lib/supabase/admin-mutations';
import Link from 'next/link';

type Category = { id: string; name: string; slug: string };

export default function AdminNewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '', slug: '', sku: '', category_id: '', badge: '',
    price: '', price_on_request: true, availability: 'Contact for Availability',
    short_description: '', description: '',
    featured_image: '', seo_title: '', seo_description: '',
  });
  const [specKey, setSpecKey] = useState('');
  const [specVal, setSpecVal] = useState('');
  const [specifications, setSpecifications] = useState<Record<string, string>>({});
  const [feature, setFeature] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [app, setApp] = useState('');
  const [applications, setApplications] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    getAdminCategories().then(setCategories).catch(() => {});
  }, []);

  const handleChange = (field: string, value: string | boolean) => setForm(f => ({ ...f, [field]: value }));

  const addSpec = () => {
    if (specKey.trim() && specVal.trim()) {
      setSpecifications(s => ({ ...s, [specKey.trim()]: specVal.trim() }));
      setSpecKey(''); setSpecVal('');
    }
  };
  const removeSpec = (k: string) => setSpecifications(s => { const n = { ...s }; delete n[k]; return n; });

  const addFeature = () => { if (feature.trim()) { setFeatures(f => [...f, feature.trim()]); setFeature(''); } };
  const addApp = () => { if (app.trim()) { setApplications(a => [...a, app.trim()]); setApp(''); } };
  const addImage = () => { if (imageUrl.trim()) { setImages(i => [...i, imageUrl.trim()]); setImageUrl(''); } };

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.category_id) {
      alert('Product name and category are required.');
      return;
    }
    setSaving(true);
    try {
      const product = {
        name: form.name,
        slug: form.slug || slugify(form.name),
        sku: form.sku,
        category_id: form.category_id,
        badge: form.badge || null,
        price: form.price ? parseFloat(form.price) : null,
        price_on_request: form.price_on_request,
        availability: form.availability,
        short_description: form.short_description,
        description: form.description,
        featured_image: form.featured_image || null,
        status: 'published',
        seo_title: form.seo_title || null,
        seo_description: form.seo_description || null,
        specifications,
        features,
        applications,
      };

      const created = await createProduct(product);

      // Add extra images
      if (images.length > 0 && created.id) {
        await addProductImages(created.id, images.map((url, i) => ({
          image_url: url,
          alt_text: form.name,
          display_order: i + 1,
        })));
      }

      router.push('/admin/products');
    } catch (e: unknown) {
      alert('Error creating product: ' + (e instanceof Error ? e.message : 'Unknown error'));
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="text-[#94A3B8] hover:text-[#0B1F33]">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#0B1F33]">Add New Product</h1>
            <p className="text-[#44474c] text-sm mt-1">Create a new equipment listing in the catalog.</p>
          </div>
        </div>
        <Button onClick={handleSubmit} disabled={saving} className="bg-[#F97316] text-white hover:bg-[#F97316]/90 font-semibold px-6">
          <Save className="w-4 h-4 mr-2" /> {saving ? 'Publishing...' : 'Publish Product'}
        </Button>
      </div>

      {/* Basic Info */}
      <section className="bg-white p-6 rounded-xl border border-[#94A3B8]/30 space-y-4">
        <h2 className="font-bold text-[#0B1F33]">Basic Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Product Name *</Label>
            <Input value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="e.g. EUROPYA 20L Spiral Mixer" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Slug</Label>
            <Input value={form.slug} onChange={e => handleChange('slug', e.target.value)} placeholder="auto-generated from name" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold">SKU</Label>
            <Input value={form.sku} onChange={e => handleChange('sku', e.target.value)} placeholder="e.g. E-SM-20" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Category *</Label>
            <select value={form.category_id} onChange={e => handleChange('category_id', e.target.value)} className="w-full border border-[#94A3B8]/40 rounded-md px-3 py-2 text-sm">
              <option value="">Select category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Badge</Label>
            <Input value={form.badge} onChange={e => handleChange('badge', e.target.value)} placeholder="e.g. Best Seller" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Availability</Label>
            <select value={form.availability} onChange={e => handleChange('availability', e.target.value)} className="w-full border border-[#94A3B8]/40 rounded-md px-3 py-2 text-sm">
              <option>In Stock</option>
              <option>Made to Order</option>
              <option>Contact for Availability</option>
            </select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Price (₹)</Label>
            <Input type="number" value={form.price} onChange={e => handleChange('price', e.target.value)} placeholder="Leave empty if price on request" />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input type="checkbox" id="por" checked={form.price_on_request} onChange={e => handleChange('price_on_request', e.target.checked)} className="accent-[#F97316]" />
            <Label htmlFor="por" className="text-sm">Price on Request</Label>
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-semibold">Short Description</Label>
          <Input value={form.short_description} onChange={e => handleChange('short_description', e.target.value)} placeholder="One-liner for product cards" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-semibold">Full Description</Label>
          <Textarea value={form.description} onChange={e => handleChange('description', e.target.value)} rows={4} placeholder="Detailed product description..." />
        </div>
      </section>

      {/* Images */}
      <section className="bg-white p-6 rounded-xl border border-[#94A3B8]/30 space-y-4">
        <h2 className="font-bold text-[#0B1F33]">Images</h2>
        <div className="space-y-1">
          <Label className="text-xs font-semibold">Featured Image URL</Label>
          <Input value={form.featured_image} onChange={e => handleChange('featured_image', e.target.value)} placeholder="https://..." />
        </div>
        <div className="flex gap-2">
          <Input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Additional image URL" className="flex-1" />
          <Button variant="outline" onClick={addImage} className="shrink-0"><Plus className="w-4 h-4" /></Button>
        </div>
        {images.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {images.map((url, i) => (
              <div key={i} className="flex items-center gap-1 bg-[#F8FAFC] rounded-lg px-2 py-1 text-xs">
                <span className="truncate max-w-[150px]">{url}</span>
                <button onClick={() => setImages(imgs => imgs.filter((_, j) => j !== i))} className="text-red-500"><X className="w-3 h-3" /></button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Specifications */}
      <section className="bg-white p-6 rounded-xl border border-[#94A3B8]/30 space-y-4">
        <h2 className="font-bold text-[#0B1F33]">Specifications</h2>
        <div className="flex gap-2">
          <Input value={specKey} onChange={e => setSpecKey(e.target.value)} placeholder="Key (e.g. Capacity)" className="flex-1" />
          <Input value={specVal} onChange={e => setSpecVal(e.target.value)} placeholder="Value (e.g. 20 Litres)" className="flex-1" />
          <Button variant="outline" onClick={addSpec} className="shrink-0"><Plus className="w-4 h-4" /></Button>
        </div>
        {Object.entries(specifications).map(([k, v]) => (
          <div key={k} className="flex items-center gap-2 bg-[#F8FAFC] rounded-lg px-3 py-2 text-sm">
            <span className="font-semibold text-[#0B1F33]">{k}:</span>
            <span className="text-[#44474c]">{v}</span>
            <button onClick={() => removeSpec(k)} className="ml-auto text-red-500"><X className="w-3 h-3" /></button>
          </div>
        ))}
      </section>

      {/* Features & Applications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <section className="bg-white p-6 rounded-xl border border-[#94A3B8]/30 space-y-4">
          <h2 className="font-bold text-[#0B1F33]">Features</h2>
          <div className="flex gap-2">
            <Input value={feature} onChange={e => setFeature(e.target.value)} placeholder="Add feature" className="flex-1" onKeyDown={e => e.key === 'Enter' && addFeature()} />
            <Button variant="outline" onClick={addFeature}><Plus className="w-4 h-4" /></Button>
          </div>
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 bg-[#F8FAFC] rounded-lg px-3 py-2 text-sm">
              <span className="text-[#44474c]">{f}</span>
              <button onClick={() => setFeatures(fs => fs.filter((_, j) => j !== i))} className="ml-auto text-red-500"><X className="w-3 h-3" /></button>
            </div>
          ))}
        </section>

        <section className="bg-white p-6 rounded-xl border border-[#94A3B8]/30 space-y-4">
          <h2 className="font-bold text-[#0B1F33]">Applications</h2>
          <div className="flex gap-2">
            <Input value={app} onChange={e => setApp(e.target.value)} placeholder="Add application" className="flex-1" onKeyDown={e => e.key === 'Enter' && addApp()} />
            <Button variant="outline" onClick={addApp}><Plus className="w-4 h-4" /></Button>
          </div>
          {applications.map((a, i) => (
            <div key={i} className="flex items-center gap-2 bg-[#F8FAFC] rounded-lg px-3 py-2 text-sm">
              <span className="text-[#44474c]">{a}</span>
              <button onClick={() => setApplications(as => as.filter((_, j) => j !== i))} className="ml-auto text-red-500"><X className="w-3 h-3" /></button>
            </div>
          ))}
        </section>
      </div>

      {/* SEO */}
      <section className="bg-white p-6 rounded-xl border border-[#94A3B8]/30 space-y-4">
        <h2 className="font-bold text-[#0B1F33]">SEO</h2>
        <div className="space-y-1">
          <Label className="text-xs font-semibold">SEO Title</Label>
          <Input value={form.seo_title} onChange={e => handleChange('seo_title', e.target.value)} placeholder="Custom page title for search engines" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-semibold">SEO Description</Label>
          <Textarea value={form.seo_description} onChange={e => handleChange('seo_description', e.target.value)} rows={2} placeholder="Meta description for search engines" />
        </div>
      </section>
    </div>
  );
}
