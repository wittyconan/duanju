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
    minify: true,
    // 生成 source map（可选）
    sourcemap: false,
    // 分包策略
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-scroll-area'],
        },
      },
    },
  },
  esbuild: {
    // 移除console和debugger
    drop: ['console', 'debugger'],
  },
  server: {
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
