/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Habilitar optimización de imágenes de Vercel
    unoptimized: false,
    // Dominios externos para imágenes
    domains: [
      'pub-581d9beed9654163970c769982a0193b.r2.dev',
      'images.unsplash.com',
      'cdn.sanity.io'
    ],
    // Formatos optimizados para Instagram y web moderna
    formats: ['image/webp', 'image/avif'],
    // Tamaños optimizados para diferentes dispositivos y Instagram
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Configuración adicional para mejor performance
    minimumCacheTTL: 31536000, // 1 año
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Optimizaciones adicionales para performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
}

export default nextConfig
