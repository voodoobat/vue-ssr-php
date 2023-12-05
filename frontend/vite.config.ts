import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    build: {
        manifest: true,
        // https://rollupjs.org/configuration-options/
        rollupOptions: {
            input: {
                main: 'src/main.ts',
            },
            output: {
                dir: '../public',
            },
        },
    },
})
