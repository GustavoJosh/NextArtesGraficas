// src/components/layout/Footer.tsx
import { Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-900 text-gray-400">
      <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">
          © 2025 Artes Gráficas Digitales. Todos los derechos reservados.
        </p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white" aria-label="Twitter">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white" aria-label="Instagram">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}