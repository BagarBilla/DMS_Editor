import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        module: false,
      };
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        module: false,
      };
    }
    return config;
  },
};

export default nextConfig;
