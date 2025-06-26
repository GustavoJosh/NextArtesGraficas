//#region imports
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Printer,
  Scan,
  Gem,
  Scissors,
  Newspaper,
  StickyNote,
  Quote,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

import Link from "next/link";
import CircularGallery from '@/components/ui/CircularGallery';



// -------------------------------------------------
//#endregion

// #region servicios
const services = [
  {
    title: "Impresión Digital",
    description: "Impresiones de alta calidad en diversos formatos y materiales.",
    // Nombre del archivo sin extensión - el código buscará .webp primero, luego .jpg/.png
    imageName: "impresion-digital"
  },
  {
    title: "Lonas y Gran Formato",
    description: "Publicidad impactante que se ve desde lejos con la mejor durabilidad.",
    imageName: "lonas-gran-formato"
  },
  {
    title: "Grabado Láser",
    description: "Personalización y detalle de precisión sobre metal, madera y más.",
    imageName: "grabado-laser"
  },
  {
    title: "Corte Láser",
    description: "Cortes exactos y diseños complejos en una gran variedad de materiales.",
    imageName: "corte-laser"
  },
  {
    title: "Folletos y Papelería",
    description: "Comunica tus ideas de forma efectiva con folletos, trípticos y más.",
    imageName: "folletos-papeleria"
  },
  {
    title: "Stickers y Etiquetas",
    description: "Adhesivos personalizados con cualquier forma, tamaño y acabado.",
    imageName: "stickers-etiquetas"
  },
];

// Función helper para obtener la ruta de la imagen
// Prioriza .webp, luego busca .jpg o .png como fallback
const getImagePath = (imageName: string) => {
  // En Next.js, las imágenes en public/ se sirven desde la raíz
  // Primero intentamos con .webp
  const webpPath = `/images/services/${imageName}.webp`;
  const jpgPath = `/images/services/${imageName}.jpg`;
  const pngPath = `/images/services/${imageName}.png`;
  
  // Para producción, deberías verificar qué archivo existe
  // Por ahora, asumimos que tienes archivos .webp
  // Si no, puedes cambiar el orden de prioridad aquí
  return webpPath;
};

// Mapear servicios al formato requerido por CircularGallery
const servicesForGallery = services.map(service => ({
  text: service.title,
  image: getImagePath(service.imageName),
  // Opcionalmente, puedes incluir la descripción si tu CircularGallery la soporta
  description: service.description
}));

export function ServicesSection() {
  return (
    <section id="servicios" className="w-full py-12 md:py-24 bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Nuestros Servicios
          </h2>
          <p className="text-gray-400 mt-2">
            Todo lo que necesitas para que tu marca destaque. Desliza para explorar.
          </p>
        </div>

        <CircularGallery items={servicesForGallery} />

      </div>
    </section>
  );
}

const projects = [
  {
    title: "Menu Elegante",
    image: "https://placehold.co/600x400/1e293b/ffffff/png?text=Menu+Elegante",
     url: "/menusqr/elegante/index.html",
  },
  {
    title: "Menu casual",
    image: "https://placehold.co/600x400/1e293b/ffffff/png?text=Menu+casual",
    url: "/menusqr/casual/index.html",
  },
  {
    title: "Menu Oceano",
    image: "https://placehold.co/600x400/1e293b/ffffff/png?text=Menu+Oceano",
    url: "/menusqr/oceano/index.html",  
  },
];

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
            // 👇 1. Aquí empieza la magia. Envolvemos todo en el componente Link.
            <Link
              key={project.title} // Usamos un key único como el título.
              href={project.url}   // 2. Le decimos a dónde debe dirigir el enlace.
              target="_blank"      // 3. (Opcional) Para que se abra en una nueva pestaña.
              rel="noopener noreferrer" // Necesario por seguridad al usar target="_blank".
              className="group relative block overflow-hidden rounded-lg" // 4. Movimos las clases del div al Link.
            >
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-xl font-bold">
                  {project.title}
                </h3>
              </div>
            </Link> // 1. Y aquí termina el Link.
          ))}
        </div>
      </div>
    </section>
  );
}


const testimonials = [
  {
    name: "Ana López",
    company: "Tech Solutions",
    quote:
      "El nivel de detalle y profesionalismo superó todas nuestras expectativas. ¡Totalmente recomendados!",
  },
  {
    name: "Carlos Vera",
    company: "Café del Puerto",
    quote:
      "Transformaron nuestra marca. El nuevo logo y los folletos han sido un éxito rotundo con nuestros clientes.",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonios" className="w-full py-12 md:py-24 bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Lo que dicen nuestros clientes
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-gray-900 border-gray-700 text-white"
            >
              <CardContent className="pt-6">
                <Quote className="w-8 h-8 text-blue-400 mb-4" />
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter className="flex items-center gap-4 mt-4">
                <Avatar>
                  <AvatarImage
                    src={`https://api.dicebear.com/8.x/initials/svg?seed=${testimonial.name}`}
                  />
                  <AvatarFallback>
                    {testimonial.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section id="contacto" className="w-full py-16 md:py-28 bg-blue-600">
      <div className="container mx-auto px-4 md:px-6 text-center text-white">
        <h2 className="text-3xl md:text-5xl font-bold">
          ¿Listo para darle vida a tu marca?
        </h2>
        <p className="mt-4 max-w-xl mx-auto">
          Hablemos de tu proyecto. Estamos listos para escuchar tus ideas y
          convertirlas en realidad.
        </p>
        <Button asChild className="mt-8 px-10 py-6 text-lg" variant="secondary">
          <a href="mailto:tuemail@ejemplo.com">Contáctanos Ahora</a>
        </Button>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-900 text-gray-400">
      <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">
          © 2025 Artes Gráficas Digitales. Todos los derechos reservados.
        </p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <section className="w-full min-h-screen flex flex-col justify-center items-center text-center p-8 bg-gray-900 text-white">
        <h1 className="text-5xl md:text-7xl leading-normal font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient-xy">
          Artes Gráficas Digitales
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl">
          Soluciones profesionales al servicio de tu marca
        </p>
        <button className="mt-8 px-8 py-3 bg-blue-600 font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
          ¡Conoce nuestros servicios!
        </button>
      </section>
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
