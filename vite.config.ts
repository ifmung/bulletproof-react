/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: process.env.VITE_APP_BASE_URL || './',
    plugins: [react(), viteTsconfigPaths()],
    server: {
      port: 3000,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/testing/setup-tests.ts',
      exclude: ['**/node_modules/**', '**/e2e/**'],
      coverage: {
        include: ['src/**'],
      },
    },
    optimizeDeps: { exclude: ['fsevents'] },
  });
};
