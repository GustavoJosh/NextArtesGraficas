"use client";

import Link from 'next/link';
import { ExternalLink, Phone, Printer, Globe, Mountain, Car } from 'lucide-react';
import Image from 'next/image';
import LightRays from '@/components/ui/LightRays';
import AnimatedContent from '@/components/ui/AnimatedContent';
import styles from './LinksPageContent.module.css';
import LogoLoop from './ui/LogoLoop';
import { SiInstagram} from "react-icons/si";
import { SiTiktok } from "react-icons/si";
import { SiFacebook } from "react-icons/si";
import { SiWhatsapp } from "react-icons/si";
import ShinyText from './ui/ShinyText';


const LogoSocial = [
    { node: <SiInstagram />, title: "Instagram", href: "https://www.instagram.com/artesgraficasbcs/" },
    { node: <SiTiktok />, title: "TikTok", href: "https://www.tiktok.com/@artesgraficasdigitales" },
    { node: <SiFacebook />, title: "Facebook", href: "https://www.facebook.com/artes.graficasg" },
    { node: <SiWhatsapp />, title: "Whatsapp", href: "https://wa.me/526122025530?text=Hola%20quiero%20informacion" }
]

export default function LinksPageContent() {
    return (
        <div className={`relative w-full bg-gradient-to-br from-gray-900 to-black overflow-hidden ${styles.container}`}>
            {/* Background Light Rays */}
            <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#ffffff"
                    raysSpeed={1.5}
                    lightSpread={0.8}
                    rayLength={1.2}
                    followMouse={false}
                    mouseInfluence={0.1}
                    noiseAmount={0.1}
                    distortion={0.05}
                    className="custom-rays"
                />
            </div>

            <div className={`relative z-10 ${styles.content}`}>
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
                        <div className="relative w-36 h-36 sm:w-48 sm:h-48 mx-auto mb-3 sm:mb-4">

                            <Image
                                src="/images/logos/circle.png"
                                alt="Artes Gráficas Digitales Logo"
                                width={128}
                                height={128}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain mt-[4px] ml-[5px] w-20 h-20 sm:w-32 sm:h-32"
                                priority
                            />
                        </div>
                   

                    <h1 className="bebas-neue-regular text-center">
                        <div className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight relative">
                        <ShinyText text="ARTES GRÁFICAS" disabled={false} speed={5} className='inline-block text-[#DBC844] tracking-wide' />
                        <span className="text-sm md:text-base lg:text-lg text-[#DBC844] absolute -top-2 md:-top-3 lg:-top-4 ml-1">®</span>
                        </div>
                        <div className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-[0.3em] -mt-2">
                        <ShinyText text="DIGITALES" disabled={false} speed={5} className='inline-block text-[#DBC844]' />
                        </div>
                    </h1>
                    <p className="text-sm sm:text-base text-gray-300 px-2">
                        Acceso rápido a nuestros servicios
                    </p>
                    </AnimatedContent>
                </div>

                {/* Links Container */}
                <div className="space-y-3 sm:space-y-4">
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
                        {/* Menu QR Templates */}
                        <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
                            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center">
                                <ExternalLink className="w-5 h-5 mr-2" />
                                Plantillas de Menú QR
                            </h2>
                            <div className="space-y-2">
                                <Link
                                    href="/menusqr/elegante"
                                    className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform active:scale-95 sm:hover:scale-105"
                                >
                                    Elegante
                                </Link>
                                <Link
                                    href="/menusqr/minimalista"
                                    className="block w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-200 transform active:scale-95 sm:hover:scale-105"
                                >
                                    Minimalista
                                </Link>
                                <Link
                                    href="/menusqr/neon"
                                    className="block w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-green-500 hover:to-blue-600 transition-all duration-200 transform active:scale-95 sm:hover:scale-105"
                                >
                                    Neón
                                </Link>
                                <Link
                                    href="/menusqr/oceano"
                                    className="block w-full bg-gradient-to-r from-blue-400 to-cyan-500 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-blue-500 hover:to-cyan-600 transition-all duration-200 transform active:scale-95 sm:hover:scale-105"
                                >
                                    Océano
                                </Link>
                            </div>
                        </div>
                    </AnimatedContent>
                    {/* Website Demos */}
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
                            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center">
                                <Globe className="w-5 h-5 mr-2" />
                                Demos de Páginas Web
                            </h2>
                            <div className="space-y-2">
                                <Link
                                    href="https://gustavojosh.github.io/catalogoPuertas/"
                                    target="_blank"
                                    className="block w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-slate-700 hover:to-slate-800 transition-all duration-200 transform active:scale-95 sm:hover:scale-105 flex items-center justify-center"
                                >
                                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                    Puertas Premium
                                </Link>
                                <Link
                                    href="https://gustavojosh.github.io/catalogoRocas/"
                                    target="_blank"
                                    className="block w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-orange-700 hover:to-orange-800 transition-all duration-200 transform active:scale-95 sm:hover:scale-105 flex items-center justify-center"
                                >
                                    <Mountain className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                    Piedra y Arena
                                </Link>
                                <Link
                                    href="/paginasweb/linksdinamicos"
                                    target="_blank"
                                    className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform active:scale-95 sm:hover:scale-105 flex items-center justify-center"
                                >
                                    <Car className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                    Vive La Baja 4x4
                                </Link>
                                <Link
                                    href="https://cadimlapaz.com/"
                                    target="_blank"
                                    className="block w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base font-medium hover:from-slate-700 hover:to-slate-800 transition-all duration-200 transform active:scale-95 sm:hover:scale-105 flex items-center justify-center"
                                >
                                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                    Consultorio CADIM
                                </Link>
                            </div>
                        </div>
                    </AnimatedContent>

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
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 mb-4">
                            <h2 className="text-base sm:text-lg font-semibold text-white mb-3 text-center">
                                Síguenos en Redes Sociales
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
                                    fadeOutColor="rgba(3, 5, 13, 0.8)"
                                    ariaLabel="Redes sociales"
                                />
                            </div>
                        </div>
                    </AnimatedContent>

                    {/* Main Services */}
                    <div className="space-y-2 sm:space-y-3">  
                        <Link
                            href="/contacto"
                            className="block w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-center text-sm sm:text-base font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 transform active:scale-95 sm:hover:scale-105 flex items-center justify-center"
                        >
                            <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                            Contacto
                        </Link>

                        <Link
                            href="/servicios"
                            className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-center text-sm sm:text-base font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform active:scale-95 sm:hover:scale-105 flex items-center justify-center"
                        >
                            <Printer className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                            Imprenta
                        </Link>
                       
                    </div>
                  
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