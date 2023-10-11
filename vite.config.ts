import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import commonjs from 'vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), commonjs(), splitVendorChunkPlugin()],
  base: '/markdown-previewer/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
