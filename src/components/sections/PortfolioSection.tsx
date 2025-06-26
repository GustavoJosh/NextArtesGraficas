// src/components/sections/PortfolioSection.tsx
import { ProjectCard } from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';

export function PortfolioSection() {
  return (
    <section id="portafolio" className="w-full py-12 md:py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Nuestro Trabajo
          </h2>
          <p className="text-gray-400 mt-2">
            Un vistazo a algunos de nuestros proyectos exitosos.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              image={project.image}
              url={project.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
}