/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.ashvah.in",
        pathname: "/assets/uploads/**",
      },
      {
        protocol: "https",
        hostname: "ashvah.in",
        pathname: "/assets/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
