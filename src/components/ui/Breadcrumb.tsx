import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const handleBreadcrumbClick = (e: React.MouseEvent, href?: string) => {
  e.stopPropagation();
  
  if (href) {
    // Let Next.js Link handle the navigation naturally
    // The stopPropagation prevents gallery interference
  }
};

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center space-x-2 text-sm ${className}`}>
      <Link
        href="/"
        className="flex items-center text-gray-400 hover:text-blue-400 transition-colors"
        aria-label="Ir al inicio"
        onClick={(e) => handleBreadcrumbClick(e, "/")}
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Inicio</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4 text-gray-500" aria-hidden="true" />
          {item.href && index < items.length - 1 ? (
            <Link
              href={item.href}
              className="text-gray-400 hover:text-blue-400 transition-colors"
              onClick={(e) => handleBreadcrumbClick(e, item.href)}
            >
              {item.name}
            </Link>
          ) : (
            <span className="text-gray-300 font-medium" aria-current="page">
              {item.name}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}