/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for AWS Amplify
  output: "export",

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Configure base path and asset prefix for deployment
  basePath: process.env.NODE_ENV === "production" ? "" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "" : "",

  // Ensure trailing slashes for better Amplify compatibility
  trailingSlash: true,

  // Disable server-side features for static export
  // Note: appDir is now stable in Next.js 14, no need for experimental flag
};

module.exports = nextConfig;
