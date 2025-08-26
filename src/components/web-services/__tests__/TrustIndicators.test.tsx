import { render, screen } from '@testing-library/react';
import { TrustIndicators } from '../TrustIndicators';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock AnimatedSection
jest.mock('@/components/ui/AnimatedSection', () => ({
  AnimatedSection: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  AnimatedText: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

describe('TrustIndicators', () => {
  it('renders trust statistics when showStats is true', () => {
    render(<TrustIndicators showStats={true} />);
    
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('Proyectos Completados')).toBeInTheDocument();
    expect(screen.getByText('98%')).toBeInTheDocument();
    expect(screen.getByText('Satisfacción del Cliente')).toBeInTheDocument();
  });

  it('renders testimonials when showTestimonials is true', () => {
    render(<TrustIndicators showTestimonials={true} />);
    
    expect(screen.getByText('Lo que dicen nuestros clientes')).toBeInTheDocument();
  });

  it('renders trust badges when showBadges is true', () => {
    render(<TrustIndicators showBadges={true} />);
    
    expect(screen.getByText('¿Por qué elegirnos?')).toBeInTheDocument();
    expect(screen.getByText('Desarrollo Seguro')).toBeInTheDocument();
    expect(screen.getByText('Crecimiento Garantizado')).toBeInTheDocument();
  });

  it('renders compact variant correctly', () => {
    render(<TrustIndicators variant="compact" />);
    
    // Should show limited stats in compact mode
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('98%')).toBeInTheDocument();
    expect(screen.getByText('5.0 promedio')).toBeInTheDocument();
  });

  it('does not render sections when props are false', () => {
    render(
      <TrustIndicators 
        showStats={false} 
        showTestimonials={false} 
        showBadges={false} 
      />
    );
    
    expect(screen.queryByText('Resultados que hablan por sí solos')).not.toBeInTheDocument();
    expect(screen.queryByText('Lo que dicen nuestros clientes')).not.toBeInTheDocument();
    expect(screen.queryByText('¿Por qué elegirnos?')).not.toBeInTheDocument();
  });
});