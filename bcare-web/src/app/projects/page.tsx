'use client';

import { MapPin } from 'lucide-react';
import { useState } from 'react';

const allProjects = [
  {
    id: 1,
    name: "The Grand Continental Main Galley",
    industry: "Hotel",
    location: "Dubai, UAE",
    equipment: ["Heavy Duty Ranges", "Custom Fabrication", "Ventilation"],
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
    size: "large" as const,
  },
  {
    id: 2,
    name: "Artisan Bread Co. Facility",
    industry: "Restaurant",
    location: "London, UK",
    equipment: ["Spiral Mixers", "Rotary Rack Ovens"],
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop",
    size: "small" as const,
  },
  {
    id: 3,
    name: "Mercy General Dietary Wing",
    industry: "Hospital",
    location: "New York, USA",
    equipment: ["Dietary Prep Stations", "SS Wall Cladding"],
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop",
    size: "small" as const,
  },
];

const filterTabs = ["All Projects", "Hotels & Resorts", "Restaurants", "Hospitals"];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All Projects");

  const filteredProjects = activeFilter === "All Projects"
    ? allProjects
    : allProjects.filter(p => {
        if (activeFilter === "Hotels & Resorts") return p.industry === "Hotel";
        if (activeFilter === "Restaurants") return p.industry === "Restaurant";
        if (activeFilter === "Hospitals") return p.industry === "Hospital";
        return true;
      });

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="py-16 text-center border-b border-outline-variant/20">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-on-surface mb-4">
            Industrial Precision, Installed.
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl mx-auto">
            A curated portfolio of high-performance commercial kitchens engineered for elite culinary teams across hotels, restaurants, and institutions.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-3 py-8 px-margin-mobile md:px-margin-desktop border-b border-outline-variant/20">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`text-sm font-medium px-5 py-2.5 rounded-md transition-all ${
              activeFilter === tab
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-transparent border border-outline-variant text-on-surface-variant hover:border-on-surface hover:text-on-surface'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bento Grid */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {filteredProjects.map((project) => {
            if (project.size === 'large') {
              return (
                <div
                  key={project.id}
                  className="md:col-span-7 group relative bg-white border border-outline-variant/30 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  <div className="h-[380px] w-full relative overflow-hidden bg-surface-container-low">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-on-surface/80 text-white font-semibold text-[11px] px-3 py-1 rounded uppercase tracking-wider">
                      {project.industry}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col gap-2 bg-white">
                    <h3 className="font-heading font-bold text-xl text-on-surface">{project.name}</h3>
                    <div className="flex items-center gap-1.5 text-on-surface-variant text-sm">
                      <MapPin className="w-4 h-4 text-on-surface-variant" /> {project.location}
                    </div>
                    <div className="flex gap-2 mt-2">
                      {project.equipment.map((eq, i) => (
                        <span key={i} className="text-[11px] bg-surface-container-low px-2.5 py-1 rounded text-on-surface-variant border border-outline-variant/20 font-medium">
                          {eq}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={project.id}
                className="md:col-span-5 group relative bg-white border border-outline-variant/30 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="h-[180px] w-full relative overflow-hidden bg-surface-container-low">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-on-surface/80 text-white font-semibold text-[11px] px-2.5 py-0.5 rounded uppercase tracking-wider">
                    {project.industry}
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-1">
                  <h4 className="font-heading font-bold text-base text-on-surface">{project.name}</h4>
                  <div className="flex items-center gap-1 text-on-surface-variant text-sm">
                    <MapPin className="w-3.5 h-3.5" /> {project.location}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
