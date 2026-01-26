/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  // React Compiler disabled due to missing babel plugin
  // experimental: {
  //   reactCompiler: true,
  // },

  // Enable SWC minification (faster than Terser)
  // swcMinify: true,

  // Optimize CSS
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

export default nextConfig