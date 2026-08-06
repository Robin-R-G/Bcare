'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What areas do you serve?",
        a: "We design, manufacture, supply, and install commercial kitchen and bakery equipment across all of Kerala. We also take up special projects in neighboring states based on the scope."
      },
      {
        q: "Do you provide warranties on your equipment?",
        a: "Yes, all our manufactured equipment comes with a standard 1-year warranty against manufacturing defects. We also offer extended warranties and Annual Maintenance Contracts (AMCs) for complete peace of mind."
      }
    ]
  },
  {
    category: "Services",
    questions: [
      {
        q: "Do you help with kitchen planning and layout design?",
        a: "Absolutely. Our expert engineers provide comprehensive CAD designs and 3D modeling to optimize your kitchen space for workflow efficiency and hygiene compliance before any manufacturing begins."
      },
      {
        q: "How long does installation take?",
        a: "Installation timelines vary based on the project size. A standard restaurant kitchen setup usually takes 3-5 days, whereas large industrial canteens or hotels may take 2-4 weeks. We provide a detailed schedule during the consultation phase."
      }
    ]
  },
  {
    category: "Products & Manufacturing",
    questions: [
      {
        q: "Do you use food-grade stainless steel?",
        a: "Yes, we exclusively use premium SS 304 food-grade stainless steel for all food contact surfaces and fabrication, ensuring maximum durability, rust resistance, and hygiene."
      },
      {
        q: "Can you custom manufacture equipment to fit my specific space?",
        a: "Custom fabrication is our specialty. Because we have our own manufacturing facility, we can tailor the dimensions, capacity, and layout of our equipment to fit perfectly into your unique space requirements."
      }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>("0-0");

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-surface-container-low py-20 border-b border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 bg-surface-container text-surface-tint rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8" />
            </div>
            <h1 className="font-display-lg text-display-lg text-primary mb-6">Frequently Asked Questions</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Find answers to common questions about our products, services, and processes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-section-padding">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
          {faqs.map((category, catIndex) => (
            <div key={category.category} className="mb-12">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, qIndex) => {
                  const id = `${catIndex}-${qIndex}`;
                  const isOpen = openIndex === id;
                  return (
                    <motion.div 
                      key={id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="border border-outline-variant/50 rounded-lg overflow-hidden bg-surface-container-lowest"
                    >
                      <button
                        onClick={() => toggleFAQ(id)}
                        className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        aria-expanded={isOpen}
                      >
                        <span className="font-title-md text-title-md text-on-surface">{faq.q}</span>
                        <ChevronDown className={`w-5 h-5 text-on-surface-variant transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="px-6 pb-4 pt-2 text-on-surface-variant font-body-md text-body-md border-t border-outline-variant/30">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-section-padding bg-surface-container-lowest text-center border-t border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h2 className="font-headline-lg text-headline-lg mb-4 text-primary">Still have questions?</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Please chat to our friendly team.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary text-white hover:bg-primary-container font-label-sm px-8 h-12">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
