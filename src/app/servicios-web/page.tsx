"use client";

import { Header } from '@/components/layout/Header';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { WebServicesCatalog } from '@/components/web-services';
import { AnimatedSection, AnimatedText } from '@/components/ui/AnimatedSection';
import { ParallaxContainer, FloatingElements } from '@/components/ui/ParallaxBackground';
import { ScrollProgress, ScrollToTop } from '@/components/ui/ScrollProgress';
import { CatalogErrorBoundary } from '@/components/web-services/ErrorBoundaries';
import { LazyWrapper } from '@/components/ui/LazyWrapper';
import { useSmoothScroll } from '@/hooks/useScrollAnimations';
import { usePerformanceMonitoring, useCoreWebVitals, useBundlePerformance } from '@/hooks/usePerformanceMonitoring';
import type { WebService } from '@/data/webServices';

export default function ServiciosWebPage() {
  const { scrollToElement } = useSmoothScroll();
  
  // Performance monitoring
  const { trackInteraction, measureOperation } = usePerformanceMonitoring({
    componentName: 'ServiciosWebPage',
    trackInteractions: true,
    threshold: 50
  });
  
  // Monitor Core Web Vitals
  useCoreWebVitals();
  useBundlePerformance();

  // Breadcrumb items for navigation
  const breadcrumbItems = [
    { name: 'Servicios Web' }
  ];

  const handleRequestQuote = (service: WebService) => {
    trackInteraction('quote_request');
    measureOperation('navigate_to_contact', () => {
      console.log('Request quote for:', service.title);
      // Navigate to contact page with service pre-selected
      const contactUrl = `/contacto?service=${encodeURIComponent(service.title)}&type=web-service`;
      window.location.href = contactUrl;
    });
  };

  const handleContactClick = (method: 'phone' | 'email' | 'whatsapp' | 'form') => {
    trackInteraction(`contact_${method}`);
    measureOperation(`contact_${method}`, () => {
      switch (method) {
        case 'phone':
          window.open('tel:6121210933', '_self');
          break;
        case 'email':
          window.open(`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@example.com'}?subject=Consulta sobre Servicios Web`, '_self');
          break;
        case 'whatsapp':
          window.open('https://wa.me/5216121210933?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20sus%20servicios%20web', '_blank');
          break;
        case 'form':
          window.location.href = '/contacto?type=web-service';
          break;
      }
    });
  };

  const handleScrollToCatalog = () => {
    trackInteraction('scroll_to_catalog');
    measureOperation('scroll_to_catalog', () => {
      scrollToElement('services-catalog', 80);
    });
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Header component for consistent navigation */}
      <Header />
      
      <main className="bg-gray-950 min-h-screen text-white pt-16 relative overflow-hidden" style={{ scrollBehavior: 'smooth' }}>
        {/* Parallax Background Container */}
        <ParallaxContainer className="min-h-screen">
          {/* Floating Elements */}
          <FloatingElements />
          
          {/* Hero Section */}
          <AnimatedSection 
            className="relative z-10"
            animation="fadeUp"
            threshold={0.1}
          >
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
              
              {/* Breadcrumb Navigation */}
              <AnimatedText 
                className="mb-6" 
                delay={0.2}
                variant="slideLeft"
              >
                <Breadcrumb items={breadcrumbItems} />
              </AnimatedText>
              
              {/* Page Header */}
              <div className="text-left mb-12">
                <AnimatedText 
                  delay={0.3}
                  variant="fadeUp"
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent leading-tight">
                    Servicios Web
                  </h1>
                </AnimatedText>
                
                <AnimatedText 
                  className="mt-6 max-w-2xl" 
                  delay={0.5}
                  variant="fadeUp"
                >
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                    Descubre nuestros servicios digitales: menús QR, páginas web, tarjetas digitales y soluciones personalizadas.
                  </p>
                </AnimatedText>

                {/* CTA Button */}
                <AnimatedText 
                  className="mt-8" 
                  delay={0.7}
                  variant="fadeUp"
                >
                  <button
                    onClick={handleScrollToCatalog}
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative flex items-center gap-2">
                      Explorar Servicios
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                </AnimatedText>
              </div>

              {/* Stats Section */}
              <AnimatedSection 
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
                animation="stagger"
                delay={0.8}
                threshold={0.3}
              >
                {[
                  { number: "50+", label: "Proyectos Completados" },
                  { number: "98%", label: "Satisfacción del Cliente" },
                  { number: "24/7", label: "Soporte Técnico" },
                  { number: "5★", label: "Calificación Promedio" }
                ].map((stat, index) => (
                  <AnimatedText 
                    key={index}
                    className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50"
                    delay={index * 0.1}
                    variant="fadeUp"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-300">
                      {stat.label}
                    </div>
                  </AnimatedText>
                ))}
              </AnimatedSection>
            </div>
          </AnimatedSection>

          {/* Services Catalog Section */}
          <AnimatedSection 
            id="services-catalog"
            className="relative z-10"
            animation="fadeIn"
            threshold={0.1}
            rootMargin="0px 0px -200px 0px"
          >
            <LazyWrapper 
              fallback={
                <div className="container mx-auto px-4 py-16">
                  <div className="space-y-8">
                    <div className="h-16 bg-gray-800/50 rounded-xl animate-pulse" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Array.from({ length: 6 }, (_, i) => (
                        <div key={i} className="h-96 bg-gray-800/50 rounded-xl animate-pulse" />
                      ))}
                    </div>
                  </div>
                </div>
              }
            >
              <WebServicesCatalog 
                onRequestQuote={handleRequestQuote}
                onContactClick={handleContactClick}
              />
            </LazyWrapper>
          </AnimatedSection>
        </ParallaxContainer>

        {/* Scroll to Top Button */}
        <ScrollToTop />
      </main>
    </>
  );
}