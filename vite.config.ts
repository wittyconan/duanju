import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // 启用代码压缩
    minify: 'esbuild',
    // 生成 source map（可选）
    sourcemap: false,
    // 设置chunk大小警告限制
    chunkSizeWarningLimit: 1000,
    // 确保文件名包含哈希值，防止缓存
    rollupOptions: {
      treeshake: true,
      output: {
        // JS文件名添加哈希
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        // CSS文件名添加哈希
        assetFileNames: 'assets/[name]-[hash].[ext]',
        // 分包策略
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-scroll-area', '@radix-ui/react-slider', '@radix-ui/react-switch'],
          router: ['react-router-dom'],
          utils: ['clsx', 'tailwind-merge', 'class-variance-authority'],
        },
      },
    },
  },
  esbuild: {
    // 移除console和debugger
    drop: ['console', 'debugger'],
  },
  server: {
    // 禁用浏览器缓存
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
    // 开发环境代理配置，帮助解决一些CORS问题
    proxy: {
      // 代理第三方视频接口
      '/api-proxy': {
        target: 'https://api.r2afosne.dpdns.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-proxy/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, _req, _res) => {
            // 设置必要的请求头
            proxyReq.setHeader('Origin', 'https://api.r2afosne.dpdns.org');
            proxyReq.setHeader('Referer', 'https://api.r2afosne.dpdns.org');
          });
        },
      },
    },
  },
})
