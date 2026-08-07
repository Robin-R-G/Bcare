'use client';

import { useState } from 'react';
import { COMPANY_DETAILS } from '@/lib/constants/company';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Building2, Phone, MapPin, Globe, Share2, ExternalLink } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    companyName: COMPANY_DETAILS.name,
    tagline: COMPANY_DETAILS.tagline,
    phone: COMPANY_DETAILS.phone,
    whatsapp: COMPANY_DETAILS.whatsapp,
    email: COMPANY_DETAILS.email,
    address: COMPANY_DETAILS.address.full,
    city: COMPANY_DETAILS.address.city,
    state: COMPANY_DETAILS.address.state,
    pincode: COMPANY_DETAILS.address.pincode,
    established: COMPANY_DETAILS.established,
    md: COMPANY_DETAILS.managingDirector,
    website: COMPANY_DETAILS.website,
    instagram: COMPANY_DETAILS.instagram,
    indiamart: COMPANY_DETAILS.indiamart,
    gst: COMPANY_DETAILS.gst,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      localStorage.setItem('bcare_settings', JSON.stringify(settings));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F33]">Settings</h1>
          <p className="text-[#44474c] text-sm mt-1">Manage company information and site preferences.</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-[#0B1F33] text-white hover:bg-[#0B1F33]/90 font-semibold px-6">
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Settings'}
        </Button>
      </div>

      {/* Company Info */}
      <section className="bg-white p-6 rounded-xl border border-[#94A3B8]/30 space-y-4">
        <h2 className="font-bold text-lg text-[#0B1F33] flex items-center gap-2"><Building2 className="w-5 h-5" /> Company Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Company Name</Label>
            <Input value={settings.companyName} onChange={e => handleChange('companyName', e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Tagline</Label>
            <Input value={settings.tagline} onChange={e => handleChange('tagline', e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Established</Label>
            <Input value={settings.established} onChange={e => handleChange('established', e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Managing Director</Label>
            <Input value={settings.md} onChange={e => handleChange('md', e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold">GST Number</Label>
            <Input value={settings.gst} onChange={e => handleChange('gst', e.target.value)} />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-white p-6 rounded-xl border border-[#94A3B8]/30 space-y-4">
        <h2 className="font-bold text-lg text-[#0B1F33] flex items-center gap-2"><Phone className="w-5 h-5" /> Contact Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Phone</Label>
            <Input value={settings.phone} onChange={e => handleChange('phone', e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold">WhatsApp</Label>
            <Input value={settings.whatsapp} onChange={e => handleChange('whatsapp', e.target.value)} />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Label className="text-xs font-semibold">Email</Label>
            <Input value={settings.email} onChange={e => handleChange('email', e.target.value)} />
          </div>
        </div>
      </section>

      {/* Address */}
      <section className="bg-white p-6 rounded-xl border border-[#94A3B8]/30 space-y-4">
        <h2 className="font-bold text-lg text-[#0B1F33] flex items-center gap-2"><MapPin className="w-5 h-5" /> Address</h2>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Full Address</Label>
            <Textarea value={settings.address} onChange={e => handleChange('address', e.target.value)} rows={2} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label className="text-xs font-semibold">City</Label>
              <Input value={settings.city} onChange={e => handleChange('city', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold">State</Label>
              <Input value={settings.state} onChange={e => handleChange('state', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Pincode</Label>
              <Input value={settings.pincode} onChange={e => handleChange('pincode', e.target.value)} />
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="bg-white p-6 rounded-xl border border-[#94A3B8]/30 space-y-4">
        <h2 className="font-bold text-lg text-[#0B1F33] flex items-center gap-2"><Globe className="w-5 h-5" /> Social & Online Presence</h2>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label className="text-xs font-semibold flex items-center gap-1"><Globe className="w-3 h-3" /> Website</Label>
            <Input value={settings.website} onChange={e => handleChange('website', e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold flex items-center gap-1"><Share2 className="w-3 h-3" /> Instagram</Label>
            <Input value={settings.instagram} onChange={e => handleChange('instagram', e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold flex items-center gap-1"><ExternalLink className="w-3 h-3" /> IndiaMART</Label>
            <Input value={settings.indiamart} onChange={e => handleChange('indiamart', e.target.value)} />
          </div>
        </div>
      </section>
    </div>
  );
}
