// src/components/ui/__tests__/ServiceCard.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ServiceCard, ServiceGrid } from '../ServiceCard';
import type { Service, ServiceExample } from '@/data/services';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

const mockServiceExample: ServiceExample = {
  id: 'test-example',
  title: 'Test Example',
  description: 'Test example description',
  imagePath: '/images/examples/test.webp',
  category: 'impresion',
  materials: ['papel', 'vinilo'],
  dimensions: '10cm x 10cm'
};

const mockService: Service = {
  title: 'Test Service',
  description: 'Test service description',
  imageName: 'test-service',
  category: 'impresion',
  deliveryTime: {
    standard: '2-3 días hábiles',
    rush: '24 horas',
    notes: 'Test delivery notes'
  },
  specifications: {
    materials: ['papel', 'vinilo', 'cartón'],
    maxSize: 'A4',
    minQuantity: 1,
    features: ['Alta calidad', 'Colores vibrantes', 'Resistente']
  },
  examples: [mockServiceExample],
  pricing: {
    startingFrom: 'Desde $50',
    unit: 'por pieza'
  }
};

describe('ServiceCard', () => {
  describe('Basic Rendering', () => {
    it('renders service card with basic information', () => {
      render(
        <ServiceCard
          title="Test Service"
          description="Test description"
          category="impresion"
        />
      );

      expect(screen.getByText('Test Service')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
      expect(screen.getByText('Impresión')).toBeInTheDocument();
    });

    it('renders with correct category styling', () => {
      const { rerender } = render(
        <ServiceCard
          title="Test Service"
          description="Test description"
          category="laser"
        />
      );

      expect(screen.getByText('Láser')).toBeInTheDocument();

      rerender(
        <ServiceCard
          title="Test Service"
          description="Test description"
          category="papeleria"
        />
      );

      expect(screen.getByText('Papelería')).toBeInTheDocument();
    });

    it('uses default category when none provided', () => {
      render(
        <ServiceCard
          title="Test Service"
          description="Test description"
        />
      );

      expect(screen.getByText('Impresión')).toBeInTheDocument();
    });
  });

  describe('Delivery Time Badge', () => {
    it('displays delivery time badge when provided', () => {
      render(
        <ServiceCard
          title="Test Service"
          description="Test description"
          deliveryTime={{
            standard: '2-3 días hábiles',
            rush: '24 horas'
          }}
        />
      );

      expect(screen.getByText('2-3 días hábiles')).toBeInTheDocument();
    });

    it('does not display delivery badge when not provided', () => {
      render(
        <ServiceCard
          title="Test Service"
          description="Test description"
        />
      );

      expect(screen.queryByText('2-3 días hábiles')).not.toBeInTheDocument();
    });
  });

  describe('Example Thumbnails Preview', () => {
    it('displays example thumbnails when collapsed', () => {
      render(
        <ServiceCard
          title="Test Service"
          description="Test description"
          examples={[mockServiceExample]}
        />
      );

      expect(screen.getByText('Ejemplos:')).toBeInTheDocument();
      expect(screen.getByAltText('Test Example')).toBeInTheDocument();
    });

    it('displays +N indicator for more than 3 examples', () => {
      const multipleExamples = Array.from({ length: 5 }, (_, i) => ({
        ...mockServiceExample,
        id: `example-${i}`,
        title: `Example ${i}`
      }));

      render(
        <ServiceCard
          title="Test Service"
          description="Test description"
          examples={multipleExamples}
        />
      );

      expect(screen.getByText('+2')).toBeInTheDocument();
    });

    it('hides example thumbnails when expanded', async () => {
      const user = userEvent.setup();
      
      render(
        <ServiceCard
          title="Test Service"
          description="Test description"
          examples={[mockServiceExample]}
        />
      );

      // Initially shows examples
      expect(screen.getByText('Ejemplos:')).toBeInTheDocument();

      // Click expand button
      const expandButton = screen.getByLabelText('Expand Test Service details');
      await user.click(expandButton);

      // Examples should be hidden in collapsed view
      expect(screen.queryByText('Ejemplos:')).not.toBeInTheDocument();
    });
  });

  describe('Pricing Display', () => {
    it('displays pricing information when provided', () => {
      render(
        <ServiceCard
          title="Test Service"
          description="Test description"
          pricing={{
            startingFrom: 'Desde $50',
            unit: 'por pieza'
          }}
        />
      );

      expect(screen.getByText('Desde $50')).toBeInTheDocument();
      expect(screen.getByText('por pieza')).toBeInTheDocument();
    });

    it('displays pricing without unit when unit not provided', () => {
      render(
        <ServiceCard
          title="Test Service"
          description="Test description"
          pricing={{
            startingFrom: 'Desde $50'
          }}
        />
      );

      expect(screen.getByText('Desde $50')).toBeInTheDocument();
      expect(screen.queryByText('por pieza')).not.toBeInTheDocument();
    });
  });

  describe('Expandable Functionality', () => {
    it('toggles expanded state when expand button is clicked', async () => {
      const user = userEvent.setup();
      const onExpand = jest.fn();
      
      render(
        <ServiceCard
          title="Test Service"
          description="Test description"
          onExpand={onExpand}
        />
      );

      const expandButton = screen.getByLabelText('Expand Test Service details');
      
      // Initially collapsed
      expect(expandButton).toHaveAttribute('aria-label', 'Expand Test Service details');
      
      // Click to expand
      await user.click(expandButton);
      
      expect(onExpand).toHaveBeenCalledWith(true);
      expect(expandButton).toHaveAttribute('aria-label', 'Collapse Test Service details');
      
      // Click to collapse
      await user.click(expandButton);
      
      expect(onExpand).toHaveBeenCalledWith(false);
      expect(expandButton).toHaveAttribute('aria-label', 'Expand Test Service details');
    });

    it('displays expanded content when expanded', async () => {
      const user = userEvent.setup();
      
      render(
        <ServiceCard
          title="Test Service"
          description="Test description"
          deliveryTime={{
            standard: '2-3 días hábiles',
            rush: '24 horas',
            notes: 'Test delivery notes'
          }}
          specifications={{
            materials: ['papel', 'vinilo'],
            features: ['Alta calidad', 'Resistente']
          }}
          examples={[mockServiceExample]}
        />
      );

      // Click expand button
      const expandButton = screen.getByLabelText('Expand Test Service details');
      await user.click(expandButton);

      // Check expanded content
      expect(screen.getByText('Tiempos de Entrega')).toBeInTheDocument();
      expect(screen.getByText('Estándar')).toBeInTheDocument();
      expect(screen.getByText('Express')).toBeInTheDocument();
      expect(screen.getByText('Test delivery notes')).toBeInTheDocument();
      expect(screen.getByText('Características')).toBeInTheDocument();
      expect(screen.getByText('Alta calidad')).toBeInTheDocument();
      expect(screen.getByText('Materiales')).toBeInTheDocument();
      expect(screen.getByText('papel')).toBeInTheDocument();
      expect(screen.getByText('Ejemplos de Trabajo')).toBeInTheDocument();
    });

    it('shows "Y N ejemplos más..." when more than 6 examples', async () => {
      const user = userEvent.setup();
      const manyExamples = Array.from({ length: 8 }, (_, i) => ({
        ...mockServiceExample,
        id: `example-${i}`,
        title: `Example ${i}`
      }));
      
      render(
        <ServiceCard
          title="Test Service"
          description="Test description"
          examples={manyExamples}
        />
      );

      // Expand to see examples
      const expandButton = screen.getByLabelText('Expand Test Service details');
      await user.click(expandButton);

      expect(screen.getByText('Y 2 ejemplos más...')).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('supports keyboard navigation for expand/collapse', async () => {
      const user = userEvent.setup();
      const onExpand = jest.fn();
      
      render(
        <ServiceCard
          title="Test Service"
          description="Test description"
          onExpand={onExpand}
        />
      );

      const card = screen.getByRole('article');
      
      // Focus the card
      card.focus();
      
      // Press Enter to expand
      await user.keyboard('{Enter}');
      expect(onExpand).toHaveBeenCalledWith(true);
      
      // Press Space to collapse
      await user.keyboard(' ');
      expect(onExpand).toHaveBeenCalledWith(false);
    });

    it('supports Escape key to collapse when expanded', async () => {
      const user = userEvent.setup();
      const onExpand = jest.fn();
      
      render(
        <ServiceCard
          title="Test Service"
          description="Test description"
          onExpand={onExpand}
        />
      );

      const card = screen.getByRole('article');
      
      // Focus and expand
      card.focus();
      await user.keyboard('{Enter}');
      expect(onExpand).toHaveBeenCalledWith(true);
      
      // Press Escape to collapse
      await user.keyboard('{Escape}');
      expect(onExpand).toHaveBeenCalledWith(false);
    });

    it('supports keyboard navigation for example images', async () => {
      const user = userEvent.setup();
      
      render(
        <ServiceCard
          title="Test Service"
          description="Test description"
          examples={[mockServiceExample]}
        />
      );

      // Expand to see examples
      const expandButton = screen.getByLabelText('Expand Test Service details');
      await user.click(expandButton);

      const exampleButton = screen.getByRole('button', { name: 'View example: Test Example' });
      
      // Focus the example
      exampleButton.focus();
      
      // Should be focusable
      expect(exampleButton).toHaveFocus();
      
      // Should respond to Enter key
      await user.keyboard('{Enter}');
      // Note: In a real implementation, this would trigger example viewing
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <ServiceCard
          title="Test Service"
          description="Test description"
        />
      );

      const card = screen.getByRole('article');
      expect(card).toHaveAttribute('aria-expanded', 'false');
      expect(card).toHaveAttribute('aria-label', 'Test Service service card. Press Enter to expand details.');
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('updates ARIA attributes when expanded', async () => {
      const user = userEvent.setup();
      
      render(
        <ServiceCard
          title="Test Service"
          description="Test description"
        />
      );

      const card = screen.getByRole('article');
      const expandButton = screen.getByLabelText('Expand Test Service details');
      
      await user.click(expandButton);
      
      expect(card).toHaveAttribute('aria-expanded', 'true');
      expect(card).toHaveAttribute('aria-label', 'Test Service service card. Press Enter to collapse details.');
    });

    it('has proper focus management', async () => {
      const user = userEvent.setup();
      
      render(
        <ServiceCard
          title="Test Service"
          description="Test description"
        />
      );

      const card = screen.getByRole('article');
      const expandButton = screen.getByLabelText('Expand Test Service details');
      
      // Expand using card focus
      card.focus();
      await user.keyboard('{Enter}');
      
      // Collapse using Escape should focus the expand button
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(expandButton).toHaveFocus();
      });
    });
  });

  describe('Image Handling', () => {
    it('uses provided imageName for service image', () => {
      render(
        <ServiceCard
          title="Test Service"
          description="Test description"
          imageName="custom-image"
        />
      );

      const image = screen.getByAltText('Test Service');
      expect(image).toHaveAttribute('src', '/images/services/custom-image.webp');
    });

    it('uses placeholder image when imageName not provided', () => {
      render(
        <ServiceCard
          title="Test Service"
          description="Test description"
        />
      );

      const image = screen.getByAltText('Test Service');
      expect(image).toHaveAttribute('src', '/images/services/impresion-digital.webp');
    });
  });
});

describe('ServiceGrid', () => {
  const mockServices: Service[] = [
    {
      ...mockService,
      title: 'Service 1'
    },
    {
      ...mockService,
      title: 'Service 2',
      category: 'laser'
    },
    {
      ...mockService,
      title: 'Service 3',
      category: 'papeleria'
    }
  ];

  it('renders multiple service cards', () => {
    render(<ServiceGrid services={mockServices} />);

    expect(screen.getByText('Service 1')).toBeInTheDocument();
    expect(screen.getByText('Service 2')).toBeInTheDocument();
    expect(screen.getByText('Service 3')).toBeInTheDocument();
  });

  it('passes all service properties to ServiceCard components', () => {
    render(<ServiceGrid services={mockServices} />);

    // Check that enhanced properties are passed through
    expect(screen.getByText('2-3 días hábiles')).toBeInTheDocument();
    expect(screen.getByText('Desde $50')).toBeInTheDocument();
    expect(screen.getByText('Ejemplos:')).toBeInTheDocument();
  });

  it('renders with proper grid layout classes', () => {
    const { container } = render(<ServiceGrid services={mockServices} />);
    
    const grid = container.firstChild;
    expect(grid).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-8', 'max-w-6xl', 'mx-auto');
  });
});