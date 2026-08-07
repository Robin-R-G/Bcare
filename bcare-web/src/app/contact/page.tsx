'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { COMPANY_DETAILS } from '@/lib/constants/company';
import { submitContactMessage } from '@/lib/supabase/mutations';
import { products } from '@/lib/data/mock';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

function ContactForm() {
  const searchParams = useSearchParams();
  const productSlug = searchParams.get('product');
  const product = productSlug ? products.find(p => p.slug === productSlug) : null;

  const defaultMessage = product
    ? `I would like to request a quotation for:\n\nProduct: ${product.name}\nSKU: ${product.sku}\n\nPlease provide pricing, availability, and delivery details.`
    : '';

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: defaultMessage,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await submitContactMessage(data);
      alert('Thank you for contacting BCare. Our team will get back to you shortly.');
      reset();
    } catch {
      const msg = encodeURIComponent(`Hello BCare, I'm ${data.name} (${data.company || 'N/A'}). ${data.message}`);
      window.open(`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=${msg}`, '_blank');
      reset();
    }
  };

  return (
    <div className="bg-background min-h-screen pb-16">
      {/* Header */}
      <section className="bg-white border-b border-[#94A3B8]/30 py-16 text-center">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
          {product && (
            <div className="inline-flex items-center gap-2 bg-[#F97316]/10 text-[#F97316] text-sm font-semibold px-4 py-2 rounded-full mb-4">
              Quotation for: {product.name}
            </div>
          )}
          <h1 className="font-heading text-4xl font-extrabold text-[#0B1F33] mb-4">
            Contact BCare Solutions
          </h1>
          <p className="font-body-lg text-[#44474c]">
            {COMPANY_DETAILS.positioningText}
          </p>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="font-heading text-2xl font-extrabold text-[#0B1F33] mb-8">Get In Touch</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#0B1F33]/10 text-[#0B1F33] rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-[#0B1F33] mb-1">Primary Headquarters</h3>
                  <p className="text-[#44474c] font-body-md text-sm leading-relaxed">
                    {COMPANY_DETAILS.address.full}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#0B1F33]/10 text-[#0B1F33] rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-[#0B1F33] mb-1">Phone / WhatsApp</h3>
                  <p className="text-[#44474c] font-body-md text-sm">
                    {COMPANY_DETAILS.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#0B1F33]/10 text-[#0B1F33] rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-[#0B1F33] mb-1">Email</h3>
                  <p className="text-[#44474c] font-body-md text-sm">
                    {COMPANY_DETAILS.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#0B1F33]/10 text-[#0B1F33] rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-[#0B1F33] mb-1">Working Hours</h3>
                  <p className="text-[#44474c] font-body-md text-sm">
                    Monday - Saturday: 9:00 AM - 6:00 PM<br />
                    <span className="text-red-600 font-semibold">Sunday: Closed</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-xl border border-[#94A3B8]/30 shadow-sm"
          >
            <h3 className="font-heading font-bold text-lg text-[#0B1F33] mb-6">
              {product ? `Request Quote for ${product.name}` : 'Send us a Message'}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-xs font-semibold">Full Name *</Label>
                  <Input id="name" {...register('name')} placeholder="John Doe" className={errors.name ? 'border-red-600' : 'border-[#94A3B8]/40'} />
                  {errors.name && <p className="text-red-600 text-xs">{errors.name.message}</p>}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-xs font-semibold">Email Address *</Label>
                  <Input id="email" type="email" {...register('email')} placeholder="john@example.com" className={errors.email ? 'border-red-600' : 'border-[#94A3B8]/40'} />
                  {errors.email && <p className="text-red-600 text-xs">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="phone" className="text-xs font-semibold">Phone Number *</Label>
                  <Input id="phone" type="tel" {...register('phone')} placeholder="+91 98765 43210" className={errors.phone ? 'border-red-600' : 'border-[#94A3B8]/40'} />
                  {errors.phone && <p className="text-red-600 text-xs">{errors.phone.message}</p>}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="company" className="text-xs font-semibold">Company Name</Label>
                  <Input id="company" {...register('company')} placeholder="Your Business" className="border-[#94A3B8]/40" />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="message" className="text-xs font-semibold">Message *</Label>
                <Textarea id="message" {...register('message')} placeholder="Tell us about your bakery or kitchen requirements..." className={`min-h-[120px] ${errors.message ? 'border-red-600' : 'border-[#94A3B8]/40'}`} />
                {errors.message && <p className="text-red-600 text-xs">{errors.message.message}</p>}
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-[#F97316] text-white hover:bg-[#F97316]/90 h-11 font-bold">
                {isSubmitting ? 'Sending...' : product ? 'Request Quote' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ContactForm />
    </Suspense>
  );
}
