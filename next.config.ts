import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
<<<<<<< HEAD
        hostname: "ftp.goit.study",
        pathname: "/img/lehlehka/**",
=======
        hostname: "res.cloudinary.com",
>>>>>>> origin/main
      },
    ],
  },
};

export default nextConfig;
