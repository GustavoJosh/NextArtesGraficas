// src/data/projects.ts
export interface Project {
  title: string;
  description: string; // <-- Añadimos una descripción
  image: string;
  url: string;
  category: 'menu' | 'website'; // <-- ¡La nueva categoría para filtrar!
}

export const projects: Project[] = [
  {
    title: "Menu Elegante",
    description: "Un diseño sofisticado para restaurantes de alta cocina.",
    image: "https://placehold.co/600x400/1e293b/ffffff/png?text=Menu+Elegante",
    url: "/menusqr/elegante/index.html",
    category: "menu",
  },
  {
    title: "Sitio Web Corporativo",
    description: "Página web moderna y profesional para una startup tecnológica.",
    image: "https://placehold.co/600x400/4f46e5/ffffff/png?text=Sitio+Web",
    url: "#", // Reemplazar con la URL real
    category: "website",
  },
  {
    title: "Menu Minimalista",
    description: "Claridad y sencillez para una cafetería moderna.",
    image: "https://placehold.co/600x400/1e293b/ffffff/png?text=Menu+Minimalista",
    url: "/menusqr/minimalista/index.html",
    category: "menu",
  },
  {
    title: "Menu Oceano",
    description: "Temática marina para restaurantes de mariscos.",
    image: "https://placehold.co/600x400/1e293b/ffffff/png?text=Menu+Oceano",
    url: "/menusqr/oceano/index.html",
    category: "menu",
  },
    {
    title: "Landing Page para App",
    description: "Página de aterrizaje atractiva para una nueva aplicación móvil.",
    image: "https://placehold.co/600x400/4f46e5/ffffff/png?text=Landing+Page",
    url: "#", // Reemplazar con la URL real
    category: "website",
  },
];