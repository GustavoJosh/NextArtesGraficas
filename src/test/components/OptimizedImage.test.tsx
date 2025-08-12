import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { OptimizedImage, ImageSkeleton } from '@/components/ui/OptimizedImage';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: vi.fn(({ src, alt, onLoad, onError, ...props }) => {
    // Simulate image loading
    setTimeout(() => {
      if (src.includes('error')) {
        onError?.();
      } else {
        onLoad?.();
      }
    }, 100);
    
    return <img src={src} alt={alt} {...props} data-testid="next-image" />;
  })
}));

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
global.IntersectionObserver = mockIntersectionObserver;

describe('OptimizedImage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with basic props', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={300}
        height={200}
        lazy={false}
      />
    );

    expect(screen.getByTestId('next-image')).toBeInTheDocument();
  });

  it('should convert non-WebP images to WebP format', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={300}
        height={200}
        lazy={false}
      />
    );

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('src', '/test-image.webp');
  });

  it('should keep WebP images as-is', () => {
    render(
      <OptimizedImage
        src="/test-image.webp"
        alt="Test image"
        width={300}
        height={200}
        lazy={false}
      />
    );

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('src', '/test-image.webp');
  });

  it('should show loading skeleton when lazy loading', async () => {
    // Mock intersection observer to trigger loading
    const mockObserve = vi.fn();
    const mockDisconnect = vi.fn();
    
    mockIntersectionObserver.mockReturnValue({
      observe: mockObserve,
      unobserve: vi.fn(),
      disconnect: mockDisconnect,
    });

    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={300}
        height={200}
        lazy={true}
      />
    );

    // Should not show image initially when lazy loading
    expect(screen.queryByTestId('next-image')).not.toBeInTheDocument();
    
    // Should setup intersection observer
    expect(mockObserve).toHaveBeenCalled();
  });

  it('should handle image load success', async () => {
    const onLoad = vi.fn();
    
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={300}
        height={200}
        onLoad={onLoad}
        lazy={false}
      />
    );

    await waitFor(() => {
      expect(onLoad).toHaveBeenCalled();
    });
  });

  it('should handle image load error with fallback', async () => {
    const onError = vi.fn();
    
    render(
      <OptimizedImage
        src="/error-image.jpg"
        alt="Test image"
        width={300}
        height={200}
        fallbackSrc="/fallback-image.jpg"
        onError={onError}
        lazy={false}
      />
    );

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });

    // Should use fallback src
    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('src', '/fallback-image.jpg');
  });

  it('should show error state when no fallback provided', async () => {
    render(
      <OptimizedImage
        src="/error-image.jpg"
        alt="Test image"
        width={300}
        height={200}
        lazy={false}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Imagen no disponible')).toBeInTheDocument();
    });
  });

  it('should setup intersection observer for lazy loading', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={300}
        height={200}
        lazy={true}
      />
    );

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        threshold: 0.1,
        rootMargin: '50px'
      })
    );
  });

  it('should not setup intersection observer when priority is true', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={300}
        height={200}
        priority={true}
        lazy={true}
      />
    );

    // Should render immediately without intersection observer
    expect(screen.getByTestId('next-image')).toBeInTheDocument();
  });
});

describe('ImageSkeleton', () => {
  it('should render with default props', () => {
    render(<ImageSkeleton />);
    
    const skeleton = document.querySelector('.animate-pulse');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('aspect-square');
  });

  it('should apply custom aspect ratio', () => {
    render(<ImageSkeleton aspectRatio="aspect-video" />);
    
    const skeleton = document.querySelector('.animate-pulse');
    expect(skeleton).toHaveClass('aspect-video');
  });

  it('should apply custom className', () => {
    render(<ImageSkeleton className="custom-class" />);
    
    const skeleton = document.querySelector('.animate-pulse');
    expect(skeleton).toHaveClass('custom-class');
  });
});

describe('Performance Characteristics', () => {
  it('should load images within performance budget', async () => {
    const startTime = performance.now();
    
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={300}
        height={200}
        lazy={false}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('next-image')).toBeInTheDocument();
    });

    const loadTime = performance.now() - startTime;
    expect(loadTime).toBeLessThan(200); // Should render quickly
  });

  it('should handle multiple images efficiently', () => {
    const images = Array.from({ length: 10 }, (_, i) => (
      <OptimizedImage
        key={i}
        src={`/test-image-${i}.jpg`}
        alt={`Test image ${i}`}
        width={300}
        height={200}
        lazy={true}
      />
    ));

    const startTime = performance.now();
    render(<div>{images}</div>);
    const renderTime = performance.now() - startTime;

    expect(renderTime).toBeLessThan(100); // Should render multiple images quickly
  });
});