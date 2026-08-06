import { MapPin } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      name: "The Grand Pavilion Main Galley",
      industry: "Hotel",
      location: "Kochi, Kerala",
      equipment: ["Heavy Duty Ranges", "Custom Fabrication", "Combi Ovens"],
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600&auto=format&fit=crop",
      size: "large",
    },
    {
      id: 2,
      name: "Artisan Bakers Production Facility",
      industry: "Bakery",
      location: "Thrissur, Kerala",
      equipment: ["Spiral Mixers", "Rotary Rack Ovens"],
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop",
      size: "small",
    },
    {
      id: 3,
      name: "Metro Medical Dietary Kitchen",
      industry: "Hospital",
      location: "Calicut, Kerala",
      equipment: ["Dietary Prep Stations", "SS Wall Cladding"],
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop",
      size: "small",
    },
  ];

  return (
    <div className="bg-background min-h-screen pb-16">
      {/* Header */}
      <section className="bg-white border-b border-outline-variant/30 py-16 text-center">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
          <h1 className="font-heading text-4xl font-extrabold text-primary mb-4">
            Industrial Precision, Installed.
          </h1>
          <p className="font-body-lg text-secondary">
            A curated portfolio of high-performance commercial kitchens engineered for elite culinary teams across Kerala.
          </p>
        </div>
      </section>

      {/* Bento Grid */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {projects.map((project) => {
            if (project.size === 'large') {
              return (
                <div 
                  key={project.id} 
                  className="md:col-span-8 group relative bg-white border border-outline-variant/30 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 h-[500px] flex flex-col"
                >
                  <div className="h-3/4 w-full relative overflow-hidden bg-muted">
                    <img 
                      src={project.image} 
                      alt={project.name} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white font-label-sm text-xs px-3 py-1 rounded font-semibold uppercase tracking-wider">
                      {project.industry}
                    </div>
                  </div>
                  <div className="p-6 h-1/4 flex flex-col justify-between bg-white z-10">
                    <div>
                      <h3 className="font-heading font-bold text-xl text-primary mb-1">{project.name}</h3>
                      <div className="flex items-center gap-1.5 text-secondary font-body-sm text-xs font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-[#F97316]" /> {project.location}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {project.equipment.map((eq, i) => (
                        <span key={i} className="text-[11px] bg-muted px-2.5 py-1 rounded text-secondary border border-outline-variant/20 font-medium">
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
                className="md:col-span-4 group relative bg-white border border-outline-variant/30 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 h-[238px] flex flex-col"
              >
                <div className="h-1/2 w-full relative overflow-hidden bg-muted">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-primary text-white font-label-sm text-xs px-2.5 py-0.5 rounded font-semibold uppercase tracking-wider">
                    {project.industry}
                  </div>
                </div>
                <div className="p-4 h-1/2 flex flex-col justify-between">
                  <div>
                    <h4 className="font-heading font-bold text-base text-primary line-clamp-1">{project.name}</h4>
                    <div className="flex items-center gap-1 text-secondary font-body-sm text-xs mt-1 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-[#F97316]" /> {project.location}
                    </div>
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
