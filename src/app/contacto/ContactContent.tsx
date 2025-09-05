'use client';

// src/app/contacto/ContactContent.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';
import { FAQCard } from '@/components/ui/FAQCard';
import { faqData } from '@/data/faq';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export function ContactContent() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const services = [
    'Impresión Digital',
    'Corte Láser',
    'Diseño Gráfico',
    'Señalética',
    'Productos Promocionales',
    'Otro'
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }

    // Phone validation (optional but if provided, should be valid)
    if (formData.phone.trim()) {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Por favor ingresa un teléfono válido';
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Reset form and show success message
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        });
        setSubmitStatus('success');
      } else {
        console.error('Server error:', data.error);
        setSubmitStatus('error');
      }

    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Breadcrumb items for navigation
  const breadcrumbItems = [
    { name: 'Contacto' }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-4 md:px-6">

          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contacto
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              ¿Listo para darle vida a tu marca? Hablemos de tu proyecto y convirtamos tus ideas en realidad.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

            {/* Contact Form */}
            <div>
              <Card className="p-8 bg-gray-900 border-gray-800">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Envíanos un mensaje
                </h2>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-900/20 border border-green-700 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <p className="text-green-300 font-medium">
                        ¡Solicitud enviada correctamente!
                      </p>
                    </div>
                    <p className="text-green-200 text-sm">
                      Hemos recibido tu mensaje y nos pondremos en contacto contigo en las próximas 24 horas. 
                      Para una respuesta más rápida, contáctanos por WhatsApp.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <p className="text-red-300">
                      Hubo un error al enviar el mensaje. Por favor intenta nuevamente.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.name ? 'border-red-500' : 'border-gray-700'
                          }`}
                        placeholder="Tu nombre completo"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-700'
                          }`}
                        placeholder="tu@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-700'
                          }`}
                        placeholder="+1 234 567 8900"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                        Empresa
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                      Servicio de interés
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                      <option value="">Selecciona un servicio</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-vertical ${errors.message ? 'border-red-500' : 'border-gray-700'
                        }`}
                      placeholder="Cuéntanos sobre tu proyecto..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Enviar Mensaje
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Business Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Información de contacto
                </h2>
                <p className="text-gray-300 mb-8">
                  Estamos aquí para ayudarte con todos tus proyectos de impresión digital,
                  corte láser y diseño gráfico. No dudes en contactarnos.
                </p>
              </div>

              {/* Communication Methods */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-4 bg-gray-900 border-gray-800 text-center">
                  <div className="flex flex-col items-center min-h-[180px]">
                    <div className="p-3 bg-blue-600 rounded-lg mb-4">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                    <p className="text-gray-300 mb-2 break-words text-sm px-2">
                      <a
                        href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                        className="hover:text-blue-400 transition-colors"
                      >
                        {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                      </a>
                    </p>
                    <p className="text-sm text-gray-400">
                      Respuesta en 24 horas
                    </p>
                  </div>
                </Card>

                <Card className="p-4 bg-gray-900 border-gray-800 text-center">
                  <div className="flex flex-col items-center min-h-[180px]">
                    <div className="p-3 bg-green-600 rounded-lg mb-4">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Teléfono</h3>
                    <p className="text-gray-300 mb-2 break-words text-sm px-2">
                      <a
                        href="tel:6121210933"
                        className="hover:text-green-400 transition-colors"
                      >
                        (612) 121-0933
                      </a>
                    </p>
                    <p className="text-sm text-gray-400">
                      Llamadas directas
                    </p>
                  </div>
                </Card>

                <Card className="p-4 bg-gray-900 border-gray-800 text-center">
                  <div className="flex flex-col items-center min-h-[180px]">
                    <div className="p-3 bg-green-500 rounded-lg mb-4">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">WhatsApp</h3>
                    <p className="text-gray-300 mb-2 break-words text-sm px-2">
                      <a
                        href="https://wa.me/5216122025530"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-400 transition-colors"
                      >
                        +52 (612) 202-5530
                      </a>
                    </p>
                    <p className="text-sm text-gray-400">
                      Respuesta inmediata
                    </p>
                  </div>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Acciones rápidas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href="/servicios"
                    className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors text-center"
                  >
                    <h4 className="text-white font-medium mb-1">Ver Imprenta</h4>
                    <p className="text-sm text-gray-400">Conoce todo lo que ofrecemos</p>
                  </a>
                  <a
                    href="/portafolio"
                    className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors text-center"
                  >
                    <h4 className="text-white font-medium mb-1">Ver Servicios Digitales</h4>
                    <p className="text-sm text-gray-400">Mira nuestros trabajos</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="w-full py-12 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nuestra Ubicación
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Visítanos en nuestras instalaciones. Estamos ubicados en La Paz, Baja California Sur.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Card className="p-6 bg-gray-900 border-gray-700">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Map Embed */}
                <div className="lg:col-span-2">
                  <div className="relative w-full h-96 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3664.8234567890123!2d-110.31234567890123!3d24.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86af4e123456789a%3A0x123456789abcdef0!2sC.%20Gama%202025%2C%20Libertad%2C%2023078%20La%20Paz%2C%20B.C.S.%2C%20Mexico!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                      title="Ubicación de Artes Gráficas Digitales"
                    />
                  </div>
                </div>

                {/* Location Details */}
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Visítanos
                    </h3>
                    <p className="text-gray-300 text-sm mb-6">
                      C. Gama 2025, Libertad<br />
                      La Paz, Baja California Sur 23078<br />
                      México
                    </p>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-orange-600 rounded-lg">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="text-white font-medium">Horarios de Atención</h4>
                    </div>
                    <div className="text-gray-300 text-sm space-y-1 ml-11">
                      <p><strong>Lun:</strong> 9:00 AM - 5:00 PM</p>
                      <p><strong>Mar - Vie:</strong> 9:00 AM - 6:00 PM</p>
                      <p><strong>Sáb:</strong> 9:00 AM - 1:00 PM</p>
                      <p><strong>Dom:</strong> Cerrado</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <a
                      href="https://g.co/kgs/YZXWMgX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                    >
                      <MapPin className="w-4 h-4" />
                      Abrir en Google Maps
                    </a>
                    <p className="text-xs text-gray-400 mt-2">
                      Visitas con cita previa
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section - Desktop: ScrollStack, Mobile: Static Grid */}
      <section className="w-full bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800" />

        {/* Header */}
        <div className="relative z-10 text-center pt-12 pb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto px-4">
            Encuentra respuestas a las preguntas más comunes sobre nuestros servicios
          </p>
        </div>

        {/* Mobile FAQ - Static Grid (visible only on mobile) */}
        <div className="block lg:hidden relative z-10 pb-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
              {faqData.map((faq, index) => (
                <FAQCard key={faq.id} faq={faq} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop FAQ - ScrollStack (visible only on desktop) */}
        <div className="hidden lg:block h-screen overflow-hidden">
          {/* ScrollStack Container */}
          <div className="relative z-10 h-full">
            <ScrollStack
              className="h-full"
              itemDistance={120}
              itemScale={0}
              itemStackDistance={5}
              stackPosition="25%"
              scaleEndPosition="15%"
              baseScale={0.88}
              rotationAmount={0}
              blurAmount={0}
            >
              {faqData.map((faq, index) => (
                <ScrollStackItem key={faq.id}>
                  <FAQCard faq={faq} index={index} />
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex flex-col items-center text-gray-400">
              <p className="text-sm mb-2">Desplázate para ver más</p>
              <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}