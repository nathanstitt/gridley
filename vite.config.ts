import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'
import { resolve } from 'path'

const lib = process.env.LIBRARY ? {
    entry: resolve(__dirname, 'src/index.ts'),
    name: 'Gridley',
    fileName: (format) => `gridley.${format}.js`
} : undefined

export default defineConfig({
    plugins: [reactRefresh()],

    resolve: {
        alias: [{ find: '@/', replacement: '/src/' }],
    },

    build: {
        lib,
        sourcemap: true,
        emptyOutDir: true,
        assetsDir: '.',
        rollupOptions: {
            external: lib ? ['react', '@emotion/react', '@emotion/styled', '@emotion/css'] : [],
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
})
