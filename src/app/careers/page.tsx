'use client';

import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { COMPANY_DETAILS } from '@/lib/constants/company';

// BCare has no vacancies published on IndiaMART. Rather than advertise roles that do
// not exist, the page invites open applications to the real company address.
const jobs: Array<{ id: number; title: string; department: string; location: string; type: string }> = [];

export default function CareersPage() {
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
            <h1 className="font-display-lg text-display-lg text-primary mb-6">Build Your Career With Us</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Join the leading commercial kitchen solutions provider in Kerala. We&apos;re looking for passionate individuals to help us engineer the future of culinary spaces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-section-padding bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Why BCare?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="font-title-md text-title-md text-on-surface mb-3">Industry Leaders</h3>
              <p className="text-on-surface-variant font-body-md text-body-md">
                Work with the best in the business. We set the standard for commercial kitchen equipment in the region.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="font-title-md text-title-md text-on-surface mb-3">Great Work Environment</h3>
              <p className="text-on-surface-variant font-body-md text-body-md">
                A collaborative, supportive, and safe working environment, whether in the office, factory, or on-site.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="font-title-md text-title-md text-on-surface mb-3">Career Growth</h3>
              <p className="text-on-surface-variant font-body-md text-body-md">
                Continuous training and opportunities for advancement as we expand our operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-section-padding">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Open Positions</h2>
              <p className="text-on-surface-variant font-body-lg text-body-lg">Find your next role below.</p>
            </div>
          </div>

          <div className="space-y-4">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-surface-container-lowest p-6 md:p-8 rounded-xl shadow-ambient border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-ambient-hover hover:border-primary-fixed-dim transition-all group"
              >
                <div>
                  <div className="text-sm font-semibold text-surface-tint mb-2 uppercase tracking-wider">{job.department}</div>
                  <h3 className="font-title-md text-title-md text-on-surface mb-4 md:mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 text-on-surface-variant font-body-md text-body-md text-sm">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.type}</span>
                  </div>
                </div>
                <a href={`mailto:${COMPANY_DETAILS.email}?subject=Application: ${job.title}`}>
                  <Button className="shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 bg-surface-container p-8 rounded-2xl text-center border border-outline-variant/50">
            <h3 className="font-title-md text-title-md text-on-surface mb-2">Don&apos;t see a fit?</h3>
            <p className="text-on-surface-variant font-body-md text-body-md mb-6 max-w-lg mx-auto">
              We&apos;re always looking for talented individuals. Send your resume to{' '}
              {COMPANY_DETAILS.email} and we&apos;ll keep you in mind for future openings.
            </p>
            <Link href={`mailto:${COMPANY_DETAILS.email}`}>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                Submit Resume General
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
