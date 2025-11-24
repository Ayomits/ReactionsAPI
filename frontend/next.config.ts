import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "**", pathname: "**" }],
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
