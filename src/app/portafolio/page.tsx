// src/app/portafolio/page.tsx
"use client";

import { useState } from 'react';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Menu, Globe, Grid3X3, Star, TrendingUp } from 'lucide-react';

type Category = 'all' | 'menu' | 'website';

export default function PortafolioPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('all');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);
  
  const categories: { key: Category, name: string, icon: any, count: number }[] = [
    { 
      key: 'all', 
      name: 'Todos', 
      icon: Grid3X3, 
      count: projects.length 
    },
    { 
      key: 'menu', 
      name: 'Menús Digitales', 
      icon: Menu, 
      count: projects.filter(p => p.category === 'menu').length 
    },
    { 
      key: 'website', 
      name: 'Sitios Web', 
      icon: Globe, 
      count: projects.filter(p => p.category === 'website').length 
    }
  ];

  // Count projects by status
  const featuredCount = projects.filter(p => p.status === 'featured').length;
  const newCount = projects.filter(p => p.status === 'new').length;
  const popularCount = projects.filter(p => p.status === 'popular').length;

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-[#0E345A] to-[#0A1B2E] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 bg-[#F7DF14] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#0E345A] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10">
        {/* Header with stats */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-[#F7DF14] mr-2" />
            <span className="text-[#F7DF14] font-medium uppercase tracking-wider text-sm">Portfolio Profesional</span>
            <Sparkles className="w-6 h-6 text-[#F7DF14] ml-2" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-[#F7DF14] via-white to-[#F7DF14] text-transparent bg-clip-text">
              Nuestro Trabajo
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Un vistazo a algunos de nuestros proyectos exitosos. Cada proyecto refleja nuestro compromiso con la calidad y la innovación.
          </p>

          {/* Status badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {featuredCount > 0 && (
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30">
                <Star className="w-3 h-3 mr-1" />
                {featuredCount} Destacados
              </Badge>
            )}
            {newCount > 0 && (
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30">
                <Sparkles className="w-3 h-3 mr-1" />
                {newCount} Nuevos
              </Badge>
            )}
            {popularCount > 0 && (
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 hover:bg-orange-500/30">
                <TrendingUp className="w-3 h-3 mr-1" />
                {popularCount} Populares
              </Badge>
            )}
          </div>
        </div>

        {/* Enhanced filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => {
            const Icon = category.icon;
            const isActive = activeFilter === category.key;
            
            return (
              <Button
                key={category.key}
                variant={isActive ? 'default' : 'outline'}
                onClick={() => setActiveFilter(category.key)}
                className={`
                  relative group transition-all duration-300 px-6 py-3
                  ${isActive 
                    ? 'bg-[#F7DF14] text-[#0E345A] border-transparent shadow-lg font-semibold' 
                    : 'border-gray-600 text-gray-300 hover:border-[#F7DF14] hover:text-[#F7DF14] hover:bg-gray-800/50'
                  }
                `}
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.name}
                <Badge 
                  variant="secondary" 
                  className={`
                    ml-2 h-5 min-w-5 rounded-full px-1.5 font-mono text-xs
                    ${isActive 
                      ? 'bg-[#0E345A]/20 text-[#0E345A]' 
                      : 'bg-gray-700 text-gray-300 group-hover:bg-[#F7DF14]/20 group-hover:text-[#F7DF14]'
                    }
                  `}
                >
                  {category.count}
                </Badge>
              </Button>
            );
          })}
        </div>

        {/* Results count */}
        <div className="text-center mb-8">
          <p className="text-gray-400">
            Mostrando <span className="text-white font-semibold">{filteredProjects.length}</span> proyecto{filteredProjects.length !== 1 ? 's' : ''}
            {activeFilter !== 'all' && (
              <span> en <span className="text-[#F7DF14] font-medium">
                {categories.find(c => c.key === activeFilter)?.name}
              </span></span>
            )}
          </p>
        </div>

        {/* Enhanced project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
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
        <div className="text-center mt-16">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Tienes un proyecto en mente?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Nos encantaría trabajar contigo en tu próximo proyecto. Desde menús digitales hasta sitios web completos, 
              estamos aquí para hacer realidad tus ideas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-3">
                Solicitar Cotización
              </Button>
              <Button variant="outline" size="lg" className="border-[#F7DF14] text-[#F7DF14] hover:bg-[#F7DF14] hover:text-[#0E345A] px-8 py-3">
                Ver Más Trabajos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}