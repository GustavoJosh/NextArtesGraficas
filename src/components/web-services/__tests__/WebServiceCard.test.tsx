import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WebServiceCard } from '../WebServiceCard';
import { sampleWebServices } from '@/data/webServices';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, variants, initial, whileHover, animate, style, onClick, className, ...props }: any) => 
      <div className={className} style={style} onClick={onClick} {...props}>{children}</div>,
    span: ({ children, variants, className, ...props }: any) => 
      <span className={className} {...props}>{children}</span>,
  },
}));

// Mock Next.js Image component
vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt, ...props }: any) => <img alt={alt} {...props} />,
}));

describe('WebServiceCard', () => {
  const mockService = sampleWebServices[0];
  const mockOnViewDetails = vi.fn();
  const mockOnRequestQuote = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders service information correctly', () => {
    render(
      <WebServiceCard
        service={mockService}
        onViewDetails={mockOnViewDetails}
        onRequestQuote={mockOnRequestQuote}
        index={0}
      />
    );

    expect(screen.getByText(mockService.title)).toBeInTheDocument();
    expect(screen.getByText(mockService.description)).toBeInTheDocument();
    expect(screen.getByText(mockService.category.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockService.pricing.starting}`)).toBeInTheDocument();
    expect(screen.getByText(mockService.estimatedDelivery)).toBeInTheDocument();
  });

  it('displays technology badges', () => {
    render(
      <WebServiceCard
        service={mockService}
        onViewDetails={mockOnViewDetails}
        onRequestQuote={mockOnRequestQuote}
        index={0}
      />
    );

    // Should show first 4 technologies
    mockService.technologies.slice(0, 4).forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it('shows action buttons', () => {
    render(
      <WebServiceCard
        service={mockService}
        onViewDetails={mockOnViewDetails}
        onRequestQuote={mockOnRequestQuote}
        index={0}
      />
    );

    expect(screen.getByText('Ver Detalles')).toBeInTheDocument();
    expect(screen.getByText('Cotizar')).toBeInTheDocument();
  });

  it('calls onViewDetails when view details button is clicked', () => {
    render(
      <WebServiceCard
        service={mockService}
        onViewDetails={mockOnViewDetails}
        onRequestQuote={mockOnRequestQuote}
        index={0}
      />
    );

    const viewDetailsButton = screen.getByText('Ver Detalles');
    viewDetailsButton.click();

    expect(mockOnViewDetails).toHaveBeenCalledWith(mockService);
  });

  it('calls onRequestQuote when quote button is clicked', () => {
    render(
      <WebServiceCard
        service={mockService}
        onViewDetails={mockOnViewDetails}
        onRequestQuote={mockOnRequestQuote}
        index={0}
      />
    );

    const quoteButton = screen.getByText('Cotizar');
    quoteButton.click();

    expect(mockOnRequestQuote).toHaveBeenCalledWith(mockService);
  });
});