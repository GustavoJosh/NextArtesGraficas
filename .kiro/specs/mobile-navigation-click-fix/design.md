# Design Document

## Overview

This design addresses the critical mobile navigation issue where the CircularGallery component's global event listeners interfere with mobile navigation interactions. The solution involves implementing proper event scoping, event delegation, and priority-based event handling to ensure navigation elements take precedence over gallery interactions.

## Architecture

### Root Cause Analysis
The current issue stems from:
1. **Global Event Listeners**: CircularGallery attaches click/touch listeners to the `window` object
2. **Event Bubbling**: Navigation clicks bubble up and trigger gallery handlers
3. **No Event Scoping**: Gallery events are not contained within the gallery component boundaries
4. **Missing Event Priority**: No mechanism to prioritize navigation over gallery interactions

### Solution Architecture
```
┌─────────────────────────────────────┐
│           Event Management          │
├─────────────────────────────────────┤
│  1. Scoped Gallery Event Listeners  │
│  2. Navigation Event Priority       │
│  3. Event Delegation Pattern        │
│  4. Proper Event Cleanup           │
└─────────────────────────────────────┘
```

## Components and Interfaces

### Enhanced CircularGallery Component

#### Event Scoping Strategy
```typescript
interface EventScopingConfig {
  containerSelector: string;
  preventGlobalEvents: boolean;
  respectNavigationZones: boolean;
}

interface NavigationZone {
  selector: string;
  priority: 'high' | 'medium' | 'low';
  preventBubbling: boolean;
}
```

#### Key Changes to CircularGallery
1. **Container-Scoped Events**: Replace global window listeners with container-specific listeners
2. **Navigation Zone Detection**: Identify and respect navigation element boundaries
3. **Event Delegation**: Use event delegation pattern for better performance and control
4. **Click vs Drag Detection**: Improve click detection to prevent accidental triggers

### Navigation Component Enhancements

#### Header Component Updates
```typescript
interface NavigationEventConfig {
  stopPropagation: boolean;
  preventDefault: boolean;
  priority: number;
}

interface MobileMenuConfig {
  isolateEvents: boolean;
  preventGalleryInteraction: boolean;
  focusTrap: boolean;
}
```

#### Breadcrumb Component Updates
```typescript
interface BreadcrumbEventHandling {
  preventBubbling: boolean;
  isolateClicks: boolean;
  maintainAccessibility: boolean;
}
```

## Data Models

### Event Priority System
```typescript
enum EventPriority {
  NAVIGATION = 1000,
  UI_CONTROLS = 800,
  GALLERY = 600,
  BACKGROUND = 400
}

interface EventHandler {
  priority: EventPriority;
  selector: string;
  handler: (event: Event) => void;
  stopPropagation?: boolean;
  preventDefault?: boolean;
}
```

### Navigation Zone Configuration
```typescript
const NAVIGATION_ZONES: NavigationZone[] = [
  {
    selector: 'header, [role="banner"]',
    priority: 'high',
    preventBubbling: true
  },
  {
    selector: 'nav, [role="navigation"]',
    priority: 'high', 
    preventBubbling: true
  },
  {
    selector: '.breadcrumb, [aria-label="Breadcrumb"]',
    priority: 'high',
    preventBubbling: true
  },
  {
    selector: 'button, a, [role="button"], [role="link"]',
    priority: 'medium',
    preventBubbling: true
  }
];
```

## Implementation Strategy

### Phase 1: Event Scoping for CircularGallery

#### 1.1 Container-Based Event Listeners
Replace global window event listeners with container-scoped listeners:

```typescript
// Before (problematic)
window.addEventListener("click", this.boundOnClick);

// After (scoped)
this.container.addEventListener("click", this.boundOnClick);
```

#### 1.2 Navigation Zone Detection
Implement logic to detect if clicks occur within navigation zones:

```typescript
private isNavigationZone(target: EventTarget): boolean {
  const element = target as Element;
  return NAVIGATION_ZONES.some(zone => 
    element.closest(zone.selector) !== null
  );
}

private handleClick(e: MouseEvent) {
  if (this.isNavigationZone(e.target)) {
    return; // Don't handle gallery clicks in navigation zones
  }
  // Proceed with gallery click logic
}
```

#### 1.3 Improved Click Detection
Enhance click vs drag detection to prevent accidental triggers:

```typescript
private onClick(e: MouseEvent) {
  const currentX = e.clientX;
  const currentY = e.clientY;
  const dragDistance = Math.sqrt(
    Math.pow(currentX - this.start.x, 2) + 
    Math.pow(currentY - this.start.y, 2)
  );

  // Increased threshold and added navigation zone check
  if (dragDistance < 10 && !this.isNavigationZone(e.target)) {
    this.handleGalleryClick(e);
  }
}
```

### Phase 2: Navigation Component Event Isolation

#### 2.1 Header Component Event Handling
Add event isolation to mobile menu interactions:

```typescript
const handleMenuToggle = (e: React.MouseEvent) => {
  e.stopPropagation();
  e.preventDefault();
  
  if (isAnimating) return;
  
  setIsAnimating(true);
  setIsMenuOpen(!isMenuOpen);
  
  // Additional isolation for mobile
  if (window.innerWidth < 768) {
    document.body.classList.add('navigation-active');
  }
};

const handleNavigationClick = (e: React.MouseEvent, href: string) => {
  e.stopPropagation();
  handleMenuClose();
  // Navigation logic continues...
};
```

#### 2.2 Breadcrumb Component Event Isolation
Enhance breadcrumb component with proper event handling:

```typescript
const handleBreadcrumbClick = (e: React.MouseEvent, href?: string) => {
  e.stopPropagation();
  
  if (href) {
    e.preventDefault();
    // Handle navigation programmatically if needed
    window.location.href = href;
  }
};
```

### Phase 3: Event Management System

#### 3.1 Global Event Coordinator
Create a centralized event management system:

```typescript
class EventCoordinator {
  private handlers: Map<string, EventHandler[]> = new Map();
  
  registerHandler(event: string, handler: EventHandler) {
    const handlers = this.handlers.get(event) || [];
    handlers.push(handler);
    handlers.sort((a, b) => b.priority - a.priority);
    this.handlers.set(event, handlers);
  }
  
  handleEvent(event: Event) {
    const handlers = this.handlers.get(event.type) || [];
    
    for (const handler of handlers) {
      const target = event.target as Element;
      
      if (target.closest(handler.selector)) {
        handler.handler(event);
        
        if (handler.stopPropagation) {
          event.stopPropagation();
        }
        if (handler.preventDefault) {
          event.preventDefault();
        }
        
        break; // Stop after first matching handler
      }
    }
  }
}
```

#### 3.2 CSS-Based Event Isolation
Add CSS classes to help with event isolation:

```css
.navigation-active {
  pointer-events: none;
}

.navigation-active header,
.navigation-active nav,
.navigation-active .mobile-menu {
  pointer-events: auto;
}

.gallery-container {
  isolation: isolate;
}

.navigation-zone {
  z-index: 1000;
  position: relative;
}
```

## Error Handling

### Event Listener Cleanup
```typescript
// Enhanced cleanup in CircularGallery
destroy() {
  // Remove container-scoped listeners instead of global ones
  this.container.removeEventListener("click", this.boundOnClick);
  this.container.removeEventListener("touchstart", this.boundOnTouchDown);
  this.container.removeEventListener("touchmove", this.boundOnTouchMove);
  this.container.removeEventListener("touchend", this.boundOnTouchUp);
  
  // Clean up any remaining global listeners
  window.removeEventListener("resize", this.boundOnResize);
  
  // Reset body classes
  document.body.classList.remove('navigation-active');
  
  // Cleanup WebGL resources
  if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
    this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
  }
}
```

### Fallback Mechanisms
```typescript
// Fallback for when event scoping fails
private handleEventWithFallback(e: Event) {
  try {
    this.handleEvent(e);
  } catch (error) {
    console.warn('Event handling failed, using fallback:', error);
    // Fallback to basic event handling
    if (this.isNavigationElement(e.target)) {
      return; // Don't handle gallery events
    }
  }
}
```

## Testing Strategy

### Unit Tests
1. **Event Scoping Tests**
   - Verify gallery events only fire within gallery container
   - Test navigation zone detection accuracy
   - Validate event priority system

2. **Navigation Isolation Tests**
   - Test mobile menu interactions don't trigger gallery
   - Verify breadcrumb clicks work independently
   - Test event propagation stopping

3. **Cross-Component Integration Tests**
   - Test gallery and navigation coexistence
   - Verify proper event cleanup
   - Test accessibility preservation

### Manual Testing Scenarios
1. **Mobile Navigation Flow**
   - Open hamburger menu → verify no gallery modal
   - Click navigation items → verify proper navigation
   - Close menu → verify no gallery interference

2. **Breadcrumb Navigation**
   - Click breadcrumb links → verify navigation works
   - Test on different screen sizes
   - Verify accessibility with screen readers

3. **Gallery Functionality**
   - Click gallery images → verify modal opens
   - Test drag vs click detection
   - Verify gallery works when navigation is present

## Performance Considerations

### Event Listener Optimization
- Use passive event listeners where appropriate
- Implement event delegation to reduce listener count
- Add debouncing for rapid interactions

### Memory Management
- Proper cleanup of event listeners on component unmount
- Avoid memory leaks from global event handlers
- Clean up WebGL resources properly

## Accessibility Preservation

### Focus Management
- Maintain proper focus trapping in mobile menu
- Ensure gallery interactions don't interfere with keyboard navigation
- Preserve ARIA attributes and roles

### Screen Reader Support
- Maintain semantic HTML structure
- Ensure navigation announcements work correctly
- Prevent gallery interactions from interrupting navigation feedback

## Browser Compatibility

### Touch Event Handling
- Support both mouse and touch events
- Handle different touch event implementations
- Provide fallbacks for older browsers

### Event API Differences
- Use feature detection for modern event APIs
- Provide polyfills where necessary
- Test across different mobile browsers