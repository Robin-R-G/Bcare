import { COMPANY_DETAILS } from '@/lib/constants/company';
import { MapPin, Phone, Mail, Clock, MessageCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';


export default function ThrissurLocationPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Header */}
      <section className="bg-surface-container-low py-20 border-b border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-3xl">
            <span className="bg-primary/10 text-primary font-label-sm text-xs px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-4">
              <ShieldCheck className="w-4 h-4" /> Verified Primary Headquarters
            </span>
            <h1 className="font-display-lg text-display-lg text-primary mb-6">
              Commercial Kitchen & Bakery Equipment Supplier in Thrissur
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
              {COMPANY_DETAILS.positioningText}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={`https://wa.me/${COMPANY_DETAILS.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 h-12 px-6">
                  <MessageCircle className="w-5 h-5" /> WhatsApp Thrissur Office
                </Button>
              </a>
              <a href={`tel:${COMPANY_DETAILS.phone}`}>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary-container h-12 px-6 gap-2">
                  <Phone className="w-5 h-5" /> Call Thrissur Office
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details Grid */}
      <section className="py-section-padding">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Contact Card */}
            <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 shadow-ambient space-y-6">
              <h2 className="font-title-md text-xl font-bold text-primary">Office Details</h2>
              
              <div className="space-y-4 text-sm text-on-surface-variant">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-on-surface block mb-1">Physical Address</strong>
                    <p>{COMPANY_DETAILS.address.full}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-outline-variant/30">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-on-surface block mb-1">Operating Hours</strong>
                    <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                    <p className="text-error font-medium">Sunday: Closed</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-outline-variant/30">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-on-surface block mb-1">Phone Number</strong>
                    <p>{COMPANY_DETAILS.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-outline-variant/30">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-on-surface block mb-1">Email Address</strong>
                    <p>{COMPANY_DETAILS.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content & Coverage */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 shadow-ambient space-y-4">
                <h2 className="font-title-md text-2xl font-bold text-primary">About Our Thrissur Operations</h2>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  {COMPANY_DETAILS.aboutBrief}
                </p>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Located conveniently at Mudikode Junction opposite the temple, our Thrissur headquarters serves as our central hub for equipment planning, stainless steel custom fabrication design, customer consultations, and after-sales support.
                </p>
              </div>

              {/* Service Capabilities */}
              <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 shadow-ambient space-y-4">
                <h3 className="font-title-md text-xl font-bold text-primary">Services Provided from Thrissur</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Bakery Machinery Supply & Setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Commercial Kitchen Layout Planning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Stainless Steel 304 Custom Fabrication</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Refrigeration & Cold Storage Solutions</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
