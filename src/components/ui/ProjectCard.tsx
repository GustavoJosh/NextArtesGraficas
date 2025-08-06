// src/components/ui/ProjectCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Clock, User, Star, Sparkles, TrendingUp } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  url: string;
  status?: 'new' | 'featured' | 'popular';
  technologies: string[];
  completionTime: string;
  client: string;
}

const getStatusBadge = (status?: string) => {
  switch (status) {
    case 'new':
      return (
        <Badge className="bg-green-500 text-white hover:bg-green-600">
          <Sparkles className="w-3 h-3 mr-1" />
          Nuevo
        </Badge>
      );
    case 'featured':
      return (
        <Badge className="bg-purple-500 text-white hover:bg-purple-600">
          <Star className="w-3 h-3 mr-1" />
          Destacado
        </Badge>
      );
    case 'popular':
      return (
        <Badge className="bg-orange-500 text-white hover:bg-orange-600">
          <TrendingUp className="w-3 h-3 mr-1" />
          Popular
        </Badge>
      );
    default:
      return null;
  }
};

export function ProjectCard({ title, description, image, url, status, technologies, completionTime, client }: ProjectCardProps) {
  return (
    <Card className="group bg-gray-800/50 backdrop-blur-sm border-gray-700/50 text-white flex flex-col h-full transform transition-all duration-300 hover:-translate-y-2 hover:border-gray-600/80 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden will-change-transform">
      <CardHeader className="relative p-0">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Status badge overlay */}
          {status && (
            <div className="absolute top-3 left-3 z-10">
              {getStatusBadge(status)}
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow p-6">
        <div className="mb-3">
          <CardTitle className="text-xl mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
            {title}
          </CardTitle>
          <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
            {description}
          </CardDescription>
        </div>

        {/* Project details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-400">
            <User className="w-4 h-4 mr-2 text-blue-400" />
            <span>{client}</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <Clock className="w-4 h-4 mr-2 text-green-400" />
            <span>{completionTime}</span>
          </div>
        </div>

        {/* Technology badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.slice(0, 3).map((tech) => (
            <Badge 
              key={tech} 
              variant="outline" 
              className="text-xs border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white transition-colors duration-200"
            >
              {tech}
            </Badge>
          ))}
          {technologies.length > 3 && (
            <Badge 
              variant="outline" 
              className="text-xs border-gray-600 text-gray-400 hover:border-gray-500"
            >
              +{technologies.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="secondary" className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
          <Link href={url} target="_blank" rel="noopener noreferrer">
            Ver Proyecto
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}