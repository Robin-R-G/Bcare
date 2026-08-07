'use client';

import React, { useState } from 'react';
import { X, Download, CheckCircle2, MessageCircle } from 'lucide-react';
import { useB2B } from '@/context/B2BContext';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { COMPANY_DETAILS } from '@/lib/constants/company';

export function BrochureDownloadModal() {
  const { brochureModalProduct, setBrochureModalProduct } = useB2B();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
  });

  if (!brochureModalProduct) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;

    setSubmitted(true);

    // Trigger brochure download if URL exists or fallback dummy PDF
    const link = document.createElement('a');
    link.href = brochureModalProduct.brochureUrl || '/logo.webp';
    link.download = `${brochureModalProduct.slug}-brochure.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClose = () => {
    setBrochureModalProduct(null);
    setSubmitted(false);
    setFormData({ name: '', company: '', phone: '', email: '' });
  };

  const generateWhatsappMsg = () => {
    return encodeURIComponent(
      `Hello BCare Bakery & Kitchen Equipments,\n\nI just requested the official product brochure for:\n${brochureModalProduct.name}\n\nName: ${formData.name}\nCompany: ${formData.company || 'N/A'}\nPhone: ${formData.phone}\n\nPlease share further pricing and availability details.\n\nThank you.`
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-on-surface">Download Catalogue</h3>
              <p className="text-xs text-on-surface-variant line-clamp-1">{brochureModalProduct.name}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-bold text-xl text-on-surface">Brochure Download Started!</h4>
              <p className="text-sm text-on-surface-variant max-w-sm mx-auto">
                Thank you, <strong>{formData.name}</strong>. The technical specifications and brochure for{' '}
                <strong>{brochureModalProduct.name}</strong> have been downloaded to your device.
              </p>

              <div className="pt-4 border-t border-outline-variant/30 flex flex-col gap-3">
                <a
                  href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=${generateWhatsappMsg()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-[#25D366] text-white hover:bg-emerald-600 font-semibold h-12 rounded-xl gap-2 shadow">
                    <MessageCircle className="w-5 h-5" /> Connect with Sales on WhatsApp
                  </Button>
                </a>
                <Button variant="outline" onClick={handleClose} className="w-full h-11 rounded-xl">
                  Close Window
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-on-surface-variant">
                Please enter your contact details to download the complete technical catalogue and spec sheet for{' '}
                <strong className="text-on-surface">{brochureModalProduct.name}</strong>.
              </p>

              <div className="space-y-1">
                <Label htmlFor="brochure-name" className="text-xs font-semibold">Full Name *</Label>
                <Input
                  id="brochure-name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Abraham"
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="brochure-company" className="text-xs font-semibold">Company / Bakery Name</Label>
                <Input
                  id="brochure-company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Royal Bakers & Confectionery"
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="brochure-phone" className="text-xs font-semibold">Phone / WhatsApp *</Label>
                  <Input
                    id="brochure-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 94470 51430"
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="brochure-email" className="text-xs font-semibold">Business Email *</Label>
                  <Input
                    id="brochure-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@royalbakers.com"
                    className="h-11 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-3">
                <Button
                  type="submit"
                  className="w-full bg-[#F97316] text-white hover:bg-orange-600 font-semibold text-sm h-12 rounded-xl shadow gap-2"
                >
                  <Download className="w-4 h-4" /> Download Official Brochure (PDF)
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
