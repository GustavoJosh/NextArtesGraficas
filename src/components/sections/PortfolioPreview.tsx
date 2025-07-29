// src/components/sections/PortfolioPreview.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Sparkles, ArrowRight, Star } from 'lucide-react';

export function PortfolioPreview() {
  // Get featured projects or first 3 projects for preview
  const featuredProjects = projects.filter(p => p.status === 'featured').slice(0, 3);
  const previewProjects = featuredProjects.length >= 3 ? featuredProjects : projects.slice(0, 3);

  return (
    <section className="w-full py-16 md:py-20 bg-gradient-to-b from-[#0E345A] to-[#0A1B2E] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-40 h-40 bg-[#F7DF14] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-[#0E345A] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Star className="w-5 h-5 text-[#F7DF14] mr-2" />
            <span className="text-[#F7DF14] font-medium uppercase tracking-wider text-sm">Portfolio</span>
            <Star className="w-5 h-5 text-[#F7DF14] ml-2" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-[#F7DF14] via-white to-[#F7DF14] text-transparent bg-clip-text">
              Nuestros Mejores Trabajos
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Proyectos que reflejan nuestro compromiso con la calidad y la innovación
          </p>
        </div>

        {/* Portfolio preview grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {previewProjects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              image={project.image}
              url={project.url}
              status={project.status}
              technologies={project.technologies}
              completionTime={project.completionTime}
              client={project.client}
            />
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">
              ¿Quieres ver más de nuestro trabajo?
            </h3>
            <p className="text-gray-400 mb-6">
              Explora nuestro portfolio completo con más de {projects.length} proyectos exitosos
            </p>
            <Button asChild size="lg" className="bg-[#F7DF14] text-[#0E345A] hover:bg-[#F7DF14]/90">
              <Link href="/portafolio" className="inline-flex items-center">
                Ver Portfolio Completo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}