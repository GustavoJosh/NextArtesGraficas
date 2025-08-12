// src/components/ui/__tests__/ServiceSpecifications.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import ServiceSpecifications from '../ServiceSpecifications';

const mockSpecifications = {
  materials: ['madera', 'metal', 'acrílico', 'cuero'],
  maxSize: '60cm x 40cm',
  minQuantity: 1,
  features: [
    'Precisión micrométrica',
    'Grabado profundo',
    'Diseños complejos',
    'Acabado profesional'
  ]
};

const mockPricing = {
  startingFrom: 'Desde $80',
  unit: 'por pieza'
};

describe('ServiceSpecifications', () => {
  beforeEach(() => {
    // Reset any state between tests
  });

  it('renders the component with title', () => {
    render(
      <ServiceSpecifications 
        specifications={mockSpecifications}
        pricing={mockPricing}
      />
    );

    expect(screen.getByText('Especificaciones Técnicas')).toBeInTheDocument();
  });

  it('displays materials section with chips', () => {
    render(
      <ServiceSpecifications 
        specifications={mockSpecifications}
        pricing={mockPricing}
      />
    );

    expect(screen.getByText('Materiales Disponibles')).toBeInTheDocument();
    
    // Check that material chips are rendered
    mockSpecifications.materials.forEach(material => {
      expect(screen.getByText(material)).toBeInTheDocument();
    });
  });

  it('displays technical specifications correctly', async () => {
    render(
      <ServiceSpecifications 
        specifications={mockSpecifications}
        pricing={mockPricing}
      />
    );

    // Click to expand specifications section
    const specificationsButton = screen.getByRole('button', { name: /especificaciones/i });
    fireEvent.click(specificationsButton);

    await waitFor(() => {
      expect(screen.getByText('Tamaño Máximo')).toBeInTheDocument();
      expect(screen.getByText('60cm x 40cm')).toBeInTheDocument();
      expect(screen.getByText('Cantidad Mínima')).toBeInTheDocument();
      expect(screen.getByText('1 pieza')).toBeInTheDocument();
      expect(screen.getByText('Precio')).toBeInTheDocument();
      expect(screen.getByText('Desde $80')).toBeInTheDocument();
      expect(screen.getByText('por pieza')).toBeInTheDocument();
    });
  });

  it('displays features list correctly', async () => {
    render(
      <ServiceSpecifications 
        specifications={mockSpecifications}
        pricing={mockPricing}
      />
    );

    // Click to expand features section
    const featuresButton = screen.getByRole('button', { name: /características y capacidades/i });
    fireEvent.click(featuresButton);

    await waitFor(() => {
      mockSpecifications.features.forEach(feature => {
        expect(screen.getByText(feature)).toBeInTheDocument();
      });
    });
  });

  it('handles expandable sections correctly', async () => {
    render(
      <ServiceSpecifications 
        specifications={mockSpecifications}
        pricing={mockPricing}
      />
    );

    const specificationsButton = screen.getByRole('button', { name: /especificaciones/i });
    
    // Initially collapsed (except materials which is default expanded)
    expect(screen.queryByText('Tamaño Máximo')).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(specificationsButton);
    
    await waitFor(() => {
      expect(screen.getByText('Tamaño Máximo')).toBeInTheDocument();
    });

    // Click to collapse
    fireEvent.click(specificationsButton);
    
    await waitFor(() => {
      expect(screen.queryByText('Tamaño Máximo')).not.toBeInTheDocument();
    });
  });

  it('handles missing optional properties gracefully', () => {
    const minimalSpecs = {
      features: ['Basic feature']
    };

    render(
      <ServiceSpecifications 
        specifications={minimalSpecs}
      />
    );

    expect(screen.getByText('Especificaciones Técnicas')).toBeInTheDocument();
    expect(screen.queryByText('Materiales Disponibles')).not.toBeInTheDocument();
  });

  it('handles empty materials array', () => {
    const specsWithEmptyMaterials = {
      ...mockSpecifications,
      materials: []
    };

    render(
      <ServiceSpecifications 
        specifications={specsWithEmptyMaterials}
        pricing={mockPricing}
      />
    );

    expect(screen.queryByText('Materiales Disponibles')).not.toBeInTheDocument();
  });

  it('handles empty features array', () => {
    const specsWithEmptyFeatures = {
      ...mockSpecifications,
      features: []
    };

    render(
      <ServiceSpecifications 
        specifications={specsWithEmptyFeatures}
        pricing={mockPricing}
      />
    );

    expect(screen.queryByText('Características y Capacidades')).not.toBeInTheDocument();
  });

  it('displays correct quantity text for multiple items', async () => {
    const specsWithMultipleQuantity = {
      ...mockSpecifications,
      minQuantity: 50
    };

    render(
      <ServiceSpecifications 
        specifications={specsWithMultipleQuantity}
        pricing={mockPricing}
      />
    );

    const specificationsButton = screen.getByRole('button', { name: /especificaciones/i });
    fireEvent.click(specificationsButton);

    await waitFor(() => {
      expect(screen.getByText('50 piezas')).toBeInTheDocument();
    });
  });

  it('applies custom className correctly', () => {
    const { container } = render(
      <ServiceSpecifications 
        specifications={mockSpecifications}
        pricing={mockPricing}
        className="custom-class"
      />
    );

    const cardElement = container.querySelector('[data-slot="card"]');
    expect(cardElement).toHaveClass('custom-class');
  });

  it('has proper accessibility attributes', () => {
    render(
      <ServiceSpecifications 
        specifications={mockSpecifications}
        pricing={mockPricing}
      />
    );

    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveAttribute('aria-expanded');
    });
  });

  it('handles keyboard navigation', () => {
    render(
      <ServiceSpecifications 
        specifications={mockSpecifications}
        pricing={mockPricing}
      />
    );

    const specificationsButton = screen.getByRole('button', { name: /especificaciones/i });
    
    // Focus the button
    specificationsButton.focus();
    expect(document.activeElement).toBe(specificationsButton);

    // Press Enter to expand
    fireEvent.keyDown(specificationsButton, { key: 'Enter' });
    expect(specificationsButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders without pricing information', () => {
    render(
      <ServiceSpecifications 
        specifications={mockSpecifications}
      />
    );

    expect(screen.getByText('Especificaciones Técnicas')).toBeInTheDocument();
    
    // Expand specifications to check pricing is not shown
    const specificationsButton = screen.getByRole('button', { name: /especificaciones/i });
    fireEvent.click(specificationsButton);

    expect(screen.queryByText('Precio')).not.toBeInTheDocument();
  });

  it('renders pricing without unit', async () => {
    const pricingWithoutUnit = {
      startingFrom: 'Desde $100'
    };

    render(
      <ServiceSpecifications 
        specifications={mockSpecifications}
        pricing={pricingWithoutUnit}
      />
    );

    const specificationsButton = screen.getByRole('button', { name: /especificaciones/i });
    fireEvent.click(specificationsButton);

    await waitFor(() => {
      expect(screen.getByText('Desde $100')).toBeInTheDocument();
      expect(screen.queryByText('por pieza')).not.toBeInTheDocument();
    });
  });
});