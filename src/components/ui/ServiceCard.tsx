// src/components/ui/ServiceCard.tsx
"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
}

const scrollToContact = () => {
  // Para que esto funcione en otra página, necesitaríamos una URL completa
  // O simplemente enlazar a la página de contacto si existiera.
  // Por ahora, lo dejamos como un placeholder.
  alert("Redirigiendo a la sección de contacto...");
  // window.location.href = '/#contacto'; // Esto te llevaría a la home y haría scroll
};

export function ServiceCard({ title, description, image }: ServiceCardProps) {
  return (
    // Hemos cambiado el padding de p-6 a p-4
    <Card className="bg-gray-950 border-gray-800 text-white flex flex-col h-full overflow-hidden group">
      <CardHeader className="p-0">
        <div className="aspect-video relative overflow-hidden">
           <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105" // Efecto de zoom al pasar el cursor
          />
        </div>
      </CardHeader>
      {/* El padding aquí también se ha reducido */}
      <CardContent className="p-4 flex-grow flex flex-col">
        {/* El título es un poco más pequeño (text-lg en lugar de text-xl) */}
        <CardTitle className="text-lg mb-2">{title}</CardTitle>
        {/* La descripción también es más pequeña (text-sm) */}
        <CardDescription className="text-sm text-gray-400 flex-grow">{description}</CardDescription>
        <Button onClick={scrollToContact} className="mt-4 w-full" variant="outline" size="sm">
          Solicitar Cotización
        </Button>
      </CardContent>
    </Card>
  );
}