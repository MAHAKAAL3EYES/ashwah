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
    ],
  },
};

export default nextConfig;
