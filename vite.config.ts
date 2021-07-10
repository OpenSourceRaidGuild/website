import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      '#components': './src/components',
      '#utils': './src/utils',
    },
  },
  esbuild: { exclude: ['**/*.stories.@(js|jsx|ts|tsx)'] },
})
