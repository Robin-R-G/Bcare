import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { COMPANY_DETAILS } from '@/lib/constants/company';

export default function WarrantyPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="bg-white border-b border-outline-variant/30 py-16">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="font-heading text-4xl font-extrabold text-primary mb-4">Warranty Information</h1>
          <p className="text-on-surface-variant text-lg">Our commitment to quality backed by comprehensive warranty coverage.</p>
        </div>
      </section>

      <section className="py-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-xl border border-outline-variant/30 shadow-sm">
            <h2 className="font-heading font-bold text-xl text-primary mb-4">Standard Warranty</h2>
            <ul className="space-y-3">
              {[
                '1-year comprehensive warranty on all manufactured equipment',
                'Covers manufacturing defects in materials and workmanship',
                'Free replacement of defective parts during warranty period',
                'On-site service visits within 48 hours of reported issue',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-on-surface-variant text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl border border-outline-variant/30 shadow-sm">
            <h2 className="font-heading font-bold text-xl text-primary mb-4">Extended Coverage</h2>
            <ul className="space-y-3">
              {[
                'Extended warranty plans available up to 3 years',
                'Annual Maintenance Contracts (AMCs) for ongoing support',
                'Priority response time for AMC customers',
                'Comprehensive parts and labor coverage options',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-on-surface-variant text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-surface-container-low p-8 rounded-xl text-center max-w-3xl mx-auto">
          <h3 className="font-heading font-bold text-lg text-primary mb-2">Warranty Claims</h3>
          <p className="text-on-surface-variant text-sm mb-4">
            To file a warranty claim or inquire about extended coverage, please contact our service team.
          </p>
          <p className="text-on-surface-variant text-sm">
            Phone: <strong>{COMPANY_DETAILS.phone}</strong> | Email: <strong>{COMPANY_DETAILS.email}</strong>
          </p>
        </div>
      </section>
    </div>
  );
}
