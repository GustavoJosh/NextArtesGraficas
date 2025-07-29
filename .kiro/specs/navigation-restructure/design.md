# Design Document

## Overview

This design transforms the current single-page application into a multi-page website with enhanced navigation capabilities. The solution includes logo integration, active state indicators, mobile-responsive hamburger menu, and content restructuring across dedicated pages.

## Architecture

### Page Structure
```
/                    - Homepage (Hero + key highlights)
/servicios          - Services page (existing, enhanced)
/portafolio         - Portfolio showcase page
/testimonios        - Customer testimonials page
/contacto           - Contact information and forms
```

### Navigation System
- **Fixed Header**: Persistent navigation across all pages
- **Logo Integration**: Company logo with homepage navigation
- **Active State Detection**: URL-based active navigation highlighting
- **Mobile Responsive**: Hamburger menu for mobile devices

## Components and Interfaces

### Enhanced Header Component
```typescript
interface NavigationItem {
  name: string;
  href: string;
  isActive?: boolean;
}

interface HeaderProps {
  currentPath?: string;
}
```

**Key Features:**
- Logo display with fallback text
- Active state detection using Next.js `usePathname`
- Mobile hamburger menu with smooth transitions
- Responsive design breakpoints

### Logo Integration
- **Primary Logo**: `/public/images/logos/banner.png` for desktop header
- **Secondary Logo**: `/public/images/logos/circle.png` for mobile/compact view
- **Fallback**: Text-based logo if images fail to load

### Active State Indicator System
```typescript
// Active state detection logic
const isActive = (href: string, currentPath: string) => {
  if (href === '/' && currentPath === '/') return true;
  if (href !== '/' && currentPath.startsWith(href)) return true;
  return false;
};
```

**Visual Indicators:**
- **Desktop**: Underline animation with blue accent color
- **Mobile**: Background highlight with blue accent
- **Hover States**: Smooth color transitions

## Data Models

### Navigation Configuration
```typescript
const navigationItems: NavigationItem[] = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Portafolio', href: '/portafolio' },
  { name: 'Testimonios', href: '/testimonios' },
  { name: 'Contacto', href: '/contacto' },
];
```

### Page Content Structure
```typescript
interface PageLayout {
  title: string;
  description: string;
  sections: React.ComponentType[];
}
```

## Page Content Distribution

### Homepage (`/`)
- **Hero Section**: Main value proposition and call-to-action
- **Services Preview**: Brief overview with link to full services page
- **Featured Portfolio**: 2-3 highlighted projects
- **Quick Contact**: Simple contact form or information

### Services Page (`/servicios`)
- **Enhanced existing page**: Keep current filtering functionality
- **Add breadcrumb navigation**
- **Improve header integration**

### Portfolio Page (`/portafolio`)
- **Project Showcase**: Grid layout of portfolio items
- **Category Filtering**: Similar to services page
- **Project Details**: Modal or dedicated pages for individual projects

### Testimonials Page (`/testimonios`)
- **Customer Reviews**: Testimonial cards with ratings
- **Case Studies**: Detailed success stories
- **Social Proof**: Company logos or certifications

### Contact Page (`/contacto`)
- **Contact Form**: Enhanced version of current CTA section
- **Business Information**: Address, phone, hours
- **Location Map**: If applicable
- **Social Media Links**

## Error Handling

### Image Loading
```typescript
const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = 'none';
  // Show fallback text logo
};
```

### Navigation Fallbacks
- **404 Handling**: Redirect to homepage with error message
- **Broken Links**: Graceful degradation to text navigation
- **JavaScript Disabled**: CSS-only mobile menu fallback

## Testing Strategy

### Unit Tests
- Navigation component rendering
- Active state detection logic
- Logo fallback functionality
- Mobile menu toggle behavior

### Integration Tests
- Page navigation flow
- Header persistence across pages
- Mobile responsive behavior
- Logo image loading

### Visual Regression Tests
- Header appearance across different screen sizes
- Active state visual indicators
- Mobile menu animations
- Logo positioning and sizing

## Implementation Approach

### Phase 1: Enhanced Header
1. Update Header component with logo integration
2. Implement active state detection
3. Enhance mobile menu with animations
4. Add proper TypeScript interfaces

### Phase 2: Page Creation
1. Create portfolio page structure
2. Create testimonials page structure  
3. Create contact page structure
4. Update homepage to focused content

### Phase 3: Content Migration
1. Move portfolio content from main page
2. Move testimonials content from main page
3. Move contact content from main page
4. Update internal links and navigation

### Phase 4: Enhancement & Polish
1. Add breadcrumb navigation
2. Implement smooth page transitions
3. Add loading states
4. Optimize for performance

## Technical Considerations

### Performance
- **Image Optimization**: Next.js Image component for logos
- **Code Splitting**: Automatic page-based splitting
- **Lazy Loading**: Portfolio images and testimonials

### SEO
- **Meta Tags**: Unique titles and descriptions per page
- **Structured Data**: Business information markup
- **Sitemap**: Updated XML sitemap for new pages

### Accessibility
- **Keyboard Navigation**: Full keyboard support for menu
- **Screen Readers**: Proper ARIA labels and roles
- **Focus Management**: Logical tab order and focus indicators
- **Color Contrast**: WCAG compliant color schemes