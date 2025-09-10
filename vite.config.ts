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
  server: {
    // 开发环境代理配置，帮助解决一些CORS问题
    proxy: {
      // 代理第三方视频接口
      '/api-proxy': {
        target: 'https://api.r2afosne.dpdns.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-proxy/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // 设置必要的请求头
            proxyReq.setHeader('Origin', 'https://api.r2afosne.dpdns.org');
            proxyReq.setHeader('Referer', 'https://api.r2afosne.dpdns.org');
          });
        },
      },
    },
  },
})
