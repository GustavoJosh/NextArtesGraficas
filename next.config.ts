/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      // Si en el futuro usas otro servicio de imagenes, lo añades aquí
    ],
    // Enable modern image formats
    formats: ['image/webp', 'image/avif'],
    // Enable image optimization
    unoptimized: false,
    // Configure device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Configure image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable experimental features for better performance
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Ensure trailing slash behavior for better static file serving
  trailingSlash: true,
};

export default nextConfig;
