'use client';

import PillNav, { PillNavItem } from './PillNav';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { useTranslation } from '@/contexts/TranslationContext';

interface PillNavWithTranslationProps {
  logo: string;
  logoAlt?: string;
  className?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
}

export default function PillNavWithTranslation({
  logo,
  logoAlt = 'Logo',
  className = '',
  baseColor = '#fff',
  pillColor = '#060010',
  hoveredPillTextColor = '#060010',
  pillTextColor,
}: PillNavWithTranslationProps) {
  const { t } = useTranslation();

  // Define navigation items with translations
  const navItems: PillNavItem[] = [
    {
      label: t('nav.home'),
      href: '/',
      ariaLabel: t('nav.home')
    },
    {
      label: t('nav.services'),
      href: '/servicios',
      ariaLabel: t('nav.services')
    },
    {
      label: t('nav.contact'),
      href: '/contacto',
      ariaLabel: t('nav.contact')
    }
  ];

  return (
    <div className="pill-nav-with-translation">
      <PillNav
        logo={logo}
        logoAlt={logoAlt}
        items={navItems}
        className={className}
        baseColor={baseColor}
        pillColor={pillColor}
        hoveredPillTextColor={hoveredPillTextColor}
        pillTextColor={pillTextColor}
      />
      
      {/* Language Toggle Button - Pill Style */}
      <LanguageToggle 
        pillStyle
        baseColor={baseColor}
        pillColor={pillColor}
        textColor={pillTextColor || baseColor}
        showIcon={false}
        className="flex-shrink-0"
      />
    </div>
  );
}