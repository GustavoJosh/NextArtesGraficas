// src/components/ui/__tests__/ServiceDetailCard.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ServiceDetailCard, ServiceDetailGrid } from '../ServiceDetailCard';
import type { Service, ServiceExample } from '@/data/services';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, variants, initial, animate, ...props }: any) => (
      <div data-testid={`motion-div-${animate}`} {...props}>{children}</div>
    ),
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, onLoad, onError, ...props }: any) => {
    // Simulate successful image load
    setTimeout(() => onLoad?.(), 0);
    return <img src={src} alt={alt} {...props} />;
  },
}));

const mockServiceExample: ServiceExample = {
  id: 'test-example-1',
  title: 'Test Example 1',
  description: 'Test example description 1',
  imagePath: '/images/examples/test1.webp',
  category: 'impresion',
  materials: ['papel', 'vinilo'],
  dimensions: '10cm x 10cm'
};

const mockServiceExample2: ServiceExample = {
  id: 'test-example-2',
  title: 'Test Example 2',
  description: 'Test example description 2',
  imagePath: '/images/examples/test2.webp',
  category: 'impresion',
  materials: ['cartón'],
  dimensions: '15cm x 15cm'
};

const mockService: Service = {
  title: 'Enhanced Test Service',
  description: 'Enhanced test service description with more details',
  imageName: 'enhanced-test-service',
  category: 'laser',
  deliveryTime: {
    standard: '2-4 días hábiles',
    rush: '24-48 horas',
    notes: 'Tiempo depende del material y complejidad'
  },
  specifications: {
    materials: ['madera', 'metal', 'acrílico'],
    maxSize: '60cm x 40cm',
    minQuantity: 1,
    features: ['Precisión micrométrica', 'Grabado profundo', 'Diseños complejos']
  },
  examples: [mockServiceExample, mockServiceExample2],
  pricing: {
    startingFrom: 'Desde $80',
    unit: 'por pieza'
  }
};

describe('ServiceDetailCard', () => {
  describe('Basic Rendering', () => {
    it('renders service detail card with basic information', () => {
      render(
        <ServiceDetailCard
          title="Enhanced Test Service"
          description="Enhanced test description"
          category="laser"
        />
      );

      expect(screen.getByText('Enhanced Test Service')).toBeInTheDocument();
      expect(screen.getByText('Enhanced test description')).toBeInTheDocument();
      expect(screen.getByText('Láser')).toBeInTheDocument();
    });

    it('renders with correct category styling for all categories', () => {
      const { rerender } = render(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
          category="impresion"
        />
      );

      expect(screen.getByText('Impresión')).toBeInTheDocument();

      rerender(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
          category="laser"
        />
      );

      expect(screen.getByText('Láser')).toBeInTheDocument();

      rerender(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
          category="papeleria"
        />
      );

      expect(screen.getByText('Papelería')).toBeInTheDocument();
    });

    it('uses default category when none provided', () => {
      render(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
        />
      );

      expect(screen.getByText('Impresión')).toBeInTheDocument();
    });

    it('applies custom className when provided', () => {
      const { container } = render(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
          className="custom-class"
        />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Default Expanded State', () => {
    it('renders expanded by default when defaultExpanded is true', () => {
      render(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
          defaultExpanded={true}
          deliveryTime={{
            standard: '2-3 días hábiles',
            rush: '24 horas'
          }}
        />
      );

      // Should show expanded content immediately
      expect(screen.getByText('Tiempos de Entrega')).toBeInTheDocument();
      expect(screen.getByText('Estándar')).toBeInTheDocument();
    });

    it('renders collapsed by default when defaultExpanded is false', () => {
      render(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
          defaultExpanded={false}
          deliveryTime={{
            standard: '2-3 días hábiles',
            rush: '24 horas'
          }}
        />
      );

      // Should not show expanded content initially
      expect(screen.queryByText('Tiempos de Entrega')).not.toBeInTheDocument();
    });
  });

  describe('Enhanced Delivery Time Display', () => {
    it('displays delivery time badge with enhanced styling', () => {
      render(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
          deliveryTime={{
            standard: '2-4 días hábiles',
            rush: '24-48 horas',
            notes: 'Tiempo puede variar'
          }}
        />
      );

      expect(screen.getByText('2-4 días hábiles')).toBeInTheDocument();
    });

    it('displays delivery information in expanded state with notes', async () => {
      const user = userEvent.setup();
      
      render(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
          deliveryTime={{
            standard: '2-4 días hábiles',
            rush: '24-48 horas',
            notes: 'Tiempo puede variar según complejidad'
          }}
        />
      );

      // Expand the card
      const expandButton = screen.getByLabelText('Expand Test Service details');
      await user.click(expandButton);

      expect(screen.getByText('Tiempos de Entrega')).toBeInTheDocument();
      expect(screen.getByText('Estándar')).toBeInTheDocument();
      expect(screen.getByText('Express')).toBeInTheDocument();
      expect(screen.getByText('Tiempo puede variar según complejidad')).toBeInTheDocument();
    });
  });

  describe('Enhanced Example Thumbnails', () => {
    it('displays example thumbnails with hover effects when collapsed', () => {
      render(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
          examples={[mockServiceExample, mockServiceExample2]}
        />
      );

      expect(screen.getByText('Ejemplos:')).toBeInTheDocument();
      expect(screen.getByAltText('Test Example 1')).toBeInTheDocument();
      expect(screen.getByAltText('Test Example 2')).toBeInTheDocument();
    });

    it('displays +N indicator for more than 3 examples', () => {
      const multipleExamples = Array.from({ length: 5 }, (_, i) => ({
        ...mockServiceExample,
        id: `example-${i}`,
        title: `Example ${i}`
      }));

      render(
        <ServiceDetailCard
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
        <ServiceDetailCard
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

  describe('Enhanced Expandable Functionality', () => {
    it('toggles expanded state with enhanced animations', async () => {
      const user = userEvent.setup();
      const onExpand = jest.fn();
      
      render(
        <ServiceDetailCard
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

    it('displays enhanced expanded content with technical specifications', async () => {
      const user = userEvent.setup();
      
      render(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
          deliveryTime={{
            standard: '2-4 días hábiles',
            rush: '24-48 horas',
            notes: 'Tiempo puede variar'
          }}
          specifications={{
            materials: ['madera', 'metal'],
            maxSize: '60cm x 40cm',
            minQuantity: 1,
            features: ['Precisión micrométrica', 'Grabado profundo']
          }}
          examples={[mockServiceExample]}
        />
      );

      // Click expand button
      const expandButton = screen.getByLabelText('Expand Test Service details');
      await user.click(expandButton);

      // Check enhanced expanded content
      expect(screen.getByText('Tiempos de Entrega')).toBeInTheDocument();
      expect(screen.getByText('Características')).toBeInTheDocument();
      expect(screen.getByText('Especificaciones Técnicas')).toBeInTheDocument();
      expect(screen.getByText('Tamaño Máximo')).toBeInTheDocument();
      expect(screen.getByText('60cm x 40cm')).toBeInTheDocument();
      expect(screen.getByText('Cantidad Mínima')).toBeInTheDocument();
      expect(screen.getByText('1 unidades')).toBeInTheDocument();
      expect(screen.getByText('Materiales Disponibles')).toBeInTheDocument();
      expect(screen.getByText('Ejemplos de Trabajo')).toBeInTheDocument();
    });

    it('shows enhanced "Y N ejemplos más..." message when more than 6 examples', async () => {
      const user = userEvent.setup();
      const manyExamples = Array.from({ length: 8 }, (_, i) => ({
        ...mockServiceExample,
        id: `example-${i}`,
        title: `Example ${i}`
      }));
      
      render(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
          examples={manyExamples}
        />
      );

      // Expand to see examples
      const expandButton = screen.getByLabelText('Expand Test Service details');
      await user.click(expandButton);

      expect(screen.getByText('Y 2 ejemplos más disponibles...')).toBeInTheDocument();
    });
  });

  describe('Enhanced Example Gallery Interactions', () => {
    it('calls onExampleView when example is clicked', async () => {
      const user = userEvent.setup();
      const onExampleView = jest.fn();
      
      render(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
          examples={[mockServiceExample]}
          onExampleView={onExampleView}
          defaultExpanded={true}
        />
      );

      const exampleButton = screen.getByRole('button', { name: 'View example: Test Example 1' });
      await user.click(exampleButton);

      expect(onExampleView).toHaveBeenCalledWith(mockServiceExample);
    });

    it('supports enhanced keyboard navigation for examples', async () => {
      const user = userEvent.setup();
      const onExampleView = jest.fn();
      
      render(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
          examples={[mockServiceExample, mockServiceExample2]}
          onExampleView={onExampleView}
          defaultExpanded={true}
        />
      );

      const firstExample = screen.getByRole('button', { name: 'View example: Test Example 1' });
      const secondExample = screen.getByRole('button', { name: 'View example: Test Example 2' });
      
      // Focus first example
      firstExample.focus();
      
      // Press Enter to view
      await user.keyboard('{Enter}');
      expect(onExampleView).toHaveBeenCalledWith(mockServiceExample);
      
      // Press ArrowRight to move to next example
      await user.keyboard('{ArrowRight}');
      expect(secondExample).toHaveFocus();
      
      // Press ArrowLeft to move back
      await user.keyboard('{ArrowLeft}');
      expect(firstExample).toHaveFocus();
      
      // Press Space to view
      await user.keyboard(' ');
      expect(onExampleView).toHaveBeenCalledTimes(2);
    });
  });

  describe('Enhanced Keyboard Navigation', () => {
    it('supports enhanced keyboard navigation for expand/collapse', async () => {
      const user = userEvent.setup();
      const onExpand = jest.fn();
      
      render(
        <ServiceDetailCard
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

    it('supports Escape key to collapse when expanded with focus management', async () => {
      const user = userEvent.setup();
      const onExpand = jest.fn();
      
      render(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
          onExpand={onExpand}
        />
      );

      const card = screen.getByRole('article');
      const expandButton = screen.getByLabelText('Expand Test Service details');
      
      // Focus and expand
      card.focus();
      await user.keyboard('{Enter}');
      expect(onExpand).toHaveBeenCalledWith(true);
      
      // Press Escape to collapse
      await user.keyboard('{Escape}');
      expect(onExpand).toHaveBeenCalledWith(false);
      
      // Focus should return to expand button
      await waitFor(() => {
        expect(expandButton).toHaveFocus();
      });
    });
  });

  describe('Enhanced Accessibility', () => {
    it('has proper enhanced ARIA attributes', () => {
      render(
        <ServiceDetailCard
          title="Enhanced Test Service"
          description="Enhanced test description"
        />
      );

      const card = screen.getByRole('article');
      expect(card).toHaveAttribute('aria-expanded', 'false');
      expect(card).toHaveAttribute('aria-label', 'Enhanced Test Service service card. Press Enter to expand details.');
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('updates ARIA attributes when expanded with enhanced labels', async () => {
      const user = userEvent.setup();
      
      render(
        <ServiceDetailCard
          title="Enhanced Test Service"
          description="Enhanced test description"
        />
      );

      const card = screen.getByRole('article');
      const expandButton = screen.getByLabelText('Expand Enhanced Test Service details');
      
      await user.click(expandButton);
      
      expect(card).toHaveAttribute('aria-expanded', 'true');
      expect(card).toHaveAttribute('aria-label', 'Enhanced Test Service service card. Press Enter to collapse details.');
    });

    it('has proper focus management for example gallery', async () => {
      const user = userEvent.setup();
      
      render(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
          examples={[mockServiceExample, mockServiceExample2]}
          defaultExpanded={true}
        />
      );

      const examples = screen.getAllByRole('button', { name: /View example:/ });
      expect(examples).toHaveLength(2);
      
      examples.forEach(example => {
        expect(example).toHaveAttribute('aria-label');
        expect(example).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-blue-400');
      });
    });
  });

  describe('Enhanced Image Handling', () => {
    it('handles image loading states with enhanced feedback', async () => {
      render(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
          imageName="custom-image"
        />
      );

      const image = screen.getByAltText('Test Service');
      expect(image).toHaveAttribute('src', '/images/services/custom-image.webp');
      
      // Wait for image load simulation
      await waitFor(() => {
        expect(image).toHaveClass('opacity-100');
      });
    });

    it('uses placeholder image when imageName not provided', () => {
      render(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
        />
      );

      const image = screen.getByAltText('Test Service');
      expect(image).toHaveAttribute('src', '/images/services/impresion-digital.webp');
    });
  });

  describe('Enhanced Pricing Display', () => {
    it('displays enhanced pricing information when provided', () => {
      render(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
          pricing={{
            startingFrom: 'Desde $80',
            unit: 'por pieza'
          }}
        />
      );

      expect(screen.getByText('Desde $80')).toBeInTheDocument();
      expect(screen.getByText('por pieza')).toBeInTheDocument();
    });
  });
});

describe('ServiceDetailGrid', () => {
  const mockServices: Service[] = [
    {
      ...mockService,
      title: 'Enhanced Service 1'
    },
    {
      ...mockService,
      title: 'Enhanced Service 2',
      category: 'impresion'
    },
    {
      ...mockService,
      title: 'Enhanced Service 3',
      category: 'papeleria'
    }
  ];

  it('renders multiple enhanced service detail cards', () => {
    render(<ServiceDetailGrid services={mockServices} />);

    expect(screen.getByText('Enhanced Service 1')).toBeInTheDocument();
    expect(screen.getByText('Enhanced Service 2')).toBeInTheDocument();
    expect(screen.getByText('Enhanced Service 3')).toBeInTheDocument();
  });

  it('passes onExampleView callback to all cards', async () => {
    const user = userEvent.setup();
    const onExampleView = jest.fn();
    
    render(
      <ServiceDetailGrid 
        services={[mockService]} 
        onExampleView={onExampleView}
      />
    );

    // Expand the first card
    const expandButton = screen.getByLabelText('Expand Enhanced Test Service details');
    await user.click(expandButton);

    // Click on an example
    const exampleButton = screen.getByRole('button', { name: 'View example: Test Example 1' });
    await user.click(exampleButton);

    expect(onExampleView).toHaveBeenCalledWith(mockServiceExample);
  });

  it('applies custom className to grid container', () => {
    const { container } = render(
      <ServiceDetailGrid 
        services={mockServices} 
        className="custom-grid-class"
      />
    );
    
    const grid = container.firstChild;
    expect(grid).toHaveClass('custom-grid-class');
  });

  it('renders with proper enhanced grid layout classes', () => {
    const { container } = render(<ServiceDetailGrid services={mockServices} />);
    
    const grid = container.firstChild;
    expect(grid).toHaveClass(
      'grid', 
      'grid-cols-1', 
      'md:grid-cols-2', 
      'lg:grid-cols-3', 
      'gap-8', 
      'max-w-6xl', 
      'mx-auto'
    );
  });

  it('passes all enhanced service properties to ServiceDetailCard components', () => {
    render(<ServiceDetailGrid services={mockServices} />);

    // Check that enhanced properties are passed through
    expect(screen.getByText('2-4 días hábiles')).toBeInTheDocument();
    expect(screen.getByText('Desde $80')).toBeInTheDocument();
    expect(screen.getByText('Ejemplos:')).toBeInTheDocument();
  });
});