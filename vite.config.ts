import { resolve } from 'path'

import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const lib = process.env.LIBRARY
    ? {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'Gridley',
          fileName: (format) => `gridley.${format}.js`,
      }
    : undefined

export default defineConfig({
    plugins: [reactRefresh(), dts()],

    resolve: {
        alias: [{ find: '@/', replacement: '/src/' }],
    },

    build: {
        lib,
        sourcemap: true,
        emptyOutDir: true,
        assetsDir: '.',
        rollupOptions: {
            external: lib ? ['react', '@emotion/styled', '@emotion/css'] : [],
            plugins: [],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    react: 'react',
                    '@emotion/css': 'emotionCss',
                    '@emotion/styled': 'emotionStyled',
                },
            },
        },
    },
    test: {
        environment: 'jsdom',
    },
})
