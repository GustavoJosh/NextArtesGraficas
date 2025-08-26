# Design Document

## Overview

The Web Services Catalog will be implemented as a dedicated section within the existing Next.js application, leveraging the current tech stack including Framer Motion for animations, GSAP for advanced effects, and Tailwind CSS for styling. The design focuses on creating an immersive, interactive experience that showcases web services (QR menus, webpages, digital cards) in a way that converts visitors into customers.

The catalog will be built as a separate route `/servicios-web` to distinguish it from the existing print services catalog, featuring modern UI patterns, smooth animations, and strategic conversion elements.

## Architecture

### Component Hierarchy
```
/servicios-web (Page Route)
├── WebServicesHero (Hero section with animated intro)
├── WebServicesCatalog (Main catalog container)
│   ├── FilterBar (Interactive filter controls)
│   ├── ServiceGrid (Responsive grid layout)
│   │   └── WebServiceCard[] (Individual service cards)
│   └── ServiceModal (Detailed service view)
├── ConversionCTA (Strategic call-to-action section)
└── TrustIndicators (Social proof and testimonials)
```

### State Management
- **Filter State**: React useState for active filters and search
- **Modal State**: React useState for service detail modal
- **Animation State**: Framer Motion AnimatePresence for transitions
- **Scroll State**: Custom hook for scroll-triggered animations

### Routing Structure
```
/servicios-web
├── /servicios-web/qr-menus
├── /servicios-web/websites  
├── /servicios-web/digital-cards
└── /servicios-web/custom-solutions
```

## Components and Interfaces

### Core Data Types
```typescript
interface WebService {
  id: string;
  title: string;
  description: string;
  category: WebServiceCategory;
  features: string[];
  technologies: string[];
  pricing: PricingTier;
  gallery: ServiceImage[];
  demoUrl?: string;
  caseStudy?: CaseStudy;
  testimonials: Testimonial[];
  estimatedDelivery: string;
  complexity: 'basic' | 'standard' | 'premium';
}

interface WebServiceCategory {
  id: 'qr-menus' | 'websites' | 'digital-cards' | 'custom-solutions';
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
}

interface ServiceImage {
  url: string;
  alt: string;
  type: 'screenshot' | 'mockup' | 'demo';
  featured: boolean;
}

interface PricingTier {
  starting: number;
  currency: string;
  billing: 'one-time' | 'monthly' | 'custom';
  features: string[];
}
```

### WebServiceCard Component
```typescript
interface WebServiceCardProps {
  service: WebService;
  onViewDetails: (service: WebService) => void;
  onRequestQuote: (service: WebService) => void;
  index: number; // For staggered animations
}
```

**Features:**
- Hover animations with Framer Motion
- Progressive image loading with blur placeholder
- Interactive feature highlights
- Pricing display with conversion-focused CTAs
- Technology badges with hover effects

### FilterBar Component
```typescript
interface FilterBarProps {
  categories: WebServiceCategory[];
  activeFilters: string[];
  onFilterChange: (filters: string[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}
```

**Features:**
- Animated filter buttons with active states
- Real-time search with debouncing
- Filter count indicators
- Mobile-responsive collapsible design
- Clear all filters functionality

### ServiceModal Component
```typescript
interface ServiceModalProps {
  service: WebService | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestQuote: (service: WebService) => void;
}
```

**Features:**
- Full-screen modal with image gallery
- Tabbed content (Overview, Features, Pricing, Examples)
- Interactive demo previews when available
- Multiple CTA placements for conversion
- Social sharing capabilities

## Data Models

### Service Categories Configuration
```typescript
const webServiceCategories: WebServiceCategory[] = [
  {
    id: 'qr-menus',
    name: 'Menús QR',
    description: 'Menús digitales interactivos con códigos QR',
    icon: 'QrCode',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'websites',
    name: 'Sitios Web',
    description: 'Páginas web modernas y responsivas',
    icon: 'Globe',
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'digital-cards',
    name: 'Tarjetas Digitales',
    description: 'Tarjetas de presentación digitales interactivas',
    icon: 'CreditCard',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'custom-solutions',
    name: 'Soluciones Personalizadas',
    description: 'Aplicaciones web a medida',
    icon: 'Sparkles',
    color: 'orange',
    gradient: 'from-orange-500 to-red-600'
  }
];
```

### Sample Service Data Structure
```typescript
const sampleWebServices: WebService[] = [
  {
    id: 'qr-menu-restaurant',
    title: 'Menú QR para Restaurantes',
    description: 'Menú digital interactivo con gestión de inventario y actualizaciones en tiempo real',
    category: webServiceCategories[0],
    features: [
      'Diseño responsive para móviles',
      'Gestión de inventario en tiempo real',
      'Múltiples idiomas',
      'Integración con redes sociales',
      'Analytics de visualizaciones'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Supabase'],
    pricing: {
      starting: 299,
      currency: 'USD',
      billing: 'one-time',
      features: ['Hasta 50 productos', 'Dominio personalizado', '1 año de hosting']
    },
    gallery: [
      {
        url: '/images/qr-menu-preview.jpg',
        alt: 'Vista previa del menú QR',
        type: 'mockup',
        featured: true
      }
    ],
    estimatedDelivery: '5-7 días',
    complexity: 'standard'
  }
];
```

## Error Handling

### Client-Side Error Boundaries
- **ServiceCardError**: Handles individual card rendering failures
- **FilterError**: Manages filter state corruption
- **ModalError**: Handles modal content loading issues

### Loading States
- **Skeleton Loading**: For initial catalog load
- **Progressive Loading**: For images and heavy content
- **Filter Loading**: During filter application
- **Modal Loading**: For detailed service content

### Fallback Strategies
- **Image Fallbacks**: Default service images for missing content
- **Content Fallbacks**: Generic descriptions for incomplete services
- **Network Fallbacks**: Cached content for offline scenarios

## Testing Strategy

### Unit Tests
- **Component Rendering**: All components render without errors
- **Filter Logic**: Filter combinations work correctly
- **State Management**: State updates trigger correct re-renders
- **Utility Functions**: Helper functions return expected results

### Integration Tests
- **Filter + Grid**: Filtering updates grid correctly
- **Modal + Navigation**: Modal navigation works properly
- **Search + Filter**: Combined search and filter functionality
- **CTA + Routing**: Call-to-action buttons navigate correctly

### E2E Tests
- **User Journey**: Complete browsing to quote request flow
- **Mobile Experience**: Touch interactions and responsive behavior
- **Performance**: Loading times and animation smoothness
- **Conversion Funnel**: Track user engagement through to contact

### Visual Regression Tests
- **Component Screenshots**: Ensure UI consistency across updates
- **Animation States**: Verify animation keyframes
- **Responsive Breakpoints**: Test all device sizes
- **Theme Variations**: Test different color schemes

## Animation and Interaction Design

### Page Load Animations
```typescript
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};
```

### Card Hover Effects
```typescript
const cardVariants = {
  rest: { 
    scale: 1,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  },
  hover: { 
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 }
  }
};
```

### Filter Transition Effects
- **Smooth Grid Reflow**: AnimatePresence for entering/exiting cards
- **Filter Button States**: Active state animations with spring physics
- **Search Input**: Focus animations with subtle scaling

### Scroll-Triggered Animations
- **Intersection Observer**: For performance-optimized scroll triggers
- **Staggered Reveals**: Cards animate in as they enter viewport
- **Parallax Elements**: Subtle background movement for depth

## Performance Optimizations

### Image Optimization
- **Next.js Image Component**: Automatic optimization and lazy loading
- **WebP Format**: Modern image formats with fallbacks
- **Responsive Images**: Multiple sizes for different viewports
- **Blur Placeholders**: Smooth loading experience

### Code Splitting
- **Route-Based**: Separate bundle for web services catalog
- **Component-Based**: Lazy load modal and heavy components
- **Dynamic Imports**: Load animations only when needed

### Caching Strategy
- **Static Generation**: Pre-render service catalog pages
- **Incremental Regeneration**: Update content without full rebuilds
- **Client-Side Caching**: Cache filter results and service data
- **CDN Integration**: Optimize asset delivery

### Bundle Optimization
- **Tree Shaking**: Remove unused animation libraries
- **Compression**: Gzip/Brotli for all assets
- **Critical CSS**: Inline above-the-fold styles
- **Preload Resources**: Critical fonts and images