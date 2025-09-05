'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'es' | 'en';

interface Translations {
  [key: string]: {
    es: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { es: 'Inicio', en: 'Home' },
  'nav.services': { es: 'Servicios', en: 'Services' },
  'nav.contact': { es: 'Contacto', en: 'Contact' },
  
  // Main content
  'social.title': { es: 'Síguenos en Redes Sociales', en: 'Follow us on Social Media' },
  'location.title': { es: 'Ubicación', en: 'Location' },
  'contact.title': { es: 'Contacto y Servicios', en: 'Contact & Services' },
  'qr.title': { es: 'Plantillas de Menú QR', en: 'QR Menu Templates' },
  'web.title': { es: 'Demos de Páginas Web', en: 'Website Demos' },
  
  // Buttons
  'btn.quote': { es: 'Cotiza en linea con nosotros', en: 'Get a quote online' },
  'btn.printing': { es: 'Imprenta', en: 'Printing' },
  'btn.whatsapp': { es: 'WhatsApp', en: 'WhatsApp' },
  
  // Service buttons
  'services.title': { es: 'Nuestros Servicios', en: 'Our Services' },
  'services.subtitle': { es: 'Te invitamos a conocer nuestros nuevos servicios web completamente bilingües', en: 'We invite you to discover our new completely bilingual web services' },
  'services.subtitle2': { es: 'Olvídate de la barrera del idioma', en: 'Forget about the language barrier' },
  'services.whatsapp': { es: 'WhatsApp', en: 'WhatsApp' },
  'services.quote': { es: 'Cotizar', en: 'Quote' },
  'services.location': { es: 'Ubicación', en: 'Location' },
  'services.website': { es: 'www.artesgraficasbcs.com', en: 'www.artesgraficasbcs.com' },
  'services.page_designs': { es: 'Diseños Páginas', en: 'Page Designs' },
  'services.qr_menus': { es: 'Menús QR', en: 'QR Menus' },
  'services.digital_invitations': { es: 'Invitaciones Digitales', en: 'Digital Invitations' },
  'services.interactive_qr': { es: 'QR Dinámico Interactivo', en: 'Interactive Dynamic QR' },
  
  // Location details
  'location.visit': { es: 'Visítanos', en: 'Visit Us' },
  'location.hours': { es: 'Horarios de Atención', en: 'Business Hours' },
  'location.maps': { es: 'Abrir en Google Maps', en: 'Open in Google Maps' },
  'location.appointment': { es: 'Visitas con cita previa', en: 'Visits by appointment' },
  'location.description': { 
    es: 'Visítanos en nuestras instalaciones. Estamos ubicados en La Paz, Baja California Sur.',
    en: 'Visit us at our facilities. We are located in La Paz, Baja California Sur.'
  },
  'location.our': { es: 'Nuestra Ubicación', en: 'Our Location' },
  
  // Call to action
  'cta.title': { 
    es: 'Te invitamos a conocer nuestros nuevos servicios digitales',
    en: 'We invite you to discover our new digital services'
  },
  'cta.description': { 
    es: 'Descubre nuestras plantillas de menús QR y explora ejemplos de páginas web que hemos creado para nuestros clientes',
    en: 'Discover our QR menu templates and explore examples of websites we have created for our clients'
  },
  
  // WhatsApp
  'whatsapp.response': { es: 'Respuesta inmediata', en: 'Immediate response' },
  
  // Days
  'day.mon': { es: 'Lun', en: 'Mon' },
  'day.tue': { es: 'Mar', en: 'Tue' },
  'day.wed': { es: 'Mié', en: 'Wed' },
  'day.thu': { es: 'Jue', en: 'Thu' },
  'day.fri': { es: 'Vie', en: 'Fri' },
  'day.sat': { es: 'Sáb', en: 'Sat' },
  'day.sun': { es: 'Dom', en: 'Sun' },
  'day.closed': { es: 'Cerrado', en: 'Closed' },
};

interface TranslationContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isSpanish: boolean;
  isEnglish: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [language, setLanguage] = useState<Language>('es');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage: Language = language === 'es' ? 'en' : 'es';
    setLanguage(newLanguage);
    if (isClient) {
      localStorage.setItem('language', newLanguage);
    }
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const value = {
    language,
    toggleLanguage,
    t,
    isSpanish: language === 'es',
    isEnglish: language === 'en'
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}