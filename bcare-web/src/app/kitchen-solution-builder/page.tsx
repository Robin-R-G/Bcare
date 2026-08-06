'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Building2, Utensils, Hotel, Coffee, Flame, Factory, 
  Hospital, School, ChefHat, CheckCircle2, ArrowRight, ArrowLeft,
  Sparkles, PackageCheck
} from 'lucide-react';
import { submitConsultationRequest } from '@/lib/supabase/mutations';

const businessTypes = [
  { id: 'bakery', name: 'Bakery & Confectionery', icon: ChefHat },
  { id: 'restaurant', name: 'Commercial Restaurant', icon: Utensils },
  { id: 'hotel', name: 'Hotel & Hospitality', icon: Hotel },
  { id: 'cafe', name: 'Cafe & Bistro', icon: Coffee },
  { id: 'cloud_kitchen', name: 'Cloud Kitchen', icon: Flame },
  { id: 'catering', name: 'Catering Service', icon: Factory },
  { id: 'hospital', name: 'Hospital & Healthcare', icon: Hospital },
  { id: 'institution', name: 'School / Institution Canteen', icon: School },
];

const requirementTypes = [
  'New Kitchen Setup',
  'Kitchen Expansion',
  'Kitchen Renovation',
  'Equipment Replacement'
];

const sizes = [
  { id: 'small', title: 'Small', desc: 'Up to 500 sq ft' },
  { id: 'medium', title: 'Medium', desc: '500 - 1,500 sq ft' },
  { id: 'large', title: 'Large', desc: '1,500 - 3,500 sq ft' },
  { id: 'industrial', title: 'Industrial Scale', desc: '3,500+ sq ft' },
];

const sections = [
  'Cooking Section',
  'Bakery Section',
  'Preparation Section',
  'Storage Section',
  'Refrigeration & Cold Room',
  'Display & Counter Area',
  'Washing & Dishwashing'
];

export default function KitchenSolutionBuilderPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessType: '',
    requirementType: '',
    kitchenSize: '',
    selectedSections: [] as string[],
    dailyMeals: '',
    bakeryOutput: '',
    name: '',
    company: '',
    phone: '',
    email: '',
    location: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const toggleSection = (section: string) => {
    setFormData(prev => ({
      ...prev,
      selectedSections: prev.selectedSections.includes(section)
        ? prev.selectedSections.filter(s => s !== section)
        : [...prev.selectedSections, section]
    }));
  };

  const handleNext = () => setStep(prev => Math.min(prev + 1, 6));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await submitConsultationRequest({
        name: formData.name,
        company: formData.company,
        business_type: formData.businessType,
        location: formData.location,
        kitchen_size: formData.kitchenSize,
        requirements: `Sections: ${formData.selectedSections.join(', ')} | Requirement: ${formData.requirementType} | Daily Capacity: ${formData.dailyMeals} meals, ${formData.bakeryOutput} kg bakery | Notes: ${formData.notes}`,
      });
      setCompleted(true);
    } catch (err) {
      console.error(err);
      alert('Failed to submit. Please try again or contact us directly on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="bg-primary/10 text-primary font-label-sm text-xs px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Smart Recommendation Tool
          </span>
          <h1 className="font-display-lg text-display-lg text-primary mb-4">Design My Commercial Kitchen</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto">
            Answer a few quick questions to receive a tailored equipment recommendation and expert layout plan.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 shadow-ambient border border-outline-variant/30 relative">
          
          {/* Progress Bar */}
          {!completed && (
            <div className="mb-10">
              <div className="flex items-center justify-between text-xs font-semibold text-on-surface-variant mb-2">
                <span>Step {step} of 6</span>
                <span>{Math.round((step / 6) * 100)}% Completed</span>
              </div>
              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(step / 6) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {!completed ? (
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-title-md text-xl font-bold text-primary mb-6">1. What type of culinary business are you operating?</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {businessTypes.map((item) => {
                      const Icon = item.icon;
                      const isSelected = formData.businessType === item.name;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, businessType: item.name })}
                          className={`p-5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-3 ${
                            isSelected 
                              ? 'border-primary bg-primary/5 text-primary shadow-sm' 
                              : 'border-outline-variant/40 hover:border-primary/50 text-on-surface-variant'
                          }`}
                        >
                          <Icon className="w-8 h-8" />
                          <span className="font-label-sm text-xs font-semibold">{item.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-title-md text-xl font-bold text-primary mb-6">2. What is the scope of your kitchen requirement?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {requirementTypes.map((req) => (
                      <button
                        key={req}
                        type="button"
                        onClick={() => setFormData({ ...formData, requirementType: req })}
                        className={`p-6 rounded-2xl border text-left font-label-md text-base transition-all ${
                          formData.requirementType === req 
                            ? 'border-primary bg-primary/5 text-primary shadow-sm font-bold' 
                            : 'border-outline-variant/40 hover:border-primary/50 text-on-surface'
                        }`}
                      >
                        {req}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-title-md text-xl font-bold text-primary mb-6">3. Select your estimated kitchen footprint size</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {sizes.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, kitchenSize: s.title })}
                        className={`p-5 rounded-2xl border text-left transition-all ${
                          formData.kitchenSize === s.title 
                            ? 'border-primary bg-primary/5 text-primary shadow-sm' 
                            : 'border-outline-variant/40 hover:border-primary/50 text-on-surface-variant'
                        }`}
                      >
                        <h3 className="font-bold text-base text-primary">{s.title}</h3>
                        <p className="text-xs text-on-surface-variant mt-1">{s.desc}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-title-md text-xl font-bold text-primary mb-6">4. Select required kitchen operational sections</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sections.map((sec) => {
                      const isSelected = formData.selectedSections.includes(sec);
                      return (
                        <button
                          key={sec}
                          type="button"
                          onClick={() => toggleSection(sec)}
                          className={`p-5 rounded-2xl border text-left font-label-md text-sm transition-all flex items-center justify-between ${
                            isSelected 
                              ? 'border-primary bg-primary/5 text-primary shadow-sm font-semibold' 
                              : 'border-outline-variant/40 hover:border-primary/50 text-on-surface'
                          }`}
                        >
                          <span>{sec}</span>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-primary" />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-title-md text-xl font-bold text-primary mb-6">5. Expected Daily Production Volume</h2>
                  <div className="space-y-6 max-w-md">
                    <div className="space-y-2">
                      <Label>Expected Daily Customer Servings / Meals</Label>
                      <Input 
                        placeholder="e.g. 300 meals / day" 
                        value={formData.dailyMeals}
                        onChange={(e) => setFormData({ ...formData, dailyMeals: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Bakery Output Capacity (if applicable)</Label>
                      <Input 
                        placeholder="e.g. 50 kg dough / day" 
                        value={formData.bakeryOutput}
                        onChange={(e) => setFormData({ ...formData, bakeryOutput: e.target.value })}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 6 && (
                <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-title-md text-xl font-bold text-primary mb-6">6. Where should we send your custom solution design?</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name *</Label>
                        <Input 
                          required 
                          placeholder="Chef Thomas" 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Company / Business Name</Label>
                        <Input 
                          placeholder="Grand Bakery Ltd" 
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Phone / WhatsApp Number *</Label>
                        <Input 
                          required 
                          placeholder="+91 98765 43210" 
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Location in Kerala / India *</Label>
                        <Input 
                          required 
                          placeholder="Kochi, Thrissur, etc." 
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Additional Notes or Custom Requests</Label>
                      <Input 
                        placeholder="e.g. Need 3D layout planning as well" 
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={submitting} 
                      className="w-full bg-primary hover:bg-primary-container text-white h-12 text-base font-semibold mt-4"
                    >
                      {submitting ? 'Generating Recommended Plan...' : 'Get Tailored Solution Package'}
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <PackageCheck className="w-10 h-10" />
              </div>
              <h2 className="font-display-md text-2xl font-bold text-primary mb-3">Kitchen Requirement Summary Generated!</h2>
              <p className="text-on-surface-variant max-w-lg mx-auto mb-8">
                Based on your business profile ({formData.businessType || 'Commercial Kitchen'}), our engineering team has mapped out the essential equipment matrix. A kitchen design specialist will contact you shortly at {formData.phone}.
              </p>

              <div className="bg-surface-container-low p-6 rounded-2xl max-w-md mx-auto text-left mb-8 border border-outline-variant/30 space-y-3">
                <h3 className="font-title-md font-bold text-primary text-sm uppercase tracking-wider">Suggested Core Equipment Matrix:</h3>
                <ul className="space-y-2 text-sm text-on-surface-variant list-disc pl-5">
                  <li>Heavy-Duty Stainless Steel Prep Tables (304 Grade)</li>
                  <li>Commercial Rotary Rack / Deck Baking System</li>
                  <li>Vertical Ventilation Exhaust & Hood Fabrication</li>
                  <li>High-Yield Refrigeration & Cold Room Storage</li>
                </ul>
              </div>

              <Button onClick={() => setCompleted(false)} variant="outline">
                Start New Calculation
              </Button>
            </motion.div>
          )}

          {/* Navigation Controls */}
          {!completed && (
            <div className="mt-10 pt-6 border-t border-outline-variant/30 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={step === 1}
                className="gap-2 text-on-surface-variant"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>

              {step < 6 && (
                <Button
                  onClick={handleNext}
                  disabled={
                    (step === 1 && !formData.businessType) ||
                    (step === 2 && !formData.requirementType) ||
                    (step === 3 && !formData.kitchenSize) ||
                    (step === 4 && formData.selectedSections.length === 0)
                  }
                  className="bg-primary hover:bg-primary-container text-white gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
