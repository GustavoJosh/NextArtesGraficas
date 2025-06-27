// src/data/projects.ts
export interface Project {
  title: string;
  image: string;
  url: string;
}

export const projects: Project[] = [
  {
    title: "Menu Elegante",
    image: "https://placehold.co/600x400/1e293b/ffffff/png?text=Menu+Elegante",
    url: "/menusqr/elegante/index.html",
  },
  {
    title: "Menu Minimalista",
    image: "https://placehold.co/600x400/1e293b/ffffff/png?text=Menu+Minimalista",
    url: "/menusqr/minimalista/index.html",
  },
  {
    title: "Menu Oceano",
    image: "https://placehold.co/600x400/1e293b/ffffff/png?text=Menu+Oceano",
    url: "/menusqr/oceano/index.html",  
  },
];