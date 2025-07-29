// src/app/page.tsx
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { TestimonialsPreview } from "@/components/sections/TestimonialsPreview";
import { ContactPreview } from "@/components/sections/ContactPreview";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16"> {/* Add padding-top to account for fixed header */}
        <section id="hero">
          <HeroSection />
        </section>
        
        {/* Preview sections with navigation links to dedicated pages */}
        <section id="servicios-preview">
          <ServicesPreview />
        </section>
        
        <section id="portafolio-preview">
          <PortfolioPreview />
        </section>
        
        <section id="testimonios-preview">
          <TestimonialsPreview />
        </section>
        
        <section id="contacto-preview">
          <ContactPreview />
        </section>
        
        <Footer />
      </main>
    </>
  );
}