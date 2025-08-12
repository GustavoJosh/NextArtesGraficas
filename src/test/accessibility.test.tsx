// src/test/accessibility.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ServiceDetailCard } from '@/components/ui/ServiceDetailCard';
import { DeliveryTimeline } from '@/components/ui/DeliveryTimeline';
import { ExampleGallery } from '@/components/ui/ExampleGallery';
import { ServiceSpecifications } from '@/components/ui/ServiceSpecifications';
import type { ServiceExample } from '@/data/services';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock performance hook
jest.mock('@/lib/performance', () => ({
  usePerformanceMonitor: () => ({
    prefersReducedMotion: () => false,
  }),
}));

// Mock lazy loading hook
jest.mock('@/hooks/useLazyLoading', () => ({
  useLazyLoading: () => ({
    isInView: true,
    elementRef: { current: null },
  }),
}));

describe('Accessibility Tests', () => {
  const mockServiceExample: ServiceExample = {
    id: 'test-example',
    title: 'Test Example',
    description: 'Test description',
    imagePath: '/test-image.jpg',
    category: 'impresion',
    materials: ['papel', 'cartón'],
    dimensions: '10x15cm',
  };

  const mockDeliveryTime = {
    standard: '3-5 días hábiles',
    rush: '24-48 horas',
    notes: 'Los tiempos pueden variar según la complejidad',
  };

  const mockSpecifications = {
    materials: ['papel', 'cartón', 'vinilo'],
    maxSize: '100x70cm',
    minQuantity: 1,
    features: ['Alta resolución', 'Colores vibrantes', 'Resistente al agua'],
  };

  describe('ServiceDetailCard Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
          category="impresion"
          deliveryTime={mockDeliveryTime}
          specifications={mockSpecifications}
          examples={[mockServiceExample]}
        />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA labels and roles', () => {
      render(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
          category="impresion"
          deliveryTime={mockDeliveryTime}
        />
      );

      const card = screen.getByRole('article');
      expect(card).toHaveAttribute('aria-expanded', 'false');
      expect(card).toHaveAttribute('aria-label');

      const expandButton = screen.getByRole('button', { name: /expand test service details/i });
      expect(expandButton).toBeInTheDocument();
    });

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();
      render(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
          category="impresion"
          deliveryTime={mockDeliveryTime}
        />
      );

      const card = screen.getByRole('article');
      
      // Focus the card
      await user.tab();
      expect(card).toHaveFocus();

      // Press Enter to expand
      await user.keyboard('{Enter}');
      await waitFor(() => {
        expect(card).toHaveAttribute('aria-expanded', 'true');
      });

      // Press Escape to collapse
      await user.keyboard('{Escape}');
      await waitFor(() => {
        expect(card).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('should have accessible delivery time information', () => {
      render(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
          deliveryTime={mockDeliveryTime}
        />
      );

      const deliveryBadge = screen.getByRole('status', { name: /tiempo de entrega/i });
      expect(deliveryBadge).toBeInTheDocument();
    });
  });

  describe('DeliveryTimeline Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <DeliveryTimeline deliveryTime={mockDeliveryTime} />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA structure', () => {
      render(<DeliveryTimeline deliveryTime={mockDeliveryTime} />);

      const region = screen.getByRole('region', { name: /tiempos de entrega/i });
      expect(region).toBeInTheDocument();

      const list = screen.getByRole('list', { name: /opciones de entrega/i });
      expect(list).toBeInTheDocument();

      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(2); // Standard and rush delivery
    });

    it('should have accessible timeline visualization', () => {
      render(<DeliveryTimeline deliveryTime={mockDeliveryTime} />);

      const timeline = screen.getByRole('img');
      expect(timeline).toHaveAttribute('aria-label');
      expect(timeline.getAttribute('aria-label')).toContain('Visualización de tiempos de entrega');
    });

    it('should have accessible notes section', () => {
      render(<DeliveryTimeline deliveryTime={mockDeliveryTime} />);

      const note = screen.getByRole('note');
      expect(note).toHaveAttribute('aria-label', 'Información adicional sobre tiempos de entrega');
    });
  });

  describe('ExampleGallery Accessibility', () => {
    const mockExamples = [mockServiceExample, { ...mockServiceExample, id: 'test-2' }];

    it('should have no accessibility violations', async () => {
      const { container } = render(
        <ExampleGallery examples={mockExamples} />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper grid structure', () => {
      render(<ExampleGallery examples={mockExamples} />);

      const grid = screen.getByRole('grid');
      expect(grid).toHaveAttribute('aria-label', 'Galería de ejemplos');

      const gridCells = screen.getAllByRole('gridcell');
      expect(gridCells).toHaveLength(mockExamples.length);
    });

    it('should have accessible example buttons', () => {
      render(<ExampleGallery examples={mockExamples} />);

      const exampleButtons = screen.getAllByRole('button', { name: /ver ejemplo/i });
      expect(exampleButtons).toHaveLength(mockExamples.length);

      exampleButtons.forEach(button => {
        expect(button).toHaveAttribute('aria-label');
      });
    });

    it('should have accessible modal dialog', async () => {
      const user = userEvent.setup();
      render(<ExampleGallery examples={mockExamples} />);

      const firstExample = screen.getAllByRole('button', { name: /ver ejemplo/i })[0];
      await user.click(firstExample);

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
        expect(dialog).toHaveAttribute('aria-modal', 'true');
        expect(dialog).toHaveAttribute('aria-labelledby');
        expect(dialog).toHaveAttribute('aria-describedby');
      });

      const closeButton = screen.getByRole('button', { name: /cerrar galería/i });
      expect(closeButton).toHaveAttribute('autoFocus');
    });

    it('should support keyboard navigation in modal', async () => {
      const user = userEvent.setup();
      render(<ExampleGallery examples={mockExamples} />);

      // Open modal
      const firstExample = screen.getAllByRole('button', { name: /ver ejemplo/i })[0];
      await user.click(firstExample);

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      // Test Escape key
      await user.keyboard('{Escape}');
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('should have accessible filter controls', () => {
      render(<ExampleGallery examples={mockExamples} showFilters={true} />);

      const filterGroup = screen.getByRole('group', { name: /filtros de categoría/i });
      expect(filterGroup).toBeInTheDocument();
    });
  });

  describe('ServiceSpecifications Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <ServiceSpecifications specifications={mockSpecifications} />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper region structure', () => {
      render(<ServiceSpecifications specifications={mockSpecifications} />);

      const region = screen.getByRole('region', { name: /especificaciones técnicas/i });
      expect(region).toBeInTheDocument();
    });

    it('should have accessible expandable sections', () => {
      render(<ServiceSpecifications specifications={mockSpecifications} />);

      const expandButtons = screen.getAllByRole('button', { expanded: false });
      expandButtons.forEach(button => {
        expect(button).toHaveAttribute('aria-controls');
        expect(button).toHaveAttribute('aria-label');
      });
    });

    it('should support keyboard interaction for expandable sections', async () => {
      const user = userEvent.setup();
      render(<ServiceSpecifications specifications={mockSpecifications} />);

      const expandButton = screen.getAllByRole('button')[0];
      await user.click(expandButton);

      await waitFor(() => {
        expect(expandButton).toHaveAttribute('aria-expanded', 'true');
      });

      const controlledRegion = screen.getByRole('region', { 
        name: expandButton.getAttribute('aria-label') || '' 
      });
      expect(controlledRegion).toBeInTheDocument();
    });

    it('should have accessible feature lists', () => {
      render(<ServiceSpecifications specifications={mockSpecifications} />);

      // Expand the features section first
      const expandButton = screen.getByRole('button', { name: /características/i });
      fireEvent.click(expandButton);

      const featureList = screen.getByRole('list', { name: /lista de características/i });
      expect(featureList).toBeInTheDocument();

      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBeGreaterThan(0);
    });
  });

  describe('Focus Management', () => {
    it('should maintain focus order in ServiceDetailCard', async () => {
      const user = userEvent.setup();
      render(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
          examples={[mockServiceExample]}
        />
      );

      // Tab through focusable elements
      await user.tab(); // Card
      await user.tab(); // Expand button
      
      const expandButton = screen.getByRole('button', { name: /expand/i });
      expect(expandButton).toHaveFocus();

      // Expand to show examples
      await user.keyboard('{Enter}');
      await waitFor(() => {
        const exampleButtons = screen.getAllByRole('button', { name: /view example/i });
        expect(exampleButtons.length).toBeGreaterThan(0);
      });
    });

    it('should trap focus in modal gallery', async () => {
      const user = userEvent.setup();
      render(<ExampleGallery examples={[mockServiceExample]} />);

      // Open modal
      const exampleButton = screen.getByRole('button', { name: /ver ejemplo/i });
      await user.click(exampleButton);

      await waitFor(() => {
        const closeButton = screen.getByRole('button', { name: /cerrar/i });
        expect(closeButton).toHaveFocus();
      });
    });
  });

  describe('Screen Reader Support', () => {
    it('should announce state changes in ServiceDetailCard', async () => {
      const user = userEvent.setup();
      render(
        <ServiceDetailCard
          title="Test Service"
          description="Test description"
        />
      );

      const card = screen.getByRole('article');
      expect(card).toHaveAttribute('aria-expanded', 'false');

      await user.click(screen.getByRole('button', { name: /expand/i }));
      
      await waitFor(() => {
        expect(card).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('should provide live updates in gallery modal', async () => {
      const user = userEvent.setup();
      const multipleExamples = [
        mockServiceExample,
        { ...mockServiceExample, id: 'test-2', title: 'Second Example' }
      ];
      
      render(<ExampleGallery examples={multipleExamples} />);

      // Open modal
      const firstExample = screen.getAllByRole('button', { name: /ver ejemplo/i })[0];
      await user.click(firstExample);

      await waitFor(() => {
        const liveRegion = screen.getByText(/ejemplo 1 de 2/i);
        expect(liveRegion).toHaveAttribute('aria-live', 'polite');
        expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
      });
    });
  });
});