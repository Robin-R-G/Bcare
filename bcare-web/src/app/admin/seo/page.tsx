'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Globe, FileText, Hash, Image as ImageIcon } from 'lucide-react';

const defaultSeo = {
  siteTitle: 'BCare Bakery & Kitchen Equipments | Commercial Kitchen Solutions Kerala',
  siteDescription: 'Established in 2010, BCare is a leading supplier of commercial bakery and kitchen equipment in Kerala. EUROPYA and BCARE brand mixers, ovens, slicers, and more.',
  siteKeywords: 'bakery equipment Kerala, commercial kitchen equipment Thrissur, planetary mixer India, spiral mixer Kerala, commercial oven Kerala',
  ogImage: '/logo.webp',
  googleAnalyticsId: '',
  googleMapsApiKey: '',
  facebookPixelId: '',
};

export default function AdminSeoPage() {
  const [seo, setSeo] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('bcare_seo');
        return saved ? JSON.parse(saved) : defaultSeo;
      } catch {
        return defaultSeo;
      }
    }
    return defaultSeo;
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string) => {
    setSeo((s: Record<string, string>) => ({ ...s, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      localStorage.setItem('bcare_seo', JSON.stringify(seo));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally { setSaving(false); }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F33]">SEO Management</h1>
          <p className="text-[#44474c] text-sm mt-1">Control search engine optimization and meta tags.</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-[#0B1F33] text-white hover:bg-[#0B1F33]/90 font-semibold px-6">
          <Save className="w-4 h-4 mr-2" /> {saving ? 'Saving...' : saved ? 'Saved!' : 'Save SEO'}
        </Button>
      </div>

      <section className="bg-white p-6 rounded-xl border border-[#94A3B8]/30 space-y-4">
        <h2 className="font-bold text-lg text-[#0B1F33] flex items-center gap-2"><Globe className="w-5 h-5" /> Site Meta</h2>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Site Title</Label>
            <Input value={seo.siteTitle} onChange={e => handleChange('siteTitle', e.target.value)} />
            <p className="text-[10px] text-[#94A3B8]">Recommended: 50-60 characters</p>
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Meta Description</Label>
            <Textarea value={seo.siteDescription} onChange={e => handleChange('siteDescription', e.target.value)} rows={3} />
            <p className="text-[10px] text-[#94A3B8]">Recommended: 150-160 characters</p>
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Keywords</Label>
            <Textarea value={seo.siteKeywords} onChange={e => handleChange('siteKeywords', e.target.value)} rows={2} />
            <p className="text-[10px] text-[#94A3B8]">Comma-separated keywords</p>
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold flex items-center gap-1"><ImageIcon className="w-3 h-3" /> OG Image URL</Label>
            <Input value={seo.ogImage} onChange={e => handleChange('ogImage', e.target.value)} />
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-xl border border-[#94A3B8]/30 space-y-4">
        <h2 className="font-bold text-lg text-[#0B1F33] flex items-center gap-2"><Hash className="w-5 h-5" /> Analytics & Tracking</h2>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Google Analytics ID</Label>
            <Input value={seo.googleAnalyticsId} onChange={e => handleChange('googleAnalyticsId', e.target.value)} placeholder="G-XXXXXXXXXX" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Facebook Pixel ID</Label>
            <Input value={seo.facebookPixelId} onChange={e => handleChange('facebookPixelId', e.target.value)} placeholder="1234567890" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Google Maps API Key</Label>
            <Input value={seo.googleMapsApiKey} onChange={e => handleChange('googleMapsApiKey', e.target.value)} type="password" />
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-xl border border-[#94A3B8]/30 space-y-4">
        <h2 className="font-bold text-lg text-[#0B1F33] flex items-center gap-2"><FileText className="w-5 h-5" /> Per-Page SEO</h2>
        <div className="bg-[#F8FAFC] rounded-lg p-4">
          <p className="text-sm text-[#44474c]">Individual page SEO settings are controlled in the page content. The site title and description set above are used as defaults across all pages.</p>
          <p className="text-sm text-[#44474c] mt-2">Product pages auto-generate SEO data from their name, SKU, and description fields.</p>
        </div>
      </section>
    </div>
  );
}
