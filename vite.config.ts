import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import reactJsx from 'vite-react-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(),  reactJsx(),],
  resolve: {
    alias: {
      '#components': path.resolve(__dirname, '/src/components'),
      '#utils': path.resolve(__dirname, '/src/utils'),
    },
  },
  esbuild: {
    exclude: ['**/*.stories.@(js|jsx|ts|tsx)'],
  },
})
