export default function TermsPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="bg-white border-b border-outline-variant/30 py-16">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <h1 className="font-heading text-4xl font-extrabold text-primary mb-4">Terms of Service</h1>
          <p className="text-on-surface-variant text-sm">Last updated: January 2024</p>
        </div>
      </section>

      <section className="py-12 px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto">
        <div className="prose prose-slate max-w-none space-y-8 text-on-surface-variant font-body-md text-body-md leading-relaxed">
          <div>
            <h2 className="font-heading font-bold text-xl text-primary mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using the BCare Bakery & Kitchen Equipments website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
          </div>

          <div>
            <h2 className="font-heading font-bold text-xl text-primary mb-3">2. Products and Services</h2>
            <p>All product specifications, images, and descriptions on this website are for informational purposes. BCare reserves the right to modify specifications without prior notice. Custom fabrication terms are governed by individual project agreements.</p>
          </div>

          <div>
            <h2 className="font-heading font-bold text-xl text-primary mb-3">3. Quotations and Pricing</h2>
            <p>Quotations provided via our contact forms or consultation services are valid for 30 days from the date of issue. Final pricing is confirmed only upon signing a formal purchase order or project agreement.</p>
          </div>

          <div>
            <h2 className="font-heading font-bold text-xl text-primary mb-3">4. Intellectual Property</h2>
            <p>All content on this website, including text, images, logos, and design elements, is the property of BCare Bakery & Kitchen Equipments and protected by applicable intellectual property laws.</p>
          </div>

          <div>
            <h2 className="font-heading font-bold text-xl text-primary mb-3">5. Limitation of Liability</h2>
            <p>BCare shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or services. Our liability is limited to the value of the specific product or service in question.</p>
          </div>

          <div>
            <h2 className="font-heading font-bold text-xl text-primary mb-3">6. Contact</h2>
            <p>For questions about these Terms, contact us at <strong>info@bcareequipments.com</strong> or visit our <a href="/contact" className="text-primary underline hover:text-primary-container">Contact page</a>.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
