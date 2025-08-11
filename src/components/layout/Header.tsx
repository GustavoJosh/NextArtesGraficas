'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { NavigationLink } from '@/components/navigation/NavigationWrapper';

// TypeScript interfaces for navigation items and props
interface NavigationItem {
    name: string;
    href: string;
    isActive?: boolean;
}

interface HeaderProps {
    currentPath?: string;
}

const navigationItems: NavigationItem[] = [
    { name: 'Inicio', href: '/' },
    { name: 'Imprenta', href: '/servicios' },
    { name: 'Servicios digitales', href: '/portafolio' },
    { name: 'Testimonios', href: '/testimonios' },
    { name: 'Contacto', href: '/contacto' },
];

export function Header({ currentPath }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [logoError, setLogoError] = useState(false);
    const [mobileLogo, setMobileLogo] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const pathname = usePathname();
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const firstMenuItemRef = useRef<HTMLAnchorElement>(null);

    // Use provided currentPath or fallback to usePathname hook
    const activePath = currentPath || pathname;

    // Active state detection logic
    const isActive = (href: string, currentPath: string) => {
        if (href === '/' && currentPath === '/') return true;
        if (href !== '/' && currentPath.startsWith(href)) return true;
        return false;
    };

    const handleMenuToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        
        if (isAnimating) return;

        setIsAnimating(true);
        setIsMenuOpen(!isMenuOpen);

        // Add navigation-active class to prevent gallery interactions
        if (window.innerWidth < 768) {
            document.body.classList.add('navigation-active');
        }

        // Reset animation state after transition completes
        setTimeout(() => {
            setIsAnimating(false);
        }, 300);
    };

    const handleMenuClose = useCallback(() => {
        if (isAnimating) return;

        setIsAnimating(true);
        setIsMenuOpen(false);

        // Remove navigation-active class
        document.body.classList.remove('navigation-active');

        setTimeout(() => {
            setIsAnimating(false);
            // Return focus to menu button when closing
            menuButtonRef.current?.focus();
        }, 300);
    }, [isAnimating]);

    const handleLogoError = useCallback(() => {
        console.warn('Desktop logo failed to load, falling back to text');
        setLogoError(true);
    }, []);

    const handleMobileLogoError = useCallback(() => {
        console.warn('Mobile logo failed to load, falling back to text');
        setMobileLogo(true);
    }, []);



    // Handle keyboard navigation for DOM events
    const handleDOMKeyDown = useCallback((event: KeyboardEvent) => {
        if (!isMenuOpen) return;

        switch (event.key) {
            case 'Escape':
                event.preventDefault();
                handleMenuClose();
                break;
            case 'Tab':
                // Trap focus within mobile menu
                const menuItems = mobileMenuRef.current?.querySelectorAll('a');
                if (menuItems && menuItems.length > 0) {
                    const firstItem = menuItems[0];
                    const lastItem = menuItems[menuItems.length - 1];

                    if (event.shiftKey && document.activeElement === firstItem) {
                        event.preventDefault();
                        lastItem.focus();
                    } else if (!event.shiftKey && document.activeElement === lastItem) {
                        event.preventDefault();
                        firstItem.focus();
                    }
                }
                break;
        }
    }, [isMenuOpen, handleMenuClose]);

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                handleMenuClose();
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleDOMKeyDown);

            // Focus first menu item when menu opens
            setTimeout(() => {
                firstMenuItemRef.current?.focus();
            }, 100);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleDOMKeyDown);
        };
    }, [isMenuOpen, handleDOMKeyDown, handleMenuClose]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        <>
            {/* CSS-only fallback for JavaScript-disabled environments */}
            <noscript>
                <style>{`
                    .mobile-menu-fallback {
                        display: block !important;
                        max-height: none !important;
                        opacity: 1 !important;
                    }
                    .mobile-menu-button-fallback {
                        display: none !important;
                    }
                    @media (min-width: 768px) {
                        .mobile-menu-fallback {
                            display: none !important;
                        }
                    }
                `}</style>
            </noscript>
            
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                        >
                            {/* Desktop Logo */}
                            {!logoError ? (
                                <div className="hidden sm:block">
                                    <Image
                                        src="/images/logos/banner.png"
                                        alt="Artes Gráficas Digitales"
                                        width={180}
                                        height={40}
                                        className="h-8 w-auto"
                                        onError={handleLogoError}
                                        priority
                                    />
                                </div>
                            ) : (
                                <div className="hidden sm:block">
                                    <span className="text-xl font-bold text-gray-900">
                                        Artes Gráficas Digitales
                                    </span>
                                </div>
                            )}

                            {/* Mobile Logo */}
                            {!mobileLogo ? (
                                <div className="block sm:hidden">
                                    <Image
                                        src="/images/logos/circle.png"
                                        alt="Artes Gráficas Digitales"
                                        width={32}
                                        height={32}
                                        className="h-8 w-8"
                                        onError={handleMobileLogoError}
                                        priority
                                    />
                                </div>
                            ) : (
                                <div className="block sm:hidden">
                                    <span className="text-lg font-bold text-gray-900">
                                        AGD
                                    </span>
                                </div>
                            )}
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navigationItems.map((item) => {
                            const active = isActive(item.href, activePath);
                            return (
                                <NavigationLink
                                    key={item.name}
                                    href={item.href}
                                    className={`px-3 py-2 text-sm font-medium transition-colors relative ${active
                                        ? 'text-blue-600'
                                        : 'text-gray-700 hover:text-blue-600'
                                        }`}
                                >
                                    {item.name}
                                    {active && (
                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></span>
                                    )}
                                </NavigationLink>
                            );
                        })}
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            ref={menuButtonRef}
                            onClick={handleMenuToggle}
                            className="mobile-menu-button mobile-menu-button-fallback text-gray-700 hover:text-blue-600 p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                            aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                            aria-haspopup="true"
                            disabled={isAnimating}
                        >
                            <span className="sr-only">
                                {isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                            </span>
                            <div className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out mobile-menu-fallback mobile-menu ${isMenuOpen
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0'
                        }`}
                >
                    <div
                        ref={mobileMenuRef}
                        id="mobile-menu"
                        className={`px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 transform transition-transform duration-300 ease-in-out ${isMenuOpen
                            ? 'translate-y-0'
                            : '-translate-y-2'
                            }`}
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="mobile-menu-button"
                    >
                        {navigationItems.map((item, index) => {
                            const active = isActive(item.href, activePath);
                            return (
                                <NavigationLink
                                    key={item.name}
                                    ref={index === 0 ? firstMenuItemRef : null}
                                    href={item.href}
                                    onClick={() => {
                                        handleMenuClose();
                                    }}
                                    onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleMenuClose();
                                            // Navigate programmatically
                                            window.location.href = item.href;
                                        }
                                    }}
                                    className={`block w-full text-left px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 relative ${active
                                        ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600 shadow-sm'
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 hover:shadow-sm hover:translate-x-1'
                                        }`}
                                    role="menuitem"
                                    tabIndex={isMenuOpen ? 0 : -1}
                                    aria-current={active ? 'page' : undefined}
                                    style={{
                                        transitionDelay: `${index * 50}ms`
                                    }}
                                >
                                    <span className="flex items-center justify-between">
                                        {item.name}
                                        {active && (
                                            <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full animate-pulse" aria-hidden="true"></span>
                                        )}
                                    </span>
                                    {active && (
                                        <span className="sr-only">Página actual</span>
                                    )}
                                </NavigationLink>
                            );
                        })}
                    </div>
                </div>
            </div>
        </header>
        </>
    );
}