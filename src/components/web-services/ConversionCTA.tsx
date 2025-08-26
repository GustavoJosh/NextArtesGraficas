"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Calendar, 
  ArrowRight, 
  Clock, 
  CheckCircle,
  Zap,
  Star,
  FileText
} from 'lucide-react';
import { AnimatedSection, AnimatedText } from '@/components/ui/AnimatedSection';
import { QuickContactForm } from './QuickContactForm';

interface ConversionCTAProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'urgent';
  showUrgency?: boolean;
  showQuickForm?: boolean;
  onContactClick?: (method: 'phone' | 'email' | 'whatsapp' | 'form') => void;
}

export function ConversionCTA({ 
  className = "",
  variant = 'primary',
  showUrgency = true,
  showQuickForm = false,
  onContactClick
}: ConversionCTAProps) {
  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleContactClick = (method: 'phone' | 'email' | 'whatsapp' | 'form') => {
    if (onContactClick) {
      onContactClick(method);
    } else {
      // Default behavior based on contact method
      switch (method) {
        case 'phone':
          window.open('tel:6121210933', '_self');
          break;
        case 'email':
          window.open(`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`, '_self');
          break;
        case 'whatsapp':
          window.open('https://wa.me/5216121210933?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20sus%20servicios%20web', '_blank');
          break;
        case 'form':
          window.location.href = '/contacto';
          break;
      }
    }
  };

  const contactMethods = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      description: 'Respuesta inmediata',
      icon: MessageCircle,
      color: 'from-green-500 to-green-600',
      hoverColor: 'from-green-600 to-green-700',
      textColor: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      action: () => handleContactClick('whatsapp')
    },
    {
      id: 'phone',
      name: 'Llamar Ahora',
      description: 'Consulta directa',
      icon: Phone,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'from-blue-600 to-blue-700',
      textColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      action: () => handleContactClick('phone')
    },
    {
      id: 'email',
      name: 'Email',
      description: 'Cotización detallada',
      icon: Mail,
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'from-purple-600 to-purple-700',
      textColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      action: () => handleContactClick('email')
    },
    {
      id: 'form',
      name: 'Formulario',
      description: 'Información completa',
      icon: showQuickForm ? FileText : Calendar,
      color: 'from-orange-500 to-orange-600',
      hoverColor: 'from-orange-600 to-orange-700',
      textColor: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
      action: () => showQuickForm ? setShowForm(true) : handleContactClick('form')
    }
  ];

  const urgencyElements = [
    { icon: Clock, text: "Respuesta en 24 horas" },
    { icon: CheckCircle, text: "Consulta gratuita" },
    { icon: Zap, text: "Desarrollo rápido" },
    { icon: Star, text: "Calidad garantizada" }
  ];

  const getVariantStyles = () => {
    switch (variant) {
      case 'urgent':
        return {
          background: 'bg-gradient-to-br from-red-900/20 via-orange-900/20 to-yellow-900/20',
          border: 'border-orange-500/30',
          accent: 'from-orange-500 to-red-500'
        };
      case 'secondary':
        return {
          background: 'bg-gradient-to-br from-gray-800/50 via-gray-700/50 to-gray-800/50',
          border: 'border-gray-600/30',
          accent: 'from-blue-500 to-purple-500'
        };
      default:
        return {
          background: 'bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20',
          border: 'border-blue-500/30',
          accent: 'from-blue-500 to-purple-500'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <AnimatedSection 
      className={`conversion-cta ${className}`}
      animation="fadeUp"
      threshold={0.2}
    >
      <div className={`relative p-8 md:p-12 rounded-2xl border backdrop-blur-sm ${styles.background} ${styles.border}`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>

        <div className="relative z-10">
          {/* Header Section */}
          <div className="text-center mb-8">
            <AnimatedText 
              variant="fadeUp"
              delay={0.1}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                ¿Listo para{' '}
                <span className={`bg-gradient-to-r ${styles.accent} bg-clip-text text-transparent`}>
                  transformar
                </span>{' '}
                tu negocio?
              </h2>
            </AnimatedText>

            <AnimatedText 
              variant="fadeUp"
              delay={0.2}
              className="max-w-2xl mx-auto"
            >
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Obtén una cotización personalizada y descubre cómo nuestros servicios web 
                pueden impulsar tu presencia digital.
              </p>
            </AnimatedText>
          </div>

          {/* Urgency Elements */}
          {showUrgency && (
            <AnimatedSection 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              animation="stagger"
              delay={0.3}
            >
              {urgencyElements.map((element, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center p-4 bg-white/5 rounded-lg border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <element.icon className="w-6 h-6 text-blue-400 mb-2" />
                  <span className="text-sm text-gray-300 text-center">
                    {element.text}
                  </span>
                </motion.div>
              ))}
            </AnimatedSection>
          )}

          {/* Contact Methods Grid */}
          <AnimatedSection 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            animation="stagger"
            delay={0.4}
          >
            {contactMethods.map((method, index) => (
              <motion.button
                key={method.id}
                onClick={method.action}
                onMouseEnter={() => setHoveredMethod(method.id)}
                onMouseLeave={() => setHoveredMethod(null)}
                className={`group relative p-6 rounded-xl border transition-all duration-300 ${method.bgColor} ${method.borderColor} hover:scale-105 hover:shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${hoveredMethod === method.id ? method.hoverColor : method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10 text-center">
                  <div className={`inline-flex p-3 rounded-lg mb-3 ${method.bgColor} border ${method.borderColor}`}>
                    <method.icon className={`w-6 h-6 ${method.textColor}`} />
                  </div>
                  <h3 className="font-semibold text-white mb-1">
                    {method.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {method.description}
                  </p>
                </div>

                {/* Hover Arrow */}
                <motion.div
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
                  initial={{ x: -10 }}
                  animate={{ x: hoveredMethod === method.id ? 0 : -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className={`w-4 h-4 ${method.textColor}`} />
                </motion.div>
              </motion.button>
            ))}
          </AnimatedSection>

          {/* Primary CTA Button */}
          <AnimatedText 
            variant="fadeUp"
            delay={0.6}
            className="text-center"
          >
            <motion.button
              onClick={() => handleContactClick('whatsapp')}
              className={`group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${styles.accent} rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative">
                Comenzar Proyecto Ahora
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </AnimatedText>

          {/* Trust Badge */}
          <AnimatedText 
            variant="fadeUp"
            delay={0.7}
            className="text-center mt-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-300">
                +50 proyectos exitosos
              </span>
            </div>
          </AnimatedText>
        </div>
      </div>

      {/* Quick Contact Form Modal */}
      {showQuickForm && (
        <QuickContactForm
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          variant="modal"
        />
      )}
    </AnimatedSection>
  );
}