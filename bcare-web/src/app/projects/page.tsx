import { MapPin, Building2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getProjects } from '@/lib/supabase/queries';
import { COMPANY_DETAILS } from '@/lib/constants/company';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="bg-background min-h-screen">
      <section className="py-16 text-center border-b border-outline-variant/20">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-on-surface mb-4">
            Installations Across Kerala
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl mx-auto">
            {COMPANY_DETAILS.shortName} has supplied and installed bakery and commercial kitchen
            equipment for bakeries, hotels and restaurants since {COMPANY_DETAILS.established}.
          </p>
        </div>
      </section>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
        {projects.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center bg-white border border-outline-variant/30 rounded-xl p-10">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-8 h-8" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-on-surface mb-3">
              Project case studies coming soon
            </h2>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              We are documenting our recent bakery and kitchen installations. In the meantime,
              browse the equipment range or talk to us about your project requirements.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-primary text-on-primary font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Browse Equipment <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-outline-variant text-on-surface font-semibold px-6 py-3 rounded-lg hover:border-on-surface transition-colors"
              >
                Discuss Your Project
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white border border-outline-variant/30 rounded-lg overflow-hidden hover:shadow-md transition-all"
              >
                {project.images[0] && (
                  <div className="h-[220px] w-full overflow-hidden bg-surface-container-low">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      loading="lazy"
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col gap-2">
                  <h3 className="font-heading font-bold text-lg text-on-surface">{project.title}</h3>
                  {project.location && (
                    <div className="flex items-center gap-1.5 text-on-surface-variant text-sm">
                      <MapPin className="w-4 h-4" /> {project.location}
                    </div>
                  )}
                  <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
