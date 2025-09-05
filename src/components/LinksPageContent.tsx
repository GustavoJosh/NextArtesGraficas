"use client";

import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Car, MapPin, Mail, ChevronDown, AppWindow, Utensils, QrCode } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

import AnimatedContent from '@/components/ui/AnimatedContent';
import styles from './LinksPageContent.module.css';
import LogoLoop from './ui/LogoLoop';
import { SiInstagram, SiTiktok, SiFacebook, SiWhatsapp } from "react-icons/si";
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
    const [isPageDesignsOpen, setIsPageDesignsOpen] = useState(false);
    const [isQrMenuOpen, setIsQrMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const qrDropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsPageDesignsOpen(false);
            }
            if (qrDropdownRef.current && !qrDropdownRef.current.contains(event.target as Node)) {
                setIsQrMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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

                {/* Service Buttons Section */}
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
                    delay={0.2}
                >
                    <div className="mb-8 px-4">
                        {/* Social Media Logo Loop */}
                        <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 mb-6">
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

                        {/* Service Buttons Grid */}
                        <div className="space-y-3 max-w-md mx-auto">
                            {/* WhatsApp Button */}
                            <a
                                href="https://wa.me/5216122025530?text=Hola%20quiero%20informacion"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-full bg-white border-2 border-gray-300 rounded-full px-6 py-4 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md relative"
                            >
                                <div className="absolute left-4 flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">
                                    <SiWhatsapp className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-gray-800 font-semibold text-lg tracking-wide uppercase">
                                    {t('services.whatsapp')}
                                </span>
                            </a>

                            {/* Quote Button */}
                            <Link
                                href="/contacto"
                                className="flex items-center justify-center w-full bg-white border-2 border-gray-300 rounded-full px-6 py-4 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md relative"
                            >
                                <div className="absolute left-4 flex items-center justify-center w-8 h-8 bg-gray-800 rounded-full">
                                    <Mail className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-gray-800 font-semibold text-lg tracking-wide uppercase">
                                    {t('services.quote')}
                                </span>
                            </Link>

                            {/* Location Button */}
                            <Link
                                href="/ubicacion"
                                className="flex items-center justify-center w-full bg-white border-2 border-gray-300 rounded-full px-6 py-4 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md relative"
                            >
                                <div className="absolute left-4 flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
                                    <MapPin className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-gray-800 font-semibold text-lg tracking-wide uppercase">
                                    {t('services.location')}
                                </span>
                            </Link>

                            {/* Website Button */}
                            <a
                                href="https://www.artesgraficasbcs.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-full bg-white border-2 border-gray-300 rounded-full px-6 py-4 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md relative"
                            >
                                <div className="absolute left-4 flex items-center justify-center w-8 h-8 bg-gray-800 rounded-full">
                                    <Globe className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-gray-800 font-semibold text-sm tracking-wide">
                                    {t('services.website')}
                                </span>
                            </a>
                        </div>

                        {/* Service Description */}
                        <div className="text-center mt-8 mb-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-2 uppercase tracking-wide">
                                {t('services.subtitle')}
                            </h3>
                            <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">
                                {t('services.subtitle2')}
                            </p>
                        </div>

                        {/* Additional Service Buttons */}
                        <div className="space-y-3 max-w-md mx-auto">
                            {/* Page Designs Dropdown Button */}
                            <div ref={dropdownRef}>
                                <button
                                    onClick={() => setIsPageDesignsOpen(!isPageDesignsOpen)}
                                    className="flex items-center justify-center w-full bg-white border-2 border-gray-300 rounded-full px-6 py-4 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md relative"
                                >
                                    <div className="absolute left-4 flex items-center justify-center w-8 h-8 bg-gray-800 rounded-full">
                                        <AppWindow className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-gray-800 font-semibold text-lg tracking-wide uppercase">
                                        {t('services.page_designs')}
                                    </span>
                                    <ChevronDown
                                        className={`absolute right-4 w-5 h-5 text-gray-600 transition-transform duration-200 ${isPageDesignsOpen ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                {/* Dropdown Content - pushes content down instead of overlaying */}
                                {isPageDesignsOpen && (
                                    <div className="mt-3 bg-gray-100 border border-gray-200 rounded-lg p-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-green-600 rounded-lg">
                                                <Globe className="w-5 h-5 text-white" />
                                            </div>
                                            <h2 className="text-lg font-semibold text-gray-800">{t('web.title')}</h2>
                                        </div>
                                        <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
                                            <div className="space-y-2">
                                                <Link
                                                    href="https://gustavojosh.github.io/catalogoPuertas/"
                                                    target="_blank"
                                                    className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 transform active:scale-95 sm:hover:scale-105 flex items-center justify-center"
                                                    onClick={() => setIsPageDesignsOpen(false)}
                                                >
                                                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                                    {t('dropdown.online_services')}
                                                </Link>
                                                <Link
                                                    href="https://gustavojosh.github.io/catalogoRocas/"
                                                    target="_blank"
                                                    className="block w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 transform active:scale-95 sm:hover:scale-105 flex items-center justify-center"
                                                    onClick={() => setIsPageDesignsOpen(false)}
                                                >
                                                    <Mountain className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                                    {t('dropdown.construction_business')}
                                                </Link>
                                                <Link
                                                    href="https://gustavojosh.github.io/QRDinamico/"
                                                    target="_blank"
                                                    className="block w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-green-500 hover:to-green-600 transition-all duration-200 transform active:scale-95 sm:hover:scale-105 flex items-center justify-center"
                                                    onClick={() => setIsPageDesignsOpen(false)}
                                                >
                                                    <Car className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                                    {t('dropdown.interactive_qr')}
                                                </Link>
                                                <Link
                                                    href="https://cadimlapaz.com/"
                                                    target="_blank"
                                                    className="block w-full bg-gradient-to-r from-green-700 to-green-800 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-green-800 hover:to-green-900 transition-all duration-200 transform active:scale-95 sm:hover:scale-105 flex items-center justify-center"
                                                    onClick={() => setIsPageDesignsOpen(false)}
                                                >
                                                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                                    {t('dropdown.clinic_website')}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* QR Menus Dropdown Button */}
                            <div ref={qrDropdownRef}>
                                <button
                                    onClick={() => setIsQrMenuOpen(!isQrMenuOpen)}
                                    className="flex items-center justify-center w-full bg-white border-2 border-gray-300 rounded-full px-6 py-4 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md relative"
                                >
                                    <div className="absolute left-4 flex items-center justify-center w-8 h-8 bg-gray-800 rounded-full">
                                        <Utensils className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-gray-800 font-semibold text-lg tracking-wide uppercase">
                                        {t('services.qr_menus')}
                                    </span>
                                    <ChevronDown
                                        className={`absolute right-4 w-5 h-5 text-gray-600 transition-transform duration-200 ${isQrMenuOpen ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                {/* QR Menu Dropdown Content */}
                                {isQrMenuOpen && (
                                    <div className="mt-3 bg-gray-100 border border-gray-200 rounded-lg p-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-blue-600 rounded-lg">
                                                <ExternalLink className="w-5 h-5 text-white" />
                                            </div>
                                            <h2 className="text-lg font-semibold text-gray-800">{t('qr.title')}</h2>
                                        </div>
                                        <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
                                            <div className="space-y-2">
                                                <Link
                                                    href="/menusqr/elegante"
                                                    className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform active:scale-95 sm:hover:scale-105"
                                                    onClick={() => setIsQrMenuOpen(false)}
                                                >
                                                    {t('dropdown.restaurant_menu')}
                                                </Link>
                                                <Link
                                                    href="/menusqr/minimalista"
                                                    className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform active:scale-95 sm:hover:scale-105"
                                                    onClick={() => setIsQrMenuOpen(false)}
                                                >
                                                    {t('dropdown.minimalist_menu')}
                                                </Link>
                                                <Link
                                                    href="/menusqr/neon"
                                                    className="block w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-blue-500 hover:to-blue-600 transition-all duration-200 transform active:scale-95 sm:hover:scale-105"
                                                    onClick={() => setIsQrMenuOpen(false)}
                                                >
                                                    {t('dropdown.bar_menu')}
                                                </Link>
                                                <Link
                                                    href="/menusqr/oceano"
                                                    className="block w-full bg-gradient-to-r from-blue-700 to-blue-800 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-blue-800 hover:to-blue-900 transition-all duration-200 transform active:scale-95 sm:hover:scale-105"
                                                    onClick={() => setIsQrMenuOpen(false)}
                                                >
                                                    {t('dropdown.seafood_menu')}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Digital Invitations Button */}
                            <a
                                href="https://www.invitacionesdigitales.click"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-full bg-white border-2 border-gray-300 rounded-full px-6 py-4 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md relative"
                            >
                                <div className="absolute left-4 flex items-center justify-center w-8 h-8 bg-gray-800 rounded-full">
                                    <Mail className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-gray-800 font-semibold text-lg tracking-wide uppercase">
                                    {t('services.digital_invitations')}
                                </span>
                            </a>


                        </div>
                    </div>
                </AnimatedContent>


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