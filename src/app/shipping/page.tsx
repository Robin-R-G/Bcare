import { Truck, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { COMPANY_DETAILS } from '@/lib/constants/company';

export default function ShippingPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="bg-white border-b border-outline-variant/30 py-16">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Truck className="w-8 h-8" />
          </div>
          <h1 className="font-heading text-4xl font-extrabold text-primary mb-4">Shipping & Delivery</h1>
          <p className="text-on-surface-variant text-lg">Information about our equipment delivery and installation logistics across Kerala.</p>
        </div>
      </section>

      <section className="py-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl border border-outline-variant/30 shadow-sm text-center">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-primary mb-2">Safe Transport</h3>
            <p className="text-on-surface-variant text-sm">All equipment is professionally packed and transported using climate-controlled vehicles to prevent damage.</p>
          </div>
          <div className="bg-white p-8 rounded-xl border border-outline-variant/30 shadow-sm text-center">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-primary mb-2">Pan-Kerala Delivery</h3>
            <p className="text-on-surface-variant text-sm">We deliver and install equipment across all districts in Kerala, with dedicated logistics partners.</p>
          </div>
          <div className="bg-white p-8 rounded-xl border border-outline-variant/30 shadow-sm text-center">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-primary mb-2">Scheduled Installation</h3>
            <p className="text-on-surface-variant text-sm">Delivery is coordinated with our installation team for same-day setup where possible.</p>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-xl border border-outline-variant/30 shadow-sm max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-2xl text-primary mb-6">Delivery Process</h2>
          <div className="space-y-4">
            {[
              'Order confirmation and production timeline shared within 24 hours.',
              'Pre-delivery site survey for installation readiness.',
              'Equipment transported from our Thrissur manufacturing facility.',
              'On-site installation, calibration, and quality check by our engineers.',
              'Operator training and handover with documentation.',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-on-surface-variant text-sm">{step}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-on-surface-variant text-sm">
            For delivery inquiries, contact us at <strong>{COMPANY_DETAILS.phone}</strong> or email <strong>{COMPANY_DETAILS.email}</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}
