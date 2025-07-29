// src/data/projects.ts
export interface Project {
  title: string;
  description: string;
  image: string;
  url: string;
  category: 'menu' | 'website';
  status?: 'new' | 'featured' | 'popular';
  technologies: string[];
  completionTime: string;
  client: string;
}

export const projects: Project[] = [
  {
    title: "Menu Elegante",
    description: "Un diseño sofisticado para restaurantes de alta cocina con animaciones suaves y navegación intuitiva.",
    image: "https://placehold.co/600x400/1e293b/ffffff/png?text=Menu+Elegante",
    url: "/menusqr/elegante/index.html",
    category: "menu",
    status: "featured",
    technologies: ["HTML5", "CSS3", "JavaScript", "QR"],
    completionTime: "3 días",
    client: "Restaurante Gourmet"
  },
  {
    title: "Sitio Web Corporativo",
    description: "Página web moderna y profesional para una startup tecnológica con diseño responsive y optimización SEO.",
    image: "https://placehold.co/600x400/4f46e5/ffffff/png?text=Sitio+Web",
    url: "#",
    category: "website",
    status: "new",
    technologies: ["React", "Next.js", "Tailwind", "SEO"],
    completionTime: "2 semanas",
    client: "TechStart Solutions"
  },
  {
    title: "Menu Minimalista",
    description: "Claridad y sencillez para una cafetería moderna con enfoque en la experiencia del usuario.",
    image: "https://placehold.co/600x400/1e293b/ffffff/png?text=Menu+Minimalista",
    url: "/menusqr/minimalista/index.html",
    category: "menu",
    status: "popular",
    technologies: ["HTML5", "CSS3", "Mobile-First", "QR"],
    completionTime: "2 días",
    client: "Café Central"
  },
  {
    title: "Menu Oceano",
    description: "Temática marina para restaurantes de mariscos con colores vibrantes y elementos interactivos.",
    image: "https://placehold.co/600x400/1e293b/ffffff/png?text=Menu+Oceano",
    url: "/menusqr/oceano/index.html",
    category: "menu",
    technologies: ["HTML5", "CSS3", "Animations", "QR"],
    completionTime: "4 días",
    client: "Mariscos del Puerto"
  },
  {
    title: "Landing Page para App",
    description: "Página de aterrizaje atractiva para una nueva aplicación móvil con call-to-actions optimizados.",
    image: "https://placehold.co/600x400/4f46e5/ffffff/png?text=Landing+Page",
    url: "#",
    category: "website",
    status: "featured",
    technologies: ["React", "Framer Motion", "Analytics", "A/B Testing"],
    completionTime: "1 semana",
    client: "AppInnovate"
  },
];