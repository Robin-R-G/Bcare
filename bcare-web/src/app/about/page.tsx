'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Award, Factory, Users, Clock, CheckCircle2, Target, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY_DETAILS } from '@/lib/constants/company';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const stats = [
  { number: '15+', label: 'Years of Experience', icon: Clock },
  { number: '500+', label: 'Clients Served', icon: Users },
  { number: '30+', label: 'Product Models', icon: Award },
  { number: '2', label: 'Trusted Brands', icon: ShieldCheck },
];

const strengths = [
  { icon: Factory, title: 'In-House Manufacturing', desc: 'Our own manufacturing facility equipped with essential tools, machines, and technology to produce high-quality bakery and kitchen equipment.' },
  { icon: ShieldCheck, title: 'Quality Control Unit', desc: 'Every product undergoes rigorous quality checks on design, quality, and finish parameters before dispatch.' },
  { icon: Award, title: 'Trusted Brands', desc: 'We operate under two trusted brands — EUROPYA for premium imported-grade equipment and BCARE for our in-house manufactured line.' },
  { icon: Users, title: 'Expert Team', desc: 'Our team of highly skilled and experienced professionals is divided into operational units, each specializing in their area of expertise.' },
  { icon: Target, title: 'Client-Centric Approach', desc: 'We understand the unique requirements of each client and deliver solutions that match their specific workflow and volume needs.' },
  { icon: CheckCircle2, title: 'International Quality Standards', desc: 'We adhere to international quality standards in manufacturing, ensuring every product meets the highest benchmarks.' },
];

const timeline = [
  { year: '2010', title: 'Founded', desc: 'BCare established in Nadathara, Thrissur, Kerala with a vision to serve the commercial bakery and kitchen equipment market.' },
  { year: '2015', title: 'EUROPYA Brand Launch', desc: 'Introduced the EUROPYA brand of bakery equipment, expanding our product range with premium mixers, ovens, and processing equipment.' },
  { year: '2020', title: 'Expanded Distribution', desc: 'Expanded our reach across Kerala and South India, serving hotels, bakeries, restaurants, and food production facilities.' },
  { year: '2024', title: 'Digital Presence', desc: 'Launched our online catalogue to make it easier for clients across India to browse and enquire about our complete product range.' },
];

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-[#0b1f33] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F97316] rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <motion.div {...fadeInUp} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="text-[#F97316] font-label-sm text-xs uppercase tracking-[0.2em] font-semibold mb-3 block">About Us</span>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-6">About BCare Bakery &amp; Kitchen Equipments</h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Established in 2010, we are a leading manufacturer and trader of commercial bakery and kitchen equipment based in Nadathara, Thrissur, Kerala.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop bg-white border-b border-[#94A3B8]/30">
        <div className="max-w-container-max mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 border border-[#94A3B8]/30 rounded-lg hover:shadow-md transition-all"
            >
              <stat.icon className="w-8 h-8 text-[#F97316] mx-auto mb-3" />
              <span className="font-heading text-3xl font-extrabold text-[#0b1f33] block mb-1">{stat.number}</span>
              <span className="text-[11px] text-[#44474c] uppercase tracking-widest font-semibold">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
              <span className="text-[#F97316] font-label-sm text-xs uppercase tracking-[0.2em] font-semibold mb-3 block">Our Story</span>
              <h2 className="font-heading text-3xl font-extrabold text-[#0b1f33] mb-6">Building Kitchens That Build Businesses</h2>
              <p className="text-[#44474c] leading-relaxed mb-4">
                Established in the year 2010, BCare is a manufacturer and trader of a wide spectrum of bakery equipment, commercial kitchen equipment, and food processing machinery. We supply premium-grade products using materials procured from authentic vendors of the market.
              </p>
              <p className="text-[#44474c] leading-relaxed mb-4">
                Under the valuable guidance of our Managing Director, Mr. A Abraham, we have grown at a notable rate in the market. His years of rich industrial experience enable us to understand the varied requirements of our clients.
              </p>
              <p className="text-[#44474c] leading-relaxed mb-6">
                We offer our products at reasonable rates and deliver within the promised time-frame. Our in-house quality control unit ensures every product meets defined parameters of design, quality, and finish.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button className="bg-[#F97316] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#F97316]/90">
                    View Our Products
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-[#0b1f33] text-[#0b1f33] font-semibold px-6 py-3 rounded-lg hover:bg-[#0b1f33]/5">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#F8FAFC] p-8 rounded-xl border border-[#94A3B8]/30"
            >
              <h3 className="font-heading font-bold text-lg text-[#0b1f33] mb-6">Company Factsheet</h3>
              <div className="space-y-4">
                {[
                  { label: 'Established', value: '2010' },
                  { label: 'Managing Director', value: COMPANY_DETAILS.managingDirector },
                  { label: 'Business Nature', value: 'Trader - Retailer & Manufacturer' },
                  { label: 'Legal Status', value: 'Partnership' },
                  { label: 'Team Size', value: '11-25 Employees' },
                  { label: 'GST Registered', value: 'Yes' },
                  { label: 'Location', value: 'Nadathara, Thrissur, Kerala' },
                  { label: 'Brands', value: 'EUROPYA, BCARE' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between py-2 border-b border-[#94A3B8]/20">
                    <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider font-semibold">{item.label}</span>
                    <span className="text-sm font-semibold text-[#0b1f33]">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#F8FAFC] border-y border-[#94A3B8]/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div {...fadeInUp} transition={{ duration: 0.5 }} className="bg-white p-8 rounded-xl border border-[#94A3B8]/30">
              <Target className="w-10 h-10 text-[#F97316] mb-4" />
              <h3 className="font-heading text-xl font-extrabold text-[#0b1f33] mb-3">Our Mission</h3>
              <p className="text-[#44474c] leading-relaxed">
                To empower the culinary industry with robust, efficient, and innovative equipment solutions. We strive to be the backbone of every successful kitchen — from small boutique bakeries to large-scale industrial catering facilities.
              </p>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.1 }} className="bg-white p-8 rounded-xl border border-[#94A3B8]/30">
              <Eye className="w-10 h-10 text-[#F97316] mb-4" />
              <h3 className="font-heading text-xl font-extrabold text-[#0b1f33] mb-3">Our Vision</h3>
              <p className="text-[#44474c] leading-relaxed">
                To be the most trusted partner for commercial bakery and kitchen equipment in South India, recognized for quality, reliability, and exceptional after-sales support.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Strengths */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#F97316] font-label-sm text-xs uppercase tracking-[0.2em] font-semibold mb-3 block">Why Choose Us</span>
            <h2 className="font-heading text-3xl font-extrabold text-[#0b1f33] mb-4">Business Strengths</h2>
            <p className="text-[#44474c] text-lg max-w-2xl mx-auto">We have directed all our hard work in accomplishing a top-notch stature by delivering a supreme variety of products.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strengths.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white p-6 rounded-xl border border-[#94A3B8]/30 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-[#0b1f33]/5 text-[#0b1f33] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#0b1f33] group-hover:text-white transition-all">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-base text-[#0b1f33] mb-2">{item.title}</h3>
                <p className="text-[#44474c] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-[#0b1f33]">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-12">
            <span className="text-[#F97316] font-label-sm text-xs uppercase tracking-[0.2em] font-semibold mb-3 block">Our Journey</span>
            <h2 className="font-heading text-3xl font-extrabold text-white mb-4">Business Journey</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-6 rounded-xl"
              >
                <span className="text-[#F97316] font-heading text-2xl font-extrabold block mb-2">{item.year}</span>
                <h3 className="text-white font-heading font-bold text-base mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#F97316] font-label-sm text-xs uppercase tracking-[0.2em] font-semibold mb-3 block">Industries</span>
            <h2 className="font-heading text-3xl font-extrabold text-[#0b1f33] mb-4">Industries We Serve</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {COMPANY_DETAILS.industries.map((industry, i) => (
              <motion.div
                key={industry}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#F8FAFC] border border-[#94A3B8]/30 rounded-lg p-4 text-center hover:border-[#F97316]/40 hover:shadow-sm transition-all"
              >
                <span className="text-sm font-semibold text-[#0b1f33]">{industry}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-[#F8FAFC] border-t border-[#94A3B8]/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="bg-white rounded-xl border border-[#94A3B8]/30 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-heading text-2xl font-extrabold text-[#0b1f33] mb-2">Partner With BCare</h2>
              <p className="text-[#44474c]">Get in touch to discuss your bakery or kitchen equipment requirements.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button className="bg-[#F97316] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#F97316]/90">
                  Get in Touch
                </Button>
              </Link>
              <a href={`https://wa.me/${COMPANY_DETAILS.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-[#25D366] text-[#25D366] font-semibold px-6 py-3 rounded-lg hover:bg-[#25D366]/5">
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
