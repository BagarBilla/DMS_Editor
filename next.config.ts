import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    config.output = config.output || {};
    config.output.environment = {
      ...(config.output.environment || {}),
      asyncFunction: true,
    };
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
