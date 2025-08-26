"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  Users, 
  Clock, 
  Shield,
  CheckCircle,
  TrendingUp
} from 'lucide-react';
import { AnimatedSection, AnimatedText } from '@/components/ui/AnimatedSection';
import { webServiceTestimonials } from '@/data/webServices';
import type { Testimonial } from '@/data/webServices';

interface TrustIndicatorsProps {
  className?: string;
  showTestimonials?: boolean;
  showStats?: boolean;
  showBadges?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

export function TrustIndicators({ 
  className = "",
  showTestimonials = true,
  showStats = true,
  showBadges = true,
  variant = 'default'
}: TrustIndicatorsProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Extended testimonials for better showcase
  const allTestimonials: Testimonial[] = [
    ...webServiceTestimonials,
    {
      id: 'testimonial-ecommerce-1',
      clientName: 'Roberto Silva',
      clientCompany: 'Tienda Online RS',
      content: 'La plataforma de e-commerce que desarrollaron superó nuestras expectativas. Las ventas online aumentaron 200% en los primeros 3 meses.',
      rating: 5,
      serviceId: 'custom-ecommerce'
    },
    {
      id: 'testimonial-hotel-1',
      clientName: 'Patricia López',
      clientCompany: 'Hotel Vista Mar',
      content: 'El sistema de reservas online nos permitió automatizar completamente el proceso. Ahora recibimos reservas las 24 horas.',
      rating: 5,
      serviceId: 'custom-booking-system'
    },
    {
      id: 'testimonial-gym-1',
      clientName: 'Miguel Torres',
      clientCompany: 'Gimnasio FitZone',
      content: 'La aplicación web para gestionar membresías y clases nos ahorró horas de trabajo administrativo cada semana.',
      rating: 5,
      serviceId: 'custom-gym-management'
    }
  ];

  const trustStats = [
    {
      number: "50+",
      label: "Proyectos Completados",
      icon: Award,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      number: "98%",
      label: "Satisfacción del Cliente",
      icon: Users,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      number: "24/7",
      label: "Soporte Técnico",
      icon: Clock,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    },
    {
      number: "100%",
      label: "Proyectos Entregados",
      icon: CheckCircle,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20"
    }
  ];

  const trustBadges = [
    {
      name: "Desarrollo Seguro",
      description: "Certificado SSL y mejores prácticas de seguridad",
      icon: Shield,
      color: "text-green-400"
    },
    {
      name: "Crecimiento Garantizado",
      description: "Soluciones escalables para tu negocio",
      icon: TrendingUp,
      color: "text-blue-400"
    },
    {
      name: "Calidad Premium",
      description: "Código limpio y optimizado",
      icon: Award,
      color: "text-yellow-400"
    },
    {
      name: "Soporte Continuo",
      description: "Mantenimiento y actualizaciones incluidas",
      icon: Users,
      color: "text-purple-400"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % allTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + allTestimonials.length) % allTestimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
      />
    ));
  };

  if (variant === 'compact') {
    return (
      <AnimatedSection className={`trust-indicators-compact ${className}`}>
        <div className="flex flex-wrap items-center justify-center gap-8 py-6">
          {trustStats.slice(0, 2).map((stat, index) => (
            <AnimatedText
              key={index}
              variant="fadeUp"
              delay={index * 0.1}
              className="text-center"
            >
              <div className="text-2xl font-bold text-white mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400">
                {stat.label}
              </div>
            </AnimatedText>
          ))}
          <div className="flex items-center gap-1">
            {renderStars(5)}
            <span className="text-sm text-gray-400 ml-2">5.0 promedio</span>
          </div>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <div className={`trust-indicators ${className}`}>
      {/* Trust Statistics */}
      {showStats && (
        <AnimatedSection 
          className="mb-12"
          animation="fadeUp"
          threshold={0.2}
        >
          <div className="text-center mb-8">
            <AnimatedText variant="fadeUp">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Resultados que hablan por sí solos
              </h2>
            </AnimatedText>
            <AnimatedText variant="fadeUp" delay={0.1}>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Más de 50 empresas confían en nosotros para sus proyectos digitales
              </p>
            </AnimatedText>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustStats.map((stat, index) => (
              <motion.div
                key={index}
                className={`text-center p-6 rounded-xl border backdrop-blur-sm ${stat.bgColor} ${stat.borderColor}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`inline-flex p-3 rounded-lg mb-4 ${stat.bgColor} border ${stat.borderColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      )}

      {/* Testimonials Carousel */}
      {showTestimonials && allTestimonials.length > 0 && (
        <AnimatedSection 
          className="mb-12"
          animation="fadeUp"
          threshold={0.2}
        >
          <div className="text-center mb-8">
            <AnimatedText variant="fadeUp">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Lo que dicen nuestros clientes
              </h2>
            </AnimatedText>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  {/* Quote Icon */}
                  <div className="inline-flex p-3 bg-blue-500/10 rounded-full border border-blue-500/20 mb-6">
                    <Quote className="w-6 h-6 text-blue-400" />
                  </div>

                  {/* Testimonial Content */}
                  <blockquote className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6 italic">
                    "{allTestimonials[currentTestimonial].content}"
                  </blockquote>

                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-4">
                    {renderStars(allTestimonials[currentTestimonial].rating)}
                  </div>

                  {/* Client Info */}
                  <div className="text-center">
                    <div className="font-semibold text-white text-lg">
                      {allTestimonials[currentTestimonial].clientName}
                    </div>
                    <div className="text-gray-400">
                      {allTestimonials[currentTestimonial].clientCompany}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-full border border-gray-600/50 transition-colors"
                aria-label="Testimonial anterior"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-full border border-gray-600/50 transition-colors"
                aria-label="Siguiente testimonial"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {allTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-blue-400' : 'bg-gray-600'
                  }`}
                  aria-label={`Ir al testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Trust Badges */}
      {showBadges && (
        <AnimatedSection 
          animation="fadeUp"
          threshold={0.2}
        >
          <div className="text-center mb-8">
            <AnimatedText variant="fadeUp">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                ¿Por qué elegirnos?
              </h2>
            </AnimatedText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="inline-flex p-3 bg-gray-700/30 rounded-lg mb-4">
                  <badge.icon className={`w-6 h-6 ${badge.color}`} />
                </div>
                <h3 className="font-semibold text-white mb-2">
                  {badge.name}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {badge.description}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}