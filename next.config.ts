import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
  {
    protocol: "https",
    hostname: "ftp.goit.study",
    pathname: "/img/lehlehka/**",
  },
  {
    protocol: "https",
    hostname: "res.cloudinary.com",
  },
],
  },
};

export default nextConfig;
