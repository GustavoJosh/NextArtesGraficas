// src/components/layout/Footer.tsx
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-900 text-gray-400">
      <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">
          © 2025 Artes Gráficas Digitales. Todos los derechos reservados.
        </p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a 
            href="https://www.facebook.com/artes.graficasg" 
            className="hover:text-white" 
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="w-6 h-6" />
          </a>
          <a 
            href="https://www.instagram.com/artesgraficasbcs/" 
            className="hover:text-white" 
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
          <a 
            href="https://www.tiktok.com/@artesgraficasdigitales" 
            className="hover:text-white" 
            aria-label="TikTok"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok className="w-6 h-6" />
          </a>
          <a 
            href="#" 
            className="hover:text-white" 
            aria-label="WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}