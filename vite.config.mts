import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [
      ['src/api/controllers/**', './vitest-environments/prisma.ts'],
    ],
    coverage: {
      reporter: ['text', 'html', 'clover', 'json', 'lcov'],
      exclude: [
        'node_modules',
        '**/*.spec.ts',
        '**/*.d.ts',
        '**/server.ts',
        '**/config/**',
        'vite.config.mts',
      ],
    },
  },
})
