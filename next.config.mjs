/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode to catch potential issues in development
  reactStrictMode: true,

  // Allow images to be loaded from specific external domains
  images: {
    domains: ["openweathermap.org"],
  },

  // Extend the default Webpack configuration if needed (optional)
  webpack: (config) => {
    // Customize the existing Webpack config if you have specific requirements
    return config;
  },

  // Enable or configure other Next.js settings as needed
  env: {
    NEXT_PUBLIC_OPENWEATHERMAP_API_KEY: process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY,
  },

  // Optionally, add experimental features
  experimental: {
    appDir: true, // For using the new Next.js 14 app directory features
  },
};

export default nextConfig;
