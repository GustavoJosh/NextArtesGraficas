"use client";
import { useEffect, useState } from 'react';

export const MobileDebug = () => {
  const [info, setInfo] = useState({
    isMobile: false,
    viewport: { width: 0, height: 0 },
    userAgent: '',
    scrollY: 0,
  });

  useEffect(() => {
    const updateInfo = () => {
      setInfo({
        isMobile: window.innerWidth <= 768,
        viewport: { width: window.innerWidth, height: window.innerHeight },
        userAgent: navigator.userAgent,
        scrollY: window.scrollY,
      });
    };

    updateInfo();
    window.addEventListener('resize', updateInfo);
    window.addEventListener('scroll', updateInfo);

    return () => {
      window.removeEventListener('resize', updateInfo);
      window.removeEventListener('scroll', updateInfo);
    };
  }, []);

  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed top-0 right-0 bg-black/80 text-white p-2 text-xs z-50 max-w-xs">
      <div>Mobile: {info.isMobile ? 'Yes' : 'No'}</div>
      <div>Viewport: {info.viewport.width}x{info.viewport.height}</div>
      <div>Scroll: {info.scrollY}</div>
      <div>UA: {info.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'}</div>
    </div>
  );
};