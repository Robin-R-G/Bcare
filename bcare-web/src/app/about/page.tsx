'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Award, Factory, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-surface-container-low overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="font-display-lg text-display-lg text-primary mb-6">About BCare</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Since our inception, BCare has been at the forefront of the commercial kitchen and bakery equipment industry in Kerala. We blend engineering excellence with deep culinary understanding to deliver solutions that stand the test of time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats/Values */}
      <section className="py-section-padding">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 bg-surface-container-lowest rounded-2xl shadow-ambient text-center"
            >
              <Factory className="w-12 h-12 text-surface-tint mx-auto mb-4" />
              <h3 className="font-title-md text-title-md mb-2 text-on-surface">Own Manufacturing</h3>
              <p className="text-on-surface-variant font-body-md text-body-md">State-of-the-art facility for custom SS fabrication.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-surface-container-lowest rounded-2xl shadow-ambient text-center"
            >
              <ShieldCheck className="w-12 h-12 text-surface-tint mx-auto mb-4" />
              <h3 className="font-title-md text-title-md mb-2 text-on-surface">Premium Quality</h3>
              <p className="text-on-surface-variant font-body-md text-body-md">Uncompromising standards in every product we deliver.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 bg-surface-container-lowest rounded-2xl shadow-ambient text-center"
            >
              <Users className="w-12 h-12 text-surface-tint mx-auto mb-4" />
              <h3 className="font-title-md text-title-md mb-2 text-on-surface">Expert Team</h3>
              <p className="text-on-surface-variant font-body-md text-body-md">Engineers and technicians with decades of experience.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-8 bg-surface-container-lowest rounded-2xl shadow-ambient text-center"
            >
              <Award className="w-12 h-12 text-surface-tint mx-auto mb-4" />
              <h3 className="font-title-md text-title-md mb-2 text-on-surface">Certified</h3>
              <p className="text-on-surface-variant font-body-md text-body-md">Meeting all industry safety and hygiene standards.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-section-padding bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-headline-xl text-headline-xl text-primary mb-6">Our Mission</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
                To empower the culinary industry with robust, efficient, and innovative equipment solutions. We strive to be the backbone of every successful kitchen, from small boutique bakeries to large-scale industrial catering facilities.
              </p>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                Our approach is rooted in understanding the unique workflows of each client, allowing us to design spaces and provide equipment that not only fits perfectly but enhances productivity and safety.
              </p>
              <Button size="lg" className="bg-[#0A4A7A] text-white">Meet Our Team</Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-ambient"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000&auto=format&fit=crop')" }}
              ></div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
