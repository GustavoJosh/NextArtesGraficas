import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { WebServicesCatalog } from '../WebServicesCatalog';

// Mock the child components
vi.mock('../FilterBar', () => ({
  FilterBar: ({ onFilterChange, onSearchChange, activeFilters, searchQuery }: any) => (
    <div data-testid="filter-bar">
      <button 
        onClick={() => onFilterChange(['qr-menus'])}
        data-testid="filter-button"
      >
        Filter QR Menus
      </button>
      <input
        data-testid="search-input"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search services..."
      />
      <div data-testid="active-filters">{activeFilters.join(',')}</div>
    </div>
  )
}));

vi.mock('../ServiceGrid', () => ({
  ServiceGrid: ({ services, onViewDetails, onRequestQuote, isLoading }: any) => (
    <div data-testid="service-grid">
      {isLoading ? (
        <div data-testid="loading-state">Loading...</div>
      ) : (
        <>
          <div data-testid="service-count">{services.length}</div>
          {services.map((service: any, index: number) => (
            <div key={service.id} data-testid={`service-${index}`}>
              <span>{service.title}</span>
              <button 
                onClick={() => onViewDetails(service)}
                data-testid={`view-details-${index}`}
              >
                View Details
              </button>
              <button 
                onClick={() => onRequestQuote(service)}
                data-testid={`request-quote-${index}`}
              >
                Request Quote
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  )
}));

vi.mock('../ServiceModal', () => ({
  ServiceModal: ({ service, isOpen, onClose, onRequestQuote }: any) => (
    isOpen ? (
      <div data-testid="service-modal">
        <div data-testid="modal-service-title">{service?.title}</div>
        <button onClick={onClose} data-testid="close-modal">Close</button>
        <button 
          onClick={() => onRequestQuote(service)} 
          data-testid="modal-request-quote"
        >
          Request Quote
        </button>
      </div>
    ) : null
  )
}));

// Mock the data
vi.mock('@/data/webServices', () => ({
  sampleWebServices: [
    {
      id: 'qr-menu-1',
      title: 'QR Menu Service',
      description: 'Digital menu with QR code',
      category: { id: 'qr-menus', name: 'Menús QR' },
      features: ['responsive', 'real-time updates'],
      technologies: ['React', 'Next.js']
    },
    {
      id: 'website-1',
      title: 'Website Service',
      description: 'Modern responsive website',
      category: { id: 'websites', name: 'Sitios Web' },
      features: ['SEO optimized', 'mobile friendly'],
      technologies: ['React', 'Tailwind']
    }
  ],
  webServiceCategories: [
    { id: 'qr-menus', name: 'Menús QR' },
    { id: 'websites', name: 'Sitios Web' }
  ],
  webServiceTestimonials: [
    {
      id: 'testimonial-1',
      clientName: 'Test Client',
      clientCompany: 'Test Company',
      content: 'Great service!',
      rating: 5,
      serviceId: 'qr-menu-1'
    }
  ]
}));

describe('WebServicesCatalog', () => {
  const mockOnRequestQuote = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all main components', () => {
    render(<WebServicesCatalog />);
    
    expect(screen.getByTestId('filter-bar')).toBeInTheDocument();
    expect(screen.getByTestId('service-grid')).toBeInTheDocument();
    expect(screen.getByTestId('service-count')).toHaveTextContent('2');
  });

  it('handles filter changes correctly', async () => {
    render(<WebServicesCatalog />);
    
    const filterButton = screen.getByTestId('filter-button');
    fireEvent.click(filterButton);
    
    // Should show loading state briefly
    expect(screen.getByTestId('loading-state')).toBeInTheDocument();
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading-state')).not.toBeInTheDocument();
    });
    
    // Should show filtered results (only QR menu service)
    expect(screen.getByTestId('service-count')).toHaveTextContent('1');
    expect(screen.getByTestId('active-filters')).toHaveTextContent('qr-menus');
  });

  it('handles search changes correctly', async () => {
    render(<WebServicesCatalog />);
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'website' } });
    
    // Should show loading state briefly
    expect(screen.getByTestId('loading-state')).toBeInTheDocument();
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading-state')).not.toBeInTheDocument();
    });
    
    // Should show filtered results (only website service)
    expect(screen.getByTestId('service-count')).toHaveTextContent('1');
  });

  it('opens modal when viewing service details', () => {
    render(<WebServicesCatalog />);
    
    const viewDetailsButton = screen.getByTestId('view-details-0');
    fireEvent.click(viewDetailsButton);
    
    expect(screen.getByTestId('service-modal')).toBeInTheDocument();
    expect(screen.getByTestId('modal-service-title')).toHaveTextContent('QR Menu Service');
  });

  it('closes modal correctly', () => {
    render(<WebServicesCatalog />);
    
    // Open modal
    const viewDetailsButton = screen.getByTestId('view-details-0');
    fireEvent.click(viewDetailsButton);
    
    expect(screen.getByTestId('service-modal')).toBeInTheDocument();
    
    // Close modal
    const closeButton = screen.getByTestId('close-modal');
    fireEvent.click(closeButton);
    
    expect(screen.queryByTestId('service-modal')).not.toBeInTheDocument();
  });

  it('calls onRequestQuote prop when provided', () => {
    render(<WebServicesCatalog onRequestQuote={mockOnRequestQuote} />);
    
    const requestQuoteButton = screen.getByTestId('request-quote-0');
    fireEvent.click(requestQuoteButton);
    
    expect(mockOnRequestQuote).toHaveBeenCalledWith({
      id: 'qr-menu-1',
      title: 'QR Menu Service',
      description: 'Digital menu with QR code',
      category: { id: 'qr-menus', name: 'Menús QR' },
      features: ['responsive', 'real-time updates'],
      technologies: ['React', 'Next.js']
    });
  });

  it('shows default alert when no onRequestQuote prop provided', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<WebServicesCatalog />);
    
    const requestQuoteButton = screen.getByTestId('request-quote-0');
    fireEvent.click(requestQuoteButton);
    
    expect(alertSpy).toHaveBeenCalledWith(
      'Solicitud de cotización para: QR Menu Service\n\nSerás redirigido al formulario de contacto.'
    );
    
    alertSpy.mockRestore();
  });

  it('handles request quote from modal', () => {
    render(<WebServicesCatalog onRequestQuote={mockOnRequestQuote} />);
    
    // Open modal
    const viewDetailsButton = screen.getByTestId('view-details-0');
    fireEvent.click(viewDetailsButton);
    
    // Request quote from modal
    const modalRequestQuoteButton = screen.getByTestId('modal-request-quote');
    fireEvent.click(modalRequestQuoteButton);
    
    expect(mockOnRequestQuote).toHaveBeenCalledWith({
      id: 'qr-menu-1',
      title: 'QR Menu Service',
      description: 'Digital menu with QR code',
      category: { id: 'qr-menus', name: 'Menús QR' },
      features: ['responsive', 'real-time updates'],
      technologies: ['React', 'Next.js']
    });
  });

  it('shows results summary when filters are applied', async () => {
    render(<WebServicesCatalog />);
    
    const filterButton = screen.getByTestId('filter-button');
    fireEvent.click(filterButton);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading-state')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('Mostrando 1 de 2 servicios')).toBeInTheDocument();
  });

  it('shows results summary when search is applied', async () => {
    render(<WebServicesCatalog />);
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'website' } });
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading-state')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('Mostrando 1 de 2 servicios para "website"')).toBeInTheDocument();
  });

  it('shows no results state when no services match filters', async () => {
    render(<WebServicesCatalog />);
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading-state')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('No se encontraron servicios')).toBeInTheDocument();
    expect(screen.getByText('No hay servicios que coincidan con "nonexistent"')).toBeInTheDocument();
  });

  it('clears filters when clicking clear button in no results state', async () => {
    render(<WebServicesCatalog />);
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading-state')).not.toBeInTheDocument();
    });
    
    const clearButton = screen.getByText('Limpiar filtros');
    fireEvent.click(clearButton);
    
    // Should show all services again
    await waitFor(() => {
      expect(screen.getByTestId('service-count')).toHaveTextContent('2');
    });
  });

  it('applies custom className', () => {
    const { container } = render(<WebServicesCatalog className="custom-class" />);
    
    expect(container.firstChild).toHaveClass('web-services-catalog', 'custom-class');
  });
});