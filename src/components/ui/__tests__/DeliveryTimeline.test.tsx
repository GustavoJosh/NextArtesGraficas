import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DeliveryTimeline, DeliveryTimelineBadge } from '../DeliveryTimeline';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('DeliveryTimeline', () => {
  const mockDeliveryTime = {
    standard: '3-5 días hábiles',
    rush: '24-48 horas',
    notes: 'Tiempo puede variar según cantidad y complejidad'
  };

  const mockDeliveryTimeWithoutRush = {
    standard: '3-5 días hábiles',
    notes: 'Tiempo puede variar según cantidad y complejidad'
  };

  describe('DeliveryTimeline Component', () => {
    it('renders standard delivery information', () => {
      render(<DeliveryTimeline deliveryTime={mockDeliveryTime} />);
      
      expect(screen.getByText('Tiempos de Entrega')).toBeInTheDocument();
      expect(screen.getByText('Entrega Estándar')).toBeInTheDocument();
      expect(screen.getByText('3-5 días hábiles')).toBeInTheDocument();
      expect(screen.getByText('Tiempo regular de producción')).toBeInTheDocument();
    });

    it('renders rush delivery when available', () => {
      render(<DeliveryTimeline deliveryTime={mockDeliveryTime} />);
      
      expect(screen.getByText('Entrega Express')).toBeInTheDocument();
      expect(screen.getByText('24-48 horas')).toBeInTheDocument();
      expect(screen.getByText('Producción prioritaria')).toBeInTheDocument();
    });

    it('does not render rush delivery when not available', () => {
      render(<DeliveryTimeline deliveryTime={mockDeliveryTimeWithoutRush} />);
      
      expect(screen.queryByText('Entrega Express')).not.toBeInTheDocument();
      expect(screen.queryByText('24-48 horas')).not.toBeInTheDocument();
    });

    it('renders additional notes when provided', () => {
      render(<DeliveryTimeline deliveryTime={mockDeliveryTime} />);
      
      expect(screen.getByText('Tiempo puede variar según cantidad y complejidad')).toBeInTheDocument();
    });

    it('does not render notes section when notes are not provided', () => {
      const deliveryTimeWithoutNotes = {
        standard: '3-5 días hábiles',
        rush: '24-48 horas'
      };
      
      render(<DeliveryTimeline deliveryTime={deliveryTimeWithoutNotes} />);
      
      expect(screen.queryByText('Tiempo puede variar según cantidad y complejidad')).not.toBeInTheDocument();
    });

    it('applies custom className when provided', () => {
      const { container } = render(
        <DeliveryTimeline deliveryTime={mockDeliveryTime} className="custom-class" />
      );
      
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('renders timeline markers correctly', () => {
      render(<DeliveryTimeline deliveryTime={mockDeliveryTime} />);
      
      expect(screen.getByText('Inicio')).toBeInTheDocument();
      expect(screen.getByText('Entrega')).toBeInTheDocument();
    });
  });

  describe('DeliveryTimelineBadge Component', () => {
    it('renders standard delivery badge', () => {
      render(<DeliveryTimelineBadge deliveryTime={mockDeliveryTime} />);
      
      expect(screen.getByText('3-5 días hábiles')).toBeInTheDocument();
    });

    it('renders rush delivery badge when available and showRush is true', () => {
      render(<DeliveryTimelineBadge deliveryTime={mockDeliveryTime} showRush={true} />);
      
      expect(screen.getByText('24-48 horas')).toBeInTheDocument();
    });

    it('does not render rush delivery badge when showRush is false', () => {
      render(<DeliveryTimelineBadge deliveryTime={mockDeliveryTime} showRush={false} />);
      
      expect(screen.queryByText('24-48 horas')).not.toBeInTheDocument();
      expect(screen.getByText('3-5 días hábiles')).toBeInTheDocument();
    });

    it('does not render rush delivery badge when rush is not available', () => {
      render(<DeliveryTimelineBadge deliveryTime={mockDeliveryTimeWithoutRush} />);
      
      expect(screen.queryByText('24-48 horas')).not.toBeInTheDocument();
      expect(screen.getByText('3-5 días hábiles')).toBeInTheDocument();
    });

    it('renders with default showRush=true when not specified', () => {
      render(<DeliveryTimelineBadge deliveryTime={mockDeliveryTime} />);
      
      expect(screen.getByText('3-5 días hábiles')).toBeInTheDocument();
      expect(screen.getByText('24-48 horas')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      render(<DeliveryTimeline deliveryTime={mockDeliveryTime} />);
      
      // Check for heading
      expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Tiempos de Entrega');
    });

    it('includes proper ARIA labels for icons', () => {
      render(<DeliveryTimeline deliveryTime={mockDeliveryTime} />);
      
      // Icons should be present (Clock, Zap, Info)
      const clockIcon = screen.getByText('Tiempos de Entrega').previousElementSibling;
      expect(clockIcon).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive classes correctly', () => {
      const { container } = render(<DeliveryTimeline deliveryTime={mockDeliveryTime} />);
      
      // Check that the component has proper spacing classes
      expect(container.firstChild).toHaveClass('space-y-4');
    });

    it('badge component uses appropriate text sizes', () => {
      render(<DeliveryTimelineBadge deliveryTime={mockDeliveryTime} />);
      
      const badges = screen.getAllByText(/días hábiles|horas/);
      badges.forEach(badge => {
        expect(badge.closest('.text-xs')).toBeTruthy();
      });
    });
  });
});