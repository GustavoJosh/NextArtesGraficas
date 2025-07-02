// src/components/sections/PortfolioSection.tsx
"use client"; // <-- ¡Importante! Necesitamos que sea un componente de cliente para usar estado.

import { useState } from 'react';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';
import { Button } from '@/components/ui/button';

// Definimos los tipos de categorías que manejaremos
type Category = 'all' | 'menu' | 'website';

export function PortfolioSection() {
  // Estado para saber qué filtro está activo
  const [activeFilter, setActiveFilter] = useState<Category>('all');

  // Filtramos los proyectos basándonos en el estado activo
  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);
  
  const categories: { key: Category, name: string }[] = [
      { key: 'all', name: 'Todos'},
      { key: 'menu', name: 'Menús Digitales'},
      { key: 'website', name: 'Sitios Web'}
  ];

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

        {/* --- Botones de Filtro --- */}
        <div className="flex justify-center gap-2 md:gap-4 mb-12">
          {categories.map(category => (
            <Button
              key={category.key}
              variant={activeFilter === category.key ? 'default' : 'secondary'}
              onClick={() => setActiveFilter(category.key)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* --- Grid de Proyectos Filtrados --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description} // Pasamos la descripción
              image={project.image}
              url={project.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
}