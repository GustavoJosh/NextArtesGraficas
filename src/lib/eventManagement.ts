// Event management utilities for handling component interaction conflicts
// Specifically designed to prevent gallery events from interfering with navigation

export enum EventPriority {
  NAVIGATION = 1000,
  UI_CONTROLS = 800,
  GALLERY = 600,
  BACKGROUND = 400
}

export interface NavigationZone {
  selector: string;
  priority: 'high' | 'medium' | 'low';
  preventBubbling: boolean;
}

export interface EventHandler {
  priority: EventPriority;
  selector: string;
  handler: (event: Event) => void;
  stopPropagation?: boolean;
  preventDefault?: boolean;
}

// Define navigation zones that should take priority over gallery interactions
export const NAVIGATION_ZONES: NavigationZone[] = [
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
  },
  {
    selector: '.mobile-menu, .mobile-menu-button',
    priority: 'high',
    preventBubbling: true
  }
];

/**
 * Detects if a click target is within a navigation zone that should prevent gallery interactions
 */
export function isNavigationZone(target: EventTarget | null): boolean {
  if (!target || !(target instanceof Element)) {
    return false;
  }

  return NAVIGATION_ZONES.some(zone => {
    const element = target.closest(zone.selector);
    return element !== null;
  });
}

/**
 * Detects if a click target is within a high-priority navigation zone
 */
export function isHighPriorityNavigationZone(target: EventTarget | null): boolean {
  if (!target || !(target instanceof Element)) {
    return false;
  }

  return NAVIGATION_ZONES
    .filter(zone => zone.priority === 'high')
    .some(zone => {
      const element = target.closest(zone.selector);
      return element !== null;
    });
}

/**
 * Enhanced click detection that respects navigation zones and improves drag vs click detection
 */
export function isValidGalleryClick(
  event: MouseEvent | TouchEvent,
  startPosition: { x: number; y: number },
  dragThreshold: number = 10
): boolean {
  // Check if click is in navigation zone
  if (isNavigationZone(event.target)) {
    return false;
  }

  // Calculate drag distance
  const currentX = 'clientX' in event ? event.clientX : event.touches?.[0]?.clientX || 0;
  const currentY = 'clientY' in event ? event.clientY : event.touches?.[0]?.clientY || 0;
  
  const dragDistance = Math.sqrt(
    Math.pow(currentX - startPosition.x, 2) + 
    Math.pow(currentY - startPosition.y, 2)
  );

  // Only consider it a valid click if drag distance is below threshold
  return dragDistance < dragThreshold;
}

/**
 * Event coordinator for managing priority-based event handling
 */
export class EventCoordinator {
  private handlers: Map<string, EventHandler[]> = new Map();
  
  registerHandler(event: string, handler: EventHandler): void {
    const handlers = this.handlers.get(event) || [];
    handlers.push(handler);
    handlers.sort((a, b) => b.priority - a.priority);
    this.handlers.set(event, handlers);
  }
  
  unregisterHandler(event: string, handlerToRemove: EventHandler): void {
    const handlers = this.handlers.get(event) || [];
    const filteredHandlers = handlers.filter(h => h !== handlerToRemove);
    this.handlers.set(event, filteredHandlers);
  }
  
  handleEvent(event: Event): boolean {
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
        
        return true; // Event was handled
      }
    }
    
    return false; // Event was not handled
  }
  
  destroy(): void {
    this.handlers.clear();
  }
}

/**
 * Debounce utility for preventing rapid event triggers
 */
export function debounceEvent<T extends (...args: unknown[]) => void>(
  func: T, 
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), wait);
  };
}