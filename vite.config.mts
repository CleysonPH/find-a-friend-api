import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
    ],
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
        'vite*',
        'build',
      ],
    },
  },
})
