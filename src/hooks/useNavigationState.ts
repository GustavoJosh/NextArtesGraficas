'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface NavigationState {
  isLoading: boolean;
  error: string | null;
  previousPath: string | null;
}

export function useNavigationState() {
  const [state, setState] = useState<NavigationState>({
    isLoading: false,
    error: null,
    previousPath: null,
  });
  
  const pathname = usePathname();

  useEffect(() => {
    // Clear error when pathname changes successfully
    if (state.error) {
      setState(prev => ({ ...prev, error: null }));
    }
    
    // Update previous path
    setState(prev => ({ 
      ...prev, 
      previousPath: prev.previousPath !== pathname ? pathname : prev.previousPath,
      isLoading: false 
    }));
  }, [pathname, state.error]);

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
  };

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error, isLoading: false }));
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  return {
    ...state,
    setLoading,
    setError,
    clearError,
  };
}