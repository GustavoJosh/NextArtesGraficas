"use client";

import Link from 'next/link';
import { ExternalLink, Printer, Globe, Mountain, Car, Clock, MapPin, MessageCircle, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import AnimatedContent from '@/components/ui/AnimatedContent';
import styles from './LinksPageContent.module.css';
import LogoLoop from './ui/LogoLoop';
import { SiInstagram, SiTiktok, SiFacebook, SiWhatsapp } from "react-icons/si";
import { Card } from './ui/card';
import PillNavWithTranslation from './navigation/PillNavWithTranslation';
import { useTranslation } from '@/hooks/useTranslation';
import { TranslationProvider } from '@/contexts/TranslationContext';

const LogoSocial = [
    { node: <SiInstagram style={{ color: '#000000' }} />, title: "Instagram", href: "https://www.instagram.com/artesgraficasbcs/" },
    { node: <SiTiktok style={{ color: '#000000' }} />, title: "TikTok", href: "https://www.tiktok.com/@artesgraficasdigitales" },
    { node: <SiFacebook style={{ color: '#000000' }} />, title: "Facebook", href: "https://www.facebook.com/artes.graficasg" },
    { node: <SiWhatsapp style={{ color: '#000000' }} />, title: "Whatsapp", href: "https://wa.me/526122025530?text=Hola%20quiero%20informacion" }
]

function LinksPageContentInner() {
    const { t } = useTranslation();
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isQRMenusOpen, setIsQRMenusOpen] = useState(false);
    const [isWebDemosOpen, setIsWebDemosOpen] = useState(false);

    return (
        <div className={`relative w-full bg-white overflow-hidden ${styles.container}`}>
            {/* Navigation */}
            <div className="fixed top-4 left-4 right-4 z-50 flex justify-center">
                <PillNavWithTranslation
                    logo="/images/logos/circle.png"
                    logoAlt="Artes Gráficas Digitales"
                    baseColor="#1f2937"
                    pillColor="#ffffff"
                    hoveredPillTextColor="#1f2937"
                    pillTextColor="#1f2937"
                />
            </div>

            <div className={`relative z-10 ${styles.content} pt-20`}>
                {/* Header with Logo */}
                <div className="text-center mb-6 sm:mb-8">
                    <AnimatedContent
                        distance={300}
                        direction="vertical"
                        reverse={false}
                        duration={3}
                        ease="power2.out"
                        initialOpacity={0}
                        animateOpacity
                        scale={1.05}
                        threshold={0}
                        delay={0}
                    >



                        <div className="flex justify-center mb-4">
                            <Image
                                src="/images/logos/banner.png"
                                alt="Artes Gráficas Digitales Logo"
                                width={300}
                                height={300}
                                className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain"
                                priority
                            />
                        </div>

                    </AnimatedContent>
                </div>


                <AnimatedContent
                    distance={300}
                    direction="horizontal"
                    reverse={false}
                    duration={3}
                    ease="power2.out"
                    initialOpacity={0}
                    animateOpacity
                    scale={1.05}
                    threshold={0}
                    delay={0.4}
                >
                    <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 mb-4 mt-6 sm:mt-8">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 text-center">
                            {t('social.title')}
                        </h2>
                        <div style={{ height: '120px', position: 'relative', overflow: 'hidden' }}>
                            <LogoLoop
                                logos={LogoSocial}
                                speed={80}
                                direction="left"
                                logoHeight={40}
                                gap={32}
                                pauseOnHover
                                scaleOnHover
                                fadeOut
                                fadeOutColor="rgba(241, 245, 249, 0.8)"
                                ariaLabel="Redes sociales"
                            />
                        </div>
                    </div>
                </AnimatedContent>

                {/* Location Section with Collapsible Content */}
                <div className="mb-5">
                    <button
                        onClick={() => setIsLocationOpen(!isLocationOpen)}
                        className="w-full bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg p-4 transition-colors duration-200 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-600 rounded-lg">
                                <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-semibold text-gray-800">{t('location.title')}</span>
                        </div>
                        {isLocationOpen ? (
                            <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                    </button>

                    {isLocationOpen && (
                        <div className="mt-4 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                            <section className="w-full py-8 md:py-12">
                                <div className="container mx-auto px-4 md:px-6">
                                    <div className="text-center mb-8">
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                                            {t('location.our')}
                                        </h2>
                                        <p className="text-gray-600 max-w-2xl mx-auto">
                                            {t('location.description')}
                                        </p>
                                    </div>

                                    <div className="max-w-6xl mx-auto">
                                        <Card className="p-6 bg-white border-gray-200 shadow-lg">
                                            <div className="grid grid-cols-1 gap-8">
                                                {/* Map Embed */}
                                                <div>
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
                                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                            {t('location.visit')}
                                                        </h3>
                                                        <p className="text-gray-600 text-sm mb-6">
                                                            C. Gama 2025, Libertad<br />
                                                            La Paz, Baja California Sur 23078<br />
                                                            México
                                                        </p>
                                                    </div>

                                                    <div className="bg-gray-100 rounded-lg p-4">
                                                        <div className="flex items-center gap-3 mb-3">
                                                            <div className="p-2 bg-orange-600 rounded-lg">
                                                                <Clock className="w-4 h-4 text-white" />
                                                            </div>
                                                            <h4 className="text-gray-800 font-medium">{t('location.hours')}</h4>
                                                        </div>
                                                        <div className="text-gray-600 text-sm space-y-1 ml-11">
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
                                                            {t('location.maps')}
                                                        </a>
                                                        <p className="text-xs text-gray-500 mt-2">
                                                            {t('location.appointment')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}
                </div>

                {/* Contact & Services Section with Collapsible Content */}
                <div className="mb-8">
                    <button
                        onClick={() => setIsContactOpen(!isContactOpen)}
                        className="w-full bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg p-4 transition-colors duration-200 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-600 rounded-lg">
                                <MessageCircle className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-semibold text-gray-800">{t('contact.title')}</span>
                        </div>
                        {isContactOpen ? (
                            <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                    </button>

                    {isContactOpen && (
                        <div className="mt-4 space-y-4">
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
                                        {t('whatsapp.response')}
                                    </p>
                                </div>
                            </Card>
                            <Link
                                href="/contacto"
                                className="block w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-center text-sm sm:text-base font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 transform active:scale-95 sm:hover:scale-105 flex items-center justify-center"
                            >
                                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                {t('btn.quote')}
                            </Link>
                            <Link
                                href="/servicios"
                                className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-center text-sm sm:text-base font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform active:scale-95 sm:hover:scale-105 flex items-center justify-center"
                            >
                                <Printer className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                {t('btn.printing')}
                            </Link>
                        </div>
                    )}
                </div>

                {/* Call to Action Section */}
                <AnimatedContent
                    distance={300}
                    direction="vertical"
                    reverse={false}
                    duration={3}
                    ease="power2.out"
                    initialOpacity={0}
                    animateOpacity
                    scale={1.05}
                    threshold={0}
                    delay={0}
                >
                    <div className="text-center mb-8 px-4">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                            {t('cta.title')}
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                            {t('cta.description')}
                        </p>
                    </div>
                </AnimatedContent>

                {/* QR Menus Section with Collapsible Content */}
                <div className="mb-5">
                    <button
                        onClick={() => setIsQRMenusOpen(!isQRMenusOpen)}
                        className="w-full bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg p-4 transition-colors duration-200 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-600 rounded-lg">
                                <ExternalLink className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-semibold text-gray-800">{t('qr.title')}</span>
                        </div>
                        {isQRMenusOpen ? (
                            <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                    </button>

                    {isQRMenusOpen && (
                        <div className="mt-4">
                            <AnimatedContent
                                distance={300}
                                direction="horizontal"
                                reverse={true}
                                duration={3}
                                ease="power2.out"
                                initialOpacity={0}
                                animateOpacity
                                scale={1.05}
                                threshold={0}
                                delay={0}
                            >
                                <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
                                    <div className="space-y-2">
                                        <Link
                                            href="/menusqr/elegante"
                                            className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform active:scale-95 sm:hover:scale-105"
                                        >
                                            Elegante
                                        </Link>
                                        <Link
                                            href="/menusqr/minimalista"
                                            className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform active:scale-95 sm:hover:scale-105"
                                        >
                                            Minimalista
                                        </Link>
                                        <Link
                                            href="/menusqr/neon"
                                            className="block w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-blue-500 hover:to-blue-600 transition-all duration-200 transform active:scale-95 sm:hover:scale-105"
                                        >
                                            Neón
                                        </Link>
                                        <Link
                                            href="/menusqr/oceano"
                                            className="block w-full bg-gradient-to-r from-blue-700 to-blue-800 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-blue-800 hover:to-blue-900 transition-all duration-200 transform active:scale-95 sm:hover:scale-105"
                                        >
                                            Océano
                                        </Link>
                                    </div>
                                </div>
                            </AnimatedContent>
                        </div>
                    )}
                </div>

                {/* Website Demos Section with Collapsible Content */}
                <div className="mb-5">
                    <button
                        onClick={() => setIsWebDemosOpen(!isWebDemosOpen)}
                        className="w-full bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg p-4 transition-colors duration-200 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-600 rounded-lg">
                                <Globe className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-semibold text-gray-800">{t('web.title')}</span>
                        </div>
                        {isWebDemosOpen ? (
                            <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                    </button>

                    {isWebDemosOpen && (
                        <div className="mt-4">
                            <AnimatedContent
                                distance={300}
                                direction="horizontal"
                                reverse={false}
                                duration={3}
                                ease="power2.out"
                                initialOpacity={0}
                                animateOpacity
                                scale={1.05}
                                threshold={0}
                                delay={0.2}
                            >
                                <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
                                    <div className="space-y-2">
                                        <Link
                                            href="https://gustavojosh.github.io/catalogoPuertas/"
                                            target="_blank"
                                            className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 transform active:scale-95 sm:hover:scale-105 flex items-center justify-center"
                                        >
                                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                            Puertas Premium
                                        </Link>
                                        <Link
                                            href="https://gustavojosh.github.io/catalogoRocas/"
                                            target="_blank"
                                            className="block w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 transform active:scale-95 sm:hover:scale-105 flex items-center justify-center"
                                        >
                                            <Mountain className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                            Piedra y Arena
                                        </Link>
                                        <Link
                                            href="https://gustavojosh.github.io/QRDinamico/"
                                            target="_blank"
                                            className="block w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-green-500 hover:to-green-600 transition-all duration-200 transform active:scale-95 sm:hover:scale-105 flex items-center justify-center"
                                        >
                                            <Car className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                            Vive La Baja 4x4
                                        </Link>
                                        <Link
                                            href="https://cadimlapaz.com/"
                                            target="_blank"
                                            className="block w-full bg-gradient-to-r from-green-700 to-green-800 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-green-800 hover:to-green-900 transition-all duration-200 transform active:scale-95 sm:hover:scale-105 flex items-center justify-center"
                                        >
                                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                            Consultorio CADIM
                                        </Link>
                                    </div>
                                </div>
                            </AnimatedContent>
                        </div>
                    )}
                </div>

                {/* Links Container */}
                <div className="space-y-3 sm:space-y-4">

                    {/* Footer */}
                    <div className="text-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                        <p className="text-xs sm:text-sm text-gray-400">
                            © 2024 Artes Gráficas
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function LinksPageContent() {
    return (
        <TranslationProvider>
            <LinksPageContentInner />
        </TranslationProvider>
    );
}