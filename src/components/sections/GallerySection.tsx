"use client";

import { useState } from 'react';
import CircularGallery from "@/components/ui/CircularGallery";
import ImageModal from "@/components/ui/ImageModal";

export function GallerySection() {
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);

  const handleImageClick = (imageSrc: string) => {
    setModalImage({ src: imageSrc, alt: "" });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <>
      <section id="gallery-section" className="w-full py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0E345A] mb-4">
              Nuestros Socios
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Empresas que confían en nuestros servicios
            </p>
          </div>
          <div className="h-96">
            <CircularGallery 
              items={[
                { image: "/images/CircularGallery/imagen1.webp", text: "Socio 1" },
                { image: "/images/CircularGallery/imagen2.webp", text: "Socio 2" },
                { image: "/images/CircularGallery/imagen3.webp", text: "Socio 3" },
                { image: "/images/CircularGallery/imagen4.webp", text: "Socio 4" },
                { image: "/images/CircularGallery/imagen5.webp", text: "Socio 5" },
                { image: "/images/CircularGallery/imagen6.webp", text: "Socio 6" },
              ]}
              bend={0.5}
              textColor="#0E345A"
              borderRadius={0}
              font="bold 24px sans-serif"
              scrollSpeed={2}
              scrollEase={0.2}
              onImageClick={handleImageClick}
            />
          </div>
        </div>
      </section>
      
      <ImageModal
        isOpen={!!modalImage}
        imageSrc={modalImage?.src || ""}
        imageAlt={modalImage?.alt || ""}
        onClose={closeModal}
      />
    </>
  );
}