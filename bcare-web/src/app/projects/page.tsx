'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/lib/data/mock';
import { MapPin, Calendar, Building2, Quote, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProjectsPage() {
  const [activeIndustry, setActiveIndustry] = useState<string>('all');
  
  const industries = Array.from(new Set(projects.map(p => p.industry)));

  const filteredProjects = activeIndustry === 'all' 
    ? projects 
    : projects.filter(p => p.industry === activeIndustry);

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
            <h1 className="font-display-lg text-display-lg text-primary mb-6">Project Showcase</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Explore our portfolio of successful commercial kitchen and bakery installations across Kerala. See how we engineer efficiency and durability in real-world culinary environments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-section-padding">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          
          {/* Industry Filters */}
          <div className="mb-12 overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex justify-center gap-4 min-w-max">
              <button
                onClick={() => setActiveIndustry('all')}
                className={`px-6 py-2 rounded-full font-label-sm text-label-sm transition-all ${
                  activeIndustry === 'all' 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container border border-outline-variant/50'
                }`}
              >
                All Projects
              </button>
              {industries.map((ind, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndustry(ind)}
                  className={`px-6 py-2 rounded-full font-label-sm text-label-sm transition-all ${
                    activeIndustry === ind
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container border border-outline-variant/50'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          {/* Project List */}
          <div className="space-y-16">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-ambient border border-outline-variant/30 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-80 lg:h-full min-h-[400px] overflow-hidden">
                    <img 
                      src={project.images[0]} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-6 left-6 bg-surface-container-lowest/90 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-outline-variant/20 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-surface-tint" />
                      <span className="font-label-sm text-sm text-on-surface">{project.industry}</span>
                    </div>
                  </div>
                  
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-4 text-on-surface-variant font-label-sm text-sm mb-4">
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" /> {project.location}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary" /> {new Date(project.completionDate).getFullYear()}</span>
                    </div>
                    
                    <h2 className="font-headline-lg text-headline-lg text-primary mb-2">{project.title}</h2>
                    <p className="font-title-md text-title-md text-on-surface-variant mb-6 opacity-80">Client: {project.clientName}</p>
                    
                    <p className="font-body-md text-body-md text-on-surface-variant mb-8 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mb-8">
                      <h4 className="font-title-md text-sm text-on-surface mb-3 uppercase tracking-wider">Key Equipment Supplied</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.equipmentSupplied.map((eq, idx) => (
                          <span key={idx} className="bg-surface-container-low px-3 py-1 rounded text-sm text-on-surface-variant border border-outline-variant/20">
                            {eq}
                          </span>
                        ))}
                      </div>
                    </div>

                    {project.testimonial && (
                      <div className="bg-surface-variant/30 p-6 rounded-xl border border-outline-variant/30 mb-8 relative">
                        <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
                        <p className="italic font-body-md text-on-surface-variant mb-4">&quot;{project.testimonial.quote}&quot;</p>
                        <div>
                          <p className="font-title-md text-sm text-on-surface">{project.testimonial.author}</p>
                          <p className="text-xs text-on-surface-variant">{project.testimonial.designation}</p>
                        </div>
                      </div>
                    )}

                    <div className="mt-auto pt-6 border-t border-outline-variant/20">
                      <Link href={`/contact?project=${project.slug}`}>
                        <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary-container px-0">
                          Discuss a similar project <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-on-surface-variant font-body-lg">No projects found for this industry.</p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
