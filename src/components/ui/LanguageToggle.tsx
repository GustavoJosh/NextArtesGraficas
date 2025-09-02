'use client';

import { useTranslation } from '@/contexts/TranslationContext';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  className?: string;
  showIcon?: boolean;
  compact?: boolean;
  pillStyle?: boolean;
  baseColor?: string;
  pillColor?: string;
  textColor?: string;
}

export default function LanguageToggle({ 
  className = '', 
  showIcon = true, 
  compact = false,
  pillStyle = false,
  baseColor = '#1f2937',
  pillColor = '#ffffff',
  textColor = '#1f2937'
}: LanguageToggleProps) {
  const { language, toggleLanguage, isSpanish } = useTranslation();

  if (pillStyle) {
    return (
      <button
        onClick={toggleLanguage}
        className={`
          inline-flex items-center justify-center
          h-10 px-4 rounded-full
          font-semibold text-sm uppercase letter-spacing-wide
          transition-all duration-200
          hover:scale-105 active:scale-95
          touch-action-manipulation
          -webkit-tap-highlight-color-transparent
          ${className}
        `}
        style={{
          backgroundColor: pillColor,
          color: textColor,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}
        aria-label={`Switch to ${isSpanish ? 'English' : 'Spanish'}`}
        title={`Switch to ${isSpanish ? 'English' : 'Spanish'}`}
      >
        <span className="font-semibold tracking-wider">
          {isSpanish ? 'EN' : 'ES'}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className={`
        inline-flex items-center gap-2 px-3 py-2 rounded-lg
        bg-gray-100 hover:bg-gray-200 
        text-gray-700 hover:text-gray-900
        transition-all duration-200
        font-medium text-sm
        ${compact ? 'px-2 py-1 text-xs' : ''}
        ${className}
      `}
      aria-label={`Switch to ${isSpanish ? 'English' : 'Spanish'}`}
      title={`Switch to ${isSpanish ? 'English' : 'Spanish'}`}
    >
      {showIcon && <Globe className={`${compact ? 'w-3 h-3' : 'w-4 h-4'}`} />}
      <span className="font-semibold">
        {isSpanish ? 'EN' : 'ES'}
      </span>
      {!compact && (
        <span className="text-xs opacity-75">
          {isSpanish ? 'English' : 'Español'}
        </span>
      )}
    </button>
  );
}