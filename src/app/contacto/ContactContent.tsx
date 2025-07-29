'use client';

// src/app/contacto/ContactContent.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

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
      // Create mailto link with form data
      const subject = encodeURIComponent(`Consulta de ${formData.name} - ${formData.service || 'Consulta General'}`);
      const body = encodeURIComponent(
        `Nombre: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Teléfono: ${formData.phone || 'No proporcionado'}\n` +
        `Empresa: ${formData.company || 'No proporcionado'}\n` +
        `Servicio de interés: ${formData.service || 'No especificado'}\n\n` +
        `Mensaje:\n${formData.message}`
      );
      
      const mailtoLink = `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
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
      
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-4 md:px-6">
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
                  <div className="mb-6 p-4 bg-green-900/20 border border-green-700 rounded-lg flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <p className="text-green-300">
                      ¡Mensaje enviado correctamente! Te contactaremos pronto.
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
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          errors.name ? 'border-red-500' : 'border-gray-700'
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
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          errors.email ? 'border-red-500' : 'border-gray-700'
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
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-gray-700'
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
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-vertical ${
                        errors.message ? 'border-red-500' : 'border-gray-700'
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

              <div className="space-y-6">
                <Card className="p-6 bg-gray-900 border-gray-800">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-600 rounded-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                      <p className="text-gray-300">
                        <a 
                          href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                          className="hover:text-blue-400 transition-colors"
                        >
                          {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                        </a>
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Respuesta en 24 horas
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gray-900 border-gray-800">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-600 rounded-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Teléfono</h3>
                      <p className="text-gray-300">
                        <a 
                          href="tel:+1234567890"
                          className="hover:text-green-400 transition-colors"
                        >
                          +1 (234) 567-8900
                        </a>
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Lun - Vie: 9:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gray-900 border-gray-800">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-600 rounded-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Ubicación</h3>
                      <p className="text-gray-300">
                        Calle Principal 123<br />
                        Ciudad, Estado 12345<br />
                        País
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Visitas con cita previa
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gray-900 border-gray-800">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-600 rounded-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Horarios</h3>
                      <div className="text-gray-300 space-y-1">
                        <p>Lunes - Viernes: 9:00 AM - 6:00 PM</p>
                        <p>Sábados: 10:00 AM - 2:00 PM</p>
                        <p>Domingos: Cerrado</p>
                      </div>
                    </div>
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
                    <h4 className="text-white font-medium mb-1">Ver Servicios</h4>
                    <p className="text-sm text-gray-400">Conoce todo lo que ofrecemos</p>
                  </a>
                  <a
                    href="/portafolio"
                    className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors text-center"
                  >
                    <h4 className="text-white font-medium mb-1">Ver Portafolio</h4>
                    <p className="text-sm text-gray-400">Mira nuestros trabajos</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Encuentra respuestas a las preguntas más comunes sobre nuestros servicios
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-6 bg-gray-800 border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">
                ¿Cuánto tiempo toma completar un proyecto?
              </h3>
              <p className="text-gray-300">
                El tiempo de entrega depende del tipo y complejidad del proyecto. 
                Proyectos simples pueden estar listos en 1-3 días, mientras que proyectos 
                más complejos pueden tomar 1-2 semanas. Te daremos un tiempo estimado específico 
                cuando discutamos tu proyecto.
              </p>
            </Card>

            <Card className="p-6 bg-gray-800 border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">
                ¿Ofrecen servicios de diseño personalizado?
              </h3>
              <p className="text-gray-300">
                Sí, ofrecemos servicios completos de diseño gráfico personalizado. 
                Nuestro equipo puede crear diseños únicos desde cero o trabajar con 
                tus ideas existentes para desarrollar la solución perfecta para tu marca.
              </p>
            </Card>

            <Card className="p-6 bg-gray-800 border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">
                ¿Qué formatos de archivo aceptan?
              </h3>
              <p className="text-gray-300">
                Aceptamos una amplia variedad de formatos incluyendo AI, PSD, PDF, EPS, 
                JPG, PNG, y más. Si tienes dudas sobre un formato específico, no dudes 
                en contactarnos y te ayudaremos.
              </p>
            </Card>

            <Card className="p-6 bg-gray-800 border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">
                ¿Manejan proyectos de gran volumen?
              </h3>
              <p className="text-gray-300">
                Absolutamente. Tenemos la capacidad y experiencia para manejar proyectos 
                de cualquier tamaño, desde pedidos pequeños hasta producciones de gran volumen. 
                Ofrecemos precios especiales para pedidos grandes.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}