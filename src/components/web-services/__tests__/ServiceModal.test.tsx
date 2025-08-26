import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ServiceModal } from '../ServiceModal';
import { sampleWebServices } from '@/data/webServices';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock Next.js Image component
vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

const mockService = sampleWebServices[0];

const defaultProps = {
  service: mockService,
  isOpen: true,
  onClose: vi.fn(),
  onRequestQuote: vi.fn(),
};

describe('ServiceModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Reset body overflow style
    document.body.style.overflow = 'unset';
  });

  it('renders modal when open', () => {
    render(<ServiceModal {...defaultProps} />);
    
    expect(screen.getByText(mockService.title)).toBeInTheDocument();
    expect(screen.getByText(mockService.category.name)).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<ServiceModal {...defaultProps} isOpen={false} />);
    
    expect(screen.queryByText(mockService.title)).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<ServiceModal {...defaultProps} />);
    
    const closeButton = screen.getByLabelText('Cerrar modal');
    fireEvent.click(closeButton);
    
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', () => {
    render(<ServiceModal {...defaultProps} />);
    
    // Find the backdrop by its class instead of role
    const backdrop = document.querySelector('.bg-black\\/80');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    }
  });

  it('calls onRequestQuote when quote button is clicked', () => {
    render(<ServiceModal {...defaultProps} />);
    
    const quoteButton = screen.getByText('Solicitar Cotización');
    fireEvent.click(quoteButton);
    
    expect(defaultProps.onRequestQuote).toHaveBeenCalledWith(mockService);
  });

  it('switches tabs correctly', () => {
    render(<ServiceModal {...defaultProps} />);
    
    // Initially on overview tab
    expect(screen.getByText('Descripción')).toBeInTheDocument();
    
    // Switch to features tab
    const featuresTab = screen.getByText('Características');
    fireEvent.click(featuresTab);
    
    expect(screen.getByText('Características Principales')).toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
    render(<ServiceModal {...defaultProps} />);
    
    // Test Escape key
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    
    // Test tab switching with number keys
    fireEvent.keyDown(document, { key: '2' });
    expect(screen.getByText('Características Principales')).toBeInTheDocument();
  });

  it('displays service information correctly', () => {
    render(<ServiceModal {...defaultProps} />);
    
    expect(screen.getByText(mockService.description)).toBeInTheDocument();
    expect(screen.getByText(mockService.estimatedDelivery)).toBeInTheDocument();
    
    // Switch to pricing tab to see the price
    const pricingTab = screen.getByText('Precios');
    fireEvent.click(pricingTab);
    
    // Use a more flexible matcher for the price - check if the price number exists anywhere
    expect(screen.getByText((content) => {
      return content.includes(mockService.pricing.starting.toString());
    })).toBeInTheDocument();
  });

  it('shows demo button when demo URL is available', () => {
    const serviceWithDemo = { ...mockService, demoUrl: 'https://example.com' };
    render(<ServiceModal {...defaultProps} service={serviceWithDemo} />);
    
    expect(screen.getByText('Ver Demo')).toBeInTheDocument();
  });

  it('displays testimonials when available', () => {
    render(<ServiceModal {...defaultProps} />);
    
    if (mockService.testimonials.length > 0) {
      expect(screen.getByText('Testimonios')).toBeInTheDocument();
      expect(screen.getByText(mockService.testimonials[0].clientName)).toBeInTheDocument();
    }
  });

  it('handles image navigation for multiple images', () => {
    const serviceWithMultipleImages = {
      ...mockService,
      gallery: [
        { url: '/image1.jpg', alt: 'Image 1', type: 'screenshot' as const, featured: true },
        { url: '/image2.jpg', alt: 'Image 2', type: 'mockup' as const, featured: false },
      ]
    };
    
    render(<ServiceModal {...defaultProps} service={serviceWithMultipleImages} />);
    
    // Should show navigation buttons for multiple images
    expect(screen.getByLabelText('Imagen anterior')).toBeInTheDocument();
    expect(screen.getByLabelText('Siguiente imagen')).toBeInTheDocument();
  });

  it('prevents body scroll when modal is open', () => {
    render(<ServiceModal {...defaultProps} />);
    
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when modal is closed', () => {
    const { rerender } = render(<ServiceModal {...defaultProps} />);
    
    // Modal is open, body scroll should be hidden
    expect(document.body.style.overflow).toBe('hidden');
    
    // Close modal
    rerender(<ServiceModal {...defaultProps} isOpen={false} />);
    
    // Body scroll should be restored
    expect(document.body.style.overflow).toBe('unset');
  });

  it('displays technology badges', () => {
    render(<ServiceModal {...defaultProps} />);
    
    mockService.technologies.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it('shows case study when available', () => {
    render(<ServiceModal {...defaultProps} />);
    
    // Switch to features tab to see case study
    const featuresTab = screen.getByText('Características');
    fireEvent.click(featuresTab);
    
    if (mockService.caseStudy) {
      expect(screen.getByText('Caso de Estudio')).toBeInTheDocument();
      expect(screen.getByText(mockService.caseStudy.title)).toBeInTheDocument();
    }
  });
});