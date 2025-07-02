// src/components/ui/ProjectCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

// Actualizamos las props para recibir la descripción
interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

export function ProjectCard({ title, description, image, url }: ProjectCardProps) {
  return (
    <Card className="bg-gray-900 border-gray-700 text-white flex flex-col h-full transform transition-transform duration-300 hover:-translate-y-2">
      <CardHeader>
        <div className="aspect-video relative overflow-hidden rounded-md">
           <Image
            src={image}
            alt={title}
            fill // fill hace que la imagen cubra el div padre
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle className="text-xl mb-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild variant="secondary" className="w-full">
          <Link href={url} target="_blank" rel="noopener noreferrer">
            Ver Proyecto
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}