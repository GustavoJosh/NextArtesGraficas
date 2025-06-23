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
  },
};

export default nextConfig;
