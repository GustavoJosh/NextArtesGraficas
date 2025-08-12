# Design Document

## Overview

The imprenta services upgrade will enhance the existing `/servicios` page by transforming it from a basic service grid into a comprehensive showcase that provides detailed service information, delivery timelines, and real examples. The design leverages the existing Next.js 15 + TypeScript + Tailwind CSS stack while introducing new components and data structures to support the enhanced functionality.

## Architecture

### Current State Analysis
- **Technology Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion
- **Current Structure**: Basic service grid with filtering by category
- **Existing Components**: ServiceCard, Header, Breadcrumb
- **Data Structure**: Simple service objects with title, description, category, and imageName

### Enhanced Architecture
The upgrade will maintain the existing architecture while extending it with:
- **Enhanced Service Data Model**: Extended service objects with delivery times, specifications, and example galleries
- **New Component Layer**: Specialized components for service details, timelines, and example galleries
- **Responsive Design System**: Mobile-first approach with progressive enhancement
- **Performance Optimization**: Image optimization and lazy loading for example galleries

## Components and Interfaces

### Enhanced Service Data Model

```typescript
interface EnhancedService extends Service {
  // Existing properties
  title: string;
  description: string;
  imageName: string;
  category: 'impresion' | 'laser' | 'papeleria';
  
  // New properties
  deliveryTime: {
    standard: string;        // e.g., "3-5 días hábiles"
    rush?: string;          // e.g., "24-48 horas"
    notes?: string;         // Additional delivery information
  };
  specifications: {
    materials?: string[];    // Supported materials
    maxSize?: string;       // Maximum dimensions
    minQuantity?: number;   // Minimum order quantity
    features: string[];     // Key features/capabilities
  };
  examples: ServiceExample[];
  pricing?: {
    startingFrom?: string;  // e.g., "Desde $50"
    unit?: string;         // e.g., "por pieza", "por m²"
  };
}

interface ServiceExample {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  category: string;
  materials?: string[];
  dimensions?: string;
}
```

### New Components

#### ServiceDetailCard
Enhanced version of ServiceCard with expandable details:
- **Collapsed State**: Current ServiceCard appearance with delivery time badge
- **Expanded State**: Shows specifications, delivery options, and example preview
- **Smooth Animations**: Framer Motion transitions between states
- **Mobile Optimization**: Touch-friendly interactions

#### DeliveryTimeline
Visual component showing delivery expectations:
- **Timeline Visualization**: Progress indicators for different delivery options
- **Rush Options**: Highlighted expedited delivery when available
- **Contextual Information**: Tooltips with additional delivery details

#### ExampleGallery
Interactive gallery for service examples:
- **Grid Layout**: Masonry-style grid for varied image sizes
- **Modal View**: Full-screen view with project details
- **Filtering**: Filter examples by material, size, or project type
- **Lazy Loading**: Performance-optimized image loading

#### ServiceSpecifications
Detailed specifications display:
- **Material List**: Visual chips showing supported materials
- **Capability Matrix**: Table format for technical specifications
- **Interactive Elements**: Expandable sections for detailed information

### Updated Components

#### Enhanced ServiceCard
- **Delivery Badge**: Prominent display of delivery timeframe
- **Quick Preview**: Hover state showing key specifications
- **Example Thumbnails**: Small preview of available examples
- **Improved Accessibility**: Better keyboard navigation and screen reader support

## Data Models

### Service Categories Enhancement

```typescript
const enhancedCategories = {
  impresion: {
    name: 'Impresión y Gran Formato',
    description: 'Servicios de impresión digital y gran formato',
    icon: 'Printer',
    color: 'blue',
    services: ['digital', 'gran-formato', 'lonas']
  },
  laser: {
    name: 'Corte y Grabado Láser',
    description: 'Servicios de corte y grabado de precisión',
    icon: 'Zap',
    color: 'red',
    services: ['corte-laser', 'grabado-laser'],
    materials: ['madera', 'metal', 'acrílico', 'cuero', 'papel']
  },
  papeleria: {
    name: 'Papelería y Stickers',
    description: 'Productos de papelería comercial y adhesivos',
    icon: 'FileText',
    color: 'green',
    services: ['folletos', 'stickers', 'tarjetas']
  }
};
```

### Example Data Structure

```typescript
const serviceExamples: ServiceExample[] = [
  {
    id: 'laser-wood-sign',
    title: 'Letrero de Madera Grabado',
    description: 'Letrero personalizado grabado en madera de roble',
    imagePath: '/images/examples/laser-wood-sign.webp',
    category: 'laser',
    materials: ['madera', 'roble'],
    dimensions: '30cm x 20cm x 2cm'
  },
  // More examples...
];
```

## Error Handling

### Image Loading
- **Fallback Images**: Default placeholder for missing service images
- **Progressive Loading**: Skeleton states while images load
- **Error States**: Graceful handling of failed image loads

### Data Validation
- **Service Data Validation**: Runtime validation of service data structure
- **Example Gallery Validation**: Ensure all examples have valid image paths
- **Delivery Time Validation**: Validate delivery time format and ranges

### Network Resilience
- **Offline Support**: Cache service data for offline viewing
- **Retry Logic**: Automatic retry for failed image loads
- **Loading States**: Clear loading indicators for all async operations

## Testing Strategy

### Unit Testing
- **Component Testing**: Test all new components in isolation
- **Data Model Testing**: Validate service data transformations
- **Utility Function Testing**: Test image path generation and validation

### Integration Testing
- **Service Card Interactions**: Test expand/collapse functionality
- **Gallery Navigation**: Test example gallery interactions
- **Filter Functionality**: Test enhanced filtering with new data structure

### Visual Testing
- **Responsive Design**: Test across different screen sizes
- **Animation Testing**: Verify smooth transitions and animations
- **Accessibility Testing**: Test keyboard navigation and screen reader compatibility

### Performance Testing
- **Image Loading Performance**: Test lazy loading and optimization
- **Animation Performance**: Ensure smooth 60fps animations
- **Bundle Size Impact**: Monitor JavaScript bundle size increase

## Mobile-First Design Considerations

### Touch Interactions
- **Minimum Touch Targets**: 44px minimum for all interactive elements
- **Gesture Support**: Swipe navigation for example galleries
- **Touch Feedback**: Visual feedback for all touch interactions

### Layout Adaptations
- **Single Column Layout**: Stack filters above content on mobile
- **Collapsible Sections**: Accordion-style sections for specifications
- **Optimized Typography**: Readable font sizes across all devices

### Performance Optimization
- **Image Optimization**: WebP format with fallbacks
- **Lazy Loading**: Load examples only when needed
- **Reduced Motion**: Respect user's motion preferences

## Implementation Phases

### Phase 1: Data Structure Enhancement
- Extend service data model with new properties
- Create example data structure
- Update existing service data

### Phase 2: Core Component Development
- Develop ServiceDetailCard with expand/collapse
- Create DeliveryTimeline component
- Build basic ExampleGallery

### Phase 3: Integration and Enhancement
- Integrate new components into existing page
- Add filtering for enhanced data
- Implement responsive design improvements

### Phase 4: Polish and Optimization
- Add animations and micro-interactions
- Optimize performance and loading
- Implement accessibility improvements