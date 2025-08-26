'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, Search } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

// Base Error Boundary Component
class BaseErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return this.renderDefaultError();
    }

    return this.props.children;
  }

  renderDefaultError() {
    return (
      <div className="min-h-[200px] flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            Error en el componente
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Ha ocurrido un error inesperado. Por favor, intenta recargar la página.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Recargar página
          </button>
        </div>
      </div>
    );
  }
}

// Service Card Error Boundary
export class ServiceCardErrorBoundary extends BaseErrorBoundary {
  renderDefaultError() {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-red-500/20 p-6 h-full flex flex-col items-center justify-center text-center"
      >
        <AlertTriangle className="w-8 h-8 text-red-400 mb-3" />
        <h4 className="text-white font-medium mb-2">Error al cargar servicio</h4>
        <p className="text-gray-400 text-sm mb-4">
          No se pudo cargar la información de este servicio.
        </p>
        <button
          onClick={() => this.setState({ hasError: false })}
          className="flex items-center space-x-2 px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reintentar</span>
        </button>
      </motion.div>
    );
  }
}

// Service Grid Error Boundary
export class ServiceGridErrorBoundary extends BaseErrorBoundary {
  renderDefaultError() {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="col-span-full bg-gray-800/30 backdrop-blur-sm rounded-xl border border-red-500/20 p-8 text-center"
      >
        <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          Error al cargar servicios
        </h3>
        <p className="text-gray-400 mb-6">
          No se pudieron cargar los servicios web. Esto puede deberse a un problema temporal.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => this.setState({ hasError: false })}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reintentar</span>
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Ir al inicio</span>
          </button>
        </div>
      </motion.div>
    );
  }
}

// Filter Bar Error Boundary
export class FilterBarErrorBoundary extends BaseErrorBoundary {
  renderDefaultError() {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-red-500/20 p-4 mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <div>
              <h4 className="text-white font-medium">Error en filtros</h4>
              <p className="text-gray-400 text-sm">Los filtros no están disponibles temporalmente</p>
            </div>
          </div>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="flex items-center space-x-2 px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reintentar</span>
          </button>
        </div>
      </motion.div>
    );
  }
}

// Service Modal Error Boundary
export class ServiceModalErrorBoundary extends BaseErrorBoundary {
  renderDefaultError() {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 rounded-xl p-8 text-center max-w-md mx-auto"
      >
        <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          Error al cargar detalles
        </h3>
        <p className="text-gray-400 mb-6">
          No se pudieron cargar los detalles del servicio seleccionado.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => this.setState({ hasError: false })}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reintentar</span>
          </button>
          <button
            onClick={() => window.history.back()}
            className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>
      </motion.div>
    );
  }
}

// Search Error Boundary
export class SearchErrorBoundary extends BaseErrorBoundary {
  renderDefaultError() {
    return (
      <div className="flex items-center space-x-2 px-4 py-2 bg-red-600/10 border border-red-500/20 rounded-lg">
        <AlertTriangle className="w-4 h-4 text-red-400" />
        <span className="text-red-400 text-sm">Error en búsqueda</span>
        <button
          onClick={() => this.setState({ hasError: false })}
          className="ml-auto text-red-400 hover:text-red-300 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    );
  }
}

// Catalog Error Boundary (Main container)
export class CatalogErrorBoundary extends BaseErrorBoundary {
  renderDefaultError() {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg"
        >
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-4">
            Error en el catálogo de servicios
          </h1>
          
          <p className="text-gray-400 mb-8 leading-relaxed">
            Ha ocurrido un error al cargar el catálogo de servicios web. 
            Esto puede deberse a un problema temporal con la conexión o los datos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Recargar página</span>
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Volver al inicio</span>
            </button>
          </div>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-8 text-left bg-gray-800/50 rounded-lg p-4">
              <summary className="text-gray-300 cursor-pointer mb-2">
                Detalles del error (desarrollo)
              </summary>
              <pre className="text-xs text-red-400 overflow-auto">
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </motion.div>
      </div>
    );
  }
}