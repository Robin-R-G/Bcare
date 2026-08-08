import { COMPANY_DETAILS } from '@/lib/constants/company';

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="bg-white border-b border-outline-variant/30 py-16">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <h1 className="font-heading text-4xl font-extrabold text-primary mb-4">Privacy Policy</h1>
          <p className="text-on-surface-variant text-sm">Last updated: January 2024</p>
        </div>
      </section>

      <section className="py-12 px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto">
        <div className="prose prose-slate max-w-none space-y-8 text-on-surface-variant font-body-md text-body-md leading-relaxed">
          <div>
            <h2 className="font-heading font-bold text-xl text-primary mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly, such as your name, email address, phone number, and business details when you submit a consultation request, contact form, or request a quote.</p>
          </div>

          <div>
            <h2 className="font-heading font-bold text-xl text-primary mb-3">2. How We Use Your Information</h2>
            <p>We use the information to respond to your inquiries, provide equipment recommendations, process orders, and send relevant updates about our products and services. We do not sell or share your personal data with third parties for marketing purposes.</p>
          </div>

          <div>
            <h2 className="font-heading font-bold text-xl text-primary mb-3">3. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          </div>

          <div>
            <h2 className="font-heading font-bold text-xl text-primary mb-3">4. Cookies</h2>
            <p>Our website may use cookies to enhance your browsing experience. You can control cookie preferences through your browser settings.</p>
          </div>

          <div>
            <h2 className="font-heading font-bold text-xl text-primary mb-3">5. Contact Us</h2>
            <p>For questions about this Privacy Policy, please contact us at <strong>{COMPANY_DETAILS.email}</strong> or visit our <a href="/contact" className="text-primary underline hover:text-primary-container">Contact page</a>.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
