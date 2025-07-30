'use client';

import { useEffect, useState, forwardRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface NavigationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const NavigationLink = forwardRef<HTMLAnchorElement, NavigationLinkProps>(
  ({ href, children, className = '', onClick, ...props }, ref) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't handle if it's the current page
    if (href === pathname) {
      e.preventDefault();
      return;
    }

    // Don't handle external links
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Call custom onClick if provided
      if (onClick) {
        onClick();
      }

      // Use router.push for client-side navigation with error handling
      await router.push(href);
    } catch (err) {
      console.error('Navigation error:', err);
      setError('Error al navegar. Intentando nuevamente...');
      
      // Fallback to window.location after a delay
      setTimeout(() => {
        window.location.href = href;
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear loading state when pathname changes
  useEffect(() => {
    setIsLoading(false);
    setError(null);
  }, [pathname]);

  return (
    <Link
      ref={ref}
      href={href}
      className={`${className} ${isLoading ? 'pointer-events-none opacity-75' : ''}`}
      onClick={handleClick}
      {...props}
    >
      <span className="flex items-center">
        {children}
        {isLoading && (
          <LoadingSpinner size="sm" className="ml-2" />
        )}
      </span>
      {error && (
        <span className="text-xs text-red-600 block mt-1">{error}</span>
      )}
    </Link>
  );
});

NavigationLink.displayName = 'NavigationLink';