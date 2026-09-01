import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    config.output = config.output || {};
    config.output.environment = {
      ...(config.output.environment || {}),
      asyncFunction: true,
    };
    config.resolve = config.resolve || {};
    config.resolve.extensionAlias = {
      ...(config.resolve.extensionAlias || {}),
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
      '.cjs': ['.cts', '.cjs'],
    };
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@docx-editor.dev/core/automation': path.resolve(__dirname, 'packages/core/src/automation/index.ts'),
      '@docx-editor.dev/core/binding': path.resolve(__dirname, 'packages/core/src/binding/index.ts'),
      '@docx-editor.dev/core/contracts/editor': path.resolve(__dirname, 'packages/core/src/contracts/editor.ts'),
      '@docx-editor.dev/core/contracts/document': path.resolve(__dirname, 'packages/core/src/contracts/document.ts'),
      '@docx-editor.dev/core/contracts/interaction': path.resolve(__dirname, 'packages/core/src/contracts/interaction.ts'),
      '@docx-editor.dev/core/contracts/mcp': path.resolve(__dirname, 'packages/core/src/contracts/mcp.ts'),
      '@docx-editor.dev/core/contracts/modules': path.resolve(__dirname, 'packages/core/src/contracts/modules.ts'),
      '@docx-editor.dev/core/contracts/plugin': path.resolve(__dirname, 'packages/core/src/contracts/plugin.ts'),
      '@docx-editor.dev/core/contracts/types': path.resolve(__dirname, 'packages/core/src/contracts/types-barrel.ts'),
      '@docx-editor.dev/core/layout': path.resolve(__dirname, 'packages/core/src/layout/index.ts'),
      '@docx-editor.dev/core/output': path.resolve(__dirname, 'packages/core/src/output/index.ts'),
      '@docx-editor.dev/core/store': path.resolve(__dirname, 'packages/core/src/store/index.ts'),
      '@docx-editor.dev/core/editor': path.resolve(__dirname, 'packages/core/src/editor/index.ts'),
      '@docx-editor.dev/core': path.resolve(__dirname, 'packages/core/src/index.ts'),
      '@docx-editor.dev/react': path.resolve(__dirname, 'packages/react/src/index.ts'),
      '@docx-editor.dev/i18n': path.resolve(__dirname, 'packages/i18n/src/index.ts'),
    };
    if (!isServer) {
      config.resolve.alias.module = false;
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        module: false,
      };
    }
    return config;
  },
};

export default nextConfig;
