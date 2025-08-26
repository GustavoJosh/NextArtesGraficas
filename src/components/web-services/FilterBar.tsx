"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/useDebounce';
import { FilterBarErrorBoundary, SearchErrorBoundary } from './ErrorBoundaries';
import type { WebServiceCategory } from '@/data/webServices';

interface FilterBarProps {
  categories: WebServiceCategory[];
  activeFilters: string[];
  onFilterChange: (filters: string[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalServices: number;
  filteredCount: number;
}

// Animation variants for the filter bar
const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 }
  }
};

// Animation variants for filter buttons
const filterButtonVariants = {
  inactive: {
    scale: 1,
    backgroundColor: "rgba(55, 65, 81, 0.5)", // gray-700/50
    borderColor: "rgba(75, 85, 99, 0.5)", // gray-600/50
    color: "rgba(209, 213, 219, 1)" // gray-300
  },
  active: {
    scale: 1.02,
    backgroundColor: "rgba(59, 130, 246, 0.2)", // blue-500/20
    borderColor: "rgba(59, 130, 246, 0.5)", // blue-500/50
    color: "rgba(147, 197, 253, 1)" // blue-300
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};

// Get category icon component
const getCategoryIcon = (_iconName: string) => {
  // This would normally import from lucide-react based on iconName
  // For now, using Filter as default
  return Filter;
};

// Get category colors
const getCategoryColors = (categoryId: string) => {
  switch (categoryId) {
    case 'qr-menus':
      return {
        active: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300',
        hover: 'hover:bg-emerald-500/30 hover:border-emerald-500/60',
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      };
    case 'websites':
      return {
        active: 'bg-blue-500/20 border-blue-500/50 text-blue-300',
        hover: 'hover:bg-blue-500/30 hover:border-blue-500/60',
        badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      };
    case 'digital-cards':
      return {
        active: 'bg-purple-500/20 border-purple-500/50 text-purple-300',
        hover: 'hover:bg-purple-500/30 hover:border-purple-500/60',
        badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
      };
    case 'custom-solutions':
      return {
        active: 'bg-orange-500/20 border-orange-500/50 text-orange-300',
        hover: 'hover:bg-orange-500/30 hover:border-orange-500/60',
        badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
      };
    default:
      return {
        active: 'bg-gray-500/20 border-gray-500/50 text-gray-300',
        hover: 'hover:bg-gray-500/30 hover:border-gray-500/60',
        badge: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
      };
  }
};

export function FilterBar({
  categories = [],
  activeFilters = [],
  onFilterChange,
  searchQuery = '',
  onSearchChange,
  totalServices = 0,
  filteredCount = 0
}: FilterBarProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Debounce search query to avoid excessive API calls
  const debouncedSearchQuery = useDebounce(localSearchQuery, 300);

  // Update parent component when debounced search query changes
  useEffect(() => {
    onSearchChange(debouncedSearchQuery);
  }, [debouncedSearchQuery, onSearchChange]);

  // Sync local search with prop changes
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleFilterToggle = (categoryId: string) => {
    const newFilters = activeFilters.includes(categoryId)
      ? activeFilters.filter(id => id !== categoryId)
      : [...activeFilters, categoryId];
    
    onFilterChange(newFilters);
  };

  const handleClearAllFilters = () => {
    onFilterChange([]);
    setLocalSearchQuery('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
  };

  const handleSearchClear = () => {
    setLocalSearchQuery('');
  };

  const hasActiveFilters = activeFilters.length > 0 || localSearchQuery.length > 0;
  const activeFilterCount = activeFilters.length + (localSearchQuery.length > 0 ? 1 : 0);

  const FilterErrorBoundary = process.env.NODE_ENV === 'test' ? 
    ({ children }: { children: React.ReactNode }) => <>{children}</> : 
    FilterBarErrorBoundary;

  return (
    <FilterErrorBoundary>
      <motion.div
        className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
      <div className="container mx-auto px-4 py-4">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between space-x-6">
          {/* Search Input */}
          <SearchErrorBoundary>
            <motion.div
              className="relative flex-1 max-w-md"
              variants={itemVariants}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar servicios web..."
                  value={localSearchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={cn(
                    "w-full pl-10 pr-10 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg",
                    "text-white placeholder-gray-400 transition-all duration-300",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50",
                    isSearchFocused && "bg-gray-800/80 border-gray-500/80"
                  )}
                />
                {localSearchQuery && (
                  <button
                    onClick={handleSearchClear}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-700/50 rounded-full transition-colors"
                  >
                    <X className="w-3 h-3 text-gray-400 hover:text-white" />
                  </button>
                )}
              </div>
            </motion.div>
          </SearchErrorBoundary>

          {/* Category Filters */}
          <motion.div
            className="flex items-center space-x-3"
            variants={itemVariants}
          >
            {categories.map((category) => {
              if (!category || !category.id) return null;
              
              const isActive = activeFilters.includes(category.id);
              const colors = getCategoryColors(category.id);
              const IconComponent = getCategoryIcon(category.icon);

              return (
                <motion.button
                  key={category.id}
                  onClick={() => handleFilterToggle(category.id)}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200",
                    "text-sm font-medium whitespace-nowrap",
                    isActive
                      ? colors.active
                      : "bg-gray-700/50 border-gray-600/50 text-gray-300 hover:bg-gray-600/50 hover:border-gray-500/50"
                  )}
                  variants={filterButtonVariants}
                  animate={isActive ? "active" : "inactive"}
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.name || 'Categoría'}</span>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-current rounded-full"
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Results Count and Clear Button */}
          <motion.div
            className="flex items-center space-x-4"
            variants={itemVariants}
          >
            <div className="text-sm text-gray-400">
              <span className="text-white font-medium">{filteredCount}</span>
              {' de '}
              <span className="text-white font-medium">{totalServices}</span>
              {' servicios'}
            </div>

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAllFilters}
                className="text-gray-300 border-gray-600/50 hover:bg-gray-700/50"
              >
                <X className="w-4 h-4 mr-1" />
                Limpiar
              </Button>
            )}
          </motion.div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-4">
          {/* Search Input */}
          <motion.div
            className="relative"
            variants={itemVariants}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar servicios web..."
                value={localSearchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={cn(
                  "w-full pl-10 pr-10 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg",
                  "text-white placeholder-gray-400 transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50",
                  isSearchFocused && "bg-gray-800/80 border-gray-500/80"
                )}
              />
              {localSearchQuery && (
                <button
                  onClick={handleSearchClear}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-700/50 rounded-full transition-colors"
                >
                  <X className="w-3 h-3 text-gray-400 hover:text-white" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Mobile Filter Toggle and Results */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="text-gray-300 border-gray-600/50 hover:bg-gray-700/50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtros
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-2 bg-blue-500/20 text-blue-300">
                  {activeFilterCount}
                </Badge>
              )}
              {isMobileFiltersOpen ? (
                <ChevronUp className="w-4 h-4 ml-2" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-2" />
              )}
            </Button>

            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-400">
                <span className="text-white font-medium">{filteredCount}</span>
                {' de '}
                <span className="text-white font-medium">{totalServices}</span>
              </div>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAllFilters}
                  className="text-gray-300 hover:bg-gray-700/50 p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Collapsible Filters */}
          <AnimatePresence>
            {isMobileFiltersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {categories.map((category) => {
                    const isActive = activeFilters.includes(category.id);
                    const colors = getCategoryColors(category.id);
                    const IconComponent = getCategoryIcon(category.icon);

                    return (
                      <motion.button
                        key={category.id}
                        onClick={() => handleFilterToggle(category.id)}
                        className={cn(
                          "flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200",
                          "text-sm font-medium",
                          isActive
                            ? colors.active
                            : "bg-gray-700/50 border-gray-600/50 text-gray-300 hover:bg-gray-600/50 hover:border-gray-500/50"
                        )}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{category.name}</span>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-current rounded-full flex-shrink-0"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Active Filters Display */}
        <AnimatePresence>
          {activeFilters.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-gray-700/50"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-400 mr-2">Filtros activos:</span>
                {activeFilters.map((filterId) => {
                  const category = categories.find(cat => cat.id === filterId);
                  if (!category) return null;

                  const colors = getCategoryColors(category.id);

                  return (
                    <motion.div
                      key={filterId}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className={cn(
                        "flex items-center space-x-1 px-2 py-1 rounded-full text-xs border",
                        colors.badge
                      )}
                    >
                      <span>{category.name}</span>
                      <button
                        onClick={() => handleFilterToggle(filterId)}
                        className="hover:bg-current/20 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
    </FilterErrorBoundary>
  );
}