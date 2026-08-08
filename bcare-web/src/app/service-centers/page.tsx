import { MapPin, Phone, Clock, Wrench } from 'lucide-react';
import { COMPANY_DETAILS } from '@/lib/constants/company';

export default function ServiceCentersPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="bg-white border-b border-outline-variant/30 py-16">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <h1 className="font-heading text-4xl font-extrabold text-primary mb-4">Service Centers</h1>
          <p className="text-on-surface-variant text-lg">Sales, installation and after-sales service for bakery and kitchen equipment across Kerala, operated from our Thrissur base.</p>
        </div>
      </section>

      <section className="py-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Thrissur HQ */}
          <div className="bg-white p-6 rounded-xl border-2 border-primary/30 shadow-sm relative">
            <span className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">Headquarters</span>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-primary">Thrissur</h3>
                <p className="text-on-surface-variant text-sm mt-1">{COMPANY_DETAILS.address.full}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-on-surface-variant border-t border-outline-variant/30 pt-4">
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> {COMPANY_DETAILS.phone}</div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Mon-Sat: 9:00 AM - 6:00 PM</div>
            </div>
          </div>

          {/* Service coverage — BCare operates from a single Thrissur location and
              travels to customer sites across Kerala. */}
          <div className="bg-white p-6 rounded-xl border border-outline-variant/30 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-primary">On-Site Service Across Kerala</h3>
                <p className="text-on-surface-variant text-sm mt-1">
                  Our engineers travel to your premises for installation, commissioning and
                  breakdown support anywhere in Kerala.
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-on-surface-variant border-t border-outline-variant/30 pt-4">
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> {COMPANY_DETAILS.phoneAlt}</div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Mon-Sat: 9:00 AM - 6:00 PM</div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-surface-container-low p-8 rounded-xl text-center max-w-2xl mx-auto">
          <h3 className="font-heading font-bold text-lg text-primary mb-2">Need Service Support?</h3>
          <p className="text-on-surface-variant text-sm">
            Contact our central support line at <strong>{COMPANY_DETAILS.phone}</strong> or email <strong>{COMPANY_DETAILS.email}</strong> for immediate assistance.
          </p>
        </div>
      </section>
    </div>
  );
}
