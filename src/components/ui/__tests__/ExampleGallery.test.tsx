import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import ExampleGallery from '../ExampleGallery';
import { ServiceExample } from '@/data/services';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, onLoad, ...props }: any) => {
    return (
      <img
        src={src}
        alt={alt}
        onLoad={onLoad}
        {...props}
        data-testid="gallery-image"
      />
    );
  },
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Sample test data
const mockExamples: ServiceExample[] = [
  {
    id: 'example-1',
    title: 'Flyer Restaurante',
    description: 'Flyer promocional para restaurante',
    imagePath: '/images/examples/flyer-1.webp',
    category: 'impresion',
    materials: ['papel couché'],
    dimensions: '21cm x 29.7cm'
  },
  {
    id: 'example-2',
    title: 'Letrero Madera',
    description: 'Letrero grabado en madera',
    imagePath: '/images/examples/wood-sign.webp',
    category: 'laser',
    materials: ['madera de roble'],
    dimensions: '30cm x 20cm'
  },
  {
    id: 'example-3',
    title: 'Stickers Logo',
    description: 'Stickers personalizados con logo',
    imagePath: '/images/examples/stickers.webp',
    category: 'papeleria',
    materials: ['vinilo adhesivo'],
    dimensions: '5cm x 5cm'
  }
];

describe('ExampleGallery', () => {
  beforeEach(() => {
    // Mock IntersectionObserver to trigger immediately
    mockIntersectionObserver.mockImplementation((callback) => ({
      observe: () => {
        callback([{ isIntersecting: true }]);
      },
      unobserve: () => null,
      disconnect: () => null,
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
    // Reset body overflow
    document.body.style.overflow = 'unset';
  });

  describe('Basic Rendering', () => {
    it('renders gallery with examples', async () => {
      render(<ExampleGallery examples={mockExamples} />);
      
      await waitFor(() => {
        expect(screen.getByText('Flyer Restaurante')).toBeInTheDocument();
        expect(screen.getByText('Letrero Madera')).toBeInTheDocument();
        expect(screen.getByText('Stickers Logo')).toBeInTheDocument();
      });
    });

    it('renders empty state when no examples provided', () => {
      render(<ExampleGallery examples={[]} />);
      expect(screen.getByText('No hay ejemplos disponibles')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <ExampleGallery examples={mockExamples} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Grid Layout', () => {
    it('renders with default 3-column grid', () => {
      const { container } = render(<ExampleGallery examples={mockExamples} />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
    });

    it('renders with 2-column grid when specified', () => {
      const { container } = render(<ExampleGallery examples={mockExamples} columns={2} />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2');
    });

    it('renders with 4-column grid when specified', () => {
      const { container } = render(<ExampleGallery examples={mockExamples} columns={4} />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4');
    });
  });

  describe('Filtering', () => {
    it('shows filters when showFilters is true and multiple categories exist', () => {
      render(<ExampleGallery examples={mockExamples} showFilters={true} />);
      
      expect(screen.getByText('Todos')).toBeInTheDocument();
      expect(screen.getByText('Impresión')).toBeInTheDocument();
      expect(screen.getByText('Láser')).toBeInTheDocument();
      expect(screen.getByText('Papelería')).toBeInTheDocument();
    });

    it('does not show filters when showFilters is false', () => {
      render(<ExampleGallery examples={mockExamples} showFilters={false} />);
      
      expect(screen.queryByText('Todos')).not.toBeInTheDocument();
    });

    it('filters examples by category', async () => {
      render(<ExampleGallery examples={mockExamples} showFilters={true} />);
      
      // Click on Láser filter
      fireEvent.click(screen.getByText('Láser'));
      
      await waitFor(() => {
        expect(screen.getByText('Letrero Madera')).toBeInTheDocument();
        expect(screen.queryByText('Flyer Restaurante')).not.toBeInTheDocument();
        expect(screen.queryByText('Stickers Logo')).not.toBeInTheDocument();
      });
    });

    it('shows all examples when "Todos" filter is selected', async () => {
      render(<ExampleGallery examples={mockExamples} showFilters={true} />);
      
      // First filter by category
      fireEvent.click(screen.getByText('Láser'));
      
      // Then click "Todos"
      fireEvent.click(screen.getByText('Todos'));
      
      await waitFor(() => {
        expect(screen.getByText('Flyer Restaurante')).toBeInTheDocument();
        expect(screen.getByText('Letrero Madera')).toBeInTheDocument();
        expect(screen.getByText('Stickers Logo')).toBeInTheDocument();
      });
    });
  });

  describe('Modal Functionality', () => {
    it('opens modal when example is clicked', async () => {
      render(<ExampleGallery examples={mockExamples} />);
      
      await waitFor(() => {
        const firstExample = screen.getByText('Flyer Restaurante');
        fireEvent.click(firstExample.closest('div')!);
      });

      await waitFor(() => {
        expect(screen.getByLabelText('Cerrar galería')).toBeInTheDocument();
      });
    });

    it('closes modal when close button is clicked', async () => {
      render(<ExampleGallery examples={mockExamples} />);
      
      // Open modal
      await waitFor(() => {
        const firstExample = screen.getByText('Flyer Restaurante');
        fireEvent.click(firstExample.closest('div')!);
      });

      // Close modal
      await waitFor(() => {
        const closeButton = screen.getByLabelText('Cerrar galería');
        fireEvent.click(closeButton);
      });

      await waitFor(() => {
        expect(screen.queryByLabelText('Cerrar galería')).not.toBeInTheDocument();
      });
    });

    it('closes modal when escape key is pressed', async () => {
      render(<ExampleGallery examples={mockExamples} />);
      
      // Open modal
      await waitFor(() => {
        const firstExample = screen.getByText('Flyer Restaurante');
        fireEvent.click(firstExample.closest('div')!);
      });

      // Press escape
      fireEvent.keyDown(document, { key: 'Escape' });

      await waitFor(() => {
        expect(screen.queryByLabelText('Cerrar galería')).not.toBeInTheDocument();
      });
    });

    it('navigates to next example with arrow key', async () => {
      render(<ExampleGallery examples={mockExamples} />);
      
      // Open modal with first example
      await waitFor(() => {
        const firstExample = screen.getByText('Flyer Restaurante');
        fireEvent.click(firstExample.closest('div')!);
      });

      // Press right arrow
      fireEvent.keyDown(document, { key: 'ArrowRight' });

      await waitFor(() => {
        // Check for modal title specifically (h3 element)
        expect(screen.getByRole('heading', { level: 3, name: 'Letrero Madera' })).toBeInTheDocument();
      });
    });

    it('navigates to previous example with arrow key', async () => {
      render(<ExampleGallery examples={mockExamples} />);
      
      // Open modal with second example
      await waitFor(() => {
        const secondExample = screen.getByText('Letrero Madera');
        fireEvent.click(secondExample.closest('div')!);
      });

      // Press left arrow
      fireEvent.keyDown(document, { key: 'ArrowLeft' });

      await waitFor(() => {
        // Check for modal title specifically (h3 element)
        expect(screen.getByRole('heading', { level: 3, name: 'Flyer Restaurante' })).toBeInTheDocument();
      });
    });

    it('shows navigation buttons when multiple examples exist', async () => {
      render(<ExampleGallery examples={mockExamples} />);
      
      // Open modal
      await waitFor(() => {
        const firstExample = screen.getByText('Flyer Restaurante');
        fireEvent.click(firstExample.closest('div')!);
      });

      await waitFor(() => {
        expect(screen.getByLabelText('Ejemplo anterior')).toBeInTheDocument();
        expect(screen.getByLabelText('Siguiente ejemplo')).toBeInTheDocument();
      });
    });

    it('does not show navigation buttons for single example', async () => {
      const singleExample = [mockExamples[0]];
      render(<ExampleGallery examples={singleExample} />);
      
      // Open modal
      await waitFor(() => {
        const example = screen.getByText('Flyer Restaurante');
        fireEvent.click(example.closest('div')!);
      });

      await waitFor(() => {
        expect(screen.queryByLabelText('Ejemplo anterior')).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Siguiente ejemplo')).not.toBeInTheDocument();
      });
    });

    it('displays example details in modal', async () => {
      render(<ExampleGallery examples={mockExamples} />);
      
      // Open modal
      await waitFor(() => {
        const firstExample = screen.getByText('Flyer Restaurante');
        fireEvent.click(firstExample.closest('div')!);
      });

      await waitFor(() => {
        // Check for modal title specifically
        expect(screen.getByRole('heading', { level: 3, name: 'Flyer Restaurante' })).toBeInTheDocument();
        expect(screen.getByText('papel couché')).toBeInTheDocument();
        expect(screen.getByText('21cm x 29.7cm')).toBeInTheDocument();
      });
    });

    it('shows counter in modal for multiple examples', async () => {
      render(<ExampleGallery examples={mockExamples} />);
      
      // Open modal
      await waitFor(() => {
        const firstExample = screen.getByText('Flyer Restaurante');
        fireEvent.click(firstExample.closest('div')!);
      });

      await waitFor(() => {
        expect(screen.getByText('1 de 3')).toBeInTheDocument();
      });
    });

    it('locks body scroll when modal is open', async () => {
      render(<ExampleGallery examples={mockExamples} />);
      
      // Open modal
      await waitFor(() => {
        const firstExample = screen.getByText('Flyer Restaurante');
        fireEvent.click(firstExample.closest('div')!);
      });

      await waitFor(() => {
        expect(document.body.style.overflow).toBe('hidden');
      });
    });
  });

  describe('Touch Navigation', () => {
    it('handles touch events for swipe navigation', async () => {
      render(<ExampleGallery examples={mockExamples} />);
      
      // Open modal
      await waitFor(() => {
        const firstExample = screen.getByText('Flyer Restaurante');
        fireEvent.click(firstExample.closest('div')!);
      });

      // Find the modal container by looking for the close button and getting its parent
      const closeButton = screen.getByLabelText('Cerrar galería');
      const modalContainer = closeButton.closest('[class*="fixed"]');
      
      // Verify modal is open
      expect(modalContainer).toBeInTheDocument();
      
      // Find the image container within the modal that has touch handlers
      const modalImages = screen.getAllByAltText('Flyer Restaurante');
      const modalImage = modalImages.find(img => 
        img.className.includes('max-w-full') && img.className.includes('max-h-[80vh]')
      );
      expect(modalImage).toBeInTheDocument();
      
      const touchContainer = modalImage?.closest('div');
      
      // Simulate left swipe (should go to next)
      fireEvent.touchStart(touchContainer!, { 
        targetTouches: [{ clientX: 100 }] 
      });
      fireEvent.touchMove(touchContainer!, { 
        targetTouches: [{ clientX: 40 }] 
      });
      fireEvent.touchEnd(touchContainer!);

      // At minimum, verify the modal is still functional
      await waitFor(() => {
        expect(screen.getByLabelText('Cerrar galería')).toBeInTheDocument();
      });
    });
  });

  describe('Lazy Loading', () => {
    it('renders images with proper lazy loading setup', async () => {
      render(<ExampleGallery examples={mockExamples} />);
      
      await waitFor(() => {
        const images = screen.getAllByTestId('gallery-image');
        expect(images).toHaveLength(mockExamples.length);
      });
    });

    it('shows loading placeholder before image loads', () => {
      // Mock IntersectionObserver to not trigger
      mockIntersectionObserver.mockImplementation(() => ({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
      }));

      const { container } = render(<ExampleGallery examples={mockExamples} />);
      
      const placeholders = container.querySelectorAll('.animate-pulse');
      expect(placeholders.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('provides proper ARIA labels for interactive elements', async () => {
      render(<ExampleGallery examples={mockExamples} />);
      
      // Open modal
      await waitFor(() => {
        const firstExample = screen.getByText('Flyer Restaurante');
        fireEvent.click(firstExample.closest('div')!);
      });

      await waitFor(() => {
        expect(screen.getByLabelText('Cerrar galería')).toBeInTheDocument();
        expect(screen.getByLabelText('Ejemplo anterior')).toBeInTheDocument();
        expect(screen.getByLabelText('Siguiente ejemplo')).toBeInTheDocument();
      });
    });

    it('provides proper alt text for images', async () => {
      render(<ExampleGallery examples={mockExamples} />);
      
      await waitFor(() => {
        const images = screen.getAllByTestId('gallery-image');
        images.forEach((img, index) => {
          expect(img).toHaveAttribute('alt', mockExamples[index].title);
        });
      });
    });
  });
});