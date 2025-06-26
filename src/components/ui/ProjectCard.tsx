// src/components/ui/ProjectCard.tsx
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  image: string;
  url: string;
}

export function ProjectCard({ title, image, url }: ProjectCardProps) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-lg"
    >
      <Image
        src={image}
        alt={title}
        width={600}
        height={400}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white text-xl font-bold">
          {title}
        </h3>
      </div>
    </Link>
  );
}