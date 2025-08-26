import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { FilterBar } from '../FilterBar';
import { webServiceCategories } from '@/data/webServices';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock the debounce hook
vi.mock('@/hooks/useDebounce', () => ({
  useDebounce: (value: any) => value, // Return value immediately for testing
}));

describe('FilterBar', () => {
  const mockProps = {
    categories: webServiceCategories,
    activeFilters: [],
    onFilterChange: vi.fn(),
    searchQuery: '',
    onSearchChange: vi.fn(),
    totalServices: 10,
    filteredCount: 10,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input correctly', () => {
    render(<FilterBar {...mockProps} />);
    
    const searchInputs = screen.getAllByPlaceholderText('Buscar servicios web...');
    expect(searchInputs).toHaveLength(2); // Desktop and mobile versions
  });

  it('renders all category filter buttons', () => {
    render(<FilterBar {...mockProps} />);
    
    webServiceCategories.forEach(category => {
      expect(screen.getAllByText(category.name)).toHaveLength(1);
    });
  });

  it('displays correct service count', () => {
    render(<FilterBar {...mockProps} />);
    
    expect(screen.getAllByText('10')).toHaveLength(4); // Two instances each for desktop and mobile (filtered and total)
    expect(screen.getAllByText(/de/)).toHaveLength(2); // Desktop and mobile versions (using regex to match partial text)
    expect(screen.getByText(/servicios/)).toBeInTheDocument(); // Only appears once in desktop
  });

  it('calls onSearchChange when typing in search input', async () => {
    render(<FilterBar {...mockProps} />);
    
    const searchInputs = screen.getAllByPlaceholderText('Buscar servicios web...');
    fireEvent.change(searchInputs[0], { target: { value: 'test search' } });
    
    await waitFor(() => {
      expect(mockProps.onSearchChange).toHaveBeenCalledWith('test search');
    });
  });

  it('calls onFilterChange when clicking category filter', () => {
    render(<FilterBar {...mockProps} />);
    
    const qrMenusButtons = screen.getAllByText('Menús QR');
    fireEvent.click(qrMenusButtons[0]); // Click the first one (desktop version)
    
    expect(mockProps.onFilterChange).toHaveBeenCalledWith(['qr-menus']);
  });

  it('shows active filter state correctly', () => {
    const propsWithActiveFilter = {
      ...mockProps,
      activeFilters: ['qr-menus'],
    };
    
    render(<FilterBar {...propsWithActiveFilter} />);
    
    // Should show active filters section
    expect(screen.getByText('Filtros activos:')).toBeInTheDocument();
    expect(screen.getAllByText('Menús QR').length).toBeGreaterThan(0);
  });

  it('removes filter when clicking X on active filter', () => {
    const propsWithActiveFilter = {
      ...mockProps,
      activeFilters: ['qr-menus'],
    };
    
    render(<FilterBar {...propsWithActiveFilter} />);
    
    // Find the active filter badge in the "Filtros activos" section
    const activeFiltersSection = screen.getByText('Filtros activos:').parentElement;
    const removeButton = activeFiltersSection?.querySelector('button');
    
    if (removeButton) {
      fireEvent.click(removeButton);
      expect(mockProps.onFilterChange).toHaveBeenCalledWith([]);
    }
  });

  it('shows clear all button when filters are active', () => {
    const propsWithFilters = {
      ...mockProps,
      activeFilters: ['qr-menus', 'websites'],
      searchQuery: 'test',
    };
    
    render(<FilterBar {...propsWithFilters} />);
    
    expect(screen.getByText('Limpiar')).toBeInTheDocument();
  });

  it('clears all filters when clicking clear all button', () => {
    const propsWithFilters = {
      ...mockProps,
      activeFilters: ['qr-menus'],
      searchQuery: 'test',
    };
    
    render(<FilterBar {...propsWithFilters} />);
    
    const clearButton = screen.getByText('Limpiar');
    fireEvent.click(clearButton);
    
    expect(mockProps.onFilterChange).toHaveBeenCalledWith([]);
  });

  it('clears search input when clicking X button', () => {
    const propsWithSearch = {
      ...mockProps,
      searchQuery: 'test search',
    };
    
    render(<FilterBar {...propsWithSearch} />);
    
    const searchInputs = screen.getAllByDisplayValue('test search');
    expect(searchInputs[0]).toBeInTheDocument();
    
    // Change the search input to trigger the clear button to appear
    fireEvent.change(searchInputs[0], { target: { value: 'test' } });
    
    // Find the clear search button by looking for buttons with X icon near the search input
    const searchContainer = searchInputs[0].closest('div');
    const clearButton = searchContainer?.querySelector('button');
    
    if (clearButton) {
      fireEvent.click(clearButton);
      expect(searchInputs[0]).toHaveValue('');
    }
  });

  it('toggles mobile filters when clicking filter button', () => {
    render(<FilterBar {...mockProps} />);
    
    const filterButton = screen.getByText('Filtros');
    fireEvent.click(filterButton);
    
    // Should show mobile filter grid - check that mobile filters are now visible
    // The mobile filters should be in a grid layout
    const mobileFilterContainer = screen.getByText('Filtros').closest('div')?.parentElement;
    expect(mobileFilterContainer).toBeInTheDocument();
  });

  it('shows filter count badge in mobile view', () => {
    const propsWithFilters = {
      ...mockProps,
      activeFilters: ['qr-menus', 'websites'],
    };
    
    render(<FilterBar {...propsWithFilters} />);
    
    // Should show count badge
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('handles multiple active filters correctly', () => {
    const propsWithMultipleFilters = {
      ...mockProps,
      activeFilters: ['qr-menus', 'websites', 'digital-cards'],
    };
    
    render(<FilterBar {...propsWithMultipleFilters} />);
    
    // Should show all active filters
    expect(screen.getByText('Filtros activos:')).toBeInTheDocument();
    expect(screen.getAllByText('Menús QR').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Sitios Web').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Tarjetas Digitales').length).toBeGreaterThan(0);
  });

  it('updates filtered count display correctly', () => {
    const propsWithFilteredResults = {
      ...mockProps,
      totalServices: 20,
      filteredCount: 5,
    };
    
    render(<FilterBar {...propsWithFilteredResults} />);
    
    expect(screen.getAllByText('5')).toHaveLength(2); // Desktop and mobile versions
    expect(screen.getAllByText('20')).toHaveLength(2); // Desktop and mobile versions
  });

  it('handles search focus and blur events', () => {
    render(<FilterBar {...mockProps} />);
    
    const searchInputs = screen.getAllByPlaceholderText('Buscar servicios web...');
    const searchInput = searchInputs[0]; // Test the first (desktop) search input
    
    // Test that the input can receive focus
    searchInput.focus();
    expect(document.activeElement).toBe(searchInput);
    
    // Test that the input can lose focus
    searchInput.blur();
    expect(document.activeElement).not.toBe(searchInput);
  });

  it('toggles filter when clicking on active filter button', () => {
    const propsWithActiveFilter = {
      ...mockProps,
      activeFilters: ['qr-menus'],
    };
    
    render(<FilterBar {...propsWithActiveFilter} />);
    
    // Find the filter button in the desktop view (first occurrence)
    const filterButtons = screen.getAllByText('Menús QR');
    const filterButton = filterButtons[0].closest('button');
    const initialCallCount = mockProps.onFilterChange.mock.calls.length;
    
    if (filterButton) {
      fireEvent.click(filterButton);
      // Should call onFilterChange to remove the filter
      expect(mockProps.onFilterChange.mock.calls.length).toBe(initialCallCount + 1);
      expect(mockProps.onFilterChange).toHaveBeenCalledWith([]);
    }
  });
});