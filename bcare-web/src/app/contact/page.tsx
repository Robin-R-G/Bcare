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

import { COMPANY_DETAILS } from '@/lib/constants/company';
import { submitContactMessage } from '@/lib/supabase/mutations';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await submitContactMessage(data);
      alert('Thank you for contacting BCare. Our team in Thrissur will get back to you shortly.');
      reset();
    } catch (err) {
      console.error(err);
      alert('Failed to send message. Please reach us directly via WhatsApp.');
    }
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
            <h1 className="font-display-lg text-display-lg text-primary mb-6">Contact Us</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              {COMPANY_DETAILS.positioningText}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-section-padding">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-headline-lg text-headline-lg text-primary mb-8">Get In Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center text-surface-tint shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-title-md text-title-md text-on-surface mb-1">Primary Headquarters</h3>
                    <p className="text-on-surface-variant font-body-md text-body-md">
                      {COMPANY_DETAILS.address.full}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center text-surface-tint shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-title-md text-title-md text-on-surface mb-1">Phone / WhatsApp</h3>
                    <p className="text-on-surface-variant font-body-md text-body-md">
                      {COMPANY_DETAILS.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center text-surface-tint shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-title-md text-title-md text-on-surface mb-1">Email</h3>
                    <p className="text-on-surface-variant font-body-md text-body-md">
                      {COMPANY_DETAILS.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center text-surface-tint shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-title-md text-title-md text-on-surface mb-1">Working Hours</h3>
                    <p className="text-on-surface-variant font-body-md text-body-md">
                      Monday - Saturday: 9:00 AM - 6:00 PM<br />
                      <span className="text-error font-medium">Sunday: Closed</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-surface-container-lowest p-8 rounded-2xl shadow-ambient border border-outline-variant/30"
            >
              <h3 className="font-title-md text-title-md text-primary mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" {...register('name')} placeholder="John Doe" className={errors.name ? 'border-error' : ''} />
                    {errors.name && <p className="text-error text-sm">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" {...register('email')} placeholder="john@example.com" className={errors.email ? 'border-error' : ''} />
                    {errors.email && <p className="text-error text-sm">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" {...register('phone')} placeholder="+91 98765 43210" className={errors.phone ? 'border-error' : ''} />
                    {errors.phone && <p className="text-error text-sm">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name (Optional)</Label>
                    <Input id="company" {...register('company')} placeholder="Your Business" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea id="message" {...register('message')} placeholder="Tell us about your requirements..." className={`min-h-[120px] ${errors.message ? 'border-error' : ''}`} />
                  {errors.message && <p className="text-error text-sm">{errors.message.message}</p>}
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary-container text-white h-12">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
